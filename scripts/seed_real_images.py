"""
Replace fictional products in Chain, Bangles, Earrings, Mangalsutra, Rings categories
with real products sourced from actual jewellery photos.
Also creates the new 'Haar & Necklace Sets' category (12th category).

Run AFTER seed.py and seed_catalog.py:
    python scripts/seed_real_images.py

Weights marked (est.) were visually estimated because the source image was
too large to read reliably. Shop owner should verify and update from admin panel.
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


def img(category: str, product: int, image: int) -> str:
    return f"/static/images/products/{category}_{product:03d}_{image:02d}.jpg"


def img_list(category: str, product: int, count: int) -> list[str]:
    return [img(category, product, i) for i in range(1, count + 1)]


# ── Category definitions ─────────────────────────────────────────────────────

CATEGORIES_TO_CLEAR = ["chain", "bangles", "earrings", "mangalsutra", "rings"]

NEW_CATEGORY = {
    "name": "Haar & Necklace Sets",
    "slug": "haar-necklace-sets",
    "image_url": img("haar", 3, 1),
    "display_order": 12,
}

CATEGORY_THUMB_UPDATES = {
    "chain":       img("chain", 1, 1),
    "bangles":     img("bangles", 1, 1),
    "earrings":    img("earrings", 1, 1),
    "mangalsutra": img("mangalsutra", 1, 1),
    "rings":       img("rings", 1, 1),
}


# ── Product data ──────────────────────────────────────────────────────────────
# Format per product:
#   name, weight_grams, making_charge_pct, img_count, is_featured, description

CHAIN_PRODUCTS = [
    {
        "name": "Dual Tone Ball Bead Chain",
        "sku": "CHN-001",
        "weight": 6.66,
        "mc": 12,
        "images": img_list("chain", 1, 2),
        "featured": False,
        "desc": "Elegant double-strand box chain with dual-tone gold and rhodium ball beads. Lightweight everyday wear.",
    },
    {
        "name": "Foxtail Chain with Tassel Drop Pendant",
        "sku": "CHN-002",
        "weight": 8.29,
        "mc": 12,
        "images": img_list("chain", 2, 2),
        "featured": False,
        "desc": "Double-strand foxtail chain with faceted ball beads and a delicate tassel drop pendant.",
    },
    {
        "name": "Diamond-Cut Foxtail Chain",
        "sku": "CHN-003",
        "weight": 9.20,
        "mc": 12,
        "images": img_list("chain", 3, 3),
        "featured": False,
        "desc": "Lustrous double-strand foxtail chain featuring diamond-cut oval beads and twin gold ball centerpieces.",
    },
    {
        "name": "Box Chain with Floral Heart Pendant",
        "sku": "CHN-004",
        "weight": 8.49,
        "mc": 12,
        "images": img_list("chain", 4, 3),
        "featured": False,
        "desc": "Single box chain with ball beads and a heart-shaped floral pendant with ghungroo bell drops.",
    },
    {
        "name": "Peacock Meenakari Chain with Jhumka Pendant",
        "sku": "CHN-005",
        "weight": 7.77,
        "mc": 13,
        "images": img_list("chain", 5, 3),
        "featured": True,
        "desc": "Single box chain with a large ornate peacock-motif pendant featuring vibrant meenakari enamel work and cascading tassel drops.",
    },
    {
        "name": "Peacock Chain with Ruby-Tipped Tassels",
        "sku": "CHN-006",
        "weight": 7.31,
        "mc": 13,
        "images": img_list("chain", 6, 3),
        "featured": False,
        "desc": "Single box chain with a large peacock-design meenakari pendant and elegant ruby-tipped tassel drops.",
    },
    {
        "name": "Teardrop Peacock Meenakari Chain",
        "sku": "CHN-007",
        "weight": 6.88,
        "mc": 12,
        "images": img_list("chain", 7, 2),
        "featured": False,
        "desc": "Single box chain with a teardrop peacock meenakari pendant and distinctive ruby-tipped spike drops.",
    },
    {
        "name": "Fancy-Link Gold Chain with Pineapple Pendant",
        "sku": "CHN-008",
        "weight": 5.31,
        "mc": 12,
        "images": img_list("chain", 8, 2),
        "featured": False,
        "desc": "Plain gold fancy-link chain with diamond-cut barrel beads and a decorative pineapple-motif drop pendant with tassels.",
    },
    {
        "name": "Box Chain with Barrel Bead Pendant",
        "sku": "CHN-009",
        "weight": 3.80,
        "mc": 12,
        "images": img_list("chain", 9, 4),
        "featured": False,
        "desc": "Plain gold box chain with barrel-shaped beads at intervals and a dual-strand tassel pendant drop.",
    },
]

BANGLES_PRODUCTS = [
    {
        "name": "Floral Leaf Engraved Gold Bangles (Set of 4)",
        "sku": "BNG-001",
        "weight": 20.25,
        "mc": 10,
        "images": img_list("bangles", 1, 3),
        "featured": True,
        "desc": "Set of 4 gold bangles with intricate floral and leaf engraving, matte texture, polished gold stripe accents, and small bead detailing.",
    },
    {
        "name": "Floral Bird Motif Gold Bangles (Set of 4)",
        "sku": "BNG-002",
        "weight": 19.72,
        "mc": 10,
        "images": img_list("bangles", 2, 2),
        "featured": False,
        "desc": "Set of 4 gold bangles with matte-textured body, raised floral and bird motif engravings, and crescent moon end caps.",
    },
    {
        "name": "Diagonal Twisted Gold Bangles (Set of 4)",
        "sku": "BNG-003",
        "weight": 20.07,
        "mc": 10,
        "images": img_list("bangles", 3, 3),
        "featured": False,
        "desc": "Set of 4 gold bangles with elegant diagonal twisted design, alternating matte and polished sections, floral top engravings, and peacock motif at the base.",
    },
    {
        "name": "Geometric Diamond Pattern Gold Bangles (Set of 4)",
        "sku": "BNG-004",
        "weight": 20.33,
        "mc": 10,
        "images": img_list("bangles", 4, 3),
        "featured": False,
        "desc": "Set of 4 gold bangles with bold diagonal slash engravings on polished upper half and matte geometric diamond-pattern lower half with small bead accents.",
    },
]

EARRINGS_PRODUCTS = [
    {
        "name": "Large Gold Chandelier Earrings with Meenakari and Bell Drops",
        "sku": "ERG-001",
        "weight": 11.110,
        "mc": 15,
        "images": img_list("earrings", 1, 1),
        "featured": True,
        "desc": "Multi-tier gold chandelier earrings with fan-shaped filigree body, red enamel accents, and cascading bell tassel drops.",
    },
    {
        "name": "Peacock Chandbali with Multi-Color Meenakari and Twin Jhumka",
        "sku": "ERG-002",
        "weight": 13.290,
        "mc": 15,
        "images": img_list("earrings", 2, 1),
        "featured": True,
        "desc": "Bold chandbali earrings with blue-neck peacock motif, vibrant multi-color meenakari enamel, and twin jhumka drops.",
    },
    {
        "name": "Shield-Shape Chandbali with Black Enamel and Twin Jhumka",
        "sku": "ERG-003",
        "weight": 11.170,
        "mc": 15,
        "images": img_list("earrings", 3, 1),
        "featured": False,
        "desc": "Triangular shield-shaped chandbali with bold black enamel chevron band and twin jhumka drop tassels.",
    },
    {
        "name": "Peacock Chandbali with Arrow-Tip Chain Tassels",
        "sku": "ERG-004",
        "weight": 4.400,
        "mc": 15,
        "images": img_list("earrings", 4, 1),
        "featured": False,
        "desc": "Delicate chandbali with black enamel peacock bird motif on top, open crescent body, and elegant arrow-tip chain tassel drops.",
    },
    {
        "name": "Peacock Chandbali with Ball Fringe and Twin Jhumka Drops",
        "sku": "ERG-005",
        "weight": 9.200,
        "mc": 15,
        "images": img_list("earrings", 5, 1),
        "featured": False,
        "desc": "Chandbali with peacock meenakari (green/red enamel), dense gold ball fringe row, and twin hanging jhumka drops.",
    },
    {
        "name": "Crescent Chandbali with Central Peacock and Jhumka Drop",
        "sku": "ERG-006",
        "weight": 8.640,
        "mc": 15,
        "images": img_list("earrings", 6, 1),
        "featured": False,
        "desc": "Crescent-body chandbali with central peacock enamel motif, gold ball fringe, and single jhumka drop with chain tassels.",
    },
    {
        "name": "Three-Tier Chandelier with Peacock Meenakari and Jhumka",
        "sku": "ERG-007",
        "weight": 8.520,
        "mc": 15,
        "images": img_list("earrings", 7, 1),
        "featured": False,
        "desc": "Large 3-tier gold chandelier earrings with peacock motif circular center, meenakari enamel accents, and hanging jhumka bell bottoms.",
    },
    {
        "name": "Gold Chandbali with Red Meenakari and Spear Tassel Drop",
        "sku": "ERG-008",
        "weight": 4.840,
        "mc": 15,
        "images": img_list("earrings", 8, 1),
        "featured": False,
        "desc": "Horseshoe/crescent chandbali with deep red meenakari enamel, scalloped border, and a distinctive long spear-tip drop.",
    },
    {
        "name": "Parrot Chandelier Earrings with Chain Tassels",
        "sku": "ERG-009",
        "weight": 7.240,
        "mc": 15,
        "images": img_list("earrings", 9, 1),
        "featured": False,
        "desc": "Gold chandelier earrings with two enamel parrots on open crescent hoops, multiple hanging chain tassels with leaf and teardrop drops.",
    },
    {
        "name": "Peacock Stud Chandbali with Filigree Crescent and Jhumka",
        "sku": "ERG-010",
        "weight": 4.730,
        "mc": 15,
        "images": img_list("earrings", 10, 1),
        "featured": False,
        "desc": "Chandbali with meenakari peacock stud top, filigree crescent body, and dangling jhumka with chain and diamond-shaped pendant.",
    },
    {
        "name": "Peacock Stud Chandbali with Teardrop Dangles and Chain Tassel",
        "sku": "ERG-011",
        "weight": 4.560,
        "mc": 15,
        "images": img_list("earrings", 11, 1),
        "featured": False,
        "desc": "Chandbali with enamel peacock stud top, open crescent with teardrop dangles, and long chain tassel with small jhumka.",
    },
    {
        "name": "Heart-Top Chandbali with Red Meenakari and Bell Jhumka",
        "sku": "ERG-012",
        "weight": 5.240,
        "mc": 15,
        "images": img_list("earrings", 12, 1),
        "featured": False,
        "desc": "Chandbali with heart-shaped top stud, red meenakari crescent body, small bell jhumka, and multi-chain tassel drop.",
    },
    {
        "name": "Peacock Meenakari Chandbali with Filigree Crescent and Bead Tassels",
        "sku": "ERG-013",
        "weight": 5.280,
        "mc": 15,
        "images": img_list("earrings", 13, 1),
        "featured": False,
        "desc": "Chandbali with blue enamel peacock motif on top, open filigree crescent body, and chain tassels with dangling gold beads.",
    },
    {
        "name": "Mughal-Style Long Dangle Earrings with Maroon Stone",
        "sku": "ERG-014",
        "weight": 6.850,
        "mc": 15,
        "images": img_list("earrings", 14, 1),
        "featured": False,
        "desc": "Long Mughal-style dangle earrings with maroon stone accents, layered oval cutwork body, mini jhumka, and chain tassel drop.",
    },
    {
        "name": "Paisley Chandbali with Maroon Meenakari and Bead Dangles",
        "sku": "ERG-015",
        "weight": 6.700,
        "mc": 15,
        "images": img_list("earrings", 15, 1),
        "featured": False,
        "desc": "Chandbali with maroon meenakari fill, double-bird/paisley-shaped body, multiple tiny gold bead dangles, and a central teardrop drop.",
    },
    {
        "name": "Star-Top Chandbali with Crescent Cutwork and Jhumka Tassel",
        "sku": "ERG-016",
        "weight": 6.730,
        "mc": 15,
        "images": img_list("earrings", 16, 1),
        "featured": False,
        "desc": "Chandbali with star-engraved circular tops, crescent moon body with cutwork floral motifs, and chain tassel with small jhumka drop.",
    },
    {
        "name": "Peacock Stud Chandbali with Scalloped Disc and Chain Tassels",
        "sku": "ERG-017",
        "weight": 5.390,
        "mc": 15,
        "images": img_list("earrings", 17, 1),
        "featured": False,
        "desc": "Chandbali with peacock meenakari stud top, scalloped disc body, and multiple chain tassels with gold bead and teardrop drops.",
    },
    {
        "name": "Large Peacock Chandbali with Crown Top and Butterfly Middle",
        "sku": "ERG-018",
        "weight": 8.230,
        "mc": 15,
        "images": img_list("earrings", 18, 1),
        "featured": False,
        "desc": "Large chandbali with enamel peacock motif inside open hoop, ornate crown top, butterfly-shaped middle section, and jhumka chain tassel drop.",
    },
    {
        "name": "Floral-Top Chandbali with Meenakari Crescent and Jhumka Drops",
        "sku": "ERG-019",
        "weight": 7.350,
        "mc": 15,
        "images": img_list("earrings", 19, 1),
        "featured": False,
        "desc": "Chandbali with floral-disc top, crescent moon body with red meenakari accents, dangling gold beads, and long tassel jhumka drops.",
    },
    {
        "name": "Peacock Teardrop Chandbali with Open Filigree and Spike Tassels",
        "sku": "ERG-020",
        "weight": 5.789,
        "mc": 15,
        "images": img_list("earrings", 20, 1),
        "featured": False,
        "desc": "Chandbali with peacock-motif teardrop top (black enamel eye), large open-filigree crescent body, and long chain tassels with pointed spike tips.",
    },
    {
        "name": "Filigree Teardrop Earrings with Meenakari and Double-Tier Jhumka",
        "sku": "ERG-021",
        "weight": 10.980,
        "mc": 15,
        "images": img_list("earrings", 21, 1),
        "featured": True,
        "desc": "Gold teardrop-top earrings with intricate filigree, red meenakari detailing, and double-tier hanging jhumka bells on box chains with bead drops.",
    },
    {
        "name": "Floral Petal Chandbali with Lattice Body and Meenakari Jhumka",
        "sku": "ERG-022",
        "weight": 8.020,
        "mc": 15,
        "images": img_list("earrings", 22, 1),
        "featured": False,
        "desc": "Chandbali with floral petal top, large open-lattice circular chand body with red meenakari edges, gold ball fringe, and jhumka with chain tassels.",
    },
    {
        "name": "Long Drop Earrings with Peacock Meenakari and Jhumka Tassel",
        "sku": "ERG-023",
        "weight": 8.470,
        "mc": 15,
        "images": img_list("earrings", 23, 1),
        "featured": False,
        "desc": "Long drop earrings with layered teardrop and crescent sections, green-eyed peacock meenakari motif, gold ball drops, and jhumka tassel.",
    },
    {
        "name": "Peacock Crescent Chandbali with Meenakari and Jhumka Chains",
        "sku": "ERG-024",
        "weight": 8.520,
        "mc": 15,
        "images": img_list("earrings", 24, 1),
        "featured": False,
        "desc": "Gold chandbali with teardrop top, large crescent body engraved with peacock motif, red/green meenakari, gold ball fringe, and jhumka tassel chains.",
    },
    {
        "name": "Bridal Gold Nath with Peacock Meenakari and Chain",
        "sku": "ERG-025",
        "weight": 20.0,
        "mc": 15,
        "images": img_list("earrings", 25, 1),
        "featured": False,
        "desc": "Large circular bridal nath (nose ring) with peacock meenakari motif, green and red stone accents, and cascading ghungroo chain. Price may vary — contact us for exact quote.",
    },
]

# Weights marked (est.) are visual estimates. Verified weights use actual image stamps.
HAAR_PRODUCTS = [
    {
        "name": "Heavy Bridal Haar with Floral Panel and Fringe",
        "sku": "HAR-001",
        "weight": 20.0,      # est. (agent saw "20..." on tag, not clearly readable)
        "mc": 12,
        "images": img_list("haar", 1, 2),
        "featured": False,
        "desc": "Large elaborate bridal haar with engraved floral centre panel and long fringe drops. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Granule-Work Choker with Filigree Pendant",
        "sku": "HAR-002",
        "weight": 19.795,    # verified
        "mc": 12,
        "images": img_list("haar", 2, 3),
        "featured": False,
        "desc": "Broad choker necklace with granule-work upper band, large ornate central pendant with filigree detail and fringe tassel drops.",
        "estimated": False,
    },
    {
        "name": "Grand Bridal Coin-Border Haar with Meenakari Pendant",
        "sku": "HAR-003",
        "weight": 96.110,    # verified from HUID tag
        "mc": 12,
        "images": img_list("haar", 3, 1),
        "featured": True,
        "desc": "Magnificent heavy bridal haar with multi-layer coin and petal border design, large round meenakari centre pendant with red enamel work and cascading long fringe drops.",
        "estimated": False,
    },
    {
        "name": "Bridal Necklace Set — Heavy Gold Work",
        "sku": "HAR-004",
        "weight": 65.0,      # est.
        "mc": 12,
        "images": img_list("haar", 4, 3),
        "featured": False,
        "desc": "Heavy bridal necklace set with elaborate gold work on teal display mannequin. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Heavy Bridal Haar with Ornate Pendant",
        "sku": "HAR-005",
        "weight": 70.0,      # est.
        "mc": 12,
        "images": img_list("haar", 5, 3),
        "featured": False,
        "desc": "Elaborate heavy bridal haar necklace with ornate gold pendant. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Layered Bridal Haar with Pendant",
        "sku": "HAR-006",
        "weight": 60.0,      # est.
        "mc": 12,
        "images": img_list("haar", 6, 3),
        "featured": False,
        "desc": "Bridal haar with layered gold necklace design. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Bridal Haar with Elaborate Fringe Drops",
        "sku": "HAR-007",
        "weight": 55.0,      # est.
        "mc": 12,
        "images": img_list("haar", 7, 1),
        "featured": False,
        "desc": "Bridal haar necklace with elaborate fringe drop design. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Grand Bridal Necklace Set — Teal Display",
        "sku": "HAR-008",
        "weight": 75.0,      # est.
        "mc": 12,
        "images": img_list("haar", 8, 3),
        "featured": False,
        "desc": "Grand bridal necklace set on teal display mannequin. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Heavy Gold Necklace Set",
        "sku": "HAR-009",
        "weight": 68.0,      # est.
        "mc": 12,
        "images": img_list("haar", 9, 3),
        "featured": False,
        "desc": "Heavy gold necklace set with elaborate design work. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Elaborate Bridal Haar Set",
        "sku": "HAR-010",
        "weight": 72.0,      # est.
        "mc": 12,
        "images": img_list("haar", 10, 5),
        "featured": False,
        "desc": "Elaborate bridal haar necklace set. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Grand Bridal Necklace with Pendant",
        "sku": "HAR-011",
        "weight": 80.0,      # est.
        "mc": 12,
        "images": img_list("haar", 11, 4),
        "featured": False,
        "desc": "Grand bridal necklace with decorative gold pendant. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Heavy Gold Necklace with Filigree Work",
        "sku": "HAR-012",
        "weight": 65.0,      # est.
        "mc": 12,
        "images": img_list("haar", 12, 4),
        "featured": False,
        "desc": "Heavy gold necklace set with intricate filigree work. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Bridal Haar with Multi-Layer Design",
        "sku": "HAR-013",
        "weight": 60.0,      # est.
        "mc": 12,
        "images": img_list("haar", 13, 4),
        "featured": False,
        "desc": "Bridal haar with multi-layer necklace design. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Bridal Necklace with Decorative Gold Pendant",
        "sku": "HAR-014",
        "weight": 55.0,      # est.
        "mc": 12,
        "images": img_list("haar", 14, 4),
        "featured": False,
        "desc": "Bridal necklace with decorative gold pendant and elaborate design. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Bridal Chokar and Haar Necklace Set",
        "sku": "HAR-015",
        "weight": 48.76,     # verified: Chokar 33.73g + Haar 15.03g
        "mc": 12,
        "images": img_list("haar", 15, 3),
        "featured": True,
        "desc": "Complete bridal set featuring a heavy gold chokar (33.73g) paired with a long haar (15.03g), both with meenakari teardrop pendant design.",
        "estimated": False,
    },
    {
        "name": "Gold Choker Necklace Set with Pendant",
        "sku": "HAR-016",
        "weight": 18.0,      # est.
        "mc": 12,
        "images": img_list("haar", 16, 4),
        "featured": False,
        "desc": "Gold choker necklace set with decorative pendant. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Gold Choker with Meenakari Pendant",
        "sku": "HAR-017",
        "weight": 20.0,      # est.
        "mc": 12,
        "images": img_list("haar", 17, 2),
        "featured": False,
        "desc": "Gold choker necklace with meenakari pendant design. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Filigree Choker with Peacock Motif and Red Stones",
        "sku": "HAR-018",
        "weight": 13.68,     # verified
        "mc": 12,
        "images": img_list("haar", 18, 3),
        "featured": False,
        "desc": "Broad filigree choker necklace with scalloped edges, central peacock motif, red stone accents, and gold ball drops.",
        "estimated": False,
    },
    {
        "name": "Wide Gold Choker with Engraved Floral Design",
        "sku": "HAR-019",
        "weight": 22.40,     # verified
        "mc": 12,
        "images": img_list("haar", 19, 4),
        "featured": False,
        "desc": "Wide gold choker necklace with engraved floral design, triangular drop dangles, and a central teardrop pendant.",
        "estimated": False,
    },
    {
        "name": "Wide Filigree Choker with Teardrop Cutwork",
        "sku": "HAR-020",
        "weight": 22.71,     # verified
        "mc": 12,
        "images": img_list("haar", 20, 3),
        "featured": False,
        "desc": "Wide filigree choker necklace with teardrop cutwork pattern, gold ball drops, and a central coin or deity pendant.",
        "estimated": False,
    },
    {
        "name": "Bridal Necklace Set on Teal Display",
        "sku": "HAR-021",
        "weight": 65.0,      # est.
        "mc": 12,
        "images": img_list("haar", 21, 1),
        "featured": False,
        "desc": "Heavy bridal necklace set displayed on teal mannequin. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
    {
        "name": "Grand Bridal Haar with Ornate Pendant Set",
        "sku": "HAR-022",
        "weight": 70.0,      # est.
        "mc": 12,
        "images": img_list("haar", 22, 3),
        "featured": False,
        "desc": "Grand bridal haar necklace with ornate pendant on teal display mannequin. Price may vary — contact us for exact quote.",
        "estimated": True,
    },
]

MANGALSUTRA_PRODUCTS = [
    {
        "name": "Black Bead Mangalsutra with Gold Ball Pendant",
        "sku": "MGS-001",
        "weight": 4.42,
        "mc": 10,
        "images": img_list("mangalsutra", 1, 3),
        "featured": False,
        "desc": "Long black bead mangalsutra with alternating gold cylindrical beads and a classic double gold ball drop pendant.",
    },
    {
        "name": "Black Bead Mangalsutra with Globe Pendant",
        "sku": "MGS-002",
        "weight": 4.51,
        "mc": 10,
        "images": img_list("mangalsutra", 2, 3),
        "featured": False,
        "desc": "Long black bead mangalsutra with alternating gold tube beads and a gold globe pendant with tassel and jhumki drop.",
    },
    {
        "name": "Diamond-Cut Bead Mangalsutra with Coin Pendant",
        "sku": "MGS-003",
        "weight": 5.21,
        "mc": 10,
        "images": img_list("mangalsutra", 3, 4),
        "featured": False,
        "desc": "Long black round bead mangalsutra with interspersed gold diamond-cut beads and a small round textured gold coin pendant.",
    },
    {
        "name": "Double-Layer Mangalsutra with Dual Oval Pendants",
        "sku": "MGS-004",
        "weight": 7.09,
        "mc": 10,
        "images": img_list("mangalsutra", 4, 3),
        "featured": True,
        "desc": "Unique double-layer mangalsutra with a black bead top chain and a double gold snake chain below, finished with two oval gold pendants at different lengths.",
    },
    {
        "name": "Mangalsutra with Floral Cluster Pendant",
        "sku": "MGS-005",
        "weight": 5.24,
        "mc": 10,
        "images": img_list("mangalsutra", 5, 4),
        "featured": False,
        "desc": "Long black round bead mangalsutra with a beautiful gold floral cluster pendant featuring flower motifs and a decorative drop.",
    },
    {
        "name": "Mangalsutra with Heart-Shaped Engraved Pendant",
        "sku": "MGS-006",
        "weight": 6.34,
        "mc": 10,
        "images": img_list("mangalsutra", 6, 3),
        "featured": False,
        "desc": "Long black bead mangalsutra with gold hexagonal link accents on chain and a large gold heart-shaped engraved pendant with drop.",
    },
    {
        "name": "Black Bead Mangalsutra with Gold Dome Pendant",
        "sku": "MGS-007",
        "weight": 5.00,
        "mc": 10,
        "images": img_list("mangalsutra", 7, 3),
        "featured": False,
        "desc": "Long black bead mangalsutra with fine double gold chain and a small gold dome or coin pendant with bead accent.",
    },
    {
        "name": "Haar-Style Mangalsutra with Meenakari Pendant",
        "sku": "MGS-008",
        "weight": 34.19,     # 25.35 (chain) + 8.84 (pendant)
        "mc": 12,
        "images": img_list("mangalsutra", 8, 3),
        "featured": True,
        "desc": "Long gold haar-style mangalsutra with black beads embedded in gold links, finished with a decorative meenakari pendant featuring fringe drops. Chain: 25.35g, Pendant: 8.84g.",
    },
    {
        "name": "Double-Strand Mangalsutra with Tassel Drop",
        "sku": "MGS-009",
        "weight": 5.71,
        "mc": 10,
        "images": img_list("mangalsutra", 9, 3),
        "featured": False,
        "desc": "Thin double-strand black bead chain mangalsutra with a decorative gold pendant and black bead tassel drop.",
    },
    {
        "name": "Classic Mangalsutra with Gold Ball Drop Pendant",
        "sku": "MGS-010",
        "weight": 6.27,
        "mc": 10,
        "images": img_list("mangalsutra", 10, 4),
        "featured": False,
        "desc": "Classic black bead mangalsutra with gold ball drop pendant and tassels. Timeless traditional design.",
    },
    {
        "name": "Gold Link Chain Mangalsutra with Ball Pendant",
        "sku": "MGS-011",
        "weight": 5.89,
        "mc": 10,
        "images": img_list("mangalsutra", 11, 3),
        "featured": False,
        "desc": "Black bead chain with alternating gold links and a gold ball pendant with tassel and black bead drop.",
    },
    {
        "name": "Mangalsutra with Cone Tassel Pendant",
        "sku": "MGS-012",
        "weight": 6.76,
        "mc": 10,
        "images": img_list("mangalsutra", 12, 4),
        "featured": False,
        "desc": "Black bead mangalsutra with patterned gold beads and a distinctive textured cone tassel drop pendant with black bead tips.",
    },
    {
        "name": "Mangalsutra with Cylindrical Gold Pendant",
        "sku": "MGS-013",
        "weight": 6.44,
        "mc": 10,
        "images": img_list("mangalsutra", 13, 3),
        "featured": False,
        "desc": "Black bead mangalsutra with plain gold chain lower section and a decorative cylindrical gold pendant with tassel and bead drop.",
    },
]

RINGS_PRODUCTS = [
    {
        "name": "Square Gold Ring with Filigree Jali Work",
        "sku": "RNG-R01",
        "weight": 7.66,
        "mc": 15,
        "images": img_list("rings", 1, 1),
        "featured": True,
        "desc": "Bold square gold ring with intricate filigree jali mesh work and bead border. Unique handcrafted piece.",
    },
]


# ── Seed logic ───────────────────────────────────────────────────────────────

async def seed():
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        async with session.begin():
            await _seed(session)

    await engine.dispose()
    print("\nSeed complete.")


async def _seed(session: AsyncSession):
    # 1. Deactivate old fictional products in target categories (preserves order history)
    print("Deactivating old fictional products in target categories...")
    for slug in CATEGORIES_TO_CLEAR:
        result = await session.execute(select(Category).where(Category.slug == slug))
        cat = result.scalar_one_or_none()
        if cat:
            old_result = await session.execute(
                select(Product).where(Product.category_id == cat.id, Product.is_active == True)
            )
            old_products = old_result.scalars().all()
            for op in old_products:
                op.is_active = False
            print(f"  Deactivated {len(old_products)} old products in '{slug}'")

    # 2. Create or update 'Haar & Necklace Sets' category
    result = await session.execute(
        select(Category).where(Category.slug == NEW_CATEGORY["slug"])
    )
    haar_cat = result.scalar_one_or_none()
    if not haar_cat:
        haar_cat = Category(
            name=NEW_CATEGORY["name"],
            slug=NEW_CATEGORY["slug"],
            image_url=NEW_CATEGORY["image_url"],
            display_order=NEW_CATEGORY["display_order"],
            is_active=True,
        )
        session.add(haar_cat)
        await session.flush()
        print(f"  Created category '{NEW_CATEGORY['name']}'")
    else:
        haar_cat.image_url = NEW_CATEGORY["image_url"]
        print(f"  Updated category '{NEW_CATEGORY['name']}'")

    # 3. Update category thumbnails for categories that have real photos
    for slug, thumb_url in CATEGORY_THUMB_UPDATES.items():
        result = await session.execute(select(Category).where(Category.slug == slug))
        cat = result.scalar_one_or_none()
        if cat:
            cat.image_url = thumb_url
            print(f"  Updated thumbnail for '{slug}'")

    await session.flush()

    # 4. Fetch category IDs needed
    cats = {}
    for slug in [*CATEGORIES_TO_CLEAR, NEW_CATEGORY["slug"]]:
        result = await session.execute(select(Category).where(Category.slug == slug))
        cat = result.scalar_one_or_none()
        if cat:
            cats[slug] = cat.id

    # 5. Create all real products
    all_batches = [
        ("chain",              cats.get("chain"),               CHAIN_PRODUCTS),
        ("bangles",            cats.get("bangles"),             BANGLES_PRODUCTS),
        ("earrings",          cats.get("earrings"),            EARRINGS_PRODUCTS),
        ("haar-necklace-sets", cats.get("haar-necklace-sets"), HAAR_PRODUCTS),
        ("mangalsutra",        cats.get("mangalsutra"),         MANGALSUTRA_PRODUCTS),
        ("rings",              cats.get("rings"),               RINGS_PRODUCTS),
    ]

    total = 0
    for cat_slug, cat_id, products in all_batches:
        if not cat_id:
            print(f"  SKIP: category '{cat_slug}' not found in DB")
            continue
        print(f"\nSeeding {len(products)} products in '{cat_slug}'...")
        for p in products:
            weight = p["weight"]
            mc_pct = p["mc"]
            base_price = round(weight * 7500 * (1 + mc_pct / 100) * 1.03)

            # Upsert by SKU: update existing product instead of inserting duplicate
            existing = await session.execute(select(Product).where(Product.sku == p["sku"]))
            product = existing.scalar_one_or_none()
            if product:
                product.name = p["name"]
                product.slug = slugify(p["name"]) + "-" + p["sku"].lower()
                product.category_id = cat_id
                product.description = p["desc"]
                product.weight_grams = weight
                product.base_price = base_price
                product.making_charge_value = mc_pct
                product.is_active = True
                product.is_featured = p.get("featured", False)
                # Remove old images and replace
                old_imgs = await session.execute(
                    select(ProductImage).where(ProductImage.product_id == product.id)
                )
                for img_row in old_imgs.scalars().all():
                    await session.delete(img_row)
                await session.flush()
                print(f"  ~ updated {p['name']} ({weight}g)")
            else:
                product = Product(
                    name=p["name"],
                    slug=slugify(p["name"]) + "-" + p["sku"].lower(),
                    category_id=cat_id,
                    description=p["desc"],
                    material="gold",
                    purity="22K",
                    weight_grams=weight,
                    base_price=base_price,
                    making_charge_type="percentage",
                    making_charge_value=mc_pct,
                    sku=p["sku"],
                    stock_quantity=1,
                    is_active=True,
                    is_featured=p.get("featured", False),
                )
                session.add(product)
                await session.flush()
                print(f"  + {p['name']} ({weight}g)")

            for i, url in enumerate(p["images"]):
                img_obj = ProductImage(
                    product_id=product.id,
                    image_url=url,
                    display_order=i,
                    is_primary=(i == 0),
                )
                session.add(img_obj)

            total += 1

    await session.flush()
    print(f"\nCreated {total} real products with verified jewellery photos.")


if __name__ == "__main__":
    asyncio.run(seed())
