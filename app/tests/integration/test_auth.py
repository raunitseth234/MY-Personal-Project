import pytest
from httpx import AsyncClient

REGISTER_DATA = {
    "name": "Test User",
    "email": "testuser@example.com",
    "phone": "9876543210",
    "password": "testpass123",
}


@pytest.mark.asyncio
async def test_register_success(client: AsyncClient):
    r = await client.post("/api/v1/auth/register", json=REGISTER_DATA)
    assert r.status_code == 201
    data = r.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["user"]["email"] == REGISTER_DATA["email"]


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient):
    await client.post("/api/v1/auth/register", json=REGISTER_DATA)
    r = await client.post("/api/v1/auth/register", json=REGISTER_DATA)
    assert r.status_code == 409
    assert r.json()["detail"]["code"] == "DUPLICATE"


@pytest.mark.asyncio
async def test_login_success(client: AsyncClient):
    await client.post("/api/v1/auth/register", json=REGISTER_DATA)
    r = await client.post(
        "/api/v1/auth/login",
        json={"identifier": REGISTER_DATA["email"], "password": REGISTER_DATA["password"]},
    )
    assert r.status_code == 200
    assert "access_token" in r.json()


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient):
    await client.post("/api/v1/auth/register", json=REGISTER_DATA)
    r = await client.post(
        "/api/v1/auth/login",
        json={"identifier": REGISTER_DATA["email"], "password": "wrongpassword"},
    )
    assert r.status_code == 401


@pytest.mark.asyncio
async def test_login_by_phone(client: AsyncClient):
    await client.post("/api/v1/auth/register", json=REGISTER_DATA)
    r = await client.post(
        "/api/v1/auth/login",
        json={"identifier": REGISTER_DATA["phone"], "password": REGISTER_DATA["password"]},
    )
    assert r.status_code == 200


@pytest.mark.asyncio
async def test_get_me(client: AsyncClient):
    reg = await client.post("/api/v1/auth/register", json=REGISTER_DATA)
    token = reg.json()["access_token"]
    r = await client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["email"] == REGISTER_DATA["email"]


@pytest.mark.asyncio
async def test_get_me_without_token(client: AsyncClient):
    r = await client.get("/api/v1/auth/me")
    assert r.status_code == 401


@pytest.mark.asyncio
async def test_refresh_token(client: AsyncClient):
    reg = await client.post("/api/v1/auth/register", json=REGISTER_DATA)
    refresh_token = reg.json()["refresh_token"]
    r = await client.post("/api/v1/auth/refresh", json={"refresh_token": refresh_token})
    assert r.status_code == 200
    assert "access_token" in r.json()


@pytest.mark.asyncio
async def test_register_invalid_phone(client: AsyncClient):
    data = {**REGISTER_DATA, "email": "another@test.com", "phone": "12345"}
    r = await client.post("/api/v1/auth/register", json=data)
    assert r.status_code == 422


@pytest.mark.asyncio
async def test_register_short_password(client: AsyncClient):
    data = {**REGISTER_DATA, "email": "another2@test.com", "password": "short"}
    r = await client.post("/api/v1/auth/register", json=data)
    assert r.status_code == 422
