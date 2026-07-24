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


def build_order_confirmation_html(order: dict) -> str:
    items_html = "".join(
        f"""
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee">{item['product_name_snapshot']}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">{item['quantity']}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹{item['price_at_purchase']:,.2f}</td>
        </tr>
        """
        for item in order.get("items", [])
    )

    return f"""
    <!DOCTYPE html>
    <html>
    <body style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#7B1E3B;padding:24px;text-align:center">
        <h1 style="color:#C9A24B;margin:0;font-size:28px">Rajesh Jewellers</h1>
        <p style="color:#fff;margin:4px 0;font-size:12px">A UNIT OF SHREE VISHWANATH PRASAD SETH</p>
      </div>

      <div style="padding:32px">
        <h2 style="color:#7B1E3B">Order Confirmed!</h2>
        <p>Thank you for shopping with us. Your order has been received.</p>

        <div style="background:#f9f5f0;padding:16px;border-radius:8px;margin:16px 0">
          <strong>Order Number:</strong> {order.get('order_number')}<br>
          <strong>Status:</strong> {order.get('status', 'Confirmed')}<br>
          <strong>Date:</strong> {order.get('created_at', '')[:10]}
        </div>

        <h3 style="color:#7B1E3B">Items Ordered</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          <thead>
            <tr style="background:#f9f5f0">
              <th style="padding:8px;text-align:left">Item</th>
              <th style="padding:8px;text-align:center">Qty</th>
              <th style="padding:8px;text-align:right">Price</th>
            </tr>
          </thead>
          <tbody>{items_html}</tbody>
        </table>

        <div style="text-align:right;margin-top:16px">
          <p>Subtotal: ₹{order.get('subtotal', 0):,.2f}</p>
          {'<p>Discount: -₹' + f"{order.get('discount_amount', 0):,.2f}</p>" if order.get('discount_amount') else ''}
          <h3 style="color:#7B1E3B">Total: ₹{order.get('total_amount', 0):,.2f}</h3>
        </div>

        <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
        <p style="color:#666;font-size:13px">
          For queries, contact us at +91 98765 43210 or visit our store.<br>
          <strong>Rajesh Jewellers, Main Bazaar Road, Chowk, Varanasi, UP 221001</strong>
        </p>
      </div>

      <div style="background:#7B1E3B;padding:16px;text-align:center">
        <p style="color:#C9A24B;margin:0;font-size:12px">
          © 2026 Rajesh Jewellers — A unit of Shree Vishwanath Prasad Seth
        </p>
      </div>
    </body>
    </html>
    """


def build_order_status_html(order_number: str, new_status: str, customer_name: str) -> str:
    status_messages = {
        "confirmed": "Your order has been confirmed and is being prepared.",
        "shipped": "Great news! Your order is on its way.",
        "delivered": "Your order has been delivered. We hope you love it!",
        "cancelled": "Your order has been cancelled. Refund (if any) will be processed in 5-7 days.",
    }
    return f"""
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto">
      <div style="background:#7B1E3B;padding:24px;text-align:center">
        <h1 style="color:#C9A24B">Rajesh Jewellers</h1>
      </div>
      <div style="padding:32px">
        <p>Dear {customer_name},</p>
        <h2 style="color:#7B1E3B">Order {order_number} — {new_status.title()}</h2>
        <p>{status_messages.get(new_status, 'Your order status has been updated.')}</p>
        <p style="color:#666;font-size:13px">For support: +91 98765 43210</p>
      </div>
    </div>
    """
