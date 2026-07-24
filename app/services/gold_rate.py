"""
Live metal-rate service (₹ per gram) with a resilient fallback chain.

Order of resolution for get_metal_rates():
  1. Redis cache `metalrate:live` (TTL ~6h) — fast path.
  2. Live fetch from keyless feeds (spot USD/oz + USD→INR forex), converted
     to ₹/gram and adjusted by purity factor. Cached in Redis on success.
  3. Persistent fallback: the `metal_rates` table (seeded). Cached briefly so
     a feed outage doesn't hammer the upstream APIs on every request.

This function NEVER raises to its caller — pricing must always resolve.

Feeds (both keyless, verified reachable):
  - https://api.gold-api.com/price/{XAU,XAG,XPT}  → spot price USD per troy ounce
  - https://open.er-api.com/v6/latest/USD          → USD→INR rate
"""
import asyncio
import json
import logging
from decimal import Decimal

import httpx
from sqlalchemy import select

from app.models import MetalRate

logger = logging.getLogger("rajesh.gold_rate")

REDIS_KEY = "metalrate:live"
LIVE_TTL = 6 * 3600          # 6 hours when the live feed succeeds
FALLBACK_TTL = 600           # 10 minutes when we had to use the DB fallback
TROY_OZ_G = Decimal("31.1035")

# spot is pure-metal; retail carries a premium. 0 by default — bump later if desired.
RETAIL_PREMIUM_PCT = Decimal("0")

# purity factor applied to the pure-metal ₹/g. Keys MUST match Product.purity strings.
PURITY_FACTORS: dict[str, dict[str, Decimal]] = {
    "gold": {
        "24K": Decimal("1"),
        "22K": Decimal("22") / Decimal("24"),
        "18K": Decimal("18") / Decimal("24"),
        "14K": Decimal("14") / Decimal("24"),
    },
    "silver": {
        "925": Decimal("0.925"),
    },
    "platinum": {
        "950": Decimal("0.95"),
        "900": Decimal("0.90"),
    },
}


def _key(material: str, purity: str) -> str:
    return f"{material}|{purity}"


async def _fetch_live() -> dict[tuple[str, str], Decimal] | None:
    """Fetch spot prices + forex and build the (material, purity) -> ₹/g map.

    Returns None on any failure (missing field, network error, bad status)."""
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            xau, xag, xpt, fx = await asyncio.gather(
                client.get("https://api.gold-api.com/price/XAU"),
                client.get("https://api.gold-api.com/price/XAG"),
                client.get("https://api.gold-api.com/price/XPT"),
                client.get("https://open.er-api.com/v6/latest/USD"),
                return_exceptions=True,
            )

        def price(resp) -> Decimal | None:
            if isinstance(resp, Exception) or resp.status_code != 200:
                return None
            val = resp.json().get("price")
            return Decimal(str(val)) if val else None

        if isinstance(fx, Exception) or fx.status_code != 200:
            return None
        usdinr = fx.json().get("rates", {}).get("INR")
        if not usdinr:
            return None
        usdinr = Decimal(str(usdinr))
        premium = Decimal("1") + RETAIL_PREMIUM_PCT / Decimal("100")

        rates: dict[tuple[str, str], Decimal] = {}

        def add_metal(material: str, usd_per_oz: Decimal | None):
            if not usd_per_oz:
                return
            pure_per_g = usd_per_oz * usdinr / TROY_OZ_G
            for purity, factor in PURITY_FACTORS[material].items():
                rates[(material, purity)] = (pure_per_g * factor * premium).quantize(Decimal("0.01"))

        add_metal("gold", price(xau))
        add_metal("silver", price(xag))
        add_metal("platinum", price(xpt))

        # gold is the anchor — if that failed, treat the whole fetch as failed
        if ("gold", "24K") not in rates:
            return None
        return rates
    except Exception as exc:  # pragma: no cover - defensive
        logger.warning("Live metal-rate fetch failed: %s", exc)
        return None


async def _read_db(db) -> dict[tuple[str, str], Decimal]:
    result = await db.execute(select(MetalRate))
    return {(r.material, r.purity): Decimal(r.rate_per_gram) for r in result.scalars().all()}


async def get_metal_rates(db, redis) -> dict[tuple[str, str], Decimal]:
    """Resolve current ₹/gram rates keyed by (material, purity). Never raises."""
    # 1. Redis fast path
    try:
        cached = await redis.get(REDIS_KEY)
        if cached:
            raw = json.loads(cached)
            return {tuple(k.split("|")): Decimal(v) for k, v in raw.items()}
    except Exception as exc:
        logger.warning("Redis read for metal rates failed: %s", exc)

    # 2. Live fetch
    live = await _fetch_live()
    if live:
        try:
            await redis.setex(
                REDIS_KEY, LIVE_TTL,
                json.dumps({_key(m, p): str(r) for (m, p), r in live.items()}),
            )
        except Exception as exc:
            logger.warning("Redis write for live metal rates failed: %s", exc)
        return live

    # 3. DB fallback (seeded). Cache briefly so an outage doesn't hammer upstream.
    db_rates = await _read_db(db)
    if db_rates:
        try:
            await redis.setex(
                REDIS_KEY, FALLBACK_TTL,
                json.dumps({_key(m, p): str(r) for (m, p), r in db_rates.items()}),
            )
        except Exception:
            pass
    return db_rates
