from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

_client: AsyncIOMotorClient | None = None


def get_mongo_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(settings.MONGO_URL)
    return _client


def get_mongo_db():
    return get_mongo_client()[settings.MONGO_DB]


async def get_search_logs():
    return get_mongo_db()["search_logs"]


async def get_chat_messages():
    return get_mongo_db()["chat_messages"]


async def get_view_history():
    return get_mongo_db()["product_view_history"]


async def get_announcements():
    return get_mongo_db()["announcements"]


async def init_mongo_indexes():
    db = get_mongo_db()
    # search_logs indexes
    await db["search_logs"].create_index("timestamp")
    await db["search_logs"].create_index("query")
    await db["search_logs"].create_index("user_id")
    # product_view_history indexes
    await db["product_view_history"].create_index("user_id")
    await db["product_view_history"].create_index("viewed_at")
    # chat_messages indexes
    await db["chat_messages"].create_index("session_id")
    await db["chat_messages"].create_index("timestamp")
