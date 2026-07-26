import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@/lib/api/endpoints/wishlist';

export function useWishlistQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistApi.get(),
    enabled,
  });
}

export function useToggleWishlistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.toggle(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });
}
