"""
Shared catalog data for Rajesh Jewellers seeding.

- IMG: verified, content-checked Unsplash image IDs (each visually confirmed to
  show the right kind of jewellery; dead/irrelevant IDs were removed).
- FALLBACK_RATES: ₹/gram used only if the live gold-rate feed is unreachable.
- MAKING_BY_MATERIAL / MAKING_OVERRIDES: making-charge defaults.
- CATEGORY_IMAGES: correct image set per category (used to fix existing rows).
- NEW_PRODUCTS: the catalog expansion (added on top of the original 30).
- EXISTING_CARATS / product "carats": which items offer selectable karats.
"""

def u(image_id: str) -> str:
    return f"https://images.unsplash.com/photo-{image_id}?w=800&q=80"


# ── Verified image pool (visually classified) ───────────────────────────────
IMG = {
    # rings
    "ring_pink":       "1603561591411-07134e71a2a9",  # pink sapphire rose-gold ring
    "ring_solitaire":  "1605100804763-247f67b3557e",  # solitaire diamond ring
    "ring_coral":      "1608042314453-ae338d80c427",  # coral/turquoise gemstone rings
    "ring_cocktail":   "1611955167811-4711904bb9f8",  # champagne cocktail ring
    # earrings
    "ear_diamond":     "1535632066927-ab7c9ab60908",  # sapphire+diamond drop earrings
    "ear_blue":        "1630019852942-f89202989a59",  # blue heart earrings, gold hooks
    "ear_hoop_gold":   "1584302179602-e4c3d3fd629d",  # gold hoop earrings
    "ear_hoop_rose":   "1608508644127-ba99d7732fee",  # rose-gold hoop earrings
    "ear_gold":        "1617038220319-276d3cfab638",  # gold earrings on stone
    # chains / necklaces
    "chain_crescent":  "1599643478518-a784e5dc4c8f",  # gold necklace w/ crescent + gem
    "chain_bracelet":  "1602173574767-37ac01994b2a",  # gold chain-link bracelet
    "chain_hanging":   "1506630448388-4e683c67ddb0",  # hanging gold/diamond pendants
    "necklace_bridal": "1601121141461-9d6647bca1ed",  # ornate gold bridal necklace w/ rubies
    "necklace_worn":   "1620656798579-1984d9e87df7",  # crescent gold necklace (worn)
    "necklace_diamond":"1611652022419-a9419f74343d",  # diamond solitaire necklace
    # bangles / bracelets
    "bangle_tennis":   "1611591437281-460bfbe1220a",  # rose-gold tennis bracelet
    "bangle_wrist":    "1596944924616-7b38e7cfac36",  # stacked bracelets on wrist
    "bangle_pearl":    "1515562141207-7a88fb7ce338",  # pearl bracelet in box
    "bangle_diamond":  "1619119069152-a2b331eb392a",  # diamond tennis bracelet
    # pendants
    "pend_diamond":    "1588444837495-c6cfeb53f32d",  # diamond heart pendant
    "pend_gold":       "1611085583191-a3b181a88401",  # simple gold pendant necklace
    "pend_gem":        "1602751584552-8ba73aad10e1",  # gemstone floral pendant
    "pend_rose":       "1610694955371-d4a3e0ce4b52",  # rose-gold diamond pendant
    # coins / bars / gifting
    "gold_bars":       "1610375461246-83df859d849d",  # fine gold bars
    "gold_coins":      "1624365169364-0640dd10e180",  # gold coins + bars
    "gift_box":        "1512909006721-3d6018887383",  # wrapped gift
    "gift_pink":       "1549465220-1a8b9238cd48",     # pink gift box, gold ribbon
    # kundan / polki — verified via unsplash.com/photos/ID
    "kundan_rings":    "1758995116121-60090f17ae20",  # ornate gold rings on cushioned stands
    "kundan_earring":  "1765233200117-1cb460a71fa9",  # gold filigree medallion earrings
    "kundan_earring2": "1671642883395-0ab89c3ac890",  # red-white Indian earrings on wood
    "polki_rings":     "1543294001-f7cd5d7fb516",     # three gold gemstone-set rings
    # imitation / fashion jewelry
    "imit_fashion":    "1569388330338-53ecda03dfa1",  # gold-toned fashion accessories
    "imit_necklace":   "1561060511-78b14b799fe1",     # multi-gemstone bib necklace
    "imit_set":        "1660860547079-fd4845880af9",  # mixed jewelry flat-lay on table
    # platinum / white gold
    "plat_ring":       "1550368566-f9cc32d7392d",     # silver/platinum wedding rings
    "plat_bracelet":   "1573408301185-9146fe634ad0",  # silver bracelet with clear gemstones
}

# Correct image choices per category (first is the default/primary candidate set).
CATEGORY_IMAGES = {
    # primary image used as the category tile/banner
    "rings":        ["ring_pink", "ring_coral", "ring_cocktail"],
    "earrings":     ["ear_diamond", "ear_hoop_gold", "ear_gold"],
    "stud":         ["ear_gold", "ear_diamond", "ear_blue"],       # stud = small gold earring
    "chain":        ["chain_crescent", "chain_hanging", "chain_bracelet"],
    "bangles":      ["bangle_tennis", "bangle_wrist", "bangle_diamond"],  # tennis bracelet = bangle style
    "pendants":     ["pend_gold", "pend_diamond", "pend_gem"],
    "mangalsutra":  ["necklace_bridal", "necklace_worn", "chain_crescent"],
    "solitaires":   ["ring_solitaire", "necklace_diamond", "pend_diamond"],
    "murti":        ["gold_coins", "gold_bars"],       # gold stand-in (no idol photo available)
    "gifting":      ["gift_box", "gift_pink", "gold_coins"],
    "mens-jewelry": ["chain_bracelet", "chain_hanging", "ring_cocktail"],
}

# ── Fallback ₹/gram (only used when the live feed fails) ─────────────────────
FALLBACK_RATES = [
    ("gold", "24K", 12800), ("gold", "22K", 11730), ("gold", "18K", 9600), ("gold", "14K", 7460),
    ("silver", "925", 185),
    ("platinum", "950", 4860), ("platinum", "900", 4600),
]

# ── Making charges ───────────────────────────────────────────────────────────
# default per material: (type, value)
MAKING_BY_MATERIAL = {
    "gold": ("percentage", 12),
    "silver": ("per_gram", 25),
    "platinum": ("percentage", 10),
    "diamond": ("percentage", 0),   # diamonds are priced statically anyway
}
# name-keyword overrides (coins/bars/biscuits carry a small flat charge, not 12%)
MAKING_KEYWORD_OVERRIDES = [
    (("coin", "biscuit", "bar", "murti", "idol"), ("percentage", 3)),
]

# Which materials/categories offer selectable karats. Coins/bars excluded (pure form).
CARAT_CHOICES = ["18K", "22K", "24K"]
CARAT_CATEGORIES = {"rings", "chain", "bangles", "pendants", "mangalsutra"}


