import type { PaginatedResponse, ProductDetail, ProductListItem, ProductListParams } from '@/lib/api/types';
import {
  getFeatured,
  getProduct,
  getRelated,
  listProducts,
  searchProducts,
} from '@/lib/catalog';

// Products are served from the local static catalog (lib/catalog) instead of the HTTP API,
// so the storefront is fully browse-able without a running backend. Signatures stay async
// (Promise-returning) so the React Query hooks that call these are unchanged.
export const productsApi = {
  list: (params: ProductListParams = {}): Promise<PaginatedResponse<ProductListItem>> =>
    listProducts(params),

  featured: (limit = 12): Promise<ProductListItem[]> => getFeatured(limit),

  search: (q: string, page = 1, limit = 20): Promise<PaginatedResponse<ProductListItem>> =>
    searchProducts(q, page, limit),

  detail: async (slug: string): Promise<ProductDetail> => {
    const p = await getProduct(slug);
    if (!p) throw new Error('Product not found');
    return p;
  },

  related: (productId: string, limit = 8): Promise<ProductListItem[]> => getRelated(productId, limit),

  recentlyViewed: () => Promise.resolve<ProductListItem[]>([]),
};
