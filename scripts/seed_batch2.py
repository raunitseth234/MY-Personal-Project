"""
Seed ~174 products from the E:\\final hai jewellery photo batch (2026-07-25).
Continues numbering from where seed_new_batch.py left off.

Run INSIDE Docker AFTER process_batch2_images.py has copied all photos:
    docker-compose exec api python scripts/seed_batch2.py

Uses SKU-based upsert: safe to re-run.
Products without verified weight use weight=0 (shows 'contact for price').
"""
import asyncio
import re
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.models import Category, Product, ProductImage


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def img(cat: str, num: int, i: int = 1) -> str:
    return f"/static/images/products/{cat}_{num:03d}_{i:02d}.jpg"


def gold_price(weight: float, purity: str, mc: float) -> int:
    if weight <= 0:
        return 20000
    rate = 7500 if purity in ("22K", None) else 6136
    return round(weight * rate * (1 + mc / 100) * 1.03)


# ── Products ─────────────────────────────────────────────────────────────────

PRODUCTS = [

    # ════════════════════════════════════════════════════════════════
    # HAAR & NECKLACE SETS  (HAR-056 to HAR-101, teal mannequin)
    # ════════════════════════════════════════════════════════════════
    {"name": "Traditional Gold Necklace",             "sku": "HAR-056", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 56)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-057", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 57)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-058", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 58)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-059", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 59)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-060", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 60)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-061", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 61)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-062", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 62)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-063", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 63)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-064", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 64)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-065", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 65)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-066", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 66)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-067", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 67)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-068", "cat": "haar-necklace-sets", "purity": "22K", "weight": 14.560, "mc": 12, "images": [img("haar", 68)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-069", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 69)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-070", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 70)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-071", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 71)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-072", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 72)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-073", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 73)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-074", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 74)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-075", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 75)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-076", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 76)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-077", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 77)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-078", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 78)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-079", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 79)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-080", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 80)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-081", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 81)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-082", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 82)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-083", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 83)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-084", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 84)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-085", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 85)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-086", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 86)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-087", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 87)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-088", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 88)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-089", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 89)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-090", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 90)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-091", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 91)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-092", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 92)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-093", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 93)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-094", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 94)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-095", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 95)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-096", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 96)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-097", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 97)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-098", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 98)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-099", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 99)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-100", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 100)]},
    {"name": "Traditional Gold Necklace",             "sku": "HAR-101", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 101)]},

    # ════════════════════════════════════════════════════════════════
    # MANGALSUTRA  (MGS-017 to MGS-073)
    # ════════════════════════════════════════════════════════════════
    {"name": "Gold Mangalsutra",  "sku": "MGS-017", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 17)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-018", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 18)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-019", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 19)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-020", "cat": "mangalsutra", "purity": "22K", "weight": 5.680, "mc": 10, "images": [img("mangalsutra", 20)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-021", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 21)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-022", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 22)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-023", "cat": "mangalsutra", "purity": "22K", "weight": 5.360, "mc": 10, "images": [img("mangalsutra", 23)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-024", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 24)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-025", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 25)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-026", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 26)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-027", "cat": "mangalsutra", "purity": "22K", "weight": 7.090, "mc": 10, "images": [img("mangalsutra", 27)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-028", "cat": "mangalsutra", "purity": "22K", "weight": 4.520, "mc": 10, "images": [img("mangalsutra", 28)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-029", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 29)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-030", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 30)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-031", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 31)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-032", "cat": "mangalsutra", "purity": "22K", "weight": 6.160, "mc": 10, "images": [img("mangalsutra", 32)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-033", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 33)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-034", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 34)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-035", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 35)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-036", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 36)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-037", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 37)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-038", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 38)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-039", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 39)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-040", "cat": "mangalsutra", "purity": "22K", "weight": 6.760, "mc": 10, "images": [img("mangalsutra", 40)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-041", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 41)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-042", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 42)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-043", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 43)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-044", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 44)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-045", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 45)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-046", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 46)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-047", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 47)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-048", "cat": "mangalsutra", "purity": "22K", "weight": 6.880, "mc": 10, "images": [img("mangalsutra", 48)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-049", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 49)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-050", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 50)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-051", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 51)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-052", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 52)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-053", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 53)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-054", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 54)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-055", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 55)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-056", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 56)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-057", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 57)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-058", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 58)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-059", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 59)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-060", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 60)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-061", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 61)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-062", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 62)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-063", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 63)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-064", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 64)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-065", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 65)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-066", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 66)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-067", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 67)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-068", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 68)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-069", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 69)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-070", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 70)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-071", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 71)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-072", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 72)]},
    {"name": "Gold Mangalsutra",  "sku": "MGS-073", "cat": "mangalsutra", "purity": "22K", "weight": 0,     "mc": 10, "images": [img("mangalsutra", 73)]},

    # ════════════════════════════════════════════════════════════════
    # CHAINS with pendant  (CHN-018 to CHN-037)
    # ════════════════════════════════════════════════════════════════
    {"name": "Gold Chain with Pendant",  "sku": "CHN-018", "cat": "chain", "purity": "22K", "weight": 5.310,  "mc": 12, "images": [img("chain", 18)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-019", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 19)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-020", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 20)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-021", "cat": "chain", "purity": "22K", "weight": 11.520, "mc": 12, "images": [img("chain", 21)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-022", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 22)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-023", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 23)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-024", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 24)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-025", "cat": "chain", "purity": "22K", "weight": 8.200,  "mc": 12, "images": [img("chain", 25)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-026", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 26)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-027", "cat": "chain", "purity": "22K", "weight": 6.850,  "mc": 12, "images": [img("chain", 27)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-028", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 28)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-029", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 29)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-030", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 30)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-031", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 31)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-032", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 32)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-033", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 33)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-034", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 34)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-035", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 35)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-036", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 36)]},
    {"name": "Gold Chain with Pendant",  "sku": "CHN-037", "cat": "chain", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("chain", 37)]},

    # ════════════════════════════════════════════════════════════════
    # BANGLES  (BNG-019 to BNG-029)
    # ════════════════════════════════════════════════════════════════
    {"name": "Gold Bangles",  "sku": "BNG-019", "cat": "bangles", "purity": "22K", "weight": 18.820, "mc": 10, "images": [img("bangles", 19)]},
    {"name": "Gold Bangles",  "sku": "BNG-020", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 20)]},
    {"name": "Gold Bangles",  "sku": "BNG-021", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 21)]},
    {"name": "Gold Bangles",  "sku": "BNG-022", "cat": "bangles", "purity": "22K", "weight": 20.340, "mc": 10, "images": [img("bangles", 22)]},
    {"name": "Gold Bangles",  "sku": "BNG-023", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 23)]},
    {"name": "Gold Bangles",  "sku": "BNG-024", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 24)]},
    {"name": "Gold Bangles",  "sku": "BNG-025", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 25)]},
    {"name": "Gold Bangles",  "sku": "BNG-026", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 26)]},
    {"name": "Gold Bangles",  "sku": "BNG-027", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 27)]},
    {"name": "Gold Bangles",  "sku": "BNG-028", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 28)]},
    {"name": "Gold Bangles",  "sku": "BNG-029", "cat": "bangles", "purity": "22K", "weight": 0,      "mc": 10, "images": [img("bangles", 29)]},

    # ════════════════════════════════════════════════════════════════
    # HAAR (heavy haars on black background, HAR-102 to HAR-108)
    # ════════════════════════════════════════════════════════════════
    {"name": "Heavy Gold Haar",  "sku": "HAR-102", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 102)]},
    {"name": "Heavy Gold Haar",  "sku": "HAR-103", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 103)]},
    {"name": "Heavy Gold Haar",  "sku": "HAR-104", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 104)]},
    {"name": "Heavy Gold Haar",  "sku": "HAR-105", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 105)]},
    {"name": "Heavy Gold Haar",  "sku": "HAR-106", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 106)]},
    {"name": "Heavy Gold Haar",  "sku": "HAR-107", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 107)]},
    {"name": "Heavy Gold Haar",  "sku": "HAR-108", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0, "mc": 12, "images": [img("haar", 108)]},

    # ════════════════════════════════════════════════════════════════
    # EARRINGS  (ERG-086 to ERG-110)
    # ════════════════════════════════════════════════════════════════
    {"name": "Gold Earrings",  "sku": "ERG-086", "cat": "earrings", "purity": "22K", "weight": 11.110, "mc": 15, "images": [img("earrings", 86)]},
    {"name": "Gold Earrings",  "sku": "ERG-087", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 87)]},
    {"name": "Gold Earrings",  "sku": "ERG-088", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 88)]},
    {"name": "Gold Earrings",  "sku": "ERG-089", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 89)]},
    {"name": "Gold Earrings",  "sku": "ERG-090", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 90)]},
    {"name": "Gold Earrings",  "sku": "ERG-091", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 91)]},
    {"name": "Gold Earrings",  "sku": "ERG-092", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 92)]},
    {"name": "Gold Earrings",  "sku": "ERG-093", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 93)]},
    {"name": "Gold Earrings",  "sku": "ERG-094", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 94)]},
    {"name": "Gold Earrings",  "sku": "ERG-095", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 95)]},
    {"name": "Gold Earrings",  "sku": "ERG-096", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 96)]},
    {"name": "Gold Earrings",  "sku": "ERG-097", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 97)]},
    {"name": "Gold Earrings",  "sku": "ERG-098", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 98)]},
    {"name": "Gold Earrings",  "sku": "ERG-099", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 99)]},
    {"name": "Gold Earrings",  "sku": "ERG-100", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 100)]},
    {"name": "Gold Earrings",  "sku": "ERG-101", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 101)]},
    {"name": "Gold Earrings",  "sku": "ERG-102", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 102)]},
    {"name": "Gold Earrings",  "sku": "ERG-103", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 103)]},
    {"name": "Gold Earrings",  "sku": "ERG-104", "cat": "earrings", "purity": "22K", "weight": 5.789, "mc": 15, "images": [img("earrings", 104)]},
    {"name": "Gold Earrings",  "sku": "ERG-105", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 105)]},
    {"name": "Gold Earrings",  "sku": "ERG-106", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 106)]},
    {"name": "Gold Earrings",  "sku": "ERG-107", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 107)]},
    {"name": "Gold Earrings",  "sku": "ERG-108", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 108)]},
    {"name": "Gold Earrings",  "sku": "ERG-109", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 109)]},
    {"name": "Gold Earrings",  "sku": "ERG-110", "cat": "earrings", "purity": "22K", "weight": 0,      "mc": 15, "images": [img("earrings", 110)]},

    # ════════════════════════════════════════════════════════════════
    # HAAR SETS (necklace + long necklace, HAR-109 to HAR-116)
    # ════════════════════════════════════════════════════════════════
    {"name": "Gold Necklace Set",  "sku": "HAR-109", "cat": "haar-necklace-sets", "purity": "22K", "weight": 27.240, "mc": 12, "images": [img("haar", 109)]},
    {"name": "Gold Necklace Set",  "sku": "HAR-110", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("haar", 110)]},
    {"name": "Gold Necklace Set",  "sku": "HAR-111", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("haar", 111)]},
    {"name": "Gold Necklace Set",  "sku": "HAR-112", "cat": "haar-necklace-sets", "purity": "22K", "weight": 22.300, "mc": 12, "images": [img("haar", 112)]},
    {"name": "Gold Necklace Set",  "sku": "HAR-113", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("haar", 113)]},
    {"name": "Gold Necklace Set",  "sku": "HAR-114", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("haar", 114)]},
    {"name": "Gold Necklace Set",  "sku": "HAR-115", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("haar", 115)]},
    {"name": "Gold Necklace Set",  "sku": "HAR-116", "cat": "haar-necklace-sets", "purity": "22K", "weight": 0,      "mc": 12, "images": [img("haar", 116)]},
]

