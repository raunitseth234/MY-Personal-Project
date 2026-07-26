"""
Copy and rename jewellery photos from source directory to website's static directory.
Run on Windows host (NOT inside Docker) BEFORE running seed_new_batch.py.

Source: E:\\My jewel pics all\\
Target: E:\\rajesh-backend\\static\\images\\products\\

Usage:
    python scripts/process_new_images.py            # actually copy files
    python scripts/process_new_images.py --dry-run  # preview only
    python scripts/process_new_images.py --missing  # show source files not found
"""
import shutil
import sys
from pathlib import Path

SOURCE_DIR = Path(r"E:\My jwel pics all")
TARGET_DIR = Path(r"E:\rajesh-backend\static\images\products")

# Each source filename maps to a list of (category_prefix, product_num, image_num).
# When one photo contains multiple products, all target assignments are listed.
# The target filename is: {cat}_{num:03d}_{img:02d}.jpg
IMAGE_MAPPING = {

    # ── CHAINS ──────────────────────────────────────────────────────
    "WhatsApp Image 2026-07-24 at 12.20.03 PM (1).jpeg": [
        ("chain", 10, 1), ("chain", 11, 1),
    ],
    "WhatsApp Image 2026-07-24 at 12.20.09 PM (2).jpeg": [
        ("chain", 12, 1), ("chain", 13, 1),
    ],
    "WhatsApp Image 2026-07-24 at 12.20.21 PM.jpeg":      [("chain", 14, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.29 PM.jpeg":      [("chain", 15, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.30 PM (3).jpeg":  [("chain", 16, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.32 PM (1).jpeg":  [("chain", 17, 1)],

    # ── NATH (nose rings) ────────────────────────────────────────────
    "WhatsApp Image 2026-07-24 at 12.20.10 PM.jpeg":      [("nath", 1, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.10 PM (1).jpeg":  [("nath", 2, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.10 PM (2).jpeg":  [("nath", 3, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.11 PM.jpeg":      [("nath", 4, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.11 PM (1).jpeg":  [("nath", 5, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.11 PM (2).jpeg":  [("nath", 6, 1)],

    # ── HAAR / NECKLACE SETS ─────────────────────────────────────────
    "WhatsApp Image 2026-07-24 at 12.20.05 PM.jpeg":      [("haar", 23, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.06 PM.jpeg":      [("haar", 24, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.09 PM.jpeg":      [("haar", 25, 1)],
    # haar_026 necklace + earrings_026 matching set earrings from same photo
    "WhatsApp Image 2026-07-24 at 12.20.17 PM.jpeg": [
        ("haar", 26, 1), ("earrings", 26, 1),
    ],
    "WhatsApp Image 2026-07-24 at 12.20.17 PM (1).jpeg":  [("haar", 27, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.18 PM.jpeg":      [("haar", 28, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.18 PM (1).jpeg":  [("haar", 29, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.18 PM (2).jpeg":  [("haar", 30, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.19 PM (2).jpeg":  [("haar", 31, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.19 PM.jpeg":      [("haar", 32, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.20 PM.jpeg":      [("haar", 33, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.21 PM (1).jpeg":  [("haar", 34, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.21 PM (2).jpeg":  [("haar", 35, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.22 PM.jpeg":      [("haar", 36, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.22 PM (1).jpeg":  [("haar", 37, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.24 PM.jpeg":      [("haar", 38, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.26 PM.jpeg":      [("haar", 39, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.30 PM (2).jpeg":  [("haar", 40, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.30 PM.jpeg":      [("haar", 41, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.31 PM.jpeg":      [("haar", 42, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.31 PM (1).jpeg":  [("haar", 43, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.32 PM.jpeg":      [("haar", 44, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.33 PM.jpeg":      [("haar", 45, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.34 PM (1).jpeg":  [("haar", 46, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.34 PM.jpeg":      [("haar", 47, 1)],
    # haar_048 choker necklace + earrings_052 matching earrings, same photo
    "WhatsApp Image 2026-07-24 at 12.20.35 PM (2).jpeg": [
        ("haar", 48, 1), ("earrings", 52, 1),
    ],
    "WhatsApp Image 2026-07-24 at 12.21.06 PM.jpeg":      [("haar", 49, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.07 PM.jpeg":      [("haar", 50, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.08 PM.jpeg":      [("haar", 51, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.08 PM (1).jpeg":  [("haar", 52, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.09 PM.jpeg":      [("haar", 53, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.10 PM.jpeg":      [("haar", 54, 1)],
    # haar_055 leaf necklace + earrings_082 matching earrings, same photo
    "WhatsApp Image 2026-07-24 at 12.21.50 PM (1).jpeg": [
        ("haar", 55, 1), ("earrings", 82, 1),
    ],
    # Second angles / duplicate views (increase image_num)
    "WhatsApp Image 2026-07-24 at 12.21.24 PM.jpeg":      [("haar", 31, 2)],
    "WhatsApp Image 2026-07-24 at 12.21.25 PM.jpeg":      [("haar", 34, 2)],
    "WhatsApp Image 2026-07-24 at 12.21.38 PM (1).jpeg":  [("haar", 33, 2)],
    "WhatsApp Image 2026-07-24 at 12.21.41 PM.jpeg":      [("haar", 35, 2)],
    # haar_030 second angle + earrings_078 matching earrings, same photo
    "WhatsApp Image 2026-07-24 at 12.21.45 PM (1).jpeg": [
        ("haar", 30, 2), ("earrings", 78, 1),
    ],
    # haar_028 second angle + earrings_084 matching earrings, same photo
    "WhatsApp Image 2026-07-24 at 12.21.52 PM.jpeg": [
        ("haar", 28, 2), ("earrings", 84, 1),
    ],
    # haar_032 second angle + earrings_085 matching earrings, same photo
    "WhatsApp Image 2026-07-24 at 12.21.53 PM (2).jpeg": [
        ("haar", 32, 2), ("earrings", 85, 1),
    ],

    # ── EARRINGS ─────────────────────────────────────────────────────
    # earrings_026 already listed above (haar photo)
    # earrings_052 already listed above (haar_048 photo)
    # earrings_078 already listed above (haar_030 second-angle photo)
    # earrings_082 already listed above (haar_055 photo)
    # earrings_084 already listed above (haar_028 second-angle photo)
    # earrings_085 already listed above (haar_032 second-angle photo)
    "WhatsApp Image 2026-07-24 at 12.20.35 PM (1).jpeg":  [("earrings", 27, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.35 PM.jpeg":      [("earrings", 28, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.36 PM.jpeg":      [("earrings", 29, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.37 PM.jpeg":      [("earrings", 30, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.38 PM (1).jpeg":  [("earrings", 31, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.38 PM.jpeg":      [("earrings", 32, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.40 PM (1).jpeg":  [("earrings", 33, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.40 PM (2).jpeg":  [("earrings", 34, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.40 PM.jpeg":      [("earrings", 35, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.41 PM (1).jpeg":  [("earrings", 36, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.41 PM.jpeg":      [("earrings", 37, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.42 PM (1).jpeg":  [("earrings", 38, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.42 PM.jpeg":      [("earrings", 39, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.43 PM.jpeg":      [("earrings", 40, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.44 PM.jpeg":      [("earrings", 41, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.45 PM.jpeg":      [("earrings", 42, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.47 PM (1).jpeg":  [("earrings", 43, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.47 PM (2).jpeg":  [("earrings", 44, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.47 PM.jpeg":      [("earrings", 45, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.48 PM.jpeg":      [("earrings", 46, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.49 PM.jpeg":      [("earrings", 47, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.50 PM (1).jpeg":  [("earrings", 48, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.50 PM.jpeg":      [("earrings", 49, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.51 PM (1).jpeg":  [("earrings", 50, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.51 PM.jpeg":      [("earrings", 51, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.52 PM.jpeg":      [("earrings", 53, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.53 PM.jpeg":      [("earrings", 54, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.55 PM.jpeg":      [("earrings", 55, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.56 PM.jpeg":      [("earrings", 56, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.57 PM.jpeg":      [("earrings", 57, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.58 PM (2).jpeg":  [("earrings", 58, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.21 PM (1).jpeg":  [("earrings", 59, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.23 PM.jpeg":      [("earrings", 60, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.24 PM (1).jpeg":  [("earrings", 61, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.24 PM (2).jpeg":  [("earrings", 62, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.25 PM (1).jpeg":  [("earrings", 63, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.27 PM.jpeg":      [("earrings", 64, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.28 PM.jpeg":      [("earrings", 65, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.29 PM.jpeg":      [("earrings", 66, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.32 PM.jpeg":      [("earrings", 67, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.32 PM (2).jpeg":  [("earrings", 68, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.33 PM.jpeg":      [("earrings", 69, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.33 PM (1).jpeg":  [("earrings", 70, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.33 PM (2).jpeg":  [("earrings", 71, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.42 PM.jpeg":      [("earrings", 72, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.42 PM (2).jpeg":  [("earrings", 73, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.43 PM (1).jpeg":  [("earrings", 74, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.43 PM (2).jpeg":  [("earrings", 75, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.44 PM.jpeg":      [("earrings", 76, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.45 PM.jpeg":      [("earrings", 77, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.47 PM (1).jpeg":  [("earrings", 79, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.49 PM.jpeg":      [("earrings", 80, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.50 PM.jpeg":      [("earrings", 81, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.50 PM (2).jpeg":  [("earrings", 83, 1)],

    # ── RINGS ─────────────────────────────────────────────────────────
    "WhatsApp Image 2026-07-24 at 12.20.03 PM.jpeg":      [("rings", 2, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.04 PM.jpeg":      [("rings", 3, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.05 PM (1).jpeg":  [("rings", 4, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.08 PM.jpeg":      [("rings", 5, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.09 PM (1).jpeg":  [("rings", 6, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.58 PM.jpeg":      [("rings", 7, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.58 PM (1).jpeg":  [("rings", 7, 2)],
    "WhatsApp Image 2026-07-24 at 12.20.59 PM.jpeg":      [("rings", 8, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.00 PM.jpeg":      [("rings", 8, 2)],
    "WhatsApp Image 2026-07-24 at 12.20.59 PM (1).jpeg":  [("rings", 9, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.59 PM (2).jpeg":  [("rings", 9, 2)],
    "WhatsApp Image 2026-07-24 at 12.21.00 PM (1).jpeg":  [("rings", 10, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.00 PM (2).jpeg":  [("rings", 10, 2)],
    "WhatsApp Image 2026-07-24 at 12.21.01 PM.jpeg":      [("rings", 11, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.01 PM (1).jpeg":  [("rings", 11, 2)],
    "WhatsApp Image 2026-07-24 at 12.21.02 PM.jpeg":      [("rings", 12, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.03 PM.jpeg":      [("rings", 13, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.04 PM.jpeg":      [("rings", 14, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.05 PM.jpeg":      [("rings", 15, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.05 PM (1).jpeg":  [("rings", 16, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.15 PM.jpeg":      [("rings", 17, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.16 PM.jpeg":      [("rings", 18, 1), ("rings", 19, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.18 PM.jpeg":      [("rings", 20, 1), ("rings", 21, 1), ("rings", 22, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.18 PM (3).jpeg":  [("rings", 23, 1), ("rings", 24, 1), ("rings", 25, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.19 PM.jpeg":      [("rings", 26, 1), ("rings", 27, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.21 PM.jpeg":      [("rings", 28, 1), ("rings", 29, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.26 PM.jpeg":      [("rings", 30, 1), ("rings", 31, 1), ("rings", 32, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.26 PM (1).jpeg":  [("rings", 30, 2), ("rings", 31, 2), ("rings", 32, 2)],
    "WhatsApp Image 2026-07-24 at 12.21.29 PM (1).jpeg":  [("rings", 33, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.53 PM.jpeg":      [("rings", 34, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.53 PM (1).jpeg":  [("rings", 35, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.59 PM.jpeg":      [("rings", 36, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.59 PM (1).jpeg":  [("rings", 37, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.59 PM (2).jpeg":  [("rings", 38, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.00 PM (1).jpeg":  [("rings", 39, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.01 PM.jpeg":      [("rings", 40, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.01 PM (1).jpeg":  [("rings", 41, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.01 PM (2).jpeg":  [("rings", 42, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.02 PM.jpeg":      [("rings", 42, 2)],
    "WhatsApp Image 2026-07-24 at 12.22.04 PM.jpeg":      [("rings", 43, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.04 PM (1).jpeg":  [("rings", 44, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.04 PM (2).jpeg":  [("rings", 45, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.05 PM.jpeg":      [("rings", 46, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.05 PM (1).jpeg":  [("rings", 47, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.06 PM.jpeg":      [("rings", 48, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.06 PM (1).jpeg":  [("rings", 49, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.07 PM.jpeg":      [("rings", 50, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.07 PM (1).jpeg":  [("rings", 51, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.07 PM (2).jpeg":  [("rings", 52, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.08 PM.jpeg":      [("rings", 53, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.09 PM.jpeg":      [("rings", 54, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.09 PM (1).jpeg":  [("rings", 55, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.09 PM (2).jpeg":  [("rings", 56, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.10 PM.jpeg":      [("rings", 57, 1)],
    "WhatsApp Image 2026-07-24 at 12.23.11 PM.jpeg":      [("rings", 58, 1)],
    "WhatsApp Image 2026-07-24 at 12.23.11 PM (1).jpeg":  [("rings", 59, 1)],
    "WhatsApp Image 2026-07-24 at 12.23.11 PM (2).jpeg":  [("rings", 60, 1)],
    "WhatsApp Image 2026-07-24 at 12.23.11 PM (3).jpeg":  [("rings", 61, 1)],
    "WhatsApp Image 2026-07-24 at 12.23.12 PM.jpeg":      [("rings", 62, 1)],
    "WhatsApp Image 2026-07-24 at 12.23.12 PM (1).jpeg":  [("rings", 63, 1)],

    # ── MANGALSUTRA ─────────────────────────────────────────────────
    "WhatsApp Image 2026-07-24 at 12.20.19 PM (1).jpeg":  [("mangalsutra", 14, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.20 PM (1).jpeg":  [("mangalsutra", 15, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.20 PM (2).jpeg":  [("mangalsutra", 16, 1)],

    # ── BANGLES ──────────────────────────────────────────────────────
    "WhatsApp Image 2026-07-24 at 12.21.11 PM.jpeg":      [("bangles", 5, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.11 PM (1).jpeg":  [("bangles", 6, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.38 PM.jpeg":      [("bangles", 7, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.39 PM.jpeg":      [("bangles", 8, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.39 PM (1).jpeg":  [("bangles", 9, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.40 PM.jpeg":      [("bangles", 10, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.40 PM (1).jpeg":  [("bangles", 11, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.40 PM (2).jpeg":  [("bangles", 12, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.41 PM (1).jpeg":  [("bangles", 13, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.42 PM (1).jpeg":  [("bangles", 14, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.43 PM.jpeg":      [("bangles", 15, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.46 PM.jpeg":      [("bangles", 16, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.47 PM.jpeg":      [("bangles", 17, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.51 PM.jpeg":      [("bangles", 18, 1)],

    # ── BRACELETS (new category) ─────────────────────────────────────
    # bracelet_001 and _002 share the same source photo (2 products in one pic)
    "WhatsApp Image 2026-07-24 at 12.20.31 PM (2).jpeg":  [("bracelet", 1, 1), ("bracelet", 2, 1)],
    "WhatsApp Image 2026-07-24 at 12.20.32 PM (2).jpeg":  [("bracelet", 3, 1)],
    # bracelet_004, _005, _006 all from same 3-in-1 photo
    "WhatsApp Image 2026-07-24 at 12.20.30 PM (1).jpeg":  [("bracelet", 4, 1), ("bracelet", 5, 1), ("bracelet", 6, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.12 PM.jpeg":      [("bracelet", 7, 1)],
    # 4 gents bracelets from one photo
    "WhatsApp Image 2026-07-24 at 12.21.13 PM.jpeg":      [("bracelet", 8, 1), ("bracelet", 9, 1), ("bracelet", 10, 1), ("bracelet", 11, 1)],
    # 3 gents bracelets from one photo
    "WhatsApp Image 2026-07-24 at 12.21.14 PM.jpeg":      [("bracelet", 12, 1), ("bracelet", 13, 1), ("bracelet", 14, 1)],
    # 4 gents bracelets from one photo
    "WhatsApp Image 2026-07-24 at 12.21.17 PM.jpeg":      [("bracelet", 15, 1), ("bracelet", 16, 1), ("bracelet", 17, 1), ("bracelet", 18, 1)],
    "WhatsApp Image 2026-07-24 at 12.21.18 PM (1).jpeg":  [("bracelet", 19, 1)],
    # 3 gents bracelets from one photo
    "WhatsApp Image 2026-07-24 at 12.21.18 PM (2).jpeg":  [("bracelet", 20, 1), ("bracelet", 21, 1), ("bracelet", 22, 1)],
    # 4 gents bracelets from one photo
    "WhatsApp Image 2026-07-24 at 12.21.20 PM.jpeg":      [("bracelet", 23, 1), ("bracelet", 24, 1), ("bracelet", 25, 1), ("bracelet", 26, 1)],
    # 3 mangalsutra bracelets from one photo
    "WhatsApp Image 2026-07-24 at 12.21.32 PM (1).jpeg":  [("bracelet", 27, 1), ("bracelet", 28, 1), ("bracelet", 29, 1)],
    "WhatsApp Image 2026-07-24 at 12.22.00 PM.jpeg":      [("bracelet", 30, 1)],
}


def main():
    dry_run = "--dry-run" in sys.argv
    show_missing = "--missing" in sys.argv

    if not SOURCE_DIR.exists():
        print(f"ERROR: Source directory not found: {SOURCE_DIR}")
        sys.exit(1)

    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    copied = 0
    skipped = 0
    missing = 0
    errors = 0

    for source_filename, assignments in IMAGE_MAPPING.items():
        src = SOURCE_DIR / source_filename
        if not src.exists():
            missing += 1
            if show_missing or not dry_run:
                print(f"  MISSING: {source_filename}")
            continue

        for (cat, num, img_num) in assignments:
            dst_name = f"{cat}_{num:03d}_{img_num:02d}.jpg"
            dst = TARGET_DIR / dst_name

            if dry_run:
                status = "EXISTS" if dst.exists() else "COPY  "
                print(f"  {status}: {source_filename[:60]:<60} -> {dst_name}")
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
    print(f"  Copied:  {copied}")
    print(f"  Missing: {missing} source files")
    if errors:
        print(f"  Errors:  {errors}")


if __name__ == "__main__":
    main()
