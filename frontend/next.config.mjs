/** @type {import('next').NextConfig} */

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not set. Copy .env.example to .env.local (or set it in your deploy platform\'s env vars) before building.'
  );
}

// Derive backend base URL from the API URL env var (strip /api/v1)
const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, '');

const { hostname: backendHost, port: backendPort, protocol: backendProto } = new URL(BACKEND_BASE);

const nextConfig = {
  compress: true,
  images: {
    // Serve AVIF (20-30% smaller than WebP) where supported, fall back to WebP.
    formats: ['image/avif', 'image/webp'],
    // Keep optimized images in the Next.js cache for 1 hour (default is 60 s).
    minimumCacheTTL: 3600,
    // Widths for the srcset on full-layout images (hero, full-width banners).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Widths for the srcset on constrained images (thumbnails, icons).
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: backendProto.replace(':', ''),
        hostname: backendHost,
        port: backendPort,
        pathname: '/static/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/static/:path*',
        destination: `${BACKEND_BASE}/static/:path*`,
      },
    ];
  },
  async headers() {
    // Content-Security-Policy is the primary mitigation for H2 (auth/refresh tokens in
    // localStorage): it can't stop XSS entirely, but it stops an injected script from
    // loading/executing from anywhere but this origin, and stops exfiltrating stolen
    // tokens to an attacker-controlled host via fetch/XHR/beacon (connect-src).
    // 'unsafe-inline' is required for Next.js's hydration/style injection in this setup
    // (no nonce middleware in place); still meaningfully restricts script/connect origins.
    const csp = [
      `default-src 'self'`,
      `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
      `style-src 'self' 'unsafe-inline'`,
      `img-src 'self' data: blob: https://images.unsplash.com ${BACKEND_BASE}`,
      `font-src 'self' data:`,
      // lib/pricing/goldRate.ts fetches live gold/currency rates directly from these two
      // hosts client-side (product prices are derived from live weight * gold rate).
      `connect-src 'self' ${BACKEND_BASE} https://api.gold-api.com https://open.er-api.com`,
      `frame-ancestors 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
