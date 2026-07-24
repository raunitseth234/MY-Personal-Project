"""
Chat Service for Rajesh Jewellers chat widget.

Two modes (set CHAT_MODE in .env):
  "faq"  — keyword-based FAQ answers. Works right now, no API key needed.
  "llm"  — Groq-hosted LLM (OpenAI-compatible API) with tool-calling into
           live site data: product search, categories, metal rates, store
           locations. Needs GROQ_API_KEY in .env. Falls back to "faq" on
           any error so the widget never goes silent.
"""
import json
import logging
from decimal import Decimal
from typing import Optional

import httpx
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.db.mongo import get_chat_messages
from app.models import Category, Product, StoreLocation
from app.services.gold_rate import get_metal_rates
from app.services.pricing import compute_unit_price

logger = logging.getLogger("rajesh.chat")

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "openai/gpt-oss-120b"
MAX_TOOL_ROUNDS = 4
HISTORY_TURNS = 8  # user+assistant pairs kept for context

FAQ_RESPONSES = {
    # Store info
    ("timing", "time", "open", "close", "hours", "band"): (
        "We are open all days from 10:30 AM to 8:30 PM. "
        "You can also WhatsApp us at +91 98765 43210."
    ),
    ("location", "address", "store", "where", "kahan"): (
        "Our store is at: Rajesh Jewellers, Main Bazaar Road, Chowk, Varanasi, "
        "Uttar Pradesh 221001. We are near the famous Vishwanath Gali. "
        "Use Google Maps: [click here to navigate]"
    ),
    ("phone", "contact", "number", "call"): (
        "You can reach us at: +91 98765 43210 (call or WhatsApp). "
        "Or email us at rajeshjewellers@example.com."
    ),
    # Products
    ("gold", "sona", "22k", "18k", "karat", "purity", "hallmark", "bis"): (
        "We offer BIS Hallmarked 916 (22K) and 750 (18K) gold jewellery. "
        "All our gold pieces come with a Hallmarking certificate for guaranteed purity. "
        "We also do Old Gold Exchange — bring your old gold and upgrade!"
    ),
    ("diamond", "heera", "certified", "graded", "igi", "gia"): (
        "Our diamonds are certified by IGI/GIA. We provide the diamond certificate "
        "with every diamond jewellery purchase. Grades available from SI to VVS clarity."
    ),
    ("silver", "chandi"): (
        "We offer 925 Sterling Silver jewellery — rings, chains, anklets, and more. "
        "Silver items start from ₹999."
    ),
    # Orders
    ("order", "track", "status", "delivery", "ship"): (
        "You can track your order by logging into your account and visiting 'My Orders'. "
        "For urgent queries, call us at +91 98765 43210 with your Order Number."
    ),
    ("return", "exchange", "refund", "wapas"): (
        "We offer a 15-day return/exchange policy for unused items in original packaging. "
        "Customized items cannot be returned. For returns, call us or WhatsApp your order number."
    ),
    ("cancel"): (
        "To cancel an order, go to My Orders → Cancel. "
        "Orders can be cancelled before they are shipped. "
        "For shipped orders, use the return process."
    ),
    # Payment
    ("payment", "pay", "upi", "emi", "card", "cash"): (
        "We accept: UPI (PhonePe, GPay, Paytm), Credit/Debit Cards, Net Banking, "
        "and Cash on Delivery (for orders under ₹25,000). "
        "EMI available on credit cards for orders above ₹5,000."
    ),
    ("cod", "cash on delivery"): (
        "Cash on Delivery is available for orders up to ₹25,000. "
        "For higher amounts, prepaid payment is required."
    ),
    # Custom orders
    ("custom", "design", "made", "bespoke", "personaliz"): (
        "Yes! We do custom jewellery orders. Share your design idea by WhatsApp (+91 98765 43210) "
        "or visit our store. Delivery time for custom orders is 15-20 working days."
    ),
    # Pricing
    ("price", "rate", "cost", "kitna", "making charges", "gold rate"): (
        "Our prices include today's gold rate + making charges. "
        "Gold rate changes daily. Visit 'Today's Gold Rate' on our website for live rates. "
        "Making charges vary from 8% to 15% depending on the design."
    ),
    # General
    ("hi", "hello", "hey", "namaste", "hii"): (
        "Namaste! Welcome to Rajesh Jewellers 🙏 "
        "I'm here to help you. You can ask me about our products, store timings, "
        "orders, gold rates, or custom jewellery."
    ),
    ("thank", "thanks", "shukriya", "dhanyawad"): (
        "Thank you for choosing Rajesh Jewellers! "
        "A unit of Shree Vishwanath Prasad Seth — trusted since generations. "
        "Is there anything else I can help you with?"
    ),
}

