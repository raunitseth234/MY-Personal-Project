import logging
import time
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pythonjsonlogger import jsonlogger
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.v1.router import api_router
from app.core.config import settings
from app.db.mongo import get_mongo_client, init_mongo_indexes
from app.db.postgres import engine
from app.db.redis import get_redis_pool

# ─────────── Logging Setup ───────────
logger = logging.getLogger("rajesh")
handler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter(
    "%(asctime)s %(name)s %(levelname)s %(message)s"
)
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)


# ─────────── Startup / Shutdown ───────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Rajesh Jewellers API...")

    # Test PostgreSQL
    pg_ok = False
    try:
        async with engine.connect() as conn:
            await conn.execute(__import__("sqlalchemy").text("SELECT 1"))
        pg_ok = True
        logger.info("PostgreSQL connected OK")
    except Exception as e:
        logger.error(f"PostgreSQL connection FAILED: {e}")

    # Test MongoDB
    mongo_ok = False
    try:
        client = get_mongo_client()
        await client.admin.command("ping")
        await init_mongo_indexes()
        mongo_ok = True
        logger.info("MongoDB connected OK")
    except Exception as e:
        logger.error(f"MongoDB connection FAILED: {e}")

    # Test Redis
    redis_ok = False
    try:
        redis = get_redis_pool()
        await redis.ping()
        redis_ok = True
        logger.info("Redis connected OK")
    except Exception as e:
        logger.error(f"Redis connection FAILED: {e}")

    app.state.db_status = {"postgres": pg_ok, "mongo": mongo_ok, "redis": redis_ok}

    if all([pg_ok, mongo_ok, redis_ok]):
        logger.info("All services healthy — API ready")
    else:
        logger.warning("Some services failed to connect — API starting with degraded health")

    yield  # ← app runs here

    logger.info("Shutting down Rajesh Jewellers API...")
    await engine.dispose()


# ─────────── App Instance ───────────
app = FastAPI(
    title="Rajesh Jewellers API",
    description="Backend for Rajesh Jewellers — A unit of Shree Vishwanath Prasad Seth",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─────────── CORS ───────────
_extra_origins = [o.strip() for o in settings.CORS_EXTRA_ORIGINS.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, *_extra_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─────────── Security Headers ───────────
@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
    # Relaxed for /docs and /redoc, which need inline scripts/styles for Swagger/ReDoc's
    # own UI assets; this is a JSON API everywhere else, so default-src 'self' covers it.
    if request.url.path in ("/docs", "/redoc"):
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "img-src 'self' data: https://fastapi.tiangolo.com"
        )
    else:
        response.headers["Content-Security-Policy"] = "default-src 'self'; frame-ancestors 'none'"
    return response


# ─────────── Request Logging ───────────
@app.middleware("http")
async def log_requests(request: Request, call_next):
    request_id = str(uuid.uuid4())[:8]
    start = time.perf_counter()

    response = await call_next(request)

    duration_ms = round((time.perf_counter() - start) * 1000, 2)
    logger.info(
        "request",
        extra={
            "request_id": request_id,
            "method": request.method,
            "path": request.url.path,
            "status_code": response.status_code,
            "latency_ms": duration_ms,
        },
    )
    response.headers["X-Request-ID"] = request_id
    return response


# ─────────── Global Exception Handler ───────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "Something went wrong. Please try again.",
                "details": str(exc) if settings.ENVIRONMENT == "development" else None,
            }
        },
    )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    if isinstance(exc.detail, dict):
        return JSONResponse(status_code=exc.status_code, content={"error": exc.detail})
    if exc.status_code == 404:
        return JSONResponse(
            status_code=404,
            content={"error": {"code": "NOT_FOUND", "message": f"Path {request.url.path} not found"}},
        )
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": "HTTP_ERROR", "message": str(exc.detail)}},
    )


# ─────────── Health Check ───────────
@app.get("/health", tags=["Health"])
async def health_check():
    status = getattr(app.state, "db_status", {})
    all_healthy = all(status.values()) if status else False
    return {
        "status": "healthy" if all_healthy else "degraded",
        "service": "Rajesh Jewellers API",
        "version": "1.0.0",
        "databases": status,
    }


# ─────────── Static Files ───────────
import os
if os.path.isdir("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# ─────────── Routes ───────────
app.include_router(api_router)
