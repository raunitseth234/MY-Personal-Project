// Shared SEO helpers: canonical site URL, absolute-URL construction, and
// JSON-LD builders for structured data. Used by app/layout, app/sitemap,
// app/robots and the product detail page.
import type { ProductDetail } from '@/lib/api/types';

// Public site origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL in production;
// falls back to the canonical domain so builds/sitemaps degrade gracefully.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://rajeshjewellers.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Rajesh Jewellers';
export const SITE_DESCRIPTION =
  'Rajesh Jewellers, a unit of Shree Vishwanath Prasad Seth. Exquisite gold, diamond and bridal jewellery, hallmarked and trusted across generations.';

/** Turn a site-relative path (or already-absolute URL) into an absolute URL. */
export function absoluteUrl(path: string | null | undefined): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * schema.org Product + Offer + AggregateRating JSON-LD for a product page.
 * Rendered inside a <script type="application/ld+json"> tag by the server
 * component so search engines get rich product results.
 */
export function productJsonLd(product: ProductDetail): Record<string, unknown> {
  const images = (product.images?.length
    ? product.images.map((img) => img.image_url)
    : [product.primary_image]
  )
    .filter(Boolean)
    .map((url) => absoluteUrl(url));

  const price = product.discount_price || product.price || product.base_price;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || SITE_DESCRIPTION,
    image: images,
    sku: product.sku,
    ...(product.material ? { material: product.material } : {}),
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: 'INR',
      price: Number(price).toFixed(2),
      availability:
        product.stock_quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  };

  if (product.review_count && product.average_rating) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.average_rating,
      reviewCount: product.review_count,
    };
  }

  return jsonLd;
}

/** schema.org Organization JSON-LD for the site (rendered once in the root layout). */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: SITE_NAME,
    legalName: 'Shree Vishwanath Prasad Seth',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: absoluteUrl('/logo.png'),
    image: absoluteUrl('/logo.png'),
  };
}
