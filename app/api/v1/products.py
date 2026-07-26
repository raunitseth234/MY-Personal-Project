import hashlib
import json
from datetime import datetime, timezone
from decimal import Decimal
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy import func, or_, select, text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.rate_limit import check_rate_limit
from app.core.security import get_current_user_optional
from app.db.mongo import get_view_history, get_search_logs
from app.db.postgres import get_db
from app.db.redis import get_redis
from app.models import Category, Product, ProductImage, Review
from app.services.gold_rate import get_metal_rates
from app.services.pricing import compute_unit_price
from app.schemas.all_schemas import (
    CategoryResponse,
    ProductDetail,
    ProductImageResponse,
    ProductVariantResponse,
    ProductListItem,
    PaginatedResponse,
)

router = APIRouter(tags=["Products"])

CACHE_TTL = 300  # 5 minutes


# ─────────── HELPERS ───────────

def get_primary_image(product: Product) -> Optional[str]:
    return next(
        (img.image_url for img in product.images if img.is_primary),
        product.images[0].image_url if product.images else None,
    )


def product_to_list_item(product: Product, rates: dict) -> ProductListItem:
    return ProductListItem(
        id=product.id,
        name=product.name,
        slug=product.slug,
        primary_image=get_primary_image(product),
        base_price=product.base_price,
        discount_price=product.discount_price,
        price=compute_unit_price(product, None, rates),
        material=product.material.value,
        purity=product.purity,
        weight_grams=product.weight_grams,
        is_featured=product.is_featured,
        stock_quantity=product.stock_quantity,
        category_name=product.category.name if product.category else None,
    )


# ─────────── CATEGORIES ───────────

