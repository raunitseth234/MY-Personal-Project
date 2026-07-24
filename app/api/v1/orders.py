import uuid
from datetime import datetime, timezone
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.core.security import get_current_user, require_admin
from app.db.postgres import get_db
from app.db.redis import get_redis
from app.models import (
    Address, CartItem, Coupon, Order, OrderItem, Product,
    ProductVariant, OrderStatus, PaymentStatus
)
from app.schemas.all_schemas import (
    CheckoutRequest,
    CheckoutResponse,
    CouponValidateRequest,
    CouponValidateResponse,
    MessageResponse,
    OrderResponse,
)
from app.services.payments import PaymentGateway
from app.services.gold_rate import get_metal_rates
from app.services.pricing import compute_unit_price, build_price_note
from app.tasks.order_emails import send_order_confirmation

router = APIRouter(prefix="/orders", tags=["Orders"])


def generate_order_number() -> str:
    now = datetime.now(timezone.utc)
    suffix = str(uuid.uuid4().hex[:6]).upper()
    return f"RJ-{now.strftime('%Y%m%d')}-{suffix}"


def build_order_response(order: Order, items: list[OrderItem] | None = None) -> dict:
    source_items = items if items is not None else order.items
    items = []
    for item in source_items:
        items.append({
            "id": str(item.id),
            "product_id": str(item.product_id),
            "product_name_snapshot": item.product_name_snapshot,
            "product_image_snapshot": item.product_image_snapshot,
            "quantity": item.quantity,
            "price_at_purchase": float(item.price_at_purchase),
            "variant_details": item.variant_details,
            "line_total": float(item.price_at_purchase * item.quantity),
        })
    return {
        "id": str(order.id),
        "order_number": order.order_number,
        "status": order.status.value,
        "subtotal": float(order.subtotal),
        "discount_amount": float(order.discount_amount),
        "coupon_code": order.coupon_code,
        "total_amount": float(order.total_amount),
        "payment_status": order.payment_status.value,
        "payment_provider_order_id": order.payment_provider_order_id,
        "address_snapshot": order.address_snapshot,
        "items": items,
        "created_at": order.created_at.isoformat(),
    }


# ─────────── COUPON VALIDATE ───────────

coupon_router = APIRouter(prefix="/coupons", tags=["Coupons"])


@coupon_router.post("/validate", response_model=CouponValidateResponse)
async def validate_coupon(
    data: CouponValidateRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Coupon).where(Coupon.code == data.code.upper(), Coupon.is_active == True)
    )
    coupon = result.scalar_one_or_none()

    if not coupon:
        return CouponValidateResponse(valid=False, discount_amount=Decimal("0"), message="Invalid coupon code")

    if coupon.expiry_date < datetime.now(timezone.utc):
        return CouponValidateResponse(valid=False, discount_amount=Decimal("0"), message="Coupon expired")

    if coupon.usage_limit and coupon.used_count >= coupon.usage_limit:
        return CouponValidateResponse(valid=False, discount_amount=Decimal("0"), message="Coupon usage limit reached")

    if data.cart_total < coupon.min_order_value:
        return CouponValidateResponse(
            valid=False,
            discount_amount=Decimal("0"),
            message=f"Minimum order of ₹{coupon.min_order_value} required",
        )

    if coupon.discount_type.value == "flat":
        discount = min(coupon.discount_value, data.cart_total)
    else:
        discount = (data.cart_total * coupon.discount_value) / 100
        if coupon.max_discount:
            discount = min(discount, coupon.max_discount)

    return CouponValidateResponse(
        valid=True,
        discount_amount=discount.quantize(Decimal("0.01")),
        message=f"Coupon applied! You save ₹{discount:.2f}",
    )


# ─────────── CHECKOUT ───────────

