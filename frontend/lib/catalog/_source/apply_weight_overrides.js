// Applies lib/catalog/_source/weights.override.json (real weights extracted from
// product photos: overlay number or tag NT/GR value) onto products.generated.ts.
// For products where extraction found nothing ("none"), falls back to the average
// weight of other products with the same (normalized type, gender) — recomputed
// from every product that now has a real, photo-derived weight — same as
// fill_weights.js did, but with a much larger and more accurate real-weight sample.
const fs = require('fs');
const path = require('path');

const genPath = path.join(__dirname, '..', 'products.generated.ts');
const overridePath = path.join(__dirname, 'weights.override.json');

const content = fs.readFileSync(genPath, 'utf8');
const match = content.match(/CATALOG_PRODUCTS: CatalogProduct\[\] = (\[[\s\S]*?\n\]);/);
if (!match) throw new Error('Could not locate CATALOG_PRODUCTS array');
const arr = JSON.parse(match[1]);

const overrides = JSON.parse(fs.readFileSync(overridePath, 'utf8'));
const overrideById = new Map(overrides.map((o) => [o.id, o]));

function normType(t) {
  const map = { necklaces: 'necklace', earrings: 'earring', rings: 'ring', bracelets: 'bracelet', bangles: 'bangle' };
  return map[t] || t;
}

let realCount = 0, noneCount = 0, untouchedCount = 0;

for (const p of arr) {
  const o = overrideById.get(p.id);
  if (!o) { untouchedCount++; continue; }
  if (o.weight != null) {
    p.weight_grams = String(o.weight);
    p.weight_estimated = false;
    p.weight_source = o.source;
    realCount++;
  } else {
    // resolve after the averages pass below
    noneCount++;
  }
}

// Recompute type/gender averages from every product with a confirmed real weight
// (either untouched originals or freshly extracted ones), excluding remaining "none" placeholders.
const noneIds = new Set(overrides.filter((o) => o.weight == null).map((o) => o.id));
const groups = {};
for (const p of arr) {
  if (noneIds.has(p.id)) continue;
  const w = parseFloat(p.weight_grams);
  if (!Number.isFinite(w) || w <= 0) continue;
  const key = normType(p.type) + '|' + p.gender;
  (groups[key] = groups[key] || []).push(w);
}
const avgs = {};
for (const k in groups) avgs[k] = groups[k].reduce((a, b) => a + b, 0) / groups[k].length;
let overallSum = 0, overallN = 0;
for (const k in groups) { overallSum += groups[k].reduce((a, b) => a + b, 0); overallN += groups[k].length; }
const overallAvg = overallSum / overallN;

for (const p of arr) {
  if (!noneIds.has(p.id)) continue;
  const key = normType(p.type) + '|' + p.gender;
  const est = avgs[key] ?? overallAvg;
  p.weight_grams = est.toFixed(2);
  p.weight_estimated = true;
  delete p.weight_source;
}

const newArrayLiteral = JSON.stringify(arr, null, 2);
const newContent = content.replace(match[1], newArrayLiteral);
fs.writeFileSync(genPath, newContent, 'utf8');

console.log(`Applied real weights: ${realCount}`);
console.log(`Fell back to type/gender average (photo unreadable): ${noneCount}`);
console.log(`Untouched (already had a trustworthy weight): ${untouchedCount}`);
