"""Fast, isolated unit tests for the pricing engine.

No database, Redis, or network — `app.services.pricing` is pure and duck-typed,
so products/variants are stand-in `SimpleNamespace` objects. Runs with
`pytest app/tests/unit` in milliseconds with zero external services.
"""
from decimal import Decimal
from types import SimpleNamespace

import pytest

from app.services.pricing import (
    GST_RATE,
    build_price_note,
    compute_unit_price,
    is_dynamic,
)


def make_product(**overrides):
    base = dict(
        material="gold",
        purity="22K",
        weight_grams=Decimal("10"),
        base_price=Decimal("25000"),
        discount_price=None,
        making_charge_type="percentage",
        making_charge_value=Decimal("0"),
    )
    base.update(overrides)
    return SimpleNamespace(**base)


GOLD_RATES = {("gold", "22K"): Decimal("6000")}


# ── Dynamic (metal, gram-priced) pricing ──────────────────────────────


def test_dynamic_price_percentage_making_charge():
    # 10g * 6000 = 60000 metal; +10% making = 6000; *1.03 GST = 67980
    product = make_product(making_charge_value=Decimal("10"))
    assert compute_unit_price(product, None, GOLD_RATES) == Decimal("67980")


def test_dynamic_price_per_gram_making_charge():
    # metal 60000 + (10g * 500) = 65000; *1.03 = 66950
    product = make_product(
        making_charge_type="per_gram", making_charge_value=Decimal("500")
    )
    assert compute_unit_price(product, None, GOLD_RATES) == Decimal("66950")


def test_dynamic_price_flat_making_charge():
    # metal 60000 + 2000 flat = 62000; *1.03 = 63860
    product = make_product(
        making_charge_type="flat", making_charge_value=Decimal("2000")
    )
    assert compute_unit_price(product, None, GOLD_RATES) == Decimal("63860")


def test_gst_rate_is_applied():
    product = make_product(making_charge_value=Decimal("0"))
    expected = Decimal("60000") * (Decimal("1") + GST_RATE)
    assert compute_unit_price(product, None, GOLD_RATES) == expected.quantize(Decimal("1"))


def test_is_dynamic_true_for_metal_with_rate_and_weight():
    assert is_dynamic(make_product(), None, GOLD_RATES) is True


def test_is_dynamic_false_without_rate():
    assert is_dynamic(make_product(), None, {}) is False


def test_is_dynamic_false_without_weight():
    assert is_dynamic(make_product(weight_grams=None), None, GOLD_RATES) is False


# ── Static (stone / non-metal) pricing ────────────────────────────────


def test_static_price_uses_base_price_when_no_rate():
    product = make_product(material="diamond", purity=None, base_price=Decimal("45000"))
    assert compute_unit_price(product, None, GOLD_RATES) == Decimal("45000")


def test_static_price_prefers_discount_price():
    product = make_product(
        material="diamond", purity=None,
        base_price=Decimal("45000"), discount_price=Decimal("39999"),
    )
    assert compute_unit_price(product, None, GOLD_RATES) == Decimal("39999")


def test_static_price_adds_variant_additional_price():
    product = make_product(material="kundan", purity=None, base_price=Decimal("10000"))
    variant = SimpleNamespace(purity=None, additional_price=Decimal("1500"))
    assert compute_unit_price(product, variant, GOLD_RATES) == Decimal("11500")


def test_metal_without_weight_falls_back_to_static():
    # gold, but no weight → cannot gram-price, uses base_price
    product = make_product(weight_grams=None, base_price=Decimal("20000"))
    assert compute_unit_price(product, None, GOLD_RATES) == Decimal("20000")


# ── Variant purity selection ──────────────────────────────────────────


def test_variant_purity_overrides_product_purity():
    product = make_product(purity="22K")
    variant = SimpleNamespace(purity="18K", additional_price=Decimal("0"))
    rates = {("gold", "18K"): Decimal("4500")}
    # 10g * 4500 = 45000; *1.03 = 46350 (uses variant's 18K rate, not product's 22K)
    assert compute_unit_price(product, variant, rates) == Decimal("46350")


# ── build_price_note snapshot ─────────────────────────────────────────


def test_build_price_note_dynamic():
    note = build_price_note(make_product(), None, GOLD_RATES)
    assert note == {"purity": "22K", "weight_grams": 10.0, "rate_per_gram": 6000.0}


def test_build_price_note_static_has_no_rate():
    product = make_product(material="diamond", purity=None, weight_grams=None)
    note = build_price_note(product, None, GOLD_RATES)
    assert note == {"purity": None, "weight_grams": None, "rate_per_gram": None}


@pytest.mark.parametrize("material", ["diamond", "kundan", "polki", "imitation"])
def test_non_dynamic_materials_are_static(material):
    product = make_product(material=material, purity=None, base_price=Decimal("5000"))
    assert is_dynamic(product, None, GOLD_RATES) is False
    assert compute_unit_price(product, None, GOLD_RATES) == Decimal("5000")
