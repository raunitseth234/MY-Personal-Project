import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '@/lib/api/endpoints/reviews';

export function useReviewsQuery(productId: string | undefined) {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewsApi.list(productId as string),
    enabled: !!productId,
  });
}

export function useAddReviewMutation(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; comment?: string }) => reviewsApi.add(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['products', 'detail'] });
    },
  });
}
