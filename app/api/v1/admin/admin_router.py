"""
Admin panel APIs for Rajesh Jewellers.
All endpoints require role=admin or role=staff.
"""
import uuid
from datetime import datetime, timezone, timedelta
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select, and_, cast, Date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.security import require_admin, require_super_admin
from app.db.mongo import get_mongo_db
from app.db.postgres import get_db
from app.db.redis import get_redis
from app.models import (
    Category, Coupon, Order, OrderItem, OrderStatus,
    Product, ProductImage, StoreLocation, User
)
from app.schemas.all_schemas import (
    CouponCreate,
    MessageResponse,
    OrderStatusUpdate,
    ProductCreate,
    ProductUpdate,
    StockUpdate,
)
from app.services.storage import StorageService

router = APIRouter(prefix="/admin", tags=["Admin"])

VALID_STATUS_TRANSITIONS = {
    OrderStatus.pending: [OrderStatus.confirmed, OrderStatus.cancelled],
    OrderStatus.confirmed: [OrderStatus.shipped, OrderStatus.cancelled],
    OrderStatus.shipped: [OrderStatus.delivered],
    OrderStatus.delivered: [OrderStatus.returned],
    OrderStatus.cancelled: [],
    OrderStatus.returned: [],
}


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
    data: dict,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    image_url = data.get("image_url")
    is_primary = data.get("is_primary", False)

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
    data: dict,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    slug = data["name"].lower().replace(" ", "-")
    cat = Category(
        name=data["name"],
        slug=slug,
        parent_id=data.get("parent_id"),
        image_url=data.get("image_url"),
        display_order=data.get("display_order", 0),
    )
    db.add(cat)
    await db.flush()
    await redis.delete("cache:categories")
    return {"id": str(cat.id), "slug": cat.slug}


@router.put("/categories/{category_id}")
async def update_category(
    category_id: str,
    data: dict,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    result = await db.execute(select(Category).where(Category.id == category_id))
    cat = result.scalar_one_or_none()
    if not cat:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
    for k in ("name", "image_url", "display_order", "is_active"):
        if k in data:
            setattr(cat, k, data[k])
    await redis.delete("cache:categories")
    return {"message": "Category updated"}


# ─────────── ORDERS ───────────

@router.get("/orders")
async def list_all_orders(
    status: str = None,
    payment_status: str = None,
    date_from: str = None,
    date_to: str = None,
    search: str = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, le=50),
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    query = select(Order).options(selectinload(Order.items), selectinload(Order.user))

    if status:
        query = query.where(Order.status == status)
    if payment_status:
        query = query.where(Order.payment_status == payment_status)
    if date_from:
        query = query.where(Order.created_at >= datetime.fromisoformat(date_from))
    if date_to:
        query = query.where(Order.created_at <= datetime.fromisoformat(date_to))
    if search:
        query = query.join(User).where(
            Order.order_number.ilike(f"%{search}%") |
            User.phone.ilike(f"%{search}%") |
            User.name.ilike(f"%{search}%")
        )

    count_result = await db.execute(select(func.count()).select_from(query.subquery()))
    total = count_result.scalar()

    query = query.order_by(Order.created_at.desc()).offset((page-1)*limit).limit(limit)
    result = await db.execute(query)
    orders = result.scalars().all()

    return {
        "items": [
            {
                "id": str(o.id),
                "order_number": o.order_number,
                "status": o.status.value,
                "payment_status": o.payment_status.value,
                "total_amount": float(o.total_amount),
                "customer_name": o.user.name if o.user else None,
                "customer_phone": o.user.phone if o.user else None,
                "items_count": len(o.items),
                "created_at": o.created_at.isoformat(),
            }
            for o in orders
        ],
        "total": total,
        "page": page,
        "pages": -(-total // limit),
    }


@router.put("/orders/{order_id}/status")
async def update_order_status(
    order_id: str,
    data: OrderStatusUpdate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Order).where(Order.id == order_id))
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})

    try:
        new_status = OrderStatus(data.status)
    except ValueError:
        raise HTTPException(status_code=400, detail={"code": "INVALID_STATUS"})

    allowed = VALID_STATUS_TRANSITIONS.get(order.status, [])
    if new_status not in allowed:
        raise HTTPException(
            status_code=400,
            detail={
                "code": "INVALID_TRANSITION",
                "message": f"Cannot move from '{order.status.value}' to '{data.status}'",
            },
        )

    order.status = new_status
    return {"message": f"Order status updated to {data.status}"}


