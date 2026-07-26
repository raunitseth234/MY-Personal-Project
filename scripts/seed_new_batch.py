"""
Seed ~216 new products from the July-2026 jewellery photo batch.
Creates 2 new categories (Nath, Bracelets) and inserts/updates all products.

Run INSIDE Docker AFTER process_new_images.py has copied all photos:
    docker-compose exec api python scripts/seed_new_batch.py

Uses SKU-based upsert: safe to run multiple times.
Products without weight have base_price=20000 as placeholder (update from admin panel).
"""
import asyncio
import re
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.models import Category, Product, ProductImage


# ── Helpers ─────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def img(cat: str, num: int, i: int) -> str:
    return f"/static/images/products/{cat}_{num:03d}_{i:02d}.jpg"


def imgs(cat: str, num: int, count: int) -> list:
    return [img(cat, num, i) for i in range(1, count + 1)]


def gold_price(weight: float, purity: str, mc: float) -> int:
    """Fallback base_price for gold items (live rate overrides at runtime)."""
    if weight <= 0:
        return 20000
    rate = 7500 if purity in ("22K", None) else 6136  # 18K = 7500*18/22
    return round(weight * rate * (1 + mc / 100) * 1.03)


def diamond_price(weight: float) -> int:
    """Rough static estimate for real-diamond products (admin should verify)."""
    if weight <= 0:
        return 125000
    if weight < 2:
        return 75000
    if weight < 3:
        return 100000
    if weight < 4:
        return 150000
    return 200000


# ── New categories ───────────────────────────────────────────────────────────

NEW_CATEGORIES = [
    {"name": "Nath",      "slug": "nath",      "display_order": 13,
     "image_url": img("nath", 1, 1)},
    {"name": "Bracelets", "slug": "bracelets", "display_order": 14,
     "image_url": img("bracelet", 3, 1)},
]

# ── Product definitions ──────────────────────────────────────────────────────
# Fields: name, sku, cat (slug), material, purity, weight, mc (%), images, desc,
#         base_price (optional), featured

