import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api/endpoints/categories';

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
    staleTime: 5 * 60 * 1000,
  });
}