# ── Catalog expansion — added on top of the original 30 (upsert by SKU) ──────
# fields: name, slug, cat, material, purity, weight, sku, stock, featured, imgs(keys), desc, [carats]
NEW_PRODUCTS = [
    # ---------- RINGS ----------
    {"name": "Rose Gold Halo Ring", "slug": "rose-gold-halo-ring-101", "cat": "rings", "material": "gold", "purity": "18K", "weight": 3.6, "sku": "RNG101", "stock": 14, "featured": True,
     "imgs": ["ring_pink", "ring_cocktail"], "desc": "18K rose gold halo ring with a pink centre stone framed by pave detailing.", "carats": ["18K", "22K"]},
    {"name": "Classic Gold Engagement Ring", "slug": "classic-gold-engagement-ring-102", "cat": "rings", "material": "gold", "purity": "22K", "weight": 4.8, "sku": "RNG102", "stock": 10, "featured": False,
     "imgs": ["ring_coral", "ring_pink"], "desc": "Timeless 22K gold engagement ring with a smooth polished band.", "carats": ["18K", "22K", "24K"]},
    {"name": "Champagne Cocktail Ring", "slug": "champagne-cocktail-ring-103", "cat": "rings", "material": "gold", "purity": "18K", "weight": 5.5, "sku": "RNG103", "stock": 7, "featured": True,
     "imgs": ["ring_cocktail"], "desc": "Statement cocktail ring in 18K gold set with champagne-hued marquise stones."},
    {"name": "Turquoise Gemstone Ring", "slug": "turquoise-gemstone-ring-104", "cat": "rings", "material": "gold", "purity": "18K", "weight": 3.2, "sku": "RNG104", "stock": 16, "featured": False,
     "imgs": ["ring_coral"], "desc": "18K gold ring with turquoise and coral gemstones for a vibrant everyday look."},

    # ---------- EARRINGS ----------
    {"name": "Gold Hoop Earrings Classic", "slug": "gold-hoop-earrings-classic-105", "cat": "earrings", "material": "gold", "purity": "22K", "weight": 3.0, "sku": "EAR101", "stock": 22, "featured": True,
     "imgs": ["ear_hoop_gold", "ear_hoop_rose"], "desc": "Classic 22K gold hoop earrings — light, everyday elegance."},
    {"name": "Rose Gold Huggie Hoops", "slug": "rose-gold-huggie-hoops-106", "cat": "earrings", "material": "gold", "purity": "18K", "weight": 2.4, "sku": "EAR102", "stock": 20, "featured": False,
     "imgs": ["ear_hoop_rose"], "desc": "Petite 18K rose gold huggie hoops that pair with any outfit."},
    {"name": "Sapphire Drop Earrings", "slug": "sapphire-drop-earrings-107", "cat": "earrings", "material": "gold", "purity": "18K", "weight": 4.1, "sku": "EAR103", "stock": 11, "featured": True,
     "imgs": ["ear_diamond", "ear_blue"], "desc": "18K gold drop earrings with sapphire-blue stones and a delicate finish."},
    {"name": "Blue Heart Drop Earrings", "slug": "blue-heart-drop-earrings-108", "cat": "earrings", "material": "gold", "purity": "18K", "weight": 2.2, "sku": "EAR104", "stock": 18, "featured": False,
     "imgs": ["ear_blue"], "desc": "Charming heart-shaped blue stone earrings on 18K gold hooks."},

    # ---------- CHAIN ----------
    {"name": "Gold Crescent Chain Necklace", "slug": "gold-crescent-chain-necklace-109", "cat": "chain", "material": "gold", "purity": "22K", "weight": 10.5, "sku": "CHN101", "stock": 12, "featured": True,
     "imgs": ["chain_crescent", "chain_hanging"], "desc": "22K gold chain necklace with a crescent gemstone pendant, 18 inches.", "carats": ["18K", "22K"]},
    {"name": "Layered Gold Pendant Chain", "slug": "layered-gold-pendant-chain-110", "cat": "chain", "material": "gold", "purity": "18K", "weight": 7.8, "sku": "CHN102", "stock": 15, "featured": False,
     "imgs": ["chain_hanging", "chain_crescent"], "desc": "Delicate layered 18K gold chain with mixed pendants.", "carats": ["18K", "22K"]},
    {"name": "Gold Link Bracelet Chain", "slug": "gold-link-bracelet-chain-111", "cat": "chain", "material": "gold", "purity": "22K", "weight": 9.0, "sku": "CHN103", "stock": 13, "featured": False,
     "imgs": ["chain_bracelet"], "desc": "Bold 22K gold link bracelet chain with a secure clasp.", "carats": ["18K", "22K", "24K"]},

    # ---------- BANGLES ----------
    {"name": "Rose Gold Tennis Bracelet", "slug": "rose-gold-tennis-bracelet-112", "cat": "bangles", "material": "gold", "purity": "18K", "weight": 11.5, "sku": "BNG101", "stock": 9, "featured": True,
     "imgs": ["bangle_tennis"], "desc": "18K rose gold tennis bracelet lined with sparkling stones.", "carats": ["18K", "22K"]},
    {"name": "Stacked Gold Bangle Set", "slug": "stacked-gold-bangle-set-113", "cat": "bangles", "material": "gold", "purity": "22K", "weight": 24.0, "sku": "BNG102", "stock": 6, "featured": True,
     "imgs": ["bangle_wrist"], "desc": "Set of stackable 22K gold bangles for a layered festive look.", "carats": ["18K", "22K"]},
    {"name": "Pearl & Gold Bracelet", "slug": "pearl-gold-bracelet-114", "cat": "bangles", "material": "gold", "purity": "18K", "weight": 8.5, "sku": "BNG103", "stock": 14, "featured": False,
     "imgs": ["bangle_pearl"], "desc": "18K gold bracelet strung with lustrous freshwater pearls."},
    {"name": "Diamond Tennis Bracelet", "slug": "diamond-tennis-bracelet-115", "cat": "bangles", "material": "diamond", "purity": "18K", "weight": 9.8, "base": 138000, "disc": 124000, "sku": "BNG104", "stock": 4, "featured": True,
     "imgs": ["bangle_diamond"], "desc": "18K gold diamond tennis bracelet, 2.0 ct total, IGI certified."},

    # ---------- PENDANTS ----------
    {"name": "Gold Drop Pendant", "slug": "gold-drop-pendant-116", "cat": "pendants", "material": "gold", "purity": "22K", "weight": 3.2, "sku": "PND101", "stock": 20, "featured": False,
     "imgs": ["pend_gold"], "desc": "Minimal 22K gold drop pendant on a fine chain.", "carats": ["18K", "22K"]},
    {"name": "Gemstone Floral Pendant", "slug": "gemstone-floral-pendant-117", "cat": "pendants", "material": "gold", "purity": "18K", "weight": 4.0, "sku": "PND102", "stock": 12, "featured": True,
     "imgs": ["pend_gem"], "desc": "18K gold floral pendant set with multi-colour gemstones."},
    {"name": "Rose Gold Diamond Pendant", "slug": "rose-gold-diamond-pendant-118", "cat": "pendants", "material": "diamond", "purity": "18K", "weight": 2.0, "base": 41000, "disc": 37000, "sku": "PND103", "stock": 8, "featured": False,
     "imgs": ["pend_rose"], "desc": "0.3 ct diamond pendant in 18K rose gold, IGI certified."},

    # ---------- MANGALSUTRA ----------
    {"name": "Ruby Bridal Mangalsutra", "slug": "ruby-bridal-mangalsutra-119", "cat": "mangalsutra", "material": "gold", "purity": "22K", "weight": 12.0, "sku": "MNG101", "stock": 8, "featured": True,
     "imgs": ["necklace_bridal", "chain_crescent"], "desc": "Ornate 22K gold bridal mangalsutra with ruby accents and black beads.", "carats": ["18K", "22K"]},
    {"name": "Delicate Gold Mangalsutra", "slug": "delicate-gold-mangalsutra-120", "cat": "mangalsutra", "material": "gold", "purity": "18K", "weight": 6.5, "sku": "MNG102", "stock": 15, "featured": False,
     "imgs": ["necklace_worn", "chain_crescent"], "desc": "Everyday 18K gold mangalsutra with a slim chain and small pendant.", "carats": ["18K", "22K"]},

    # ---------- SOLITAIRES ----------
    {"name": "Diamond Solitaire Necklace", "slug": "diamond-solitaire-necklace-121", "cat": "solitaires", "material": "diamond", "purity": "18K", "weight": 2.5, "base": 96000, "disc": None, "sku": "SOL101", "stock": 5, "featured": True,
     "imgs": ["necklace_diamond", "pend_diamond"], "desc": "0.5 ct solitaire diamond necklace in 18K white gold, IGI certified."},
    {"name": "Round Brilliant Solitaire Ring 0.7ct", "slug": "round-solitaire-ring-07-122", "cat": "solitaires", "material": "diamond", "purity": "18K", "weight": 4.0, "base": 142000, "disc": None, "sku": "SOL102", "stock": 3, "featured": True,
     "imgs": ["ring_solitaire"], "desc": "0.7 ct round brilliant solitaire, VS1 clarity, F colour, in 18K gold."},

    # ---------- MURTI ----------
    {"name": "Lakshmi Gold Coin 2g 24K", "slug": "lakshmi-gold-coin-2g-24k-123", "cat": "murti", "material": "gold", "purity": "24K", "weight": 2.0, "sku": "MRT101", "stock": 40, "featured": False,
     "imgs": ["gold_coins"], "desc": "2g 24K gold coin with Lakshmi embossing. BIS hallmarked, gift boxed."},
    {"name": "Silver Puja Thali Set", "slug": "silver-puja-thali-set-124", "cat": "murti", "material": "silver", "purity": "925", "weight": 180.0, "sku": "MRT102", "stock": 6, "featured": False,
     "imgs": ["gold_bars"], "desc": "925 sterling silver puja thali set for home temple and festive occasions."},

    # ---------- GIFTING ----------
    {"name": "Gold Coin 2g 24K", "slug": "gold-coin-2g-24k-125", "cat": "gifting", "material": "gold", "purity": "24K", "weight": 2.0, "sku": "GFT101", "stock": 50, "featured": False,
     "imgs": ["gold_coins"], "desc": "2g 24K gold coin, BIS hallmarked, in a gift box — perfect for occasions."},
    {"name": "Gold Bar 20g 24K", "slug": "gold-bar-20g-24k-126", "cat": "gifting", "material": "gold", "purity": "24K", "weight": 20.0, "sku": "GFT102", "stock": 12, "featured": True,
     "imgs": ["gold_bars"], "desc": "20g 24K gold bar, MMTC-PAMP certified with assay card."},
    {"name": "Gold Coin 1g 24K", "slug": "gold-coin-1g-24k-127", "cat": "gifting", "material": "gold", "purity": "24K", "weight": 1.0, "sku": "GFT103", "stock": 60, "featured": False,
     "imgs": ["gold_coins"], "desc": "1g 24K gold coin — a thoughtful, affordable gift of pure gold."},

    # ---------- STUD ----------
    {"name": "Gold Ball Stud Earrings", "slug": "gold-ball-stud-earrings-128", "cat": "stud", "material": "gold", "purity": "22K", "weight": 1.4, "sku": "STD101", "stock": 30, "featured": False,
     "imgs": ["ear_gold"], "desc": "Classic 22K gold ball studs — the everyday essential."},
    {"name": "Diamond Halo Studs 0.4ct", "slug": "diamond-halo-studs-04-129", "cat": "stud", "material": "diamond", "purity": "18K", "weight": 1.6, "base": 39000, "disc": 35000, "sku": "STD102", "stock": 10, "featured": True,
     "imgs": ["ear_diamond"], "desc": "0.4 ct total diamond halo stud earrings in 18K gold, IGI certified."},

    # ---------- MEN'S ----------
    {"name": "Men's Gold Chain Bracelet", "slug": "mens-gold-chain-bracelet-130", "cat": "mens-jewelry", "material": "gold", "purity": "22K", "weight": 14.0, "sku": "MNS101", "stock": 10, "featured": True,
     "imgs": ["chain_bracelet"], "desc": "Bold 22K gold link bracelet for men with a heavy, masculine feel.", "carats": ["18K", "22K"]},
    {"name": "Men's Gold Signet Ring", "slug": "mens-gold-signet-ring-131", "cat": "mens-jewelry", "material": "gold", "purity": "22K", "weight": 9.0, "sku": "MNS102", "stock": 12, "featured": False,
     "imgs": ["ring_solitaire"], "desc": "22K gold signet ring for men with a flat polished face."},

    # ══════════════════════════════════════════════════════════════════════════
    # EXTENDED CATALOG — 81 additional products across all 11 categories
    # base price = metal cost + making charges at current fallback rates
    # ══════════════════════════════════════════════════════════════════════════

    # ─────────────── RINGS (12 new) ───────────────
    {"name": "Meenakari Enamel Ring", "slug": "meenakari-enamel-ring-201", "cat": "rings", "material": "gold", "purity": "22K", "weight": 5.0, "base": 65000, "disc": 59500, "sku": "RNG201", "stock": 12, "featured": True,
     "imgs": ["ring_cocktail", "ring_pink"], "desc": "22K gold ring with vibrant meenakari enamel work. Traditional Rajasthani design, BIS hallmarked.", "carats": ["18K", "22K"]},

    {"name": "Temple Design Gold Ring", "slug": "temple-design-gold-ring-202", "cat": "rings", "material": "gold", "purity": "22K", "weight": 4.0, "base": 52000, "disc": 47500, "sku": "RNG202", "stock": 10, "featured": False,
     "imgs": ["ring_coral", "ring_cocktail"], "desc": "22K gold ring with intricate temple-motif carving. South Indian-style craftsmanship.", "carats": ["18K", "22K"]},

    {"name": "Antique Oxidised Gold Ring", "slug": "antique-oxidised-gold-ring-203", "cat": "rings", "material": "gold", "purity": "22K", "weight": 3.5, "base": 45500, "disc": 41500, "sku": "RNG203", "stock": 14, "featured": False,
     "imgs": ["ring_cocktail"], "desc": "22K gold ring with antique oxidised finish and beadwork border. Bohemian ethnic charm.", "carats": ["18K", "22K"]},

    {"name": "Emerald Gemstone Ring", "slug": "emerald-gemstone-ring-204", "cat": "rings", "material": "gold", "purity": "18K", "weight": 3.0, "base": 42000, "disc": 38000, "sku": "RNG204", "stock": 9, "featured": True,
     "imgs": ["ring_coral", "ring_pink"], "desc": "18K gold ring set with a natural emerald centre stone. Oval cut, 0.5 ct."},

    {"name": "Ruby Solitaire Ring", "slug": "ruby-solitaire-ring-205", "cat": "rings", "material": "gold", "purity": "18K", "weight": 3.0, "base": 45000, "disc": 41000, "sku": "RNG205", "stock": 8, "featured": True,
     "imgs": ["ring_coral", "ring_cocktail"], "desc": "18K gold ring with a vibrant natural ruby centre stone. Lab-certified stone."},

    {"name": "Three Stone Diamond Ring", "slug": "three-stone-diamond-ring-206", "cat": "rings", "material": "diamond", "purity": "18K", "weight": 3.2, "base": 68000, "disc": 61500, "sku": "RNG206", "stock": 6, "featured": True,
     "imgs": ["ring_solitaire", "ring_pink"], "desc": "18K gold ring with three-stone diamond setting, 0.3 ct total. IGI certified."},

    {"name": "Kundan Bridal Ring Set", "slug": "kundan-bridal-ring-set-207", "cat": "rings", "material": "gold", "purity": "22K", "weight": 6.0, "base": 78000, "disc": 71500, "sku": "RNG207", "stock": 7, "featured": False,
     "imgs": ["ring_cocktail", "ring_coral"], "desc": "22K gold bridal ring set with elaborate kundan stone setting. Sold as a pair."},

    {"name": "Twisted Gold Band Ring", "slug": "twisted-gold-band-ring-208", "cat": "rings", "material": "gold", "purity": "22K", "weight": 3.0, "base": 39000, "disc": 35500, "sku": "RNG208", "stock": 18, "featured": False,
     "imgs": ["ring_pink"], "desc": "22K gold twisted rope band ring. Classic design, polished finish.", "carats": ["18K", "22K", "24K"]},

    {"name": "Sapphire Halo Ring", "slug": "sapphire-halo-ring-209", "cat": "rings", "material": "gold", "purity": "18K", "weight": 3.5, "base": 52000, "disc": 47500, "sku": "RNG209", "stock": 8, "featured": False,
     "imgs": ["ring_coral", "ring_solitaire"], "desc": "18K gold ring with a blue sapphire halo, surrounded by micro-pave diamonds."},

    {"name": "Silver Oxidised Ethnic Ring", "slug": "silver-oxidised-ethnic-ring-210", "cat": "rings", "material": "silver", "purity": "925", "weight": 4.0, "base": 2500, "disc": 1999, "sku": "RNG210", "stock": 30, "featured": False,
     "imgs": ["ring_coral"], "desc": "925 sterling silver oxidised ring with tribal motif. Bohemian everyday wear."},

    {"name": "Gold Pinky Ring Slim", "slug": "gold-pinky-ring-slim-211", "cat": "rings", "material": "gold", "purity": "18K", "weight": 1.5, "base": 16000, "disc": 14500, "sku": "RNG211", "stock": 22, "featured": False,
     "imgs": ["ring_pink"], "desc": "Slim 18K gold pinky ring. Minimal design for daily stack-wear.", "carats": ["18K", "22K"]},

    {"name": "Platinum Diamond Ring", "slug": "platinum-diamond-ring-212", "cat": "rings", "material": "diamond", "purity": "18K", "weight": 4.0, "base": 72000, "disc": None, "sku": "RNG212", "stock": 5, "featured": True,
     "imgs": ["ring_solitaire", "ring_pink"], "desc": "0.2 ct diamond set in 18K white gold with platinum-look rhodium plating. IGI certified."},

    # ─────────────── EARRINGS (10 new) ───────────────
    {"name": "Traditional Gold Jhumka", "slug": "traditional-gold-jhumka-213", "cat": "earrings", "material": "gold", "purity": "22K", "weight": 7.0, "base": 91000, "disc": 83500, "sku": "EAR201", "stock": 10, "featured": True,
     "imgs": ["ear_diamond", "ear_gold"], "desc": "Classic 22K gold jhumka with intricate filigree work and hanging pearl drops. Festive essential."},

    {"name": "Chandbali Gold Earrings", "slug": "chandbali-gold-earrings-214", "cat": "earrings", "material": "gold", "purity": "22K", "weight": 6.0, "base": 78000, "disc": 71500, "sku": "EAR202", "stock": 9, "featured": True,
     "imgs": ["ear_diamond", "ear_hoop_rose"], "desc": "22K gold chandbali earrings with crescent design and dangling gold drops. Bridal favourite."},

    {"name": "Oxidised Silver Chandbali", "slug": "oxidised-silver-chandbali-215", "cat": "earrings", "material": "silver", "purity": "925", "weight": 12.0, "base": 4500, "disc": 3999, "sku": "EAR203", "stock": 25, "featured": False,
     "imgs": ["ear_blue", "ear_hoop_rose"], "desc": "925 sterling silver oxidised chandbali earrings. Ethnic design with mirror work."},

    {"name": "Temple Kaan Earrings", "slug": "temple-kaan-earrings-216", "cat": "earrings", "material": "gold", "purity": "22K", "weight": 5.0, "base": 65000, "disc": 59500, "sku": "EAR204", "stock": 11, "featured": False,
     "imgs": ["ear_gold", "ear_diamond"], "desc": "22K gold temple-style kaan earrings with goddess motif. South Indian traditional design."},

    {"name": "Ruby Drop Earrings 18K", "slug": "ruby-drop-earrings-18k-217", "cat": "earrings", "material": "gold", "purity": "18K", "weight": 3.0, "base": 48000, "disc": 43500, "sku": "EAR205", "stock": 8, "featured": False,
     "imgs": ["ear_diamond", "ear_blue"], "desc": "18K gold drop earrings set with natural ruby briolettes. Elegant evening wear."},

    {"name": "Emerald Chandelier Earrings", "slug": "emerald-chandelier-earrings-218", "cat": "earrings", "material": "gold", "purity": "18K", "weight": 4.0, "base": 58000, "disc": 52500, "sku": "EAR206", "stock": 7, "featured": True,
     "imgs": ["ear_diamond", "ear_hoop_gold"], "desc": "18K gold chandelier earrings with emerald drops and diamond accents."},

    {"name": "Pearl Jhumka 18K Gold", "slug": "pearl-jhumka-18k-gold-219", "cat": "earrings", "material": "gold", "purity": "18K", "weight": 4.0, "base": 38000, "disc": 34500, "sku": "EAR207", "stock": 12, "featured": False,
     "imgs": ["ear_gold", "ear_hoop_rose"], "desc": "18K gold jhumka with South Sea pearl drops. Sophisticated and lightweight."},

    {"name": "Polki Uncut Diamond Earrings", "slug": "polki-uncut-diamond-earrings-220", "cat": "earrings", "material": "gold", "purity": "22K", "weight": 8.0, "base": 115000, "disc": 105500, "sku": "EAR208", "stock": 5, "featured": True,
     "imgs": ["ear_diamond", "ear_gold"], "desc": "22K gold earrings with uncut polki diamonds in traditional Mughal setting."},

    {"name": "Antique Gold Dangle Earrings", "slug": "antique-gold-dangle-earrings-221", "cat": "earrings", "material": "gold", "purity": "22K", "weight": 5.0, "base": 65000, "disc": 59500, "sku": "EAR209", "stock": 10, "featured": False,
     "imgs": ["ear_gold", "ear_hoop_gold"], "desc": "22K gold dangle earrings with antique finish and layered design. Heritage style."},

    {"name": "Three-Layer Gold Chandbali", "slug": "three-layer-gold-chandbali-222", "cat": "earrings", "material": "gold", "purity": "22K", "weight": 9.0, "base": 117000, "disc": 107000, "sku": "EAR210", "stock": 6, "featured": False,
     "imgs": ["ear_diamond", "ear_hoop_rose"], "desc": "22K gold three-layer chandbali earrings with ghungroo drops. Grand bridal piece."},

    # ─────────────── STUD EARRINGS (8 new) ───────────────
    {"name": "Emerald Stud Earrings 18K", "slug": "emerald-stud-earrings-18k-223", "cat": "stud", "material": "gold", "purity": "18K", "weight": 1.8, "base": 24000, "disc": 21500, "sku": "STD201", "stock": 15, "featured": False,
     "imgs": ["ear_gold", "ear_diamond"], "desc": "18K gold stud earrings set with natural oval-cut emeralds. Lab certified."},

    {"name": "Sapphire Stud Earrings 18K", "slug": "sapphire-stud-earrings-18k-224", "cat": "stud", "material": "gold", "purity": "18K", "weight": 1.5, "base": 22000, "disc": 19500, "sku": "STD202", "stock": 14, "featured": False,
     "imgs": ["ear_blue", "ear_diamond"], "desc": "18K gold stud earrings with blue sapphire centre. Classic and timeless."},

    {"name": "Kundan Stud Earrings Traditional", "slug": "kundan-stud-earrings-traditional-225", "cat": "stud", "material": "gold", "purity": "22K", "weight": 2.0, "base": 28500, "disc": 25999, "sku": "STD203", "stock": 18, "featured": False,
     "imgs": ["ear_gold"], "desc": "22K gold kundan stud earrings with meenakari back. Traditional bridal style."},

    {"name": "Silver Pearl Stud Earrings", "slug": "silver-pearl-stud-earrings-226", "cat": "stud", "material": "silver", "purity": "925", "weight": 1.5, "base": 3500, "disc": 2999, "sku": "STD204", "stock": 30, "featured": False,
     "imgs": ["ear_gold"], "desc": "925 sterling silver stud earrings with freshwater pearl. 7mm pearl size."},

    {"name": "Platinum Diamond Stud 0.5ct", "slug": "platinum-diamond-stud-05ct-227", "cat": "stud", "material": "diamond", "purity": "18K", "weight": 2.0, "base": 68000, "disc": None, "sku": "STD205", "stock": 6, "featured": True,
     "imgs": ["ear_diamond"], "desc": "0.5 ct total diamond studs in 18K white gold with platinum finish. IGI certified."},

    {"name": "Oxidised Silver Stud Earrings", "slug": "oxidised-silver-stud-earrings-228", "cat": "stud", "material": "silver", "purity": "925", "weight": 2.0, "base": 1800, "disc": 1499, "sku": "STD206", "stock": 35, "featured": False,
     "imgs": ["ear_gold"], "desc": "925 sterling silver oxidised stud earrings. Boho tribal design, hypoallergenic."},

    {"name": "Coral Stud Earrings 18K", "slug": "coral-stud-earrings-18k-229", "cat": "stud", "material": "gold", "purity": "18K", "weight": 1.5, "base": 18000, "disc": 15999, "sku": "STD207", "stock": 16, "featured": False,
     "imgs": ["ear_gold", "ear_blue"], "desc": "18K gold stud earrings with round coral cabochon. Rich red-orange colour."},

    {"name": "Multi-Gemstone Stud 18K", "slug": "multi-gemstone-stud-18k-230", "cat": "stud", "material": "gold", "purity": "18K", "weight": 2.0, "base": 25000, "disc": 22500, "sku": "STD208", "stock": 12, "featured": False,
     "imgs": ["ear_diamond", "ear_gold"], "desc": "18K gold cluster stud earrings with mixed gemstones — ruby, emerald, and sapphire."},

    # ─────────────── CHAIN (8 new) ───────────────
    {"name": "Singapore Gold Chain 22K", "slug": "singapore-gold-chain-22k-231", "cat": "chain", "material": "gold", "purity": "22K", "weight": 8.0, "base": 104000, "disc": 95500, "sku": "CHN201", "stock": 10, "featured": True,
     "imgs": ["chain_crescent", "chain_hanging"], "desc": "22K gold Singapore chain, 18 inches. Lightweight and flexible — a daily wear classic.", "carats": ["18K", "22K"]},

    {"name": "Figaro Gold Chain 22K 20 inch", "slug": "figaro-gold-chain-22k-20in-232", "cat": "chain", "material": "gold", "purity": "22K", "weight": 10.0, "base": 130000, "disc": 119500, "sku": "CHN202", "stock": 8, "featured": False,
     "imgs": ["chain_hanging", "chain_crescent"], "desc": "22K gold figaro link chain, 20 inches. Italian-inspired link pattern with lobster clasp.", "carats": ["18K", "22K"]},

    {"name": "Herringbone Gold Chain 18K", "slug": "herringbone-gold-chain-18k-233", "cat": "chain", "material": "gold", "purity": "18K", "weight": 7.0, "base": 75000, "disc": 68500, "sku": "CHN203", "stock": 9, "featured": False,
     "imgs": ["chain_crescent", "chain_bracelet"], "desc": "18K gold herringbone chain with smooth flat-weave texture. Sleek and modern.", "carats": ["18K", "22K"]},

    {"name": "Wheat Chain 22K 16 inch", "slug": "wheat-chain-22k-16in-234", "cat": "chain", "material": "gold", "purity": "22K", "weight": 9.0, "base": 117000, "disc": 107500, "sku": "CHN204", "stock": 7, "featured": False,
     "imgs": ["chain_hanging", "chain_crescent"], "desc": "22K gold spiga (wheat) chain, 16 inches. Durable twisted-link design for pendants.", "carats": ["18K", "22K"]},

    {"name": "Diamond Cut Chain 18K", "slug": "diamond-cut-chain-18k-235", "cat": "chain", "material": "gold", "purity": "18K", "weight": 6.0, "base": 64000, "disc": 58500, "sku": "CHN205", "stock": 11, "featured": False,
     "imgs": ["chain_crescent", "chain_hanging"], "desc": "18K gold diamond-cut curb chain. Faceted links for extra sparkle, 18 inches.", "carats": ["18K", "22K"]},

    {"name": "Silver Rope Chain 925 20 inch", "slug": "silver-rope-chain-925-20in-236", "cat": "chain", "material": "silver", "purity": "925", "weight": 12.0, "base": 2500, "disc": 2199, "sku": "CHN206", "stock": 28, "featured": False,
     "imgs": ["chain_hanging"], "desc": "925 sterling silver rope chain, 20 inches. Classic twisted design, anti-tarnish coating."},

    {"name": "Platinum Chain 950", "slug": "platinum-chain-950-237", "cat": "chain", "material": "platinum", "purity": "950", "weight": 8.0, "base": 42000, "disc": 38500, "sku": "CHN207", "stock": 5, "featured": False,
     "imgs": ["chain_crescent"], "desc": "950 platinum chain, 18 inches. Hypoallergenic, tarnish-proof — built for lifetime wear."},

    {"name": "Venetian Box Chain 22K", "slug": "venetian-box-chain-22k-238", "cat": "chain", "material": "gold", "purity": "22K", "weight": 7.0, "base": 91000, "disc": 83500, "sku": "CHN208", "stock": 9, "featured": False,
     "imgs": ["chain_crescent", "chain_bracelet"], "desc": "22K gold Venetian box chain, 18 inches. Square links with a smooth dressy finish.", "carats": ["18K", "22K"]},

    # ─────────────── BANGLES (10 new) ───────────────
    {"name": "Meenakari Bangle Pair 22K", "slug": "meenakari-bangle-pair-22k-239", "cat": "bangles", "material": "gold", "purity": "22K", "weight": 16.0, "base": 215000, "disc": 197000, "sku": "BNG201", "stock": 5, "featured": True,
     "imgs": ["bangle_wrist", "bangle_tennis"], "desc": "22K gold bangle pair with colourful meenakari enamel on outer face. Rajasthani heritage craft.", "carats": ["18K", "22K"]},

    {"name": "Antique Gold Kara Bangle", "slug": "antique-gold-kara-bangle-240", "cat": "bangles", "material": "gold", "purity": "22K", "weight": 20.0, "base": 260000, "disc": 238500, "sku": "BNG202", "stock": 4, "featured": False,
     "imgs": ["bangle_wrist"], "desc": "22K gold kara (rigid bangle) with antique finish and temple border. Punjabi traditional style.", "carats": ["18K", "22K"]},

    {"name": "Diamond-Set Gold Bangle", "slug": "diamond-set-gold-bangle-241", "cat": "bangles", "material": "diamond", "purity": "18K", "weight": 12.0, "base": 210000, "disc": 192500, "sku": "BNG203", "stock": 3, "featured": True,
     "imgs": ["bangle_diamond", "bangle_tennis"], "desc": "18K gold bangle with full channel-set round diamonds, 1.0 ct total. IGI certified."},

    {"name": "Oxidised Silver Bangle Set", "slug": "oxidised-silver-bangle-set-242", "cat": "bangles", "material": "silver", "purity": "925", "weight": 25.0, "base": 5200, "disc": 4699, "sku": "BNG204", "stock": 20, "featured": False,
     "imgs": ["bangle_wrist"], "desc": "Set of 4 oxidised 925 silver bangles with tribal motifs. Stack them for a statement look."},

    {"name": "Temple Gold Bangle 22K", "slug": "temple-gold-bangle-22k-243", "cat": "bangles", "material": "gold", "purity": "22K", "weight": 18.0, "base": 234000, "disc": 214500, "sku": "BNG205", "stock": 4, "featured": False,
     "imgs": ["bangle_wrist", "bangle_pearl"], "desc": "22K gold temple bangle with goddess motif and embossed border. South Indian traditional.", "carats": ["18K", "22K"]},

    {"name": "Polki Bangle Pair 22K", "slug": "polki-bangle-pair-22k-244", "cat": "bangles", "material": "gold", "purity": "22K", "weight": 22.0, "base": 305000, "disc": 279500, "sku": "BNG206", "stock": 3, "featured": True,
     "imgs": ["bangle_diamond", "bangle_wrist"], "desc": "22K gold bangle pair with uncut polki diamond setting. Mughal-era inspired bridal jewellery."},

    {"name": "Platinum Diamond Bangle", "slug": "platinum-diamond-bangle-245", "cat": "bangles", "material": "diamond", "purity": "18K", "weight": 14.0, "base": 175000, "disc": None, "sku": "BNG207", "stock": 3, "featured": False,
     "imgs": ["bangle_diamond"], "desc": "18K white gold bangle with 0.7 ct pave-set diamonds. Clean modern design. IGI certified."},

    {"name": "Kundan Bangle Set of 4", "slug": "kundan-bangle-set-of-4-246", "cat": "bangles", "material": "gold", "purity": "22K", "weight": 30.0, "base": 405000, "disc": 372000, "sku": "BNG208", "stock": 2, "featured": True,
     "imgs": ["bangle_wrist", "bangle_diamond"], "desc": "Set of 4 kundan-work 22K gold bangles. Heavy bridal set with coloured stone inlay.", "carats": ["18K", "22K"]},

    {"name": "Kids Gold Bangle Pair 22K", "slug": "kids-gold-bangle-pair-22k-247", "cat": "bangles", "material": "gold", "purity": "22K", "weight": 6.0, "base": 78000, "disc": 71500, "sku": "BNG209", "stock": 15, "featured": False,
     "imgs": ["bangle_pearl", "bangle_tennis"], "desc": "22K gold bangles for kids aged 2-8 years. Smooth inner surface, adjustable clasp.", "carats": ["18K", "22K"]},

    {"name": "Openable Kada 22K Gold", "slug": "openable-kada-22k-gold-248", "cat": "bangles", "material": "gold", "purity": "22K", "weight": 25.0, "base": 325000, "disc": 298500, "sku": "BNG210", "stock": 4, "featured": False,
     "imgs": ["bangle_wrist"], "desc": "22K gold openable kada (hinged bangle) with security clasp. Heavy traditional design.", "carats": ["18K", "22K"]},

    # ─────────────── PENDANTS (8 new) ───────────────
    {"name": "Om Gold Pendant 22K", "slug": "om-gold-pendant-22k-249", "cat": "pendants", "material": "gold", "purity": "22K", "weight": 3.0, "base": 39000, "disc": 35500, "sku": "PND201", "stock": 20, "featured": False,
     "imgs": ["pend_gold", "pend_gem"], "desc": "22K gold Om pendant with granulation work. Spiritual and stylish. BIS hallmarked.", "carats": ["18K", "22K"]},

    {"name": "Krishna Pendant Gold 22K", "slug": "krishna-pendant-gold-22k-250", "cat": "pendants", "material": "gold", "purity": "22K", "weight": 2.5, "base": 32500, "disc": 29500, "sku": "PND202", "stock": 16, "featured": False,
     "imgs": ["pend_gold", "pend_gem"], "desc": "22K gold Lord Krishna pendant with flute. Detailed hand-engraving on 22K gold."},

    {"name": "Hamsa Hand Pendant 18K", "slug": "hamsa-hand-pendant-18k-251", "cat": "pendants", "material": "gold", "purity": "18K", "weight": 2.0, "base": 21500, "disc": 19500, "sku": "PND203", "stock": 18, "featured": False,
     "imgs": ["pend_gold"], "desc": "18K gold Hamsa (Hand of Fatima) pendant with blue eye inlay. Protective talisman."},

    {"name": "Diamond Star Pendant 18K", "slug": "diamond-star-pendant-18k-252", "cat": "pendants", "material": "diamond", "purity": "18K", "weight": 1.5, "base": 34000, "disc": 30500, "sku": "PND204", "stock": 10, "featured": True,
     "imgs": ["pend_diamond", "pend_rose"], "desc": "18K gold six-point star pendant with 0.15 ct diamond centre. IGI certified."},

    {"name": "Ruby Heart Pendant 18K", "slug": "ruby-heart-pendant-18k-253", "cat": "pendants", "material": "gold", "purity": "18K", "weight": 2.0, "base": 30000, "disc": 27000, "sku": "PND205", "stock": 12, "featured": False,
     "imgs": ["pend_rose", "pend_diamond"], "desc": "18K rose gold heart pendant with natural ruby centre. Romantic gifting option."},

    {"name": "Pearl Drop Pendant 18K", "slug": "pearl-drop-pendant-18k-254", "cat": "pendants", "material": "gold", "purity": "18K", "weight": 2.5, "base": 24000, "disc": 21500, "sku": "PND206", "stock": 15, "featured": False,
     "imgs": ["pend_gold", "pend_gem"], "desc": "18K gold teardrop pendant with South Sea pearl drop. Simple and elegant."},

    {"name": "Platinum Diamond Cross Pendant", "slug": "platinum-diamond-cross-pendant-255", "cat": "pendants", "material": "diamond", "purity": "18K", "weight": 2.5, "base": 48000, "disc": None, "sku": "PND207", "stock": 6, "featured": False,
     "imgs": ["pend_diamond"], "desc": "18K white gold cross pendant with 0.2 ct pave diamonds. Rhodium-plated platinum finish."},

    {"name": "Silver Lotus Pendant 925", "slug": "silver-lotus-pendant-925-256", "cat": "pendants", "material": "silver", "purity": "925", "weight": 5.0, "base": 2200, "disc": 1799, "sku": "PND208", "stock": 35, "featured": False,
     "imgs": ["pend_gold"], "desc": "925 sterling silver lotus pendant. Hand-crafted with detailed petal work."},

    # ─────────────── MANGALSUTRA (6 new) ───────────────
    {"name": "Short Modern Mangalsutra 18K", "slug": "short-modern-mangalsutra-18k-257", "cat": "mangalsutra", "material": "diamond", "purity": "18K", "weight": 5.0, "base": 55000, "disc": 49500, "sku": "MNG201", "stock": 8, "featured": True,
     "imgs": ["necklace_worn", "necklace_diamond"], "desc": "14-inch short mangalsutra in 18K white gold with 0.25 ct diamond pendant. Modern everyday style.", "carats": ["18K", "22K"]},

    {"name": "Vati Mangalsutra 22K", "slug": "vati-mangalsutra-22k-258", "cat": "mangalsutra", "material": "gold", "purity": "22K", "weight": 8.0, "base": 104000, "disc": 95500, "sku": "MNG202", "stock": 7, "featured": False,
     "imgs": ["necklace_bridal", "necklace_worn"], "desc": "22K gold vati mangalsutra with traditional vati (cup-shaped) pendant and black beads.", "carats": ["18K", "22K"]},

    {"name": "Pendant Mangalsutra 22K Diamond", "slug": "pendant-mangalsutra-22k-diamond-259", "cat": "mangalsutra", "material": "gold", "purity": "22K", "weight": 7.0, "base": 112000, "disc": 102500, "sku": "MNG203", "stock": 6, "featured": True,
     "imgs": ["necklace_bridal", "chain_crescent"], "desc": "22K gold mangalsutra with diamond-set pendant. 0.3 ct total, IGI certified. 18-inch chain.", "carats": ["18K", "22K"]},

    {"name": "Thushi Mangalsutra 22K", "slug": "thushi-mangalsutra-22k-260", "cat": "mangalsutra", "material": "gold", "purity": "22K", "weight": 6.0, "base": 78000, "disc": 71500, "sku": "MNG204", "stock": 9, "featured": False,
     "imgs": ["necklace_worn", "chain_crescent"], "desc": "22K gold thushi (choker mangalsutra) with black beads and layered chain design.", "carats": ["18K", "22K"]},

    {"name": "Long Beaded Mangalsutra 22K", "slug": "long-beaded-mangalsutra-22k-261", "cat": "mangalsutra", "material": "gold", "purity": "22K", "weight": 11.0, "base": 143000, "disc": 131000, "sku": "MNG205", "stock": 5, "featured": False,
     "imgs": ["necklace_bridal", "necklace_worn"], "desc": "22K gold 24-inch long mangalsutra with double-row black bead chain. Traditional North Indian style.", "carats": ["18K", "22K"]},

    {"name": "Platinum Diamond Mangalsutra", "slug": "platinum-diamond-mangalsutra-262", "cat": "mangalsutra", "material": "diamond", "purity": "18K", "weight": 6.0, "base": 80000, "disc": None, "sku": "MNG206", "stock": 4, "featured": True,
     "imgs": ["necklace_diamond", "necklace_worn"], "desc": "18K white gold mangalsutra with 0.4 ct pave diamond pendant. Modern luxury bridal piece."},

    # ─────────────── SOLITAIRES (6 new) ───────────────
    {"name": "Oval Cut Solitaire Ring 0.5ct", "slug": "oval-cut-solitaire-ring-05ct-263", "cat": "solitaires", "material": "diamond", "purity": "18K", "weight": 3.5, "base": 95000, "disc": None, "sku": "SOL201", "stock": 4, "featured": True,
     "imgs": ["ring_solitaire", "pend_diamond"], "desc": "0.5 ct oval-cut diamond solitaire ring, VVS2 clarity, E colour, 18K white gold. GIA certified."},

    {"name": "Princess Cut Diamond Ring 0.7ct", "slug": "princess-cut-diamond-ring-07ct-264", "cat": "solitaires", "material": "diamond", "purity": "18K", "weight": 3.8, "base": 155000, "disc": None, "sku": "SOL202", "stock": 3, "featured": True,
     "imgs": ["ring_solitaire"], "desc": "0.7 ct princess-cut diamond in 4-prong 18K white gold solitaire. IGI certified."},

    {"name": "Cushion Cut Solitaire Ring", "slug": "cushion-cut-solitaire-ring-265", "cat": "solitaires", "material": "diamond", "purity": "18K", "weight": 3.5, "base": 88000, "disc": None, "sku": "SOL203", "stock": 4, "featured": False,
     "imgs": ["ring_solitaire", "ring_pink"], "desc": "0.5 ct cushion-cut diamond solitaire, VS1 clarity, F colour, 18K yellow gold. IGI certified."},

    {"name": "Marquise Cut Diamond Ring", "slug": "marquise-cut-diamond-ring-266", "cat": "solitaires", "material": "diamond", "purity": "18K", "weight": 3.2, "base": 86000, "disc": None, "sku": "SOL204", "stock": 3, "featured": False,
     "imgs": ["ring_solitaire"], "desc": "0.5 ct marquise-cut diamond ring in 18K gold. Elongating shape for a slender look."},

    {"name": "Emerald Cut Solitaire Ring", "slug": "emerald-cut-solitaire-ring-267", "cat": "solitaires", "material": "diamond", "purity": "18K", "weight": 3.5, "base": 92000, "disc": None, "sku": "SOL205", "stock": 3, "featured": False,
     "imgs": ["ring_solitaire", "necklace_diamond"], "desc": "0.5 ct emerald-cut solitaire in 18K white gold. Step-cut facets, VS1 clarity. IGI certified."},

    {"name": "Asscher Cut Diamond Ring 0.7ct", "slug": "asscher-cut-diamond-ring-07ct-268", "cat": "solitaires", "material": "diamond", "purity": "18K", "weight": 3.8, "base": 158000, "disc": None, "sku": "SOL206", "stock": 2, "featured": False,
     "imgs": ["ring_solitaire"], "desc": "0.7 ct Asscher-cut diamond in 18K white gold. Square step-cut with high-crown faceting."},

    # ─────────────── MURTI & DEVOTIONAL (5 new) ───────────────
    {"name": "Saraswati Silver Idol 5cm", "slug": "saraswati-silver-idol-5cm-269", "cat": "murti", "material": "silver", "purity": "925", "weight": 50.0, "base": 10500, "disc": 9499, "sku": "MRT201", "stock": 8, "featured": False,
     "imgs": ["gold_coins", "gold_bars"], "desc": "925 sterling silver Saraswati idol, 5 cm height. Fine casting with detailed ornaments. Gift-boxed."},

    {"name": "Shiva Lingam Silver", "slug": "shiva-lingam-silver-270", "cat": "murti", "material": "silver", "purity": "925", "weight": 40.0, "base": 8400, "disc": 7599, "sku": "MRT202", "stock": 10, "featured": False,
     "imgs": ["gold_coins"], "desc": "925 sterling silver Shiva Lingam with Nandi, 4 cm. Smooth casting, gift-boxed."},

    {"name": "Hanuman Ji Gold Pendant 22K", "slug": "hanuman-ji-gold-pendant-22k-271", "cat": "murti", "material": "gold", "purity": "22K", "weight": 2.0, "base": 26000, "disc": 23500, "sku": "MRT203", "stock": 14, "featured": False,
     "imgs": ["gold_coins", "gold_bars"], "desc": "22K gold Lord Hanuman pendant. Detailed face engraving. BIS hallmarked. Wearable devotional piece."},

    {"name": "Ram Parivar Silver Idol Set", "slug": "ram-parivar-silver-idol-set-272", "cat": "murti", "material": "silver", "purity": "925", "weight": 150.0, "base": 31500, "disc": 28999, "sku": "MRT204", "stock": 5, "featured": False,
     "imgs": ["gold_bars", "gold_coins"], "desc": "925 sterling silver Ram Parivar set (Ram, Sita, Laxman, Hanuman). 4-piece set, gift-boxed."},

    {"name": "Navdurga Silver Coin Set 9pcs", "slug": "navdurga-silver-coin-set-9pcs-273", "cat": "murti", "material": "silver", "purity": "925", "weight": 45.0, "base": 9500, "disc": 8599, "sku": "MRT205", "stock": 12, "featured": False,
     "imgs": ["gold_coins"], "desc": "Set of 9 silver coins featuring all Navdurga forms. Ideal for Navratri gifting. 5g each, BIS certified."},

    # ─────────────── GIFTING (5 new) ───────────────
    {"name": "Gold Bar 5g 24K", "slug": "gold-bar-5g-24k-274", "cat": "gifting", "material": "gold", "purity": "24K", "weight": 5.0, "base": 65000, "disc": None, "sku": "GFT201", "stock": 20, "featured": False,
     "imgs": ["gold_bars"], "desc": "5g 24K gold bar, MMTC-PAMP certified with assay card. BIS hallmarked. Perfect investment gift."},

    {"name": "Gold Bar 50g 24K", "slug": "gold-bar-50g-24k-275", "cat": "gifting", "material": "gold", "purity": "24K", "weight": 50.0, "base": 655000, "disc": None, "sku": "GFT202", "stock": 5, "featured": True,
     "imgs": ["gold_bars"], "desc": "50g 24K gold bar, MMTC-PAMP certified with tamper-proof assay card."},

    {"name": "Silver Bowl Gift Set 200g", "slug": "silver-bowl-gift-set-200g-276", "cat": "gifting", "material": "silver", "purity": "925", "weight": 200.0, "base": 42000, "disc": 38500, "sku": "GFT203", "stock": 6, "featured": False,
     "imgs": ["gift_box", "gold_bars"], "desc": "925 sterling silver bowl, spoon and plate set, 200g total. Ideal for housewarmings and weddings."},

    {"name": "Gold Coin Gift Box 5x1g 24K", "slug": "gold-coin-gift-box-5x1g-24k-277", "cat": "gifting", "material": "gold", "purity": "24K", "weight": 5.0, "base": 65000, "disc": 59500, "sku": "GFT204", "stock": 15, "featured": True,
     "imgs": ["gold_coins", "gift_pink"], "desc": "Gift box with 5 × 1g 24K gold coins, each with Lakshmi embossing. BIS hallmarked."},

    {"name": "Diamond Pendant Gift Set 18K", "slug": "diamond-pendant-gift-set-18k-278", "cat": "gifting", "material": "diamond", "purity": "18K", "weight": 1.5, "base": 35000, "disc": 31500, "sku": "GFT205", "stock": 8, "featured": True,
     "imgs": ["gift_pink", "pend_diamond"], "desc": "18K gold diamond pendant (0.15 ct) in luxury gift box with chain. IGI certified. Ready-to-gift."},

    # ─────────────── MEN'S JEWELRY (8 new) ───────────────
    {"name": "Men's Platinum Ring", "slug": "mens-platinum-ring-279", "cat": "mens-jewelry", "material": "platinum", "purity": "950", "weight": 6.0, "base": 32000, "disc": 28500, "sku": "MNS201", "stock": 8, "featured": False,
     "imgs": ["ring_cocktail", "ring_solitaire"], "desc": "950 platinum ring for men. Brushed finish with polished edge. Hypoallergenic and heavy."},

    {"name": "Men's Heavy Gold Bracelet 22K", "slug": "mens-heavy-gold-bracelet-22k-280", "cat": "mens-jewelry", "material": "gold", "purity": "22K", "weight": 20.0, "base": 260000, "disc": 238500, "sku": "MNS202", "stock": 5, "featured": True,
     "imgs": ["chain_bracelet", "bangle_wrist"], "desc": "22K gold heavy link bracelet for men, 20g. Bold masculine statement piece.", "carats": ["18K", "22K"]},

    {"name": "Men's Gold Dog Tag Pendant 22K", "slug": "mens-gold-dog-tag-pendant-22k-281", "cat": "mens-jewelry", "material": "gold", "purity": "22K", "weight": 5.0, "base": 65000, "disc": 59500, "sku": "MNS203", "stock": 10, "featured": False,
     "imgs": ["pend_gold", "chain_hanging"], "desc": "22K gold dog tag pendant for men. Engravable surface, on 22-inch chain."},

    {"name": "Men's Silver Cufflinks 925", "slug": "mens-silver-cufflinks-925-282", "cat": "mens-jewelry", "material": "silver", "purity": "925", "weight": 10.0, "base": 3500, "disc": 2999, "sku": "MNS204", "stock": 20, "featured": False,
     "imgs": ["chain_bracelet"], "desc": "925 sterling silver cufflinks with black enamel inlay. Classic formal accessory."},

    {"name": "Men's Diamond Bracelet 18K", "slug": "mens-diamond-bracelet-18k-283", "cat": "mens-jewelry", "material": "diamond", "purity": "18K", "weight": 15.0, "base": 200000, "disc": 183500, "sku": "MNS205", "stock": 3, "featured": True,
     "imgs": ["bangle_diamond", "chain_bracelet"], "desc": "18K gold men's bracelet with 0.5 ct channel-set diamonds. Bold and sophisticated. IGI certified."},

    {"name": "Men's Heavy Gold Chain 22K", "slug": "mens-heavy-gold-chain-22k-284", "cat": "mens-jewelry", "material": "gold", "purity": "22K", "weight": 18.0, "base": 234000, "disc": 214500, "sku": "MNS206", "stock": 6, "featured": True,
     "imgs": ["chain_hanging", "chain_crescent"], "desc": "22K gold heavy Cuban link chain for men, 22 inches, 18g. Bold neck-piece.", "carats": ["18K", "22K"]},

    {"name": "Men's Heavy Silver Kada 925", "slug": "mens-heavy-silver-kada-925-285", "cat": "mens-jewelry", "material": "silver", "purity": "925", "weight": 80.0, "base": 17000, "disc": 14999, "sku": "MNS207", "stock": 12, "featured": False,
     "imgs": ["bangle_wrist"], "desc": "925 sterling silver heavy keel-design kada for men, 80g. Traditional Punjabi style."},

    {"name": "Men's Gold Figaro Bracelet 22K", "slug": "mens-gold-figaro-bracelet-22k-286", "cat": "mens-jewelry", "material": "gold", "purity": "22K", "weight": 12.0, "base": 156000, "disc": 143000, "sku": "MNS208", "stock": 7, "featured": False,
     "imgs": ["chain_bracelet", "bangle_wrist"], "desc": "22K gold figaro-link bracelet for men, 8.5 inches. Italian-style with lobster clasp.", "carats": ["18K", "22K"]},

    # ══════════════════════════════════════════════════════════════════════════
    # MATERIAL EXPANSION — fills Kundan / Imitation / Platinum / Polki gaps
    # across all categories so every material×category filter returns results
    # ══════════════════════════════════════════════════════════════════════════

    # ─── RINGS – Kundan ───
    {"name": "Kundan Floral Cocktail Ring", "slug": "kundan-floral-cocktail-ring-301", "cat": "rings", "material": "kundan", "purity": "22K", "weight": 5.0, "base": 82000, "disc": 74500, "sku": "RNG301", "stock": 8, "featured": True,
     "imgs": ["kundan_rings", "ring_cocktail"], "desc": "22K gold kundan cocktail ring with multi-colour stone floral cluster. Bridal statement piece."},
    {"name": "Kundan Statement Ring 22K", "slug": "kundan-statement-ring-22k-302", "cat": "rings", "material": "kundan", "purity": "22K", "weight": 4.0, "base": 68000, "disc": 62000, "sku": "RNG302", "stock": 10, "featured": False,
     "imgs": ["kundan_rings", "polki_rings"], "desc": "22K gold kundan statement ring with emerald-green centre stone. Meenakari back."},

    # ─── RINGS – Imitation ───
    {"name": "Gold-Look Fashion Cocktail Ring", "slug": "gold-look-fashion-cocktail-ring-303", "cat": "rings", "material": "imitation", "purity": None, "weight": None, "base": 1800, "disc": 1399, "sku": "RNG303", "stock": 50, "featured": False,
     "imgs": ["imit_fashion", "ring_cocktail"], "desc": "Brass-base gold-plated fashion cocktail ring with crystal stone. Hypoallergenic. Party wear."},
    {"name": "Fashion Diamond Look Ring Set", "slug": "fashion-diamond-look-ring-set-304", "cat": "rings", "material": "imitation", "purity": None, "weight": None, "base": 2500, "disc": 1999, "sku": "RNG304", "stock": 40, "featured": False,
     "imgs": ["imit_set", "imit_fashion"], "desc": "Set of 3 gold-plated CZ diamond-look rings. Mix-and-match stacking set."},

    # ─── RINGS – Platinum ───
    {"name": "Platinum Couple Band Set", "slug": "platinum-couple-band-set-305", "cat": "rings", "material": "platinum", "purity": "950", "weight": 5.0, "base": 28000, "disc": 24500, "sku": "RNG305", "stock": 8, "featured": False,
     "imgs": ["plat_ring"], "desc": "950 platinum couple wedding band set. Comfort-fit, brushed centre with polished edges."},
    {"name": "Platinum Solitaire Diamond Ring", "slug": "platinum-solitaire-diamond-ring-306", "cat": "rings", "material": "platinum", "purity": "950", "weight": 4.5, "base": 85000, "disc": None, "sku": "RNG306", "stock": 4, "featured": True,
     "imgs": ["plat_ring", "ring_solitaire"], "desc": "950 platinum solitaire ring with 0.3 ct diamond. IGI certified. Lifetime resizing warranty."},

    # ─── RINGS – Polki ───
    {"name": "Polki Jadau Ring 22K", "slug": "polki-jadau-ring-22k-307", "cat": "rings", "material": "polki", "purity": "22K", "weight": 4.0, "base": 82000, "disc": 75000, "sku": "RNG307", "stock": 6, "featured": True,
     "imgs": ["polki_rings", "kundan_rings"], "desc": "22K gold jadau ring with uncut polki diamonds. Mughal-era artisan craft. Bridal favourite."},
    {"name": "Polki Statement Ring 22K", "slug": "polki-statement-ring-22k-308", "cat": "rings", "material": "polki", "purity": "22K", "weight": 5.0, "base": 95000, "disc": 87000, "sku": "RNG308", "stock": 5, "featured": False,
     "imgs": ["polki_rings", "ring_cocktail"], "desc": "22K gold polki ring with a large uncut diamond surrounded by ruby and emerald accents."},

    # ─── EARRINGS – Kundan ───
    {"name": "Kundan Chandbali Earrings 22K", "slug": "kundan-chandbali-earrings-22k-309", "cat": "earrings", "material": "kundan", "purity": "22K", "weight": 8.0, "base": 115000, "disc": 105500, "sku": "EAR301", "stock": 6, "featured": True,
     "imgs": ["kundan_earring", "kundan_earring2"], "desc": "22K gold kundan chandbali with coloured glass-stone inlay and ghungroo drops. Classic bridal."},
    {"name": "Kundan Jhumka Pair 22K", "slug": "kundan-jhumka-pair-22k-310", "cat": "earrings", "material": "kundan", "purity": "22K", "weight": 6.0, "base": 88000, "disc": 80500, "sku": "EAR302", "stock": 8, "featured": False,
     "imgs": ["kundan_earring2", "kundan_earring"], "desc": "22K gold jhumka with kundan stone setting and hanging pearl drops. Traditional festive design."},

    # ─── EARRINGS – Imitation ───
    {"name": "Fashion Kundan Jhumka", "slug": "fashion-kundan-jhumka-311", "cat": "earrings", "material": "imitation", "purity": None, "weight": None, "base": 2500, "disc": 1999, "sku": "EAR303", "stock": 45, "featured": False,
     "imgs": ["imit_fashion", "kundan_earring2"], "desc": "Gold-plated jhumka with kundan stone and pearl drop. Lightweight party and wedding wear."},
    {"name": "Fashion Gold Hoop Earrings", "slug": "fashion-gold-hoop-earrings-312", "cat": "earrings", "material": "imitation", "purity": None, "weight": None, "base": 1800, "disc": 1399, "sku": "EAR304", "stock": 50, "featured": False,
     "imgs": ["imit_set", "imit_fashion"], "desc": "Gold-plated wide hoop earrings. Tarnish-resistant coating. Daily wear fashion accessory."},

    # ─── EARRINGS – Platinum ───
    {"name": "Platinum Diamond Drop Earrings", "slug": "platinum-diamond-drop-earrings-313", "cat": "earrings", "material": "platinum", "purity": "950", "weight": 3.0, "base": 36000, "disc": 32500, "sku": "EAR305", "stock": 5, "featured": False,
     "imgs": ["plat_bracelet", "plat_ring"], "desc": "950 platinum drop earrings with 0.15 ct diamond each. IGI certified. Minimal luxury."},
    {"name": "Platinum Diamond Stud Earrings", "slug": "platinum-diamond-stud-earrings-314", "cat": "earrings", "material": "platinum", "purity": "950", "weight": 2.0, "base": 24000, "disc": 21500, "sku": "EAR306", "stock": 7, "featured": False,
     "imgs": ["plat_ring", "plat_bracelet"], "desc": "950 platinum stud earrings set with 0.1 ct diamonds each. Everyday elegance."},

    # ─── EARRINGS – Polki ───
    {"name": "Polki Drop Earrings 22K", "slug": "polki-drop-earrings-22k-315", "cat": "earrings", "material": "polki", "purity": "22K", "weight": 7.0, "base": 128000, "disc": 117000, "sku": "EAR307", "stock": 5, "featured": True,
     "imgs": ["kundan_earring", "polki_rings"], "desc": "22K gold polki drop earrings with uncut diamonds and red enamel detailing. Heritage bridal piece."},
    {"name": "Polki Stud Earrings 22K", "slug": "polki-stud-earrings-22k-316", "cat": "earrings", "material": "polki", "purity": "22K", "weight": 4.0, "base": 78000, "disc": 71500, "sku": "EAR308", "stock": 7, "featured": False,
     "imgs": ["polki_rings", "kundan_earring2"], "desc": "22K gold polki stud earrings with uncut diamond cluster. Rich jadau craftsmanship."},

    # ─── BANGLES – Kundan ───
    {"name": "Kundan Bangle Pair 22K", "slug": "kundan-bangle-pair-22k-317", "cat": "bangles", "material": "kundan", "purity": "22K", "weight": 18.0, "base": 270000, "disc": 247500, "sku": "BNG301", "stock": 3, "featured": True,
     "imgs": ["kundan_rings", "bangle_wrist"], "desc": "22K gold kundan bangle pair with coloured stone mosaic on outer surface. Bridal grand set."},
    {"name": "Kundan Kada 22K", "slug": "kundan-kada-22k-318", "cat": "bangles", "material": "kundan", "purity": "22K", "weight": 22.0, "base": 315000, "disc": 289000, "sku": "BNG302", "stock": 2, "featured": False,
     "imgs": ["kundan_rings", "bangle_diamond"], "desc": "22K gold heavy kundan kada with all-round kundan stone setting. Bold bridal accessory."},

    # ─── BANGLES – Imitation ───
    {"name": "Fashion Bangle Set of 6", "slug": "fashion-bangle-set-of-6-319", "cat": "bangles", "material": "imitation", "purity": None, "weight": None, "base": 3500, "disc": 2999, "sku": "BNG303", "stock": 30, "featured": False,
     "imgs": ["imit_fashion", "imit_set"], "desc": "Set of 6 gold-plated fashion bangles with enamel and kundan accent. Lightweight party wear."},
    {"name": "Gold-Look Fashion Kada", "slug": "gold-look-fashion-kada-320", "cat": "bangles", "material": "imitation", "purity": None, "weight": None, "base": 2800, "disc": 2299, "sku": "BNG304", "stock": 35, "featured": False,
     "imgs": ["imit_set", "imit_fashion"], "desc": "Heavy-look gold-plated kada for daily wear. Stone-free minimal design."},

    # ─── BANGLES – Platinum ───
    {"name": "Platinum Diamond Bangle", "slug": "platinum-diamond-bangle-321", "cat": "bangles", "material": "platinum", "purity": "950", "weight": 14.0, "base": 92000, "disc": 84000, "sku": "BNG305", "stock": 3, "featured": False,
     "imgs": ["plat_bracelet", "bangle_diamond"], "desc": "950 platinum hinged bangle with 0.4 ct channel-set diamonds. IGI certified."},
    {"name": "Platinum Wedding Bangle Pair", "slug": "platinum-wedding-bangle-pair-322", "cat": "bangles", "material": "platinum", "purity": "950", "weight": 12.0, "base": 68000, "disc": 61500, "sku": "BNG306", "stock": 4, "featured": False,
     "imgs": ["plat_bracelet", "plat_ring"], "desc": "950 platinum plain bangle pair. Smooth finish, rounded profile. Lifetime comfort."},

    # ─── BANGLES – Polki ───
    {"name": "Polki Bangle Set 22K", "slug": "polki-bangle-set-22k-323", "cat": "bangles", "material": "polki", "purity": "22K", "weight": 22.0, "base": 370000, "disc": 339500, "sku": "BNG307", "stock": 2, "featured": True,
     "imgs": ["polki_rings", "bangle_wrist"], "desc": "22K gold polki bangle set with dense uncut diamond and enamel work. Grand bridal collection."},
    {"name": "Polki Kada 22K", "slug": "polki-kada-22k-324", "cat": "bangles", "material": "polki", "purity": "22K", "weight": 18.0, "base": 308000, "disc": 282000, "sku": "BNG308", "stock": 3, "featured": False,
     "imgs": ["kundan_rings", "polki_rings"], "desc": "22K gold polki kada with all-round uncut diamond setting. Regal Mughal-inspired design."},

    # ─── STUD – Kundan ───
    {"name": "Kundan Stud Earrings Pair", "slug": "kundan-stud-earrings-pair-325", "cat": "stud", "material": "kundan", "purity": "22K", "weight": 2.5, "base": 47000, "disc": 43000, "sku": "STD301", "stock": 12, "featured": False,
     "imgs": ["kundan_earring", "kundan_earring2"], "desc": "22K gold kundan stud earrings with large coloured glass-stone centre. Meenakari back work."},
    {"name": "Kundan Floral Stud 22K", "slug": "kundan-floral-stud-22k-326", "cat": "stud", "material": "kundan", "purity": "22K", "weight": 2.0, "base": 38000, "disc": 34500, "sku": "STD302", "stock": 14, "featured": False,
     "imgs": ["kundan_earring2", "kundan_earring"], "desc": "22K gold floral kundan stud with five-petal design and ruby centre stone."},

    # ─── STUD – Imitation ───
    {"name": "Fashion Crystal Stud Earrings", "slug": "fashion-crystal-stud-earrings-327", "cat": "stud", "material": "imitation", "purity": None, "weight": None, "base": 800, "disc": 599, "sku": "STD303", "stock": 60, "featured": False,
     "imgs": ["imit_fashion"], "desc": "Gold-plated CZ crystal stud earrings. Hypoallergenic posts. Ideal everyday fashion accessory."},
    {"name": "Fashion Pearl Stud Gold-Look", "slug": "fashion-pearl-stud-gold-look-328", "cat": "stud", "material": "imitation", "purity": None, "weight": None, "base": 1200, "disc": 999, "sku": "STD304", "stock": 55, "featured": False,
     "imgs": ["imit_set", "imit_fashion"], "desc": "Gold-plated stud with faux freshwater pearl. Classic look at affordable price."},

    # ─── STUD – Platinum ───
    {"name": "Platinum Diamond Stud 0.3ct", "slug": "platinum-diamond-stud-03ct-329", "cat": "stud", "material": "platinum", "purity": "950", "weight": 2.0, "base": 45000, "disc": None, "sku": "STD305", "stock": 5, "featured": True,
     "imgs": ["plat_ring", "plat_bracelet"], "desc": "950 platinum stud earrings with 0.15 ct diamond each, VS1 clarity. IGI certified."},
    {"name": "Platinum Pearl Stud Earrings", "slug": "platinum-pearl-stud-earrings-330", "cat": "stud", "material": "platinum", "purity": "950", "weight": 1.5, "base": 16000, "disc": 14500, "sku": "STD306", "stock": 8, "featured": False,
     "imgs": ["plat_bracelet"], "desc": "950 platinum stud with South Sea pearl. Secure screw-back fitting. Hypoallergenic."},

    # ─── STUD – Polki ───
    {"name": "Polki Stud Earrings 22K", "slug": "polki-stud-earrings-22k-331", "cat": "stud", "material": "polki", "purity": "22K", "weight": 2.0, "base": 42000, "disc": 38500, "sku": "STD307", "stock": 8, "featured": False,
     "imgs": ["polki_rings", "kundan_earring"], "desc": "22K gold polki stud with a single large uncut diamond set in jadau technique."},
    {"name": "Polki Flower Stud 22K", "slug": "polki-flower-stud-22k-332", "cat": "stud", "material": "polki", "purity": "22K", "weight": 2.5, "base": 48000, "disc": 44000, "sku": "STD308", "stock": 7, "featured": False,
     "imgs": ["kundan_earring2", "polki_rings"], "desc": "22K gold five-petal polki flower stud with ruby bead drops. Traditional jadau craft."},

    # ─── PENDANTS – Kundan ───
    {"name": "Kundan Pendant Necklace 22K", "slug": "kundan-pendant-necklace-22k-333", "cat": "pendants", "material": "kundan", "purity": "22K", "weight": 3.5, "base": 65000, "disc": 59500, "sku": "PND301", "stock": 10, "featured": True,
     "imgs": ["kundan_earring", "pend_gem"], "desc": "22K gold kundan pendant with multi-colour stone floral motif. Comes on a 22K gold chain."},
    {"name": "Kundan Locket 22K", "slug": "kundan-locket-22k-334", "cat": "pendants", "material": "kundan", "purity": "22K", "weight": 2.5, "base": 48000, "disc": 43500, "sku": "PND302", "stock": 12, "featured": False,
     "imgs": ["kundan_rings", "pend_gold"], "desc": "22K gold kundan locket with peacock design and green stone eyes. Meenakari reverse."},

    # ─── PENDANTS – Imitation ───
    {"name": "Fashion Peacock Pendant", "slug": "fashion-peacock-pendant-335", "cat": "pendants", "material": "imitation", "purity": None, "weight": None, "base": 1500, "disc": 1199, "sku": "PND303", "stock": 45, "featured": False,
     "imgs": ["imit_necklace", "imit_fashion"], "desc": "Gold-plated peacock pendant with multi-colour enamelling. Lightweight, hypoallergenic."},
    {"name": "Gold-Look Kundan Pendant", "slug": "gold-look-kundan-pendant-336", "cat": "pendants", "material": "imitation", "purity": None, "weight": None, "base": 2000, "disc": 1599, "sku": "PND304", "stock": 40, "featured": False,
     "imgs": ["imit_fashion", "imit_necklace"], "desc": "Gold-plated kundan pendant with CZ stones. Ideal for festive and daily wear."},

    # ─── PENDANTS – Platinum ───
    {"name": "Platinum Diamond Pendant 0.2ct", "slug": "platinum-diamond-pendant-02ct-337", "cat": "pendants", "material": "platinum", "purity": "950", "weight": 2.0, "base": 26000, "disc": 23500, "sku": "PND305", "stock": 6, "featured": False,
     "imgs": ["plat_bracelet", "pend_diamond"], "desc": "950 platinum pendant with 0.2 ct round brilliant diamond. IGI certified. Rhodium-plated."},
    {"name": "Platinum Heart Pendant", "slug": "platinum-heart-pendant-338", "cat": "pendants", "material": "platinum", "purity": "950", "weight": 2.5, "base": 16000, "disc": 14500, "sku": "PND306", "stock": 8, "featured": False,
     "imgs": ["plat_ring", "pend_rose"], "desc": "950 platinum heart-shaped pendant. Minimal design, polished finish. Hypoallergenic."},

    # ─── PENDANTS – Polki ───
    {"name": "Polki Pendant Drop 22K", "slug": "polki-pendant-drop-22k-339", "cat": "pendants", "material": "polki", "purity": "22K", "weight": 3.0, "base": 60000, "disc": 54500, "sku": "PND307", "stock": 7, "featured": False,
     "imgs": ["polki_rings", "pend_gem"], "desc": "22K gold polki pendant with teardrop uncut diamond and enamel work. Vintage Mughal style."},
    {"name": "Polki Locket 22K", "slug": "polki-locket-22k-340", "cat": "pendants", "material": "polki", "purity": "22K", "weight": 2.5, "base": 50000, "disc": 45500, "sku": "PND308", "stock": 8, "featured": False,
     "imgs": ["kundan_earring", "polki_rings"], "desc": "22K gold polki locket with uncut diamonds and red enamel surround. Heritage jadau art."},

    # ─── CHAIN – Kundan ───
    {"name": "Kundan Choker Necklace 22K", "slug": "kundan-choker-necklace-22k-341", "cat": "chain", "material": "kundan", "purity": "22K", "weight": 15.0, "base": 225000, "disc": 206500, "sku": "CHN301", "stock": 3, "featured": True,
     "imgs": ["kundan_rings", "necklace_bridal"], "desc": "22K gold kundan choker with 5-row kundan stone setting and rubies. Grand bridal necklace."},
    {"name": "Kundan Long Mala 22K", "slug": "kundan-long-mala-22k-342", "cat": "chain", "material": "kundan", "purity": "22K", "weight": 18.0, "base": 265000, "disc": 243000, "sku": "CHN302", "stock": 2, "featured": False,
     "imgs": ["necklace_bridal", "kundan_earring"], "desc": "22K gold kundan long mala (opera length) with kundan stations and pearl drops."},

    # ─── CHAIN – Imitation ───
    {"name": "Fashion Chain Necklace Set", "slug": "fashion-chain-necklace-set-343", "cat": "chain", "material": "imitation", "purity": None, "weight": None, "base": 3500, "disc": 2999, "sku": "CHN303", "stock": 35, "featured": False,
     "imgs": ["imit_necklace", "imit_fashion"], "desc": "Gold-plated layered chain necklace set (2 pieces). Lobster clasp. Party and office wear."},
    {"name": "Gold-Look Kundan Choker", "slug": "gold-look-kundan-choker-344", "cat": "chain", "material": "imitation", "purity": None, "weight": None, "base": 4500, "disc": 3999, "sku": "CHN304", "stock": 30, "featured": False,
     "imgs": ["imit_necklace", "imit_set"], "desc": "Gold-plated kundan choker necklace with CZ stones and red enamel. Festive fashion piece."},

    # ─── CHAIN – Polki ───
    {"name": "Polki Chain Necklace 22K", "slug": "polki-chain-necklace-22k-345", "cat": "chain", "material": "polki", "purity": "22K", "weight": 12.0, "base": 198000, "disc": 181500, "sku": "CHN305", "stock": 3, "featured": False,
     "imgs": ["kundan_rings", "chain_crescent"], "desc": "22K gold chain necklace with polki diamond stations every 2 cm. Regal and festive."},
    {"name": "Polki Choker 22K", "slug": "polki-choker-22k-346", "cat": "chain", "material": "polki", "purity": "22K", "weight": 16.0, "base": 260000, "disc": 238500, "sku": "CHN306", "stock": 2, "featured": False,
     "imgs": ["polki_rings", "necklace_bridal"], "desc": "22K gold polki choker with all-round uncut diamond border. Bridal treasure piece."},

    # ─── MANGALSUTRA – Kundan ───
    {"name": "Kundan Mangalsutra 22K", "slug": "kundan-mangalsutra-22k-347", "cat": "mangalsutra", "material": "kundan", "purity": "22K", "weight": 8.0, "base": 118000, "disc": 108000, "sku": "MNG301", "stock": 5, "featured": True,
     "imgs": ["necklace_bridal", "kundan_earring"], "desc": "22K gold mangalsutra with kundan-work pendant and black bead chain. Bridal gift."},
    {"name": "Kundan Pendant Mangalsutra 22K", "slug": "kundan-pendant-mangalsutra-22k-348", "cat": "mangalsutra", "material": "kundan", "purity": "22K", "weight": 6.0, "base": 88000, "disc": 80500, "sku": "MNG302", "stock": 7, "featured": False,
     "imgs": ["kundan_rings", "necklace_worn"], "desc": "22K gold mangalsutra with small kundan pendant and dual chain. Everyday modern wear."},

    # ─── MANGALSUTRA – Imitation ───
    {"name": "Fashion Mangalsutra", "slug": "fashion-mangalsutra-349", "cat": "mangalsutra", "material": "imitation", "purity": None, "weight": None, "base": 3500, "disc": 2999, "sku": "MNG303", "stock": 30, "featured": False,
     "imgs": ["imit_necklace", "imit_fashion"], "desc": "Gold-plated mangalsutra with black beads and CZ pendant. Lightweight daily wear option."},
    {"name": "Gold-Look Mangalsutra", "slug": "gold-look-mangalsutra-350", "cat": "mangalsutra", "material": "imitation", "purity": None, "weight": None, "base": 2800, "disc": 2299, "sku": "MNG304", "stock": 35, "featured": False,
     "imgs": ["imit_set", "imit_necklace"], "desc": "Gold-plated black bead mangalsutra. Minimalist modern design for everyday use."},

    # ─── MANGALSUTRA – Platinum ───
    {"name": "Platinum Diamond Mangalsutra", "slug": "platinum-diamond-mangalsutra-351", "cat": "mangalsutra", "material": "platinum", "purity": "950", "weight": 5.0, "base": 40000, "disc": 36500, "sku": "MNG305", "stock": 4, "featured": False,
     "imgs": ["plat_bracelet", "necklace_diamond"], "desc": "950 platinum mangalsutra with 0.25 ct diamond pendant and black bead chain. Contemporary bridal."},
    {"name": "Platinum Heart Mangalsutra", "slug": "platinum-heart-mangalsutra-352", "cat": "mangalsutra", "material": "platinum", "purity": "950", "weight": 6.0, "base": 72000, "disc": None, "sku": "MNG306", "stock": 3, "featured": False,
     "imgs": ["plat_ring", "necklace_worn"], "desc": "950 platinum heart-pendant mangalsutra with 0.4 ct diamond. IGI certified. Modern luxury."},

    # ─── MANGALSUTRA – Polki ───
    {"name": "Polki Mangalsutra 22K", "slug": "polki-mangalsutra-22k-353", "cat": "mangalsutra", "material": "polki", "purity": "22K", "weight": 9.0, "base": 148000, "disc": 135500, "sku": "MNG307", "stock": 3, "featured": True,
     "imgs": ["necklace_bridal", "polki_rings"], "desc": "22K gold polki mangalsutra with uncut diamond pendant and black bead chain. Heritage bridal."},
    {"name": "Polki Long Mangalsutra 22K", "slug": "polki-long-mangalsutra-22k-354", "cat": "mangalsutra", "material": "polki", "purity": "22K", "weight": 11.0, "base": 177000, "disc": 162000, "sku": "MNG308", "stock": 2, "featured": False,
     "imgs": ["kundan_rings", "necklace_bridal"], "desc": "22K gold 24-inch long mangalsutra with polki diamond stations and black bead chain."},

    # ─── MEN'S JEWELRY – Kundan ───
    {"name": "Men's Kundan Ring 22K", "slug": "mens-kundan-ring-22k-355", "cat": "mens-jewelry", "material": "kundan", "purity": "22K", "weight": 5.0, "base": 80000, "disc": 73500, "sku": "MNS301", "stock": 6, "featured": False,
     "imgs": ["kundan_rings", "ring_cocktail"], "desc": "22K gold kundan ring for men with ruby-red centre stone. Bold and regal statement ring."},
    {"name": "Men's Kundan Brooch Pin 22K", "slug": "mens-kundan-brooch-pin-22k-356", "cat": "mens-jewelry", "material": "kundan", "purity": "22K", "weight": 4.0, "base": 65000, "disc": 59500, "sku": "MNS302", "stock": 5, "featured": False,
     "imgs": ["kundan_earring", "kundan_rings"], "desc": "22K gold kundan sherwani brooch with coloured stone inlay. Traditional ceremonial men's piece."},

    # ─── MEN'S JEWELRY – Imitation ───
    {"name": "Men's Fashion Ring", "slug": "mens-fashion-ring-357", "cat": "mens-jewelry", "material": "imitation", "purity": None, "weight": None, "base": 1500, "disc": 1199, "sku": "MNS303", "stock": 40, "featured": False,
     "imgs": ["imit_fashion", "imit_set"], "desc": "Gold-plated men's fashion ring with onyx-look stone. Bold design for parties and occasions."},
    {"name": "Men's Fashion Chain Necklace", "slug": "mens-fashion-chain-necklace-358", "cat": "mens-jewelry", "material": "imitation", "purity": None, "weight": None, "base": 2500, "disc": 1999, "sku": "MNS304", "stock": 35, "featured": False,
     "imgs": ["imit_set", "imit_fashion"], "desc": "Gold-plated men's Cuban link chain necklace, 22 inches. Tarnish-resistant daily wear."},

    # ─── MEN'S JEWELRY – Polki ───
    {"name": "Men's Polki Ring 22K", "slug": "mens-polki-ring-22k-359", "cat": "mens-jewelry", "material": "polki", "purity": "22K", "weight": 6.0, "base": 100000, "disc": 91500, "sku": "MNS305", "stock": 4, "featured": True,
     "imgs": ["polki_rings", "kundan_rings"], "desc": "22K gold men's polki ring with a large uncut diamond centre. Masculine jadau masterpiece."},
    {"name": "Men's Polki Pendant 22K", "slug": "mens-polki-pendant-22k-360", "cat": "mens-jewelry", "material": "polki", "purity": "22K", "weight": 4.0, "base": 70000, "disc": 64000, "sku": "MNS306", "stock": 5, "featured": False,
     "imgs": ["kundan_earring", "polki_rings"], "desc": "22K gold polki pendant for men with Om motif in uncut diamond inlay. Spiritual and masculine."},
]
