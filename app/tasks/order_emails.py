"""
Celery tasks for order-related emails.
These run in the background so checkout doesn't wait for email delivery.
"""
import asyncio
import logging

from app.core.celery_app import celery_app
from app.services.email import send_email, build_order_confirmation_html

logger = logging.getLogger("rajesh.tasks")


@celery_app.task(bind=True, max_retries=3, default_retry_delay=60)
def send_order_confirmation(self, order_id: str):
    """
    Sends order confirmation email after successful checkout.
    Triggered by: app/api/v1/orders.py → checkout()
    """
    try:
        # We need to fetch the order — use a sync DB call via asyncpg
        asyncio.run(_send_order_confirmation_async(order_id))
    except Exception as exc:
        logger.error(f"Order confirmation email failed for {order_id}: {exc}")
        raise self.retry(exc=exc)


async def _send_order_confirmation_async(order_id: str):
    from sqlalchemy import select
    from sqlalchemy.orm import selectinload
    from app.db.postgres import AsyncSessionLocal
    from app.models import Order, User

    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(Order)
            .where(Order.id == order_id)
            .options(selectinload(Order.items), selectinload(Order.user))
        )
        order = result.scalar_one_or_none()
        if not order or not order.user:
            logger.warning(f"Order {order_id} not found or has no user")
            return

        order_dict = {
            "order_number": order.order_number,
            "status": order.status.value,
            "created_at": order.created_at.isoformat(),
            "subtotal": float(order.subtotal),
            "discount_amount": float(order.discount_amount),
            "total_amount": float(order.total_amount),
            "items": [
                {
                    "product_name_snapshot": item.product_name_snapshot,
                    "quantity": item.quantity,
                    "price_at_purchase": float(item.price_at_purchase),
                }
                for item in order.items
            ],
        }

        html = build_order_confirmation_html(order_dict)
        await send_email(
            to_email=order.user.email,
            subject=f"Order Confirmed — {order.order_number} | Rajesh Jewellers",
            html_content=html,
        )
        logger.info(f"Order confirmation email sent for {order.order_number}")


@celery_app.task
def send_order_status_update(order_id: str, new_status: str):
    """
    Sends status update email when admin updates order status.
    Triggered by: app/api/v1/admin/admin_router.py → update_order_status()
    """
    asyncio.run(_send_status_update_async(order_id, new_status))


async def _send_status_update_async(order_id: str, new_status: str):
    from sqlalchemy import select
    from sqlalchemy.orm import selectinload
    from app.db.postgres import AsyncSessionLocal
    from app.models import Order, User
    from app.services.email import build_order_status_html

    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(Order)
            .where(Order.id == order_id)
            .options(selectinload(Order.user))
        )
        order = result.scalar_one_or_none()
        if not order or not order.user:
            return

        html = build_order_status_html(
            order_number=order.order_number,
            new_status=new_status,
            customer_name=order.user.name,
        )
        await send_email(
            to_email=order.user.email,
            subject=f"Order {order.order_number} — {new_status.title()} | Rajesh Jewellers",
            html_content=html,
        )
