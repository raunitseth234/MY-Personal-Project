import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Generates /robots.txt. Public catalog is fully crawlable; account, auth and
// wishlist pages are user-specific with no SEO value, so they're disallowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account', '/login', '/register', '/wishlist'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
