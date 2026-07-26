'use client';

import { useRelatedProductsQuery } from '@/lib/queries/products';
import ProductGrid from '@/components/shop/ProductGrid';
import SectionHeading from '@/components/ui/SectionHeading';

export default function RelatedProducts({ productId }: { productId: string }) {
  const { data, isLoading } = useRelatedProductsQuery(productId);

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <section className="container py-14">
      <SectionHeading eyebrow="You May Also Like" title="Related Pieces" />
      <ProductGrid items={data ?? []} isLoading={isLoading} />
    </section>
  );
}
