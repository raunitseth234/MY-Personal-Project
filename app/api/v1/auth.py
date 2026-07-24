import random
import re
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
    hash_password,
    verify_password,
)
from app.db.postgres import get_db
from app.db.redis import get_redis
from app.models import User, Address
from app.schemas.all_schemas import (
    AddressCreate,
    AddressResponse,
    LoginRequest,
    MessageResponse,
    OTPSendRequest,
    OTPVerifyRequest,
    RefreshRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from app.services.sms import send_sms

router = APIRouter(prefix="/auth", tags=["Auth"])


# ─────────── RATE LIMIT HELPERS ───────────

async def check_rate_limit(redis, key: str, limit: int, window_seconds: int):
    """Generic Redis-based rate limiter."""
    count = await redis.incr(key)
    if count == 1:
        await redis.expire(key, window_seconds)
    if count > limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={"code": "RATE_LIMITED", "message": "Too many attempts. Try again later."},
        )


# ─────────── REGISTER ───────────

@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check duplicates
    result = await db.execute(
        select(User).where(or_(User.email == data.email, User.phone == data.phone))
    )
    existing = result.scalar_one_or_none()
    if existing:
        field = "Email" if existing.email == data.email else "Phone"
        raise HTTPException(
            status_code=409,
            detail={"code": "DUPLICATE", "message": f"{field} already registered"},
        )

    user = User(
        name=data.name,
        email=data.email.lower(),
        phone=data.phone,
        password_hash=hash_password(data.password),
    )
    db.add(user)
    await db.flush()

    user_id = str(user.id)
    access = create_access_token(user_id, user.role.value)
    refresh, _ = create_refresh_token(user_id, user.role.value)

    return TokenResponse(
        access_token=access,
        refresh_token=refresh,
        user=UserResponse.model_validate(user),
    )


# ─────────── LOGIN ───────────

@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    ip = request.client.host
    await check_rate_limit(redis, f"rate:login:{ip}", limit=10, window_seconds=60)

    identifier = data.identifier.strip().lower()
    is_phone = re.match(r"^[6-9]\d{9}$", identifier)

    result = await db.execute(
        select(User).where(
            User.phone == identifier if is_phone else User.email == identifier
        )
    )
    user = result.scalar_one_or_none()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail={"code": "INVALID_CREDENTIALS", "message": "Incorrect email/phone or password"},
        )

    user_id = str(user.id)
    access = create_access_token(user_id, user.role.value)
    refresh, _ = create_refresh_token(user_id, user.role.value)

    return TokenResponse(
        access_token=access,
        refresh_token=refresh,
        user=UserResponse.model_validate(user),
    )


# ─────────── REFRESH ───────────

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    data: RefreshRequest,
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    payload = decode_token(data.refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail={"code": "INVALID_TOKEN_TYPE"})

    jti = payload.get("jti")
    if jti and await redis.exists(f"blacklist:{jti}"):
        raise HTTPException(status_code=401, detail={"code": "TOKEN_REVOKED"})

    user_id = payload["sub"]
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail={"code": "USER_NOT_FOUND"})

    access = create_access_token(user_id, user.role.value)
    new_refresh, _ = create_refresh_token(user_id, user.role.value)

    # Blacklist old refresh token
    if jti:
        exp = payload.get("exp", 0)
        ttl = max(0, exp - int(datetime.now(timezone.utc).timestamp()))
        await redis.setex(f"blacklist:{jti}", ttl, "1")

    return TokenResponse(
        access_token=access,
        refresh_token=new_refresh,
        user=UserResponse.model_validate(user),
    )


# ─────────── LOGOUT ───────────

@router.post("/logout", response_model=MessageResponse)
async def logout(
    data: RefreshRequest,
    redis=Depends(get_redis),
):
    try:
        payload = decode_token(data.refresh_token)
        jti = payload.get("jti")
        if jti:
            exp = payload.get("exp", 0)
            ttl = max(0, exp - int(datetime.now(timezone.utc).timestamp()))
            await redis.setex(f"blacklist:{jti}", ttl, "1")
    except Exception:
        pass  # Logout should always succeed
    return MessageResponse(message="Logged out successfully")


# ─────────── CURRENT USER ───────────

