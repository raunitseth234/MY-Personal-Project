import type { ProductListItem } from '@/lib/api/types';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

function CardSkeleton() {
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-neutral-200/60 to-transparent" />
      </div>
      <div className="mt-3 h-3 w-1/3 rounded bg-neutral-100" />
      <div className="mt-2 h-4 w-2/3 rounded bg-neutral-100" />
      <div className="mt-2 h-4 w-1/4 rounded bg-neutral-100" />
    </div>
  );
}

interface Props {
  items: ProductListItem[];
  isLoading?: boolean;
  isError?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
}

export default function ProductGrid({
  items,
  isLoading,
  isError,
  emptyTitle = 'No products found',
  emptyMessage = 'Try adjusting your filters or check back soon for new arrivals.',
}: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <EmptyState title="Something went wrong" message="We couldn't load these products. Please try again." />;
  }

  if (items.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