# ─────────── COUPONS ───────────

@router.get("/coupons")
async def list_coupons(
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Coupon).order_by(Coupon.expiry_date.desc()))
    coupons = result.scalars().all()
    return [
        {
            "id": str(c.id),
            "code": c.code,
            "discount_type": c.discount_type.value,
            "discount_value": float(c.discount_value),
            "min_order_value": float(c.min_order_value),
            "expiry_date": c.expiry_date.isoformat(),
            "usage_limit": c.usage_limit,
            "used_count": c.used_count,
            "is_active": c.is_active,
        }
        for c in coupons
    ]


@router.post("/coupons", status_code=201)
async def create_coupon(
    data: CouponCreate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    coupon = Coupon(**data.model_dump())
    db.add(coupon)
    await db.flush()
    return {"id": str(coupon.id), "code": coupon.code}


@router.delete("/coupons/{coupon_id}", response_model=MessageResponse)
async def delete_coupon(
    coupon_id: str,
    admin=Depends(require_super_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Coupon).where(Coupon.id == coupon_id))
    coupon = result.scalar_one_or_none()
    if not coupon:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
    coupon.is_active = False
    return MessageResponse(message="Coupon deactivated")


# ─────────── ANALYTICS DASHBOARD ───────────

@router.get("/analytics/dashboard")
async def analytics_dashboard(
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    import json
    cached = await redis.get("cache:admin:dashboard")
    if cached:
        return json.loads(cached)

    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    thirty_days_ago = now - timedelta(days=30)
    seven_days_ago = now - timedelta(days=7)

    # Today's stats
    today_orders = await db.execute(
        select(func.count(), func.sum(Order.total_amount))
        .where(Order.created_at >= today_start, Order.status != OrderStatus.cancelled)
    )
    today_count, today_revenue = today_orders.one()

    # Last 30 days
    month_orders = await db.execute(
        select(func.count(), func.sum(Order.total_amount))
        .where(Order.created_at >= thirty_days_ago, Order.status != OrderStatus.cancelled)
    )
    month_count, month_revenue = month_orders.one()
    avg_order = (month_revenue / month_count) if month_count else 0

    # Top products by quantity sold
    top_products = await db.execute(
        select(
            OrderItem.product_id,
            OrderItem.product_name_snapshot,
            func.sum(OrderItem.quantity).label("qty_sold"),
        )
        .join(Order)
        .where(Order.created_at >= thirty_days_ago, Order.status != OrderStatus.cancelled)
        .group_by(OrderItem.product_id, OrderItem.product_name_snapshot)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(10)
    )

    # Low stock alerts
    low_stock = await db.execute(
        select(Product.id, Product.name, Product.stock_quantity)
        .where(Product.is_active == True, Product.stock_quantity < 5)
        .order_by(Product.stock_quantity)
    )

    # Order status breakdown
    status_breakdown = await db.execute(
        select(Order.status, func.count())
        .group_by(Order.status)
    )

    # Daily revenue (last 30 days)
    daily_revenue = await db.execute(
        select(
            cast(Order.created_at, Date).label("date"),
            func.sum(Order.total_amount).label("revenue"),
        )
        .where(Order.created_at >= thirty_days_ago, Order.status != OrderStatus.cancelled)
        .group_by(cast(Order.created_at, Date))
        .order_by(cast(Order.created_at, Date))
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
        "today": {
            "orders_count": today_count or 0,
            "revenue": float(today_revenue or 0),
        },
        "last_30_days": {
            "orders_count": month_count or 0,
            "revenue": float(month_revenue or 0),
            "avg_order_value": float(avg_order or 0),
        },
        "top_products": [
            {"product_id": str(r[0]), "name": r[1], "qty_sold": r[2]}
            for r in top_products.all()
        ],
        "low_stock_alerts": [
            {"product_id": str(r[0]), "name": r[1], "stock": r[2]}
            for r in low_stock.all()
        ],
        "order_status_breakdown": {
            r[0].value: r[1] for r in status_breakdown.all()
        },
        "daily_revenue_chart": [
            {"date": str(r[0]), "revenue": float(r[1])}
            for r in daily_revenue.all()
        ],
        "top_searches": top_searches,
    }

    await redis.setex("cache:admin:dashboard", 300, json.dumps(result))
    return result
