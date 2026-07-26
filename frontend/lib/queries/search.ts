import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/endpoints/products';

export function useSearchQuery(q: string, page = 1) {
  return useQuery({
    queryKey: ['products', 'search', q, page],
    queryFn: () => productsApi.search(q, page),
    enabled: q.trim().length > 0,
  });
}
