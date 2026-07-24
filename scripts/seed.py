"""
Seed script for Rajesh Jewellers database.
Run with: docker-compose exec api python scripts/seed.py

Creates:
  - 11 categories (matching frontend exactly)
  - 3 hero banners
  - 3 announcement messages
  - 5 testimonials
  - 1 store location
  - 30 sample products with Unsplash images
"""
import asyncio
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import select
from app.db.postgres import AsyncSessionLocal, engine, Base
from app.models.all_models import (
    Category, Product, ProductImage, StoreLocation,
    HeroBanner, AnnouncementMessage, Testimonial,
    MaterialType
)


# ─────────── Category definitions ───────────
CATEGORIES = [
    {"name": "Rings",         "slug": "rings",         "order": 1,  "img": "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400"},
    {"name": "Earrings",      "slug": "earrings",      "order": 2,  "img": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"},
    {"name": "Chain",         "slug": "chain",         "order": 3,  "img": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"},
    {"name": "Bangles",       "slug": "bangles",       "order": 4,  "img": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400"},
    {"name": "Stud",          "slug": "stud",          "order": 5,  "img": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400"},
    {"name": "Pendants",      "slug": "pendants",      "order": 6,  "img": "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400"},
    {"name": "Murti",         "slug": "murti",         "order": 7,  "img": "https://images.unsplash.com/photo-1624365169364-0640dd10e180?w=400"},
    {"name": "Solitaires",    "slug": "solitaires",    "order": 8,  "img": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400"},
    {"name": "Gifting",       "slug": "gifting",       "order": 9,  "img": "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400"},
    {"name": "Mangalsutra",   "slug": "mangalsutra",   "order": 10, "img": "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400"},
    {"name": "Men's Jewelry", "slug": "mens-jewelry",  "order": 11, "img": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400"},
]


# ─────────── Products (30 total) ───────────
PRODUCTS_DATA = [
    # RINGS
    {"name": "Kundan Floral Ring",             "slug": "kundan-floral-ring-001",         "cat": "rings",       "material": "gold",     "purity": "22K", "weight": 4.2,  "base": 32000,  "disc": 28900, "sku": "RNG001", "stock": 15, "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600"],
     "desc": "Intricate kundan work ring in 22K gold with floral design. Perfect for weddings and festivals."},

    {"name": "Solitaire Diamond Ring",         "slug": "solitaire-diamond-ring-002",     "cat": "solitaires",  "material": "diamond",  "purity": "18K", "weight": 3.1,  "base": 85000,  "disc": None,  "sku": "SOL001", "stock": 8,  "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600"],
     "desc": "IGI certified 0.5 carat solitaire diamond ring in 18K white gold. VVS1 clarity, F color."},

    {"name": "Gold Band Ring for Men",         "slug": "gold-band-ring-men-003",         "cat": "mens-jewelry","material": "gold",     "purity": "22K", "weight": 6.5,  "base": 48000,  "disc": 44000, "sku": "RNG002", "stock": 20, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1576511306226-28918a300abe?w=600"],
     "desc": "Classic 22K gold band ring for men. Polished finish with slight texture."},

    # EARRINGS
    {"name": "Kundan Chandbali Earrings",      "slug": "kundan-chandbali-earrings-004",  "cat": "earrings",    "material": "gold",     "purity": "22K", "weight": 8.3,  "base": 62000,  "disc": 57000, "sku": "EAR001", "stock": 12, "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600", "https://images.unsplash.com/photo-1573408301185-9519f94bdb1b?w=600"],
     "desc": "Traditional chandbali earrings with kundan setting. Perfect for bridal occasions."},

    {"name": "Diamond Drop Earrings",          "slug": "diamond-drop-earrings-005",      "cat": "earrings",    "material": "diamond",  "purity": "18K", "weight": 2.8,  "base": 45000,  "disc": 41000, "sku": "EAR002", "stock": 6,  "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600"],
     "desc": "Elegant diamond drop earrings in 18K yellow gold. IGI certified, 0.3 carats total."},

    {"name": "Gold Stud Earrings Simple",      "slug": "gold-stud-earrings-006",         "cat": "stud",        "material": "gold",     "purity": "22K", "weight": 1.5,  "base": 11500,  "disc": None,  "sku": "STD001", "stock": 30, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1573408301185-9519f94bdb1b?w=600"],
     "desc": "Simple everyday gold stud earrings in 22K. Lightweight and comfortable."},

    {"name": "Ruby Gold Jhumka",               "slug": "ruby-gold-jhumka-007",           "cat": "earrings",    "material": "gold",     "purity": "22K", "weight": 9.2,  "base": 71000,  "disc": 65000, "sku": "EAR003", "stock": 9,  "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600"],
     "desc": "Traditional jhumka earrings with ruby stones set in 22K gold. Festive design."},

    # CHAIN
    {"name": "22K Gold Rope Chain",            "slug": "22k-gold-rope-chain-008",        "cat": "chain",       "material": "gold",     "purity": "22K", "weight": 12.0, "base": 92000,  "disc": 85000, "sku": "CHN001", "stock": 10, "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600", "https://images.unsplash.com/photo-1576500278684-8ca96975c0ae?w=600"],
     "desc": "Classic 22K gold rope chain, 18 inches. Durable twist design for everyday wear."},

    {"name": "Diamond Cut Box Chain",          "slug": "diamond-cut-box-chain-009",      "cat": "chain",       "material": "gold",     "purity": "18K", "weight": 8.5,  "base": 58000,  "disc": 52000, "sku": "CHN002", "stock": 14, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"],
     "desc": "18K gold box chain with diamond cut finish. 20 inches length."},

    {"name": "Silver Curb Chain for Men",      "slug": "silver-curb-chain-men-010",      "cat": "mens-jewelry","material": "silver",   "purity": "925", "weight": 15.0, "base": 3500,   "disc": 2999,  "sku": "CHN003", "stock": 25, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1679973298076-07d422275c7a?w=600"],
     "desc": "925 Sterling Silver curb chain for men. Heavy gauge, 22 inches."},

    # BANGLES
    {"name": "22K Kadha Bangle Pair",          "slug": "22k-kadha-bangle-pair-011",      "cat": "bangles",     "material": "gold",     "purity": "22K", "weight": 22.0, "base": 170000, "disc": 158000,"sku": "BNG001", "stock": 5,  "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600", "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600"],
     "desc": "Heavy 22K gold kadha bangle pair. Traditional design with meena work."},

    {"name": "Diamond Bracelet Bangle",        "slug": "diamond-bracelet-bangle-012",    "cat": "bangles",     "material": "diamond",  "purity": "18K", "weight": 10.2, "base": 125000, "disc": 112000,"sku": "BNG002", "stock": 4,  "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600"],
     "desc": "18K gold diamond bracelet bangle. 1.5 carat total diamond weight, IGI certified."},

    {"name": "Silver Filigree Bangle Set",     "slug": "silver-filigree-bangle-013",     "cat": "bangles",     "material": "silver",   "purity": "925", "weight": 18.0, "base": 4200,   "disc": 3799,  "sku": "BNG003", "stock": 20, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600"],
     "desc": "925 Sterling Silver filigree work bangle set of 4. Delicate craftsmanship."},

    # PENDANTS
    {"name": "Ganesh Pendant in Gold",         "slug": "ganesh-pendant-gold-014",        "cat": "pendants",    "material": "gold",     "purity": "22K", "weight": 3.8,  "base": 29000,  "disc": 26500, "sku": "PND001", "stock": 18, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600",
              "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600"],
     "desc": "Lord Ganesh pendant in 22K gold. BIS Hallmarked. Ideal gifting option."},

    {"name": "Diamond Solitaire Pendant",      "slug": "diamond-solitaire-pendant-015",  "cat": "pendants",    "material": "diamond",  "purity": "18K", "weight": 1.9,  "base": 38000,  "disc": 34000, "sku": "PND002", "stock": 7,  "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600",
              "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600"],
     "desc": "0.25 carat solitaire diamond pendant in 18K gold. IGI certified stone."},

    {"name": "Pearl Teardrop Pendant",         "slug": "pearl-teardrop-pendant-016",     "cat": "pendants",    "material": "gold",     "purity": "18K", "weight": 2.1,  "base": 15500,  "disc": None,  "sku": "PND003", "stock": 22, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
              "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600"],
     "desc": "South Sea pearl teardrop pendant in 18K rose gold. Elegant daily wear."},

    # MANGALSUTRA
    {"name": "Black Bead Mangalsutra 22K",     "slug": "black-bead-mangalsutra-017",     "cat": "mangalsutra", "material": "gold",     "purity": "22K", "weight": 9.5,  "base": 73000,  "disc": 67000, "sku": "MNG001", "stock": 11, "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600",
              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"],
     "desc": "Traditional black bead mangalsutra in 22K gold. 18 inch length with box lock."},

    {"name": "Diamond Mangalsutra Modern",     "slug": "diamond-mangalsutra-modern-018", "cat": "mangalsutra", "material": "diamond",  "purity": "18K", "weight": 5.0,  "base": 65000,  "disc": 58500, "sku": "MNG002", "stock": 6,  "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=600",
              "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600"],
     "desc": "Contemporary diamond mangalsutra in 18K white gold. 0.5 carat diamond."},

    # SOLITAIRES
    {"name": "1 Carat Solitaire Ring",         "slug": "1-carat-solitaire-ring-019",     "cat": "solitaires",  "material": "diamond",  "purity": "18K", "weight": 4.5,  "base": 185000, "disc": None,  "sku": "SOL002", "stock": 3,  "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=600"],
     "desc": "1 carat GIA certified round brilliant solitaire. VS1 clarity, G color, Excellent cut."},

    {"name": "Pear Shaped Solitaire Pendant",  "slug": "pear-solitaire-pendant-020",     "cat": "solitaires",  "material": "diamond",  "purity": "18K", "weight": 2.2,  "base": 72000,  "disc": 65000, "sku": "SOL003", "stock": 5,  "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=600"],
     "desc": "Pear shaped 0.5 carat solitaire pendant in 18K yellow gold. IGI certified."},

    # MURTI
    {"name": "Lakshmi Murti Pure Gold",        "slug": "lakshmi-murti-pure-gold-021",    "cat": "murti",       "material": "gold",     "purity": "22K", "weight": 15.0, "base": 115000, "disc": 108000,"sku": "MRT001", "stock": 4,  "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1567591370078-1598f0c9a9f5?w=600"],
     "desc": "Goddess Lakshmi idol in 22K gold. 3 cm height. BIS Hallmarked. Perfect for puja ghar."},

    {"name": "Ganesha Murti Silver",           "slug": "ganesha-murti-silver-022",       "cat": "murti",       "material": "silver",   "purity": "925", "weight": 45.0, "base": 8500,   "disc": 7999,  "sku": "MRT002", "stock": 10, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1567591370078-1598f0c9a9f5?w=600"],
     "desc": "Lord Ganesha idol in 925 sterling silver. 5 cm height. Gift packed."},

    # GIFTING
    {"name": "Gold Coin 5g 24K",               "slug": "gold-coin-5g-24k-023",           "cat": "gifting",     "material": "gold",     "purity": "24K", "weight": 5.0,  "base": 40000,  "disc": None,  "sku": "GFT001", "stock": 30, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600"],
     "desc": "24K pure gold coin 5g with Lakshmi embossing. BIS Hallmarked. Comes in gift box."},

    {"name": "Silver Gift Set — Bowl & Spoon", "slug": "silver-gift-set-bowl-024",       "cat": "gifting",     "material": "silver",   "purity": "925", "weight": 120.0,"base": 22000,  "disc": 19500, "sku": "GFT002", "stock": 8,  "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600"],
     "desc": "925 sterling silver bowl and spoon gift set. Ideal for baby naming ceremonies and weddings."},

    {"name": "Gold Biscuit 10g 24K",           "slug": "gold-biscuit-10g-24k-025",       "cat": "gifting",     "material": "gold",     "purity": "24K", "weight": 10.0, "base": 80000,  "disc": None,  "sku": "GFT003", "stock": 15, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600"],
     "desc": "10g 24K gold biscuit. BIS Hallmarked. MMTC certified."},

    # MEN'S JEWELRY
    {"name": "Men's Gold Ring Broad",          "slug": "mens-gold-ring-broad-026",       "cat": "mens-jewelry","material": "gold",     "purity": "22K", "weight": 8.0,  "base": 61000,  "disc": 56500, "sku": "MNS001", "stock": 14, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1588181725840-1e5e8f815ba3?w=600"],
     "desc": "Broad 22K gold ring for men with engine-turned finish. Bold masculine design."},

    {"name": "Men's Silver Kada",              "slug": "mens-silver-kada-027",           "cat": "mens-jewelry","material": "silver",   "purity": "925", "weight": 60.0, "base": 12500,  "disc": 10999, "sku": "MNS002", "stock": 18, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1628785517892-dbcd2f2719ed?w=600"],
     "desc": "Heavy 925 sterling silver kada for men. Polished keel design."},

    # STUD
    {"name": "Diamond Stud Earrings 0.5ct",    "slug": "diamond-stud-earrings-028",      "cat": "stud",        "material": "diamond",  "purity": "18K", "weight": 1.8,  "base": 42000,  "disc": 38500, "sku": "STD002", "stock": 9,  "featured": True,
     "imgs": ["https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600"],
     "desc": "0.5 carat total diamond stud earrings in 18K gold. IGI certified, VS1 clarity."},

    {"name": "Pearl Stud Earrings Gold",       "slug": "pearl-stud-earrings-029",        "cat": "stud",        "material": "gold",     "purity": "18K", "weight": 1.2,  "base": 8500,   "disc": 7500,  "sku": "STD003", "stock": 25, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1573408301185-9519f94bdb1b?w=600"],
     "desc": "South Sea pearl stud earrings set in 18K gold. 7mm pearl size."},

    {"name": "Ruby Stud Earrings 22K",         "slug": "ruby-stud-earrings-030",         "cat": "stud",        "material": "gold",     "purity": "22K", "weight": 2.1,  "base": 17500,  "disc": 15900, "sku": "STD004", "stock": 12, "featured": False,
     "imgs": ["https://images.unsplash.com/photo-1573408301185-9519f94bdb1b?w=600"],
     "desc": "Natural ruby stud earrings in 22K gold. Rich red color, treated stone."},
]


