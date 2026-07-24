from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.security import get_current_user
from app.db.postgres import get_db
from app.db.redis import get_redis
from app.models import CartItem, Product, ProductVariant, WishlistItem
from app.services.gold_rate import get_metal_rates
from app.services.pricing import compute_unit_price
from app.schemas.all_schemas import (
    CartAddRequest,
    CartItemResponse,
    CartResponse,
    CartUpdateRequest,
    MessageResponse,
)

router = APIRouter(prefix="/cart", tags=["Cart"])
wishlist_router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


async def invalidate_cart_count(redis, user_id: str):
    await redis.delete(f"cart:count:{user_id}")


# ─────────── CART ───────────

@router.get("", response_model=CartResponse)
async def get_cart(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    result = await db.execute(
        select(CartItem)
        .where(CartItem.user_id == current_user["sub"])
        .options(
            selectinload(CartItem.product).selectinload(Product.images),
            selectinload(CartItem.variant),
        )
    )
    items = result.scalars().all()

    rates = await get_metal_rates(db, redis)
    cart_items = []
    subtotal = Decimal("0")

    for item in items:
        product = item.product
        if not product or not product.is_active:
            continue

        unit_price = compute_unit_price(product, item.variant, rates)

        line_total = unit_price * item.quantity
        subtotal += line_total

        primary_img = next(
            (img.image_url for img in product.images if img.is_primary),
            product.images[0].image_url if product.images else None,
        )
        stock_available = (
            item.variant.stock_quantity if item.variant else product.stock_quantity
        )

        cart_items.append(
            CartItemResponse(
                id=item.id,
                product_id=product.id,
                product_name=product.name,
                product_image=primary_img,
                product_slug=product.slug,
                variant_id=item.variant_id,
                variant_name=item.variant.variant_name if item.variant else None,
                quantity=item.quantity,
                unit_price=unit_price,
                line_total=line_total,
                stock_available=stock_available,
                stock_issue=item.quantity > stock_available,
            )
        )

    return CartResponse(
        items=cart_items,
        total_items=sum(i.quantity for i in cart_items),
        subtotal=subtotal,
        item_count=len(cart_items),
    )


@router.get("/count")
async def cart_count(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    user_id = str(current_user["sub"])
    cache_key = f"cart:count:{user_id}"
    cached = await redis.get(cache_key)
    if cached:
        return {"count": int(cached)}

    result = await db.execute(
        select(CartItem).where(CartItem.user_id == user_id)
    )
    items = result.scalars().all()
    count = sum(i.quantity for i in items)
    await redis.setex(cache_key, 300, str(count))
    return {"count": count}


@router.post("/add", response_model=MessageResponse, status_code=201)
async def add_to_cart(
    data: CartAddRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    user_id = str(current_user["sub"])

    # Validate product
    p_result = await db.execute(
        select(Product).where(Product.id == data.product_id, Product.is_active == True)
    )
    product = p_result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail={"code": "PRODUCT_NOT_FOUND"})

    # Validate stock
    available_stock = product.stock_quantity
    if data.variant_id:
        v_result = await db.execute(
            select(ProductVariant).where(
                ProductVariant.id == data.variant_id,
                ProductVariant.product_id == product.id,
            )
        )
        variant = v_result.scalar_one_or_none()
        if not variant:
            raise HTTPException(status_code=404, detail={"code": "VARIANT_NOT_FOUND"})
        available_stock = variant.stock_quantity

    if data.quantity > available_stock:
        raise HTTPException(
            status_code=400,
            detail={"code": "INSUFFICIENT_STOCK", "message": f"Only {available_stock} in stock"},
        )

    # Check if already in cart
    existing_result = await db.execute(
        select(CartItem).where(
            CartItem.user_id == user_id,
            CartItem.product_id == data.product_id,
            CartItem.variant_id == data.variant_id,
        )
    )
    existing = existing_result.scalar_one_or_none()

    if existing:
        new_qty = existing.quantity + data.quantity
        if new_qty > available_stock:
            raise HTTPException(
                status_code=400,
                detail={"code": "INSUFFICIENT_STOCK", "message": f"Only {available_stock} available"},
            )
        existing.quantity = new_qty
    else:
        cart_item = CartItem(
            user_id=user_id,
            product_id=data.product_id,
            variant_id=data.variant_id,
            quantity=data.quantity,
        )
        db.add(cart_item)

    await invalidate_cart_count(redis, user_id)
    return MessageResponse(message="Added to cart")


@router.put("/items/{item_id}", response_model=MessageResponse)
async def update_cart_item(
    item_id: str,
    data: CartUpdateRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    user_id = str(current_user["sub"])
    result = await db.execute(
        select(CartItem).where(
            CartItem.id == item_id,
            CartItem.user_id == user_id,
        )
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})

    if data.quantity == 0:
        await db.delete(item)
    else:
        item.quantity = data.quantity

    await invalidate_cart_count(redis, user_id)
    return MessageResponse(message="Cart updated")


@router.delete("/items/{item_id}", response_model=MessageResponse)
async def remove_cart_item(
    item_id: str,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    user_id = str(current_user["sub"])
    result = await db.execute(
        select(CartItem).where(
            CartItem.id == item_id,
            CartItem.user_id == user_id,
        )
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
    await db.delete(item)
    await invalidate_cart_count(redis, user_id)
    return MessageResponse(message="Item removed")


@router.delete("/clear", response_model=MessageResponse)
async def clear_cart(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    user_id = str(current_user["sub"])
    result = await db.execute(
        select(CartItem).where(CartItem.user_id == user_id)
    )
    for item in result.scalars().all():
        await db.delete(item)
    await invalidate_cart_count(redis, user_id)
    return MessageResponse(message="Cart cleared")


# ─────────── WISHLIST ───────────

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


@wishlist_router.post("/{product_id}/move-to-cart", response_model=MessageResponse)
async def move_to_cart(
    product_id: str,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    user_id = str(current_user["sub"])

    # Remove from wishlist
    w_result = await db.execute(
        select(WishlistItem).where(
            WishlistItem.user_id == user_id,
            WishlistItem.product_id == product_id,
        )
    )
    wishlist_item = w_result.scalar_one_or_none()
    if wishlist_item:
        await db.delete(wishlist_item)

    # Add to cart (if not already there)
    c_result = await db.execute(
        select(CartItem).where(
            CartItem.user_id == user_id,
            CartItem.product_id == product_id,
            CartItem.variant_id == None,
        )
    )
    if not c_result.scalar_one_or_none():
        cart_item = CartItem(user_id=user_id, product_id=product_id, quantity=1)
        db.add(cart_item)

    await invalidate_cart_count(redis, user_id)
    return MessageResponse(message="Moved to cart")
