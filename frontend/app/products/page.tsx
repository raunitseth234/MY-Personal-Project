import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Shop Jewellery',
  description:
    'Browse gold, diamond and bridal jewellery from Rajesh Jewellers — hallmarked, certified, and priced live to the gold rate.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsClient />
    </Suspense>
  );
}
