#!/usr/bin/env python3
"""Assemble all batch_*.json into a single products catalog + TS file."""
import json, os, re, glob

SCRATCH = os.path.dirname(os.path.abspath(__file__))
OUT_TS = r"E:/Frontend/lib/catalog/products.generated.ts"

GOLD_RATE_18K = 6000.0      # Rs per gram (net), centralised
MAKING_PCT = 0.12           # 12% making on gold value
STONE_PER_CARAT = 45000.0   # Rs per carat for diamonds
STONE_FLAT = 12000.0        # flat premium when has_stone but carats unknown

DEFAULT_WEIGHT = {
    "ring": 4.0, "earring": 5.5, "stud": 2.5, "pendant": 3.0, "pendant-set": 8.0,
    "chain": 12.0, "necklace": 22.0, "bangle": 14.0, "kada": 20.0, "bracelet": 10.0,
    "mangalsutra": 12.0, "nosepin": 0.6, "maangtika": 6.0, "set": 25.0,
    "murti": 20.0, "other": 6.0,
}

TYPE_TITLE = {
    "ring": "Ring", "earring": "Earrings", "stud": "Studs", "pendant": "Pendant",
    "pendant-set": "Pendant Set", "chain": "Chain", "necklace": "Necklace",
    "bangle": "Bangle", "kada": "Kada", "bracelet": "Bracelet",
    "mangalsutra": "Mangalsutra", "nosepin": "Nose Pin", "maangtika": "Maang Tikka",
    "set": "Jewellery Set", "murti": "Silver Murti", "other": "Jewellery",
}

# category (slug,name) by type for WOMEN / default
TYPE_CAT = {
    "ring": ("rings", "Rings"), "earring": ("earrings", "Earrings"),
    "stud": ("studs", "Studs"), "pendant": ("pendants", "Pendants"),
    "pendant-set": ("pendant-sets", "Pendant Sets"), "chain": ("chains", "Chains"),
    "necklace": ("necklaces", "Necklaces"), "bangle": ("bangles", "Bangles"),
    "kada": ("kadas", "Kadas"), "bracelet": ("bracelets", "Bracelets"),
    "mangalsutra": ("mangalsutra", "Mangalsutra"), "nosepin": ("nose-pins", "Nose Pins"),
    "maangtika": ("maang-tikka", "Maang Tikka"), "set": ("jewellery-sets", "Jewellery Sets"),
    "murti": ("silver-murti", "Silver Murti"), "other": ("gifting", "Gifting"),
}
MEN_CAT = ("mens-jewellery", "Men's Jewellery")

ADJ = ["Classic", "Royal", "Elegant", "Heritage", "Signature", "Divine", "Radiant",
       "Grace", "Regal", "Blossom", "Aurora", "Celeste", "Imperial", "Lumina",
       "Meera", "Rivaah", "Nakshatra", "Zoya", "Kiara", "Anaya"]

def parse_carats(stone):
    if not stone: return 0.0
    m = re.search(r"([0-9]*\.?[0-9]+)", str(stone))
    if not m: return 0.0
    try:
        v = float(m.group(1))
        return v if v < 10 else 0.0   # guard against count/id being parsed
    except: return 0.0

def price_for(weight, has_stone, carats):
    gold_val = weight * GOLD_RATE_18K
    making = gold_val * MAKING_PCT
    if carats and carats > 0:
        stone_val = carats * STONE_PER_CARAT
    elif has_stone:
        stone_val = STONE_FLAT
    else:
        stone_val = 0.0
    total = gold_val + making + stone_val
    return int(round(total / 100.0) * 100)

