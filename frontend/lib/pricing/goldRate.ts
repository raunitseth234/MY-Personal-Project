// Live 24K gold rate in INR/gram. gold-api.com gives international USD/troy-oz spot price;
// open.er-api.com gives USD->INR. We scale by RETAIL_MARKUP to approximate India's retail
// rate (import duty + GST + dealer margin not included in raw international spot).
//
// Caching strategy (fastest to slowest):
//   1. In-memory (module-level): zero cost, lost on page refresh
//   2. localStorage: survives page refreshes in the browser, 10-min TTL
//   3. Live fetch: only happens when both caches are cold or expired

const TROY_OUNCE_GRAMS = 31.1034768;
export const RETAIL_MARKUP = 0.15;
export const MAKING_MULTIPLIER = 0.9;

const CACHE_TTL_MS = 10 * 60 * 1000;
const LS_KEY = 'rj_gold_rate_v1';

let cache: { ratePerGram24k: number; fetchedAt: number } | null = null;

function lsRead(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const { rate, at } = JSON.parse(raw) as { rate: number; at: number };
    return Date.now() - at < CACHE_TTL_MS ? rate : null;
  } catch {
    return null;
  }
}

function lsWrite(rate: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ rate, at: Date.now() }));
  } catch {}
}

async function fetchSpotUsdPerOunce(): Promise<number> {
  const res = await fetch('https://api.gold-api.com/price/XAU', { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`gold-api.com failed: ${res.status}`);
  const data = (await res.json()) as { price: number };
  return data.price;
}

async function fetchUsdToInr(): Promise<number> {
  const res = await fetch('https://open.er-api.com/v6/latest/USD', { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`exchange rate API failed: ${res.status}`);
  const data = (await res.json()) as { rates: Record<string, number> };
  return data.rates.INR;
}

export async function getLiveGoldRatePerGram24k(): Promise<number> {
  // 1. In-memory cache (fastest — same browser session, no serialisation overhead)
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.ratePerGram24k;
  }

  // 2. localStorage cache (survives page refreshes; avoids external fetch on every load)
  const lsCached = lsRead();
  if (lsCached !== null) {
    cache = { ratePerGram24k: lsCached, fetchedAt: Date.now() };
    return lsCached;
  }

  // 3. Live fetch — only reaches here when both caches are cold/expired
  try {
    const [usdPerOunce, usdToInr] = await Promise.all([fetchSpotUsdPerOunce(), fetchUsdToInr()]);
    const spotInrPerGram = (usdPerOunce * usdToInr) / TROY_OUNCE_GRAMS;
    const ratePerGram24k = spotInrPerGram * (1 + RETAIL_MARKUP);
    cache = { ratePerGram24k, fetchedAt: Date.now() };
    lsWrite(ratePerGram24k);
    return ratePerGram24k;
  } catch (err) {
    if (cache) return cache.ratePerGram24k;
    throw err;
  }
}

export function priceFromWeight(weightGrams: number, ratePerGram24k: number): number {
  return weightGrams * MAKING_MULTIPLIER * ratePerGram24k;
}
