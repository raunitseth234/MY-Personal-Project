"""
Seed script for the expanded Rajesh Jewellers catalog.

Seeds ALL products in catalog_data.NEW_PRODUCTS (117 items).
Uses upsert-by-SKU so it is safe to re-run.

Run with:
    docker-compose exec api python scripts/seed_catalog.py
"""
import asyncio
import math
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import select
from app.db.postgres import AsyncSessionLocal
from app.models.all_models import (
    Category, Product, ProductImage, ProductVariant, MaterialType,
)
from catalog_data import IMG, NEW_PRODUCTS, FALLBACK_RATES, MAKING_BY_MATERIAL, MAKING_KEYWORD_OVERRIDES, u

# Build rate lookup: (material, purity) -> rate_per_gram
_RATES = {(m, p): r for m, p, r in FALLBACK_RATES}

# Keyword overrides: (keywords_tuple, (type, value))
_OVERRIDES = MAKING_KEYWORD_OVERRIDES


def compute_base_price(p: dict) -> float:
    """
    Compute base_price from weight + metal rates + making charges.
    Only called when product has no explicit 'base' key.
    """
    material = p["material"]
    purity = p.get("purity", "")
    weight = p.get("weight", 0.0)
    name_lower = p["name"].lower()

    rate = _RATES.get((material, purity), 0)

    making_type, making_value = MAKING_BY_MATERIAL.get(material, ("percentage", 0))
    for keywords, override in _OVERRIDES:
        if any(k in name_lower for k in keywords):
            making_type, making_value = override
            break

    if making_type == "percentage":
        base = weight * rate * (1 + making_value / 100)
    elif making_type == "per_gram":
        base = weight * (rate + making_value)
    else:
        base = weight * rate

    return math.ceil(base / 100) * 100   # round up to nearest ₹100


def resolve_image_url(key: str) -> str:
    """Convert an IMG key to a full Unsplash URL."""
    return u(IMG[key])


async def seed():
    async with AsyncSessionLocal() as db:
        # Build category slug -> id map
        result = await db.execute(select(Category))
        categories = result.scalars().all()
        cat_map = {c.slug: c.id for c in categories}

        missing_cats = set()
        created = 0
        skipped = 0

        for p in NEW_PRODUCTS:
            cat_slug = p["cat"]
            if cat_slug not in cat_map:
                missing_cats.add(cat_slug)
                continue

            # Skip if SKU already exists
            existing = await db.execute(select(Product).where(Product.sku == p["sku"]))
            if existing.scalar_one_or_none():
                skipped += 1
                continue

            # Determine prices
            if "base" in p and p["base"] is not None:
                base_price = float(p["base"])
            else:
                base_price = compute_base_price(p)

            discount_price = p.get("disc")
            if discount_price is not None:
                discount_price = float(discount_price)

            product = Product(
                name=p["name"],
                slug=p["slug"],
                category_id=cat_map[cat_slug],
                description=p.get("desc", ""),
                material=MaterialType(p["material"]),
                purity=p.get("purity"),
                weight_grams=p.get("weight"),
                base_price=base_price,
                discount_price=discount_price,
                making_charge_type="percentage",
                making_charge_value=12,
                sku=p["sku"],
                stock_quantity=p.get("stock", 10),
                is_featured=p.get("featured", False),
                is_active=True,
            )
            db.add(product)
            await db.flush()

            # Product images — imgs contains IMG keys
            imgs = p.get("imgs", [])
            for i, img_key in enumerate(imgs):
                if img_key not in IMG:
                    print(f"  WARNING: unknown image key '{img_key}' for {p['sku']}")
                    continue
                db.add(ProductImage(
                    product_id=product.id,
                    image_url=resolve_image_url(img_key),
                    display_order=i,
                    is_primary=(i == 0),
                ))

            # Carat variants
            carats = p.get("carats", [])
            for carat in carats:
                rate_diff = _RATES.get((p["material"], carat), 0) - _RATES.get((p["material"], p.get("purity", "")), 0)
                additional = round(rate_diff * p.get("weight", 0) * 1.12, 2)
                db.add(ProductVariant(
                    product_id=product.id,
                    variant_name=carat,
                    purity=carat,
                    additional_price=max(additional, 0),
                    stock_quantity=p.get("stock", 10),
                ))

            created += 1
            print(f"  Created [{p['sku']}]: {p['name']} — ₹{base_price:,.0f}")

        await db.commit()

        print(f"\nCatalog seeding complete.")
        print(f"  Created  : {created}")
        print(f"  Skipped  : {skipped} (already exist)")
        if missing_cats:
            print(f"  WARNING  : categories not found — {missing_cats}")
            print("  Run scripts/seed.py first to create base categories.")


if __name__ == "__main__":
    asyncio.run(seed())
