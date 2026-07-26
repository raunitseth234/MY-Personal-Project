// One-off script: merge missing products from backend seed batches into the
// frontend static catalog (lib/catalog/products.generated.ts).
// Run: node lib/catalog/_source/merge_new_batches.js
const fs = require('fs');
const path = require('path');

const ROOT = 'E:/Frontend';
const BACKEND_IMG_DIR = 'E:/rajesh-backend/static/images/products';
const FRONTEND_IMG_DIR = path.join(ROOT, 'public/products');
const GEN_TS = path.join(ROOT, 'lib/catalog/products.generated.ts');
const NEWDATA = path.join(ROOT, 'lib/catalog/_source/newdata.json');

const GOLD_RATE_22K = 7500.0;
const GOLD_RATE_18K = 6136.0;

const CAT_MAP = {
  chain: { slug: 'chains', name: 'Chains' },
  rings: { slug: 'rings', name: 'Rings' },
  earrings: { slug: 'earrings', name: 'Earrings' },
  bangles: { slug: 'bangles', name: 'Bangles' },
  bracelets: { slug: 'bracelets', name: 'Bracelets' },
  mangalsutra: { slug: 'mangalsutra', name: 'Mangalsutra' },
  nath: { slug: 'nath', name: 'Nath' },
  'haar-necklace-sets': { slug: 'necklaces', name: 'Necklaces' },
};

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function goldPrice(weight, purity, mc) {
  if (!weight || weight <= 0) return 20000;
  const rate = purity === '22K' || !purity ? GOLD_RATE_22K : GOLD_RATE_18K;
  return Math.round(weight * rate * (1 + mc / 100) * 1.03);
}

function diamondPrice(weight) {
  if (!weight || weight <= 0) return 125000;
  if (weight < 2) return 75000;
  if (weight < 3) return 100000;
  if (weight < 4) return 150000;
  return 200000;
}

function isMen(name) {
  return /gents|men's/i.test(name);
}

const d = JSON.parse(fs.readFileSync(NEWDATA, 'utf8'));
let genText = fs.readFileSync(GEN_TS, 'utf8');

const existingSkus = new Set([...genText.matchAll(/"sku": "([^"]+)"/g)].map((m) => m[1]));
const existingIds = [...genText.matchAll(/"id": "prod-(\d+)"/g)].map((m) => parseInt(m[1], 10));
let nextIdx = Math.max(...existingIds) + 1;

const allBackendProducts = [...d.products1, ...d.products2];
const missing = allBackendProducts.filter((p) => !existingSkus.has(p.sku));

console.log(`Existing products: ${existingIds.length}, missing to add: ${missing.length}`);

if (!fs.existsSync(FRONTEND_IMG_DIR)) fs.mkdirSync(FRONTEND_IMG_DIR, { recursive: true });

const newProducts = [];
let copiedImages = 0;

for (const p of missing) {
  const cat = CAT_MAP[p.cat];
  if (!cat) {
    console.warn(`  WARN: unmapped category '${p.cat}' for sku ${p.sku} — skipping`);
    continue;
  }

  const weight = p.weight || 0;
  const purity = p.purity || null;
  const mc = p.mc != null ? p.mc : 12;
  const material = p.material === 'diamond' ? 'diamond' : p.material === 'silver' ? 'silver' : 'gold';
  const price = material === 'diamond' ? diamondPrice(weight) : goldPrice(weight, purity, mc);

  const idx = nextIdx++;
  const id = `prod-${String(idx).padStart(3, '0')}`;
  const slug = `${slugify(p.name)}-${String(idx).padStart(3, '0')}`;

  const images = p.images.map((backendPath, j) => {
    const fname = backendPath.split('/').pop();
    const srcPath = path.join(BACKEND_IMG_DIR, fname);
    const destPath = path.join(FRONTEND_IMG_DIR, fname);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      copiedImages++;
    }
    return {
      id: `${id}-img${j + 1}`,
      image_url: `/products/${fname}`,
      display_order: j,
      is_primary: j === 0,
    };
  });

  const description =
    p.desc ||
    `${purity ? purity + ' ' : ''}${material} jewellery${weight > 0 ? `, approx ${weight} g` : ''}. Hallmarked and certified by Rajesh Jewellers.`;

  newProducts.push({
    id,
    name: p.name,
    slug,
    primary_image: images[0].image_url,
    base_price: `${price}.00`,
    discount_price: null,
    price: `${price}.00`,
    material,
    purity,
    weight_grams: weight > 0 ? `${weight}` : null,
    is_featured: !!p.featured,
    stock_quantity: 5,
    category_slug: cat.slug,
    category_name: cat.name,
    description,
    sku: p.sku,
    images,
    gender: isMen(p.name) ? 'men' : 'women',
    type: p.cat,
    carats: 0,
  });
}

console.log(`Built ${newProducts.length} new product entries. Copied ${copiedImages} images.`);

// Insert new products before the closing "];" of CATALOG_PRODUCTS array.
const productsMarker = 'export const CATALOG_CATEGORIES';
const markerIdx = genText.indexOf(productsMarker);
if (markerIdx === -1) throw new Error('Could not find CATALOG_CATEGORIES marker');

// Find the "];\n\n" right before the marker (end of CATALOG_PRODUCTS array).
const beforeMarker = genText.slice(0, markerIdx);
const closeIdx = beforeMarker.lastIndexOf('];');
if (closeIdx === -1) throw new Error('Could not find end of CATALOG_PRODUCTS array');

const newProductsText = newProducts.map((p) => '  ' + JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')).join(',\n');
const updatedBefore = beforeMarker.slice(0, closeIdx) + ',\n' + newProductsText + '\n' + beforeMarker.slice(closeIdx);

let updatedText = updatedBefore + genText.slice(markerIdx);

// Add "nath" category if not already present.
if (!/"slug": "nath"/.test(updatedText)) {
  const nathCat = d.categories1.find((c) => c.slug === 'nath');
  const natheImg = nathCat ? `/products/${nathCat.image_url.split('/').pop()}` : null;
  if (natheImg) {
    const srcPath = path.join(BACKEND_IMG_DIR, nathCat.image_url.split('/').pop());
    const destPath = path.join(FRONTEND_IMG_DIR, nathCat.image_url.split('/').pop());
    if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) fs.copyFileSync(srcPath, destPath);
  }
  const catsCloseIdx = updatedText.lastIndexOf('];');
  const catObj = {
    id: 'cat-nath',
    name: 'Nath',
    slug: 'nath',
    image_url: natheImg,
    display_order: 99,
    children: [],
  };
  const catText = '  ' + JSON.stringify(catObj, null, 2).replace(/\n/g, '\n  ');
  updatedText = updatedText.slice(0, catsCloseIdx) + ',\n' + catText + '\n' + updatedText.slice(catsCloseIdx);
  console.log('Added "nath" category.');
}

fs.writeFileSync(GEN_TS, updatedText, 'utf8');
console.log('Done. Wrote updated products.generated.ts');
