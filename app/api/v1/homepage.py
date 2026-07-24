"""
Homepage content APIs — all the sections visible in the frontend video:
- Announcement bar messages
- Hero banners
- Trust counter stats
- Testimonials
- Store locations
- Chat widget
"""
import json
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import require_admin
from app.db.mongo import get_chat_messages
from app.db.postgres import get_db
from app.db.redis import get_redis
from app.models import (
    AnnouncementMessage,
    HeroBanner,
    StoreLocation,
    Testimonial,
)
from app.schemas.all_schemas import (
    AnnouncementCreate,
    AnnouncementResponse,
    ChatMessageRequest,
    HeroBannerCreate,
    HeroBannerResponse,
    MessageResponse,
    StoreLocationResponse,
    TestimonialCreate,
    TestimonialResponse,
)
from app.services.chat import ChatService

router = APIRouter(tags=["Homepage"])


# ─────────── ANNOUNCEMENT BAR ───────────

@router.get("/announcements", response_model=list[AnnouncementResponse])
async def get_announcements(
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    cached = await redis.get("cache:announcements")
    if cached:
        return json.loads(cached)

    result = await db.execute(
        select(AnnouncementMessage)
        .where(AnnouncementMessage.is_active == True)
        .order_by(AnnouncementMessage.display_order)
    )
    announcements = result.scalars().all()
    items = [AnnouncementResponse.model_validate(a) for a in announcements]

    await redis.setex(
        "cache:announcements",
        300,
        json.dumps([i.model_dump(mode="json") for i in items], default=str),
    )
    return items


@router.post("/announcements", response_model=AnnouncementResponse, status_code=201)
async def create_announcement(
    data: AnnouncementCreate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    ann = AnnouncementMessage(**data.model_dump())
    db.add(ann)
    await db.flush()
    await redis.delete("cache:announcements")
    return AnnouncementResponse.model_validate(ann)


# ─────────── HERO BANNERS ───────────

@router.get("/hero-banners", response_model=list[HeroBannerResponse])
async def get_hero_banners(
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    cached = await redis.get("cache:hero_banners")
    if cached:
        return json.loads(cached)

    result = await db.execute(
        select(HeroBanner)
        .where(HeroBanner.is_active == True)
        .order_by(HeroBanner.display_order)
    )
    banners = result.scalars().all()
    items = [HeroBannerResponse.model_validate(b) for b in banners]
    await redis.setex(
        "cache:hero_banners",
        300,
        json.dumps([i.model_dump(mode="json") for i in items], default=str),
    )
    return items


@router.post("/hero-banners", response_model=HeroBannerResponse, status_code=201)
async def create_hero_banner(
    data: HeroBannerCreate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    banner = HeroBanner(**data.model_dump())
    db.add(banner)
    await db.flush()
    await redis.delete("cache:hero_banners")
    return HeroBannerResponse.model_validate(banner)


@router.put("/hero-banners/{banner_id}", response_model=HeroBannerResponse)
async def update_hero_banner(
    banner_id: str,
    data: HeroBannerCreate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    result = await db.execute(select(HeroBanner).where(HeroBanner.id == banner_id))
    banner = result.scalar_one_or_none()
    if not banner:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
    for k, v in data.model_dump().items():
        setattr(banner, k, v)
    await redis.delete("cache:hero_banners")
    return HeroBannerResponse.model_validate(banner)


@router.delete("/hero-banners/{banner_id}", response_model=MessageResponse)
async def delete_hero_banner(
    banner_id: str,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    result = await db.execute(select(HeroBanner).where(HeroBanner.id == banner_id))
    banner = result.scalar_one_or_none()
    if not banner:
        raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
    await db.delete(banner)
    await redis.delete("cache:hero_banners")
    return MessageResponse(message="Banner deleted")


# ─────────── TESTIMONIALS ───────────

@router.get("/testimonials", response_model=list[TestimonialResponse])
async def get_testimonials(
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    cached = await redis.get("cache:testimonials")
    if cached:
        return json.loads(cached)

    result = await db.execute(
        select(Testimonial)
        .where(Testimonial.is_active == True)
        .order_by(Testimonial.display_order)
    )
    testimonials = result.scalars().all()
    items = [TestimonialResponse.model_validate(t) for t in testimonials]
    await redis.setex(
        "cache:testimonials",
        600,
        json.dumps([i.model_dump(mode="json") for i in items], default=str),
    )
    return items


@router.post("/testimonials", response_model=TestimonialResponse, status_code=201)
async def create_testimonial(
    data: TestimonialCreate,
    admin=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    t = Testimonial(**data.model_dump())
    db.add(t)
    await db.flush()
    await redis.delete("cache:testimonials")
    return TestimonialResponse.model_validate(t)


# ─────────── TRUST COUNTERS ───────────

@router.get("/trust-stats")
async def get_trust_stats():
    """
    Static trust counters shown on homepage.
    In production, these can be stored in DB and updated by admin.
    """
    return {
        "years_of_trust": 50,
        "happy_customers": 10000,
        "purity_guarantee": "100%",
        "store_locations": 3,
    }


# ─────────── STORE LOCATIONS ───────────

@router.get("/store-locations", response_model=list[StoreLocationResponse])
async def get_store_locations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(StoreLocation).where(StoreLocation.is_active == True)
    )
    return [StoreLocationResponse.model_validate(s) for s in result.scalars().all()]


# ─────────── CHAT WIDGET ───────────

chat_router = APIRouter(prefix="/chat", tags=["Chat"])


@chat_router.post("/message")
async def chat_message(
    data: ChatMessageRequest,
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    """
    Chat widget backend.
    CHAT_MODE=faq  → keyword-based FAQ (works without any API key)
    CHAT_MODE=llm  → Groq LLM with tool-calling into live site data (needs GROQ_API_KEY)
    """
    service = ChatService()
    reply = await service.respond(data.session_id, data.message, db, redis)

    # Save to MongoDB
    col = await get_chat_messages()
    await col.insert_one({
        "session_id": data.session_id,
        "user_message": data.message,
        "bot_reply": reply,
        "timestamp": datetime.now(timezone.utc),
    })

    return {
        "session_id": data.session_id,
        "reply": reply,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@chat_router.get("/history/{session_id}")
async def chat_history(session_id: str):
    col = await get_chat_messages()
    docs = (
        await col.find({"session_id": session_id})
        .sort("timestamp", 1)
        .limit(50)
        .to_list(length=50)
    )
    return [
        {
            "user_message": d.get("user_message"),
            "bot_reply": d.get("bot_reply"),
            "timestamp": d.get("timestamp"),
        }
        for d in docs
    ]
