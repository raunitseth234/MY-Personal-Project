import type { MetadataRoute } from 'next';
import { CATALOG_PRODUCTS } from '@/lib/catalog/products.generated';
import { SITE_URL } from '@/lib/seo';

// Generates /sitemap.xml from the static catalog: the indexable core pages plus
// every product detail page. Regenerates on each build so new catalog products
// are picked up automatically.
//
// Deliberately excluded:
//  - /search           → marked noindex (query-driven, no SEO value).
//  - /products?category_slug=…  → the listing page canonicalizes to /products,
//    so these filtered URLs would just collapse to it; listing them is pointless.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = CATALOG_PRODUCTS.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
