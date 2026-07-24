"""
All Pydantic request/response schemas for Rajesh Jewellers backend.
"""
import re
from datetime import datetime
from decimal import Decimal
from typing import Any, List, Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, field_validator, model_validator


# ─────────────────────────────────────────────
# SHARED
# ─────────────────────────────────────────────

class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    pages: int
    limit: int


class MessageResponse(BaseModel):
    message: str


# ─────────────────────────────────────────────
# AUTH
# ─────────────────────────────────────────────

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v):
        v = v.strip().replace(" ", "").replace("-", "")
        if not re.match(r"^[6-9]\d{9}$", v):
            raise ValueError("Enter a valid 10-digit Indian mobile number")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v

    @field_validator("name")
    @classmethod
    def validate_name(cls, v):
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name too short")
        return v


class LoginRequest(BaseModel):
    identifier: str   # email OR phone
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: "UserResponse"


class RefreshRequest(BaseModel):
    refresh_token: str


class OTPSendRequest(BaseModel):
    phone: str

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v):
        v = v.strip().replace(" ", "")
        if not re.match(r"^[6-9]\d{9}$", v):
            raise ValueError("Enter a valid 10-digit Indian mobile number")
        return v


class OTPVerifyRequest(BaseModel):
    phone: str
    otp: str


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    phone: str
    role: str
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────
# ADDRESSES
# ─────────────────────────────────────────────

class AddressCreate(BaseModel):
    full_name: str
    phone: str
    address_line: str
    city: str
    state: str
    pincode: str
    is_default: bool = False

    @field_validator("pincode")
    @classmethod
    def validate_pincode(cls, v):
        if not re.match(r"^\d{6}$", v):
            raise ValueError("Enter a valid 6-digit pincode")
        return v


class AddressResponse(BaseModel):
    id: UUID
    full_name: str
    phone: str
    address_line: str
    city: str
    state: str
    pincode: str
    is_default: bool

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────
# CATEGORIES
# ─────────────────────────────────────────────

class CategoryResponse(BaseModel):
    id: UUID
    name: str
    slug: str
    image_url: Optional[str]
    display_order: int
    children: List["CategoryResponse"] = []

    class Config:
        from_attributes = True


CategoryResponse.model_rebuild()


# ─────────────────────────────────────────────
# PRODUCTS
# ─────────────────────────────────────────────

class ProductImageResponse(BaseModel):
    id: UUID
    image_url: str
    display_order: int
    is_primary: bool

    class Config:
        from_attributes = True


class ProductVariantResponse(BaseModel):
    id: UUID
    variant_name: str
    purity: Optional[str] = None
    additional_price: Decimal
    stock_quantity: int
    price: Decimal          # absolute computed unit price for this variant

    class Config:
        from_attributes = True


class ProductListItem(BaseModel):
    id: UUID
    name: str
    slug: str
    primary_image: Optional[str]
    base_price: Decimal
    discount_price: Optional[Decimal]
    price: Decimal          # live-computed effective price (what the UI shows)
    material: str
    purity: Optional[str]
    weight_grams: Optional[Decimal] = None
    is_featured: bool
    stock_quantity: int
    category_name: Optional[str]

    class Config:
        from_attributes = True


class ProductDetail(BaseModel):
    id: UUID
    name: str
    slug: str
    description: Optional[str]
    material: str
    purity: Optional[str]
    weight_grams: Optional[Decimal]
    base_price: Decimal
    discount_price: Optional[Decimal]
    price: Decimal          # live-computed effective price (product-level / default variant)
    sku: str
    stock_quantity: int
    is_featured: bool
    primary_image: Optional[str] = None
    category_name: Optional[str] = None
    images: List[ProductImageResponse]
    variants: List[ProductVariantResponse]
    category: Optional[CategoryResponse]
    average_rating: Optional[float]
    review_count: int

    class Config:
        from_attributes = True


class ProductCreate(BaseModel):
    name: str
    category_id: UUID
    description: Optional[str]
    material: str
    purity: Optional[str]
    weight_grams: Optional[Decimal]
    base_price: Decimal
    discount_price: Optional[Decimal]
    sku: str
    stock_quantity: int = 0
    is_active: bool = True
    is_featured: bool = False


class ProductUpdate(BaseModel):
    name: Optional[str]
    category_id: Optional[UUID]
    description: Optional[str]
    material: Optional[str]
    purity: Optional[str]
    weight_grams: Optional[Decimal]
    base_price: Optional[Decimal]
    discount_price: Optional[Decimal]
    sku: Optional[str]
    stock_quantity: Optional[int]
    is_active: Optional[bool]
    is_featured: Optional[bool]


# ─────────────────────────────────────────────
# CART
# ─────────────────────────────────────────────

class CartAddRequest(BaseModel):
    product_id: UUID
    variant_id: Optional[UUID] = None
    quantity: int = 1

    @field_validator("quantity")
    @classmethod
    def validate_qty(cls, v):
        if v < 1:
            raise ValueError("Quantity must be at least 1")
        if v > 10:
            raise ValueError("Cannot add more than 10 of same item")
        return v


