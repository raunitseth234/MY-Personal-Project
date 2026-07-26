# Jewellery tag extraction spec

You are extracting structured data from jewellery product photos. Each photo shows a piece of
jewellery with a printed price/spec tag. Accuracy on the tag digits is CRITICAL.

## Steps
1. Read the assigned filenames from `C:/Users/RAUNIT~1/AppData/Local/Temp/claude/E--Frontend/40e7dbbb-466c-424b-8f12-ea9e380ca5e6/scratchpad/filelist.txt` (the line numbers you were given). The number is the line, the text after the tab is the exact filename.
2. For EACH assigned file, Read the image at `E:/My jwel pics all/<filename>` and study it closely.
3. Transcribe the tag VERBATIM. Do not guess or normalize. If a field is occluded/blurry, mark readable=false and put your best guess.

## Tag legend
- The top line is the product CODE, e.g. `PRN1209-01-20` or `SRN1959-26-18`. Transcribe exactly.
- `GR:` = gross weight in grams (e.g. `GR:2.260-18K` -> gross_g=2.260, karat=18K)
- `ST:` = stone info (e.g. `ST:0.176/1/211`) -> copy the raw string
- `NT:` = net weight in grams (e.g. `NT:1.834` -> net_g=1.834)
- If karat not shown, infer from GR line (usually 18K); else null.

## Classification
- type: one of ring | earring | stud | pendant | pendant-set | chain | necklace | bangle | kada | bracelet | mangalsutra | nosepin | maangtika | bracelet | set | murti | other
- gender: "men" ONLY if clearly men's (chunky signet/gents ring, heavy gents chain/bracelet, gents kada). Otherwise "women".
- has_stone: true if the piece visibly has diamond/stone/CZ, else false. (ST:0.000 usually means no stone.)
- material: "gold" default; "gold-diamond" if diamonds/stones present; "silver" if clearly silver/white metal murti/item.

## Output
Write a JSON array to `C:/Users/RAUNIT~1/AppData/Local/Temp/claude/E--Frontend/40e7dbbb-466c-424b-8f12-ea9e380ca5e6/scratchpad/batch_<BATCHID>.json`.
Each element:
{
  "line": <int>,
  "filename": "<exact filename>",
  "tag_code": "<verbatim code, e.g. PRN1209-01-20>",
  "gross_g": <number or null>,
  "karat": "<e.g. 18K or null>",
  "stone": "<raw ST string or null>",
  "net_g": <number or null>,
  "type": "<from list>",
  "gender": "men|women",
  "has_stone": <bool>,
  "material": "gold|gold-diamond|silver",
  "visual": "<max 12 word description, e.g. 'gold signet ring with star motif and center stone'>",
  "readable": <bool>
}
After writing the file, return ONLY: the batch id, count of items written, and a list of any lines where readable=false or the tag was hard to read. Keep your reply under 100 words. Do NOT paste the full JSON back.