PRODUCTS = [

    # ════════════════════════════════════════════════════════════════
    # CHAINS  (CHN-010 to CHN-017)
    # ════════════════════════════════════════════════════════════════
    {"name": "Round Disc Ball Gold Chain",
     "sku": "CHN-010", "cat": "chain", "material": "gold", "purity": "22K",
     "weight": 16.63, "mc": 12,
     "images": imgs("chain", 10, 1),
     "desc": "Ladies gold chain with round disc links and ball bead accents. Lightweight everyday wear."},

    {"name": "Floral Disc Link Gold Chain",
     "sku": "CHN-011", "cat": "chain", "material": "gold", "purity": "22K",
     "weight": 17.41, "mc": 12,
     "images": imgs("chain", 11, 1),
     "desc": "Ladies gold chain with floral disc links. Elegant design for daily and festive wear."},

    {"name": "Diamond-Cut Beaded Gold Chain",
     "sku": "CHN-012", "cat": "chain", "material": "gold", "purity": "22K",
     "weight": 20.20, "mc": 12,
     "images": imgs("chain", 12, 1),
     "desc": "Gold chain with alternating round and diamond-cut beads, rich lustrous finish."},

    {"name": "Leaf Scale Link Gold Chain",
     "sku": "CHN-013", "cat": "chain", "material": "gold", "purity": "22K",
     "weight": 25.08, "mc": 12,
     "images": imgs("chain", 13, 1),
     "desc": "Bold gold chain with broad textured leaf/scale-pattern links and round bead accents."},

    {"name": "18K Trishul Rudraksha Pendant Chain",
     "sku": "EFSCS139-21", "cat": "chain", "material": "gold", "purity": "18K",
     "weight": 1.80, "mc": 12,
     "images": imgs("chain", 14, 1),
     "desc": "18K gold box chain with a Trishul-and-Rudraksha pendant featuring color stone accents. Rudraksha bead is non-gold."},

    {"name": "Diamond Station Y-Drop Chain",
     "sku": "CHN-015", "cat": "chain", "material": "gold", "purity": "22K",
     "weight": 4.522, "mc": 12,
     "images": imgs("chain", 15, 1),
     "desc": "Delicate gold chain necklace with diamond stations and a Y-drop tassel ending in teardrop charms."},

    {"name": "18K Hanuman Enamel Pendant Chain",
     "sku": "EFSCS139-22", "cat": "chain", "material": "gold", "purity": "18K",
     "weight": 2.37, "mc": 12,
     "images": imgs("chain", 16, 1),
     "desc": "18K gold box chain with a Hanuman deity pendant featuring multicolor enamel and a Rudraksha drop."},

    {"name": "Rope-Twist Ball Station Gold Chain",
     "sku": "CHN-017", "cat": "chain", "material": "gold", "purity": "22K",
     "weight": 10.85, "mc": 12,
     "images": imgs("chain", 17, 1),
     "desc": "Gold rope-twist chain necklace with gold and rhodium-finished bead stations and a two-tone tasseled drop."},

    # ════════════════════════════════════════════════════════════════
    # NATH  (NTH-001 to NTH-006)
    # ════════════════════════════════════════════════════════════════
    {"name": "18K Ruby CZ Floral Nath",
     "sku": "FNNR71122B", "cat": "nath", "material": "gold", "purity": "18K",
     "weight": 1.901, "mc": 15,
     "images": imgs("nath", 1, 1),
     "desc": "18K gold nath with ruby and white CZ stones in a floral setting with pearl drop. Bridal and festive wear."},

    {"name": "18K Peacock Meenakari Nath with Teardrop",
     "sku": "FNNR71032WA", "cat": "nath", "material": "gold", "purity": "18K",
     "weight": 1.427, "mc": 15,
     "images": imgs("nath", 2, 1),
     "desc": "18K gold peacock nath with enamel meenakari peacock motif, CZ stones and teardrop pendant."},

    {"name": "18K Large Hoop Peacock Nath",
     "sku": "FNNR71022WA", "cat": "nath", "material": "gold", "purity": "18K",
     "weight": 1.209, "mc": 15,
     "images": imgs("nath", 3, 1),
     "desc": "18K gold large hoop nath with meenakari peacock motif, white CZ stones and teardrop drop."},

    {"name": "18K Round CZ Nath with Leaf Drops",
     "sku": "FNNR71105A", "cat": "nath", "material": "gold", "purity": "18K",
     "weight": 2.023, "mc": 15,
     "images": imgs("nath", 4, 1),
     "desc": "18K gold round nath with CZ stones and leaf-shaped drops at bottom with pearl drop accent."},

    {"name": "18K Floral CZ Double-Row Nath",
     "sku": "FNNR71124A", "cat": "nath", "material": "gold", "purity": "18K",
     "weight": 2.649, "mc": 15,
     "images": imgs("nath", 5, 1), "featured": True,
     "desc": "18K gold large hoop nath with floral CZ cluster centre and double-row stone border with pearl drop."},

    {"name": "18K Star Motif CZ Spike Nath",
     "sku": "FNNR71120A", "cat": "nath", "material": "gold", "purity": "18K",
     "weight": 2.006, "mc": 15,
     "images": imgs("nath", 6, 1),
     "desc": "18K gold star/sun-motif nath with CZ-studded border and gold spike elements."},

    # ════════════════════════════════════════════════════════════════
    # HAAR & NECKLACE SETS  (HAR-023 to HAR-055)
    # ════════════════════════════════════════════════════════════════
    {"name": "Lakshmi Ganesha Temple Coin Haar",
     "sku": "HAR-023", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 17.64, "mc": 12,
     "images": imgs("haar", 23, 1),
     "desc": "Gold haar necklace with large Ganesha pendant and Lakshmi coin accents with gold bead spacers. Traditional temple design."},

    {"name": "Temple Deity Coin Haar",
     "sku": "HAR-024", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 14.92, "mc": 12,
     "images": imgs("haar", 24, 1),
     "desc": "Gold haar necklace with mixed deity coin pendants and gold bead spacers. Traditional temple design."},

    {"name": "Lakshmi Jhumka Pendant Coin Haar",
     "sku": "HAR-025", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 17.58, "mc": 12,
     "images": imgs("haar", 25, 1),
     "desc": "Gold haar necklace with large Lakshmi pendant and jhumka drops on coin chain."},

    {"name": "18K Diamond-Link Necklace with Flower Pendant",
     "sku": "SHS2576-01", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 16.051, "mc": 12,
     "images": imgs("haar", 26, 1),
     "desc": "18K gold diamond-link necklace with floral pendant set with color stones and CZ."},

    {"name": "Pearl and Blue Bead Peacock Haar Set",
     "sku": "HAR-027", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 12,
     "images": imgs("haar", 27, 1),
     "desc": "Multi-strand pearl and blue bead haar necklace set with gold peacock pendants and matching drop earrings. Price may vary - contact us for quote."},

    {"name": "Geometric Triangle Hexagon CZ Necklace Set",
     "sku": "HAR-028", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 13.905, "mc": 12,
     "images": [img("haar", 28, 1), img("haar", 28, 2)],
     "desc": "Gold necklace with geometric triangle and hexagon motifs heavily set with CZ stones and matching drop earrings."},

    {"name": "18K Leaf-Link Purple Stone Necklace",
     "sku": "SHS2543-04", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 5.282, "mc": 12,
     "images": imgs("haar", 29, 1),
     "desc": "18K gold leaf-link chain necklace set with CZ stones and purple color stone pendant."},

    {"name": "Geometric Spike CZ Crescent Necklace Set",
     "sku": "HAR-030", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 6.984, "mc": 12,
     "images": [img("haar", 30, 1), img("haar", 30, 2)],
     "desc": "Gold necklace with geometric stud motifs and CZ-encrusted crescent moon pendant with tassel drops, matching earrings."},

    {"name": "18K Square-Link CZ Diamond Necklace Set",
     "sku": "HAR-031", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 15.231, "mc": 12,
     "images": [img("haar", 31, 1), img("haar", 31, 2)],
     "desc": "18K gold geometric square-link necklace with diamond-shaped CZ pendant and matching earrings."},

    {"name": "Fan-Shape CZ Pendant Necklace Set",
     "sku": "HAR-032", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 13.809, "mc": 12,
     "images": [img("haar", 32, 1), img("haar", 32, 2)],
     "desc": "Elegant gold necklace with fan-shaped CZ pendant, repeating triangular stone motifs on chain and matching earrings."},

    {"name": "Butterfly Enamel Diamond Necklace Set",
     "sku": "HAR-033", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 9.874, "mc": 12,
     "images": [img("haar", 33, 1), img("haar", 33, 2)],
     "desc": "Gold butterfly pendant necklace with multicolor enamel butterfly centerpiece set with white stones and matching earrings."},

    {"name": "18K Geometric CZ Link Necklace",
     "sku": "SH525", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 2.769, "mc": 12,
     "images": [img("haar", 34, 1), img("haar", 34, 2)],
     "desc": "18K gold geometric link necklace with CZ-set rectangular pendant and matching drop earrings."},

    {"name": "Spiral-Ball Diamond Necklace Set",
     "sku": "HAR-035", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 21.568, "mc": 12,
     "images": [img("haar", 35, 1), img("haar", 35, 2)],
     "desc": "Gold spiral-and-ball design necklace set with diamond accents and matching drop earrings."},

    {"name": "Oval Diamond Pendant Necklace Set",
     "sku": "HAR-036", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 8.855, "mc": 12,
     "images": imgs("haar", 36, 1),
     "desc": "Gold oval link-chain necklace with a large oval diamond-style pendant and matching diamond drop earrings."},

    {"name": "18K Triangular Diamond Pendant Necklace",
     "sku": "IMCSHS1366-02", "cat": "haar-necklace-sets", "material": "diamond", "purity": "18K",
     "weight": 2.983, "mc": 12,
     "images": imgs("haar", 37, 1),
     "desc": "18K gold cable-link necklace with a geometric triangular diamond pendant and matching triangle earrings."},

    {"name": "18K Leaf-Motif Marquise Diamond Necklace",
     "sku": "IMCSHS1361-04", "cat": "haar-necklace-sets", "material": "diamond", "purity": "18K",
     "weight": 0.875, "mc": 12,
     "images": imgs("haar", 38, 1),
     "desc": "18K gold leaf-motif necklace with two-tone finish and a marquise diamond pendant, with small diamond stud earrings."},

    {"name": "Filigree Floral Pearl Necklace Set",
     "sku": "HAR-039", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 12.70, "mc": 12,
     "images": imgs("haar", 39, 1),
     "desc": "Gold filigree floral necklace with matching drop earrings, featuring a pearl accent on the pendant."},

    {"name": "Circular-Link Green Stone Necklace Set",
     "sku": "HAR-040", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 9.10, "mc": 12,
     "images": imgs("haar", 40, 1),
     "desc": "Gold circular-link necklace with green color stone accents and a heart-drop pendant, with matching earrings."},

    {"name": "18K Open-Triangle Diamond Necklace Set",
     "sku": "HAR-041", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 20.035, "mc": 12,
     "images": imgs("haar", 41, 1),
     "desc": "18K gold open-triangle-link necklace with diamond accents and matching diamond drop earrings."},

    {"name": "18K Blue Sapphire Diamond Necklace Set",
     "sku": "HAR-042", "cat": "haar-necklace-sets", "material": "diamond", "purity": "18K",
     "weight": 0, "mc": 12,
     "images": imgs("haar", 42, 1),
     "desc": "18K gold oval link-chain necklace with a large blue sapphire and diamond pendant, with matching blue sapphire and diamond earrings. Price may vary - contact us for quote."},

    {"name": "18K Floral Diamond Solitaire Necklace Set",
     "sku": "SH92527-04", "cat": "haar-necklace-sets", "material": "diamond", "purity": "18K",
     "weight": 3.531, "mc": 12,
     "images": imgs("haar", 43, 1),
     "desc": "18K gold floral-link necklace with a large emerald-cut diamond solitaire pendant and matching rectangular diamond earrings."},

    {"name": "18K Red Green Enamel Choker Necklace Set",
     "sku": "FC4193-018", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 7.44, "mc": 12,
     "images": imgs("haar", 44, 1),
     "desc": "18K gold choker necklace with red and green color stones set in a floral paisley design, with matching flower-shaped earrings."},

    {"name": "Fringe-Leaf Gold Choker Necklace Set",
     "sku": "HAR-045", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 12,
     "images": imgs("haar", 45, 1),
     "desc": "Gold choker necklace with fringe-style leaf and ball drops, with matching long tassel earrings. Price may vary - contact us for quote."},

    {"name": "18K Multicolor Enamel Floral Choker",
     "sku": "EC4417-018", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 5.574, "mc": 12,
     "images": imgs("haar", 46, 1),
     "desc": "18K gold wide choker necklace with multicolor enamel floral centerpiece and ruby/pearl drops, with matching round earrings."},

    {"name": "Filigree Red-Black Enamel Choker Necklace",
     "sku": "HAR-047", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 12,
     "images": imgs("haar", 47, 1),
     "desc": "Gold filigree choker necklace with a large red-and-black enamel floral centerpiece and diamond-accent pendant drop. Price may vary - contact us for quote."},

    {"name": "Red Green Meenakari Choker Necklace Set",
     "sku": "HAR-048", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 12,
     "images": imgs("haar", 48, 1),
     "desc": "Broad gold choker with red and green meenakari panels, pearl and ruby bead drops, arch-shaped ornate segments. Price may vary - contact us for quote."},

    {"name": "Aqua Mint Stone Haar Necklace Set",
     "sku": "HAR-049", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 20.672, "mc": 12,
     "images": imgs("haar", 49, 1),
     "desc": "Gold necklace and matching earring set with aqua/mint green cabochon stones set throughout. CZ/AD stone setting."},

    {"name": "18K Pink Rose Quartz Necklace Set",
     "sku": "FNNKSN71567WA", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 15.413, "mc": 12,
     "images": imgs("haar", 50, 1), "featured": True,
     "desc": "18K gold necklace with pink rose quartz and mint green stones in ornate filigree oval settings with CZ halo borders and gold chain drops. Matching oval drop earrings."},

    {"name": "Teal Cabochon Stone Haar Necklace Set",
     "sku": "HAR-051", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 27.543, "mc": 12,
     "images": imgs("haar", 51, 1),
     "desc": "Gold necklace and matching earring set featuring multiple aqua/teal round cabochon stones in CZ-halo settings on matte gold chain-link base."},

    {"name": "Floral Sunburst Ruby Center Haar Set",
     "sku": "HAR-052", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 12.053, "mc": 12,
     "images": imgs("haar", 52, 1),
     "desc": "Gold necklace and earring set. Necklace with geometric square open motifs and CZ-pave sections, central floral sunburst pendant with ruby center stone."},

    {"name": "CZ Floral Gold Necklace Set",
     "sku": "HAR-053", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 13.98, "mc": 12,
     "images": imgs("haar", 53, 1),
     "desc": "Gold necklace and earring set with floral motifs, pave white CZ clusters, and small colored stones."},

    {"name": "18K Three-Strand Pearl Choker Set",
     "sku": "FNMCKN81016WA", "cat": "haar-necklace-sets", "material": "gold", "purity": "18K",
     "weight": 14.816, "mc": 12,
     "images": imgs("haar", 54, 1),
     "desc": "18K gold three-strand pearl choker necklace with gold and CZ-studded central pendant featuring floral motif, green and ruby colored stones, and a teardrop ruby drop."},

    {"name": "Leaf Pendant Satellite Bead Necklace Set",
     "sku": "HAR-055", "cat": "haar-necklace-sets", "material": "gold", "purity": "22K",
     "weight": 5.669, "mc": 12,
     "images": [img("haar", 55, 1)],
     "desc": "Gold chain necklace with satellite bead accents and textured leaf pendant with CZ stone, displayed with matching leaf stud earrings."},

    # ════════════════════════════════════════════════════════════════
    # EARRINGS  (ERG-026 to ERG-085)
    # ════════════════════════════════════════════════════════════════
    {"name": "18K Flower CZ and Color Stone Earrings",
     "sku": "SHS2576-02", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 4.797, "mc": 15,
     "images": imgs("earrings", 26, 1),
     "desc": "18K gold flower earrings with CZ and color stones, perfect match to SHS2576-01 necklace."},

    {"name": "Chandbali Red Enamel Long Drop Earrings",
     "sku": "ERG-027", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 27, 1),
     "desc": "Gold chandbali-style dangling earrings with red enamel accents and multi-tier jhumka drops."},

    {"name": "Geometric Filigree Long Drop Earrings",
     "sku": "ERG-028", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 28, 1),
     "desc": "Long three-tier gold drop earrings with geometric trapezoid and heart-shaped panels, intricate filigree work and tassel ends."},

    {"name": "Crescent Chandbali with Gold Bead Tassels",
     "sku": "ERG-029", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 29, 1),
     "desc": "Long gold chandbali drop earrings with crescent moon body, floral top stud, dangling chain and gold bead tassels."},

    {"name": "Kite-Top Floral Chandbali Earrings",
     "sku": "ERG-030", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 30, 1),
     "desc": "Gold chandbali earrings with floral-engraved crescent body, kite-shaped top stud, gold ball and tassel drops."},

    {"name": "Pentagon Mesh Gold Jhumka Earrings",
     "sku": "ERG-031", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 31, 1),
     "desc": "Gold jhumka earrings with pentagonal mesh-patterned body, round stud top with floral motif and chain-tassel drop."},

    {"name": "Dome Bell Jhumka with Floral Cluster Top",
     "sku": "ERG-032", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 32, 1),
     "desc": "Gold jhumka earrings with large dome bell, ornate top piece featuring clustered floral motifs and gold bead chain tassels."},

    {"name": "Peacock Black Enamel Chandbali Earrings",
     "sku": "ERG-033", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 33, 1),
     "desc": "Gold peacock-motif chandbali earrings with black enamel peacock top stud, open crescent body with engraving and pointed gold drop tassels."},

    {"name": "Triple-Tier Peacock Jhumka with Meenakari",
     "sku": "ERG-034", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 34, 1),
     "desc": "Long triple-tier gold jhumka earrings with peacock top featuring green and maroon enamel, cascading three jhumka bells with gold bead drops."},

    {"name": "Crescent Floral Star Chandbali Earrings",
     "sku": "ERG-035", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 35, 1),
     "desc": "Gold chandbali earrings with large crescent moon body, floral star-shaped top stud, hanging chain with flat charms and small jhumka tassel."},

    {"name": "Heart-Top Chandbali with Scalloped Body",
     "sku": "ERG-036", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 36, 1),
     "desc": "Gold chandbali drop earrings with heart-shaped top stud, scalloped crescent body with dot engraving and jhumka bell with chain tassels."},

    {"name": "Peacock Meenakari Bird Motif Chandbali",
     "sku": "ERG-037", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 37, 1),
     "desc": "Gold chandbali earrings with peacock top in black and maroon enamel, circular crescent body with bird motif and small gold charm drops."},

    {"name": "Peacock Jhumka with Maroon Enamel",
     "sku": "ERG-038", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 38, 1),
     "desc": "Gold jhumka earrings with peacock top stud featuring maroon enamel, large dome jhumka bell with gold bead fringe and maroon stone drops."},

    {"name": "Peacock Filigree Lace Chandbali",
     "sku": "ERG-039", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 39, 1),
     "desc": "Gold chandbali earrings with peacock-profile top stud, filigree lace-pattern crescent body, small jhumka and geometric charm pendants."},

    {"name": "Triple Jhumka Blue Peacock Meenakari",
     "sku": "ERG-040", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 40, 1),
     "desc": "Long cascading triple-tier gold jhumka earrings with peacock top featuring blue enamel, three stacked jhumka bells with gold ball tassels."},

    {"name": "Multicolor Meenakari Peacock Chandbali",
     "sku": "ERG-041", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 41, 1),
     "desc": "Gold chandbali earrings with multicolor meenakari peacock body in green, maroon and blue enamel, kite top stud and jhumka tassel drop."},

    {"name": "Turtle-Shield Jhumka with Maroon Enamel",
     "sku": "ERG-042", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 42, 1),
     "desc": "Gold jhumka earrings with two-tier design, turtle-shield top stud with maroon enamel, dome jhumka bell with bead fringe and maroon stone drops."},

    {"name": "Teardrop Floral Multi-Tassel Drop Earrings",
     "sku": "ERG-043", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 43, 1),
     "desc": "Gold drop earrings with teardrop top stud, beaded chain shoulder connecting to teardrop pendant with floral motif and multiple drop tassels."},

    {"name": "Scalloped Fan Chandbali Earrings",
     "sku": "ERG-044", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 44, 1),
     "desc": "Gold chandbali earrings with round floral top stud, broad scalloped fan-shaped crescent body and small jhumka with tassel drops."},

    {"name": "Three-Panel Peacock Cascading Earrings",
     "sku": "ERG-045", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 45, 1),
     "desc": "Long three-panel gold drop earrings with peacock top, two chandbali disc panels and tassel drop in cascading design."},

    {"name": "Square-Cluster Dome Jhumka Earrings",
     "sku": "ERG-046", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 46, 1),
     "desc": "Gold jhumka earrings with decorative square-cluster top stud, dome bell body and chain tassel drop."},

    {"name": "Broad Fan Chandbali with Bead Fringe",
     "sku": "ERG-047", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 47, 1),
     "desc": "Gold chandbali earrings with broad fan-shaped crescent body, round top stud and ball bead fringe with pointed drop tassels."},

    {"name": "Paisley Peacock Meenakari Jhumka Earrings",
     "sku": "ERG-048", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 48, 1),
     "desc": "Long gold earrings with large paisley-top stud, peacock meenakari body in green and maroon enamel, multiple jhumka and bead chain drops."},

    {"name": "Open Circular Peacock Jhumka Earrings",
     "sku": "ERG-049", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 49, 1),
     "desc": "Long gold earrings with peacock meenakari top, open circular frame with peacock motif in green enamel, butterfly connector and jhumka drops with maroon stones."},

    {"name": "Scroll Chandbali with Spike Tassels",
     "sku": "ERG-050", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 50, 1),
     "desc": "Gold chandbali earrings with scroll-design top stud, bold crescent body with striped engraving and pointed spike drop tassels."},

    {"name": "Lotus Fan Chandbali Earrings",
     "sku": "ERG-051", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 51, 1),
     "desc": "Gold chandbali earrings with round top stud, open fan-shaped crescent body with lotus petal motif and bead fringe with pointed drop tassels."},

    {"name": "Meenakari Jhumka Choker Set Earrings",
     "sku": "ERG-052", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 52, 1),
     "desc": "Gold jhumka earrings with red and green meenakari work, part of the meenakari choker necklace set."},

    {"name": "Crescent Black Meenakari Chandbali Earrings",
     "sku": "ERG-053", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 53, 1),
     "desc": "Gold chandbali-style drop earrings with crescent moon body, floral motifs, dangling chains and gold balls, black meenakari accents on stud top."},

    {"name": "Long Filigree Shield Drop Earrings with Red Stone",
     "sku": "ERG-054", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 54, 1),
     "desc": "Long gold drop earrings with filigree shield-shaped top, triple jhumka cascade with small red color stone accents and dangling chains."},

    {"name": "Triple Jhumka Black Peacock Earrings",
     "sku": "ERG-055", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 55, 1),
     "desc": "Gold triple-jhumka long drop earrings with black meenakari peacock motif on stud, three stacked dome jhumkas graduating in size."},

    {"name": "Chandbali Crescent with Red Stone Filigree",
     "sku": "ERG-056", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 56, 1),
     "desc": "Gold chandbali drop earrings with crescent moon body, intricate filigree work, small red color stones inset, dangling chain tassel."},

    {"name": "Peacock Heart Blue Enamel Drop Earrings",
     "sku": "ERG-057", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 57, 1),
     "desc": "Long gold earrings with peacock motif featuring green and blue enamel, heart-shaped body, butterfly charm, bottom jhumka with red stone drop."},

    {"name": "Triple-Jhumka Circular Top Red Stone Earrings",
     "sku": "ERG-058", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 58, 1),
     "desc": "Gold triple-jhumka cascade earrings with circular floral top stud, three stacked dome jhumkas with gold bead detailing, small red color stone drops at base."},

    {"name": "18K Geometric Drop Chain Earrings",
     "sku": "MPD118-09", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.05, "mc": 15,
     "images": imgs("earrings", 59, 1),
     "desc": "18K gold drop earrings with square geometric stud top featuring a small diamond-shape CZ accent, long thin chain drops ending in a small gold bead."},

    {"name": "18K Filigree Chandelier Heart Drop Earrings",
     "sku": "TR2971-02", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 3.89, "mc": 15,
     "images": imgs("earrings", 60, 1),
     "desc": "18K gold chandelier earrings with large filigree floral/flower centre piece, three dangling heart-shaped drops, and a round mesh stud backing."},

    {"name": "18K Open Heart Chain Drop Earrings",
     "sku": "MPD119-09", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 1.82, "mc": 15,
     "images": imgs("earrings", 61, 1),
     "desc": "18K gold drop earrings with open heart-shaped top stud, small CZ butterfly accent, and long thin chain drop ending in a small gold bead."},

    {"name": "18K Granulated Cluster Jhumka Earrings",
     "sku": "HMJ1128-03", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.88, "mc": 15,
     "images": imgs("earrings", 62, 1),
     "desc": "18K gold jhumka earrings with a round granulated beaded cluster stud top and a small dome jhumka drop with a tiny gold bead at the bottom."},

    {"name": "18K Peacock Teal Stone Chain Drop Earrings",
     "sku": "MPD119-01", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.60, "mc": 15,
     "images": imgs("earrings", 63, 1),
     "desc": "18K gold drop earrings with peacock/bird motif stud top accented with teal/blue enamel or color stone, and long chain drops ending in small gold balls."},

    {"name": "18K Black Enamel Jhumka Drop Earrings",
     "sku": "HMJ1057-01", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.50, "mc": 15,
     "images": imgs("earrings", 64, 1),
     "desc": "18K gold jhumka earrings with black enamel disc top and floral gold jhumka drop with small ball at bottom."},

    {"name": "18K Geometric Hexagonal Drop Earrings",
     "sku": "TR2946-01", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.37, "mc": 15,
     "images": imgs("earrings", 65, 1),
     "desc": "18K gold geometric drop earrings with black enamel disc top, hexagonal lattice top element, diamond-shaped and drop components in two-tone gold."},

    {"name": "18K Filigree Floral Dual-Leaf Chandelier Earrings",
     "sku": "TR2961-04", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 3.17, "mc": 15,
     "images": imgs("earrings", 66, 1),
     "desc": "18K gold filigree chandelier earrings with black enamel disc top, floral filigree center, and dual leaf drop dangles in two-tone gold."},

    {"name": "Large Filigree Three-Tier Chandbali Earrings",
     "sku": "ERG-067", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 6.87, "mc": 15,
     "images": imgs("earrings", 67, 1),
     "desc": "Large chandelier filigree earrings with black enamel disc top, three-tier cascading filigree layers in two-tone yellow and white gold finish, multiple drop dangles."},

    {"name": "18K Three-Disc Chandelier Drop Earrings",
     "sku": "TR2946-17", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 4.06, "mc": 15,
     "images": imgs("earrings", 68, 1),
     "desc": "18K gold large chandelier earrings with black enamel disc top, three stacked circular filigree discs and elongated two-tone drop dangles."},

    {"name": "18K Filigree Flower Disc Heart Drop Earrings",
     "sku": "TR2961-02", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.34, "mc": 15,
     "images": imgs("earrings", 69, 1),
     "desc": "18K gold drop earrings with black enamel disc top, large filigree flower disc center, and small heart-shaped gold drop at bottom."},

    {"name": "18K Trapezoid Filigree Long Drop Earrings",
     "sku": "TR2946-14", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 3.95, "mc": 15,
     "images": imgs("earrings", 70, 1),
     "desc": "18K gold large drop earrings with black enamel disc top, trapezoid filigree body with Greek key accent, circular filigree discs below, and two-tone torpedo drops."},

    {"name": "18K Blue Enamel Tassel Chain Drop Earrings",
     "sku": "MPD118-02", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.73, "mc": 15,
     "images": imgs("earrings", 71, 1),
     "desc": "18K gold long tassel chain drop earrings with black enamel disc top and turquoise/blue enamel floral element at stud, dual chain drops."},

    {"name": "18K Leaf Top Box-Chain Tassel Earrings",
     "sku": "MPD125-02", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 1.96, "mc": 15,
     "images": imgs("earrings", 72, 1),
     "desc": "18K gold plain tassel drop earrings with curved leaf-shaped gold top stud and two box-chain drops ending in small balls."},

    {"name": "18K Chevron Leaf Top Chain Tassel Earrings",
     "sku": "MPD124-06", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.44, "mc": 15,
     "images": imgs("earrings", 73, 1),
     "desc": "18K gold tassel drop earrings with chevron/leaf motif gold stud top and long box-chain drops with small ball terminals."},

    {"name": "18K Floral Stud Dome Jhumka Bell Earrings",
     "sku": "HMJ1126-11", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.53, "mc": 15,
     "images": imgs("earrings", 74, 1),
     "desc": "18K gold jhumka earrings with black enamel disc top, floral gold stud element, and textured dome jhumka bell drop."},

    {"name": "18K Triple-Tier Cascading Jhumka Earrings",
     "sku": "HMN1864-06", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 3.60, "mc": 15,
     "images": imgs("earrings", 75, 1),
     "desc": "18K gold triple-tier jhumka earrings with black enamel disc top, sunburst filigree stud, and three cascading jhumka bells of descending size ending in small ball drops."},

    {"name": "18K Leaf Tassel Two-Drop Chain Earrings",
     "sku": "MPD123-01", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.05, "mc": 15,
     "images": imgs("earrings", 76, 1),
     "desc": "18K gold drop earrings with leaf-shaped top and long box-chain tassel drops ending in gold balls."},

    {"name": "18K Beaded Rectangle Double-Tier Jhumka",
     "sku": "HMJ1127-02", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.63, "mc": 15,
     "images": imgs("earrings", 77, 1),
     "desc": "18K gold jhumka earrings with beaded rectangular top and double-tier umbrella jhumka pendant with gold ball drop."},

    {"name": "CZ Crescent Tassel Drop Earrings",
     "sku": "ERG-078", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 78, 1),
     "desc": "Geometric stud top earrings with CZ-encrusted crescent moon and tassel chain drops. Matches the geometric spike crescent necklace set."},

    {"name": "18K Round Floral Loop Drop Earrings",
     "sku": "MPD129-03", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.33, "mc": 15,
     "images": imgs("earrings", 79, 1),
     "desc": "18K gold drop earrings with round floral stamped top, two-tone loop accent, and long box-chain tassel ending in two gold balls."},

    {"name": "Butterfly Lattice Stud Long Drop Earrings",
     "sku": "ERG-080", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 80, 1),
     "desc": "Gold stud earrings with butterfly/floral lattice casting top and long box-chain drop ending in small gold ball."},

    {"name": "18K Fan-Top Color Stone Chain Drop Earrings",
     "sku": "MPD127-0", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.05, "mc": 15,
     "images": imgs("earrings", 81, 1),
     "desc": "18K gold drop earrings with fan-shaped open-cut top, single center stone, and triple-chain tassel drops."},

    {"name": "Leaf CZ Stud Earrings",
     "sku": "ERG-082", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 82, 1),
     "desc": "Matching leaf-shaped stud earrings with CZ accent. Perfect complement to the leaf pendant necklace."},

    {"name": "18K Beaded Rectangle Single-Tier Jhumka",
     "sku": "HMJ1127-11", "cat": "earrings", "material": "gold", "purity": "18K",
     "weight": 2.37, "mc": 15,
     "images": imgs("earrings", 83, 1),
     "desc": "18K gold jhumka earrings with beaded rectangular top and single-tier umbrella jhumka with gold ball drop."},

    {"name": "Triangle Hexagon CZ Set Drop Earrings",
     "sku": "ERG-084", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 84, 1),
     "desc": "Hexagon stud top earrings with triangular CZ pendant drop. Matches the geometric triangle hexagon necklace set."},

    {"name": "Fan Chandelier CZ Set Drop Earrings",
     "sku": "ERG-085", "cat": "earrings", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 15,
     "images": imgs("earrings", 85, 1),
     "desc": "Fan/chandelier style CZ drop earrings. Matches the fan-shape CZ pendant necklace set."},

    # ════════════════════════════════════════════════════════════════
    # RINGS  (RNG-R02 to RNG-R63)
    # ════════════════════════════════════════════════════════════════
    {"name": "18K Gents Starburst Signet Ring",
     "sku": "PRN1209-01-20", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 2.26, "mc": 16,
     "images": imgs("rings", 2, 1),
     "desc": "Gents 18K gold signet ring with rectangular face and starburst engraved design. Size 20."},

    {"name": "18K Gents Diamond Hexagonal Black Rhodium Ring",
     "sku": "SRN1959-26-18", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 1.834, "mc": 16,
     "images": imgs("rings", 3, 1),
     "desc": "Gents 18K gold solitaire ring with single round diamond in hexagonal black rhodium setting. Size 18."},

    {"name": "18K Gents Heavy Princess-Cut Diamond Ring",
     "sku": "SRN2056-18-20", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 6.145, "mc": 16,
     "images": imgs("rings", 4, 1),
     "desc": "Heavy gents 18K gold ring with princess-cut diamond centre stone and textured white gold band. Size 20."},

    {"name": "18K Gents Square Diamond Cluster Ring",
     "sku": "SRN2026-02-18", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 3.153, "mc": 16,
     "images": imgs("rings", 5, 1),
     "desc": "Gents 18K gold ring with diamond cluster in square setting and textured gold shoulders. Size 18."},

    {"name": "18K Gents Large Round Diamond Solitaire Ring",
     "sku": "SRN1963-28-23", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.353, "mc": 16,
     "images": imgs("rings", 6, 1),
     "desc": "Gents 18K gold solitaire ring with large round diamond in prong setting on plain band. Size 23."},

    {"name": "18K Gents Diamond Solitaire Ring (HUID: G5PUWA)",
     "sku": "FNCPGR71073A", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.814, "mc": 16,
     "images": [img("rings", 7, 1), img("rings", 7, 2)],
     "desc": "18K gold gents ring with bold solitaire brilliant-cut diamond center in bezel setting, flanked by channel-set diamond rows on white gold band. Size 13."},

    {"name": "18K Gents Hammered-Band Diamond Solitaire Ring",
     "sku": "ELGR70071A", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 3.09, "mc": 16,
     "images": [img("rings", 8, 1), img("rings", 8, 2)],
     "desc": "18K gold gents solitaire ring with large brilliant-cut diamond in open bezel/tension-style white gold setting on broad yellow gold band with hammered texture. Size 20."},

    {"name": "18K Ladies Bypass Diamond Solitaire Ring",
     "sku": "FNCPGR71020WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.724, "mc": 16,
     "images": [img("rings", 9, 1), img("rings", 9, 2)],
     "desc": "18K gold ladies bypass/crossover diamond ring with solitaire brilliant center on white gold head, pave diamond-set white gold band crossing over yellow gold shank. Size 20."},

    {"name": "18K Ladies Pave Shoulder Diamond Ring",
     "sku": "FNCPGR71054WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.847, "mc": 16,
     "images": [img("rings", 10, 1), img("rings", 10, 2)],
     "desc": "18K gold ladies ring with large brilliant solitaire center in prong setting, flanked by pave diamond-set shoulders on yellow and white gold band. Size 21."},

    {"name": "18K Gents Heavy Square-Bezel Diamond Ring",
     "sku": "FNCPGR71009A", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 3.143, "mc": 16,
     "images": [img("rings", 11, 1), img("rings", 11, 2)],
     "desc": "18K gold heavy gents ring with large brilliant-cut solitaire diamond in square white gold bezel, textured yellow gold wide shank. Size 25."},

    {"name": "18K Ladies Emerald Ruby Diamond Cocktail Ring",
     "sku": "FNCR71283WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.475, "mc": 16,
     "images": imgs("rings", 12, 1),
     "desc": "18K gold ladies cocktail ring with square emerald center stone, ruby accents, outer halo of brilliant-cut diamonds on white gold frame. Size 6."},

    {"name": "18K Ladies Emerald Ruby Elaborate Diamond Ring",
     "sku": "FNCR71125WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.541, "mc": 16,
     "images": imgs("rings", 13, 1),
     "desc": "18K gold ladies elaborate cocktail ring with square green emerald center in pave diamond halo, three large pear-shaped ruby stones in claw prong setting. Floral and scroll motifs. Size 17."},

    {"name": "18K Ladies Purple Stone Dome Diamond Ring",
     "sku": "FNCR71227WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.447, "mc": 16,
     "images": imgs("rings", 14, 1),
     "desc": "18K gold ladies floral cocktail ring with dome-shaped pave diamond center cluster, surrounded by purple color stones in scalloped petal border. Size 13."},

    {"name": "18K Ladies Sunflower Emerald Diamond Ring",
     "sku": "FNCR71261WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.945, "mc": 16,
     "images": imgs("rings", 15, 1),
     "desc": "18K gold ladies sunflower-style ring with oval green emerald center, pave diamond inner halo, diamond cluster petal surrounds with gold leaf accents. Size 14."},

    {"name": "18K Ladies Cushion Ruby Diamond Halo Ring",
     "sku": "FNCR71284WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.464, "mc": 16,
     "images": imgs("rings", 16, 1),
     "desc": "18K gold ladies cocktail ring with large cushion-cut ruby center stone in yellow gold prong mount, surrounded by brilliant-cut diamond halo. Size 16."},

    {"name": "18K Gents Diamond Square Pave Ring",
     "sku": "GBN2007-25", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 0, "mc": 16,
     "images": imgs("rings", 17, 1),
     "desc": "Gents gold ring with wide square face, black enamel triangular inlay accents and central princess-cut diamond or large white CZ stone in square pave halo."},

    {"name": "18K Gents CZ Cushion Rectangular Ring",
     "sku": "MO8RN022", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 8.252, "mc": 16,
     "images": imgs("rings", 18, 1),
     "desc": "Gents 18K gold ring with cushion-cut large white CZ solitaire in pave-bordered rectangular setting, CZ-set shoulders. Size 11."},

    {"name": "18K Gents Red Stone Rectangular Ring",
     "sku": "SRN2033-28", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 6.848, "mc": 16,
     "images": imgs("rings", 19, 1),
     "desc": "Gents 18K gold ring with wide rectangular face bearing a star/sun motif on brushed gold, red stone accents on side shoulders, and pave CZ borders. Size 21."},

    {"name": "18K Gents Oval C-Shape CZ Ring",
     "sku": "SRN1909", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 6.576, "mc": 16,
     "images": imgs("rings", 20, 1),
     "desc": "Gents 18K gold ring with oval C-shaped open face with large cushion-cut white CZ centre, pave CZ border and shoulders. Size 14."},

    {"name": "18K Gents Black Enamel Greek Key Ring",
     "sku": "SRN2040", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 4.526, "mc": 16,
     "images": imgs("rings", 21, 1),
     "desc": "Gents 18K gold ring with rectangular face, black enamel Greek key/meander pattern inlay border, pave CZ accents. Size 10."},

    {"name": "18K Gents Triple Baguette CZ Ring",
     "sku": "SRN2050", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 5.145, "mc": 16,
     "images": imgs("rings", 22, 1),
     "desc": "Gents 18K gold ring with wide rectangular face featuring three horizontal baguette-style white CZ rows on textured gold body. Size 18."},

    {"name": "18K Gents Red Stone Black Enamel Corner Ring",
     "sku": "SRN1691", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 7.916, "mc": 16,
     "images": imgs("rings", 23, 1),
     "desc": "Gents 18K gold ring with wide square face with large red square-cut CZ centre, black enamel L-shaped inlays, pave CZ border. Size 13."},

    {"name": "18K Gents Champagne CZ Black Enamel Ring",
     "sku": "SRN1691-13-22", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 0, "mc": 16,
     "images": imgs("rings", 24, 1),
     "desc": "Gents 18K gold ring with wide square face, large champagne/white square CZ centre stone, black enamel L-shaped corner inlays, pave CZ border."},

    {"name": "18K Gents Emerald-Cut Two-Tone Frame Ring",
     "sku": "SRN1074", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 6.362, "mc": 16,
     "images": imgs("rings", 25, 1),
     "desc": "Gents 18K gold ring with wide rectangular face featuring a large emerald-cut white CZ solitaire, two-tone yellow and white gold textured frame border. Size 19."},

    {"name": "18K Gents 3D Lion Face Ring",
     "sku": "SRN2013", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 6.147, "mc": 16,
     "images": imgs("rings", 26, 1),
     "desc": "Gents 18K gold lion-face ring with square face and 3D lion head centre, pave CZ rows on both shoulders flanking the lion. Size 22."},

    {"name": "18K Gents Shield Lion Head Ring",
     "sku": "SRN1069", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 5.301, "mc": 16,
     "images": imgs("rings", 27, 1),
     "desc": "Gents 18K gold ring with shield-shaped face featuring an intricate 3D lion head motif, horizontal pave CZ striped rows on both shoulders."},

    {"name": "18K Gents Starburst Sun Ray Plain Ring",
     "sku": "PRN1210", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 4.19, "mc": 16,
     "images": imgs("rings", 28, 1),
     "desc": "Gents plain 18K gold ring with wide band and starburst/sun ray engraved face, two-tone centre accent. Size 21."},

    {"name": "18K Gents Belt-Buckle Engraved Two-Tone Ring",
     "sku": "PRN1149", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 4.33, "mc": 16,
     "images": imgs("rings", 29, 1),
     "desc": "Gents 18K gold plain ring with wide rectangular engraved face in belt-buckle style design, two-tone yellow and white gold detailing. Size 20."},

    {"name": "18K Gents Pave CZ Face Yellow-White Ring",
     "sku": "SRN1041", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 3.838, "mc": 16,
     "images": [img("rings", 30, 1), img("rings", 30, 2)],
     "desc": "Gents 18K gold ring with wide square pave CZ face with two-tone yellow/white gold border."},

    {"name": "18K Gents Pave CZ Black Stripe Ring",
     "sku": "SRN1900", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 4.825, "mc": 16,
     "images": [img("rings", 31, 1), img("rings", 31, 2)],
     "desc": "Gents 18K gold ring with wide rectangular face fully set with pave CZ stones in a grid pattern, black enamel horizontal stripe accents on the body."},

    {"name": "18K Gents Tapering Pave CZ Ring",
     "sku": "SRN1869", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 5.139, "mc": 16,
     "images": [img("rings", 32, 1), img("rings", 32, 2)],
     "desc": "Gents 18K gold ring with wide tapering band and a full rectangular pave CZ face, plain polished gold shoulders. Size 8."},

    {"name": "18K Ladies Ruby Emerald Diamond Floral Cocktail Ring",
     "sku": "UK1710-05-13", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 6.144, "mc": 16,
     "images": imgs("rings", 33, 1),
     "desc": "18K gold large floral cocktail ring with ruby and emerald color stones in petal arrangement and single diamond/white stone center. Size 13."},

    {"name": "18K Ladies Swirl Leaf Spiral CZ Ring",
     "sku": "FNLR71528WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 1.656, "mc": 16,
     "images": imgs("rings", 34, 1),
     "desc": "18K gold ring with swirling leaf and spiral motif, CZ stones pave-set in the spiral curl. HUID: YAPALS."},

    {"name": "18K Ladies Marquise Filigree Blue Stone Ring",
     "sku": "FNLR82150G", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 1.590, "mc": 16,
     "images": imgs("rings", 35, 1),
     "desc": "18K gold wide marquise-shaped ring with filigree scroll pattern, CZ halo border, and pear-shaped blue color stone accent. HUID: 2IMX7F."},

    {"name": "18K Ladies Double Halo Blue Center Diamond Ring",
     "sku": "FNLR71618G", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.385, "mc": 16,
     "images": imgs("rings", 36, 1),
     "desc": "18K gold double-halo ring with large princess/emerald-cut blue center stone surrounded by two rows of CZ/diamond pave. HUID: 4549TN."},

    {"name": "18K Ladies Crown Tiara Blue Stone Ring",
     "sku": "FNLR76759WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 1.652, "mc": 16,
     "images": imgs("rings", 37, 1),
     "desc": "18K gold crown/tiara-shaped ring with CZ stones and small turquoise/blue pear-shaped center stone. HUID: JBN8FQ."},

    {"name": "18K Ladies Rectangular Lattice CZ Cluster Ring",
     "sku": "FNLR71162WA", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 1.863, "mc": 16,
     "images": imgs("rings", 38, 1),
     "desc": "18K gold rectangular lattice-pattern ring with floral CZ center cluster and CZ border. HUID: HB6XIH."},

    {"name": "18K Honeycomb Chevron Band Ring",
     "sku": "MMG563-25-8", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 2.48, "mc": 16,
     "images": imgs("rings", 39, 1),
     "desc": "18K gold plain textured band ring with honeycomb/chevron engraved pattern throughout. Unisex design. Size 8."},

    {"name": "18K Two-Tone Open Filigree Floral Ring",
     "sku": "TR2858-16-14", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.27, "mc": 16,
     "images": imgs("rings", 40, 1),
     "desc": "18K gold two-tone open filigree floral cocktail ring with white gold overlay lattice. Size 14."},

    {"name": "18K Marquise Frame Single Stone Ring",
     "sku": "PRN1191-22-10", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.16, "mc": 16,
     "images": imgs("rings", 41, 1),
     "desc": "18K gold marquise/eye-shaped open frame ring with single small solitaire stone at center. Size 10."},

    {"name": "18K Petal Motif Gold Ring",
     "sku": "PRN1199-02-11", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.15, "mc": 16,
     "images": [img("rings", 42, 1), img("rings", 42, 2)],
     "desc": "18K gold plain leaf/petal motif ring with layered petal design in solid polished gold. Size 11."},

    {"name": "18K Floral Spray Gold Ring",
     "sku": "PRN1190-40-15", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.22, "mc": 16,
     "images": imgs("rings", 43, 1),
     "desc": "18K gold ladies ring with floral spray design featuring multiple small gold flower motifs and curved branches. Size 15."},

    {"name": "18K Wide Marquise Filigree Cutwork Ring",
     "sku": "PRN1191-16-15", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.23, "mc": 16,
     "images": imgs("rings", 44, 1),
     "desc": "18K gold ladies ring with wide marquise-shaped filigree top featuring floral cutwork design in yellow gold. Size 15."},

    {"name": "18K Mickey Mouse Motif Gold Ring",
     "sku": "PRN1189-12-12", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 0.96, "mc": 16,
     "images": imgs("rings", 45, 1),
     "desc": "18K gold ladies ring with Mickey Mouse style motif, circular textured center with small flanking spheres. Fun everyday ring. Size 12."},

    {"name": "18K Gents Hexagonal Marquise Diamond Ring",
     "sku": "SRN2049-05-18", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.944, "mc": 16,
     "images": imgs("rings", 46, 1),
     "desc": "18K gold gents ring with large hexagonal frame, marquise diamond center stone surrounded by round diamond halo. Size 18."},

    {"name": "18K Ladies Two-Tone Bypass Diamond Cluster Ring",
     "sku": "SRN2042-18-14", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.943, "mc": 16,
     "images": imgs("rings", 47, 1),
     "desc": "18K two-tone gold ladies bypass ring with diamond-pave band, gold mesh cylindrical motif and tri-petal diamond cluster at top. Size 14."},

    {"name": "18K Ladies Ruby Double Halo Diamond Ring",
     "sku": "SRN2058-02-12", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.836, "mc": 16,
     "images": imgs("rings", 48, 1),
     "desc": "18K two-tone gold ladies ring with round ruby center stone in prong setting, surrounded by double square halo of round diamonds, diamond-pave shoulders. Size 12."},

    {"name": "18K Ladies Arch Oval Diamond Halo Ring",
     "sku": "SRN2033-21-9", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 3.099, "mc": 16,
     "images": imgs("rings", 49, 1),
     "desc": "18K yellow gold ladies ring with tiered arch design, oval diamond center stone in diamond halo, round diamonds on inner arch. Size 9."},

    {"name": "18K Tri-Color Heart Motif Band Ring",
     "sku": "PRN1193-02-17", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.14, "mc": 16,
     "images": imgs("rings", 50, 1),
     "desc": "18K tri-color gold ladies ring with wide band featuring three textured heart motifs in yellow, white and rose gold. Size 17."},

    {"name": "18K Two-Tone Knotted Circle Ring",
     "sku": "PRN1191-17-17", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.02, "mc": 16,
     "images": imgs("rings", 51, 1),
     "desc": "18K two-tone gold ladies ring with circular knotted motif and leaf accent in yellow and white gold. Size 17."},

    {"name": "18K Two-Tone Oval Infinity Ring",
     "sku": "PRN1191-35-9", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.31, "mc": 16,
     "images": imgs("rings", 52, 1),
     "desc": "18K two-tone gold ladies ring with oval double-circle infinity motif in yellow and white gold with textured finish. Size 9."},

    {"name": "18K Ladies Princess-Cut Diamond Ornate Ring",
     "sku": "SRN2025-09-12", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 4.121, "mc": 16,
     "images": imgs("rings", 53, 1),
     "desc": "18K two-tone gold ladies cocktail ring with large square floral motif, princess cut diamond center, surrounded by multiple round diamonds in ornate open-work frame. Size 12."},

    {"name": "18K Ladies Emerald Star Diamond Ring",
     "sku": "SRN2041-01-10", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 4.962, "mc": 16,
     "images": imgs("rings", 54, 1),
     "desc": "18K two-tone gold ladies cocktail ring with large star/snowflake design, emerald center stone in hexagonal setting surrounded by diamond halo, outer border of round diamonds. Size 10."},

    {"name": "18K Ladies Pink Ruby Scrollwork Diamond Ring",
     "sku": "SFS698-03-9", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.959, "mc": 16,
     "images": imgs("rings", 55, 1),
     "desc": "18K yellow gold ladies ring with rectangular pink ruby/color stone center, flanked by scrollwork diamond-set design with marquise and round diamonds. Size 9."},

    {"name": "18K Triple Open Star Motif Ring",
     "sku": "PRN1191-49-15", "cat": "rings", "material": "gold", "purity": "18K",
     "weight": 1.23, "mc": 16,
     "images": imgs("rings", 56, 1),
     "desc": "18K yellow gold ladies ring with three open star motifs of varying sizes on the top. Size 15."},

    {"name": "18K Ladies Abstract Om Pink Ruby Diamond Ring",
     "sku": "SRN2018-02-14", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.63, "mc": 16,
     "images": imgs("rings", 57, 1),
     "desc": "18K two-tone gold ladies ring with abstract script/Om motif, round pink rubies and round diamonds in pave setting. Size 14."},

    {"name": "18K Ladies Infinity Leaf Diamond Ring",
     "sku": "SRN2033-26-10", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.432, "mc": 16,
     "images": imgs("rings", 58, 1),
     "desc": "18K two-tone gold ladies ring with infinity symbol motif, leaf accent and diamond pave detailing along band. Size 10."},

    {"name": "18K Ladies Pear Emerald Starburst Diamond Ring",
     "sku": "SFS689-06-16", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.399, "mc": 16,
     "images": imgs("rings", 59, 1),
     "desc": "18K yellow gold ladies ring with pear-shaped emerald/green stone center in starburst setting with round and marquise diamonds. Size 16."},

    {"name": "18K Ladies Peacock Fan Diamond Ring",
     "sku": "SFS683-03-14", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 3.163, "mc": 16,
     "images": imgs("rings", 60, 1),
     "desc": "18K two-tone gold ladies cocktail ring with peacock fan design featuring pear and round-cut diamonds in elaborate open-work arrangement. Size 14."},

    {"name": "18K Ladies Blue Topaz Halo Diamond Ring",
     "sku": "SRN2051-02-12", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.777, "mc": 16,
     "images": imgs("rings", 61, 1),
     "desc": "18K two-tone gold ladies open-frame ring with pear-shaped blue topaz center stone in halo setting, diamond pave on outer arch. Size 12."},

    {"name": "18K Ladies Butterfly Blue Stone Diamond Ring",
     "sku": "SRN2016-25-17", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.748, "mc": 16,
     "images": imgs("rings", 62, 1),
     "desc": "18K yellow gold ladies butterfly ring with round blue stone center, diamond pave on one wing and open gold work on other wing. Size 17."},

    {"name": "18K Ladies Chevron Diamond Leaf Cluster Ring",
     "sku": "SRN2026-21-10", "cat": "rings", "material": "diamond", "purity": "18K",
     "weight": 2.01, "mc": 16,
     "images": imgs("rings", 63, 1),
     "desc": "18K two-tone gold ladies ring with three leaf/petal shaped clusters of round diamonds in graduating chevron arrangement. Size 10."},

    # ════════════════════════════════════════════════════════════════
    # MANGALSUTRA  (MGS-014 to MGS-016)
    # ════════════════════════════════════════════════════════════════
    {"name": "18K CZ Red Stone Floral Mangalsutra",
     "sku": "MGS-014", "cat": "mangalsutra", "material": "gold", "purity": "18K",
     "weight": 9.809, "mc": 10,
     "images": imgs("mangalsutra", 14, 1),
     "desc": "18K gold double-strand black bead mangalsutra with CZ and red color stone floral pendant."},

    {"name": "18K Diamond Crescent Pendant Mangalsutra",
     "sku": "ITP0616", "cat": "mangalsutra", "material": "diamond", "purity": "18K",
     "weight": 4.345, "mc": 10,
     "images": imgs("mangalsutra", 15, 1),
     "desc": "18K gold double-strand black bead mangalsutra with a large diamond-studded crescent-shaped pendant."},

    {"name": "18K Diamond Fan Pendant Mangalsutra",
     "sku": "ITP0617", "cat": "mangalsutra", "material": "diamond", "purity": "18K",
     "weight": 5.046, "mc": 10,
     "images": imgs("mangalsutra", 16, 1),
     "desc": "18K gold double-strand black bead mangalsutra with a fan-shaped diamond-studded gold pendant."},

    # ════════════════════════════════════════════════════════════════
    # BANGLES  (BNG-005 to BNG-018)
    # ════════════════════════════════════════════════════════════════
    {"name": "Scalloped Floral Gold Bangles (Set of 4)",
     "sku": "BNG-005", "cat": "bangles", "material": "gold", "purity": "22K",
     "weight": 47.3, "mc": 10,
     "images": imgs("bangles", 5, 1),
     "desc": "Set of 4 gold bangles with two-tone floral and leaf design, textured finish with scalloped edges. Size 2.7."},

    {"name": "Wavy CZ Accent Gold Bangles (Set of 2)",
     "sku": "BNG-006", "cat": "bangles", "material": "gold", "purity": "22K",
     "weight": 31.35, "mc": 10,
     "images": imgs("bangles", 6, 1),
     "desc": "Pair of gold bangles with scalloped wavy edges and small CZ/white stone accents set in circular motifs on textured diamond-cut body. Size 2.8."},

    {"name": "Diamond Oval Panel Filigree Bangle",
     "sku": "BNG-007", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 0, "mc": 10,
     "images": imgs("bangles", 7, 1),
     "desc": "Gold bangle with large oval filigree center panel set with rows of brilliant-cut white stones in prong setting, flanked by circular diamond cluster accents. Price on request."},

    {"name": "Crescent Moon Blue Stone Diamond Bangle",
     "sku": "BNG-008", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 0, "mc": 10,
     "images": imgs("bangles", 8, 1),
     "desc": "Gold bangle with crescent moon side element and central floral design set with brilliant-cut white stones and large oval blue stone (turquoise/blue topaz) center. Price on request."},

    {"name": "Scrollwork Emerald Ruby Diamond Bangle",
     "sku": "BNG-009", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 0, "mc": 10,
     "images": imgs("bangles", 9, 1),
     "desc": "Gold bangle with scrollwork design set with brilliant-cut white stones across shank, large green emerald and ruby red stones in center cluster. Price on request."},

    {"name": "Crescent Green Stone Diamond Spray Bangle",
     "sku": "BNG-010", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 0, "mc": 10,
     "images": imgs("bangles", 10, 1),
     "desc": "Gold bangle with crescent moon accent and floral diamond spray design, large oval green emerald center stone in prong setting surrounded by pear and round brilliant-cut white stones. Price on request."},

    {"name": "Spray Floral Ball and Diamond Bangle",
     "sku": "BNG-011", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 0, "mc": 10,
     "images": imgs("bangles", 11, 1),
     "desc": "Gold bangle with spray floral motif featuring matte gold ball clusters alternating with brilliant-cut white stone clusters on radiating wires. Price on request."},

    {"name": "Peacock Enamel Pave Diamond Bangle",
     "sku": "BNG-012", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 0, "mc": 10,
     "images": imgs("bangles", 12, 1),
     "desc": "Gold bangle with large peacock motif center fully pave-set with brilliant-cut white stones, multicolor enamel peacock neck in blue, green, red. Price on request."},

    {"name": "18K Baguette Diamond Arch Bangle",
     "sku": "CSB610-10", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 7.808, "mc": 10,
     "images": imgs("bangles", 13, 1),
     "desc": "18K gold bangle with central panel of baguette and round brilliant-cut white stones in bow/arch motif, flanked by pave-set white stone border rows on shank."},

    {"name": "18K Fan Diamond Marquise Bangle",
     "sku": "CSDB586-05", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 9.559, "mc": 10,
     "images": imgs("bangles", 14, 1),
     "desc": "18K gold bangle with large fan/peacock-tail center panel set with marquise solitaire and surrounding round brilliant-cut white stones radiating outward, pave border on shank."},

    {"name": "18K Ruby Teal Diamond Arch Bangle",
     "sku": "CSRB610-10", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 7.960, "mc": 10,
     "images": imgs("bangles", 15, 1),
     "desc": "18K gold bangle with central arch panel of baguette white stones flanked by pear-cut ruby (pink-red) and teal/green color stones, pave white stone border rows on shank."},

    {"name": "18K Diamond Lotus Floral Heart Kada",
     "sku": "CSB600-08", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 10.40, "mc": 10,
     "images": imgs("bangles", 16, 1), "featured": True,
     "desc": "18K gold rigid kada/cuff bracelet with floral heart CZ motif centerpiece and CZ-lined sides on a ladder-pattern shank."},

    {"name": "18K Diamond Lotus Double Motif Pink Bangle",
     "sku": "CSBB516-03", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 8.48, "mc": 10,
     "images": imgs("bangles", 17, 1),
     "desc": "18K gold rigid bangle bracelet with double lotus motif in CZ halos with ruby/pink accent stones at center."},

    {"name": "18K Diamond Lotus Double Motif Bangle",
     "sku": "CRBB616-03", "cat": "bangles", "material": "diamond", "purity": "18K",
     "weight": 7.685, "mc": 10,
     "images": imgs("bangles", 18, 1),
     "desc": "18K gold rigid bangle bracelet with double lotus motif in CZ halos on plain polished shank."},

    # ════════════════════════════════════════════════════════════════
    # BRACELETS  (BRC-001 to BRC-030)
    # ════════════════════════════════════════════════════════════════
    {"name": "18K Ruby Teardrop Ladies Bracelet",
     "sku": "IMCSBR113-R", "cat": "bracelets", "material": "gold", "purity": "18K",
     "weight": 4.352, "mc": 13,
     "images": imgs("bracelet", 1, 1),
     "desc": "18K gold teardrop-link bracelet with ruby/pink color stones set in three central teardrop motifs."},

    {"name": "18K Diamond Teardrop Ladies Bracelet",
     "sku": "IMCSBR113-D", "cat": "bracelets", "material": "diamond", "purity": "18K",
     "weight": 4.202, "mc": 13,
     "images": imgs("bracelet", 2, 1),
     "desc": "18K gold teardrop-link bracelet with diamond-set three central teardrop motifs."},

    {"name": "18K Gents Heavy Lion Head Link Bracelet",
     "sku": "EFPBR082-04-8", "cat": "bracelets", "material": "gold", "purity": "18K",
     "weight": 15.38, "mc": 13,
     "images": imgs("bracelet", 3, 1),
     "desc": "18K gold heavy gents bracelet with a bold lion-head centerpiece on a geometric-link chain. Size 8 inches."},

    {"name": "Circular Motif Gold Ladies Bracelet",
     "sku": "BRC-004", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 4, 1),
     "desc": "Gold ladies bracelet with circular-motif links. Elegant everyday design. Price on request."},

    {"name": "Diamond-Link Ladies Gold Bracelet",
     "sku": "BRC-005", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 5, 1),
     "desc": "Gold ladies bracelet with diamond-shaped link pattern. Classic and elegant. Price on request."},

    {"name": "Two-Tone Chevron Pattern Ladies Bracelet",
     "sku": "BRC-006", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 6, 1),
     "desc": "Two-tone gold ladies bracelet with chevron pattern design. Price on request."},

    {"name": "18K Silk Thread Gold Clasp Bracelet",
     "sku": "SBR313-8", "cat": "bracelets", "material": "gold", "purity": "18K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 7, 1),
     "desc": "Gents bracelet with blue silk/thread cord body and 18K gold rectangular clasp plate featuring a running panther/jaguar motif with black enamel detailing."},

    {"name": "Gents Plain Heavy Curb Chain Bracelet",
     "sku": "BRC-008", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 8, 1),
     "desc": "Heavy plain gold curb chain bracelet for gents. Bold statement piece. Price on request."},

    {"name": "Gents Two-Tone Curb Chain Bracelet",
     "sku": "BRC-009", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 9, 1),
     "desc": "Two-tone gold curb chain bracelet for gents. Stylish and masculine. Price on request."},

    {"name": "Gents Plain Gold Curb Bracelet",
     "sku": "BRC-010", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 10, 1),
     "desc": "Plain gold curb chain bracelet for gents. Classic everyday wear. Price on request."},

    {"name": "Gents Flat Rectangular Mesh Bracelet",
     "sku": "BRC-011", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 11, 1),
     "desc": "Gents gold flat rectangular mesh bracelet. Modern minimalist design. Price on request."},

    {"name": "Gents Hexagonal Honeycomb Mesh Bracelet",
     "sku": "BRC-012", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 12, 1),
     "desc": "Gents gold bracelet with honeycomb hexagonal mesh design and white gold accents. Price on request."},

    {"name": "Gents Box-Link Lion Face Medallion Bracelet",
     "sku": "BRC-013", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 13, 1),
     "desc": "Gents gold box-link bracelet with antique gold lion-face centre medallion. Distinctive statement piece. Price on request."},

    {"name": "Gents Teardrop Ganpati Amber Stone Bracelet",
     "sku": "BRC-014", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 14, 1),
     "desc": "Gents gold teardrop link bracelet with Ganpati motif and topaz-colored stones. Devotional and stylish. Price on request."},

    {"name": "Gents Rose-Gold Curb Pave CZ Clasp Bracelet",
     "sku": "BRC-015", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 15, 1),
     "desc": "Rose-gold/two-tone Cuban curb chain bracelet with pave CZ box clasp. Price on request."},

    {"name": "Gents Yellow Gold Double Box Chain Bracelet",
     "sku": "BRC-016", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 16, 1),
     "desc": "Gents yellow gold double-row box chain bracelet. Classic and durable. Price on request."},

    {"name": "Gents Two-Tone Cuban Curb Chain Bracelet",
     "sku": "BRC-017", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 17, 1),
     "desc": "Two-tone Cuban curb chain bracelet for gents. Bold and stylish. Price on request."},

    {"name": "Gents Textured Rectangular Flat-Link Bracelet",
     "sku": "BRC-018", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 18, 1),
     "desc": "Textured rectangular flat-link gold bracelet for gents. Price on request."},

    {"name": "Gents Lion Face Medallion Double-Wheat Bracelet",
     "sku": "BRC-019", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 19, 1),
     "desc": "Single gents gold bracelet with double wheat/foxtail chain design and a central square lion-face medallion in antique gold finish, lobster clasp."},

    {"name": "Gents Wide Hexagonal Honeycomb White-Gold Bracelet",
     "sku": "BRC-020", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 20, 1),
     "desc": "Wide hexagonal honeycomb mesh gents bracelet with white gold accents. Price on request."},

    {"name": "Gents Open Cuban Two-Tone Curb Bracelet",
     "sku": "BRC-021", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 21, 1),
     "desc": "Open Cuban curb chain gents bracelet in two-tone gold. Price on request."},

    {"name": "Gents V-Zigzag Pattern Two-Tone Bracelet",
     "sku": "BRC-022", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 22, 1),
     "desc": "Wide V-zigzag pattern gold bracelet for gents in two-tone finish. Price on request."},

    {"name": "Gents Rose-Gold Cuban Chain Pave Bracelet",
     "sku": "BRC-023", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 23, 1),
     "desc": "Rose-gold/two-tone Cuban curb chain bracelet with pave CZ box clasp. Price on request."},

    {"name": "Gents Yellow Gold Double-Row Box Chain Bracelet",
     "sku": "BRC-024", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 24, 1),
     "desc": "Yellow gold double-row box chain bracelet for gents. Price on request."},

    {"name": "Gents Two-Tone Cuban Chain Bracelet",
     "sku": "BRC-025", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 25, 1),
     "desc": "Two-tone Cuban chain bracelet for gents. Price on request."},

    {"name": "Gents Textured Diamond-Link Bracelet",
     "sku": "BRC-026", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 0, "mc": 13,
     "images": imgs("bracelet", 26, 1),
     "desc": "Textured rectangular diamond-link flat gold bracelet for gents. Price on request."},

    {"name": "18K Mangalsutra Multi-Color Charm Bracelet",
     "sku": "MDMBS122-05", "cat": "bracelets", "material": "gold", "purity": "18K",
     "weight": 3.702, "mc": 13,
     "images": imgs("bracelet", 27, 1),
     "desc": "18K gold mangalsutra-style bracelet with black beads and multiple colored stone charms (ruby, emerald tones) and gold bells/drops."},

    {"name": "18K Mangalsutra Pink Heart Enamel Bracelet",
     "sku": "MDMBF106", "cat": "bracelets", "material": "gold", "purity": "18K",
     "weight": 1.868, "mc": 13,
     "images": imgs("bracelet", 28, 1),
     "desc": "18K gold mangalsutra-style bracelet with black beads and pink heart enamel charm centerpiece."},

    {"name": "18K Mangalsutra Diamond Cluster Bracelet",
     "sku": "MDMBS122-03", "cat": "bracelets", "material": "diamond", "purity": "18K",
     "weight": 2.504, "mc": 13,
     "images": imgs("bracelet", 29, 1),
     "desc": "18K gold mangalsutra-style bracelet with black beads and square diamond/white stone cluster centerpiece."},

    {"name": "Heavy Two-Tone Diamond-Link Gents Bracelet",
     "sku": "BRC-030", "cat": "bracelets", "material": "gold", "purity": "22K",
     "weight": 38.40, "mc": 13,
     "images": imgs("bracelet", 30, 1),
     "desc": "Heavy two-tone gold bracelet with alternating yellow and white gold diamond-shaped links in a wide flat panel with clasp. Weight approximately 38.4g."},
]


