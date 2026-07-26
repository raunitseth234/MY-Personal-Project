import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.all_models import Category, Product, ProductImage, MaterialType


async def create_test_category(db: AsyncSession) -> Category:
    cat = Category(name="Test Rings", slug="test-rings-unique", display_order=1)
    db.add(cat)
    await db.flush()
    return cat


async def create_test_product(db: AsyncSession, category_id, name="Test Ring", sku="TST001") -> Product:
    product = Product(
        name=name, slug=name.lower().replace(" ", "-") + "-" + sku,
        category_id=category_id,
        material=MaterialType.gold, purity="22K",
        base_price=25000, sku=sku,
        stock_quantity=10, is_active=True, is_featured=True,
    )
    db.add(product)
    await db.flush()

    img = ProductImage(
        product_id=product.id,
        image_url="https://images.unsplash.com/photo-test",
        display_order=0, is_primary=True,
    )
    db.add(img)
    await db.flush()
    return product


@pytest.mark.asyncio
async def test_get_categories(client: AsyncClient, db: AsyncSession):
    await create_test_category(db)
    await db.commit()
    r = await client.get("/api/v1/categories")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


@pytest.mark.asyncio
async def test_list_products(client: AsyncClient, db: AsyncSession):
    cat = await create_test_category(db)
    await create_test_product(db, cat.id, sku="TST002")
    await db.commit()
    r = await client.get("/api/v1/products")
    assert r.status_code == 200
    data = r.json()
    assert "items" in data
    assert "total" in data
    assert "page" in data


@pytest.mark.asyncio
async def test_list_products_paginated(client: AsyncClient, db: AsyncSession):
    r = await client.get("/api/v1/products?page=1&limit=5")
    assert r.status_code == 200
    assert r.json()["limit"] == 5


@pytest.mark.asyncio
async def test_get_featured_products(client: AsyncClient, db: AsyncSession):
    r = await client.get("/api/v1/products/featured")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


@pytest.mark.asyncio
async def test_search_products(client: AsyncClient, db: AsyncSession):
    cat = await create_test_category(db)
    await create_test_product(db, cat.id, name="Unique Kundan Ring", sku="TST003")
    await db.commit()
    r = await client.get("/api/v1/products/search?q=Kundan")
    assert r.status_code == 200
    data = r.json()
    assert "items" in data


@pytest.mark.asyncio
async def test_product_detail_not_found(client: AsyncClient):
    r = await client.get("/api/v1/products/nonexistent-slug-xyz")
    assert r.status_code == 404
    assert r.json()["detail"]["code"] == "PRODUCT_NOT_FOUND"


@pytest.mark.asyncio
async def test_product_detail_success(client: AsyncClient, db: AsyncSession):
    cat = await create_test_category(db)
    product = await create_test_product(db, cat.id, name="Detail Test Ring", sku="TST004")
    await db.commit()
    r = await client.get(f"/api/v1/products/{product.slug}")
    assert r.status_code == 200
    data = r.json()
    assert data["name"] == "Detail Test Ring"
    assert "images" in data


@pytest.mark.asyncio
async def test_product_filter_by_material(client: AsyncClient):
    r = await client.get("/api/v1/products?material=gold")
    assert r.status_code == 200


@pytest.mark.asyncio
async def test_product_sort_price_asc(client: AsyncClient):
    r = await client.get("/api/v1/products?sort=price_asc")
    assert r.status_code == 200


@pytest.mark.asyncio
async def test_search_requires_query(client: AsyncClient):
    r = await client.get("/api/v1/products/search")
    assert r.status_code == 422  # q is required
