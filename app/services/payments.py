"""
Payment Gateway Service — Razorpay abstraction.

CURRENT STATE: All methods are STUBBED and return fake data.
TO ACTIVATE:
  1. pip install razorpay
  2. Add to .env:
       RAZORPAY_KEY_ID=rzp_live_xxxx
       RAZORPAY_KEY_SECRET=your_secret
       RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
  3. Uncomment the razorpay.Client block below.
"""
import hashlib
import hmac
import logging
import uuid

from app.core.config import settings

logger = logging.getLogger("rajesh.payments")


class PaymentGateway:
    def __init__(self):
        self.client = None
        if settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET:
            try:
                # TODO: Uncomment once 'pip install razorpay' is done
                # import razorpay
                # self.client = razorpay.Client(
                #     auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
                # )
                pass
            except ImportError:
                logger.warning("razorpay package not installed. Run: pip install razorpay")

    async def create_order(self, amount: int, receipt: str) -> dict:
        """
        Creates a Razorpay payment order.
        amount: in paise (₹1 = 100 paise)
        receipt: your internal order ID / order_number

        Returns a dict with 'id' (Razorpay order ID) that frontend
        uses to open the Razorpay payment modal.
        """
        if self.client:
            # TODO: Uncomment when keys are configured
            # order = self.client.order.create({
            #     "amount": amount,
            #     "currency": "INR",
            #     "receipt": receipt,
            #     "payment_capture": 1,
            # })
            # return order
            pass

        # STUB — returns fake Razorpay-like response
        logger.warning(
            f"[PAYMENT STUB] Would create Razorpay order: amount=₹{amount/100:.2f} receipt={receipt}"
        )
        return {
            "id": f"order_stub_{uuid.uuid4().hex[:16]}",
            "entity": "order",
            "amount": amount,
            "amount_paid": 0,
            "amount_due": amount,
            "currency": "INR",
            "receipt": receipt,
            "status": "created",
            "_stub": True,
            "_message": "Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env to enable real payments",
        }

    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """
        Verifies that a webhook payload came from Razorpay using HMAC-SHA256.

        TO ACTIVATE:
          Add RAZORPAY_WEBHOOK_SECRET to .env (from Razorpay dashboard → Webhooks)
        """
        if settings.RAZORPAY_WEBHOOK_SECRET:
            expected = hmac.new(
                settings.RAZORPAY_WEBHOOK_SECRET.encode(),
                payload,
                hashlib.sha256,
            ).hexdigest()
            return hmac.compare_digest(expected, signature)

        # STUB — in dev mode always returns True with a loud warning
        logger.warning(
            "[WEBHOOK STUB] Signature verification SKIPPED. "
            "Set RAZORPAY_WEBHOOK_SECRET in .env for production."
        )
        return True

    async def refund(self, payment_id: str, amount: int = None) -> dict:
        """
        Initiates a refund for a payment.
        amount: optional partial refund in paise. None = full refund.

        TO ACTIVATE: Requires RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET
        """
        if self.client:
            # TODO: Uncomment when keys are configured
            # body = {"speed": "normal"}
            # if amount:
            #     body["amount"] = amount
            # return self.client.payment.refund(payment_id, body)
            pass

        logger.warning(f"[REFUND STUB] Would refund payment_id={payment_id} amount={amount}")
        return {
            "id": f"rfnd_stub_{uuid.uuid4().hex[:16]}",
            "payment_id": payment_id,
            "amount": amount,
            "_stub": True,
        }
