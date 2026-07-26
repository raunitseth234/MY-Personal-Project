"""
Copy and rename jewellery photos from E:\\final hai to the website's static directory.
Run on Windows host (NOT inside Docker) BEFORE running seed_batch2.py.

Each file in the source folder is treated as one unique product.
Files are auto-categorised by their WhatsApp timestamp:

  1:03:00 - 1:03:12 PM  -> haar (teal mannequin necklaces)       haar_056 - haar_101
  1:03:13 - 1:03:28 PM  -> mangalsutra                            mangalsutra_017 - mangalsutra_073
  1:03:29 - 1:03:34 PM  -> chain (pendant chains)                 chain_018 - chain_037
  1:03:35 - 1:03:37 PM  -> bangles                                bangles_019 - bangles_029
  1:03:38 - 1:03:39 PM  -> haar (black background, heavy haar)    haar_102 - haar_108
  1:03:40 - 1:03:46 PM  -> earrings                               earrings_086 - earrings_110
  1:03:47 - 1:03:48 PM  -> haar (necklace sets on teal)           haar_109 - haar_116

Usage:
    python scripts/process_batch2_images.py            # copy files
    python scripts/process_batch2_images.py --dry-run  # preview only
"""
import re
import shutil
import sys
from pathlib import Path

SOURCE_DIR = Path(r"E:\final hai")
TARGET_DIR = Path(r"E:\rajesh-backend\static\images\products")

# (start_total_sec_inclusive, end_total_sec_inclusive, cat_prefix, start_product_num)
# All times are 1:03:XX PM  =>  base = 13*3600 + 3*60 = 46980
_BASE = 13 * 3600 + 3 * 60

CATEGORY_RANGES = [
    (_BASE +  0, _BASE + 12, "haar",        56),
    (_BASE + 13, _BASE + 28, "mangalsutra", 17),
    (_BASE + 29, _BASE + 34, "chain",       18),
    (_BASE + 35, _BASE + 37, "bangles",     19),
    (_BASE + 38, _BASE + 39, "haar",       102),
    (_BASE + 40, _BASE + 46, "earrings",   86),
    (_BASE + 47, _BASE + 48, "haar",       109),
]


def parse_filename(name: str):
    """Return (total_seconds, variant_num) or None if not a WhatsApp image."""
    m = re.search(
        r"at (\d+)\.(\d+)\.(\d+) (AM|PM)(?:\s+\((\d+)\))?",
        name,
    )
    if not m:
        return None
    h, mi, s, ampm, var = m.group(1, 2, 3, 4, 5)
    h = int(h)
    if ampm == "PM" and h != 12:
        h += 12
    elif ampm == "AM" and h == 12:
        h = 0
    total_sec = h * 3600 + int(mi) * 60 + int(s)
    return (total_sec, int(var) if var else 0)


def assign_category(total_sec):
    for start, end, cat, start_num in CATEGORY_RANGES:
        if start <= total_sec <= end:
            return (cat, start_num)
    return None


def main():
    dry_run = "--dry-run" in sys.argv

    if not SOURCE_DIR.exists():
        print(f"ERROR: Source directory not found: {SOURCE_DIR}")
        sys.exit(1)

    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    # Collect and sort all source files
    all_files = []
    for f in SOURCE_DIR.glob("*.jpeg"):
        parsed = parse_filename(f.name)
        if parsed:
            all_files.append((parsed, f))
        else:
            print(f"  SKIP (unrecognised name): {f.name}")

    all_files.sort(key=lambda x: x[0])  # sort by (total_sec, variant)

    # Group by category, then assign sequential product numbers
    cat_counters = {}  # cat_prefix -> next product number

    copied = skipped = errors = 0

    for (total_sec, variant), src in all_files:
        cat_info = assign_category(total_sec)
        if cat_info is None:
            print(f"  SKIP (out of range, sec={total_sec}): {src.name}")
            continue

        cat, start_num = cat_info
        counter_key = cat + str(start_num)
        if counter_key not in cat_counters:
            cat_counters[counter_key] = start_num
        prod_num = cat_counters[counter_key]
        cat_counters[counter_key] += 1

        dst_name = f"{cat}_{prod_num:03d}_01.jpg"
        dst = TARGET_DIR / dst_name

        if dry_run:
            status = "EXISTS" if dst.exists() else "COPY  "
            print(f"  {status}: {src.name[:60]:<60} -> {dst_name}")
            copied += 1
        else:
            try:
                shutil.copy2(str(src), str(dst))
                copied += 1
                print(f"  OK: {dst_name}")
            except Exception as e:
                errors += 1
                print(f"  ERR: {dst_name} <- {e}")

    print(f"\n{'[DRY RUN] ' if dry_run else ''}Done.")
    print(f"  Copied : {copied}")
    if errors:
        print(f"  Errors : {errors}")
    print()
    print("Category summary:")
    for key, val in sorted(cat_counters.items()):
        print(f"  {key}: {val}")


if __name__ == "__main__":
    main()