DEFAULT_RESPONSE = (
    "I'm not sure about that. For detailed assistance, please:\n"
    "📞 Call/WhatsApp: +91 98765 43210\n"
    "🕙 Timings: 10:30 AM – 8:30 PM (All days)\n"
    "📍 Main Bazaar Road, Chowk, Varanasi, UP"
)

SYSTEM_PROMPT = """You are the shopping assistant for Rajesh Jewellers, a premium Indian \
jewellery store (a unit of Shree Vishwanath Prasad Seth, trusted since generations).

Store policies (always true, no need to look these up):
- Returns/exchange: 15-day window on unused items in original packaging. Customized \
items cannot be returned.
- Payment: UPI, credit/debit cards, net banking, and Cash on Delivery up to ₹25,000. \
EMI available on cards for orders above ₹5,000.
- Custom orders: yes, 15-20 working days, arranged via WhatsApp (+91 98765 43210) or in-store.
- Certification: gold is BIS Hallmarked (916 = 22K, 750 = 18K); diamonds are IGI/GIA certified.

You have tools to look up LIVE data — real products, prices, stock, categories, gold/silver/\
platinum rates, and store addresses/hours. Always call a tool for any question about specific \
products, prices, availability, or stock — never guess numbers. If a search returns nothing, \
say so honestly and suggest calling the store instead of inventing a product.

Reply in the language the customer used (Hindi, English, or Hinglish). Be warm and concise, \
under ~120 words unless you're listing several products (one per line with name and price).

The chat widget renders your reply as plain text — it does NOT support markdown. Never use \
**bold**, *italic*, # headers, or markdown bullets. For lists, just use a plain "- " at the \
start of each line."""

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "search_products",
            "description": (
                "Search the live product catalog. Use for any question about specific "
                "products, availability, price, or stock — e.g. 'gold rings under 50000', "
                "'do you have diamond earrings'."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Keyword to match against product name/description. Empty string to browse by filters only.",
                    },
                    "material": {
                        "type": ["string", "null"],
                        "enum": ["gold", "silver", "diamond", "platinum", "imitation", "kundan", "polki", None],
                        "description": "Filter by material, if the customer mentioned one. Omit or null otherwise.",
                    },
                    "min_price": {"type": ["number", "null"], "description": "Minimum price in INR, if mentioned."},
                    "max_price": {"type": ["number", "null"], "description": "Maximum price in INR, if mentioned."},
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_categories",
            "description": "List all product categories available on the site.",
            "parameters": {"type": "object", "properties": {}},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_metal_rates",
            "description": "Get today's live gold/silver/platinum rates per gram in INR, by purity.",
            "parameters": {"type": "object", "properties": {}},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_store_locations",
            "description": "Get store addresses, phone numbers, and opening hours.",
            "parameters": {"type": "object", "properties": {}},
        },
    },
]


