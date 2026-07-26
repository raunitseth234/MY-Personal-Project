// Second pass: for the 211 products NOT already touched by apply_weight_overrides.js
// (i.e. they already had a plausible-looking tag-derived weight), check whether their
// photo ALSO has a large overlay number stamped on it — if so, the overlay wins over
// whatever the tag said (see overlay_results_merged.json, produced by 5 parallel
// vision-check agents). Skips any product caught in a duplicate-photo data bug
// (ambiguous_dup_groups.json — multiple distinct SKUs incorrectly sharing one photo,
// so the overlay number in that photo can't be reliably attributed to any one of them).
const fs = require('fs');
const path = require('path');

const genPath = path.join(__dirname, '..', 'products.generated.ts');
const content = fs.readFileSync(genPath, 'utf8');
const match = content.match(/CATALOG_PRODUCTS: CatalogProduct\[\] = (\[[\s\S]*?\n\]);/);
if (!match) throw new Error('Could not locate CATALOG_PRODUCTS array');
const arr = JSON.parse(match[1]);

const overlayResults = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'scratchpad', 'overlay_results_merged.json'), 'utf8'));
const overlayById = new Map(overlayResults.map((o) => [o.id, o]));

const ambiguousGroups = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'scratchpad', 'ambiguous_dup_groups.json'), 'utf8'));
const ambiguousIds = new Set(ambiguousGroups.flat());

let applied = 0, skippedAmbiguous = 0, noOverlay = 0;
const appliedLog = [];

for (const p of arr) {
  const o = overlayById.get(p.id);
  if (!o) continue; // not in this pass's input (already handled by weights.override.json)
  if (!o.hasOverlay) { noOverlay++; continue; }
  if (ambiguousIds.has(p.id)) { skippedAmbiguous++; continue; }
  const before = p.weight_grams;
  p.weight_grams = String(o.overlayWeight);
  p.weight_estimated = false;
  p.weight_source = 'overlay';
  applied++;
  appliedLog.push({ id: p.id, sku: p.sku, before, after: p.weight_grams });
}

const newArrayLiteral = JSON.stringify(arr, null, 2);
const newContent = content.replace(match[1], newArrayLiteral);
fs.writeFileSync(genPath, newContent, 'utf8');

console.log(`Applied overlay override: ${applied}`);
console.log(`Skipped (ambiguous duplicate-photo group): ${skippedAmbiguous}`);
console.log(`No overlay found (left untouched): ${noOverlay}`);
fs.writeFileSync(path.join(__dirname, 'overlay_applied_log.json'), JSON.stringify(appliedLog, null, 2));
