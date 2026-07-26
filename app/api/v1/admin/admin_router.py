"""
Admin panel APIs for Rajesh Jewellers.
All endpoints require role=admin or role=staff.
"""
import json
import uuid
from datetime import datetime, timezone, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import require_admin
from app.db.mongo import get_mongo_db
from app.db.postgres import get_db
from app.db.redis import get_redis
from app.models import Category, Product, ProductImage, StoreLocation
from app.schemas.all_schemas import (
    CategoryCreate,
    CategoryUpdate,
    ImageConfirmRequest,
    MessageResponse,
    ProductCreate,
    ProductUpdate,
    StockUpdate,
)
from app.services.storage import StorageService

router = APIRouter(prefix="/admin", tags=["Admin"])


# ─────────── PRODUCTS ───────────

@router.post("/products", status_code=201)
async def create_product(
    data: ProductCreate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    slug = data.name.lower().replace(" ", "-").replace("/", "-") + "-" + str(uuid.uuid4().hex[:6])
    product = Product(slug=slug, **data.model_dump())
    db.add(product)
    await db.flush()

    # Invalidate caches
    keys = await redis.keys("cache:products:*")
    if keys:
        await redis.delete(*keys)

    return {"id": str(product.id), "slug": product.slug, "message": "Product created"}


@router.put("/products/{product_id}")
async def update_product(
    product_id: str,
    data: ProductUpdate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})

    for k, v in data.model_dump(exclude_none=True).items():
        setattr(product, k, v)

    keys = await redis.keys("cache:products:*")
    if keys:
        await redis.delete(*keys)
    return {"message": "Product updated"}


@router.delete("/products/{product_id}", response_model=MessageResponse)
async def delete_product(
    product_id: str,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    """Soft delete — sets is_active=False. Orders referencing this product still work."""
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})

    product.is_active = False  # SOFT DELETE
    keys = await redis.keys("cache:products:*")
    if keys:
        await redis.delete(*keys)
    return MessageResponse(message="Product deactivated")


@router.put("/products/{product_id}/stock")
async def update_stock(
    product_id: str,
    data: StockUpdate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
    product.stock_quantity = data.stock_quantity
    return {"message": f"Stock updated to {data.stock_quantity}"}


@router.post("/products/{product_id}/images/presign")
async def get_presigned_url(
    product_id: str,
    admin=Depends(require_admin),
):
    """
    Generates an S3 presigned URL for image upload.
    Requires AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET in .env.
    """
    storage = StorageService()
    result = await storage.generate_presigned_url(product_id)
    return result


@router.post("/products/{product_id}/images/confirm")
async def confirm_image_upload(
    product_id: str,
    data: ImageConfirmRequest,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    storage = StorageService()
    if not storage.is_valid_uploaded_image_url(data.image_url, product_id):
        raise HTTPException(
            status_code=400,
            detail={
                "code": "INVALID_IMAGE_URL",
                "message": "image_url must be the exact URL returned by /images/presign for this product.",
            },
        )
    image_url = data.image_url
    is_primary = data.is_primary

    if is_primary:
        # Unset other primary images
        result = await db.execute(
            select(ProductImage).where(
                ProductImage.product_id == product_id,
                ProductImage.is_primary == True,
            )
        )
        for img in result.scalars().all():
            img.is_primary = False

    count_result = await db.execute(
        select(func.count()).select_from(ProductImage).where(
            ProductImage.product_id == product_id
        )
    )
    order = count_result.scalar()

    img = ProductImage(
        product_id=product_id,
        image_url=image_url,
        display_order=order,
        is_primary=is_primary,
    )
    db.add(img)
    await db.flush()
    return {"id": str(img.id), "message": "Image confirmed"}


# ─────────── CATEGORIES ───────────

@router.post("/categories", status_code=201)
async def create_category(
    data: CategoryCreate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    slug = data.name.lower().replace(" ", "-")
    cat = Category(
        name=data.name,
        slug=slug,
        parent_id=data.parent_id,
        image_url=data.image_url,
        display_order=data.display_order,
    )
    db.add(cat)
    await db.flush()
    await redis.delete("cache:categories")
    return {"id": str(cat.id), "slug": cat.slug}


@router.put("/categories/{category_id}")
async def update_category(
    category_id: str,
    data: CategoryUpdate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    result = await db.execute(select(Category).where(Category.id == category_id))
    cat = result.scalar_one_or_none()
    if not cat:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(cat, k, v)
    await redis.delete("cache:categories")
    return {"message": "Category updated"}


# ─────────── ANALYTICS DASHBOARD ───────────

@router.get("/analytics/dashboard")
async def analytics_dashboard(
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    cached = await redis.get("cache:admin:dashboard")
    if cached:
        return json.loads(cached)

    seven_days_ago = datetime.now(timezone.utc) - timedelta(days=7)

    # Low stock alerts
    low_stock = await db.execute(
        select(Product.id, Product.name, Product.stock_quantity)
        .where(Product.is_active == True, Product.stock_quantity < 5)
        .order_by(Product.stock_quantity)
    )

    # Top searches from MongoDB
    mongo_db = get_mongo_db()
    top_searches_cursor = mongo_db["search_logs"].aggregate([
        {"$match": {"timestamp": {"$gte": seven_days_ago}}},
        {"$group": {"_id": "$query", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10},
    ])
    top_searches = [{"query": d["_id"], "count": d["count"]} async for d in top_searches_cursor]

    result = {
        "low_stock_alerts": [
            {"product_id": str(r[0]), "name": r[1], "stock": r[2]}
            for r in low_stock.all()
        ],
        "top_searches": top_searches,
    }

    await redis.setex("cache:admin:dashboard", 300, json.dumps(result))
    return result