@router.get("/categories", response_model=list[CategoryResponse])
async def get_categories(
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    cache_key = "cache:categories"
    cached = await redis.get(cache_key)
    if cached:
        return json.loads(cached)

    result = await db.execute(
        select(Category)
        .where(Category.is_active == True, Category.parent_id == None)
        .order_by(Category.display_order)
        .options(selectinload(Category.children))
    )
    categories = result.scalars().all()

    def build_tree(cats):
        out = []
        for cat in cats:
            cr = CategoryResponse(
                id=cat.id,
                name=cat.name,
                slug=cat.slug,
                image_url=cat.image_url,
                display_order=cat.display_order,
                children=[
                    CategoryResponse(
                        id=c.id, name=c.name, slug=c.slug,
                        image_url=c.image_url, display_order=c.display_order,
                        children=[]
                    )
                    for c in (cat.children or []) if c.is_active
                ],
            )
            out.append(cr)
        return out

    tree = build_tree(categories)
    serialized = json.dumps([c.model_dump(mode="json") for c in tree], default=str)
    await redis.setex(cache_key, 600, serialized)
    return tree


# ─────────── PRODUCT LIST ───────────

@router.get("/products", response_model=PaginatedResponse)
async def list_products(
    category_slug: Optional[str] = None,
    material: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
    sort: str = Query("newest", enum=["newest", "price_asc", "price_desc", "featured"]),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    # Cache key based on all params
    param_str = f"{category_slug}:{material}:{min_price}:{max_price}:{sort}:{page}:{limit}"
    cache_key = f"cache:products:{hashlib.md5(param_str.encode()).hexdigest()}"
    cached = await redis.get(cache_key)
    if cached:
        return json.loads(cached)

    query = (
        select(Product)
        .where(Product.is_active == True)
        .options(
            selectinload(Product.images),
            selectinload(Product.category),
        )
    )

    if category_slug:
        cat_result = await db.execute(
            select(Category).where(Category.slug == category_slug)
        )
        cat = cat_result.scalar_one_or_none()
        if not cat:
            raise HTTPException(status_code=404, detail={"code": "CATEGORY_NOT_FOUND"})
        # Include subcategory products too
        sub_result = await db.execute(
            select(Category.id).where(Category.parent_id == cat.id)
        )
        sub_ids = [row[0] for row in sub_result]
        category_ids = [cat.id] + sub_ids
        query = query.where(Product.category_id.in_(category_ids))

    if material:
        query = query.where(Product.material == material)
    if min_price is not None:
        query = query.where(
            or_(Product.discount_price >= min_price, Product.base_price >= min_price)
        )
    if max_price is not None:
        query = query.where(
            or_(Product.discount_price <= max_price, Product.base_price <= max_price)
        )

    # Sort
    sort_map = {
        "newest": Product.created_at.desc(),
        "price_asc": Product.base_price.asc(),
        "price_desc": Product.base_price.desc(),
        "featured": Product.is_featured.desc(),
    }
    query = query.order_by(sort_map[sort])

    # Count
    count_result = await db.execute(select(func.count()).select_from(query.subquery()))
    total = count_result.scalar()

    # Paginate
    offset = (page - 1) * limit
    result = await db.execute(query.offset(offset).limit(limit))
    products = result.scalars().all()

    rates = await get_metal_rates(db, redis)
    items = [product_to_list_item(p, rates) for p in products]
    response = PaginatedResponse(
        items=[i.model_dump(mode="json") for i in items],
        total=total,
        page=page,
        pages=-(-total // limit),
        limit=limit,
    )
    await redis.setex(cache_key, CACHE_TTL, response.model_dump_json())
    return response


# ─────────── FEATURED PRODUCTS ───────────

@router.get("/products/featured", response_model=list[ProductListItem])
async def get_featured_products(
    limit: int = Query(12, le=24),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    cache_key = f"cache:products:featured:{limit}"
    cached = await redis.get(cache_key)
    if cached:
        return json.loads(cached)

    result = await db.execute(
        select(Product)
        .where(Product.is_active == True, Product.is_featured == True)
        .options(selectinload(Product.images), selectinload(Product.category))
        .order_by(Product.created_at.desc())
        .limit(limit)
    )
    products = result.scalars().all()
    rates = await get_metal_rates(db, redis)
    items = [product_to_list_item(p, rates) for p in products]
    serialized = json.dumps([i.model_dump(mode="json") for i in items], default=str)
    await redis.setex(cache_key, CACHE_TTL, serialized)
    return items


# ─────────── SEARCH ───────────

@router.get("/products/search", response_model=PaginatedResponse)
async def search_products(
    request: Request,
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    limit: int = Query(20, le=50),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
    current_user: Optional[dict] = Depends(get_current_user_optional),
):
    ip = request.client.host
    await check_rate_limit(redis, f"rate:search:{ip}", limit=30, window_seconds=60)

    search_term = q.strip()

    # Full-text search with ILIKE fallback
    query = (
        select(Product)
        .where(
            Product.is_active == True,
            or_(
                Product.name.ilike(f"%{search_term}%"),
                Product.description.ilike(f"%{search_term}%"),
            ),
        )
        .options(selectinload(Product.images), selectinload(Product.category))
        .order_by(Product.is_featured.desc(), Product.created_at.desc())
    )

    count_result = await db.execute(select(func.count()).select_from(query.subquery()))
    total = count_result.scalar()

    offset = (page - 1) * limit
    result = await db.execute(query.offset(offset).limit(limit))
    products = result.scalars().all()
    rates = await get_metal_rates(db, redis)
    items = [product_to_list_item(p, rates) for p in products]

    # Log to MongoDB
    logs_col = await get_search_logs()
    await logs_col.insert_one({
        "query": search_term,
        "user_id": str(current_user["sub"]) if current_user else None,
        "timestamp": datetime.now(timezone.utc),
        "results_count": total,
    })

    return PaginatedResponse(
        items=[i.model_dump(mode="json") for i in items],
        total=total,
        page=page,
        pages=-(-total // limit),
        limit=limit,
    )


# ─────────── RECENTLY VIEWED ───────────

@router.get("/products/recently-viewed", response_model=list[ProductListItem])
async def recently_viewed(
    current_user: dict = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    if not current_user:
        return []

    col = await get_view_history()
    docs = (
        await col.find({"user_id": str(current_user["sub"])})
        .sort("viewed_at", -1)
        .limit(10)
        .to_list(length=10)
    )
    product_ids = [d["product_id"] for d in docs]
    if not product_ids:
        return []

    result = await db.execute(
        select(Product)
        .where(Product.id.in_(product_ids), Product.is_active == True)
        .options(selectinload(Product.images), selectinload(Product.category))
    )
    products = {str(p.id): p for p in result.scalars().all()}
    rates = await get_metal_rates(db, redis)
    return [product_to_list_item(products[pid], rates) for pid in product_ids if pid in products]


# ─────────── PRODUCT DETAIL ───────────

@router.get("/products/{slug}", response_model=ProductDetail)
async def get_product(
    slug: str,
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
    current_user: Optional[dict] = Depends(get_current_user_optional),
):
    result = await db.execute(
        select(Product)
        .where(Product.slug == slug, Product.is_active == True)
        .options(
            selectinload(Product.images),
            selectinload(Product.variants),
            selectinload(Product.category),
            selectinload(Product.reviews),
        )
    )
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail={"code": "PRODUCT_NOT_FOUND"})

    # Log view to MongoDB (fire and forget)
    if current_user:
        col = await get_view_history()
        await col.update_one(
            {"user_id": str(current_user["sub"]), "product_id": str(product.id)},
            {"$set": {"viewed_at": datetime.now(timezone.utc)}},
            upsert=True,
        )

    # Compute ratings
    ratings = [r.rating for r in product.reviews]
    avg_rating = sum(ratings) / len(ratings) if ratings else None

    rates = await get_metal_rates(db, redis)

    return ProductDetail(
        id=product.id,
        name=product.name,
        slug=product.slug,
        description=product.description,
        material=product.material.value,
        purity=product.purity,
        weight_grams=product.weight_grams,
        base_price=product.base_price,
        discount_price=product.discount_price,
        price=compute_unit_price(product, None, rates),
        sku=product.sku,
        stock_quantity=product.stock_quantity,
        is_featured=product.is_featured,
        primary_image=get_primary_image(product),
        category_name=product.category.name if product.category else None,
        images=[
            ProductImageResponse.model_validate(img)
            for img in sorted(product.images, key=lambda i: i.display_order)
        ],
        variants=[
            ProductVariantResponse(
                id=v.id,
                variant_name=v.variant_name,
                purity=v.purity,
                additional_price=v.additional_price,
                stock_quantity=v.stock_quantity,
                price=compute_unit_price(product, v, rates),
            )
            for v in product.variants
        ],
        category=CategoryResponse(
            id=product.category.id,
            name=product.category.name,
            slug=product.category.slug,
            image_url=product.category.image_url,
            display_order=product.category.display_order,
            children=[],
        ) if product.category else None,
        average_rating=round(avg_rating, 1) if avg_rating else None,
        review_count=len(ratings),
    )


# ─────────── RELATED PRODUCTS ───────────

@router.get("/products/{product_id}/related", response_model=list[ProductListItem])
async def related_products(
    product_id: str,
    limit: int = 8,
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    product_result = await db.execute(
        select(Product).where(Product.id == product_id)
    )
    product = product_result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})

    result = await db.execute(
        select(Product)
        .where(
            Product.category_id == product.category_id,
            Product.id != product.id,
            Product.is_active == True,
        )
        .options(selectinload(Product.images), selectinload(Product.category))
        .order_by(Product.is_featured.desc())
        .limit(limit)
    )
    rates = await get_metal_rates(db, redis)
    return [product_to_list_item(p, rates) for p in result.scalars().all()]


# ─────────── REVIEWS ───────────

reviews_router = APIRouter(tags=["Reviews"])


@reviews_router.get("/products/{product_id}/reviews")
async def get_reviews(product_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Review)
        .where(Review.product_id == product_id)
        .options(selectinload(Review.user))
        .order_by(Review.created_at.desc())
    )
    reviews = result.scalars().all()
    return [
        {
            "id": str(r.id),
            "user_name": r.user.name if r.user else "Anonymous",
            "rating": r.rating,
            "comment": r.comment,
            "is_verified_purchase": r.is_verified_purchase,
            "created_at": r.created_at.isoformat(),
        }
        for r in reviews
    ]


@reviews_router.post("/products/{product_id}/reviews", status_code=201)
async def add_review(
    product_id: str,
    data: dict,
    current_user: dict = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    from app.models import Review as ReviewModel
    if not current_user:
        raise HTTPException(status_code=401, detail={"code": "NOT_AUTHENTICATED"})

    await check_rate_limit(redis, f"rate:review:{current_user['sub']}", limit=5, window_seconds=3600)

    review = ReviewModel(
        product_id=product_id,
        user_id=current_user["sub"],
        rating=data.get("rating"),
        comment=data.get("comment"),
    )
    db.add(review)
    await db.flush()
    return {"id": str(review.id), "message": "Review added"}
