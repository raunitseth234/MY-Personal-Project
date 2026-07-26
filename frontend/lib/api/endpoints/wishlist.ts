import { http } from '@/lib/api/http';
import type { WishlistItem } from '@/lib/api/types';

export const wishlistApi = {
  get: () => http.get<WishlistItem[]>('/wishlist'),
  toggle: (productId: string) =>
    http.post<{ in_wishlist: boolean; message: string }>('/wishlist/toggle', { product_id: productId }),
};
