"""
Adds 3 missing products that were excluded from the initial seed:
  - haar_021: Bridal Choker Set with Maang Tikka (8.47.45 AM)
  - haar_022: Gold Choker Necklace (8.47.46 AM group)
  - earrings_011: Bridal Gold Nath with Chain (8.47.34 AM (2))

Run inside Docker: docker exec rajesh_api python scripts/seed_add_missing.py
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


def img(category: str, product: int, image: int) -> str:
    return f"/static/images/products/{category}_{product:03d}_{image:02d}.jpg"


def img_list(category: str, product: int, count: int) -> list[str]:
    return [img(category, product, i) for i in range(1, count + 1)]


NEW_PRODUCTS = [
    {
        "category_slug": "haar-necklace-sets",
        "name": "Gold Bridal Choker Set with Maang Tikka",
        "sku": "HAR-021",
        "weight": 45.0,
        "mc": 12,
        "images": img_list("haar", 21, 1),
        "featured": False,
        "desc": "Gold bridal choker necklace paired with maang tikka (matha patti), displayed on teal mannequin. Price may vary — contact us for exact quote.",
    },
    {
        "category_slug": "haar-necklace-sets",
        "name": "Gold Choker Necklace with Floral Centerpiece",
        "sku": "HAR-022",
        "weight": 30.0,
        "mc": 12,
        "images": img_list("haar", 22, 3),
        "featured": False,
        "desc": "Traditional gold choker necklace with circular floral centerpiece, displayed on teal mannequin. Price may vary — contact us for exact quote.",
    },
    {
        "category_slug": "earrings",
        "name": "Bridal Gold Nath with Peacock Meenakari and Chain",
        "sku": "ERG-011",
        "weight": 20.0,
        "mc": 15,
        "images": img_list("earrings", 11, 1),
        "featured": False,
        "desc": "Large circular bridal nath (nose ring) with peacock meenakari motif, green and red stone accents, and cascading ghungroo chain. Price may vary — contact us for exact quote.",
    },
]


async def seed():
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        async with session.begin():
            await _seed(session)

    await engine.dispose()
    print("\nSeed complete.")


async def _seed(session: AsyncSession):
    total = 0
    for p in NEW_PRODUCTS:
        # Find category
        result = await session.execute(
            select(Category).where(Category.slug == p["category_slug"])
        )
        cat = result.scalar_one_or_none()
        if not cat:
            print(f"  SKIP: category '{p['category_slug']}' not found")
            continue

        # Check if SKU already exists to avoid duplicates
        existing = await session.execute(
            select(Product).where(Product.sku == p["sku"])
        )
        if existing.scalar_one_or_none():
            print(f"  SKIP: product with SKU {p['sku']} already exists")
            continue

        weight = p["weight"]
        mc_pct = p["mc"]
        base_price = round(weight * 7500 * (1 + mc_pct / 100) * 1.03)

        product = Product(
            name=p["name"],
            slug=slugify(p["name"]) + "-" + p["sku"].lower(),
            category_id=cat.id,
            description=p["desc"],
            material="gold",
            purity="22K",
            weight_grams=weight,
            base_price=base_price,
            making_charge_type="percentage",
            making_charge_value=mc_pct,
            sku=p["sku"],
            stock_quantity=1,
            is_active=True,
            is_featured=p.get("featured", False),
        )
        session.add(product)
        await session.flush()

        for i, url in enumerate(p["images"]):
            img_obj = ProductImage(
                product_id=product.id,
                image_url=url,
                display_order=i,
                is_primary=(i == 0),
            )
            session.add(img_obj)

        total += 1
        print(f"  + {p['name']} ({weight}g) -> {cat.name}")

    await session.flush()
    print(f"\nAdded {total} new products.")


if __name__ == "__main__":
    asyncio.run(seed())
