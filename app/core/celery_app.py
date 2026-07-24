from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "rajesh_jewellers",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=[
        "app.tasks.order_emails",
        "app.tasks.notifications",
    ],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Asia/Kolkata",
    enable_utc=True,
    beat_schedule={
        "abandoned-cart-reminder": {
            "task": "app.tasks.notifications.abandoned_cart_reminder",
            "schedule": 86400.0,  # daily
        },
    },
)
