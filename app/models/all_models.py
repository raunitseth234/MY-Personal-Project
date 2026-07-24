"""
All SQLAlchemy models for Rajesh Jewellers.
Imported by alembic env.py so all tables are auto-detected.
"""
import uuid
from datetime import datetime, timezone
from enum import Enum as PyEnum

from sqlalchemy import (
    Boolean, Column, DateTime, Enum, Float, ForeignKey,
    Index, Integer, Numeric, String, Text, UniqueConstraint, JSON
)
from sqlalchemy.dialects.postgresql import UUID, TSVECTOR
from sqlalchemy.orm import relationship

from app.db.postgres import Base


def utcnow():
    return datetime.now(timezone.utc)


# ─────────────────────────────────────────────
# ENUMS
# ─────────────────────────────────────────────

class UserRole(str, PyEnum):
    customer = "customer"
    admin = "admin"
    staff = "staff"


class MaterialType(str, PyEnum):
    gold = "gold"
    silver = "silver"
    diamond = "diamond"
    platinum = "platinum"
    imitation = "imitation"
    kundan = "kundan"
    polki = "polki"


class OrderStatus(str, PyEnum):
    pending = "pending"
    confirmed = "confirmed"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"
    returned = "returned"


class PaymentStatus(str, PyEnum):
    unpaid = "unpaid"
    paid = "paid"
    refunded = "refunded"
    failed = "failed"


class DiscountType(str, PyEnum):
    flat = "flat"
    percentage = "percentage"


# ─────────────────────────────────────────────
# USERS & ADDRESSES
# ─────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(15), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.customer, nullable=False)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    addresses = relationship("Address", back_populates="user", cascade="all, delete-orphan")
    cart_items = relationship("CartItem", back_populates="user", cascade="all, delete-orphan")
    wishlist = relationship("WishlistItem", back_populates="user", cascade="all, delete-orphan")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")


class Address(Base):
    __tablename__ = "addresses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    full_name = Column(String(120), nullable=False)
    phone = Column(String(15), nullable=False)
    address_line = Column(Text, nullable=False)
    city = Column(String(80), nullable=False)
    state = Column(String(80), nullable=False)
    pincode = Column(String(10), nullable=False)
    is_default = Column(Boolean, default=False)

    user = relationship("User", back_populates="addresses")


# ─────────────────────────────────────────────
# CATEGORIES & PRODUCTS
# ─────────────────────────────────────────────

class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(120), nullable=False)
    slug = Column(String(150), unique=True, nullable=False, index=True)
    parent_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=True)
    image_url = Column(String(500))
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    children = relationship("Category", backref="parent", remote_side=[id])
    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    slug = Column(String(300), unique=True, nullable=False, index=True)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=False)
    description = Column(Text)
    material = Column(Enum(MaterialType), nullable=False)
    purity = Column(String(20))           # "22K", "18K", "925", etc.
    weight_grams = Column(Numeric(10, 3))
    base_price = Column(Numeric(12, 2), nullable=False)
    discount_price = Column(Numeric(12, 2))
    # Making charge for dynamically-priced metals (gold/silver/platinum).
    # type: "percentage" (of metal value) | "per_gram" | "flat"
    making_charge_type = Column(String(20), default="percentage")
    making_charge_value = Column(Numeric(10, 2), default=0)
    sku = Column(String(100), unique=True, nullable=False)
    stock_quantity = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    search_vector = Column(TSVECTOR)      # populated by trigger
    created_at = Column(DateTime(timezone=True), default=utcnow)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    category = relationship("Category", back_populates="products")
    images = relationship("ProductImage", back_populates="product",
                          cascade="all, delete-orphan",
                          order_by="ProductImage.display_order")
    variants = relationship("ProductVariant", back_populates="product",
                            cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="product")

    __table_args__ = (
        Index("ix_products_category_active", "category_id", "is_active"),
        Index("ix_products_featured", "is_featured"),
        Index("ix_products_search_vector", "search_vector", postgresql_using="gin"),
    )


class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(500), nullable=False)
    display_order = Column(Integer, default=0)
    is_primary = Column(Boolean, default=False)

    product = relationship("Product", back_populates="images")


class ProductVariant(Base):
    __tablename__ = "product_variants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    variant_name = Column(String(120), nullable=False)  # "Size 12", "Design A", "22K"
    purity = Column(String(20), nullable=True)          # set when the variant represents a carat: "18K"/"22K"/"24K"
    additional_price = Column(Numeric(10, 2), default=0)
    stock_quantity = Column(Integer, default=0)

    product = relationship("Product", back_populates="variants")


