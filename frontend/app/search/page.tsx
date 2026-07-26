import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the Rajesh Jewellers catalogue of gold, diamond and bridal jewellery.',
  // Search-result pages carry query strings and have no canonical SEO value.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchClient />
    </Suspense>
  );
}