@router.post("/checkout")
async def checkout(
    data: CheckoutRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis=Depends(get_redis),
):
    user_id = str(current_user["sub"])

    # 1. Validate address belongs to user
    addr_result = await db.execute(
        select(Address).where(
            Address.id == data.address_id,
            Address.user_id == user_id,
        )
    )
    address = addr_result.scalar_one_or_none()
    if not address:
        raise HTTPException(status_code=404, detail={"code": "ADDRESS_NOT_FOUND"})

    # 2. Get cart with products
    cart_result = await db.execute(
        select(CartItem)
        .where(CartItem.user_id == user_id)
        .options(
            selectinload(CartItem.product).selectinload(Product.images),
            selectinload(CartItem.variant),
        )
    )
    cart_items = cart_result.scalars().all()

    if not cart_items:
        raise HTTPException(status_code=400, detail={"code": "EMPTY_CART"})

    # 3. Validate stock and compute subtotal
    rates = await get_metal_rates(db, redis)
    subtotal = Decimal("0")
    order_items_data = []

    for item in cart_items:
        product = item.product
        if not product or not product.is_active:
            raise HTTPException(
                status_code=400,
                detail={"code": "PRODUCT_UNAVAILABLE", "message": f"{product.name} is no longer available"},
            )

        available_stock = (
            item.variant.stock_quantity if item.variant else product.stock_quantity
        )
        if item.quantity > available_stock:
            raise HTTPException(
                status_code=400,
                detail={
                    "code": "INSUFFICIENT_STOCK",
                    "message": f"Only {available_stock} units of '{product.name}' available",
                },
            )

        unit_price = compute_unit_price(product, item.variant, rates)

        primary_img = next(
            (img.image_url for img in product.images if img.is_primary),
            product.images[0].image_url if product.images else None,
        )

        subtotal += unit_price * item.quantity
        order_items_data.append({
            "product": product,
            "variant": item.variant,
            "quantity": item.quantity,
            "unit_price": unit_price,
            "primary_img": primary_img,
            "price_note": build_price_note(product, item.variant, rates),
        })

    # 4. Apply coupon
    discount_amount = Decimal("0")
    coupon_code = None
    if data.coupon_code:
        coupon_result = await db.execute(
            select(Coupon).where(
                Coupon.code == data.coupon_code.upper(),
                Coupon.is_active == True,
            )
        )
        coupon = coupon_result.scalar_one_or_none()
        if coupon:
            if coupon.discount_type.value == "flat":
                discount_amount = min(coupon.discount_value, subtotal)
            else:
                discount_amount = (subtotal * coupon.discount_value) / 100
                if coupon.max_discount:
                    discount_amount = min(discount_amount, coupon.max_discount)
            coupon.used_count += 1
            coupon_code = data.coupon_code.upper()

    total_amount = subtotal - discount_amount

    # 5. Create order in DB (this is the point of no return)
    address_snapshot = {
        "full_name": address.full_name,
        "phone": address.phone,
        "address_line": address.address_line,
        "city": address.city,
        "state": address.state,
        "pincode": address.pincode,
    }

    order = Order(
        user_id=user_id,
        order_number=generate_order_number(),
        status=OrderStatus.pending,
        subtotal=subtotal,
        discount_amount=discount_amount,
        coupon_code=coupon_code,
        total_amount=total_amount,
        payment_status=PaymentStatus.unpaid,
        address_snapshot=address_snapshot,
    )
    db.add(order)
    await db.flush()

    # 6. Create order items + decrement stock
    created_order_items = []
    for item_data in order_items_data:
        product = item_data["product"]
        variant = item_data["variant"]
        qty = item_data["quantity"]

        # Snapshot: variant name (if any) + purity/weight/rate at purchase time.
        variant_details = dict(item_data["price_note"])
        if variant:
            variant_details["name"] = variant.variant_name

        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            product_name_snapshot=product.name,
            product_image_snapshot=item_data["primary_img"],
            quantity=qty,
            price_at_purchase=item_data["unit_price"],
            variant_details=variant_details,
        )
        db.add(order_item)
        created_order_items.append(order_item)

        # Decrement stock
        if variant:
            variant.stock_quantity -= qty
        else:
            product.stock_quantity -= qty

    # 7. Clear cart
    for item in cart_items:
        await db.delete(item)
    await redis.delete(f"cart:count:{user_id}")

    # 8. Create payment order (Razorpay stub)
    payment_gateway = PaymentGateway()
    payment_info = await payment_gateway.create_order(
        amount=int(total_amount * 100),  # Razorpay expects paise
        receipt=order.order_number,
    )
    order.payment_provider_order_id = payment_info.get("id")
    await db.flush()

    # 9. Trigger email in background
    send_order_confirmation.delay(str(order.id))

    # Build response before session closes. order.items is empty in-memory (never populated
    # or reloaded after creation above) — build directly from created_order_items instead of
    # triggering an implicit lazy-load, which fails under async SQLAlchemy (MissingGreenlet).
    response_data = build_order_response(order, items=created_order_items)
    return {
        "order": response_data,
        "payment_info": payment_info,
        "razorpay_key": settings.RAZORPAY_KEY_ID or "test_key_add_yours",
    }