# ── Seed logic ────────────────────────────────────────────────────────────────

async def seed():
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        async with session.begin():
            await _seed(session)

    await engine.dispose()
    print("\nSeed complete.")


async def _seed(session: AsyncSession):
    # 1. Create new categories
    print("Creating new categories...")
    for cat_def in NEW_CATEGORIES:
        result = await session.execute(select(Category).where(Category.slug == cat_def["slug"]))
        cat = result.scalar_one_or_none()
        if not cat:
            cat = Category(
                name=cat_def["name"],
                slug=cat_def["slug"],
                image_url=cat_def["image_url"],
                display_order=cat_def["display_order"],
                is_active=True,
            )
            session.add(cat)
            print(f"  + Created '{cat_def['name']}'")
        else:
            cat.image_url = cat_def["image_url"]
            print(f"  ~ Updated '{cat_def['name']}'")
    await session.flush()

    # 2. Build category slug -> id map
    cats = {}
    needed_slugs = set(p["cat"] for p in PRODUCTS)
    for slug in needed_slugs:
        result = await session.execute(select(Category).where(Category.slug == slug))
        cat = result.scalar_one_or_none()
        if cat:
            cats[slug] = cat.id
        else:
            print(f"  WARN: category '{slug}' not found — skipping its products")

    # 3. Upsert products
    print(f"\nUpserting {len(PRODUCTS)} products...")
    created = updated = 0

    for p in PRODUCTS:
        cat_id = cats.get(p["cat"])
        if not cat_id:
            continue

        weight   = p.get("weight", 0) or 0
        mc_pct   = p.get("mc", 12)
        material = p.get("material", "gold")
        purity   = p.get("purity", "22K")
        featured = p.get("featured", False)

        if "base_price" in p:
            base_price = p["base_price"]
        elif material == "diamond":
            base_price = diamond_price(weight)
        else:
            base_price = gold_price(weight, purity, mc_pct)

        slug_val = slugify(p["name"]) + "-" + p["sku"].lower().replace("/", "-")

        existing = await session.execute(select(Product).where(Product.sku == p["sku"]))
        product = existing.scalar_one_or_none()

        if product:
            product.name               = p["name"]
            product.slug               = slug_val
            product.category_id        = cat_id
            product.description        = p.get("desc", "")
            product.material           = material
            product.purity             = purity
            product.weight_grams       = weight
            product.base_price         = base_price
            product.making_charge_type = "percentage"
            product.making_charge_value = mc_pct
            product.is_active          = True
            product.is_featured        = featured
            old_imgs = await session.execute(
                select(ProductImage).where(ProductImage.product_id == product.id)
            )
            for img_row in old_imgs.scalars().all():
                await session.delete(img_row)
            await session.flush()
            updated += 1
        else:
            product = Product(
                name               = p["name"],
                slug               = slug_val,
                category_id        = cat_id,
                description        = p.get("desc", ""),
                material           = material,
                purity             = purity,
                weight_grams       = weight,
                base_price         = base_price,
                making_charge_type = "percentage",
                making_charge_value = mc_pct,
                sku                = p["sku"],
                stock_quantity     = 1,
                is_active          = True,
                is_featured        = featured,
            )
            session.add(product)
            await session.flush()
            created += 1

        for i, url in enumerate(p["images"]):
            session.add(ProductImage(
                product_id    = product.id,
                image_url     = url,
                display_order = i,
                is_primary    = (i == 0),
            ))

    await session.flush()
    print(f"  Created: {created}")
    print(f"  Updated: {updated}")
    print(f"  Total:   {created + updated}")

    # 4. Update category thumbnails for new categories
    for cat_def in NEW_CATEGORIES:
        result = await session.execute(select(Category).where(Category.slug == cat_def["slug"]))
        cat = result.scalar_one_or_none()
        if cat:
            cat.image_url = cat_def["image_url"]


if __name__ == "__main__":
    asyncio.run(seed())