def slugify(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s

# ---- load ----
rows = []
for f in sorted(glob.glob(os.path.join(SCRATCH, "batch_*.json"))):
    with open(f, encoding="utf-8") as fh:
        data = json.load(fh)
    rows.extend(data)

rows.sort(key=lambda r: r["line"])
lines_present = sorted(r["line"] for r in rows)
assert lines_present == list(range(1, 197)), f"MISSING/EXTRA lines: got {len(lines_present)}"

# ---- group by readable tag_code ----
groups = []          # list of list-of-rows
code_index = {}
for r in rows:
    code = r.get("tag_code")
    readable = r.get("readable") and code and str(code).strip() and str(code).strip().lower() != "null"
    if readable:
        key = str(code).strip()
        if key in code_index:
            groups[code_index[key]].append(r)
            continue
        code_index[key] = len(groups)
    groups.append([r])

# ---- build products ----
products = []
img_used = set()
for gi, g in enumerate(groups):
    g.sort(key=lambda r: r["line"])
    head = g[0]
    typ = head.get("type") or "other"
    if typ not in TYPE_TITLE: typ = "other"
    gender = head.get("gender") or "women"
    has_stone = bool(head.get("has_stone"))
    carats = parse_carats(head.get("stone"))
    # weight: prefer net, then gross, then default
    weight = head.get("net_g") or head.get("gross_g")
    if not weight or weight <= 0:
        weight = DEFAULT_WEIGHT.get(typ, 6.0)
    weight = round(float(weight), 3)
    price = price_for(weight, has_stone, carats)

    material = "silver" if head.get("material") == "silver" or typ == "murti" else ("diamond" if has_stone else "gold")
    karat = head.get("karat")
    purity = None if material == "silver" else (karat if karat else "18K")

    mat_adj = "Diamond" if has_stone else ("Silver" if material == "silver" else "Gold")
    type_title = TYPE_TITLE[typ]
    gpref = "Men's " if gender == "men" else ""
    adj = ADJ[gi % len(ADJ)]
    name = f"{gpref}{adj} {mat_adj} {type_title}".replace("  ", " ").strip()

    if gender == "men":
        cat_slug, cat_name = MEN_CAT
    else:
        cat_slug, cat_name = TYPE_CAT.get(typ, TYPE_CAT["other"])

    idx = gi + 1
    slug = f"{slugify(name)}-{idx:03d}"
    pid = f"prod-{idx:03d}"

    images = []
    for j, r in enumerate(g):
        n = f"p{r['line']:03d}.jpeg"
        img_used.add(r["line"])
        images.append({
            "id": f"{pid}-img{j+1}",
            "image_url": f"/products/{n}",
            "display_order": j,
            "is_primary": j == 0,
        })
    primary = images[0]["image_url"]

    featured = has_stone and typ in ("ring", "pendant-set", "set", "mangalsutra", "necklace")

    products.append({
        "id": pid,
        "name": name,
        "slug": slug,
        "primary_image": primary,
        "base_price": f"{price}.00",
        "discount_price": None,
        "price": f"{price}.00",
        "material": material,
        "purity": purity,
        "weight_grams": f"{weight}",
        "is_featured": featured,
        "stock_quantity": 5,
        "category_slug": cat_slug,
        "category_name": cat_name,
        # detail-only
        "description": f"Beautifully crafted {mat_adj.lower()} {type_title.lower()} in {purity or 'silver'}. "
                       f"Net weight approx {weight} g. Hallmarked and certified by Rajesh Jewellers.",
        "sku": (head.get("tag_code") or slug).replace(" ", "-"),
        "images": images,
        "gender": gender,
        "type": typ,
        "carats": carats,
    })

# cap featured to ~16
feat = [p for p in products if p["is_featured"]]
for p in feat[16:]:
    p["is_featured"] = False

assert img_used == set(range(1, 197)), f"IMAGES NOT ALL USED: missing {set(range(1,197))-img_used}"

# ---- categories ----
cat_order = ["rings", "earrings", "studs", "pendants", "pendant-sets", "chains",
             "necklaces", "bangles", "kadas", "bracelets", "mangalsutra", "nose-pins",
             "maang-tikka", "jewellery-sets", "silver-murti", "mens-jewellery", "gifting"]
cats = {}
for p in products:
    cs, cn = p["category_slug"], p["category_name"]
    if cs not in cats:
        cats[cs] = {"slug": cs, "name": cn, "image": p["primary_image"], "count": 0}
    cats[cs]["count"] += 1
categories = []
order = 0
for cs in cat_order:
    if cs in cats:
        c = cats[cs]; order += 1
        categories.append({"id": f"cat-{order:02d}", "name": c["name"], "slug": cs,
                           "image_url": c["image"], "display_order": order, "children": []})
# any leftover
for cs, c in cats.items():
    if cs not in cat_order:
        order += 1
        categories.append({"id": f"cat-{order:02d}", "name": c["name"], "slug": cs,
                           "image_url": c["image"], "display_order": order, "children": []})

# ---- write TS ----
os.makedirs(os.path.dirname(OUT_TS), exist_ok=True)
with open(OUT_TS, "w", encoding="utf-8") as fh:
    fh.write("// AUTO-GENERATED from jewellery photos. Do not edit by hand.\n")
    fh.write("// Regenerate via scratchpad/assemble.py. Prices derived from weight.\n")
    fh.write(f"// GOLD_RATE_18K = {int(GOLD_RATE_18K)} Rs/g. Change pricing there and re-run.\n\n")
    fh.write("export interface CatalogProduct {\n"
             "  id: string; name: string; slug: string; primary_image: string;\n"
             "  base_price: string; discount_price: string | null; price: string;\n"
             "  material: string; purity: string | null; weight_grams: string | null;\n"
             "  is_featured: boolean; stock_quantity: number;\n"
             "  category_slug: string; category_name: string;\n"
             "  description: string; sku: string;\n"
             "  images: { id: string; image_url: string; display_order: number; is_primary: boolean }[];\n"
             "  gender: string; type: string; carats: number;\n}\n\n")
    fh.write("export interface CatalogCategory {\n"
             "  id: string; name: string; slug: string; image_url: string | null;\n"
             "  display_order: number; children: CatalogCategory[];\n}\n\n")
    fh.write("export const CATALOG_PRODUCTS: CatalogProduct[] = ")
    fh.write(json.dumps(products, ensure_ascii=False, indent=2))
    fh.write(";\n\n")
    fh.write("export const CATALOG_CATEGORIES: CatalogCategory[] = ")
    fh.write(json.dumps(categories, ensure_ascii=False, indent=2))
    fh.write(";\n")

print(f"Products: {len(products)}  Images used: {len(img_used)}  Categories: {len(categories)}")
print("By category:")
for c in categories:
    print(f"  {c['name']:22s} {cats[c['slug']]['count']}")
print(f"Featured: {sum(1 for p in products if p['is_featured'])}")
print(f"Men's items: {sum(1 for p in products if p['gender']=='men')}")
