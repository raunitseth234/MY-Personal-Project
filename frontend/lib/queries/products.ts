import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/endpoints/products';
import type { ProductListParams } from '@/lib/api/types';

// Gold rate is cached for 10 min; no point re-running catalog queries more often than that.
const PRODUCT_STALE_MS = 10 * 60 * 1000;

export function useProductsQuery(params: ProductListParams) {
  return useQuery({
    queryKey: ['products', 'list', params],
    queryFn: () => productsApi.list(params),
    staleTime: PRODUCT_STALE_MS,
  });
}

export function useProductQuery(slug: string) {
  return useQuery({
    queryKey: ['products', 'detail', slug],
    queryFn: () => productsApi.detail(slug),
    enabled: !!slug,
    staleTime: PRODUCT_STALE_MS,
  });
}

export function useFeaturedProductsQuery(limit = 12) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productsApi.featured(limit),
    staleTime: PRODUCT_STALE_MS,
  });
}

export function useRelatedProductsQuery(productId: string | undefined, limit = 8) {
  return useQuery({
    queryKey: ['products', 'related', productId, limit],
    queryFn: () => productsApi.related(productId as string, limit),
    enabled: !!productId,
    staleTime: PRODUCT_STALE_MS,
  });
}

export function useRecentlyViewedQuery() {
  return useQuery({
    queryKey: ['products', 'recently-viewed'],
    queryFn: () => productsApi.recentlyViewed(),
  });
}
