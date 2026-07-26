import { http } from '@/lib/api/http';
import type { Review } from '@/lib/api/types';

export const reviewsApi = {
  list: (productId: string) => http.get<Review[]>(`/products/${productId}/reviews`, { auth: false }),

  add: (productId: string, data: { rating: number; comment?: string }) =>
    http.post<{ id: string; message: string }>(`/products/${productId}/reviews`, data),
};
