"""
Email Service using SendGrid.

CURRENT STATE: Logs email content to console.
TO ACTIVATE:
  1. pip install sendgrid
  2. Add SENDGRID_API_KEY to .env
  3. Verify your sender domain in SendGrid dashboard
"""
import logging
from app.core.config import settings

logger = logging.getLogger("rajesh.email")


async def send_email(to_email: str, subject: str, html_content: str) -> bool:
    if settings.SENDGRID_API_KEY:
        try:
            # TODO: Uncomment once SENDGRID_API_KEY is set
            # from sendgrid import SendGridAPIClient
            # from sendgrid.helpers.mail import Mail
            # message = Mail(
            #     from_email=settings.SENDGRID_FROM_EMAIL,
            #     to_emails=to_email,
            #     subject=subject,
            #     html_content=html_content,
            # )
            # sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            # response = sg.send(message)
            # return response.status_code in (200, 202)
            pass
        except Exception as e:
            logger.error(f"SendGrid error: {e}")
            return False

    logger.info(
        f"\n{'='*60}\n[EMAIL STUB]\nTo: {to_email}\nSubject: {subject}\n"
        f"Content preview: {html_content[:200]}...\n"
        f"Add SENDGRID_API_KEY to .env to send real emails\n{'='*60}"
    )
    return True