class CartUpdateRequest(BaseModel):
    quantity: int

    @field_validator("quantity")
    @classmethod
    def validate_qty(cls, v):
        if v < 0:
            raise ValueError("Quantity cannot be negative")
        return v


class CartItemResponse(BaseModel):
    id: UUID
    product_id: UUID
    product_name: str
    product_image: Optional[str]
    product_slug: str
    variant_id: Optional[UUID]
    variant_name: Optional[str]
    quantity: int
    unit_price: Decimal
    line_total: Decimal
    stock_available: int
    stock_issue: bool   # True if qty > stock

    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    items: List[CartItemResponse]
    total_items: int
    subtotal: Decimal
    item_count: int   # distinct product count


# ─────────────────────────────────────────────
# ORDERS
# ─────────────────────────────────────────────

class CouponValidateRequest(BaseModel):
    code: str
    cart_total: Decimal


class CouponValidateResponse(BaseModel):
    valid: bool
    discount_amount: Decimal
    message: str


class CheckoutRequest(BaseModel):
    address_id: UUID
    coupon_code: Optional[str] = None


class OrderItemResponse(BaseModel):
    id: UUID
    product_id: UUID
    product_name_snapshot: str
    product_image_snapshot: Optional[str]
    quantity: int
    price_at_purchase: Decimal
    variant_details: Optional[dict]
    line_total: Decimal

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: UUID
    order_number: str
    status: str
    subtotal: Decimal
    discount_amount: Decimal
    coupon_code: Optional[str]
    total_amount: Decimal
    payment_status: str
    payment_provider_order_id: Optional[str]
    address_snapshot: dict
    items: List[OrderItemResponse]
    created_at: datetime

    class Config:
        from_attributes = True


class CheckoutResponse(BaseModel):
    order: OrderResponse
    payment_info: dict   # Contains stub Razorpay order or payment data


# ─────────────────────────────────────────────
# REVIEWS
# ─────────────────────────────────────────────

class ReviewCreate(BaseModel):
    rating: int
    comment: Optional[str]

    @field_validator("rating")
    @classmethod
    def validate_rating(cls, v):
        if not 1 <= v <= 5:
            raise ValueError("Rating must be between 1 and 5")
        return v


class ReviewResponse(BaseModel):
    id: UUID
    user_name: str
    rating: int
    comment: Optional[str]
    is_verified_purchase: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────
# HOMEPAGE CONTENT
# ─────────────────────────────────────────────

class HeroBannerResponse(BaseModel):
    id: UUID
    title: Optional[str]
    subtitle: Optional[str]
    image_url: str
    mobile_image_url: Optional[str]
    cta_text: Optional[str]
    cta_url: Optional[str]
    display_order: int

    class Config:
        from_attributes = True


class AnnouncementResponse(BaseModel):
    id: UUID
    message: str
    link_url: Optional[str]
    display_order: int

    class Config:
        from_attributes = True


class TestimonialResponse(BaseModel):
    id: UUID
    customer_name: str
    customer_location: Optional[str]
    rating: int
    comment: str
    avatar_url: Optional[str]

    class Config:
        from_attributes = True


class StoreLocationResponse(BaseModel):
    id: UUID
    name: str
    address: str
    city: str
    state: str
    phone: Optional[str]
    map_link: Optional[str]
    opening_hours: Optional[dict]

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────
# CHAT
# ─────────────────────────────────────────────

class ChatMessageRequest(BaseModel):
    session_id: str
    message: str


class ChatMessageResponse(BaseModel):
    session_id: str
    reply: str
    timestamp: datetime


# ─────────────────────────────────────────────
# ADMIN
# ─────────────────────────────────────────────

class CouponCreate(BaseModel):
    code: str
    discount_type: str
    discount_value: Decimal
    min_order_value: Decimal = Decimal("0")
    max_discount: Optional[Decimal]
    expiry_date: datetime
    usage_limit: int = 100
    is_active: bool = True

    @field_validator("code")
    @classmethod
    def uppercase_code(cls, v):
        return v.upper().strip()


class OrderStatusUpdate(BaseModel):
    status: str


class StockUpdate(BaseModel):
    stock_quantity: int

    @field_validator("stock_quantity")
    @classmethod
    def validate_stock(cls, v):
        if v < 0:
            raise ValueError("Stock cannot be negative")
        return v


class HeroBannerCreate(BaseModel):
    title: Optional[str]
    subtitle: Optional[str]
    image_url: str
    mobile_image_url: Optional[str]
    cta_text: Optional[str]
    cta_url: Optional[str]
    display_order: int = 0
    is_active: bool = True


class AnnouncementCreate(BaseModel):
    message: str
    link_url: Optional[str]
    display_order: int = 0
    is_active: bool = True


class TestimonialCreate(BaseModel):
    customer_name: str
    customer_location: Optional[str]
    rating: int
    comment: str
    avatar_url: Optional[str]
    display_order: int = 0
