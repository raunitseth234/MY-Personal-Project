// Local catalog query layer. Serves products/categories from the generated static
// catalog (lib/catalog/products.generated.ts) so the site is fully browse-able without
// a running backend. Shapes mirror lib/api/types so the React Query hooks + server pages
// consume it unchanged.
import type {
  Category,
  PaginatedResponse,
  ProductDetail,
  ProductListItem,
  ProductListParams,
} from '@/lib/api/types';
import { getLiveGoldRatePerGram24k, priceFromWeight } from '@/lib/pricing/goldRate';
import { CATALOG_CATEGORIES, CATALOG_PRODUCTS, type CatalogProduct } from './products.generated';

function livePriceString(p: CatalogProduct, ratePerGram24k: number): string {
  const weight = p.weight_grams ? Number(p.weight_grams) : 0;
  return priceFromWeight(weight, ratePerGram24k).toFixed(2);
}

function toListItem(p: CatalogProduct, ratePerGram24k: number): ProductListItem {
  const price = livePriceString(p, ratePerGram24k);
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    primary_image: p.primary_image,
    base_price: price,
    discount_price: null,
    price,
    material: p.material,
    purity: p.purity,
    weight_grams: p.weight_grams,
    is_featured: p.is_featured,
    stock_quantity: p.stock_quantity,
    category_name: p.category_name,
  };
}

function toCategory(slug: string): Category | null {
  const c = CATALOG_CATEGORIES.find((x) => x.slug === slug);
  return c ? { ...c } : null;
}

function toDetail(p: CatalogProduct, ratePerGram24k: number): ProductDetail {
  return {
    ...toListItem(p, ratePerGram24k),
    description: p.description,
    sku: p.sku,
    images: p.images,
    variants: [],
    category: toCategory(p.category_slug),
    average_rating: 4.6,
    review_count: 12,
  };
}

function num(s: string): number {
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

export async function listProducts(
  params: ProductListParams = {}
): Promise<PaginatedResponse<ProductListItem>> {
  const rate = await getLiveGoldRatePerGram24k();
  let raw = CATALOG_PRODUCTS;

  if (params.category_slug) raw = raw.filter((p) => p.category_slug === params.category_slug);
  if (params.material) raw = raw.filter((p) => p.material === params.material);

  let items = raw.map((p) => toListItem(p, rate));

  if (params.min_price !== undefined) items = items.filter((p) => num(p.price) >= params.min_price!);
  if (params.max_price !== undefined) items = items.filter((p) => num(p.price) <= params.max_price!);

  switch (params.sort) {
    case 'price_asc':
      items.sort((a, b) => num(a.price) - num(b.price));
      break;
    case 'price_desc':
      items.sort((a, b) => num(b.price) - num(a.price));
      break;
    case 'featured':
      items.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
      break;
    case 'newest':
    default:
      break;
  }

  const limit = params.limit && params.limit > 0 ? params.limit : 20;
  const page = params.page && params.page > 0 ? params.page : 1;
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const pageItems = items.slice(start, start + limit);

  return { items: pageItems, total, page, pages, limit };
}

export async function getFeatured(limit = 12): Promise<ProductListItem[]> {
  const rate = await getLiveGoldRatePerGram24k();
  const feat = CATALOG_PRODUCTS.filter((p) => p.is_featured);
  const rest = CATALOG_PRODUCTS.filter((p) => !p.is_featured);
  return [...feat, ...rest].slice(0, limit).map((p) => toListItem(p, rate));
}

export async function getProduct(slug: string): Promise<ProductDetail | null> {
  const p = CATALOG_PRODUCTS.find((x) => x.slug === slug);
  if (!p) return null;
  const rate = await getLiveGoldRatePerGram24k();
  return toDetail(p, rate);
}

export async function getRelated(productId: string, limit = 8): Promise<ProductListItem[]> {
  const rate = await getLiveGoldRatePerGram24k();
  const base = CATALOG_PRODUCTS.find((p) => p.id === productId);
  const pool = base
    ? CATALOG_PRODUCTS.filter((p) => p.id !== productId && p.category_slug === base.category_slug)
    : CATALOG_PRODUCTS;
  const extra = CATALOG_PRODUCTS.filter(
    (p) => p.id !== productId && (!base || p.category_slug !== base.category_slug)
  );
  return [...pool, ...extra].slice(0, limit).map((p) => toListItem(p, rate));
}

export async function searchProducts(
  q: string,
  page = 1,
  limit = 20
): Promise<PaginatedResponse<ProductListItem>> {
  const rate = await getLiveGoldRatePerGram24k();
  const query = q.trim().toLowerCase();
  const matched = query
    ? CATALOG_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category_name.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query)
      )
    : [];
  const total = matched.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    items: matched.slice(start, start + limit).map((p) => toListItem(p, rate)),
    total,
    page,
    pages,
    limit,
  };
}

export function listCategories(): Category[] {
  return CATALOG_CATEGORIES.map((c) => ({ ...c }));
}