# ─────────── PAYMENT WEBHOOK ───────────

@router.post("/payment-webhook")
async def payment_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """
    Razorpay webhook endpoint.
    TODO: Uncomment signature verification once RAZORPAY_WEBHOOK_SECRET is set.
    """
    payload = await request.body()
    signature = request.headers.get("x-razorpay-signature", "")

    # TODO: Uncomment this block after setting RAZORPAY_WEBHOOK_SECRET in .env
    # gateway = PaymentGateway()
    # if not gateway.verify_webhook_signature(payload, signature):
    #     raise HTTPException(status_code=400, detail={"code": "INVALID_SIGNATURE"})

    body = await request.json()
    event = body.get("event")

    if event == "payment.captured":
        payment_entity = body["payload"]["payment"]["entity"]
        payment_id = payment_entity.get("id")
        provider_order_id = payment_entity.get("order_id")

        if not provider_order_id:
            return {"status": "ignored"}

        result = await db.execute(
            select(Order).where(Order.payment_provider_order_id == provider_order_id)
        )
        order = result.scalar_one_or_none()

        if not order:
            return {"status": "order_not_found"}

        # Idempotent: do nothing if already paid
        if order.payment_status == PaymentStatus.paid:
            return {"status": "already_processed"}

        order.payment_status = PaymentStatus.paid
        order.payment_id = payment_id
        order.status = OrderStatus.confirmed

    return {"status": "ok"}


# ─────────── ORDER HISTORY ───────────

@router.get("")
async def list_orders(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order)
        .where(Order.user_id == current_user["sub"])
        .options(selectinload(Order.items))
        .order_by(Order.created_at.desc())
    )
    orders = result.scalars().all()
    return [build_order_response(o) for o in orders]


@router.get("/{order_number}")
async def get_order(
    order_number: str,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order)
        .where(
            Order.order_number == order_number,
            Order.user_id == current_user["sub"],
        )
        .options(selectinload(Order.items))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail={"code": "ORDER_NOT_FOUND"})
    return build_order_response(order)


@router.post("/{order_number}/cancel", response_model=MessageResponse)
async def cancel_order(
    order_number: str,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order)
        .where(
            Order.order_number == order_number,
            Order.user_id == current_user["sub"],
        )
        .options(selectinload(Order.items))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail={"code": "ORDER_NOT_FOUND"})

    if order.status not in (OrderStatus.pending, OrderStatus.confirmed):
        raise HTTPException(
            status_code=400,
            detail={"code": "CANNOT_CANCEL", "message": f"Cannot cancel order in '{order.status.value}' status"},
        )

    order.status = OrderStatus.cancelled

    # Restore stock
    for item in order.items:
        p_result = await db.execute(select(Product).where(Product.id == item.product_id))
        product = p_result.scalar_one_or_none()
        if product:
            product.stock_quantity += item.quantity

    # TODO: If payment_status == paid, trigger refund stub here
    if order.payment_status == PaymentStatus.paid:
        # TODO: Call razorpay.refund(payment_id) — requires RAZORPAY_KEY_SECRET
        order.payment_status = PaymentStatus.refunded

    return MessageResponse(message="Order cancelled successfully")
