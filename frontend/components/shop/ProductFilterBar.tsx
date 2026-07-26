'use client';

import type { ProductListParams } from '@/lib/api/types';
import PriceRangeFilter from './PriceRangeFilter';

interface Props {
  filters: ProductListParams;
  onChange: (patch: Partial<ProductListParams>) => void;
}

const SORT_OPTIONS: { value: NonNullable<ProductListParams['sort']>; label: string }[] = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function ProductFilterBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-neutral-100 pb-6">
      <PriceRangeFilter
        minPrice={filters.min_price}
        maxPrice={filters.max_price}
        onApply={(min, max) => onChange({ min_price: min, max_price: max, page: 1 })}
      />

      <select
        value={filters.sort ?? 'price_asc'}
        onChange={(e) => onChange({ sort: e.target.value as ProductListParams['sort'], page: 1 })}
        className="ml-auto rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
