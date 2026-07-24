"""
Copy and process jewellery photos from E:\\Jewellery pics into static/images/products/.
For each image: crop bottom 15% (removes weight stamp overlay), resize to max 1200px, save JPEG 85.
Run from E:\\rajesh-backend directory: python scripts/process_images.py
"""
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow not installed: pip install pillow")

SRC = Path("E:/Jewellery pics")
DST = Path("static/images/products")
DST.mkdir(parents=True, exist_ok=True)

CROP_BOTTOM = 0.15  # remove bottom 15% to eliminate weight stamp overlay
MAX_SIDE = 1200     # resize so longest side <= 1200px


def process(src_path: Path, dst_path: Path):
    try:
        with Image.open(src_path) as img:
            w, h = img.size
            crop_h = int(h * (1 - CROP_BOTTOM))
            img = img.crop((0, 0, w, crop_h))
            if max(img.size) > MAX_SIDE:
                img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
            img = img.convert("RGB")
            img.save(dst_path, "JPEG", quality=85, optimize=True)
        print(f"  OK  {dst_path.name}")
    except Exception as exc:
        print(f"  ERR {src_path.name}: {exc}", file=sys.stderr)


# ── Product groups ──────────────────────────────────────────────────────────
# Each inner list = all images for ONE product (same timestamp = same piece).
# First image in each group becomes the primary product image.

CHAIN_PRODUCTS = [
    ["WhatsApp Image 2026-07-23 at 5.41.07 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.07 PM (1).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.08 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.08 PM (1).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.09 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.09 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.09 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.10 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.10 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.10 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.11 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.11 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.11 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.12 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.12 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.12 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.13 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.13 PM (1).jpeg"],
    # Plain gold fancy-link chain necklace with pineapple motif (8.47.54 AM)
    ["WhatsApp Image 2026-07-24 at 8.47.54 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.54 AM (1).jpeg"],
    # Plain gold box chain with barrel beads and tassel pendant (8.47.52 AM)
    ["WhatsApp Image 2026-07-24 at 8.47.52 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.52 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.52 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.52 AM (3).jpeg"],
]

BANGLES_PRODUCTS = [
    ["WhatsApp Image 2026-07-23 at 5.41.14 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.14 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.14 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.15 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.15 PM (1).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.16 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.16 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.16 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.17 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.17 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.17 PM (2).jpeg"],
]

EARRINGS_PRODUCTS = [
    # Each image file is a separate earring product (verified: same-second images = different designs)
    ["WhatsApp Image 2026-07-23 at 5.41.20 PM.jpeg"],       # ERG-001 11.110g
    ["WhatsApp Image 2026-07-23 at 5.41.20 PM (1).jpeg"],   # ERG-002 13.290g
    ["WhatsApp Image 2026-07-23 at 5.41.20 PM (2).jpeg"],   # ERG-003 11.170g
    ["WhatsApp Image 2026-07-23 at 5.41.21 PM.jpeg"],       # ERG-004 4.400g
    ["WhatsApp Image 2026-07-23 at 5.41.21 PM (1).jpeg"],   # ERG-005 9.200g
    ["WhatsApp Image 2026-07-23 at 5.41.21 PM (2).jpeg"],   # ERG-006 8.640g
    ["WhatsApp Image 2026-07-23 at 5.41.22 PM.jpeg"],       # ERG-007 8.520g
    ["WhatsApp Image 2026-07-23 at 5.41.22 PM (1).jpeg"],   # ERG-008 4.840g
    ["WhatsApp Image 2026-07-23 at 5.41.22 PM (2).jpeg"],   # ERG-009 7.240g
    ["WhatsApp Image 2026-07-23 at 5.41.23 PM.jpeg"],       # ERG-010 4.730g
    ["WhatsApp Image 2026-07-23 at 5.41.23 PM (1).jpeg"],   # ERG-011 4.560g
    ["WhatsApp Image 2026-07-23 at 5.41.23 PM (2).jpeg"],   # ERG-012 5.240g
    ["WhatsApp Image 2026-07-23 at 5.41.24 PM.jpeg"],       # ERG-013 5.280g
    ["WhatsApp Image 2026-07-23 at 5.41.24 PM (1).jpeg"],   # ERG-014 6.850g
    ["WhatsApp Image 2026-07-23 at 5.41.24 PM (2).jpeg"],   # ERG-015 6.700g
    ["WhatsApp Image 2026-07-23 at 5.41.25 PM.jpeg"],       # ERG-016 6.730g
    ["WhatsApp Image 2026-07-23 at 5.41.25 PM (1).jpeg"],   # ERG-017 5.390g
    ["WhatsApp Image 2026-07-23 at 5.41.25 PM (2).jpeg"],   # ERG-018 8.230g
    ["WhatsApp Image 2026-07-23 at 5.41.26 PM.jpeg"],       # ERG-019 7.350g
    ["WhatsApp Image 2026-07-23 at 5.41.27 PM.jpeg"],       # ERG-020 5.789g
    ["WhatsApp Image 2026-07-23 at 5.41.27 PM (1).jpeg"],   # ERG-021 10.980g
    ["WhatsApp Image 2026-07-23 at 5.41.28 PM.jpeg"],       # ERG-022 8.020g
    ["WhatsApp Image 2026-07-23 at 5.41.28 PM (1).jpeg"],   # ERG-023 8.470g
    ["WhatsApp Image 2026-07-23 at 5.41.29 PM.jpeg"],       # ERG-024 8.520g
    # Bridal nath (nose ring) - categorised under Earrings as closest available category
    ["WhatsApp Image 2026-07-24 at 8.47.34 AM (2).jpeg"],   # ERG-025 20.0g (est.)
]