async def seed():
    async with AsyncSessionLocal() as db:
        print("Creating categories...")
        cat_map = {}
        for c in CATEGORIES:
            result = await db.execute(select(Category).where(Category.slug == c["slug"]))
            existing = result.scalar_one_or_none()
            if not existing:
                cat = Category(
                    name=c["name"], slug=c["slug"],
                    image_url=c["img"], display_order=c["order"]
                )
                db.add(cat)
                await db.flush()
                cat_map[c["slug"]] = cat.id
                print(f"  Created category: {c['name']}")
            else:
                cat_map[c["slug"]] = existing.id
                print(f"  Skipped (exists): {c['name']}")

        print("\nCreating products...")
        for p in PRODUCTS_DATA:
            result = await db.execute(select(Product).where(Product.sku == p["sku"]))
            if result.scalar_one_or_none():
                print(f"  Skipped (exists): {p['name']}")
                continue

            product = Product(
                name=p["name"], slug=p["slug"],
                category_id=cat_map[p["cat"]],
                description=p["desc"],
                material=MaterialType(p["material"]),
                purity=p.get("purity"),
                weight_grams=p.get("weight"),
                base_price=p["base"],
                discount_price=p.get("disc"),
                sku=p["sku"],
                stock_quantity=p["stock"],
                is_featured=p.get("featured", False),
                is_active=True,
            )
            db.add(product)
            await db.flush()

            for i, img_url in enumerate(p.get("imgs", [])):
                img = ProductImage(
                    product_id=product.id,
                    image_url=img_url,
                    display_order=i,
                    is_primary=(i == 0),
                )
                db.add(img)

            print(f"  Created: {p['name']}")

        print("\nCreating store location...")
        result = await db.execute(select(StoreLocation))
        if not result.scalar_one_or_none():
            store = StoreLocation(
                name="Rajesh Jewellers — Main Store",
                address="Main Bazaar Road, Chowk",
                city="Varanasi",
                state="Uttar Pradesh",
                phone="+91 98765 43210",
                map_link="https://maps.google.com/?q=Rajesh+Jewellers+Varanasi",
                opening_hours={"Mon-Sun": "10:30 AM – 8:30 PM"},
            )
            db.add(store)

        print("Creating hero banners...")
        result = await db.execute(select(HeroBanner))
        if not result.scalars().all():
            for i, banner in enumerate([
                {"title": "Our Luxury Jewelry Collection", "subtitle": "RAJESH JEWELLERS PRESENTS",
                 "img": "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=1920",
                 "cta_text": "EXPLORE COLLECTION", "cta_url": "/collections"},
                {"title": "Festive Heirlooms",             "subtitle": "EXCLUSIVE COLLECTION",
                 "img": "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1920",
                 "cta_text": "SHOP NOW", "cta_url": "/products?sort=featured"},
                {"title": "Golden Hour",                   "subtitle": "OCCASION JEWELLERY",
                 "img": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920",
                 "cta_text": "VIEW COLLECTION", "cta_url": "/collections"},
            ]):
                db.add(HeroBanner(
                    title=banner["title"], subtitle=banner["subtitle"],
                    image_url=banner["img"], cta_text=banner["cta_text"],
                    cta_url=banner["cta_url"], display_order=i, is_active=True
                ))

        print("Creating announcements...")
        result = await db.execute(select(AnnouncementMessage))
        if not result.scalars().all():
            messages = [
                ("Visit our exclusive store — Rajesh Jewellers", None),
                ("Trusted since generations — Shree Vishwanath Prasad Seth", None),
                ("BIS HALLMARKED 916 GOLD | CERTIFIED DIAMONDS", None),
                ("Free insured home delivery on orders above ₹50,000", "/shipping"),
                ("Easy Old Gold Exchange — Get best value for your old gold", "/exchange"),
            ]
            for i, (msg, link) in enumerate(messages):
                db.add(AnnouncementMessage(
                    message=msg, link_url=link, display_order=i, is_active=True
                ))

        print("Creating testimonials...")
        result = await db.execute(select(Testimonial))
        if not result.scalars().all():
            testimonials = [
                ("Priya Sharma", "Lucknow", 5, "Bought my wedding set here. The quality of gold and craftsmanship is exceptional. Highly recommend Rajesh Jewellers!", 0),
                ("Rohit Khanna", "Lucknow", 5, "Amazing collection and trustworthy service. The staff helped me choose the perfect diamond ring. Will definitely come back.", 1),
                ("Sunita Agarwal", "Varanasi", 5, "Been buying jewellery from Rajesh Jewellers for 15 years. Never disappointed. Their kundan work is the best in Varanasi.", 2),
                ("Amit Verma", "Allahabad", 4, "Good quality products and reasonable making charges. The gold rate is competitive. Home delivery was smooth.", 3),
                ("Meena Singh", "Jaunpur", 5, "Bought a mangalsutra and earrings for my daughter's wedding. Both are stunning. The BIS hallmarking gives great confidence.", 4),
            ]
            for name, loc, rating, comment, order in testimonials:
                db.add(Testimonial(
                    customer_name=name, customer_location=loc,
                    rating=rating, comment=comment, display_order=order, is_active=True
                ))

        await db.commit()
        print("\nSeed completed successfully!")
        print(f"  Categories: {len(CATEGORIES)}")
        print(f"  Products: {len(PRODUCTS_DATA)}")
        print("  Store locations, banners, announcements, testimonials: done")
        print("\nRun: docker-compose exec api python scripts/create_admin.py")


if __name__ == "__main__":
    asyncio.run(seed())
