from fastapi import APIRouter

from app.api.v1.auth import router as auth_router, address_router
from app.api.v1.products import router as products_router, reviews_router
from app.api.v1.wishlist import wishlist_router
from app.api.v1.homepage import router as homepage_router, chat_router
from app.api.v1.admin.admin_router import router as admin_router

api_router = APIRouter(prefix="/api/v1")

# Public + Auth
api_router.include_router(auth_router)
api_router.include_router(address_router)

# Products & Categories
api_router.include_router(products_router)
api_router.include_router(reviews_router)

# Wishlist
api_router.include_router(wishlist_router)

# Homepage content
api_router.include_router(homepage_router)
api_router.include_router(chat_router)

# Admin
api_router.include_router(admin_router)