# NOTE: 8.47.33 AM (3) is a RING - excluded from haar, handled in RINGS_PRODUCTS
# NOTE: 8.47.34 AM (2) is a NATH (nose ring) - moved to EARRINGS_PRODUCTS (closest category)
HAAR_PRODUCTS = [
    # Jul 23 small batch (flat haars laid on surface)
    ["WhatsApp Image 2026-07-23 at 5.41.18 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.18 PM (1).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.19 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.19 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.19 PM (2).jpeg"],
    # Jul 23 bridal haar batch (large necklace sets on mannequin)
    ["WhatsApp Image 2026-07-23 at 5.41.30 PM.jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.31 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.31 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.31 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.32 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.32 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.32 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.33 PM.jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.33 PM (1).jpeg",
     "WhatsApp Image 2026-07-23 at 5.41.33 PM (2).jpeg"],
    ["WhatsApp Image 2026-07-23 at 5.41.34 PM.jpeg"],
    # Jul 24 batch (bridal necklace sets on teal mannequin + dark background)
    ["WhatsApp Image 2026-07-24 at 8.47.25 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.25 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.25 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.26 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.26 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.26 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.27 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.27 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.27 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.27 AM (3).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.27 AM (4).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.28 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.28 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.28 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.28 AM (3).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.29 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.29 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.29 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.29 AM (3).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.30 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.30 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.30 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.30 AM (3).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.31 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.31 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.31 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.31 AM (3).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.32 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.32 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.32 AM (2).jpeg"],
    # 8.47.33 AM group: (3) is a ring, excluded below
    ["WhatsApp Image 2026-07-24 at 8.47.33 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.33 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.33 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.33 AM (4).jpeg"],
    # 8.47.34 AM group: (2) is a nath, excluded below
    ["WhatsApp Image 2026-07-24 at 8.47.34 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.34 AM (1).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.35 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.35 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.35 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.36 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.36 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.36 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.36 AM (3).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.37 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.37 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.37 AM (2).jpeg"],
    # Previously skipped: teal mannequin necklace sets with no weight stamp (now included with estimated weight)
    ["WhatsApp Image 2026-07-24 at 8.47.45 AM.jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.46 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.46 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.46 AM (2).jpeg"],
]

MANGALSUTRA_PRODUCTS = [
    # Primary mangalsutra batch (8.47.38-8.47.44 AM, white mannequin)
    ["WhatsApp Image 2026-07-24 at 8.47.38 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.38 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.38 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.39 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.39 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.39 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.40 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.40 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.40 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.40 AM (3).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.41 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.41 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.41 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.42 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.42 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.42 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.42 AM (3).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.43 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.43 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.43 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.44 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.44 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.44 AM (2).jpeg"],
    # Mixed zone confirmed mangalsutras (8.47.47-8.47.53 AM)
    ["WhatsApp Image 2026-07-24 at 8.47.47 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.47 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.47 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.48 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.48 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.48 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.49 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.49 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.49 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.49 AM (3).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.50 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.50 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.50 AM (2).jpeg"],
    ["WhatsApp Image 2026-07-24 at 8.47.51 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.51 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.51 AM (2).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.51 AM (3).jpeg"],
    # 8.47.52 AM is a chain (box chain), moved to CHAIN_PRODUCTS
    ["WhatsApp Image 2026-07-24 at 8.47.53 AM.jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.53 AM (1).jpeg",
     "WhatsApp Image 2026-07-24 at 8.47.53 AM (2).jpeg"],
]

# Real ring found in haar batch (8.47.33 AM (3) confirmed gold ring 7.660g)
RINGS_PRODUCTS = [
    ["WhatsApp Image 2026-07-24 at 8.47.33 AM (3).jpeg"],
]


def output_name(category: str, prod_idx: int, img_idx: int) -> str:
    return f"{category}_{prod_idx:03d}_{img_idx:02d}.jpg"


def process_category(name: str, products: list) -> dict:
    """Process all images in a category. Returns {product_key: [url_list]}."""
    print(f"\n[{name.upper()}] {len(products)} products")
    mapping = {}
    for pi, group in enumerate(products, start=1):
        urls = []
        for ii, fname in enumerate(group, start=1):
            src = SRC / fname
            if not src.exists():
                print(f"  SKIP {fname} (not found)")
                continue
            dst_name = output_name(name, pi, ii)
            process(src, DST / dst_name)
            urls.append(f"/static/images/products/{dst_name}")
        mapping[f"{name}_{pi:03d}"] = urls
    return mapping


if __name__ == "__main__":
    results = {}
    results.update(process_category("chain", CHAIN_PRODUCTS))
    results.update(process_category("bangles", BANGLES_PRODUCTS))
    results.update(process_category("earrings", EARRINGS_PRODUCTS))
    results.update(process_category("haar", HAAR_PRODUCTS))
    results.update(process_category("mangalsutra", MANGALSUTRA_PRODUCTS))
    results.update(process_category("rings", RINGS_PRODUCTS))

    print(f"\nDone. {sum(len(v) for v in results.values())} images -> {DST}")

    print("\n── URL Map ──")
    for key, urls in results.items():
        print(f"{key}: {urls[0] if urls else 'NO IMAGES'}")