class ChatService:
    def __init__(self):
        self.mode = settings.CHAT_MODE

    async def respond(
        self,
        session_id: str,
        message: str,
        db: Optional[AsyncSession] = None,
        redis=None,
    ) -> str:
        if self.mode == "llm" and settings.GROQ_API_KEY and db is not None:
            try:
                return await self._llm_respond(session_id, message, db, redis)
            except Exception as e:
                logger.error(f"Groq chat error: {e}")
        return self._faq_respond(message)

    def _faq_respond(self, message: str) -> str:
        msg_lower = message.lower().strip()

        for keywords, response in FAQ_RESPONSES.items():
            if isinstance(keywords, str):
                keywords = (keywords,)
            if any(kw in msg_lower for kw in keywords):
                return response

        return DEFAULT_RESPONSE

    # ─────────── LLM (Groq) ───────────

    async def _recent_history(self, session_id: str) -> list[dict]:
        col = await get_chat_messages()
        docs = (
            await col.find({"session_id": session_id})
            .sort("timestamp", -1)
            .limit(HISTORY_TURNS)
            .to_list(length=HISTORY_TURNS)
        )
        docs.reverse()
        messages = []
        for d in docs:
            messages.append({"role": "user", "content": d["user_message"]})
            messages.append({"role": "assistant", "content": d["bot_reply"]})
        return messages

    async def _llm_respond(
        self, session_id: str, message: str, db: AsyncSession, redis
    ) -> str:
        history = await self._recent_history(session_id)
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            *history,
            {"role": "user", "content": message},
        ]

        headers = {
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=20.0) as client:
            for _ in range(MAX_TOOL_ROUNDS):
                resp = await client.post(
                    GROQ_URL,
                    headers=headers,
                    json={
                        "model": GROQ_MODEL,
                        "messages": messages,
                        "tools": TOOLS,
                        "tool_choice": "auto",
                        "temperature": 0.4,
                        "max_tokens": 600,
                    },
                )

                if resp.status_code == 400:
                    body = resp.json().get("error", {})
                    if body.get("code") == "tool_use_failed":
                        # The model emitted a malformed tool call. Retry the same
                        # conversation state once, forcing a plain-text answer
                        # instead of surfacing the error or a canned FAQ reply.
                        logger.warning(
                            f"Groq tool_use_failed, retrying without tools: "
                            f"{body.get('failed_generation')}"
                        )
                        no_tool_messages = messages + [
                            {
                                "role": "system",
                                "content": (
                                    "No tools or web access are available for this reply. "
                                    "Do not attempt to call any function (including web "
                                    "search/browsing). Answer directly from the policies "
                                    "and conversation above, or say you're not sure and "
                                    "give the store phone number."
                                ),
                            }
                        ]
                        retry = await client.post(
                            GROQ_URL,
                            headers=headers,
                            json={
                                "model": GROQ_MODEL,
                                "messages": no_tool_messages,
                                "temperature": 0.3,
                                "max_tokens": 400,
                            },
                        )
                        if retry.status_code >= 400:
                            logger.error(f"Groq retry-without-tools also failed: {retry.text}")
                        retry.raise_for_status()
                        content = retry.json()["choices"][0]["message"].get("content")
                        return (content or "").strip() or DEFAULT_RESPONSE

                resp.raise_for_status()
                choice = resp.json()["choices"][0]["message"]
                tool_calls = choice.get("tool_calls")

                if not tool_calls:
                    return (choice.get("content") or "").strip() or DEFAULT_RESPONSE

                messages.append(choice)
                for call in tool_calls:
                    name = call["function"]["name"]
                    try:
                        args = json.loads(call["function"].get("arguments") or "{}")
                    except json.JSONDecodeError:
                        args = {}
                    result = await self._run_tool(name, args, db, redis)
                    messages.append(
                        {
                            "role": "tool",
                            "tool_call_id": call["id"],
                            "content": json.dumps(result, default=str),
                        }
                    )

        logger.warning("Groq chat hit MAX_TOOL_ROUNDS without a final answer")
        return DEFAULT_RESPONSE

    async def _run_tool(self, name: str, args: dict, db: AsyncSession, redis) -> dict:
        if name == "search_products":
            return await self._tool_search_products(args, db, redis)
        if name == "get_categories":
            return await self._tool_get_categories(db)
        if name == "get_metal_rates":
            return await self._tool_get_metal_rates(db, redis)
        if name == "get_store_locations":
            return await self._tool_get_store_locations(db)
        return {"error": f"unknown tool '{name}'"}

    async def _tool_search_products(self, args: dict, db: AsyncSession, redis) -> dict:
        query = (args.get("query") or "").strip()
        material = args.get("material")
        min_price = args.get("min_price")
        max_price = args.get("max_price")

        stmt = (
            select(Product)
            .where(Product.is_active == True)
            .options(selectinload(Product.images), selectinload(Product.category))
        )
        if query:
            stmt = stmt.where(
                or_(
                    Product.name.ilike(f"%{query}%"),
                    Product.description.ilike(f"%{query}%"),
                )
            )
        if material:
            stmt = stmt.where(Product.material == material)
        stmt = stmt.order_by(Product.is_featured.desc(), Product.created_at.desc()).limit(25)

        result = await db.execute(stmt)
        products = result.scalars().all()
        rates = await get_metal_rates(db, redis)

        items = []
        for p in products:
            price = compute_unit_price(p, None, rates)
            if min_price is not None and price < Decimal(str(min_price)):
                continue
            if max_price is not None and price > Decimal(str(max_price)):
                continue
            items.append(
                {
                    "name": p.name,
                    "slug": p.slug,
                    "category": p.category.name if p.category else None,
                    "material": p.material.value,
                    "purity": p.purity,
                    "weight_grams": float(p.weight_grams) if p.weight_grams else None,
                    "price_inr": float(price),
                    "in_stock": p.stock_quantity > 0,
                    "stock_quantity": p.stock_quantity,
                }
            )
            if len(items) >= 8:
                break

        return {"count": len(items), "products": items}

    async def _tool_get_categories(self, db: AsyncSession) -> dict:
        result = await db.execute(select(Category).where(Category.is_active == True))
        return {"categories": [c.name for c in result.scalars().all()]}

    async def _tool_get_metal_rates(self, db: AsyncSession, redis) -> dict:
        rates = await get_metal_rates(db, redis)
        return {f"{material}_{purity}": float(rate) for (material, purity), rate in rates.items()}

    async def _tool_get_store_locations(self, db: AsyncSession) -> dict:
        result = await db.execute(
            select(StoreLocation).where(StoreLocation.is_active == True)
        )
        return {
            "locations": [
                {
                    "name": s.name,
                    "address": s.address,
                    "city": s.city,
                    "state": s.state,
                    "phone": s.phone,
                    "opening_hours": s.opening_hours,
                    "map_link": s.map_link,
                }
                for s in result.scalars().all()
            ]
        }
