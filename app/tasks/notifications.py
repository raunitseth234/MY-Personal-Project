"""
Background notification tasks.
Scheduled via Celery Beat (defined in core/celery_app.py).
"""
import asyncio
import logging
from datetime import datetime, timedelta, timezone

from app.core.celery_app import celery_app
from app.services.email import send_email

logger = logging.getLogger("rajesh.notifications")


@celery_app.task
def abandoned_cart_reminder():
    """
    Runs daily. Finds users who have items in cart for 24+ hours
    but haven't placed an order, and sends a reminder email.
    """
    asyncio.run(_run_abandoned_cart_reminder())


async def _run_abandoned_cart_reminder():
    from sqlalchemy import select
    from sqlalchemy.orm import selectinload
    from app.db.postgres import AsyncSessionLocal
    from app.models import CartItem, User, Product

    cutoff = datetime.now(timezone.utc) - timedelta(hours=24)

    async with AsyncSessionLocal() as db:
        # Find distinct users with old cart items
        result = await db.execute(
            select(CartItem.user_id)
            .where(CartItem.updated_at <= cutoff)
            .distinct()
        )
        user_ids = [row[0] for row in result.all()]

        for user_id in user_ids:
            try:
                # Get user
                u_result = await db.execute(select(User).where(User.id == user_id))
                user = u_result.scalar_one_or_none()
                if not user:
                    continue

                # Get their cart items
                c_result = await db.execute(
                    select(CartItem)
                    .where(CartItem.user_id == user_id)
                    .options(selectinload(CartItem.product))
                )
                items = c_result.scalars().all()
                if not items:
                    continue

                item_list = "".join(
                    f"<li>{item.product.name} — ₹{item.product.base_price:,.2f}</li>"
                    for item in items
                    if item.product
                )

                html = f"""
                <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto">
                  <div style="background:#7B1E3B;padding:24px;text-align:center">
                    <h1 style="color:#C9A24B">Rajesh Jewellers</h1>
                  </div>
                  <div style="padding:32px">
                    <p>Dear {user.name},</p>
                    <h2 style="color:#7B1E3B">You left something beautiful behind...</h2>
                    <p>You have items waiting in your cart:</p>
                    <ul style="color:#333">{item_list}</ul>
                    <p>Complete your purchase before these pieces are gone!</p>
                    <a href="http://localhost:3000/cart"
                       style="display:inline-block;background:#7B1E3B;color:#C9A24B;
                              padding:12px 24px;text-decoration:none;border-radius:4px;
                              margin-top:16px">
                      Return to Cart →
                    </a>
                  </div>
                  <div style="background:#7B1E3B;padding:16px;text-align:center">
                    <p style="color:#C9A24B;font-size:12px;margin:0">
                      © 2026 Rajesh Jewellers — A unit of Shree Vishwanath Prasad Seth
                    </p>
                  </div>
                </div>
                """
                await send_email(
                    to_email=user.email,
                    subject="Your cart is waiting — Rajesh Jewellers",
                    html_content=html,
                )
                logger.info(f"Abandoned cart reminder sent to {user.email}")

            except Exception as e:
                logger.error(f"Abandoned cart reminder failed for user {user_id}: {e}")
