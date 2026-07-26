'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductsQuery } from '@/lib/queries/products';
import { useCategoriesQuery } from '@/lib/queries/categories';
import { isValidMaterial } from '@/lib/utils/material';
import type { ProductListParams } from '@/lib/api/types';
import ProductFilterBar from '@/components/shop/ProductFilterBar';
import ProductGrid from '@/components/shop/ProductGrid';
import Pagination from '@/components/shop/Pagination';
import SectionHeading from '@/components/ui/SectionHeading';

const SORT_VALUES = ['newest', 'price_asc', 'price_desc', 'featured'] as const;

function parseFilters(params: URLSearchParams): ProductListParams {
  const material = params.get('material');
  const sort = params.get('sort');
  const page = Number(params.get('page'));
  const minPrice = Number(params.get('min_price'));
  const maxPrice = Number(params.get('max_price'));

  return {
    category_slug: params.get('category_slug') || undefined,
    material: material && isValidMaterial(material) ? material : undefined,
    min_price: Number.isFinite(minPrice) && minPrice > 0 ? minPrice : undefined,
    max_price: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    sort: sort && (SORT_VALUES as readonly string[]).includes(sort) ? (sort as ProductListParams['sort']) : 'newest',
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: 20,
  };
}

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const categoriesQuery = useCategoriesQuery();
  const productsQuery = useProductsQuery(filters);

  const updateFilters = useCallback(
    (patch: Partial<ProductListParams>) => {
      const next: ProductListParams = { ...filters, ...patch };
      const qs = new URLSearchParams();
      if (next.category_slug) qs.set('category_slug', next.category_slug);
      if (next.material) qs.set('material', next.material);
      if (next.min_price) qs.set('min_price', String(next.min_price));
      if (next.max_price) qs.set('max_price', String(next.max_price));
      if (next.sort && next.sort !== 'newest') qs.set('sort', next.sort);
      if (next.page && next.page > 1) qs.set('page', String(next.page));
      router.push(`/products${qs.toString() ? `?${qs}` : ''}`, { scroll: false });
    },
    [filters, router]
  );

  const activeCategory = categoriesQuery.data?.find((c) => c.slug === filters.category_slug);
  const MATERIAL_LABELS: Record<string, string> = {
    gold: 'Gold', silver: 'Silver', diamond: 'Diamond', platinum: 'Platinum', imitation: 'Imitation', kundan: 'Kundan',
  };

  return (
    <div className="container py-10 md:py-14">
      <SectionHeading
        eyebrow="Our Collection"
        title={activeCategory ? activeCategory.name : 'All Jewellery'}
        subtitle={
          productsQuery.data ? `${productsQuery.data.total} piece${productsQuery.data.total === 1 ? '' : 's'}` : undefined
        }
      />
      {filters.material && !filters.category_slug && (
        <p className="mb-4 text-center text-sm text-neutral-500">
          Showing {MATERIAL_LABELS[filters.material] ?? filters.material} jewellery across all categories.
          Select a category in the filter to narrow results.
        </p>
      )}

      <ProductFilterBar filters={filters} onChange={updateFilters} />

      <div className="mt-8">
        <ProductGrid
          items={productsQuery.data?.items ?? []}
          isLoading={productsQuery.isLoading}
          isError={productsQuery.isError}
        />
      </div>

      {productsQuery.data && (
        <Pagination page={productsQuery.data.page} pages={productsQuery.data.pages} onChange={(page) => updateFilters({ page })} />
      )}
    </div>
  );
}
