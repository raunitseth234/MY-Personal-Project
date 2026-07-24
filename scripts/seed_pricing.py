"""
Idempotent pricing + catalog-expansion seed.

Run:  docker compose exec -T api python scripts/seed_pricing.py

Does:
  1. Upsert metal_rates fallback values.
  2. For every existing product: set making charge, fix its image(s) to a
     category-correct one, add carat variants where sensible, and recompute
     base_price from fallback rates (so list sort/filter stays coherent).
  3. Upsert the NEW_PRODUCTS catalog expansion (create or update by SKU),
     with correct images and carat variants.

Live pricing at request time always overrides base_price for gold/silver/platinum.
"""
import asyncio
import os
import sys
from decimal import Decimal
from types import SimpleNamespace

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, os.path.dirname(__file__))  # so `catalog_data` imports

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.db.postgres import AsyncSessionLocal
from app.models import (
    Category, Product, ProductImage, ProductVariant, MetalRate, MaterialType,
)
from app.services.pricing import compute_unit_price

from catalog_data import (
    IMG, u, CATEGORY_IMAGES, FALLBACK_RATES, MAKING_BY_MATERIAL,
    MAKING_KEYWORD_OVERRIDES, CARAT_CHOICES, CARAT_CATEGORIES, NEW_PRODUCTS,
)

DYNAMIC = {"gold", "silver", "platinum"}


def rates_dict():
    return {(m, p): Decimal(str(v)) for m, p, v in FALLBACK_RATES}


def making_for(material: str, name: str):
    lname = name.lower()
    for keywords, mc in MAKING_KEYWORD_OVERRIDES:
        if any(k in lname for k in keywords):
            return mc
    return MAKING_BY_MATERIAL.get(material, ("percentage", 0))


def default_purity(carats: list[str]) -> str:
    return "22K" if "22K" in carats else carats[0]


async def set_images(db, product, img_keys):
    """Replace the product's images with the given verified pool keys."""
    existing = await db.execute(
        select(ProductImage).where(ProductImage.product_id == product.id)
    )
    for img in existing.scalars().all():
        await db.delete(img)
    for i, key in enumerate(img_keys):
        db.add(ProductImage(
            product_id=product.id, image_url=u(IMG[key]),
            display_order=i, is_primary=(i == 0),
        ))


async def add_carat_variants(db, product, carats):
    """Add carat variants only if the product has none (keeps it idempotent
    and avoids breaking cart rows that reference a variant_id)."""
    existing = await db.execute(
        select(ProductVariant).where(ProductVariant.product_id == product.id)
    )
    if existing.scalars().first():
        return
    per = max(3, (product.stock_quantity or 0) // max(1, len(carats)))
    for carat in carats:
        db.add(ProductVariant(
            product_id=product.id,
            variant_name=f"{carat} Gold",
            purity=carat,
            additional_price=0,
            stock_quantity=per,
        ))


def compute_base(material, purity, weight, mc, rates, static_base, static_disc):
    shim = SimpleNamespace(
        material=material, purity=purity,
        weight_grams=Decimal(str(weight)) if weight else None,
        making_charge_type=mc[0], making_charge_value=Decimal(str(mc[1])),
        base_price=Decimal(str(static_base or 0)),
        discount_price=Decimal(str(static_disc)) if static_disc else None,
    )
    return compute_unit_price(shim, None, rates)


async def seed():
    rates = rates_dict()
    async with AsyncSessionLocal() as db:
        # ── 1. metal rates ───────────────────────────────────────────────
        print("Upserting metal rates...")
        for material, purity, value in FALLBACK_RATES:
            res = await db.execute(
                select(MetalRate).where(
                    MetalRate.material == material, MetalRate.purity == purity
                )
            )
            row = res.scalar_one_or_none()
            if row:
                row.rate_per_gram = Decimal(str(value))
            else:
                db.add(MetalRate(material=material, purity=purity, rate_per_gram=Decimal(str(value))))
        await db.flush()

        # category slug lookup
        cat_res = await db.execute(select(Category))
        cat_by_slug = {c.slug: c for c in cat_res.scalars().all()}

        # ── 2. fix existing products ─────────────────────────────────────
        print("Updating existing products (images, making, variants, base)...")
        existing = await db.execute(
            select(Product).options(
                selectinload(Product.category),
                selectinload(Product.variants),
            )
        )
        existing_by_sku = {}
        for product in existing.scalars().all():
            existing_by_sku[product.sku] = product
            material = product.material.value
            cat_slug = product.category.slug if product.category else None

            mc = making_for(material, product.name)
            product.making_charge_type, product.making_charge_value = mc[0], Decimal(str(mc[1]))

            # correct image by category
            if cat_slug in CATEGORY_IMAGES:
                await set_images(db, product, CATEGORY_IMAGES[cat_slug][:2])

            # carat variants for gold jewellery categories
            if (material == "gold" and cat_slug in CARAT_CATEGORIES
                    and not any(k in product.name.lower() for k in ("coin", "bar", "biscuit"))):
                await add_carat_variants(db, product, ["18K", "22K"])

            # recompute base for dynamic materials; drop misleading strikethrough
            if material in DYNAMIC and product.weight_grams:
                product.base_price = compute_base(
                    material, product.purity, product.weight_grams, mc, rates, None, None
                )
                product.discount_price = None

        await db.flush()

        # ── 3. upsert NEW_PRODUCTS ───────────────────────────────────────
        print("Upserting catalog expansion...")
        created, updated = 0, 0
        for d in NEW_PRODUCTS:
            material = d["material"]
            mc = making_for(material, d["name"])
            carats = d.get("carats")
            purity = default_purity(carats) if carats else d["purity"]

            if material in DYNAMIC:
                base_price = compute_base(material, purity, d["weight"], mc, rates, None, None)
                discount_price = None
            else:
                base_price = Decimal(str(d["base"]))
                discount_price = Decimal(str(d["disc"])) if d.get("disc") else None

            product = existing_by_sku.get(d["sku"])
            if product:
                updated += 1
            else:
                product = Product(sku=d["sku"], category_id=cat_by_slug[d["cat"]].id)
                db.add(product)
                created += 1

            product.name = d["name"]
            product.slug = d["slug"]
            product.category_id = cat_by_slug[d["cat"]].id
            product.description = d["desc"]
            product.material = MaterialType(material)
            product.purity = purity
            product.weight_grams = Decimal(str(d["weight"]))
            product.making_charge_type, product.making_charge_value = mc[0], Decimal(str(mc[1]))
            product.base_price = base_price
            product.discount_price = discount_price
            product.stock_quantity = d["stock"]
            product.is_featured = d.get("featured", False)
            product.is_active = True
            await db.flush()

            await set_images(db, product, d["imgs"])
            if carats:
                await add_carat_variants(db, product, carats)

        await db.commit()
        print(f"\nDone. New products created: {created}, updated: {updated}.")
        print("Metal rates + making charges + images + carat variants seeded.")


if __name__ == "__main__":
    asyncio.run(seed())
