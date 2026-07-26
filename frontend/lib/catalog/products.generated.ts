// AUTO-GENERATED from jewellery photos. Do not edit by hand.
// Regenerate via scratchpad/assemble.py. base_price/discount_price/price below are
// stale placeholders — actual prices are computed live from weight_grams and the
// live gold rate (see lib/pricing/goldRate.ts + lib/catalog/index.ts).
// weight_grams is read from each product's own photo — either a printed overlay
// number or a paper tag's NT:/GR: value (weight_source: "overlay" | "tag_nt" |
// "tag_gr"). See lib/catalog/_source/weights.override.json for the extraction and
// apply_weight_overrides.js for how it's applied. weight_estimated: true means the
// photo had no legible weight, so the value is an average for that product's
// type/gender instead of a real reading.

export interface CatalogProduct {
  id: string; name: string; slug: string; primary_image: string;
  base_price: string; discount_price: string | null; price: string;
  material: string; purity: string | null; weight_grams: string | null;
  weight_estimated?: boolean; weight_source?: string;
  is_featured: boolean; stock_quantity: number;
  category_slug: string; category_name: string;
  description: string; sku: string;
  images: { id: string; image_url: string; display_order: number; is_primary: boolean }[];
  gender: string; type: string; carats: number;
}

export interface CatalogCategory {
  id: string; name: string; slug: string; image_url: string | null;
  display_order: number; children: CatalogCategory[];
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    "id": "prod-001",
    "name": "Round Disc Ball Gold Chain",
    "slug": "round-disc-ball-gold-chain-001",
    "primary_image": "/products/p001.jpeg",
    "base_price": "139700.00",
    "discount_price": null,
    "price": "139700.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.63",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "Ladies gold chain with round disc links and ball bead accents. 22K gold, approx 16.63 g. Lightweight everyday wear.",
    "sku": "CHN-010",
    "images": [
      {
        "id": "prod-001-img1",
        "image_url": "/products/p001.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-002",
    "name": "Men's Royal Gold Ring",
    "slug": "men-s-royal-gold-ring-002",
    "primary_image": "/products/p002.jpeg",
    "base_price": "15200.00",
    "discount_price": null,
    "price": "15200.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.26",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 2.26 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1209-01-20",
    "images": [
      {
        "id": "prod-002-img1",
        "image_url": "/products/p002.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-003",
    "name": "Elegant Diamond Ring",
    "slug": "elegant-diamond-ring-003",
    "primary_image": "/products/p003.jpeg",
    "base_price": "20200.00",
    "discount_price": null,
    "price": "20200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.834",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 1.834 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN1959-26-18",
    "images": [
      {
        "id": "prod-003-img1",
        "image_url": "/products/p003.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.176
  },
  {
    "id": "prod-004",
    "name": "Men's Heritage Diamond Ring",
    "slug": "men-s-heritage-diamond-ring-004",
    "primary_image": "/products/p004.jpeg",
    "base_price": "52800.00",
    "discount_price": null,
    "price": "52800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "6.145",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 6.145 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2056-18-20",
    "images": [
      {
        "id": "prod-004-img1",
        "image_url": "/products/p004.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0.255
  },
  {
    "id": "prod-005",
    "name": "Signature Gold Necklace",
    "slug": "signature-gold-necklace-005",
    "primary_image": "/products/p005.jpeg",
    "base_price": "147800.00",
    "discount_price": null,
    "price": "147800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "17.64",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted gold necklace in 18K. Net weight approx 17.64 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "signature-gold-necklace-005",
    "images": [
      {
        "id": "prod-005-img1",
        "image_url": "/products/p005.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-006",
    "name": "Divine Gold Necklace",
    "slug": "divine-gold-necklace-006",
    "primary_image": "/products/p006.jpeg",
    "base_price": "147800.00",
    "discount_price": null,
    "price": "147800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "14.92",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted gold necklace in 18K. Net weight approx 14.92 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "divine-gold-necklace-006",
    "images": [
      {
        "id": "prod-006-img1",
        "image_url": "/products/p006.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-007",
    "name": "Radiant Diamond Ring",
    "slug": "radiant-diamond-ring-007",
    "primary_image": "/products/p007.jpeg",
    "base_price": "23300.00",
    "discount_price": null,
    "price": "23300.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.153",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 3.153 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2026-02-18",
    "images": [
      {
        "id": "prod-007-img1",
        "image_url": "/products/p007.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.047
  },
  {
    "id": "prod-008",
    "name": "Grace Diamond Ring",
    "slug": "grace-diamond-ring-008",
    "primary_image": "/products/p008.jpeg",
    "base_price": "23300.00",
    "discount_price": null,
    "price": "23300.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.353",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.353 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN1963-28-23",
    "images": [
      {
        "id": "prod-008-img1",
        "image_url": "/products/p008.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.167
  },
  {
    "id": "prod-009",
    "name": "Diamond-Cut Beaded Gold Chain",
    "slug": "diamond-cut-beaded-gold-chain-009",
    "primary_image": "/products/p009.jpeg",
    "base_price": "174800.00",
    "discount_price": null,
    "price": "174800.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.20",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "Gold chain with alternating round and diamond-cut beads, rich lustrous finish. 22K gold, approx 20.20 g.",
    "sku": "CHN-012",
    "images": [
      {
        "id": "prod-009-img1",
        "image_url": "/products/p009.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-010",
    "name": "Blossom Gold Necklace",
    "slug": "blossom-gold-necklace-010",
    "primary_image": "/products/p010.jpeg",
    "base_price": "147800.00",
    "discount_price": null,
    "price": "147800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "17.58",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted gold necklace in 18K. Net weight approx 17.58 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "blossom-gold-necklace-010",
    "images": [
      {
        "id": "prod-010-img1",
        "image_url": "/products/p010.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-011",
    "name": "Aurora Diamond Nose Pin",
    "slug": "aurora-diamond-nose-pin-011",
    "primary_image": "/products/p011.jpeg",
    "base_price": "21600.00",
    "discount_price": null,
    "price": "21600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.427",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "nose-pins",
    "category_name": "Nose Pins",
    "description": "Beautifully crafted diamond nose pin in 18K. Net weight approx 1.427 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNNR71032WA",
    "images": [
      {
        "id": "prod-011-img1",
        "image_url": "/products/p011.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "nosepin",
    "carats": 0
  },
  {
    "id": "prod-012",
    "name": "Celeste Diamond Nose Pin",
    "slug": "celeste-diamond-nose-pin-012",
    "primary_image": "/products/p012.jpeg",
    "base_price": "20100.00",
    "discount_price": null,
    "price": "20100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.209",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "nose-pins",
    "category_name": "Nose Pins",
    "description": "Beautifully crafted diamond nose pin in 18K. Net weight approx 1.209 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNNR71022WA",
    "images": [
      {
        "id": "prod-012-img1",
        "image_url": "/products/p012.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "nosepin",
    "carats": 0
  },
  {
    "id": "prod-013",
    "name": "Imperial Diamond Nose Pin",
    "slug": "imperial-diamond-nose-pin-013",
    "primary_image": "/products/p013.jpeg",
    "base_price": "24800.00",
    "discount_price": null,
    "price": "24800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.901",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "nose-pins",
    "category_name": "Nose Pins",
    "description": "Beautifully crafted diamond nose pin in 18K. Net weight approx 1.901 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNNR71122B",
    "images": [
      {
        "id": "prod-013-img1",
        "image_url": "/products/p013.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "nosepin",
    "carats": 0
  },
  {
    "id": "prod-014",
    "name": "Lumina Diamond Nose Pin",
    "slug": "lumina-diamond-nose-pin-014",
    "primary_image": "/products/p014.jpeg",
    "base_price": "29800.00",
    "discount_price": null,
    "price": "29800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.649",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "nose-pins",
    "category_name": "Nose Pins",
    "description": "Beautifully crafted diamond nose pin in 18K. Net weight approx 2.649 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNNR71124A",
    "images": [
      {
        "id": "prod-014-img1",
        "image_url": "/products/p014.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "nosepin",
    "carats": 0
  },
  {
    "id": "prod-015",
    "name": "Meera Diamond Nose Pin",
    "slug": "meera-diamond-nose-pin-015",
    "primary_image": "/products/p015.jpeg",
    "base_price": "25500.00",
    "discount_price": null,
    "price": "25500.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.006",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "nose-pins",
    "category_name": "Nose Pins",
    "description": "Beautifully crafted diamond nose pin in 18K. Net weight approx 2.006 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNNR71120A",
    "images": [
      {
        "id": "prod-015-img1",
        "image_url": "/products/p015.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "nosepin",
    "carats": 0
  },
  {
    "id": "prod-016",
    "name": "Rivaah Diamond Nose Pin",
    "slug": "rivaah-diamond-nose-pin-016",
    "primary_image": "/products/p016.jpeg",
    "base_price": "25600.00",
    "discount_price": null,
    "price": "25600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.023",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "nose-pins",
    "category_name": "Nose Pins",
    "description": "Beautifully crafted diamond nose pin in 18K. Net weight approx 2.023 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNNR71105A",
    "images": [
      {
        "id": "prod-016-img1",
        "image_url": "/products/p016.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "nosepin",
    "carats": 0
  },
  {
    "id": "prod-017",
    "name": "Nakshatra Diamond Jewellery Set",
    "slug": "nakshatra-diamond-jewellery-set-017",
    "primary_image": "/products/p017.jpeg",
    "base_price": "180000.00",
    "discount_price": null,
    "price": "180000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "74.58",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 74.58 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "nakshatra-diamond-jewellery-set-017",
    "images": [
      {
        "id": "prod-017-img1",
        "image_url": "/products/p017.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-018",
    "name": "Zoya Diamond Jewellery Set",
    "slug": "zoya-diamond-jewellery-set-018",
    "primary_image": "/products/p018.jpeg",
    "base_price": "180000.00",
    "discount_price": null,
    "price": "180000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "14.03",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 14.03 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "zoya-diamond-jewellery-set-018",
    "images": [
      {
        "id": "prod-018-img1",
        "image_url": "/products/p018.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-019",
    "name": "Kiara Diamond Jewellery Set",
    "slug": "kiara-diamond-jewellery-set-019",
    "primary_image": "/products/p019.jpeg",
    "base_price": "114200.00",
    "discount_price": null,
    "price": "114200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "16.051",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 16.051 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SHS2576-01",
    "images": [
      {
        "id": "prod-019-img1",
        "image_url": "/products/p019.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0.14
  },
  {
    "id": "prod-020",
    "name": "Anaya Diamond Jewellery Set",
    "slug": "anaya-diamond-jewellery-set-020",
    "primary_image": "/products/p020.jpeg",
    "base_price": "180000.00",
    "discount_price": null,
    "price": "180000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "13.905",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 13.905 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "anaya-diamond-jewellery-set-020",
    "images": [
      {
        "id": "prod-020-img1",
        "image_url": "/products/p020.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-021",
    "name": "Classic Diamond Jewellery Set",
    "slug": "classic-diamond-jewellery-set-021",
    "primary_image": "/products/p021.jpeg",
    "base_price": "38600.00",
    "discount_price": null,
    "price": "38600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "5.282",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 5.282 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SHS2543-04",
    "images": [
      {
        "id": "prod-021-img1",
        "image_url": "/products/p021.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0.068
  },
  {
    "id": "prod-022",
    "name": "Royal Diamond Jewellery Set",
    "slug": "royal-diamond-jewellery-set-022",
    "primary_image": "/products/p022.jpeg",
    "base_price": "180000.00",
    "discount_price": null,
    "price": "180000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "6.984",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 6.984 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "STU0700671663",
    "images": [
      {
        "id": "prod-022-img1",
        "image_url": "/products/p022.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-023",
    "name": "Elegant Diamond Mangalsutra",
    "slug": "elegant-diamond-mangalsutra-023",
    "primary_image": "/products/p023.jpeg",
    "base_price": "39300.00",
    "discount_price": null,
    "price": "39300.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "4.334",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "Beautifully crafted diamond mangalsutra in 18K. Net weight approx 4.334 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SCSS141-10",
    "images": [
      {
        "id": "prod-023-img1",
        "image_url": "/products/p023.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0.226
  },
  {
    "id": "prod-024",
    "name": "Heritage Diamond Jewellery Set",
    "slug": "heritage-diamond-jewellery-set-024",
    "primary_image": "/products/p024.jpeg",
    "base_price": "180000.00",
    "discount_price": null,
    "price": "180000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "15.231",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 15.231 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "heritage-diamond-jewellery-set-024",
    "images": [
      {
        "id": "prod-024-img1",
        "image_url": "/products/p024.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-025",
    "name": "Signature Diamond Pendant Set",
    "slug": "signature-diamond-pendant-set-025",
    "primary_image": "/products/p025.jpeg",
    "base_price": "65800.00",
    "discount_price": null,
    "price": "65800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "13.809",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 13.809 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "signature-diamond-pendant-set-025",
    "images": [
      {
        "id": "prod-025-img1",
        "image_url": "/products/p025.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-026",
    "name": "Divine Diamond Mangalsutra",
    "slug": "divine-diamond-mangalsutra-026",
    "primary_image": "/products/p026.jpeg",
    "base_price": "40200.00",
    "discount_price": null,
    "price": "40200.00",
    "material": "diamond",
    "purity": "10K",
    "weight_grams": "15.419",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "Beautifully crafted diamond mangalsutra in 10K. Net weight approx 15.419 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ITP0616",
    "images": [
      {
        "id": "prod-026-img1",
        "image_url": "/products/p026.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0.245,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-027",
    "name": "Radiant Diamond Mangalsutra",
    "slug": "radiant-diamond-mangalsutra-027",
    "primary_image": "/products/p027.jpeg",
    "base_price": "44400.00",
    "discount_price": null,
    "price": "44400.00",
    "material": "diamond",
    "purity": "10K",
    "weight_grams": "10.571",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "Beautifully crafted diamond mangalsutra in 10K. Net weight approx 10.571 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ITP0617",
    "images": [
      {
        "id": "prod-027-img1",
        "image_url": "/products/p027.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0.234,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-028",
    "name": "Grace Diamond Pendant Set",
    "slug": "grace-diamond-pendant-set-028",
    "primary_image": "/products/p028.jpeg",
    "base_price": "65800.00",
    "discount_price": null,
    "price": "65800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "9.874",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 9.874 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "grace-diamond-pendant-set-028",
    "images": [
      {
        "id": "prod-028-img1",
        "image_url": "/products/p028.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-029",
    "name": "Regal Diamond Pendant Set",
    "slug": "regal-diamond-pendant-set-029",
    "primary_image": "/products/p029.jpeg",
    "base_price": "154600.00",
    "discount_price": null,
    "price": "154600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.709",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 2.709 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SN525",
    "images": [
      {
        "id": "prod-029-img1",
        "image_url": "/products/p029.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 3.031
  },
  {
    "id": "prod-030",
    "name": "Blossom Diamond Pendant Set",
    "slug": "blossom-diamond-pendant-set-030",
    "primary_image": "/products/p030.jpeg",
    "base_price": "65800.00",
    "discount_price": null,
    "price": "65800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "21.568",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 21.568 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "blossom-diamond-pendant-set-030",
    "images": [
      {
        "id": "prod-030-img1",
        "image_url": "/products/p030.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-031",
    "name": "Aurora Gold Pendant",
    "slug": "aurora-gold-pendant-031",
    "primary_image": "/products/p031.jpeg",
    "base_price": "12100.00",
    "discount_price": null,
    "price": "12100.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.8",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted gold pendant in 18K. Net weight approx 1.8 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "EFSCS139-21",
    "images": [
      {
        "id": "prod-031-img1",
        "image_url": "/products/p031.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant",
    "carats": 0
  },
  {
    "id": "prod-032",
    "name": "Celeste Diamond Pendant Set",
    "slug": "celeste-diamond-pendant-set-032",
    "primary_image": "/products/p032.jpeg",
    "base_price": "21700.00",
    "discount_price": null,
    "price": "21700.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "9.7",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 9.7 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "IMCSHS1366-02",
    "images": [
      {
        "id": "prod-032-img1",
        "image_url": "/products/p032.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0.037,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-033",
    "name": "Imperial Diamond Pendant Set",
    "slug": "imperial-diamond-pendant-set-033",
    "primary_image": "/products/p033.jpeg",
    "base_price": "65800.00",
    "discount_price": null,
    "price": "65800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "8.855",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 8.855 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "imperial-diamond-pendant-set-033",
    "images": [
      {
        "id": "prod-033-img1",
        "image_url": "/products/p033.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-034",
    "name": "Lumina Diamond Pendant Set",
    "slug": "lumina-diamond-pendant-set-034",
    "primary_image": "/products/p034.jpeg",
    "base_price": "8800.00",
    "discount_price": null,
    "price": "8800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "4.013",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 4.013 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "IMCSHS1361-04",
    "images": [
      {
        "id": "prod-034-img1",
        "image_url": "/products/p034.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0.065,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-035",
    "name": "Meera Gold Pendant Set",
    "slug": "meera-gold-pendant-set-035",
    "primary_image": "/products/p035.jpeg",
    "base_price": "53800.00",
    "discount_price": null,
    "price": "53800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "12.7",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted gold pendant set in 18K. Net weight approx 12.7 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "meera-gold-pendant-set-035",
    "images": [
      {
        "id": "prod-035-img1",
        "image_url": "/products/p035.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-036",
    "name": "Rivaah Gold Necklace",
    "slug": "rivaah-gold-necklace-036",
    "primary_image": "/products/p036.jpeg",
    "base_price": "147800.00",
    "discount_price": null,
    "price": "147800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "4.522",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted gold necklace in 18K. Net weight approx 4.522 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "rivaah-gold-necklace-036",
    "images": [
      {
        "id": "prod-036-img1",
        "image_url": "/products/p036.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-038",
    "name": "Zoya Diamond Necklace",
    "slug": "zoya-diamond-necklace-038",
    "primary_image": "/products/p038.jpeg",
    "base_price": "159800.00",
    "discount_price": null,
    "price": "159800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "9.1",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 9.1 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "zoya-diamond-necklace-038",
    "images": [
      {
        "id": "prod-038-img1",
        "image_url": "/products/p038.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-039",
    "name": "Kiara Gold Pendant",
    "slug": "kiara-gold-pendant-039",
    "primary_image": "/products/p039.jpeg",
    "base_price": "15900.00",
    "discount_price": null,
    "price": "15900.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.37",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted gold pendant in 18K. Net weight approx 2.37 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "EFSCS139-22",
    "images": [
      {
        "id": "prod-039-img1",
        "image_url": "/products/p039.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant",
    "carats": 0
  },
  {
    "id": "prod-040",
    "name": "Anaya Diamond Necklace",
    "slug": "anaya-diamond-necklace-040",
    "primary_image": "/products/p040.jpeg",
    "base_price": "159800.00",
    "discount_price": null,
    "price": "159800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "20.035",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 20.035 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "anaya-diamond-necklace-040",
    "images": [
      {
        "id": "prod-040-img1",
        "image_url": "/products/p040.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-041",
    "name": "Classic Diamond Necklace",
    "slug": "classic-diamond-necklace-041",
    "primary_image": "/products/p041.jpeg",
    "base_price": "29100.00",
    "discount_price": null,
    "price": "29100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "17.721",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 17.721 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SHS2527-04",
    "images": [
      {
        "id": "prod-041-img1",
        "image_url": "/products/p041.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0.119,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-042",
    "name": "Royal Diamond Bracelet",
    "slug": "royal-diamond-bracelet-042",
    "primary_image": "/products/p042.jpeg",
    "base_price": "33200.00",
    "discount_price": null,
    "price": "33200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "4.352",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 4.352 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "IMC8BR113",
    "images": [
      {
        "id": "prod-042-img1",
        "image_url": "/products/p042.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelet",
    "carats": 0.088
  },
  {
    "id": "prod-043",
    "name": "Elegant Diamond Pendant Set",
    "slug": "elegant-diamond-pendant-set-043",
    "primary_image": "/products/p043.jpeg",
    "base_price": "65800.00",
    "discount_price": null,
    "price": "65800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "5.106",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 5.106 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MH4S10-01",
    "images": [
      {
        "id": "prod-043-img1",
        "image_url": "/products/p043.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-044",
    "name": "Rope-Twist Ball Station Gold Chain",
    "slug": "rope-twist-ball-station-gold-chain-044",
    "primary_image": "/products/p044.jpeg",
    "base_price": "93900.00",
    "discount_price": null,
    "price": "93900.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "10.85",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "Gold rope-twist chain necklace with gold and rhodium-finished bead stations and two-tone tasseled drop. 22K gold, approx 10.85 g.",
    "sku": "CHN-017",
    "images": [
      {
        "id": "prod-044-img1",
        "image_url": "/products/p044.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-045",
    "name": "Men's Signature Gold Bracelet",
    "slug": "men-s-signature-gold-bracelet-045",
    "primary_image": "/products/p045.jpeg",
    "base_price": "103400.00",
    "discount_price": null,
    "price": "103400.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "15.38",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted gold bracelet in 18K. Net weight approx 15.38 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "EFPBR082-04-8",
    "images": [
      {
        "id": "prod-045-img1",
        "image_url": "/products/p045.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0
  },
  {
    "id": "prod-046",
    "name": "Divine Diamond Jewellery Set",
    "slug": "divine-diamond-jewellery-set-046",
    "primary_image": "/products/p046.jpeg",
    "base_price": "55400.00",
    "discount_price": null,
    "price": "55400.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "7.44",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 7.44 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FC4193-01B",
    "images": [
      {
        "id": "prod-046-img1",
        "image_url": "/products/p046.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0.12
  },
  {
    "id": "prod-047",
    "name": "Radiant Gold Jewellery Set",
    "slug": "radiant-gold-jewellery-set-047",
    "primary_image": "/products/p047.jpeg",
    "base_price": "168000.00",
    "discount_price": null,
    "price": "168000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "15.89",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted gold jewellery set in 18K. Net weight approx 15.89 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "radiant-gold-jewellery-set-047",
    "images": [
      {
        "id": "prod-047-img1",
        "image_url": "/products/p047.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-048",
    "name": "Grace Diamond Jewellery Set",
    "slug": "grace-diamond-jewellery-set-048",
    "primary_image": "/products/p048.jpeg",
    "base_price": "40900.00",
    "discount_price": null,
    "price": "40900.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "5.574",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "Beautifully crafted diamond jewellery set in 18K. Net weight approx 5.574 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FC4417-01B",
    "images": [
      {
        "id": "prod-048-img1",
        "image_url": "/products/p048.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0.076
  },
  {
    "id": "prod-049",
    "name": "Regal Diamond Necklace",
    "slug": "regal-diamond-necklace-049",
    "primary_image": "/products/p049.jpeg",
    "base_price": "159800.00",
    "discount_price": null,
    "price": "159800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "15.76",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 15.76 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "regal-diamond-necklace-049",
    "images": [
      {
        "id": "prod-049-img1",
        "image_url": "/products/p049.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-050",
    "name": "Blossom Gold Earrings",
    "slug": "blossom-gold-earrings-050",
    "primary_image": "/products/p050.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "blossom-gold-earrings-050",
    "images": [
      {
        "id": "prod-050-img1",
        "image_url": "/products/p050.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-051",
    "name": "Aurora Diamond Pendant Set",
    "slug": "aurora-diamond-pendant-set-051",
    "primary_image": "/products/p051.jpeg",
    "base_price": "65800.00",
    "discount_price": null,
    "price": "65800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "8.00",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 8.0 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "aurora-diamond-pendant-set-051",
    "images": [
      {
        "id": "prod-051-img1",
        "image_url": "/products/p051.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-052",
    "name": "Celeste Gold Earrings",
    "slug": "celeste-gold-earrings-052",
    "primary_image": "/products/p052.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "celeste-gold-earrings-052",
    "images": [
      {
        "id": "prod-052-img1",
        "image_url": "/products/p052.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-053",
    "name": "Imperial Gold Earrings",
    "slug": "imperial-gold-earrings-053",
    "primary_image": "/products/p053.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "imperial-gold-earrings-053",
    "images": [
      {
        "id": "prod-053-img1",
        "image_url": "/products/p053.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-054",
    "name": "Lumina Gold Earrings",
    "slug": "lumina-gold-earrings-054",
    "primary_image": "/products/p054.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "lumina-gold-earrings-054",
    "images": [
      {
        "id": "prod-054-img1",
        "image_url": "/products/p054.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-055",
    "name": "Meera Gold Earrings",
    "slug": "meera-gold-earrings-055",
    "primary_image": "/products/p055.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "meera-gold-earrings-055",
    "images": [
      {
        "id": "prod-055-img1",
        "image_url": "/products/p055.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-056",
    "name": "Rivaah Gold Earrings",
    "slug": "rivaah-gold-earrings-056",
    "primary_image": "/products/p056.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "rivaah-gold-earrings-056",
    "images": [
      {
        "id": "prod-056-img1",
        "image_url": "/products/p056.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-057",
    "name": "Nakshatra Gold Earrings",
    "slug": "nakshatra-gold-earrings-057",
    "primary_image": "/products/p057.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "nakshatra-gold-earrings-057",
    "images": [
      {
        "id": "prod-057-img1",
        "image_url": "/products/p057.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-058",
    "name": "Zoya Gold Earrings",
    "slug": "zoya-gold-earrings-058",
    "primary_image": "/products/p058.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "zoya-gold-earrings-058",
    "images": [
      {
        "id": "prod-058-img1",
        "image_url": "/products/p058.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-059",
    "name": "Kiara Gold Earrings",
    "slug": "kiara-gold-earrings-059",
    "primary_image": "/products/p059.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "kiara-gold-earrings-059",
    "images": [
      {
        "id": "prod-059-img1",
        "image_url": "/products/p059.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-060",
    "name": "Anaya Gold Earrings",
    "slug": "anaya-gold-earrings-060",
    "primary_image": "/products/p060.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "anaya-gold-earrings-060",
    "images": [
      {
        "id": "prod-060-img1",
        "image_url": "/products/p060.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-061",
    "name": "Classic Gold Earrings",
    "slug": "classic-gold-earrings-061",
    "primary_image": "/products/p061.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "classic-gold-earrings-061",
    "images": [
      {
        "id": "prod-061-img1",
        "image_url": "/products/p061.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-062",
    "name": "Royal Gold Earrings",
    "slug": "royal-gold-earrings-062",
    "primary_image": "/products/p062.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "royal-gold-earrings-062",
    "images": [
      {
        "id": "prod-062-img1",
        "image_url": "/products/p062.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-063",
    "name": "Elegant Gold Earrings",
    "slug": "elegant-gold-earrings-063",
    "primary_image": "/products/p063.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "elegant-gold-earrings-063",
    "images": [
      {
        "id": "prod-063-img1",
        "image_url": "/products/p063.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-064",
    "name": "Heritage Gold Earrings",
    "slug": "heritage-gold-earrings-064",
    "primary_image": "/products/p064.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "heritage-gold-earrings-064",
    "images": [
      {
        "id": "prod-064-img1",
        "image_url": "/products/p064.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-065",
    "name": "Signature Gold Earrings",
    "slug": "signature-gold-earrings-065",
    "primary_image": "/products/p065.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "signature-gold-earrings-065",
    "images": [
      {
        "id": "prod-065-img1",
        "image_url": "/products/p065.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-066",
    "name": "Divine Gold Earrings",
    "slug": "divine-gold-earrings-066",
    "primary_image": "/products/p066.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "divine-gold-earrings-066",
    "images": [
      {
        "id": "prod-066-img1",
        "image_url": "/products/p066.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-067",
    "name": "Radiant Gold Earrings",
    "slug": "radiant-gold-earrings-067",
    "primary_image": "/products/p067.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "radiant-gold-earrings-067",
    "images": [
      {
        "id": "prod-067-img1",
        "image_url": "/products/p067.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-068",
    "name": "Grace Gold Earrings",
    "slug": "grace-gold-earrings-068",
    "primary_image": "/products/p068.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "grace-gold-earrings-068",
    "images": [
      {
        "id": "prod-068-img1",
        "image_url": "/products/p068.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-069",
    "name": "Regal Gold Earrings",
    "slug": "regal-gold-earrings-069",
    "primary_image": "/products/p069.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "regal-gold-earrings-069",
    "images": [
      {
        "id": "prod-069-img1",
        "image_url": "/products/p069.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-070",
    "name": "Blossom Gold Earrings",
    "slug": "blossom-gold-earrings-070",
    "primary_image": "/products/p070.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "blossom-gold-earrings-070",
    "images": [
      {
        "id": "prod-070-img1",
        "image_url": "/products/p070.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-071",
    "name": "Aurora Gold Earrings",
    "slug": "aurora-gold-earrings-071",
    "primary_image": "/products/p071.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "aurora-gold-earrings-071",
    "images": [
      {
        "id": "prod-071-img1",
        "image_url": "/products/p071.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-072",
    "name": "Celeste Gold Earrings",
    "slug": "celeste-gold-earrings-072",
    "primary_image": "/products/p072.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "celeste-gold-earrings-072",
    "images": [
      {
        "id": "prod-072-img1",
        "image_url": "/products/p072.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-073",
    "name": "Imperial Gold Earrings",
    "slug": "imperial-gold-earrings-073",
    "primary_image": "/products/p073.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "imperial-gold-earrings-073",
    "images": [
      {
        "id": "prod-073-img1",
        "image_url": "/products/p073.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-074",
    "name": "Lumina Gold Earrings",
    "slug": "lumina-gold-earrings-074",
    "primary_image": "/products/p074.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "lumina-gold-earrings-074",
    "images": [
      {
        "id": "prod-074-img1",
        "image_url": "/products/p074.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-075",
    "name": "Meera Gold Earrings",
    "slug": "meera-gold-earrings-075",
    "primary_image": "/products/p075.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "meera-gold-earrings-075",
    "images": [
      {
        "id": "prod-075-img1",
        "image_url": "/products/p075.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-076",
    "name": "Rivaah Gold Earrings",
    "slug": "rivaah-gold-earrings-076",
    "primary_image": "/products/p076.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "rivaah-gold-earrings-076",
    "images": [
      {
        "id": "prod-076-img1",
        "image_url": "/products/p076.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-077",
    "name": "Nakshatra Gold Earrings",
    "slug": "nakshatra-gold-earrings-077",
    "primary_image": "/products/p077.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "nakshatra-gold-earrings-077",
    "images": [
      {
        "id": "prod-077-img1",
        "image_url": "/products/p077.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-078",
    "name": "Zoya Gold Earrings",
    "slug": "zoya-gold-earrings-078",
    "primary_image": "/products/p078.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "zoya-gold-earrings-078",
    "images": [
      {
        "id": "prod-078-img1",
        "image_url": "/products/p078.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-079",
    "name": "Kiara Gold Earrings",
    "slug": "kiara-gold-earrings-079",
    "primary_image": "/products/p079.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "kiara-gold-earrings-079",
    "images": [
      {
        "id": "prod-079-img1",
        "image_url": "/products/p079.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-080",
    "name": "Anaya Gold Earrings",
    "slug": "anaya-gold-earrings-080",
    "primary_image": "/products/p080.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "anaya-gold-earrings-080",
    "images": [
      {
        "id": "prod-080-img1",
        "image_url": "/products/p080.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-081",
    "name": "Men's Classic Diamond Ring",
    "slug": "men-s-classic-diamond-ring-081",
    "primary_image": "/products/p081.jpeg",
    "base_price": "30900.00",
    "discount_price": null,
    "price": "30900.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.814",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.814 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "18K-FNCPGRT10173A",
    "images": [
      {
        "id": "prod-081-img1",
        "image_url": "/products/p081.jpeg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-081-img2",
        "image_url": "/products/p082.jpeg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-083",
    "name": "Elegant Diamond Ring",
    "slug": "elegant-diamond-ring-083",
    "primary_image": "/products/p084.jpeg",
    "base_price": "30300.00",
    "discount_price": null,
    "price": "30300.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.724",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.724 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "18K-FNCPGR71020WA",
    "images": [
      {
        "id": "prod-083-img1",
        "image_url": "/products/p084.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-085",
    "name": "Men's Signature Diamond Ring",
    "slug": "men-s-signature-diamond-ring-085",
    "primary_image": "/products/p086.jpeg",
    "base_price": "32800.00",
    "discount_price": null,
    "price": "32800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.09",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 3.09 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ELGR70071A",
    "images": [
      {
        "id": "prod-085-img1",
        "image_url": "/products/p086.jpeg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-085-img2",
        "image_url": "/products/p089.jpeg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-086",
    "name": "Divine Diamond Ring",
    "slug": "divine-diamond-ring-086",
    "primary_image": "/products/p087.jpeg",
    "base_price": "31100.00",
    "discount_price": null,
    "price": "31100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.847",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.847 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNCPGR71054WA",
    "images": [
      {
        "id": "prod-086-img1",
        "image_url": "/products/p087.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-088",
    "name": "Men's Grace Diamond Ring",
    "slug": "men-s-grace-diamond-ring-088",
    "primary_image": "/products/p090.jpeg",
    "base_price": "33100.00",
    "discount_price": null,
    "price": "33100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.143",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 3.143 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNCPGR71009A",
    "images": [
      {
        "id": "prod-088-img1",
        "image_url": "/products/p090.jpeg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-088-img2",
        "image_url": "/products/p091.jpeg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-089",
    "name": "Regal Diamond Ring",
    "slug": "regal-diamond-ring-089",
    "primary_image": "/products/p092.jpeg",
    "base_price": "28600.00",
    "discount_price": null,
    "price": "28600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.475",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.475 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNVSRP71283WA",
    "images": [
      {
        "id": "prod-089-img1",
        "image_url": "/products/p092.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-090",
    "name": "Blossom Diamond Ring",
    "slug": "blossom-diamond-ring-090",
    "primary_image": "/products/p093.jpeg",
    "base_price": "29100.00",
    "discount_price": null,
    "price": "29100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.541",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.541 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNCR71285WA",
    "images": [
      {
        "id": "prod-090-img1",
        "image_url": "/products/p093.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-091",
    "name": "Aurora Diamond Ring",
    "slug": "aurora-diamond-ring-091",
    "primary_image": "/products/p094.jpeg",
    "base_price": "28400.00",
    "discount_price": null,
    "price": "28400.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.447",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.447 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNCR71227WA",
    "images": [
      {
        "id": "prod-091-img1",
        "image_url": "/products/p094.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-092",
    "name": "Celeste Diamond Ring",
    "slug": "celeste-diamond-ring-092",
    "primary_image": "/products/p095.jpeg",
    "base_price": "28600.00",
    "discount_price": null,
    "price": "28600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.464",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.464 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNCR71283WA",
    "images": [
      {
        "id": "prod-092-img1",
        "image_url": "/products/p095.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-093",
    "name": "Imperial Diamond Ring",
    "slug": "imperial-diamond-ring-093",
    "primary_image": "/products/p096.jpeg",
    "base_price": "31800.00",
    "discount_price": null,
    "price": "31800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.945",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.945 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNCR71261WA",
    "images": [
      {
        "id": "prod-093-img1",
        "image_url": "/products/p096.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-094",
    "name": "Lumina Diamond Necklace",
    "slug": "lumina-diamond-necklace-094",
    "primary_image": "/products/p097.jpeg",
    "base_price": "150900.00",
    "discount_price": null,
    "price": "150900.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "20.672",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 20.672 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "lumina-diamond-necklace-094",
    "images": [
      {
        "id": "prod-094-img1",
        "image_url": "/products/p097.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-095",
    "name": "Meera Diamond Necklace",
    "slug": "meera-diamond-necklace-095",
    "primary_image": "/products/p098.jpeg",
    "base_price": "115600.00",
    "discount_price": null,
    "price": "115600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "20.833",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 20.833 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNNKSN71567WA",
    "images": [
      {
        "id": "prod-095-img1",
        "image_url": "/products/p098.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-096",
    "name": "Rivaah Diamond Necklace",
    "slug": "rivaah-diamond-necklace-096",
    "primary_image": "/products/p099.jpeg",
    "base_price": "93000.00",
    "discount_price": null,
    "price": "93000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "12.053",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 12.053 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "rivaah-diamond-necklace-096",
    "images": [
      {
        "id": "prod-096-img1",
        "image_url": "/products/p099.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-097",
    "name": "Nakshatra Diamond Necklace",
    "slug": "nakshatra-diamond-necklace-097",
    "primary_image": "/products/p100.jpeg",
    "base_price": "197100.00",
    "discount_price": null,
    "price": "197100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "27.543",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 27.543 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "nakshatra-diamond-necklace-097",
    "images": [
      {
        "id": "prod-097-img1",
        "image_url": "/products/p100.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-098",
    "name": "Zoya Diamond Necklace",
    "slug": "zoya-diamond-necklace-098",
    "primary_image": "/products/p101.jpeg",
    "base_price": "105900.00",
    "discount_price": null,
    "price": "105900.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "13.98",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 13.98 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "zoya-diamond-necklace-098",
    "images": [
      {
        "id": "prod-098-img1",
        "image_url": "/products/p101.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-099",
    "name": "Kiara Diamond Necklace",
    "slug": "kiara-diamond-necklace-099",
    "primary_image": "/products/p102.jpeg",
    "base_price": "111600.00",
    "discount_price": null,
    "price": "111600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "19.623",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 19.623 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNMCKN81016WA",
    "images": [
      {
        "id": "prod-099-img1",
        "image_url": "/products/p102.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-100",
    "name": "Scalloped CZ Gold Bangles (Pair)",
    "slug": "scalloped-cz-gold-bangles-pair-100",
    "primary_image": "/products/p103.jpeg",
    "base_price": "222700.00",
    "discount_price": null,
    "price": "222700.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "31.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "Pair of 22K gold bangles with scalloped wavy edges and CZ stone accents. Size 2.8. Net weight approx 31.35 g.",
    "sku": "BNG-006",
    "images": [
      {
        "id": "prod-100-img1",
        "image_url": "/products/p103.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangle",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-101",
    "name": "Two-Tone Floral Gold Bangles (Set of 4)",
    "slug": "two-tone-floral-gold-bangles-set-of-4-101",
    "primary_image": "/products/p104.jpeg",
    "base_price": "317900.00",
    "discount_price": null,
    "price": "317900.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "47.3",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "Set of 4 gold bangles with two-tone floral and leaf design. Size 2.7. 22K gold, approx 47.3 g.",
    "sku": "BNG-005",
    "images": [
      {
        "id": "prod-101-img1",
        "image_url": "/products/p104.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangle",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-102",
    "name": "Men's Royal Diamond Bracelet",
    "slug": "men-s-royal-diamond-bracelet-102",
    "primary_image": "/products/p105.jpeg",
    "base_price": "50900.00",
    "discount_price": null,
    "price": "50900.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "6.722",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 6.722 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SBR313-05-8",
    "images": [
      {
        "id": "prod-102-img1",
        "image_url": "/products/p105.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0.128
  },
  {
    "id": "prod-103",
    "name": "Men's Elegant Diamond Bracelet",
    "slug": "men-s-elegant-diamond-bracelet-103",
    "primary_image": "/products/p106.jpeg",
    "base_price": "79200.00",
    "discount_price": null,
    "price": "79200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 16.35 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "men-s-elegant-diamond-bracelet-103",
    "images": [
      {
        "id": "prod-103-img1",
        "image_url": "/products/p106.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-104",
    "name": "Men's Heritage Diamond Bracelet",
    "slug": "men-s-heritage-diamond-bracelet-104",
    "primary_image": "/products/p107.jpeg",
    "base_price": "79200.00",
    "discount_price": null,
    "price": "79200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 16.35 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "men-s-heritage-diamond-bracelet-104",
    "images": [
      {
        "id": "prod-104-img1",
        "image_url": "/products/p107.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-105",
    "name": "Men's Signature Diamond Ring",
    "slug": "men-s-signature-diamond-ring-105",
    "primary_image": "/products/p108.jpeg",
    "base_price": "64700.00",
    "discount_price": null,
    "price": "64700.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "7.84",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 7.84 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2061-21",
    "images": [
      {
        "id": "prod-105-img1",
        "image_url": "/products/p108.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-106",
    "name": "Men's Divine Diamond Ring",
    "slug": "men-s-divine-diamond-ring-106",
    "primary_image": "/products/p109.jpeg",
    "base_price": "75200.00",
    "discount_price": null,
    "price": "75200.00",
    "material": "diamond",
    "purity": "10K",
    "weight_grams": "8.252",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 10K. Net weight approx 8.252 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MOSRN0022-11-Y-22",
    "images": [
      {
        "id": "prod-106-img1",
        "image_url": "/products/p109.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0.438
  },
  {
    "id": "prod-107",
    "name": "Men's Radiant Diamond Bracelet",
    "slug": "men-s-radiant-diamond-bracelet-107",
    "primary_image": "/products/p110.jpeg",
    "base_price": "79200.00",
    "discount_price": null,
    "price": "79200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 16.35 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "men-s-radiant-diamond-bracelet-107",
    "images": [
      {
        "id": "prod-107-img1",
        "image_url": "/products/p110.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-108",
    "name": "Men's Grace Gold Bracelet",
    "slug": "men-s-grace-gold-bracelet-108",
    "primary_image": "/products/p111.jpeg",
    "base_price": "67200.00",
    "discount_price": null,
    "price": "67200.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "33.6",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted gold bracelet in 18K. Net weight approx 33.6 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "men-s-grace-gold-bracelet-108",
    "images": [
      {
        "id": "prod-108-img1",
        "image_url": "/products/p111.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-109",
    "name": "Men's Regal Diamond Bracelet",
    "slug": "men-s-regal-diamond-bracelet-109",
    "primary_image": "/products/p112.jpeg",
    "base_price": "79200.00",
    "discount_price": null,
    "price": "79200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 16.35 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "men-s-regal-diamond-bracelet-109",
    "images": [
      {
        "id": "prod-109-img1",
        "image_url": "/products/p112.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-110",
    "name": "Men's Blossom Diamond Ring",
    "slug": "men-s-blossom-diamond-ring-110",
    "primary_image": "/products/p113.jpeg",
    "base_price": "61500.00",
    "discount_price": null,
    "price": "61500.00",
    "material": "diamond",
    "purity": "10K",
    "weight_grams": "7.916",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 10K. Net weight approx 7.916 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN1691-13-21",
    "images": [
      {
        "id": "prod-110-img1",
        "image_url": "/products/p113.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0.184
  },
  {
    "id": "prod-111",
    "name": "Men's Aurora Diamond Ring",
    "slug": "men-s-aurora-diamond-ring-111",
    "primary_image": "/products/p114.jpeg",
    "base_price": "48000.00",
    "discount_price": null,
    "price": "48000.00",
    "material": "diamond",
    "purity": "10K",
    "weight_grams": "6.576",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 10K. Net weight approx 6.576 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN1809-14-20",
    "images": [
      {
        "id": "prod-111-img1",
        "image_url": "/products/p114.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0.084
  },
  {
    "id": "prod-112",
    "name": "Men's Celeste Diamond Ring",
    "slug": "men-s-celeste-diamond-ring-112",
    "primary_image": "/products/p115.jpeg",
    "base_price": "46800.00",
    "discount_price": null,
    "price": "46800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "6.147",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 6.147 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2013-28-22",
    "images": [
      {
        "id": "prod-112-img1",
        "image_url": "/products/p115.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0.123
  },
  {
    "id": "prod-113",
    "name": "Men's Imperial Diamond Bracelet",
    "slug": "men-s-imperial-diamond-bracelet-113",
    "primary_image": "/products/p116.jpeg",
    "base_price": "105700.00",
    "discount_price": null,
    "price": "105700.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "15.19",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 15.19 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRBR396-06-8",
    "images": [
      {
        "id": "prod-113-img1",
        "image_url": "/products/p116.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0.08
  },
  {
    "id": "prod-114",
    "name": "Men's Lumina Diamond Bracelet",
    "slug": "men-s-lumina-diamond-bracelet-114",
    "primary_image": "/products/p117.jpeg",
    "base_price": "79200.00",
    "discount_price": null,
    "price": "79200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 16.35 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "men-s-lumina-diamond-bracelet-114",
    "images": [
      {
        "id": "prod-114-img1",
        "image_url": "/products/p117.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelet",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-115",
    "name": "Men's Meera Diamond Ring",
    "slug": "men-s-meera-diamond-ring-115",
    "primary_image": "/products/p118.jpeg",
    "base_price": "30400.00",
    "discount_price": null,
    "price": "30400.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.932",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 3.932 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN1041-24-23",
    "images": [
      {
        "id": "prod-115-img1",
        "image_url": "/products/p118.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0.088
  },
  {
    "id": "prod-116",
    "name": "Men's Rivaah Gold Ring",
    "slug": "men-s-rivaah-gold-ring-116",
    "primary_image": "/products/p119.jpeg",
    "base_price": "28200.00",
    "discount_price": null,
    "price": "28200.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "4.19",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mens-jewellery",
    "category_name": "Men's Jewellery",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 4.19 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1210-21-22",
    "images": [
      {
        "id": "prod-116-img1",
        "image_url": "/products/p119.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-117",
    "name": "Nakshatra Gold Earrings",
    "slug": "nakshatra-gold-earrings-117",
    "primary_image": "/products/p120.jpeg",
    "base_price": "26100.00",
    "discount_price": null,
    "price": "26100.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "3.89",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 3.89 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "TR2971-02",
    "images": [
      {
        "id": "prod-117-img1",
        "image_url": "/products/p120.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-118",
    "name": "Zoya Diamond Pendant Set",
    "slug": "zoya-diamond-pendant-set-118",
    "primary_image": "/products/p121.jpeg",
    "base_price": "429000.00",
    "discount_price": null,
    "price": "429000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "15.231",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 15.231 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "zoya-diamond-pendant-set-118",
    "images": [
      {
        "id": "prod-118-img1",
        "image_url": "/products/p121.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 9.087,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-119",
    "name": "Kiara Gold Earrings",
    "slug": "kiara-gold-earrings-119",
    "primary_image": "/products/p122.jpeg",
    "base_price": "13800.00",
    "discount_price": null,
    "price": "13800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.05",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.05 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD118-09",
    "images": [
      {
        "id": "prod-119-img1",
        "image_url": "/products/p122.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-120",
    "name": "Anaya Gold Earrings",
    "slug": "anaya-gold-earrings-120",
    "primary_image": "/products/p123.jpeg",
    "base_price": "19400.00",
    "discount_price": null,
    "price": "19400.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.88",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.88 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HMJ1128-03",
    "images": [
      {
        "id": "prod-120-img1",
        "image_url": "/products/p123.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-121",
    "name": "Classic Gold Earrings",
    "slug": "classic-gold-earrings-121",
    "primary_image": "/products/p124.jpeg",
    "base_price": "12200.00",
    "discount_price": null,
    "price": "12200.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.82",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 1.82 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD119-09",
    "images": [
      {
        "id": "prod-121-img1",
        "image_url": "/products/p124.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-122",
    "name": "Royal Gold Earrings",
    "slug": "royal-gold-earrings-122",
    "primary_image": "/products/p125.jpeg",
    "base_price": "17500.00",
    "discount_price": null,
    "price": "17500.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.6",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.6 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD119-01",
    "images": [
      {
        "id": "prod-122-img1",
        "image_url": "/products/p125.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-123",
    "name": "Elegant Diamond Pendant Set",
    "slug": "elegant-diamond-pendant-set-123",
    "primary_image": "/products/p126.jpeg",
    "base_price": "155100.00",
    "discount_price": null,
    "price": "155100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.78",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 2.78 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SN525-18K",
    "images": [
      {
        "id": "prod-123-img1",
        "image_url": "/products/p126.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 3.031
  },
  {
    "id": "prod-124",
    "name": "Heritage Gold Earrings",
    "slug": "heritage-gold-earrings-124",
    "primary_image": "/products/p127.jpeg",
    "base_price": "16800.00",
    "discount_price": null,
    "price": "16800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.5",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HMJ1057-01",
    "images": [
      {
        "id": "prod-124-img1",
        "image_url": "/products/p127.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-125",
    "name": "Signature Gold Earrings",
    "slug": "signature-gold-earrings-125",
    "primary_image": "/products/p128.jpeg",
    "base_price": "15900.00",
    "discount_price": null,
    "price": "15900.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.37",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.37 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "TR2946-01",
    "images": [
      {
        "id": "prod-125-img1",
        "image_url": "/products/p128.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-126",
    "name": "Divine Diamond Ring",
    "slug": "divine-diamond-ring-126",
    "primary_image": "/products/p129.jpeg",
    "base_price": "44300.00",
    "discount_price": null,
    "price": "44300.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "6.144",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 6.144 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "UK1710-05-13",
    "images": [
      {
        "id": "prod-126-img1",
        "image_url": "/products/p129.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.066
  },
  {
    "id": "prod-127",
    "name": "Radiant Gold Earrings",
    "slug": "radiant-gold-earrings-127",
    "primary_image": "/products/p130.jpeg",
    "base_price": "21300.00",
    "discount_price": null,
    "price": "21300.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "3.17",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 3.17 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "TR2961-04",
    "images": [
      {
        "id": "prod-127-img1",
        "image_url": "/products/p130.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-128",
    "name": "Grace Diamond Bracelet",
    "slug": "grace-diamond-bracelet-128",
    "primary_image": "/products/p131.jpeg",
    "base_price": "26500.00",
    "discount_price": null,
    "price": "26500.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.703",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 3.703 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MOMB8122-05",
    "images": [
      {
        "id": "prod-128-img1",
        "image_url": "/products/p131.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelet",
    "carats": 0.035
  },
  {
    "id": "prod-129",
    "name": "Regal Gold Earrings",
    "slug": "regal-gold-earrings-129",
    "primary_image": "/products/p132.jpeg",
    "base_price": "27300.00",
    "discount_price": null,
    "price": "27300.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "4.06",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 4.06 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "TR2946-17",
    "images": [
      {
        "id": "prod-129-img1",
        "image_url": "/products/p132.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-130",
    "name": "Blossom Diamond Earrings",
    "slug": "blossom-diamond-earrings-130",
    "primary_image": "/products/p133.jpeg",
    "base_price": "58200.00",
    "discount_price": null,
    "price": "58200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "6.87",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted diamond earrings in 18K. Net weight approx 6.87 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "blossom-diamond-earrings-130",
    "images": [
      {
        "id": "prod-130-img1",
        "image_url": "/products/p133.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-131",
    "name": "Aurora Gold Earrings",
    "slug": "aurora-gold-earrings-131",
    "primary_image": "/products/p134.jpeg",
    "base_price": "26500.00",
    "discount_price": null,
    "price": "26500.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "3.95",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 3.95 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "TR2946-14",
    "images": [
      {
        "id": "prod-131-img1",
        "image_url": "/products/p134.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-132",
    "name": "Celeste Gold Earrings",
    "slug": "celeste-gold-earrings-132",
    "primary_image": "/products/p135.jpeg",
    "base_price": "18300.00",
    "discount_price": null,
    "price": "18300.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.73",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.73 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD118-02",
    "images": [
      {
        "id": "prod-132-img1",
        "image_url": "/products/p135.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-133",
    "name": "Imperial Gold Earrings",
    "slug": "imperial-gold-earrings-133",
    "primary_image": "/products/p136.jpeg",
    "base_price": "15700.00",
    "discount_price": null,
    "price": "15700.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.34",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.34 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "TR2961-02",
    "images": [
      {
        "id": "prod-133-img1",
        "image_url": "/products/p136.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-134",
    "name": "Lumina Diamond Pendant Set",
    "slug": "lumina-diamond-pendant-set-134",
    "primary_image": "/products/p137.jpeg",
    "base_price": "78400.00",
    "discount_price": null,
    "price": "78400.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "9.874",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 9.874 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "lumina-diamond-pendant-set-134",
    "images": [
      {
        "id": "prod-134-img1",
        "image_url": "/products/p137.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-142",
    "name": "Royal Diamond Necklace",
    "slug": "royal-diamond-necklace-142",
    "primary_image": "/products/p145.jpeg",
    "base_price": "156900.00",
    "discount_price": null,
    "price": "156900.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "21.568",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 21.568 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "royal-diamond-necklace-142",
    "images": [
      {
        "id": "prod-142-img1",
        "image_url": "/products/p145.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-144",
    "name": "Heritage Gold Earrings",
    "slug": "heritage-gold-earrings-144",
    "primary_image": "/products/p147.jpeg",
    "base_price": "16400.00",
    "discount_price": null,
    "price": "16400.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.44",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.44 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD124-06",
    "images": [
      {
        "id": "prod-144-img1",
        "image_url": "/products/p147.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-145",
    "name": "Signature Gold Earrings",
    "slug": "signature-gold-earrings-145",
    "primary_image": "/products/p148.jpeg",
    "base_price": "13200.00",
    "discount_price": null,
    "price": "13200.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.96",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 1.96 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD125-02",
    "images": [
      {
        "id": "prod-145-img1",
        "image_url": "/products/p148.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-146",
    "name": "Divine Gold Earrings",
    "slug": "divine-gold-earrings-146",
    "primary_image": "/products/p149.jpeg",
    "base_price": "17000.00",
    "discount_price": null,
    "price": "17000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.53 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HMJ1126-11",
    "images": [
      {
        "id": "prod-146-img1",
        "image_url": "/products/p149.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-147",
    "name": "Radiant Gold Earrings",
    "slug": "radiant-gold-earrings-147",
    "primary_image": "/products/p150.jpeg",
    "base_price": "24200.00",
    "discount_price": null,
    "price": "24200.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "3.6",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 3.6 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HMN1864-06",
    "images": [
      {
        "id": "prod-147-img1",
        "image_url": "/products/p150.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-148",
    "name": "Grace Diamond Bracelet",
    "slug": "grace-diamond-bracelet-148",
    "primary_image": "/products/p151.jpeg",
    "base_price": "63800.00",
    "discount_price": null,
    "price": "63800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "7.96",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 7.96 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CSB610-10-43.5*55",
    "images": [
      {
        "id": "prod-148-img1",
        "image_url": "/products/p151.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelet",
    "carats": 0.23
  },
  {
    "id": "prod-149",
    "name": "Regal Gold Earrings",
    "slug": "regal-gold-earrings-149",
    "primary_image": "/products/p152.jpeg",
    "base_price": "13800.00",
    "discount_price": null,
    "price": "13800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.05",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.05 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD123-01",
    "images": [
      {
        "id": "prod-149-img1",
        "image_url": "/products/p152.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-150",
    "name": "Blossom Diamond Pendant Set",
    "slug": "blossom-diamond-pendant-set-150",
    "primary_image": "/products/p153.jpeg",
    "base_price": "58900.00",
    "discount_price": null,
    "price": "58900.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "6.984",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 6.984 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "STUD100677663",
    "images": [
      {
        "id": "prod-150-img1",
        "image_url": "/products/p153.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-151",
    "name": "Aurora Gold Earrings",
    "slug": "aurora-gold-earrings-151",
    "primary_image": "/products/p154.jpeg",
    "base_price": "17700.00",
    "discount_price": null,
    "price": "17700.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.63",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.63 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HMJ1127-02",
    "images": [
      {
        "id": "prod-151-img1",
        "image_url": "/products/p154.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-152",
    "name": "Celeste Diamond Bracelet",
    "slug": "celeste-diamond-bracelet-152",
    "primary_image": "/products/p155.jpeg",
    "base_price": "77500.00",
    "discount_price": null,
    "price": "77500.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "10.484",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 10.484 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CSB600-08-47.5*58",
    "images": [
      {
        "id": "prod-152-img1",
        "image_url": "/products/p155.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelet",
    "carats": 0.156
  },
  {
    "id": "prod-153",
    "name": "Imperial Gold Earrings",
    "slug": "imperial-gold-earrings-153",
    "primary_image": "/products/p156.jpeg",
    "base_price": "15700.00",
    "discount_price": null,
    "price": "15700.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.33",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.33 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD129-03",
    "images": [
      {
        "id": "prod-153-img1",
        "image_url": "/products/p156.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-154",
    "name": "Lumina Diamond Bracelet",
    "slug": "lumina-diamond-bracelet-154",
    "primary_image": "/products/p157.jpeg",
    "base_price": "61900.00",
    "discount_price": null,
    "price": "61900.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "8.48",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 8.48 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CSB516-03-47.5*56",
    "images": [
      {
        "id": "prod-154-img1",
        "image_url": "/products/p157.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelet",
    "carats": 0.11
  },
  {
    "id": "prod-155",
    "name": "Meera Gold Earrings",
    "slug": "meera-gold-earrings-155",
    "primary_image": "/products/p158.jpeg",
    "base_price": "37000.00",
    "discount_price": null,
    "price": "37000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 5.5 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "0700342845-CASTING/STUD",
    "images": [
      {
        "id": "prod-155-img1",
        "image_url": "/products/p158.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-156",
    "name": "Rivaah Diamond Pendant Set",
    "slug": "rivaah-diamond-pendant-set-156",
    "primary_image": "/products/p159.jpeg",
    "base_price": "50100.00",
    "discount_price": null,
    "price": "50100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "5.669",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant set in 18K. Net weight approx 5.669 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "rivaah-diamond-pendant-set-156",
    "images": [
      {
        "id": "prod-156-img1",
        "image_url": "/products/p159.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-157",
    "name": "Nakshatra Gold Earrings",
    "slug": "nakshatra-gold-earrings-157",
    "primary_image": "/products/p160.jpeg",
    "base_price": "15900.00",
    "discount_price": null,
    "price": "15900.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.37",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Beautifully crafted gold earrings in 18K. Net weight approx 2.37 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HMJ1127-11",
    "images": [
      {
        "id": "prod-157-img1",
        "image_url": "/products/p160.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0
  },
  {
    "id": "prod-158",
    "name": "Zoya Diamond Bracelet",
    "slug": "zoya-diamond-bracelet-158",
    "primary_image": "/products/p161.jpeg",
    "base_price": "56800.00",
    "discount_price": null,
    "price": "56800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "7.685",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Beautifully crafted diamond bracelet in 18K. Net weight approx 7.685 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CSB516-03-45*55",
    "images": [
      {
        "id": "prod-158-img1",
        "image_url": "/products/p161.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelet",
    "carats": 0.115
  },
  {
    "id": "prod-159",
    "name": "Kiara Diamond Ring",
    "slug": "kiara-diamond-ring-159",
    "primary_image": "/products/p162.jpeg",
    "base_price": "105400.00",
    "discount_price": null,
    "price": "105400.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "7.685",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K with double circle CZ design. Net weight approx 7.685 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "kiara-diamond-ring-159",
    "images": [
      {
        "id": "prod-159-img1",
        "image_url": "/products/p162.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-160",
    "name": "Anaya Gold Pendant Set",
    "slug": "anaya-gold-pendant-set-160",
    "primary_image": "/products/p163.jpeg",
    "base_price": "13800.00",
    "discount_price": null,
    "price": "13800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "13.905",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted gold pendant set with matching earrings in 18K. Net weight approx 13.905 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MPD127-10",
    "images": [
      {
        "id": "prod-160-img1",
        "image_url": "/products/p163.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-161",
    "name": "Classic Diamond Ring",
    "slug": "classic-diamond-ring-161",
    "primary_image": "/products/p164.jpeg",
    "base_price": "22700.00",
    "discount_price": null,
    "price": "22700.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.59",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 1.59 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNLR82150G",
    "images": [
      {
        "id": "prod-161-img1",
        "image_url": "/products/p164.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-162",
    "name": "Royal Diamond Necklace",
    "slug": "royal-diamond-necklace-162",
    "primary_image": "/products/p165.jpeg",
    "base_price": "104800.00",
    "discount_price": null,
    "price": "104800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "13.809",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Beautifully crafted diamond necklace in 18K. Net weight approx 13.809 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "royal-diamond-necklace-162",
    "images": [
      {
        "id": "prod-162-img1",
        "image_url": "/products/p165.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-163",
    "name": "Elegant Diamond Ring",
    "slug": "elegant-diamond-ring-163",
    "primary_image": "/products/p166.jpeg",
    "base_price": "23100.00",
    "discount_price": null,
    "price": "23100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.656",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 1.656 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNLR71528WA",
    "images": [
      {
        "id": "prod-163-img1",
        "image_url": "/products/p166.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-164",
    "name": "Heritage Diamond Ring",
    "slug": "heritage-diamond-ring-164",
    "primary_image": "/products/p167.jpeg",
    "base_price": "23100.00",
    "discount_price": null,
    "price": "23100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.652",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 1.652 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNLR76759WA",
    "images": [
      {
        "id": "prod-164-img1",
        "image_url": "/products/p167.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-165",
    "name": "Signature Diamond Ring",
    "slug": "signature-diamond-ring-165",
    "primary_image": "/products/p168.jpeg",
    "base_price": "24500.00",
    "discount_price": null,
    "price": "24500.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.863",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 1.863 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNLR71162WA",
    "images": [
      {
        "id": "prod-165-img1",
        "image_url": "/products/p168.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-166",
    "name": "Divine Diamond Ring",
    "slug": "divine-diamond-ring-166",
    "primary_image": "/products/p169.jpeg",
    "base_price": "28000.00",
    "discount_price": null,
    "price": "28000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.385",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.385 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNLR7161BG",
    "images": [
      {
        "id": "prod-166-img1",
        "image_url": "/products/p169.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-167",
    "name": "Radiant Gold Bracelet",
    "slug": "radiant-gold-bracelet-167",
    "primary_image": "/products/p170.jpeg",
    "base_price": "258000.00",
    "discount_price": null,
    "price": "258000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "38.4",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Beautifully crafted gold bracelet in 18K. Net weight approx 38.4 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "radiant-gold-bracelet-167",
    "images": [
      {
        "id": "prod-167-img1",
        "image_url": "/products/p170.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelet",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-168",
    "name": "Grace Diamond Ring",
    "slug": "grace-diamond-ring-168",
    "primary_image": "/products/p171.jpeg",
    "base_price": "21100.00",
    "discount_price": null,
    "price": "21100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.349",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 1.349 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "FNLR74770B",
    "images": [
      {
        "id": "prod-168-img1",
        "image_url": "/products/p171.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-169",
    "name": "Regal Gold Ring",
    "slug": "regal-gold-ring-169",
    "primary_image": "/products/p172.jpeg",
    "base_price": "8500.00",
    "discount_price": null,
    "price": "8500.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.27",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 1.27 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "TR2858-16-14",
    "images": [
      {
        "id": "prod-169-img1",
        "image_url": "/products/p172.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-170",
    "name": "Blossom Diamond Ring",
    "slug": "blossom-diamond-ring-170",
    "primary_image": "/products/p173.jpeg",
    "base_price": "19800.00",
    "discount_price": null,
    "price": "19800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "1.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 1.16 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1191-22-10",
    "images": [
      {
        "id": "prod-170-img1",
        "image_url": "/products/p173.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-171",
    "name": "Aurora Gold Ring",
    "slug": "aurora-gold-ring-171",
    "primary_image": "/products/p174.jpeg",
    "base_price": "16700.00",
    "discount_price": null,
    "price": "16700.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.48",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 2.48 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MMG563-25-8",
    "images": [
      {
        "id": "prod-171-img1",
        "image_url": "/products/p174.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-172",
    "name": "Celeste Gold Ring",
    "slug": "celeste-gold-ring-172",
    "primary_image": "/products/p175.jpeg",
    "base_price": "7700.00",
    "discount_price": null,
    "price": "7700.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.15",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 1.15 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1199-02-11",
    "images": [
      {
        "id": "prod-172-img1",
        "image_url": "/products/p175.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-173",
    "name": "Imperial Gold Ring",
    "slug": "imperial-gold-ring-173",
    "primary_image": "/products/p176.jpeg",
    "base_price": "8300.00",
    "discount_price": null,
    "price": "8300.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.23",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 1.23 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1191-16-15",
    "images": [
      {
        "id": "prod-173-img1",
        "image_url": "/products/p176.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-174",
    "name": "Lumina Gold Ring",
    "slug": "lumina-gold-ring-174",
    "primary_image": "/products/p177.jpeg",
    "base_price": "6500.00",
    "discount_price": null,
    "price": "6500.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "0.96",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 0.96 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1189-12-12",
    "images": [
      {
        "id": "prod-174-img1",
        "image_url": "/products/p177.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-175",
    "name": "Meera Gold Ring",
    "slug": "meera-gold-ring-175",
    "primary_image": "/products/p178.jpeg",
    "base_price": "8200.00",
    "discount_price": null,
    "price": "8200.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.22",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 1.22 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1190-40-15",
    "images": [
      {
        "id": "prod-175-img1",
        "image_url": "/products/p178.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-176",
    "name": "Rivaah Diamond Ring",
    "slug": "rivaah-diamond-ring-176",
    "primary_image": "/products/p179.jpeg",
    "base_price": "28200.00",
    "discount_price": null,
    "price": "28200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.943",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.943 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2042-18-14",
    "images": [
      {
        "id": "prod-176-img1",
        "image_url": "/products/p179.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.187
  },
  {
    "id": "prod-177",
    "name": "Nakshatra Diamond Ring",
    "slug": "nakshatra-diamond-ring-177",
    "primary_image": "/products/p180.jpeg",
    "base_price": "24600.00",
    "discount_price": null,
    "price": "24600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.944",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.944 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2049-05-18",
    "images": [
      {
        "id": "prod-177-img1",
        "image_url": "/products/p180.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.106
  },
  {
    "id": "prod-178",
    "name": "Zoya Diamond Ring",
    "slug": "zoya-diamond-ring-178",
    "primary_image": "/products/p181.jpeg",
    "base_price": "25400.00",
    "discount_price": null,
    "price": "25400.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.099",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 3.099 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2033-21-9",
    "images": [
      {
        "id": "prod-178-img1",
        "image_url": "/products/p181.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.101
  },
  {
    "id": "prod-179",
    "name": "Kiara Diamond Ring",
    "slug": "kiara-diamond-ring-179",
    "primary_image": "/products/p182.jpeg",
    "base_price": "28200.00",
    "discount_price": null,
    "price": "28200.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.836",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.836 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2058-02-12",
    "images": [
      {
        "id": "prod-179-img1",
        "image_url": "/products/p182.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.204
  },
  {
    "id": "prod-180",
    "name": "Anaya Gold Ring",
    "slug": "anaya-gold-ring-180",
    "primary_image": "/products/p183.jpeg",
    "base_price": "6900.00",
    "discount_price": null,
    "price": "6900.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.02",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 1.02 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1191-17-17",
    "images": [
      {
        "id": "prod-180-img1",
        "image_url": "/products/p183.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-181",
    "name": "Classic Gold Ring",
    "slug": "classic-gold-ring-181",
    "primary_image": "/products/p184.jpeg",
    "base_price": "8800.00",
    "discount_price": null,
    "price": "8800.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.31",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 1.31 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1191-35-9",
    "images": [
      {
        "id": "prod-181-img1",
        "image_url": "/products/p184.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-182",
    "name": "Royal Gold Ring",
    "slug": "royal-gold-ring-182",
    "primary_image": "/products/p185.jpeg",
    "base_price": "7700.00",
    "discount_price": null,
    "price": "7700.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.14",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 1.14 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1193-02-17",
    "images": [
      {
        "id": "prod-182-img1",
        "image_url": "/products/p185.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-183",
    "name": "Elegant Diamond Ring",
    "slug": "elegant-diamond-ring-183",
    "primary_image": "/products/p186.jpeg",
    "base_price": "39800.00",
    "discount_price": null,
    "price": "39800.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "4.121",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 4.121 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2025-09-12",
    "images": [
      {
        "id": "prod-183-img1",
        "image_url": "/products/p186.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.269
  },
  {
    "id": "prod-184",
    "name": "Heritage Diamond Ring",
    "slug": "heritage-diamond-ring-184",
    "primary_image": "/products/p187.jpeg",
    "base_price": "24400.00",
    "discount_price": null,
    "price": "24400.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.959",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.959 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SFS698-03-9",
    "images": [
      {
        "id": "prod-184-img1",
        "image_url": "/products/p187.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.101
  },
  {
    "id": "prod-185",
    "name": "Signature Gold Ring",
    "slug": "signature-gold-ring-185",
    "primary_image": "/products/p188.jpeg",
    "base_price": "8300.00",
    "discount_price": null,
    "price": "8300.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.23",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted gold ring in 18K. Net weight approx 1.23 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "PRN1191-49-15",
    "images": [
      {
        "id": "prod-185-img1",
        "image_url": "/products/p188.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-186",
    "name": "Divine Diamond Ring",
    "slug": "divine-diamond-ring-186",
    "primary_image": "/products/p189.jpeg",
    "base_price": "39600.00",
    "discount_price": null,
    "price": "39600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "4.962",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 4.962 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2041-01-10",
    "images": [
      {
        "id": "prod-186-img1",
        "image_url": "/products/p189.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.138
  },
  {
    "id": "prod-187",
    "name": "Radiant Diamond Ring",
    "slug": "radiant-diamond-ring-187",
    "primary_image": "/products/p190.jpeg",
    "base_price": "21700.00",
    "discount_price": null,
    "price": "21700.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.63",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.63 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2018-02-14",
    "images": [
      {
        "id": "prod-187-img1",
        "image_url": "/products/p190.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.09
  },
  {
    "id": "prod-188",
    "name": "Grace Diamond Ring",
    "slug": "grace-diamond-ring-188",
    "primary_image": "/products/p191.jpeg",
    "base_price": "18400.00",
    "discount_price": null,
    "price": "18400.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.399",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.399 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SFS689-06-16",
    "images": [
      {
        "id": "prod-188-img1",
        "image_url": "/products/p191.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.051
  },
  {
    "id": "prod-189",
    "name": "Regal Diamond Ring",
    "slug": "regal-diamond-ring-189",
    "primary_image": "/products/p192.jpeg",
    "base_price": "30100.00",
    "discount_price": null,
    "price": "30100.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.163",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 3.163 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SFS683-03-14",
    "images": [
      {
        "id": "prod-189-img1",
        "image_url": "/products/p192.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.197
  },
  {
    "id": "prod-190",
    "name": "Blossom Diamond Ring",
    "slug": "blossom-diamond-ring-190",
    "primary_image": "/products/p193.jpeg",
    "base_price": "20600.00",
    "discount_price": null,
    "price": "20600.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.777",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.777 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2051-02-12",
    "images": [
      {
        "id": "prod-190-img1",
        "image_url": "/products/p193.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.043
  },
  {
    "id": "prod-191",
    "name": "Aurora Diamond Ring",
    "slug": "aurora-diamond-ring-191",
    "primary_image": "/products/p194.jpeg",
    "base_price": "19000.00",
    "discount_price": null,
    "price": "19000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.432",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.432 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2033-26-10",
    "images": [
      {
        "id": "prod-191-img1",
        "image_url": "/products/p194.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.058
  },
  {
    "id": "prod-192",
    "name": "Celeste Diamond Ring",
    "slug": "celeste-diamond-ring-192",
    "primary_image": "/products/p195.jpeg",
    "base_price": "15300.00",
    "discount_price": null,
    "price": "15300.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.01",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Beautifully crafted diamond ring in 18K. Net weight approx 2.01 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2026-21-10",
    "images": [
      {
        "id": "prod-192-img1",
        "image_url": "/products/p195.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0.04
  },
  {
    "id": "prod-193",
    "name": "Imperial Diamond Pendant",
    "slug": "imperial-diamond-pendant-193",
    "primary_image": "/products/p196.jpeg",
    "base_price": "21300.00",
    "discount_price": null,
    "price": "21300.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.748",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Beautifully crafted diamond pendant in 18K. Net weight approx 2.748 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "SRN2016-25-17",
    "images": [
      {
        "id": "prod-193-img1",
        "image_url": "/products/p196.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant",
    "carats": 0.062
  },
  {
    "id": "prod-194",
    "name": "Dual Tone Ball Bead Chain",
    "slug": "dual-tone-ball-bead-chain-chn-001",
    "primary_image": "/products/p197.jpeg",
    "base_price": "57622.00",
    "discount_price": null,
    "price": "88679.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.66",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold chain with dual-tone ball bead stations alternating with polished links. Elegant everyday wear.",
    "sku": "CHN-001",
    "images": [
      {
        "id": "prod-194-img1",
        "image_url": "/products/p197.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-195",
    "name": "Foxtail Chain with Tassel Drop Pendant",
    "slug": "foxtail-chain-with-tassel-drop-pendant-chn-002",
    "primary_image": "/products/p198.jpeg",
    "base_price": "71725.00",
    "discount_price": null,
    "price": "110383.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.29",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold foxtail chain necklace with ornate tassel drop pendant. Classic Indian design.",
    "sku": "CHN-002",
    "images": [
      {
        "id": "prod-195-img1",
        "image_url": "/products/p198.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-196",
    "name": "Diamond-Cut Foxtail Chain",
    "slug": "diamond-cut-foxtail-chain-chn-003",
    "primary_image": "/products/p199.jpeg",
    "base_price": "79598.00",
    "discount_price": null,
    "price": "122500.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "9.20",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold diamond-cut foxtail chain. Sparkling faceted links for a brilliant look.",
    "sku": "CHN-003",
    "images": [
      {
        "id": "prod-196-img1",
        "image_url": "/products/p199.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-197",
    "name": "Box Chain with Floral Heart Pendant",
    "slug": "box-chain-with-floral-heart-pendant-chn-004",
    "primary_image": "/products/p200.jpeg",
    "base_price": "73455.00",
    "discount_price": null,
    "price": "113046.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.49",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold box chain necklace with a floral heart pendant and small bead accents.",
    "sku": "CHN-004",
    "images": [
      {
        "id": "prod-197-img1",
        "image_url": "/products/p200.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-198",
    "name": "Peacock Meenakari Chain with Jhumka Pendant",
    "slug": "peacock-meenakari-chain-with-jhumka-pendant-chn-005",
    "primary_image": "/products/p201.jpeg",
    "base_price": "67826.00",
    "discount_price": null,
    "price": "104383.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.77",
    "is_featured": true,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold chain with meenakari peacock pendant and jhumka drop. Traditional festive design.",
    "sku": "CHN-005",
    "images": [
      {
        "id": "prod-198-img1",
        "image_url": "/products/p201.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-199",
    "name": "Peacock Chain with Ruby-Tipped Tassels",
    "slug": "peacock-chain-with-ruby-tipped-tassels-chn-006",
    "primary_image": "/products/p202.jpeg",
    "base_price": "63811.00",
    "discount_price": null,
    "price": "98203.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.31",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold chain necklace with peacock motif and ruby-accented tassel drops. Bridal and festive.",
    "sku": "CHN-006",
    "images": [
      {
        "id": "prod-199-img1",
        "image_url": "/products/p202.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-200",
    "name": "Teardrop Peacock Meenakari Chain",
    "slug": "teardrop-peacock-meenakari-chain-chn-007",
    "primary_image": "/products/p203.jpeg",
    "base_price": "59526.00",
    "discount_price": null,
    "price": "91609.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.88",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold chain with teardrop pendant featuring meenakari peacock motif.",
    "sku": "CHN-007",
    "images": [
      {
        "id": "prod-200-img1",
        "image_url": "/products/p203.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-201",
    "name": "Fancy-Link Gold Chain with Pineapple Pendant",
    "slug": "fancy-link-gold-chain-with-pineapple-pendant-chn-008",
    "primary_image": "/products/p204.jpeg",
    "base_price": "45942.00",
    "discount_price": null,
    "price": "70704.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.31",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold fancy-link chain necklace with a decorative pineapple pendant.",
    "sku": "CHN-008",
    "images": [
      {
        "id": "prod-201-img1",
        "image_url": "/products/p204.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-202",
    "name": "Box Chain with Barrel Bead Pendant",
    "slug": "box-chain-with-barrel-bead-pendant-chn-009",
    "primary_image": "/products/p205.jpeg",
    "base_price": "32878.00",
    "discount_price": null,
    "price": "50598.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "3.80",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold box chain necklace with barrel bead pendant drop.",
    "sku": "CHN-009",
    "images": [
      {
        "id": "prod-202-img1",
        "image_url": "/products/p205.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-203",
    "name": "Floral Leaf Engraved Gold Bangles (Set of 4)",
    "slug": "floral-leaf-engraved-gold-bangles-set-of-4-bng-001",
    "primary_image": "/products/p206.jpeg",
    "base_price": "172074.00",
    "discount_price": null,
    "price": "264818.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.25",
    "is_featured": true,
    "stock_quantity": 1,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "Set of 4 gold bangles with floral leaf engraved pattern. 22K gold, approx 20.25 g.",
    "sku": "BNG-001",
    "images": [
      {
        "id": "prod-203-img1",
        "image_url": "/products/p206.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangle",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-204",
    "name": "Floral Bird Motif Gold Bangles (Set of 4)",
    "slug": "floral-bird-motif-gold-bangles-set-of-4-bng-002",
    "primary_image": "/products/p207.jpeg",
    "base_price": "167571.00",
    "discount_price": null,
    "price": "257887.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.72",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "Set of 4 gold bangles with floral bird motif design. 22K gold, approx 19.72 g.",
    "sku": "BNG-002",
    "images": [
      {
        "id": "prod-204-img1",
        "image_url": "/products/p207.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangle",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-205",
    "name": "Diagonal Twisted Gold Bangles (Set of 4)",
    "slug": "diagonal-twisted-gold-bangles-set-of-4-bng-003",
    "primary_image": "/products/p208.jpeg",
    "base_price": "170545.00",
    "discount_price": null,
    "price": "262464.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.07",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "Set of 4 gold bangles with diagonal twisted pattern. 22K gold, approx 20.07 g.",
    "sku": "BNG-003",
    "images": [
      {
        "id": "prod-205-img1",
        "image_url": "/products/p208.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangle",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-206",
    "name": "Geometric Diamond Pattern Gold Bangles (Set of 4)",
    "slug": "geometric-diamond-pattern-gold-bangles-set-of-4-bng-004",
    "primary_image": "/products/p209.jpeg",
    "base_price": "172754.00",
    "discount_price": null,
    "price": "265865.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.33",
    "is_featured": false,
    "stock_quantity": 1,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "Set of 4 gold bangles with geometric diamond-cut pattern. 22K gold, approx 20.33 g.",
    "sku": "BNG-004",
    "images": [
      {
        "id": "prod-206-img1",
        "image_url": "/products/p209.jpeg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangle",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-207",
    "name": "Floral Disc Link Gold Chain",
    "slug": "floral-disc-link-gold-chain-207",
    "primary_image": "/products/chain_011_01.jpg",
    "base_price": "150631.00",
    "discount_price": null,
    "price": "150631.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.41",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "Ladies gold chain with floral disc links. Elegant design for daily and festive wear.",
    "sku": "CHN-011",
    "images": [
      {
        "id": "prod-207-img1",
        "image_url": "/products/chain_011_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-208",
    "name": "Leaf Scale Link Gold Chain",
    "slug": "leaf-scale-link-gold-chain-208",
    "primary_image": "/products/chain_013_01.jpg",
    "base_price": "216992.00",
    "discount_price": null,
    "price": "216992.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "25.08",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "Bold gold chain with broad textured leaf/scale-pattern links and round bead accents.",
    "sku": "CHN-013",
    "images": [
      {
        "id": "prod-208-img1",
        "image_url": "/products/chain_013_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0
  },
  {
    "id": "prod-209",
    "name": "Diamond Station Y-Drop Chain",
    "slug": "diamond-station-y-drop-chain-209",
    "primary_image": "/products/chain_015_01.jpg",
    "base_price": "39124.00",
    "discount_price": null,
    "price": "39124.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.522",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "Delicate gold chain necklace with diamond stations and a Y-drop tassel ending in teardrop charms.",
    "sku": "CHN-015",
    "images": [
      {
        "id": "prod-209-img1",
        "image_url": "/products/chain_015_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-210",
    "name": "Lakshmi Ganesha Temple Coin Haar",
    "slug": "lakshmi-ganesha-temple-coin-haar-210",
    "primary_image": "/products/haar_023_01.jpg",
    "base_price": "152621.00",
    "discount_price": null,
    "price": "152621.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.64",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold haar necklace with large Ganesha pendant and Lakshmi coin accents with gold bead spacers. Traditional temple design.",
    "sku": "HAR-023",
    "images": [
      {
        "id": "prod-210-img1",
        "image_url": "/products/haar_023_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-211",
    "name": "Temple Deity Coin Haar",
    "slug": "temple-deity-coin-haar-211",
    "primary_image": "/products/haar_024_01.jpg",
    "base_price": "129088.00",
    "discount_price": null,
    "price": "129088.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "14.92",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold haar necklace with mixed deity coin pendants and gold bead spacers. Traditional temple design.",
    "sku": "HAR-024",
    "images": [
      {
        "id": "prod-211-img1",
        "image_url": "/products/haar_024_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-212",
    "name": "Lakshmi Jhumka Pendant Coin Haar",
    "slug": "lakshmi-jhumka-pendant-coin-haar-212",
    "primary_image": "/products/haar_025_01.jpg",
    "base_price": "152102.00",
    "discount_price": null,
    "price": "152102.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.58",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold haar necklace with large Lakshmi pendant and jhumka drops on coin chain.",
    "sku": "HAR-025",
    "images": [
      {
        "id": "prod-212-img1",
        "image_url": "/products/haar_025_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-213",
    "name": "Pearl and Blue Bead Peacock Haar Set",
    "slug": "pearl-and-blue-bead-peacock-haar-set-213",
    "primary_image": "/products/haar_027_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "14.03",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Multi-strand pearl and blue bead haar necklace set with gold peacock pendants and matching drop earrings. Price may vary - contact us for quote.",
    "sku": "HAR-027",
    "images": [
      {
        "id": "prod-213-img1",
        "image_url": "/products/haar_027_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-214",
    "name": "Geometric Triangle Hexagon CZ Necklace Set",
    "slug": "geometric-triangle-hexagon-cz-necklace-set-214",
    "primary_image": "/products/haar_028_01.jpg",
    "base_price": "120306.00",
    "discount_price": null,
    "price": "120306.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.905",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold necklace with geometric triangle and hexagon motifs heavily set with CZ stones and matching drop earrings.",
    "sku": "HAR-028",
    "images": [
      {
        "id": "prod-214-img1",
        "image_url": "/products/haar_028_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-214-img2",
        "image_url": "/products/haar_028_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0
  },
  {
    "id": "prod-215",
    "name": "Geometric Spike CZ Crescent Necklace Set",
    "slug": "geometric-spike-cz-crescent-necklace-set-215",
    "primary_image": "/products/haar_030_01.jpg",
    "base_price": "60426.00",
    "discount_price": null,
    "price": "60426.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.984",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold necklace with geometric stud motifs and CZ-encrusted crescent moon pendant with tassel drops, matching earrings.",
    "sku": "HAR-030",
    "images": [
      {
        "id": "prod-215-img1",
        "image_url": "/products/haar_030_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-215-img2",
        "image_url": "/products/haar_030_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0
  },
  {
    "id": "prod-216",
    "name": "18K Square-Link CZ Diamond Necklace Set",
    "slug": "18k-square-link-cz-diamond-necklace-set-216",
    "primary_image": "/products/haar_031_01.jpg",
    "base_price": "107812.00",
    "discount_price": null,
    "price": "107812.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "15.231",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "18K gold geometric square-link necklace with diamond-shaped CZ pendant and matching earrings.",
    "sku": "HAR-031",
    "images": [
      {
        "id": "prod-216-img1",
        "image_url": "/products/haar_031_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-216-img2",
        "image_url": "/products/haar_031_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0
  },
  {
    "id": "prod-217",
    "name": "Fan-Shape CZ Pendant Necklace Set",
    "slug": "fan-shape-cz-pendant-necklace-set-217",
    "primary_image": "/products/haar_032_01.jpg",
    "base_price": "119475.00",
    "discount_price": null,
    "price": "119475.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.809",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Elegant gold necklace with fan-shaped CZ pendant, repeating triangular stone motifs on chain and matching earrings.",
    "sku": "HAR-032",
    "images": [
      {
        "id": "prod-217-img1",
        "image_url": "/products/haar_032_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-217-img2",
        "image_url": "/products/haar_032_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-218",
    "name": "Butterfly Enamel Diamond Necklace Set",
    "slug": "butterfly-enamel-diamond-necklace-set-218",
    "primary_image": "/products/haar_033_01.jpg",
    "base_price": "85430.00",
    "discount_price": null,
    "price": "85430.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "9.874",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold butterfly pendant necklace with multicolor enamel butterfly centerpiece set with white stones and matching earrings.",
    "sku": "HAR-033",
    "images": [
      {
        "id": "prod-218-img1",
        "image_url": "/products/haar_033_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-218-img2",
        "image_url": "/products/haar_033_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-219",
    "name": "18K Geometric CZ Link Necklace",
    "slug": "18k-geometric-cz-link-necklace-219",
    "primary_image": "/products/haar_034_01.jpg",
    "base_price": "19600.00",
    "discount_price": null,
    "price": "19600.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.769",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "18K gold geometric link necklace with CZ-set rectangular pendant and matching drop earrings.",
    "sku": "SH525",
    "images": [
      {
        "id": "prod-219-img1",
        "image_url": "/products/haar_034_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-219-img2",
        "image_url": "/products/haar_034_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0
  },
  {
    "id": "prod-220",
    "name": "Spiral-Ball Diamond Necklace Set",
    "slug": "spiral-ball-diamond-necklace-set-220",
    "primary_image": "/products/haar_035_01.jpg",
    "base_price": "186606.00",
    "discount_price": null,
    "price": "186606.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "21.568",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold spiral-and-ball design necklace set with diamond accents and matching drop earrings.",
    "sku": "HAR-035",
    "images": [
      {
        "id": "prod-220-img1",
        "image_url": "/products/haar_035_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-220-img2",
        "image_url": "/products/haar_035_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-221",
    "name": "Oval Diamond Pendant Necklace Set",
    "slug": "oval-diamond-pendant-necklace-set-221",
    "primary_image": "/products/haar_036_01.jpg",
    "base_price": "76613.00",
    "discount_price": null,
    "price": "76613.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.855",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold oval link-chain necklace with a large oval diamond-style pendant and matching diamond drop earrings.",
    "sku": "HAR-036",
    "images": [
      {
        "id": "prod-221-img1",
        "image_url": "/products/haar_036_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-222",
    "name": "Filigree Floral Pearl Necklace Set",
    "slug": "filigree-floral-pearl-necklace-set-222",
    "primary_image": "/products/haar_039_01.jpg",
    "base_price": "109880.00",
    "discount_price": null,
    "price": "109880.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "12.7",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold filigree floral necklace with matching drop earrings, featuring a pearl accent on the pendant.",
    "sku": "HAR-039",
    "images": [
      {
        "id": "prod-222-img1",
        "image_url": "/products/haar_039_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-223",
    "name": "Circular-Link Green Stone Necklace Set",
    "slug": "circular-link-green-stone-necklace-set-223",
    "primary_image": "/products/haar_040_01.jpg",
    "base_price": "78733.00",
    "discount_price": null,
    "price": "78733.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "9.1",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold circular-link necklace with green color stone accents and a heart-drop pendant, with matching earrings.",
    "sku": "HAR-040",
    "images": [
      {
        "id": "prod-223-img1",
        "image_url": "/products/haar_040_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-224",
    "name": "18K Open-Triangle Diamond Necklace Set",
    "slug": "18k-open-triangle-diamond-necklace-set-224",
    "primary_image": "/products/haar_041_01.jpg",
    "base_price": "141818.00",
    "discount_price": null,
    "price": "141818.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "20.035",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "18K gold open-triangle-link necklace with diamond accents and matching diamond drop earrings.",
    "sku": "HAR-041",
    "images": [
      {
        "id": "prod-224-img1",
        "image_url": "/products/haar_041_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-225",
    "name": "18K Blue Sapphire Diamond Necklace Set",
    "slug": "18k-blue-sapphire-diamond-necklace-set-225",
    "primary_image": "/products/haar_042_01.jpg",
    "base_price": "125000.00",
    "discount_price": null,
    "price": "125000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "5.106",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "18K gold oval link-chain necklace with a large blue sapphire and diamond pendant, with matching blue sapphire and diamond earrings. Price may vary - contact us for quote.",
    "sku": "HAR-042",
    "images": [
      {
        "id": "prod-225-img1",
        "image_url": "/products/haar_042_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-226",
    "name": "18K Floral Diamond Solitaire Necklace Set",
    "slug": "18k-floral-diamond-solitaire-necklace-set-226",
    "primary_image": "/products/haar_043_01.jpg",
    "base_price": "150000.00",
    "discount_price": null,
    "price": "150000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "17.721",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "18K gold floral-link necklace with a large emerald-cut diamond solitaire pendant and matching rectangular diamond earrings.",
    "sku": "SH92527-04",
    "images": [
      {
        "id": "prod-226-img1",
        "image_url": "/products/haar_043_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-227",
    "name": "18K Red Green Enamel Choker Necklace Set",
    "slug": "18k-red-green-enamel-choker-necklace-set-227",
    "primary_image": "/products/haar_044_01.jpg",
    "base_price": "52664.00",
    "discount_price": null,
    "price": "52664.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "7.44",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "18K gold choker necklace with red and green color stones set in a floral paisley design, with matching flower-shaped earrings.",
    "sku": "FC4193-018",
    "images": [
      {
        "id": "prod-227-img1",
        "image_url": "/products/haar_044_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0
  },
  {
    "id": "prod-228",
    "name": "Fringe-Leaf Gold Choker Necklace Set",
    "slug": "fringe-leaf-gold-choker-necklace-set-228",
    "primary_image": "/products/haar_045_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold choker necklace with fringe-style leaf and ball drops, with matching long tassel earrings. Price may vary - contact us for quote.",
    "sku": "HAR-045",
    "images": [
      {
        "id": "prod-228-img1",
        "image_url": "/products/haar_045_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-229",
    "name": "18K Multicolor Enamel Floral Choker",
    "slug": "18k-multicolor-enamel-floral-choker-229",
    "primary_image": "/products/haar_046_01.jpg",
    "base_price": "39456.00",
    "discount_price": null,
    "price": "39456.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.574",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "18K gold wide choker necklace with multicolor enamel floral centerpiece and ruby/pearl drops, with matching round earrings.",
    "sku": "EC4417-018",
    "images": [
      {
        "id": "prod-229-img1",
        "image_url": "/products/haar_046_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0
  },
  {
    "id": "prod-230",
    "name": "Filigree Red-Black Enamel Choker Necklace",
    "slug": "filigree-red-black-enamel-choker-necklace-230",
    "primary_image": "/products/haar_047_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold filigree choker necklace with a large red-and-black enamel floral centerpiece and diamond-accent pendant drop. Price may vary - contact us for quote.",
    "sku": "HAR-047",
    "images": [
      {
        "id": "prod-230-img1",
        "image_url": "/products/haar_047_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-231",
    "name": "Red Green Meenakari Choker Necklace Set",
    "slug": "red-green-meenakari-choker-necklace-set-231",
    "primary_image": "/products/haar_048_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Broad gold choker with red and green meenakari panels, pearl and ruby bead drops, arch-shaped ornate segments. Price may vary - contact us for quote.",
    "sku": "HAR-048",
    "images": [
      {
        "id": "prod-231-img1",
        "image_url": "/products/haar_048_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-232",
    "name": "Aqua Mint Stone Haar Necklace Set",
    "slug": "aqua-mint-stone-haar-necklace-set-232",
    "primary_image": "/products/haar_049_01.jpg",
    "base_price": "178854.00",
    "discount_price": null,
    "price": "178854.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.672",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold necklace and matching earring set with aqua/mint green cabochon stones set throughout. CZ/AD stone setting.",
    "sku": "HAR-049",
    "images": [
      {
        "id": "prod-232-img1",
        "image_url": "/products/haar_049_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-233",
    "name": "Teal Cabochon Stone Haar Necklace Set",
    "slug": "teal-cabochon-stone-haar-necklace-set-233",
    "primary_image": "/products/haar_051_01.jpg",
    "base_price": "238302.00",
    "discount_price": null,
    "price": "238302.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "27.543",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold necklace and matching earring set featuring multiple aqua/teal round cabochon stones in CZ-halo settings on matte gold chain-link base.",
    "sku": "HAR-051",
    "images": [
      {
        "id": "prod-233-img1",
        "image_url": "/products/haar_051_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-234",
    "name": "Floral Sunburst Ruby Center Haar Set",
    "slug": "floral-sunburst-ruby-center-haar-set-234",
    "primary_image": "/products/haar_052_01.jpg",
    "base_price": "104283.00",
    "discount_price": null,
    "price": "104283.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "12.053",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold necklace and earring set. Necklace with geometric square open motifs and CZ-pave sections, central floral sunburst pendant with ruby center stone.",
    "sku": "HAR-052",
    "images": [
      {
        "id": "prod-234-img1",
        "image_url": "/products/haar_052_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-235",
    "name": "CZ Floral Gold Necklace Set",
    "slug": "cz-floral-gold-necklace-set-235",
    "primary_image": "/products/haar_053_01.jpg",
    "base_price": "120955.00",
    "discount_price": null,
    "price": "120955.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.98",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold necklace and earring set with floral motifs, pave white CZ clusters, and small colored stones.",
    "sku": "HAR-053",
    "images": [
      {
        "id": "prod-235-img1",
        "image_url": "/products/haar_053_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-236",
    "name": "Leaf Pendant Satellite Bead Necklace Set",
    "slug": "leaf-pendant-satellite-bead-necklace-set-236",
    "primary_image": "/products/haar_055_01.jpg",
    "base_price": "49048.00",
    "discount_price": null,
    "price": "49048.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.669",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "Gold chain necklace with satellite bead accents and textured leaf pendant with CZ stone, displayed with matching leaf stud earrings.",
    "sku": "HAR-055",
    "images": [
      {
        "id": "prod-236-img1",
        "image_url": "/products/haar_055_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-237",
    "name": "18K Flower CZ and Color Stone Pendant Set",
    "slug": "18k-flower-cz-and-color-stone-pendant-set-237",
    "primary_image": "/products/earrings_026_01.jpg",
    "base_price": "34865.00",
    "discount_price": null,
    "price": "34865.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "4.797",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "18K gold flower pendant set with CZ and color stones, matching necklace and earrings.",
    "sku": "SHS2576-02",
    "images": [
      {
        "id": "prod-237-img1",
        "image_url": "/products/earrings_026_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0
  },
  {
    "id": "prod-238",
    "name": "Chandbali Red Enamel Long Drop Earrings",
    "slug": "chandbali-red-enamel-long-drop-earrings-238",
    "primary_image": "/products/earrings_027_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali-style dangling earrings with red enamel accents and multi-tier jhumka drops.",
    "sku": "ERG-027",
    "images": [
      {
        "id": "prod-238-img1",
        "image_url": "/products/earrings_027_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-239",
    "name": "Geometric Filigree Long Drop Earrings",
    "slug": "geometric-filigree-long-drop-earrings-239",
    "primary_image": "/products/earrings_028_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long three-tier gold drop earrings with geometric trapezoid and heart-shaped panels, intricate filigree work and tassel ends.",
    "sku": "ERG-028",
    "images": [
      {
        "id": "prod-239-img1",
        "image_url": "/products/earrings_028_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-240",
    "name": "Crescent Chandbali with Gold Bead Tassels",
    "slug": "crescent-chandbali-with-gold-bead-tassels-240",
    "primary_image": "/products/earrings_029_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long gold chandbali drop earrings with crescent moon body, floral top stud, dangling chain and gold bead tassels.",
    "sku": "ERG-029",
    "images": [
      {
        "id": "prod-240-img1",
        "image_url": "/products/earrings_029_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-241",
    "name": "Kite-Top Floral Chandbali Earrings",
    "slug": "kite-top-floral-chandbali-earrings-241",
    "primary_image": "/products/earrings_030_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with floral-engraved crescent body, kite-shaped top stud, gold ball and tassel drops.",
    "sku": "ERG-030",
    "images": [
      {
        "id": "prod-241-img1",
        "image_url": "/products/earrings_030_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-242",
    "name": "Pentagon Mesh Gold Jhumka Earrings",
    "slug": "pentagon-mesh-gold-jhumka-earrings-242",
    "primary_image": "/products/earrings_031_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold jhumka earrings with pentagonal mesh-patterned body, round stud top with floral motif and chain-tassel drop.",
    "sku": "ERG-031",
    "images": [
      {
        "id": "prod-242-img1",
        "image_url": "/products/earrings_031_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-243",
    "name": "Dome Bell Jhumka with Floral Cluster Top",
    "slug": "dome-bell-jhumka-with-floral-cluster-top-243",
    "primary_image": "/products/earrings_032_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold jhumka earrings with large dome bell, ornate top piece featuring clustered floral motifs and gold bead chain tassels.",
    "sku": "ERG-032",
    "images": [
      {
        "id": "prod-243-img1",
        "image_url": "/products/earrings_032_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-244",
    "name": "Peacock Black Enamel Chandbali Earrings",
    "slug": "peacock-black-enamel-chandbali-earrings-244",
    "primary_image": "/products/earrings_033_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold peacock-motif chandbali earrings with black enamel peacock top stud, open crescent body with engraving and pointed gold drop tassels.",
    "sku": "ERG-033",
    "images": [
      {
        "id": "prod-244-img1",
        "image_url": "/products/earrings_033_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-245",
    "name": "Triple-Tier Peacock Jhumka with Meenakari",
    "slug": "triple-tier-peacock-jhumka-with-meenakari-245",
    "primary_image": "/products/earrings_034_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long triple-tier gold jhumka earrings with peacock top featuring green and maroon enamel, cascading three jhumka bells with gold bead drops.",
    "sku": "ERG-034",
    "images": [
      {
        "id": "prod-245-img1",
        "image_url": "/products/earrings_034_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-246",
    "name": "Crescent Floral Star Chandbali Earrings",
    "slug": "crescent-floral-star-chandbali-earrings-246",
    "primary_image": "/products/earrings_035_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with large crescent moon body, floral star-shaped top stud, hanging chain with flat charms and small jhumka tassel.",
    "sku": "ERG-035",
    "images": [
      {
        "id": "prod-246-img1",
        "image_url": "/products/earrings_035_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-247",
    "name": "Heart-Top Chandbali with Scalloped Body",
    "slug": "heart-top-chandbali-with-scalloped-body-247",
    "primary_image": "/products/earrings_036_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali drop earrings with heart-shaped top stud, scalloped crescent body with dot engraving and jhumka bell with chain tassels.",
    "sku": "ERG-036",
    "images": [
      {
        "id": "prod-247-img1",
        "image_url": "/products/earrings_036_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-248",
    "name": "Peacock Meenakari Bird Motif Chandbali",
    "slug": "peacock-meenakari-bird-motif-chandbali-248",
    "primary_image": "/products/earrings_037_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with peacock top in black and maroon enamel, circular crescent body with bird motif and small gold charm drops.",
    "sku": "ERG-037",
    "images": [
      {
        "id": "prod-248-img1",
        "image_url": "/products/earrings_037_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-249",
    "name": "Peacock Jhumka with Maroon Enamel",
    "slug": "peacock-jhumka-with-maroon-enamel-249",
    "primary_image": "/products/earrings_038_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold jhumka earrings with peacock top stud featuring maroon enamel, large dome jhumka bell with gold bead fringe and maroon stone drops.",
    "sku": "ERG-038",
    "images": [
      {
        "id": "prod-249-img1",
        "image_url": "/products/earrings_038_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-250",
    "name": "Peacock Filigree Lace Chandbali",
    "slug": "peacock-filigree-lace-chandbali-250",
    "primary_image": "/products/earrings_039_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with peacock-profile top stud, filigree lace-pattern crescent body, small jhumka and geometric charm pendants.",
    "sku": "ERG-039",
    "images": [
      {
        "id": "prod-250-img1",
        "image_url": "/products/earrings_039_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-251",
    "name": "Triple Jhumka Blue Peacock Meenakari",
    "slug": "triple-jhumka-blue-peacock-meenakari-251",
    "primary_image": "/products/earrings_040_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long cascading triple-tier gold jhumka earrings with peacock top featuring blue enamel, three stacked jhumka bells with gold ball tassels.",
    "sku": "ERG-040",
    "images": [
      {
        "id": "prod-251-img1",
        "image_url": "/products/earrings_040_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-252",
    "name": "Multicolor Meenakari Peacock Chandbali",
    "slug": "multicolor-meenakari-peacock-chandbali-252",
    "primary_image": "/products/earrings_041_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with multicolor meenakari peacock body in green, maroon and blue enamel, kite top stud and jhumka tassel drop.",
    "sku": "ERG-041",
    "images": [
      {
        "id": "prod-252-img1",
        "image_url": "/products/earrings_041_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-253",
    "name": "Turtle-Shield Jhumka with Maroon Enamel",
    "slug": "turtle-shield-jhumka-with-maroon-enamel-253",
    "primary_image": "/products/earrings_042_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold jhumka earrings with two-tier design, turtle-shield top stud with maroon enamel, dome jhumka bell with bead fringe and maroon stone drops.",
    "sku": "ERG-042",
    "images": [
      {
        "id": "prod-253-img1",
        "image_url": "/products/earrings_042_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-254",
    "name": "Teardrop Floral Multi-Tassel Drop Earrings",
    "slug": "teardrop-floral-multi-tassel-drop-earrings-254",
    "primary_image": "/products/earrings_043_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold drop earrings with teardrop top stud, beaded chain shoulder connecting to teardrop pendant with floral motif and multiple drop tassels.",
    "sku": "ERG-043",
    "images": [
      {
        "id": "prod-254-img1",
        "image_url": "/products/earrings_043_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-255",
    "name": "Scalloped Fan Chandbali Earrings",
    "slug": "scalloped-fan-chandbali-earrings-255",
    "primary_image": "/products/earrings_044_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with round floral top stud, broad scalloped fan-shaped crescent body and small jhumka with tassel drops.",
    "sku": "ERG-044",
    "images": [
      {
        "id": "prod-255-img1",
        "image_url": "/products/earrings_044_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-256",
    "name": "Three-Panel Peacock Cascading Earrings",
    "slug": "three-panel-peacock-cascading-earrings-256",
    "primary_image": "/products/earrings_045_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long three-panel gold drop earrings with peacock top, two chandbali disc panels and tassel drop in cascading design.",
    "sku": "ERG-045",
    "images": [
      {
        "id": "prod-256-img1",
        "image_url": "/products/earrings_045_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-257",
    "name": "Square-Cluster Dome Jhumka Earrings",
    "slug": "square-cluster-dome-jhumka-earrings-257",
    "primary_image": "/products/earrings_046_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold jhumka earrings with decorative square-cluster top stud, dome bell body and chain tassel drop.",
    "sku": "ERG-046",
    "images": [
      {
        "id": "prod-257-img1",
        "image_url": "/products/earrings_046_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-258",
    "name": "Broad Fan Chandbali with Bead Fringe",
    "slug": "broad-fan-chandbali-with-bead-fringe-258",
    "primary_image": "/products/earrings_047_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with broad fan-shaped crescent body, round top stud and ball bead fringe with pointed drop tassels.",
    "sku": "ERG-047",
    "images": [
      {
        "id": "prod-258-img1",
        "image_url": "/products/earrings_047_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-259",
    "name": "Paisley Peacock Meenakari Jhumka Earrings",
    "slug": "paisley-peacock-meenakari-jhumka-earrings-259",
    "primary_image": "/products/earrings_048_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long gold earrings with large paisley-top stud, peacock meenakari body in green and maroon enamel, multiple jhumka and bead chain drops.",
    "sku": "ERG-048",
    "images": [
      {
        "id": "prod-259-img1",
        "image_url": "/products/earrings_048_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-260",
    "name": "Open Circular Peacock Jhumka Earrings",
    "slug": "open-circular-peacock-jhumka-earrings-260",
    "primary_image": "/products/earrings_049_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long gold earrings with peacock meenakari top, open circular frame with peacock motif in green enamel, butterfly connector and jhumka drops with maroon stones.",
    "sku": "ERG-049",
    "images": [
      {
        "id": "prod-260-img1",
        "image_url": "/products/earrings_049_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-261",
    "name": "Scroll Chandbali with Spike Tassels",
    "slug": "scroll-chandbali-with-spike-tassels-261",
    "primary_image": "/products/earrings_050_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with scroll-design top stud, bold crescent body with striped engraving and pointed spike drop tassels.",
    "sku": "ERG-050",
    "images": [
      {
        "id": "prod-261-img1",
        "image_url": "/products/earrings_050_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-262",
    "name": "Lotus Fan Chandbali Earrings",
    "slug": "lotus-fan-chandbali-earrings-262",
    "primary_image": "/products/earrings_051_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali earrings with round top stud, open fan-shaped crescent body with lotus petal motif and bead fringe with pointed drop tassels.",
    "sku": "ERG-051",
    "images": [
      {
        "id": "prod-262-img1",
        "image_url": "/products/earrings_051_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-263",
    "name": "Meenakari Jhumka Choker Set Earrings",
    "slug": "meenakari-jhumka-choker-set-earrings-263",
    "primary_image": "/products/earrings_052_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold jhumka earrings with red and green meenakari work, part of the meenakari choker necklace set.",
    "sku": "ERG-052",
    "images": [
      {
        "id": "prod-263-img1",
        "image_url": "/products/earrings_052_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-264",
    "name": "Crescent Black Meenakari Chandbali Earrings",
    "slug": "crescent-black-meenakari-chandbali-earrings-264",
    "primary_image": "/products/earrings_053_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali-style drop earrings with crescent moon body, floral motifs, dangling chains and gold balls, black meenakari accents on stud top.",
    "sku": "ERG-053",
    "images": [
      {
        "id": "prod-264-img1",
        "image_url": "/products/earrings_053_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-265",
    "name": "Long Filigree Shield Drop Earrings with Red Stone",
    "slug": "long-filigree-shield-drop-earrings-with-red-stone-265",
    "primary_image": "/products/earrings_054_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long gold drop earrings with filigree shield-shaped top, triple jhumka cascade with small red color stone accents and dangling chains.",
    "sku": "ERG-054",
    "images": [
      {
        "id": "prod-265-img1",
        "image_url": "/products/earrings_054_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-266",
    "name": "Triple Jhumka Black Peacock Earrings",
    "slug": "triple-jhumka-black-peacock-earrings-266",
    "primary_image": "/products/earrings_055_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold triple-jhumka long drop earrings with black meenakari peacock motif on stud, three stacked dome jhumkas graduating in size.",
    "sku": "ERG-055",
    "images": [
      {
        "id": "prod-266-img1",
        "image_url": "/products/earrings_055_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-267",
    "name": "Chandbali Crescent with Red Stone Filigree",
    "slug": "chandbali-crescent-with-red-stone-filigree-267",
    "primary_image": "/products/earrings_056_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold chandbali drop earrings with crescent moon body, intricate filigree work, small red color stones inset, dangling chain tassel.",
    "sku": "ERG-056",
    "images": [
      {
        "id": "prod-267-img1",
        "image_url": "/products/earrings_056_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-268",
    "name": "Peacock Heart Blue Enamel Drop Earrings",
    "slug": "peacock-heart-blue-enamel-drop-earrings-268",
    "primary_image": "/products/earrings_057_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Long gold earrings with peacock motif featuring green and blue enamel, heart-shaped body, butterfly charm, bottom jhumka with red stone drop.",
    "sku": "ERG-057",
    "images": [
      {
        "id": "prod-268-img1",
        "image_url": "/products/earrings_057_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-269",
    "name": "Triple-Jhumka Circular Top Red Stone Earrings",
    "slug": "triple-jhumka-circular-top-red-stone-earrings-269",
    "primary_image": "/products/earrings_058_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold triple-jhumka cascade earrings with circular floral top stud, three stacked dome jhumkas with gold bead detailing, small red color stone drops at base.",
    "sku": "ERG-058",
    "images": [
      {
        "id": "prod-269-img1",
        "image_url": "/products/earrings_058_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-270",
    "name": "Large Filigree Three-Tier Chandbali Earrings",
    "slug": "large-filigree-three-tier-chandbali-earrings-270",
    "primary_image": "/products/earrings_067_01.jpg",
    "base_price": "61031.00",
    "discount_price": null,
    "price": "61031.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.87",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Large chandelier filigree earrings with black enamel disc top, three-tier cascading filigree layers in two-tone yellow and white gold finish, multiple drop dangles.",
    "sku": "ERG-067",
    "images": [
      {
        "id": "prod-270-img1",
        "image_url": "/products/earrings_067_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-271",
    "name": "CZ Crescent Tassel Pendant Set",
    "slug": "cz-crescent-tassel-pendant-set-271",
    "primary_image": "/products/earrings_078_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.984",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Gold pendant set with CZ-encrusted crescent moon, tassel chain drop, and matching earrings. Net weight approx 6.984 g.",
    "sku": "PDS-078",
    "images": [
      {
        "id": "prod-271-img1",
        "image_url": "/products/earrings_078_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-272",
    "name": "Butterfly Lattice Stud Long Drop Earrings",
    "slug": "butterfly-lattice-stud-long-drop-earrings-272",
    "primary_image": "/products/earrings_080_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "Gold stud earrings with butterfly/floral lattice casting top and long box-chain drop ending in small gold ball.",
    "sku": "ERG-080",
    "images": [
      {
        "id": "prod-272-img1",
        "image_url": "/products/earrings_080_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-273",
    "name": "18K Fan-Top Color Stone Chain Drop Earrings",
    "slug": "18k-fan-top-color-stone-chain-drop-earrings-273",
    "primary_image": "/products/earrings_081_01.jpg",
    "base_price": "14900.00",
    "discount_price": null,
    "price": "14900.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "2.05",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "18K gold drop earrings with fan-shaped open-cut top, single center stone, and triple-chain tassel drops.",
    "sku": "MPD127-0",
    "images": [
      {
        "id": "prod-273-img1",
        "image_url": "/products/earrings_081_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0
  },
  {
    "id": "prod-274",
    "name": "Leaf CZ Pendant Set",
    "slug": "leaf-cz-pendant-set-274",
    "primary_image": "/products/earrings_082_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.669",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Gold pendant set with leaf-shaped CZ pendant, chain and matching stud earrings.",
    "sku": "PDS-082",
    "images": [
      {
        "id": "prod-274-img1",
        "image_url": "/products/earrings_082_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-275",
    "name": "Triangle Hexagon CZ Pendant Set",
    "slug": "triangle-hexagon-cz-pendant-set-275",
    "primary_image": "/products/earrings_084_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.905",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Gold pendant set with triangular CZ pendant drop, chain, and matching hexagon stud earrings.",
    "sku": "PDS-084",
    "images": [
      {
        "id": "prod-275-img1",
        "image_url": "/products/earrings_084_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-276",
    "name": "Fan Chandelier CZ Pendant Set",
    "slug": "fan-chandelier-cz-pendant-set-276",
    "primary_image": "/products/earrings_085_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.809",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "pendant-sets",
    "category_name": "Pendant Sets",
    "description": "Gold pendant set with fan/chandelier style CZ pendant, chain, and matching earrings.",
    "sku": "PDS-085",
    "images": [
      {
        "id": "prod-276-img1",
        "image_url": "/products/earrings_085_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "pendant-set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-277",
    "name": "18K Gents Diamond Solitaire Ring (HUID: G5PUWA)",
    "slug": "18k-gents-diamond-solitaire-ring-huid-g5puwa-277",
    "primary_image": "/products/rings_007_01.jpg",
    "base_price": "100000.00",
    "discount_price": null,
    "price": "100000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.814",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "18K gold gents ring with bold solitaire brilliant-cut diamond center in bezel setting, flanked by channel-set diamond rows on white gold band. Size 13.",
    "sku": "FNCPGR71073A",
    "images": [
      {
        "id": "prod-277-img1",
        "image_url": "/products/rings_007_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-277-img2",
        "image_url": "/products/rings_007_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "men",
    "type": "rings",
    "carats": 0
  },
  {
    "id": "prod-280",
    "name": "18K Gents Diamond Square Pave Ring",
    "slug": "18k-gents-diamond-square-pave-ring-280",
    "primary_image": "/products/rings_017_01.jpg",
    "base_price": "125000.00",
    "discount_price": null,
    "price": "125000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "7.84",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gents gold ring with wide square face, black enamel triangular inlay accents and central princess-cut diamond or large white CZ stone in square pave halo.",
    "sku": "GBN2007-25",
    "images": [
      {
        "id": "prod-280-img1",
        "image_url": "/products/rings_017_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "rings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-281",
    "name": "18K Gents CZ Cushion Rectangular Ring",
    "slug": "18k-gents-cz-cushion-rectangular-ring-281",
    "primary_image": "/products/rings_018_01.jpg",
    "base_price": "60498.00",
    "discount_price": null,
    "price": "60498.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "8.252",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gents 18K gold ring with cushion-cut large white CZ solitaire in pave-bordered rectangular setting, CZ-set shoulders. Size 11.",
    "sku": "MO8RN022",
    "images": [
      {
        "id": "prod-281-img1",
        "image_url": "/products/rings_018_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "rings",
    "carats": 0
  },
  {
    "id": "prod-283",
    "name": "18K Gents Oval C-Shape CZ Ring",
    "slug": "18k-gents-oval-c-shape-cz-ring-283",
    "primary_image": "/products/rings_020_01.jpg",
    "base_price": "48211.00",
    "discount_price": null,
    "price": "48211.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "6.576",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gents 18K gold ring with oval C-shaped open face with large cushion-cut white CZ centre, pave CZ border and shoulders. Size 14.",
    "sku": "SRN1909",
    "images": [
      {
        "id": "prod-283-img1",
        "image_url": "/products/rings_020_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "rings",
    "carats": 0
  },
  {
    "id": "prod-286",
    "name": "18K Gents Red Stone Black Enamel Corner Ring",
    "slug": "18k-gents-red-stone-black-enamel-corner-ring-286",
    "primary_image": "/products/rings_023_01.jpg",
    "base_price": "58035.00",
    "discount_price": null,
    "price": "58035.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "7.916",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gents 18K gold ring with wide square face with large red square-cut CZ centre, black enamel L-shaped inlays, pave CZ border. Size 13.",
    "sku": "SRN1691",
    "images": [
      {
        "id": "prod-286-img1",
        "image_url": "/products/rings_023_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "rings",
    "carats": 0
  },
  {
    "id": "prod-289",
    "name": "18K Gents 3D Lion Face Ring",
    "slug": "18k-gents-3d-lion-face-ring-289",
    "primary_image": "/products/rings_026_01.jpg",
    "base_price": "45065.00",
    "discount_price": null,
    "price": "45065.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "6.147",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gents 18K gold lion-face ring with square face and 3D lion head centre, pave CZ rows on both shoulders flanking the lion. Size 22.",
    "sku": "SRN2013",
    "images": [
      {
        "id": "prod-289-img1",
        "image_url": "/products/rings_026_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "rings",
    "carats": 0
  },
  {
    "id": "prod-291",
    "name": "18K Gents Starburst Sun Ray Plain Ring",
    "slug": "18k-gents-starburst-sun-ray-plain-ring-291",
    "primary_image": "/products/rings_028_01.jpg",
    "base_price": "30718.00",
    "discount_price": null,
    "price": "30718.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "4.19",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gents plain 18K gold ring with wide band and starburst/sun ray engraved face, two-tone centre accent. Size 21.",
    "sku": "PRN1210",
    "images": [
      {
        "id": "prod-291-img1",
        "image_url": "/products/rings_028_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "rings",
    "carats": 0
  },
  {
    "id": "prod-293",
    "name": "18K CZ Necklace & Earrings Set",
    "slug": "18k-cz-necklace-earrings-set-293",
    "primary_image": "/products/rings_030_01.jpg",
    "base_price": "28138.00",
    "discount_price": null,
    "price": "28138.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "3.838",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "18K gold necklace and earrings set with emerald-cut CZ stones in a scalloped link design.",
    "sku": "SRN1041",
    "images": [
      {
        "id": "prod-293-img1",
        "image_url": "/products/rings_030_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-293-img2",
        "image_url": "/products/rings_030_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0
  },
  {
    "id": "prod-294",
    "name": "18K CZ Necklace & Earrings Set",
    "slug": "18k-cz-necklace-earrings-set-294",
    "primary_image": "/products/rings_031_01.jpg",
    "base_price": "35373.00",
    "discount_price": null,
    "price": "35373.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "4.825",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "18K gold necklace and earrings set with emerald-cut CZ stones in a scalloped link design.",
    "sku": "SRN1900",
    "images": [
      {
        "id": "prod-294-img1",
        "image_url": "/products/rings_031_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-294-img2",
        "image_url": "/products/rings_031_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0
  },
  {
    "id": "prod-295",
    "name": "18K CZ Necklace & Earrings Set",
    "slug": "18k-cz-necklace-earrings-set-295",
    "primary_image": "/products/rings_032_01.jpg",
    "base_price": "37676.00",
    "discount_price": null,
    "price": "37676.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "5.139",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "18K gold necklace and earrings set with emerald-cut CZ stones in a scalloped link design.",
    "sku": "SRN1869",
    "images": [
      {
        "id": "prod-295-img1",
        "image_url": "/products/rings_032_01.jpg",
        "display_order": 0,
        "is_primary": true
      },
      {
        "id": "prod-295-img2",
        "image_url": "/products/rings_032_02.jpg",
        "display_order": 1,
        "is_primary": false
      }
    ],
    "gender": "men",
    "type": "rings",
    "carats": 0
  },
  {
    "id": "prod-297",
    "name": "18K CZ Red Stone Floral Mangalsutra",
    "slug": "18k-cz-red-stone-floral-mangalsutra-297",
    "primary_image": "/products/mangalsutra_014_01.jpg",
    "base_price": "68193.00",
    "discount_price": null,
    "price": "68193.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "9.809",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "18K gold double-strand black bead mangalsutra with CZ and red color stone floral pendant.",
    "sku": "MGS-014",
    "images": [
      {
        "id": "prod-297-img1",
        "image_url": "/products/mangalsutra_014_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0
  },
  {
    "id": "prod-298",
    "name": "Diamond Oval Panel Filigree Bangle",
    "slug": "diamond-oval-panel-filigree-bangle-298",
    "primary_image": "/products/bangles_007_01.jpg",
    "base_price": "125000.00",
    "discount_price": null,
    "price": "125000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gold bangle with large oval filigree center panel set with rows of brilliant-cut white stones in prong setting, flanked by circular diamond cluster accents. Price on request.",
    "sku": "BNG-007",
    "images": [
      {
        "id": "prod-298-img1",
        "image_url": "/products/bangles_007_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-299",
    "name": "Crescent Moon Blue Stone Diamond Bangle",
    "slug": "crescent-moon-blue-stone-diamond-bangle-299",
    "primary_image": "/products/bangles_008_01.jpg",
    "base_price": "125000.00",
    "discount_price": null,
    "price": "125000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gold bangle with crescent moon side element and central floral design set with brilliant-cut white stones and large oval blue stone (turquoise/blue topaz) center. Price on request.",
    "sku": "BNG-008",
    "images": [
      {
        "id": "prod-299-img1",
        "image_url": "/products/bangles_008_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-300",
    "name": "Scrollwork Emerald Ruby Diamond Bangle",
    "slug": "scrollwork-emerald-ruby-diamond-bangle-300",
    "primary_image": "/products/bangles_009_01.jpg",
    "base_price": "125000.00",
    "discount_price": null,
    "price": "125000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gold bangle with scrollwork design set with brilliant-cut white stones across shank, large green emerald and ruby red stones in center cluster. Price on request.",
    "sku": "BNG-009",
    "images": [
      {
        "id": "prod-300-img1",
        "image_url": "/products/bangles_009_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-301",
    "name": "Crescent Green Stone Diamond Spray Bangle",
    "slug": "crescent-green-stone-diamond-spray-bangle-301",
    "primary_image": "/products/bangles_010_01.jpg",
    "base_price": "125000.00",
    "discount_price": null,
    "price": "125000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gold bangle with crescent moon accent and floral diamond spray design, large oval green emerald center stone in prong setting surrounded by pear and round brilliant-cut white stones. Price on request.",
    "sku": "BNG-010",
    "images": [
      {
        "id": "prod-301-img1",
        "image_url": "/products/bangles_010_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-302",
    "name": "Spray Floral Ball and Diamond Bangle",
    "slug": "spray-floral-ball-and-diamond-bangle-302",
    "primary_image": "/products/bangles_011_01.jpg",
    "base_price": "125000.00",
    "discount_price": null,
    "price": "125000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gold bangle with spray floral motif featuring matte gold ball clusters alternating with brilliant-cut white stone clusters on radiating wires. Price on request.",
    "sku": "BNG-011",
    "images": [
      {
        "id": "prod-302-img1",
        "image_url": "/products/bangles_011_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-303",
    "name": "Peacock Enamel Pave Diamond Bangle",
    "slug": "peacock-enamel-pave-diamond-bangle-303",
    "primary_image": "/products/bangles_012_01.jpg",
    "base_price": "125000.00",
    "discount_price": null,
    "price": "125000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "3.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "Gold bangle with large peacock motif center fully pave-set with brilliant-cut white stones, multicolor enamel peacock neck in blue, green, red. Price on request.",
    "sku": "BNG-012",
    "images": [
      {
        "id": "prod-303-img1",
        "image_url": "/products/bangles_012_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-304",
    "name": "18K Baguette Diamond Arch Bangle",
    "slug": "18k-baguette-diamond-arch-bangle-304",
    "primary_image": "/products/bangles_013_01.jpg",
    "base_price": "200000.00",
    "discount_price": null,
    "price": "200000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "7.808",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "18K gold bangle with central panel of baguette and round brilliant-cut white stones in bow/arch motif, flanked by pave-set white stone border rows on shank.",
    "sku": "CSB610-10",
    "images": [
      {
        "id": "prod-304-img1",
        "image_url": "/products/bangles_013_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-305",
    "name": "18K Fan Diamond Marquise Bangle",
    "slug": "18k-fan-diamond-marquise-bangle-305",
    "primary_image": "/products/bangles_014_01.jpg",
    "base_price": "200000.00",
    "discount_price": null,
    "price": "200000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "9.559",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "18K gold bangle with large fan/peacock-tail center panel set with marquise solitaire and surrounding round brilliant-cut white stones radiating outward, pave border on shank.",
    "sku": "CSDB586-05",
    "images": [
      {
        "id": "prod-305-img1",
        "image_url": "/products/bangles_014_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-306",
    "name": "18K Ruby Teal Diamond Arch Bangle",
    "slug": "18k-ruby-teal-diamond-arch-bangle-306",
    "primary_image": "/products/bangles_015_01.jpg",
    "base_price": "200000.00",
    "discount_price": null,
    "price": "200000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "7.96",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "18K gold bangle with central arch panel of baguette white stones flanked by pear-cut ruby (pink-red) and teal/green color stones, pave white stone border rows on shank.",
    "sku": "CSRB610-10",
    "images": [
      {
        "id": "prod-306-img1",
        "image_url": "/products/bangles_015_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-307",
    "name": "18K Diamond Lotus Floral Heart Kada",
    "slug": "18k-diamond-lotus-floral-heart-kada-307",
    "primary_image": "/products/bangles_016_01.jpg",
    "base_price": "200000.00",
    "discount_price": null,
    "price": "200000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "10.4",
    "is_featured": true,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "18K gold rigid kada/cuff bracelet with floral heart CZ motif centerpiece and CZ-lined sides on a ladder-pattern shank.",
    "sku": "CSB600-08",
    "images": [
      {
        "id": "prod-307-img1",
        "image_url": "/products/bangles_016_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-308",
    "name": "18K Diamond Lotus Double Motif Pink Bangle",
    "slug": "18k-diamond-lotus-double-motif-pink-bangle-308",
    "primary_image": "/products/bangles_017_01.jpg",
    "base_price": "200000.00",
    "discount_price": null,
    "price": "200000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "8.48",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "18K gold rigid bangle bracelet with double lotus motif in CZ halos with ruby/pink accent stones at center.",
    "sku": "CSBB516-03",
    "images": [
      {
        "id": "prod-308-img1",
        "image_url": "/products/bangles_017_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0
  },
  {
    "id": "prod-310",
    "name": "18K Ruby Teardrop Ladies Bracelet",
    "slug": "18k-ruby-teardrop-ladies-bracelet-310",
    "primary_image": "/products/bracelet_001_01.jpg",
    "base_price": "31081.00",
    "discount_price": null,
    "price": "31081.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "4.352",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "18K gold teardrop-link bracelet with ruby/pink color stones set in three central teardrop motifs.",
    "sku": "IMCSBR113-R",
    "images": [
      {
        "id": "prod-310-img1",
        "image_url": "/products/bracelet_001_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0
  },
  {
    "id": "prod-311",
    "name": "18K Diamond Teardrop Ladies Bracelet",
    "slug": "18k-diamond-teardrop-ladies-bracelet-311",
    "primary_image": "/products/bracelet_002_01.jpg",
    "base_price": "200000.00",
    "discount_price": null,
    "price": "200000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "4.202",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "18K gold teardrop-link bracelet with diamond-set three central teardrop motifs.",
    "sku": "IMCSBR113-D",
    "images": [
      {
        "id": "prod-311-img1",
        "image_url": "/products/bracelet_002_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0
  },
  {
    "id": "prod-312",
    "name": "Circular Motif Gold Ladies Bracelet",
    "slug": "circular-motif-gold-ladies-bracelet-312",
    "primary_image": "/products/bracelet_004_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.03",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Gold ladies bracelet with circular-motif links. Elegant everyday design. Price on request.",
    "sku": "BRC-004",
    "images": [
      {
        "id": "prod-312-img1",
        "image_url": "/products/bracelet_004_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-313",
    "name": "Diamond-Link Ladies Gold Bracelet",
    "slug": "diamond-link-ladies-gold-bracelet-313",
    "primary_image": "/products/bracelet_005_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.03",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Gold ladies bracelet with diamond-shaped link pattern. Classic and elegant. Price on request.",
    "sku": "BRC-005",
    "images": [
      {
        "id": "prod-313-img1",
        "image_url": "/products/bracelet_005_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-314",
    "name": "Two-Tone Chevron Pattern Ladies Bracelet",
    "slug": "two-tone-chevron-pattern-ladies-bracelet-314",
    "primary_image": "/products/bracelet_006_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.03",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Two-tone gold ladies bracelet with chevron pattern design. Price on request.",
    "sku": "BRC-006",
    "images": [
      {
        "id": "prod-314-img1",
        "image_url": "/products/bracelet_006_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-315",
    "name": "18K Silk Thread Gold Clasp Bracelet",
    "slug": "18k-silk-thread-gold-clasp-bracelet-315",
    "primary_image": "/products/bracelet_007_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "6.722",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Gents bracelet with blue silk/thread cord body and 18K gold rectangular clasp plate featuring a running panther/jaguar motif with black enamel detailing.",
    "sku": "SBR313-8",
    "images": [
      {
        "id": "prod-315-img1",
        "image_url": "/products/bracelet_007_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-316",
    "name": "Gents Plain Heavy Curb Chain Bracelet",
    "slug": "gents-plain-heavy-curb-chain-bracelet-316",
    "primary_image": "/products/bracelet_008_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Heavy plain gold curb chain bracelet for gents. Bold statement piece. Price on request.",
    "sku": "BRC-008",
    "images": [
      {
        "id": "prod-316-img1",
        "image_url": "/products/bracelet_008_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-317",
    "name": "Gents Two-Tone Curb Chain Bracelet",
    "slug": "gents-two-tone-curb-chain-bracelet-317",
    "primary_image": "/products/bracelet_009_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Two-tone gold curb chain bracelet for gents. Stylish and masculine. Price on request.",
    "sku": "BRC-009",
    "images": [
      {
        "id": "prod-317-img1",
        "image_url": "/products/bracelet_009_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-318",
    "name": "Gents Plain Gold Curb Bracelet",
    "slug": "gents-plain-gold-curb-bracelet-318",
    "primary_image": "/products/bracelet_010_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Plain gold curb chain bracelet for gents. Classic everyday wear. Price on request.",
    "sku": "BRC-010",
    "images": [
      {
        "id": "prod-318-img1",
        "image_url": "/products/bracelet_010_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-319",
    "name": "Gents Flat Rectangular Mesh Bracelet",
    "slug": "gents-flat-rectangular-mesh-bracelet-319",
    "primary_image": "/products/bracelet_011_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Gents gold flat rectangular mesh bracelet. Modern minimalist design. Price on request.",
    "sku": "BRC-011",
    "images": [
      {
        "id": "prod-319-img1",
        "image_url": "/products/bracelet_011_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-320",
    "name": "Gents Hexagonal Honeycomb Mesh Bracelet",
    "slug": "gents-hexagonal-honeycomb-mesh-bracelet-320",
    "primary_image": "/products/bracelet_012_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Gents gold bracelet with honeycomb hexagonal mesh design and white gold accents. Price on request.",
    "sku": "BRC-012",
    "images": [
      {
        "id": "prod-320-img1",
        "image_url": "/products/bracelet_012_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-321",
    "name": "Gents Box-Link Lion Face Medallion Bracelet",
    "slug": "gents-box-link-lion-face-medallion-bracelet-321",
    "primary_image": "/products/bracelet_013_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Gents gold box-link bracelet with antique gold lion-face centre medallion. Distinctive statement piece. Price on request.",
    "sku": "BRC-013",
    "images": [
      {
        "id": "prod-321-img1",
        "image_url": "/products/bracelet_013_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-322",
    "name": "Gents Teardrop Ganpati Amber Stone Bracelet",
    "slug": "gents-teardrop-ganpati-amber-stone-bracelet-322",
    "primary_image": "/products/bracelet_014_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Gents gold teardrop link bracelet with Ganpati motif and topaz-colored stones. Devotional and stylish. Price on request.",
    "sku": "BRC-014",
    "images": [
      {
        "id": "prod-322-img1",
        "image_url": "/products/bracelet_014_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-323",
    "name": "Gents Rose-Gold Curb Pave CZ Clasp Bracelet",
    "slug": "gents-rose-gold-curb-pave-cz-clasp-bracelet-323",
    "primary_image": "/products/bracelet_015_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Rose-gold/two-tone Cuban curb chain bracelet with pave CZ box clasp. Price on request.",
    "sku": "BRC-015",
    "images": [
      {
        "id": "prod-323-img1",
        "image_url": "/products/bracelet_015_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-324",
    "name": "Gents Yellow Gold Double Box Chain Bracelet",
    "slug": "gents-yellow-gold-double-box-chain-bracelet-324",
    "primary_image": "/products/bracelet_016_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Gents yellow gold double-row box chain bracelet. Classic and durable. Price on request.",
    "sku": "BRC-016",
    "images": [
      {
        "id": "prod-324-img1",
        "image_url": "/products/bracelet_016_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-325",
    "name": "Gents Two-Tone Cuban Curb Chain Bracelet",
    "slug": "gents-two-tone-cuban-curb-chain-bracelet-325",
    "primary_image": "/products/bracelet_017_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Two-tone Cuban curb chain bracelet for gents. Bold and stylish. Price on request.",
    "sku": "BRC-017",
    "images": [
      {
        "id": "prod-325-img1",
        "image_url": "/products/bracelet_017_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-326",
    "name": "Gents Textured Rectangular Flat-Link Bracelet",
    "slug": "gents-textured-rectangular-flat-link-bracelet-326",
    "primary_image": "/products/bracelet_018_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Textured rectangular flat-link gold bracelet for gents. Price on request.",
    "sku": "BRC-018",
    "images": [
      {
        "id": "prod-326-img1",
        "image_url": "/products/bracelet_018_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-327",
    "name": "Gents Lion Face Medallion Double-Wheat Bracelet",
    "slug": "gents-lion-face-medallion-double-wheat-bracelet-327",
    "primary_image": "/products/bracelet_019_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "33.63",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Single gents gold bracelet with double wheat/foxtail chain design and a central square lion-face medallion in antique gold finish, lobster clasp.",
    "sku": "BRC-019",
    "images": [
      {
        "id": "prod-327-img1",
        "image_url": "/products/bracelet_019_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-328",
    "name": "Gents Wide Hexagonal Honeycomb White-Gold Bracelet",
    "slug": "gents-wide-hexagonal-honeycomb-white-gold-bracelet-328",
    "primary_image": "/products/bracelet_020_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Wide hexagonal honeycomb mesh gents bracelet with white gold accents. Price on request.",
    "sku": "BRC-020",
    "images": [
      {
        "id": "prod-328-img1",
        "image_url": "/products/bracelet_020_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-329",
    "name": "Gents Open Cuban Two-Tone Curb Bracelet",
    "slug": "gents-open-cuban-two-tone-curb-bracelet-329",
    "primary_image": "/products/bracelet_021_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Open Cuban curb chain gents bracelet in two-tone gold. Price on request.",
    "sku": "BRC-021",
    "images": [
      {
        "id": "prod-329-img1",
        "image_url": "/products/bracelet_021_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-330",
    "name": "Gents V-Zigzag Pattern Two-Tone Bracelet",
    "slug": "gents-v-zigzag-pattern-two-tone-bracelet-330",
    "primary_image": "/products/bracelet_022_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Wide V-zigzag pattern gold bracelet for gents in two-tone finish. Price on request.",
    "sku": "BRC-022",
    "images": [
      {
        "id": "prod-330-img1",
        "image_url": "/products/bracelet_022_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-331",
    "name": "Gents Rose-Gold Cuban Chain Pave Bracelet",
    "slug": "gents-rose-gold-cuban-chain-pave-bracelet-331",
    "primary_image": "/products/bracelet_023_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.15",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Rose-gold/two-tone Cuban curb chain bracelet with pave CZ box clasp. Price on request.",
    "sku": "BRC-023",
    "images": [
      {
        "id": "prod-331-img1",
        "image_url": "/products/bracelet_023_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-332",
    "name": "Gents Yellow Gold Double-Row Box Chain Bracelet",
    "slug": "gents-yellow-gold-double-row-box-chain-bracelet-332",
    "primary_image": "/products/bracelet_024_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.15",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Yellow gold double-row box chain bracelet for gents. Price on request.",
    "sku": "BRC-024",
    "images": [
      {
        "id": "prod-332-img1",
        "image_url": "/products/bracelet_024_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-333",
    "name": "Gents Two-Tone Cuban Chain Bracelet",
    "slug": "gents-two-tone-cuban-chain-bracelet-333",
    "primary_image": "/products/bracelet_025_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.15",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Two-tone Cuban chain bracelet for gents. Price on request.",
    "sku": "BRC-025",
    "images": [
      {
        "id": "prod-333-img1",
        "image_url": "/products/bracelet_025_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-334",
    "name": "Gents Textured Diamond-Link Bracelet",
    "slug": "gents-textured-diamond-link-bracelet-334",
    "primary_image": "/products/bracelet_026_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.15",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Textured rectangular diamond-link flat gold bracelet for gents. Price on request.",
    "sku": "BRC-026",
    "images": [
      {
        "id": "prod-334-img1",
        "image_url": "/products/bracelet_026_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-335",
    "name": "18K Mangalsutra Multi-Color Charm Bracelet",
    "slug": "18k-mangalsutra-multi-color-charm-bracelet-335",
    "primary_image": "/products/bracelet_027_01.jpg",
    "base_price": "26439.00",
    "discount_price": null,
    "price": "26439.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "3.702",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "18K gold mangalsutra-style bracelet with black beads and multiple colored stone charms (ruby, emerald tones) and gold bells/drops.",
    "sku": "MDMBS122-05",
    "images": [
      {
        "id": "prod-335-img1",
        "image_url": "/products/bracelet_027_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0
  },
  {
    "id": "prod-336",
    "name": "18K Mangalsutra Pink Heart Enamel Bracelet",
    "slug": "18k-mangalsutra-pink-heart-enamel-bracelet-336",
    "primary_image": "/products/bracelet_028_01.jpg",
    "base_price": "13341.00",
    "discount_price": null,
    "price": "13341.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "1.868",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "18K gold mangalsutra-style bracelet with black beads and pink heart enamel charm centerpiece.",
    "sku": "MDMBF106",
    "images": [
      {
        "id": "prod-336-img1",
        "image_url": "/products/bracelet_028_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0
  },
  {
    "id": "prod-337",
    "name": "18K Mangalsutra Diamond Cluster Bracelet",
    "slug": "18k-mangalsutra-diamond-cluster-bracelet-337",
    "primary_image": "/products/bracelet_029_01.jpg",
    "base_price": "100000.00",
    "discount_price": null,
    "price": "100000.00",
    "material": "diamond",
    "purity": "18K",
    "weight_grams": "2.504",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "18K gold mangalsutra-style bracelet with black beads and square diamond/white stone cluster centerpiece.",
    "sku": "MDMBS122-03",
    "images": [
      {
        "id": "prod-337-img1",
        "image_url": "/products/bracelet_029_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bracelets",
    "carats": 0
  },
  {
    "id": "prod-338",
    "name": "Heavy Two-Tone Diamond-Link Gents Bracelet",
    "slug": "heavy-two-tone-diamond-link-gents-bracelet-338",
    "primary_image": "/products/bracelet_030_01.jpg",
    "base_price": "335203.00",
    "discount_price": null,
    "price": "335203.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "38.4",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bracelets",
    "category_name": "Bracelets",
    "description": "Heavy two-tone gold bracelet with alternating yellow and white gold diamond-shaped links in a wide flat panel with clasp. Weight approximately 38.4g.",
    "sku": "BRC-030",
    "images": [
      {
        "id": "prod-338-img1",
        "image_url": "/products/bracelet_030_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "men",
    "type": "bracelets",
    "carats": 0
  },
  {
    "id": "prod-339",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-339",
    "primary_image": "/products/haar_056_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-056",
    "images": [
      {
        "id": "prod-339-img1",
        "image_url": "/products/haar_056_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-340",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-340",
    "primary_image": "/products/haar_057_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "14.31",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-057",
    "images": [
      {
        "id": "prod-340-img1",
        "image_url": "/products/haar_057_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-341",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-341",
    "primary_image": "/products/haar_058_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "14.98",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-058",
    "images": [
      {
        "id": "prod-341-img1",
        "image_url": "/products/haar_058_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-342",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-342",
    "primary_image": "/products/haar_059_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "11.89",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-059",
    "images": [
      {
        "id": "prod-342-img1",
        "image_url": "/products/haar_059_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-343",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-343",
    "primary_image": "/products/haar_060_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-060",
    "images": [
      {
        "id": "prod-343-img1",
        "image_url": "/products/haar_060_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-344",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-344",
    "primary_image": "/products/haar_061_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-061",
    "images": [
      {
        "id": "prod-344-img1",
        "image_url": "/products/haar_061_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-345",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-345",
    "primary_image": "/products/haar_062_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.98",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-062",
    "images": [
      {
        "id": "prod-345-img1",
        "image_url": "/products/haar_062_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-346",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-346",
    "primary_image": "/products/haar_063_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.9",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-063",
    "images": [
      {
        "id": "prod-346-img1",
        "image_url": "/products/haar_063_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-347",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-347",
    "primary_image": "/products/haar_064_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "24.68",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-064",
    "images": [
      {
        "id": "prod-347-img1",
        "image_url": "/products/haar_064_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-348",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-348",
    "primary_image": "/products/haar_065_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "15.39",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-065",
    "images": [
      {
        "id": "prod-348-img1",
        "image_url": "/products/haar_065_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-349",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-349",
    "primary_image": "/products/haar_066_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.21",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-066",
    "images": [
      {
        "id": "prod-349-img1",
        "image_url": "/products/haar_066_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-350",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-350",
    "primary_image": "/products/haar_067_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.18",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-067",
    "images": [
      {
        "id": "prod-350-img1",
        "image_url": "/products/haar_067_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-351",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-351",
    "primary_image": "/products/haar_068_01.jpg",
    "base_price": "125973.00",
    "discount_price": null,
    "price": "125973.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "14.56",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery, approx 14.56 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-068",
    "images": [
      {
        "id": "prod-351-img1",
        "image_url": "/products/haar_068_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0
  },
  {
    "id": "prod-352",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-352",
    "primary_image": "/products/haar_069_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.88",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-069",
    "images": [
      {
        "id": "prod-352-img1",
        "image_url": "/products/haar_069_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-353",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-353",
    "primary_image": "/products/haar_070_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "10.99",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-070",
    "images": [
      {
        "id": "prod-353-img1",
        "image_url": "/products/haar_070_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-354",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-354",
    "primary_image": "/products/haar_071_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.17",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-071",
    "images": [
      {
        "id": "prod-354-img1",
        "image_url": "/products/haar_071_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-355",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-355",
    "primary_image": "/products/haar_072_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "12.67",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-072",
    "images": [
      {
        "id": "prod-355-img1",
        "image_url": "/products/haar_072_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-356",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-356",
    "primary_image": "/products/haar_073_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-073",
    "images": [
      {
        "id": "prod-356-img1",
        "image_url": "/products/haar_073_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-357",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-357",
    "primary_image": "/products/haar_074_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "24.17",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-074",
    "images": [
      {
        "id": "prod-357-img1",
        "image_url": "/products/haar_074_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-358",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-358",
    "primary_image": "/products/haar_075_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-075",
    "images": [
      {
        "id": "prod-358-img1",
        "image_url": "/products/haar_075_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-359",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-359",
    "primary_image": "/products/haar_076_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.08",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-076",
    "images": [
      {
        "id": "prod-359-img1",
        "image_url": "/products/haar_076_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-360",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-360",
    "primary_image": "/products/haar_077_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.79",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-077",
    "images": [
      {
        "id": "prod-360-img1",
        "image_url": "/products/haar_077_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_nt"
  },
  {
    "id": "prod-361",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-361",
    "primary_image": "/products/haar_078_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "15.27",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-078",
    "images": [
      {
        "id": "prod-361-img1",
        "image_url": "/products/haar_078_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-362",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-362",
    "primary_image": "/products/haar_079_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-079",
    "images": [
      {
        "id": "prod-362-img1",
        "image_url": "/products/haar_079_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-363",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-363",
    "primary_image": "/products/haar_080_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "21.25",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-080",
    "images": [
      {
        "id": "prod-363-img1",
        "image_url": "/products/haar_080_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-364",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-364",
    "primary_image": "/products/haar_081_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-081",
    "images": [
      {
        "id": "prod-364-img1",
        "image_url": "/products/haar_081_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-365",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-365",
    "primary_image": "/products/haar_082_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "48.56",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-082",
    "images": [
      {
        "id": "prod-365-img1",
        "image_url": "/products/haar_082_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-366",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-366",
    "primary_image": "/products/haar_083_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-083",
    "images": [
      {
        "id": "prod-366-img1",
        "image_url": "/products/haar_083_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-367",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-367",
    "primary_image": "/products/haar_084_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "48.47",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-084",
    "images": [
      {
        "id": "prod-367-img1",
        "image_url": "/products/haar_084_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-368",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-368",
    "primary_image": "/products/haar_085_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "15.03",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-085",
    "images": [
      {
        "id": "prod-368-img1",
        "image_url": "/products/haar_085_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-369",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-369",
    "primary_image": "/products/haar_086_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "15.05",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-086",
    "images": [
      {
        "id": "prod-369-img1",
        "image_url": "/products/haar_086_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-370",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-370",
    "primary_image": "/products/haar_087_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "33.73",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-087",
    "images": [
      {
        "id": "prod-370-img1",
        "image_url": "/products/haar_087_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-371",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-371",
    "primary_image": "/products/haar_088_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-088",
    "images": [
      {
        "id": "prod-371-img1",
        "image_url": "/products/haar_088_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-372",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-372",
    "primary_image": "/products/haar_089_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-089",
    "images": [
      {
        "id": "prod-372-img1",
        "image_url": "/products/haar_089_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-373",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-373",
    "primary_image": "/products/haar_090_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-090",
    "images": [
      {
        "id": "prod-373-img1",
        "image_url": "/products/haar_090_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-374",
    "name": "Square Mesh Gold Ring",
    "slug": "square-mesh-gold-ring-374",
    "primary_image": "/products/haar_091_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.66",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "rings",
    "category_name": "Rings",
    "description": "22K gold square mesh ring with beaded border. Net weight approx 7.66 g.",
    "sku": "RNG-091",
    "images": [
      {
        "id": "prod-374-img1",
        "image_url": "/products/haar_091_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "ring",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-375",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-375",
    "primary_image": "/products/haar_092_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "14.56",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-092",
    "images": [
      {
        "id": "prod-375-img1",
        "image_url": "/products/haar_092_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-376",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-376",
    "primary_image": "/products/haar_093_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "24.51",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-093",
    "images": [
      {
        "id": "prod-376-img1",
        "image_url": "/products/haar_093_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-377",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-377",
    "primary_image": "/products/haar_094_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "24.12",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-094",
    "images": [
      {
        "id": "prod-377-img1",
        "image_url": "/products/haar_094_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-378",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-378",
    "primary_image": "/products/haar_095_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.82",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-095",
    "images": [
      {
        "id": "prod-378-img1",
        "image_url": "/products/haar_095_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-379",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-379",
    "primary_image": "/products/haar_096_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.68",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-096",
    "images": [
      {
        "id": "prod-379-img1",
        "image_url": "/products/haar_096_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-380",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-380",
    "primary_image": "/products/haar_097_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "22.4",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-097",
    "images": [
      {
        "id": "prod-380-img1",
        "image_url": "/products/haar_097_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-381",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-381",
    "primary_image": "/products/haar_098_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "18.94",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-098",
    "images": [
      {
        "id": "prod-381-img1",
        "image_url": "/products/haar_098_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-382",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-382",
    "primary_image": "/products/haar_099_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "24.76",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-099",
    "images": [
      {
        "id": "prod-382-img1",
        "image_url": "/products/haar_099_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-383",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-383",
    "primary_image": "/products/haar_100_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.41",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-100",
    "images": [
      {
        "id": "prod-383-img1",
        "image_url": "/products/haar_100_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-384",
    "name": "Traditional Gold Necklace",
    "slug": "traditional-gold-necklace-384",
    "primary_image": "/products/haar_101_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "21",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-101",
    "images": [
      {
        "id": "prod-384-img1",
        "image_url": "/products/haar_101_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-385",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-385",
    "primary_image": "/products/mangalsutra_017_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.68",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-017",
    "images": [
      {
        "id": "prod-385-img1",
        "image_url": "/products/mangalsutra_017_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-386",
    "name": "Gold Choker Necklace",
    "slug": "gold-choker-necklace-386",
    "primary_image": "/products/mangalsutra_018_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "22.71",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold choker necklace with floral filigree and drop tassels. Net weight approx 22.71 g.",
    "sku": "NCK-018",
    "images": [
      {
        "id": "prod-386-img1",
        "image_url": "/products/mangalsutra_018_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-387",
    "name": "Gold Floral Choker Necklace",
    "slug": "gold-floral-choker-necklace-387",
    "primary_image": "/products/mangalsutra_019_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.79",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold choker necklace with floral centerpiece and leaf drops. Net weight approx 19.79 g.",
    "sku": "NCK-019",
    "images": [
      {
        "id": "prod-387-img1",
        "image_url": "/products/mangalsutra_019_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-388",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-388",
    "primary_image": "/products/mangalsutra_020_01.jpg",
    "base_price": "48266.00",
    "discount_price": null,
    "price": "48266.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "3.11",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery, approx 3.11 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-020",
    "images": [
      {
        "id": "prod-388-img1",
        "image_url": "/products/mangalsutra_020_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-389",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-389",
    "primary_image": "/products/mangalsutra_021_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.42",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-021",
    "images": [
      {
        "id": "prod-389-img1",
        "image_url": "/products/mangalsutra_021_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-390",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-390",
    "primary_image": "/products/mangalsutra_022_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.51",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-022",
    "images": [
      {
        "id": "prod-390-img1",
        "image_url": "/products/mangalsutra_022_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-391",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-391",
    "primary_image": "/products/mangalsutra_023_01.jpg",
    "base_price": "45547.00",
    "discount_price": null,
    "price": "45547.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.83",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery, approx 5.83 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-023",
    "images": [
      {
        "id": "prod-391-img1",
        "image_url": "/products/mangalsutra_023_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-392",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-392",
    "primary_image": "/products/mangalsutra_024_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.36",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-024",
    "images": [
      {
        "id": "prod-392-img1",
        "image_url": "/products/mangalsutra_024_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-393",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-393",
    "primary_image": "/products/mangalsutra_025_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.74",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-025",
    "images": [
      {
        "id": "prod-393-img1",
        "image_url": "/products/mangalsutra_025_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-394",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-394",
    "primary_image": "/products/mangalsutra_026_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.54",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-026",
    "images": [
      {
        "id": "prod-394-img1",
        "image_url": "/products/mangalsutra_026_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-395",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-395",
    "primary_image": "/products/mangalsutra_027_01.jpg",
    "base_price": "60247.00",
    "discount_price": null,
    "price": "60247.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "3.21",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery, approx 3.21 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-027",
    "images": [
      {
        "id": "prod-395-img1",
        "image_url": "/products/mangalsutra_027_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-396",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-396",
    "primary_image": "/products/mangalsutra_028_01.jpg",
    "base_price": "38409.00",
    "discount_price": null,
    "price": "38409.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "3.12",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery, approx 3.12 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-028",
    "images": [
      {
        "id": "prod-396-img1",
        "image_url": "/products/mangalsutra_028_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-397",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-397",
    "primary_image": "/products/mangalsutra_029_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.21",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-029",
    "images": [
      {
        "id": "prod-397-img1",
        "image_url": "/products/mangalsutra_029_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-398",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-398",
    "primary_image": "/products/mangalsutra_030_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.5",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-030",
    "images": [
      {
        "id": "prod-398-img1",
        "image_url": "/products/mangalsutra_030_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-399",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-399",
    "primary_image": "/products/mangalsutra_031_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.09",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-031",
    "images": [
      {
        "id": "prod-399-img1",
        "image_url": "/products/mangalsutra_031_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-400",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-400",
    "primary_image": "/products/mangalsutra_032_01.jpg",
    "base_price": "52345.00",
    "discount_price": null,
    "price": "52345.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery, approx 5.24 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-032",
    "images": [
      {
        "id": "prod-400-img1",
        "image_url": "/products/mangalsutra_032_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-401",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-401",
    "primary_image": "/products/mangalsutra_033_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.54",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-033",
    "images": [
      {
        "id": "prod-401-img1",
        "image_url": "/products/mangalsutra_033_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-402",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-402",
    "primary_image": "/products/mangalsutra_034_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "2.99",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-034",
    "images": [
      {
        "id": "prod-402-img1",
        "image_url": "/products/mangalsutra_034_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-403",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-403",
    "primary_image": "/products/mangalsutra_035_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.52",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-035",
    "images": [
      {
        "id": "prod-403-img1",
        "image_url": "/products/mangalsutra_035_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-404",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-404",
    "primary_image": "/products/mangalsutra_036_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "3.93",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-036",
    "images": [
      {
        "id": "prod-404-img1",
        "image_url": "/products/mangalsutra_036_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-405",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-405",
    "primary_image": "/products/mangalsutra_037_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.27",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-037",
    "images": [
      {
        "id": "prod-405-img1",
        "image_url": "/products/mangalsutra_037_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-406",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-406",
    "primary_image": "/products/mangalsutra_038_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "3.75",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-038",
    "images": [
      {
        "id": "prod-406-img1",
        "image_url": "/products/mangalsutra_038_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-407",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-407",
    "primary_image": "/products/mangalsutra_039_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.34",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-039",
    "images": [
      {
        "id": "prod-407-img1",
        "image_url": "/products/mangalsutra_039_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-408",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-408",
    "primary_image": "/products/mangalsutra_040_01.jpg",
    "base_price": "57443.00",
    "discount_price": null,
    "price": "57443.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.69",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery, approx 5.69 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-040",
    "images": [
      {
        "id": "prod-408-img1",
        "image_url": "/products/mangalsutra_040_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-409",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-409",
    "primary_image": "/products/mangalsutra_041_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-041",
    "images": [
      {
        "id": "prod-409-img1",
        "image_url": "/products/mangalsutra_041_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-410",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-410",
    "primary_image": "/products/mangalsutra_042_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-042",
    "images": [
      {
        "id": "prod-410-img1",
        "image_url": "/products/mangalsutra_042_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-411",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-411",
    "primary_image": "/products/mangalsutra_043_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.03",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-043",
    "images": [
      {
        "id": "prod-411-img1",
        "image_url": "/products/mangalsutra_043_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-412",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-412",
    "primary_image": "/products/mangalsutra_044_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.64",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-044",
    "images": [
      {
        "id": "prod-412-img1",
        "image_url": "/products/mangalsutra_044_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-413",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-413",
    "primary_image": "/products/mangalsutra_045_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "18.731",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-045",
    "images": [
      {
        "id": "prod-413-img1",
        "image_url": "/products/mangalsutra_045_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-414",
    "name": "Gold Round Pendant Necklace",
    "slug": "gold-round-pendant-necklace-414",
    "primary_image": "/products/mangalsutra_046_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "15.76",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold necklace with round filigree pendant. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "NCK-046",
    "images": [
      {
        "id": "prod-414-img1",
        "image_url": "/products/mangalsutra_046_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-415",
    "name": "Gold Necklace with Maang Tikka",
    "slug": "gold-necklace-with-maang-tikka-415",
    "primary_image": "/products/mangalsutra_047_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "15.76",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold necklace set with matching maang tikka. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "NCK-047",
    "images": [
      {
        "id": "prod-415-img1",
        "image_url": "/products/mangalsutra_047_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklace",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-416",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-416",
    "primary_image": "/products/mangalsutra_048_01.jpg",
    "base_price": "58463.00",
    "discount_price": null,
    "price": "58463.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.88",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery, approx 6.88 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-048",
    "images": [
      {
        "id": "prod-416-img1",
        "image_url": "/products/mangalsutra_048_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0
  },
  {
    "id": "prod-417",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-417",
    "primary_image": "/products/mangalsutra_049_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "21.72",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-049",
    "images": [
      {
        "id": "prod-417-img1",
        "image_url": "/products/mangalsutra_049_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-418",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-418",
    "primary_image": "/products/mangalsutra_050_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "22.8",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-050",
    "images": [
      {
        "id": "prod-418-img1",
        "image_url": "/products/mangalsutra_050_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-419",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-419",
    "primary_image": "/products/mangalsutra_051_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "25.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-051",
    "images": [
      {
        "id": "prod-419-img1",
        "image_url": "/products/mangalsutra_051_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-420",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-420",
    "primary_image": "/products/mangalsutra_052_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "27.905",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-052",
    "images": [
      {
        "id": "prod-420-img1",
        "image_url": "/products/mangalsutra_052_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-421",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-421",
    "primary_image": "/products/mangalsutra_053_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.653",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-053",
    "images": [
      {
        "id": "prod-421-img1",
        "image_url": "/products/mangalsutra_053_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-422",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-422",
    "primary_image": "/products/mangalsutra_054_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.71",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-054",
    "images": [
      {
        "id": "prod-422-img1",
        "image_url": "/products/mangalsutra_054_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-423",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-423",
    "primary_image": "/products/mangalsutra_055_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.27",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-055",
    "images": [
      {
        "id": "prod-423-img1",
        "image_url": "/products/mangalsutra_055_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-424",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-424",
    "primary_image": "/products/mangalsutra_056_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.32",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-056",
    "images": [
      {
        "id": "prod-424-img1",
        "image_url": "/products/mangalsutra_056_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-425",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-425",
    "primary_image": "/products/mangalsutra_057_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.86",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-057",
    "images": [
      {
        "id": "prod-425-img1",
        "image_url": "/products/mangalsutra_057_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-426",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-426",
    "primary_image": "/products/mangalsutra_058_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.18",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-058",
    "images": [
      {
        "id": "prod-426-img1",
        "image_url": "/products/mangalsutra_058_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-427",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-427",
    "primary_image": "/products/mangalsutra_059_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.76",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-059",
    "images": [
      {
        "id": "prod-427-img1",
        "image_url": "/products/mangalsutra_059_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-428",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-428",
    "primary_image": "/products/mangalsutra_060_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.65",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-060",
    "images": [
      {
        "id": "prod-428-img1",
        "image_url": "/products/mangalsutra_060_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-429",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-429",
    "primary_image": "/products/mangalsutra_061_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.89",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-061",
    "images": [
      {
        "id": "prod-429-img1",
        "image_url": "/products/mangalsutra_061_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-430",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-430",
    "primary_image": "/products/mangalsutra_062_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.4",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-062",
    "images": [
      {
        "id": "prod-430-img1",
        "image_url": "/products/mangalsutra_062_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-431",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-431",
    "primary_image": "/products/mangalsutra_063_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.36",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-063",
    "images": [
      {
        "id": "prod-431-img1",
        "image_url": "/products/mangalsutra_063_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-432",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-432",
    "primary_image": "/products/mangalsutra_064_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.59",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-064",
    "images": [
      {
        "id": "prod-432-img1",
        "image_url": "/products/mangalsutra_064_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-433",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-433",
    "primary_image": "/products/mangalsutra_065_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "3.8",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-065",
    "images": [
      {
        "id": "prod-433-img1",
        "image_url": "/products/mangalsutra_065_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-434",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-434",
    "primary_image": "/products/mangalsutra_066_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.76",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-066",
    "images": [
      {
        "id": "prod-434-img1",
        "image_url": "/products/mangalsutra_066_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-435",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-435",
    "primary_image": "/products/mangalsutra_067_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.52",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-067",
    "images": [
      {
        "id": "prod-435-img1",
        "image_url": "/products/mangalsutra_067_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-436",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-436",
    "primary_image": "/products/mangalsutra_068_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.31",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-068",
    "images": [
      {
        "id": "prod-436-img1",
        "image_url": "/products/mangalsutra_068_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-437",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-437",
    "primary_image": "/products/mangalsutra_069_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.68",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-069",
    "images": [
      {
        "id": "prod-437-img1",
        "image_url": "/products/mangalsutra_069_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-438",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-438",
    "primary_image": "/products/mangalsutra_070_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.53",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-070",
    "images": [
      {
        "id": "prod-438-img1",
        "image_url": "/products/mangalsutra_070_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-439",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-439",
    "primary_image": "/products/mangalsutra_071_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.88",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-071",
    "images": [
      {
        "id": "prod-439-img1",
        "image_url": "/products/mangalsutra_071_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-440",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-440",
    "primary_image": "/products/mangalsutra_072_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.44",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-072",
    "images": [
      {
        "id": "prod-440-img1",
        "image_url": "/products/mangalsutra_072_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-441",
    "name": "Gold Mangalsutra",
    "slug": "gold-mangalsutra-441",
    "primary_image": "/products/mangalsutra_073_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.44",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "mangalsutra",
    "category_name": "Mangalsutra",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "MGS-073",
    "images": [
      {
        "id": "prod-441-img1",
        "image_url": "/products/mangalsutra_073_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "mangalsutra",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-442",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-442",
    "primary_image": "/products/chain_018_01.jpg",
    "base_price": "45942.00",
    "discount_price": null,
    "price": "45942.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.31",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery, approx 5.31 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-018",
    "images": [
      {
        "id": "prod-442-img1",
        "image_url": "/products/chain_018_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-443",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-443",
    "primary_image": "/products/chain_019_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.66",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-019",
    "images": [
      {
        "id": "prod-443-img1",
        "image_url": "/products/chain_019_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-444",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-444",
    "primary_image": "/products/chain_020_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.97",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-020",
    "images": [
      {
        "id": "prod-444-img1",
        "image_url": "/products/chain_020_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-445",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-445",
    "primary_image": "/products/chain_021_01.jpg",
    "base_price": "99671.00",
    "discount_price": null,
    "price": "99671.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "11.52",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery, approx 11.52 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-021",
    "images": [
      {
        "id": "prod-445-img1",
        "image_url": "/products/chain_021_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-446",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-446",
    "primary_image": "/products/chain_022_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.29",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-022",
    "images": [
      {
        "id": "prod-446-img1",
        "image_url": "/products/chain_022_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-447",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-447",
    "primary_image": "/products/chain_023_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "10.12",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-023",
    "images": [
      {
        "id": "prod-447-img1",
        "image_url": "/products/chain_023_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-448",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-448",
    "primary_image": "/products/chain_024_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.56",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-024",
    "images": [
      {
        "id": "prod-448-img1",
        "image_url": "/products/chain_024_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-449",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-449",
    "primary_image": "/products/chain_025_01.jpg",
    "base_price": "70946.00",
    "discount_price": null,
    "price": "70946.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "9.2",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery, approx 9.2 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-025",
    "images": [
      {
        "id": "prod-449-img1",
        "image_url": "/products/chain_025_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-450",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-450",
    "primary_image": "/products/chain_026_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "9.08",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-026",
    "images": [
      {
        "id": "prod-450-img1",
        "image_url": "/products/chain_026_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-451",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-451",
    "primary_image": "/products/chain_027_01.jpg",
    "base_price": "59266.00",
    "discount_price": null,
    "price": "59266.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "10.51",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery, approx 10.51 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-027",
    "images": [
      {
        "id": "prod-451-img1",
        "image_url": "/products/chain_027_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-452",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-452",
    "primary_image": "/products/chain_028_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.49",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-028",
    "images": [
      {
        "id": "prod-452-img1",
        "image_url": "/products/chain_028_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-453",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-453",
    "primary_image": "/products/chain_029_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.77",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-029",
    "images": [
      {
        "id": "prod-453-img1",
        "image_url": "/products/chain_029_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-454",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-454",
    "primary_image": "/products/chain_030_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.83",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-030",
    "images": [
      {
        "id": "prod-454-img1",
        "image_url": "/products/chain_030_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-455",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-455",
    "primary_image": "/products/chain_031_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.44",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-031",
    "images": [
      {
        "id": "prod-455-img1",
        "image_url": "/products/chain_031_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-456",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-456",
    "primary_image": "/products/chain_032_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.2",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-032",
    "images": [
      {
        "id": "prod-456-img1",
        "image_url": "/products/chain_032_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-457",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-457",
    "primary_image": "/products/chain_033_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.69",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-033",
    "images": [
      {
        "id": "prod-457-img1",
        "image_url": "/products/chain_033_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-458",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-458",
    "primary_image": "/products/chain_034_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.31",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-034",
    "images": [
      {
        "id": "prod-458-img1",
        "image_url": "/products/chain_034_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-459",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-459",
    "primary_image": "/products/chain_035_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.85",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-035",
    "images": [
      {
        "id": "prod-459-img1",
        "image_url": "/products/chain_035_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-460",
    "name": "Gold Chain with Pendant",
    "slug": "gold-chain-with-pendant-460",
    "primary_image": "/products/chain_036_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.88",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "chains",
    "category_name": "Chains",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "CHN-036",
    "images": [
      {
        "id": "prod-460-img1",
        "image_url": "/products/chain_036_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "chain",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-461",
    "name": "Gold Bangles (Pair)",
    "slug": "gold-bangles-pair-461",
    "primary_image": "/products/chain_037_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "18K",
    "weight_grams": "18.44",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "Pair of 18K gold bangles with beaded and floral engraved design. Net weight approx 18.44 g.",
    "sku": "BNG-037",
    "images": [
      {
        "id": "prod-461-img1",
        "image_url": "/products/chain_037_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangle",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-462",
    "name": "Gold Bangles",
    "slug": "gold-bangles-462",
    "primary_image": "/products/bangles_019_01.jpg",
    "base_price": "159923.00",
    "discount_price": null,
    "price": "159923.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "18.82",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery, approx 18.82 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-019",
    "images": [
      {
        "id": "prod-462-img1",
        "image_url": "/products/bangles_019_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-463",
    "name": "Gold Bangles",
    "slug": "gold-bangles-463",
    "primary_image": "/products/bangles_020_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.68",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-020",
    "images": [
      {
        "id": "prod-463-img1",
        "image_url": "/products/bangles_020_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-464",
    "name": "Gold Bangles",
    "slug": "gold-bangles-464",
    "primary_image": "/products/bangles_021_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.25",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-021",
    "images": [
      {
        "id": "prod-464-img1",
        "image_url": "/products/bangles_021_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-465",
    "name": "Gold Bangles",
    "slug": "gold-bangles-465",
    "primary_image": "/products/bangles_022_01.jpg",
    "base_price": "172839.00",
    "discount_price": null,
    "price": "172839.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.78",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery, approx 19.78 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-022",
    "images": [
      {
        "id": "prod-465-img1",
        "image_url": "/products/bangles_022_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-466",
    "name": "Gold Bangles",
    "slug": "gold-bangles-466",
    "primary_image": "/products/bangles_023_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.34",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-023",
    "images": [
      {
        "id": "prod-466-img1",
        "image_url": "/products/bangles_023_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-467",
    "name": "Gold Bangles",
    "slug": "gold-bangles-467",
    "primary_image": "/products/bangles_024_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.72",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-024",
    "images": [
      {
        "id": "prod-467-img1",
        "image_url": "/products/bangles_024_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-468",
    "name": "Gold Bangles",
    "slug": "gold-bangles-468",
    "primary_image": "/products/bangles_025_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.07",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-025",
    "images": [
      {
        "id": "prod-468-img1",
        "image_url": "/products/bangles_025_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-469",
    "name": "Gold Bangles",
    "slug": "gold-bangles-469",
    "primary_image": "/products/bangles_026_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.34",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-026",
    "images": [
      {
        "id": "prod-469-img1",
        "image_url": "/products/bangles_026_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-470",
    "name": "Gold Bangles",
    "slug": "gold-bangles-470",
    "primary_image": "/products/bangles_027_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.33",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-027",
    "images": [
      {
        "id": "prod-470-img1",
        "image_url": "/products/bangles_027_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-471",
    "name": "Gold Bangles",
    "slug": "gold-bangles-471",
    "primary_image": "/products/bangles_028_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.91",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "bangles",
    "category_name": "Bangles",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-028",
    "images": [
      {
        "id": "prod-471-img1",
        "image_url": "/products/bangles_028_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "bangles",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-472",
    "name": "Gold Jewellery Set",
    "slug": "gold-bangles-472",
    "primary_image": "/products/bangles_029_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "22.89",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "jewellery-sets",
    "category_name": "Jewellery Sets",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "BNG-029",
    "images": [
      {
        "id": "prod-472-img1",
        "image_url": "/products/bangles_029_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "set",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_gr"
  },
  {
    "id": "prod-473",
    "name": "Heavy Gold Haar",
    "slug": "heavy-gold-haar-473",
    "primary_image": "/products/haar_102_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20.04",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-102",
    "images": [
      {
        "id": "prod-473-img1",
        "image_url": "/products/haar_102_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_gr"
  },
  {
    "id": "prod-474",
    "name": "Heavy Gold Haar",
    "slug": "heavy-gold-haar-474",
    "primary_image": "/products/haar_103_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "17.16",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-103",
    "images": [
      {
        "id": "prod-474-img1",
        "image_url": "/products/haar_103_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": true
  },
  {
    "id": "prod-475",
    "name": "Heavy Gold Haar",
    "slug": "heavy-gold-haar-475",
    "primary_image": "/products/haar_104_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "20",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-104",
    "images": [
      {
        "id": "prod-475-img1",
        "image_url": "/products/haar_104_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_gr"
  },
  {
    "id": "prod-476",
    "name": "Heavy Gold Haar",
    "slug": "heavy-gold-haar-476",
    "primary_image": "/products/haar_105_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.89",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-105",
    "images": [
      {
        "id": "prod-476-img1",
        "image_url": "/products/haar_105_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_gr"
  },
  {
    "id": "prod-477",
    "name": "Heavy Gold Haar",
    "slug": "heavy-gold-haar-477",
    "primary_image": "/products/haar_106_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "19.79",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-106",
    "images": [
      {
        "id": "prod-477-img1",
        "image_url": "/products/haar_106_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_gr"
  },
  {
    "id": "prod-478",
    "name": "Peacock Chandbali Earrings",
    "slug": "peacock-chandbali-earrings-478",
    "primary_image": "/products/haar_107_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "11.17",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold peacock chandbali earrings with enamel work and jhumka drops. Net weight approx 11.17 g.",
    "sku": "ERG-107",
    "images": [
      {
        "id": "prod-478-img1",
        "image_url": "/products/haar_107_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-479",
    "name": "Peacock Enamel Jhumka Earrings",
    "slug": "peacock-enamel-jhumka-earrings-479",
    "primary_image": "/products/haar_108_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.29",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold peacock enamel jhumka earrings. Net weight approx 13.29 g.",
    "sku": "ERG-108",
    "images": [
      {
        "id": "prod-479-img1",
        "image_url": "/products/haar_108_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earring",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-480",
    "name": "Gold Earrings",
    "slug": "gold-earrings-480",
    "primary_image": "/products/earrings_086_01.jpg",
    "base_price": "98698.00",
    "discount_price": null,
    "price": "98698.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "11.11",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery, approx 11.11 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-086",
    "images": [
      {
        "id": "prod-480-img1",
        "image_url": "/products/earrings_086_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-481",
    "name": "Gold Earrings",
    "slug": "gold-earrings-481",
    "primary_image": "/products/earrings_087_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.64",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-087",
    "images": [
      {
        "id": "prod-481-img1",
        "image_url": "/products/earrings_087_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-482",
    "name": "Gold Earrings",
    "slug": "gold-earrings-482",
    "primary_image": "/products/earrings_088_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "9.2",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-088",
    "images": [
      {
        "id": "prod-482-img1",
        "image_url": "/products/earrings_088_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-483",
    "name": "Gold Earrings",
    "slug": "gold-earrings-483",
    "primary_image": "/products/earrings_089_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-089",
    "images": [
      {
        "id": "prod-483-img1",
        "image_url": "/products/earrings_089_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-484",
    "name": "Gold Earrings",
    "slug": "gold-earrings-484",
    "primary_image": "/products/earrings_090_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.84",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-090",
    "images": [
      {
        "id": "prod-484-img1",
        "image_url": "/products/earrings_090_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-485",
    "name": "Gold Earrings",
    "slug": "gold-earrings-485",
    "primary_image": "/products/earrings_091_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.52",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-091",
    "images": [
      {
        "id": "prod-485-img1",
        "image_url": "/products/earrings_091_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-486",
    "name": "Gold Earrings",
    "slug": "gold-earrings-486",
    "primary_image": "/products/earrings_092_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.4",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-092",
    "images": [
      {
        "id": "prod-486-img1",
        "image_url": "/products/earrings_092_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-487",
    "name": "Gold Earrings",
    "slug": "gold-earrings-487",
    "primary_image": "/products/earrings_093_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-093",
    "images": [
      {
        "id": "prod-487-img1",
        "image_url": "/products/earrings_093_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-488",
    "name": "Gold Earrings",
    "slug": "gold-earrings-488",
    "primary_image": "/products/earrings_094_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.56",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-094",
    "images": [
      {
        "id": "prod-488-img1",
        "image_url": "/products/earrings_094_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-489",
    "name": "Gold Earrings",
    "slug": "gold-earrings-489",
    "primary_image": "/products/earrings_095_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "4.73",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-095",
    "images": [
      {
        "id": "prod-489-img1",
        "image_url": "/products/earrings_095_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-490",
    "name": "Gold Earrings",
    "slug": "gold-earrings-490",
    "primary_image": "/products/earrings_096_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.7",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-096",
    "images": [
      {
        "id": "prod-490-img1",
        "image_url": "/products/earrings_096_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-491",
    "name": "Gold Earrings",
    "slug": "gold-earrings-491",
    "primary_image": "/products/earrings_097_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.85",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-097",
    "images": [
      {
        "id": "prod-491-img1",
        "image_url": "/products/earrings_097_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-492",
    "name": "Gold Earrings",
    "slug": "gold-earrings-492",
    "primary_image": "/products/earrings_098_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.28",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-098",
    "images": [
      {
        "id": "prod-492-img1",
        "image_url": "/products/earrings_098_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-493",
    "name": "Gold Earrings",
    "slug": "gold-earrings-493",
    "primary_image": "/products/earrings_099_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.23",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-099",
    "images": [
      {
        "id": "prod-493-img1",
        "image_url": "/products/earrings_099_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-494",
    "name": "Gold Earrings",
    "slug": "gold-earrings-494",
    "primary_image": "/products/earrings_100_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "10.98",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-100",
    "images": [
      {
        "id": "prod-494-img1",
        "image_url": "/products/earrings_100_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-495",
    "name": "Gold Earrings",
    "slug": "gold-earrings-495",
    "primary_image": "/products/earrings_101_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "7.35",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-101",
    "images": [
      {
        "id": "prod-495-img1",
        "image_url": "/products/earrings_101_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-496",
    "name": "Gold Earrings",
    "slug": "gold-earrings-496",
    "primary_image": "/products/earrings_102_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "6.73",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-102",
    "images": [
      {
        "id": "prod-496-img1",
        "image_url": "/products/earrings_102_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-497",
    "name": "Gold Earrings",
    "slug": "gold-earrings-497",
    "primary_image": "/products/earrings_103_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.39",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-103",
    "images": [
      {
        "id": "prod-497-img1",
        "image_url": "/products/earrings_103_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-498",
    "name": "Gold Earrings",
    "slug": "gold-earrings-498",
    "primary_image": "/products/earrings_104_01.jpg",
    "base_price": "51428.00",
    "discount_price": null,
    "price": "51428.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "5.789",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery, approx 5.789 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-104",
    "images": [
      {
        "id": "prod-498-img1",
        "image_url": "/products/earrings_104_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-499",
    "name": "Gold Earrings",
    "slug": "gold-earrings-499",
    "primary_image": "/products/earrings_105_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.47",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-105",
    "images": [
      {
        "id": "prod-499-img1",
        "image_url": "/products/earrings_105_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-500",
    "name": "Gold Earrings",
    "slug": "gold-earrings-500",
    "primary_image": "/products/earrings_106_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.02",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-106",
    "images": [
      {
        "id": "prod-500-img1",
        "image_url": "/products/earrings_106_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-501",
    "name": "Gold Earrings",
    "slug": "gold-earrings-501",
    "primary_image": "/products/earrings_107_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "8.52",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "earrings",
    "category_name": "Earrings",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-107",
    "images": [
      {
        "id": "prod-501-img1",
        "image_url": "/products/earrings_107_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "earrings",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-502",
    "name": "Gold Necklace",
    "slug": "gold-earrings-502",
    "primary_image": "/products/earrings_108_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.11",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-108",
    "images": [
      {
        "id": "prod-502-img1",
        "image_url": "/products/earrings_108_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklaces",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "tag_gr"
  },
  {
    "id": "prod-503",
    "name": "Gold Necklace",
    "slug": "gold-earrings-503",
    "primary_image": "/products/earrings_109_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.74",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-109",
    "images": [
      {
        "id": "prod-503-img1",
        "image_url": "/products/earrings_109_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklaces",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-504",
    "name": "Gold Necklace",
    "slug": "gold-earrings-504",
    "primary_image": "/products/earrings_110_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "15.64",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "ERG-110",
    "images": [
      {
        "id": "prod-504-img1",
        "image_url": "/products/earrings_110_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "necklaces",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-505",
    "name": "Gold Necklace Set",
    "slug": "gold-necklace-set-505",
    "primary_image": "/products/haar_109_01.jpg",
    "base_price": "235680.00",
    "discount_price": null,
    "price": "235680.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "27.24",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery, approx 27.24 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-109",
    "images": [
      {
        "id": "prod-505-img1",
        "image_url": "/products/haar_109_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-506",
    "name": "Gold Necklace Set",
    "slug": "gold-necklace-set-506",
    "primary_image": "/products/haar_110_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "15.46",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-110",
    "images": [
      {
        "id": "prod-506-img1",
        "image_url": "/products/haar_110_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-507",
    "name": "Gold Necklace Set",
    "slug": "gold-necklace-set-507",
    "primary_image": "/products/haar_111_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "13.59",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-111",
    "images": [
      {
        "id": "prod-507-img1",
        "image_url": "/products/haar_111_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-508",
    "name": "Gold Necklace Set",
    "slug": "gold-necklace-set-508",
    "primary_image": "/products/haar_112_01.jpg",
    "base_price": "192940.00",
    "discount_price": null,
    "price": "192940.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "28.45",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery, approx 28.45 g. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-112",
    "images": [
      {
        "id": "prod-508-img1",
        "image_url": "/products/haar_112_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-509",
    "name": "Gold Necklace Set",
    "slug": "gold-necklace-set-509",
    "primary_image": "/products/haar_113_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "22.3",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-113",
    "images": [
      {
        "id": "prod-509-img1",
        "image_url": "/products/haar_113_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-510",
    "name": "Gold Necklace Set",
    "slug": "gold-necklace-set-510",
    "primary_image": "/products/haar_114_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "28.72",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-114",
    "images": [
      {
        "id": "prod-510-img1",
        "image_url": "/products/haar_114_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-511",
    "name": "Gold Necklace Set",
    "slug": "gold-necklace-set-511",
    "primary_image": "/products/haar_115_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "25.86",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-115",
    "images": [
      {
        "id": "prod-511-img1",
        "image_url": "/products/haar_115_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  },
  {
    "id": "prod-512",
    "name": "Gold Necklace Set",
    "slug": "gold-necklace-set-512",
    "primary_image": "/products/haar_116_01.jpg",
    "base_price": "20000.00",
    "discount_price": null,
    "price": "20000.00",
    "material": "gold",
    "purity": "22K",
    "weight_grams": "16.74",
    "is_featured": false,
    "stock_quantity": 5,
    "category_slug": "necklaces",
    "category_name": "Necklaces",
    "description": "22K gold jewellery. Hallmarked and certified by Rajesh Jewellers.",
    "sku": "HAR-116",
    "images": [
      {
        "id": "prod-512-img1",
        "image_url": "/products/haar_116_01.jpg",
        "display_order": 0,
        "is_primary": true
      }
    ],
    "gender": "women",
    "type": "haar-necklace-sets",
    "carats": 0,
    "weight_estimated": false,
    "weight_source": "overlay"
  }
];

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    "id": "cat-01",
    "name": "Rings",
    "slug": "rings",
    "image_url": "/products/p003.jpeg",
    "display_order": 1,
    "children": []
  },
  {
    "id": "cat-02",
    "name": "Earrings",
    "slug": "earrings",
    "image_url": "/products/p050.jpeg",
    "display_order": 2,
    "children": []
  },
  {
    "id": "cat-04",
    "name": "Pendant Sets",
    "slug": "pendant-sets",
    "image_url": "/products/p025.jpeg",
    "display_order": 4,
    "children": []
  },
  {
    "id": "cat-05",
    "name": "Chains",
    "slug": "chains",
    "image_url": "/products/p001.jpeg",
    "display_order": 5,
    "children": []
  },
  {
    "id": "cat-06",
    "name": "Necklaces",
    "slug": "necklaces",
    "image_url": "/products/p005.jpeg",
    "display_order": 6,
    "children": []
  },
  {
    "id": "cat-07",
    "name": "Bangles",
    "slug": "bangles",
    "image_url": "/products/p103.jpeg",
    "display_order": 7,
    "children": []
  },
  {
    "id": "cat-08",
    "name": "Bracelets",
    "slug": "bracelets",
    "image_url": "/products/p037.jpeg",
    "display_order": 8,
    "children": []
  },
  {
    "id": "cat-09",
    "name": "Mangalsutra",
    "slug": "mangalsutra",
    "image_url": "/products/p023.jpeg",
    "display_order": 9,
    "children": []
  },
  {
    "id": "cat-10",
    "name": "Nose Pins",
    "slug": "nose-pins",
    "image_url": "/products/p011.jpeg",
    "display_order": 10,
    "children": []
  },
  {
    "id": "cat-11",
    "name": "Jewellery Sets",
    "slug": "jewellery-sets",
    "image_url": "/products/p017.jpeg",
    "display_order": 11,
    "children": []
  },
  {
    "id": "cat-12",
    "name": "Men's Jewellery",
    "slug": "mens-jewellery",
    "image_url": "/products/p002.jpeg",
    "display_order": 12,
    "children": []
  }
,
  {
    "id": "cat-nath",
    "name": "Nath",
    "slug": "nath",
    "image_url": "/products/nath_001_01.jpg",
    "display_order": 99,
    "children": []
  }
];
