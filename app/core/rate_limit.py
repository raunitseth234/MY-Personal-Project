from fastapi import HTTPException, status


async def check_rate_limit(redis, key: str, limit: int, window_seconds: int):
    """Generic Redis-based rate limiter. Same behavior as the one already in use
    for auth endpoints (app/api/v1/auth.py), factored out so other routers can
    reuse it without importing from auth.py."""
    count = await redis.incr(key)
    if count == 1:
        await redis.expire(key, window_seconds)
    if count > limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={"code": "RATE_LIMITED", "message": "Too many attempts. Try again later."},
        )