class MetalRate(Base):
    """Current metal rate (₹ per gram) per (material, purity).

    Refreshed from a live feed into Redis; this table is the persistent
    fallback used when the live fetch is unavailable. Current-value only
    (no history) — one row per (material, purity).
    """
    __tablename__ = "metal_rates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    material = Column(String(20), nullable=False)      # "gold", "silver", "platinum"
    purity = Column(String(20), nullable=False)        # "24K", "22K", "18K", "14K", "925", "950"
    rate_per_gram = Column(Numeric(12, 2), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    __table_args__ = (
        UniqueConstraint("material", "purity", name="uq_metal_rate_material_purity"),
    )


# ─────────────────────────────────────────────
# CART & WISHLIST
# ─────────────────────────────────────────────

class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    variant_id = Column(UUID(as_uuid=True), ForeignKey("product_variants.id"), nullable=True)
    quantity = Column(Integer, nullable=False, default=1)
    added_at = Column(DateTime(timezone=True), default=utcnow)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    user = relationship("User", back_populates="cart_items")
    product = relationship("Product")
    variant = relationship("ProductVariant")

    __table_args__ = (
        UniqueConstraint("user_id", "product_id", "variant_id", name="uq_cart_user_product_variant"),
    )


class WishlistItem(Base):
    __tablename__ = "wishlist"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    added_at = Column(DateTime(timezone=True), default=utcnow)

    user = relationship("User", back_populates="wishlist")
    product = relationship("Product")

    __table_args__ = (
        UniqueConstraint("user_id", "product_id", name="uq_wishlist_user_product"),
    )


# ─────────────────────────────────────────────
# ORDERS
# ─────────────────────────────────────────────

class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(30), unique=True, nullable=False)
    discount_type = Column(Enum(DiscountType), nullable=False)
    discount_value = Column(Numeric(10, 2), nullable=False)
    min_order_value = Column(Numeric(12, 2), default=0)
    max_discount = Column(Numeric(10, 2))     # cap for percentage type
    expiry_date = Column(DateTime(timezone=True), nullable=False)
    usage_limit = Column(Integer, default=1)
    used_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    order_number = Column(String(30), unique=True, nullable=False, index=True)
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    subtotal = Column(Numeric(12, 2), nullable=False)
    discount_amount = Column(Numeric(10, 2), default=0)
    coupon_code = Column(String(30))
    total_amount = Column(Numeric(12, 2), nullable=False)
    payment_status = Column(Enum(PaymentStatus), default=PaymentStatus.unpaid)
    payment_provider_order_id = Column(String(100))
    payment_id = Column(String(100))
    # Snapshot of address at purchase time (never rely on FK after delivery)
    address_snapshot = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow, index=True)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

    __table_args__ = (
        Index("ix_orders_created_status", "created_at", "status"),
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    product_name_snapshot = Column(String(255), nullable=False)
    product_image_snapshot = Column(String(500))
    quantity = Column(Integer, nullable=False)
    price_at_purchase = Column(Numeric(12, 2), nullable=False)
    variant_details = Column(JSON)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")


# ─────────────────────────────────────────────
# REVIEWS
# ─────────────────────────────────────────────

class Review(Base):
    __tablename__ = "reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    rating = Column(Integer, nullable=False)   # 1–5
    comment = Column(Text)
    is_verified_purchase = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")

    __table_args__ = (
        UniqueConstraint("user_id", "product_id", name="uq_review_user_product"),
    )


# ─────────────────────────────────────────────
# STORE LOCATIONS
# ─────────────────────────────────────────────

class StoreLocation(Base):
    __tablename__ = "store_locations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    address = Column(Text, nullable=False)
    city = Column(String(80), nullable=False)
    state = Column(String(80), nullable=False)
    phone = Column(String(15))
    map_link = Column(String(500))
    opening_hours = Column(JSON)   # {"Mon-Sat": "10am-8pm", "Sun": "11am-6pm"}
    is_active = Column(Boolean, default=True)


# ─────────────────────────────────────────────
# HOMEPAGE CONTENT (managed by admin)
# ─────────────────────────────────────────────

class HeroBanner(Base):
    __tablename__ = "hero_banners"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200))
    subtitle = Column(String(300))
    image_url = Column(String(500), nullable=False)
    mobile_image_url = Column(String(500))
    cta_text = Column(String(80))
    cta_url = Column(String(300))
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)


class AnnouncementMessage(Base):
    __tablename__ = "announcement_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    message = Column(String(300), nullable=False)
    link_url = Column(String(300))
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_name = Column(String(120), nullable=False)
    customer_location = Column(String(100))
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=False)
    avatar_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