DESC_DEFAULT = "22K gold. Contact us for exact weight and price. Price may vary — call or WhatsApp for quote."


async def seed():
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        async with session.begin():
            await _seed(session)
    await engine.dispose()
    print("\nSeed complete.")


async def _seed(session: AsyncSession):
    # Build category slug -> id map
    needed_slugs = set(p["cat"] for p in PRODUCTS)
    cats = {}
    for slug in needed_slugs:
        result = await session.execute(select(Category).where(Category.slug == slug))
        cat = result.scalar_one_or_none()
        if cat:
            cats[slug] = cat.id
        else:
            print(f"  WARN: category '{slug}' not found — skipping its products")

    print(f"\nUpserting {len(PRODUCTS)} products...")
    created = updated = 0

    for p in PRODUCTS:
        cat_id = cats.get(p["cat"])
        if not cat_id:
            continue

        weight = p.get("weight", 0) or 0
        mc_pct = p.get("mc", 12)
        purity = p.get("purity", "22K")
        base_price = gold_price(weight, purity, mc_pct)
        slug_val = slugify(p["name"]) + "-" + p["sku"].lower().replace("/", "-")

        existing = await session.execute(select(Product).where(Product.sku == p["sku"]))
        product = existing.scalar_one_or_none()

        if product:
            product.name                = p["name"]
            product.slug                = slug_val
            product.category_id         = cat_id
            product.description         = DESC_DEFAULT
            product.material            = "gold"
            product.purity              = purity
            product.weight_grams        = weight
            product.base_price          = base_price
            product.making_charge_type  = "percentage"
            product.making_charge_value = mc_pct
            product.is_active           = True
            old_imgs = await session.execute(
                select(ProductImage).where(ProductImage.product_id == product.id)
            )
            for img_row in old_imgs.scalars().all():
                await session.delete(img_row)
            await session.flush()
            updated += 1
        else:
            product = Product(
                name                = p["name"],
                slug                = slug_val,
                category_id         = cat_id,
                description         = DESC_DEFAULT,
                material            = "gold",
                purity              = purity,
                weight_grams        = weight,
                base_price          = base_price,
                making_charge_type  = "percentage",
                making_charge_value = mc_pct,
                sku                 = p["sku"],
                stock_quantity      = 1,
                is_active           = True,
                is_featured         = False,
            )
            session.add(product)
            await session.flush()
            created += 1

        for i, url in enumerate(p["images"]):
            session.add(ProductImage(
                product_id    = product.id,
                image_url     = url,
                display_order = i,
                is_primary    = (i == 0),
            ))

    await session.flush()
    print(f"  Created: {created}")
    print(f"  Updated: {updated}")
    print(f"  Total:   {created + updated}")


if __name__ == "__main__":
    asyncio.run(seed())
