import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Cormorant_Garamond, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import AnnouncementBar from '@/components/AnnouncementBar';
import ConditionalCategoryNav from '@/components/ConditionalCategoryNav';
import FloatingChat from '@/components/FloatingChat';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MobileContactBar from '@/components/MobileContactBar';
import ScrollProgress from '@/components/ScrollProgress';
import ConditionalSearchBar from '@/components/ConditionalSearchBar';
import { serverFetch } from '@/lib/api/server-fetch';
import { listCategories } from '@/lib/catalog';
import type { Announcement } from '@/lib/api/types';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, organizationJsonLd } from '@/lib/seo';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Fine Gold & Diamond Jewellery`,
    // Per-page titles render as "Page Title | Rajesh Jewellers".
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'jewellery',
    'gold jewellery',
    'diamond jewellery',
    'bridal jewellery',
    'hallmarked gold',
    'Rajesh Jewellers',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Fine Gold & Diamond Jewellery`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_IN',
    images: [{ url: '/logo.png', alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Fine Gold & Diamond Jewellery`,
    description: SITE_DESCRIPTION,
    images: ['/logo.png'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcements = await serverFetch<Announcement[]>('/announcements', 300);
  const categories = listCategories();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} bg-white font-sans text-neutral-900 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Providers>
          <ScrollProgress />
          <AnnouncementBar announcements={announcements ?? []} />
          <Header categories={categories ?? []} />
          <Suspense fallback={null}>
            <ConditionalCategoryNav categories={categories ?? []} />
          </Suspense>
          <main className="pb-[62px] md:pb-0">
            <ConditionalSearchBar />
            {children}
            <Footer />
          </main>
          <FloatingChat />
          <MobileContactBar />
        </Providers>
      </body>
    </html>
  );
}
