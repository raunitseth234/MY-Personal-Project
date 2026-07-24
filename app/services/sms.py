"""
SMS Service for OTP delivery.

CURRENT STATE: STUB — logs OTP to console.
TO ACTIVATE: Add MSG91_AUTH_KEY and MSG91_TEMPLATE_ID to .env
             then uncomment the httpx block below.

India DLT registration is MANDATORY before MSG91 will send transactional
SMS. Register your business at: https://www.trai.gov.in/
"""
import logging
from app.core.config import settings

logger = logging.getLogger("rajesh.sms")


async def send_sms(phone: str, message: str) -> bool:
    if settings.MSG91_AUTH_KEY:
        # TODO: Uncomment when MSG91_AUTH_KEY is set in .env
        # import httpx
        # url = "https://api.msg91.com/api/v5/otp"
        # params = {
        #     "authkey": settings.MSG91_AUTH_KEY,
        #     "mobile": f"91{phone}",
        #     "message": message,
        #     "sender": settings.MSG91_SENDER_ID or "RAJJWL",
        #     "otp_expiry": 5,
        # }
        # async with httpx.AsyncClient() as client:
        #     r = await client.post(url, json=params)
        #     return r.status_code == 200
        pass

    # DEV MODE: just log
    logger.info(f"[SMS STUB] To: +91{phone} | Message: {message}")
    return True
