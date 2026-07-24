import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.all_models import Category, Product, MaterialType


async def get_token(client: AsyncClient, email="cart@test.com") -> str:
    await client.post("/api/v1/auth/register", json={
        "name": "Cart Tester", "email": email,
        "phone": "9123456789", "password": "testpass123",
    })
    r = await client.post("/api/v1/auth/login", json={
        "identifier": email, "password": "testpass123"
    })
    return r.json()["access_token"]


async def create_product(db: AsyncSession, sku="CART001", stock=10) -> Product:
    cat = Category(name="Cart Test Cat", slug=f"cart-test-cat-{sku}", display_order=1)
    db.add(cat)
    await db.flush()
    p = Product(
        name="Cart Test Product", slug=f"cart-test-product-{sku}",
        category_id=cat.id, material=MaterialType.gold,
        base_price=15000, sku=sku, stock_quantity=stock, is_active=True,
    )
    db.add(p)
    await db.flush()
    await db.commit()
    return p


@pytest.mark.asyncio
async def test_empty_cart(client: AsyncClient, db: AsyncSession):
    token = await get_token(client, "emptycart@test.com")
    r = await client.get("/api/v1/cart", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["item_count"] == 0


@pytest.mark.asyncio
async def test_add_to_cart(client: AsyncClient, db: AsyncSession):
    token = await get_token(client, "addcart@test.com")
    product = await create_product(db, "CART002")
    r = await client.post(
        "/api/v1/cart/add",
        json={"product_id": str(product.id), "quantity": 2},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert r.status_code == 201

    r = await client.get("/api/v1/cart", headers={"Authorization": f"Bearer {token}"})
    assert r.json()["total_items"] == 2


@pytest.mark.asyncio
async def test_add_same_product_increments_qty(client: AsyncClient, db: AsyncSession):
    token = await get_token(client, "incqty@test.com")
    product = await create_product(db, "CART003")

    await client.post(
        "/api/v1/cart/add",
        json={"product_id": str(product.id), "quantity": 1},
        headers={"Authorization": f"Bearer {token}"},
    )
    await client.post(
        "/api/v1/cart/add",
        json={"product_id": str(product.id), "quantity": 2},
        headers={"Authorization": f"Bearer {token}"},
    )

    r = await client.get("/api/v1/cart", headers={"Authorization": f"Bearer {token}"})
    assert r.json()["total_items"] == 3  # 1+2 = 3


@pytest.mark.asyncio
async def test_add_over_stock_rejected(client: AsyncClient, db: AsyncSession):
    token = await get_token(client, "overstock@test.com")
    product = await create_product(db, "CART004", stock=2)
    r = await client.post(
        "/api/v1/cart/add",
        json={"product_id": str(product.id), "quantity": 5},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert r.status_code == 400
    assert "STOCK" in r.json()["detail"]["code"]


@pytest.mark.asyncio
async def test_cart_count_endpoint(client: AsyncClient, db: AsyncSession):
    token = await get_token(client, "countcart@test.com")
    product = await create_product(db, "CART005")
    await client.post(
        "/api/v1/cart/add",
        json={"product_id": str(product.id), "quantity": 3},
        headers={"Authorization": f"Bearer {token}"},
    )
    r = await client.get("/api/v1/cart/count", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["count"] == 3


@pytest.mark.asyncio
async def test_clear_cart(client: AsyncClient, db: AsyncSession):
    token = await get_token(client, "clearcart@test.com")
    product = await create_product(db, "CART006")
    await client.post(
        "/api/v1/cart/add",
        json={"product_id": str(product.id), "quantity": 1},
        headers={"Authorization": f"Bearer {token}"},
    )
    r = await client.delete("/api/v1/cart/clear", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200

    r = await client.get("/api/v1/cart", headers={"Authorization": f"Bearer {token}"})
    assert r.json()["item_count"] == 0


@pytest.mark.asyncio
async def test_cart_requires_auth(client: AsyncClient):
    r = await client.get("/api/v1/cart")
    assert r.status_code == 401
