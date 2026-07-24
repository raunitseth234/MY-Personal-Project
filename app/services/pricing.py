"""
Single source of truth for product pricing.

Dynamically-priced metals (gold/silver/platinum):
    total = (rate_per_gram × weight + making_charge) × (1 + GST)

Everything else (diamond/kundan/polki/imitation, or a metal with no rate/weight):
    static = discount_price or base_price (+ variant.additional_price)
    — diamonds are stone-priced, not gram-priced.

Both cart, checkout, list and detail endpoints call compute_unit_price() with the
same rates dict, so the price for a given (product, purity) is identical everywhere.
"""
from decimal import Decimal, ROUND_HALF_UP

GST_RATE = Decimal("0.03")   # 3% GST on jewellery, folded into the shown price
DYNAMIC_MATERIALS = {"gold", "silver", "platinum"}


def _material(product) -> str:
    m = product.material
    return m.value if hasattr(m, "value") else str(m)


def _purity(product, variant) -> str | None:
    if variant is not None and getattr(variant, "purity", None):
        return variant.purity
    return product.purity


def _round_rupee(d: Decimal) -> Decimal:
    return d.quantize(Decimal("1"), rounding=ROUND_HALF_UP)


def _making_charge(product, weight: Decimal, metal_value: Decimal) -> Decimal:
    ctype = product.making_charge_type or "percentage"
    value = Decimal(product.making_charge_value or 0)
    if ctype == "percentage":
        return metal_value * value / Decimal("100")
    if ctype == "per_gram":
        return weight * value
    return value  # flat


def is_dynamic(product, variant, rates) -> bool:
    """True when this product is priced from a live metal rate."""
    material = _material(product)
    purity = _purity(product, variant)
    rate = rates.get((material, purity)) if purity else None
    return bool(material in DYNAMIC_MATERIALS and rate and product.weight_grams)


def compute_unit_price(product, variant, rates) -> Decimal:
    """Return the unit price (₹, rounded to rupee) for one product/variant."""
    material = _material(product)
    purity = _purity(product, variant)
    rate = rates.get((material, purity)) if purity else None
    weight = product.weight_grams

    if material in DYNAMIC_MATERIALS and rate and weight:
        weight = Decimal(weight)
        metal_value = rate * weight
        making = _making_charge(product, weight, metal_value)
        total = (metal_value + making) * (Decimal("1") + GST_RATE)
        return _round_rupee(total)

    # Static fallback (diamonds & non-metal materials)
    price = product.discount_price if product.discount_price else product.base_price
    price = Decimal(price)
    if variant is not None and variant.additional_price:
        price += Decimal(variant.additional_price)
    return _round_rupee(price)


def build_price_note(product, variant, rates) -> dict:
    """Compact snapshot for the OrderItem `variant_details` JSON (not a user breakdown)."""
    material = _material(product)
    purity = _purity(product, variant)
    rate = rates.get((material, purity)) if purity else None
    return {
        "purity": purity,
        "weight_grams": float(product.weight_grams) if product.weight_grams else None,
        "rate_per_gram": float(rate) if rate else None,
    }