@router.get("/me", response_model=UserResponse)
async def get_me(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).where(User.id == current_user["sub"]))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail={"code": "USER_NOT_FOUND"})
    return UserResponse.model_validate(user)


# ─────────── OTP SEND ───────────

@router.post("/send-otp", response_model=MessageResponse)
async def send_otp(
    data: OTPSendRequest,
    request: Request,
    redis=Depends(get_redis),
):
    ip = request.client.host
    await check_rate_limit(redis, f"rate:otp:{data.phone}", limit=3, window_seconds=900)
    await check_rate_limit(redis, f"rate:otp:ip:{ip}", limit=10, window_seconds=900)

    otp = str(random.randint(100000, 999999))
    await redis.setex(f"otp:{data.phone}", 300, otp)  # 5 min TTL
    await redis.setex(f"otp:attempts:{data.phone}", 300, "0")

    # Send SMS
    await send_sms(data.phone, f"Your Rajesh Jewellers OTP is {otp}. Valid for 5 minutes.")

    response = {"message": "OTP sent successfully"}
    if settings.ENVIRONMENT == "development":
        response["otp"] = otp  # Dev only - remove in production!
    return response


# ─────────── OTP VERIFY ───────────

@router.post("/verify-otp", response_model=MessageResponse)
async def verify_otp(
    data: OTPVerifyRequest,
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    attempts_key = f"otp:attempts:{data.phone}"
    attempts = int(await redis.get(attempts_key) or 0)
    if attempts >= 5:
        await redis.delete(f"otp:{data.phone}")
        raise HTTPException(
            status_code=429,
            detail={"code": "OTP_MAX_ATTEMPTS", "message": "Too many attempts. Request new OTP."},
        )

    stored_otp = await redis.get(f"otp:{data.phone}")
    if not stored_otp:
        raise HTTPException(
            status_code=400,
            detail={"code": "OTP_EXPIRED", "message": "OTP expired. Request a new one."},
        )

    if stored_otp != data.otp:
        await redis.incr(attempts_key)
        raise HTTPException(
            status_code=400,
            detail={"code": "OTP_INVALID", "message": "Incorrect OTP"},
        )

    # Mark user as verified
    result = await db.execute(select(User).where(User.phone == data.phone))
    user = result.scalar_one_or_none()
    if user:
        user.is_verified = True

    # Clean up OTP keys
    await redis.delete(f"otp:{data.phone}", f"otp:attempts:{data.phone}")
    return MessageResponse(message="Phone verified successfully")


# ─────────── ADDRESSES ───────────

address_router = APIRouter(prefix="/addresses", tags=["Addresses"])


@address_router.get("", response_model=list[AddressResponse])
async def list_addresses(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Address).where(Address.user_id == current_user["sub"])
    )
    return result.scalars().all()


@address_router.post("", response_model=AddressResponse, status_code=201)
async def add_address(
    data: AddressCreate,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if data.is_default:
        # Unset other defaults
        result = await db.execute(
            select(Address).where(
                Address.user_id == current_user["sub"],
                Address.is_default == True,
            )
        )
        for addr in result.scalars().all():
            addr.is_default = False

    address = Address(user_id=current_user["sub"], **data.model_dump())
    db.add(address)
    await db.flush()
    return AddressResponse.model_validate(address)


@address_router.put("/{address_id}", response_model=AddressResponse)
async def update_address(
    address_id: str,
    data: AddressCreate,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Address).where(
            Address.id == address_id,
            Address.user_id == current_user["sub"],
        )
    )
    address = result.scalar_one_or_none()
    if not address:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})

    if data.is_default:
        others = await db.execute(
            select(Address).where(
                Address.user_id == current_user["sub"],
                Address.id != address_id,
                Address.is_default == True,
            )
        )
        for a in others.scalars().all():
            a.is_default = False

    for k, v in data.model_dump().items():
        setattr(address, k, v)
    return AddressResponse.model_validate(address)


@address_router.delete("/{address_id}", response_model=MessageResponse)
async def delete_address(
    address_id: str,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Address).where(
            Address.id == address_id,
            Address.user_id == current_user["sub"],
        )
    )
    address = result.scalar_one_or_none()
    if not address:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
    await db.delete(address)
    return MessageResponse(message="Address deleted")
