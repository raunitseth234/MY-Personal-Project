from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select

from app.core.security import get_current_user
from app.db.postgres import get_db
from app.models import Product, WishlistItem

wishlist_router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


@wishlist_router.get("", response_model=list)
async def get_wishlist(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(WishlistItem)
        .where(WishlistItem.user_id == current_user["sub"])
        .options(
            selectinload(WishlistItem.product).selectinload(Product.images),
            selectinload(WishlistItem.product).selectinload(Product.category),
        )
    )
    items = result.scalars().all()
    output = []
    for item in items:
        product = item.product
        if not product:
            continue
        primary_img = next(
            (img.image_url for img in product.images if img.is_primary),
            product.images[0].image_url if product.images else None,
        )
        output.append({
            "id": str(item.id),
            "product_id": str(product.id),
            "name": product.name,
            "slug": product.slug,
            "primary_image": primary_img,
            "base_price": float(product.base_price),
            "discount_price": float(product.discount_price) if product.discount_price else None,
            "added_at": item.added_at.isoformat(),
        })
    return output


@wishlist_router.post("/toggle")
async def toggle_wishlist(
    data: dict,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    product_id = data.get("product_id")
    user_id = str(current_user["sub"])

    result = await db.execute(
        select(WishlistItem).where(
            WishlistItem.user_id == user_id,
            WishlistItem.product_id == product_id,
        )
    )
    existing = result.scalar_one_or_none()

    if existing:
        await db.delete(existing)
        return {"in_wishlist": False, "message": "Removed from wishlist"}
    else:
        item = WishlistItem(user_id=user_id, product_id=product_id)
        db.add(item)
        return {"in_wishlist": True, "message": "Added to wishlist"}
