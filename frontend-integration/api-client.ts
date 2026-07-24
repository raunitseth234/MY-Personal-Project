/**
 * Rajesh Jewellers — Typed API Client for Next.js
 *
 * Usage:
 *   import api from '@/lib/api-client';
 *   const products = await api.products.list({ category_slug: 'rings' });
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// ─────────── Token Storage ───────────

const TOKEN_KEY = 'rj_access_token';
const REFRESH_KEY = 'rj_refresh_token';

const storage = {
  getAccess: (): string | null =>
    typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null,
  getRefresh: (): string | null =>
    typeof window !== 'undefined' ? localStorage.getItem(REFRESH_KEY) : null,
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

// ─────────── Core fetch wrapper ───────────

async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const token = storage.getAccess();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  // Auto-refresh on 401
  if (res.status === 401 && retry) {
    const refreshToken = storage.getRefresh();
    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        storage.setTokens(data.access_token, data.refresh_token);
        return request<T>(path, options, false); // retry once
      } else {
        storage.clear();
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw { status: res.status, ...error };
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

const get  = <T>(path: string) => request<T>(path, { method: 'GET' });
const post = <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) });
const put  = <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT',  body: JSON.stringify(body) });
const del  = <T>(path: string) => request<T>(path, { method: 'DELETE' });


// ─────────── API Methods ───────────

export const api = {

  // AUTH
  auth: {
    register: (data: { name: string; email: string; phone: string; password: string }) =>
      post<TokenResponse>('/auth/register', data),

    login: (data: { identifier: string; password: string }) =>
      post<TokenResponse>('/auth/login', data).then((res) => {
        storage.setTokens(res.access_token, res.refresh_token);
        return res;
      }),

    logout: (refreshToken: string) =>
      post('/auth/logout', { refresh_token: refreshToken }).then(() => {
        storage.clear();
      }),

    me: () => get<User>('/auth/me'),

    sendOTP: (phone: string) => post('/auth/send-otp', { phone }),

    verifyOTP: (phone: string, otp: string) =>
      post('/auth/verify-otp', { phone, otp }),
  },

  // ADDRESSES
  addresses: {
    list: () => get<Address[]>('/addresses'),
    create: (data: AddressCreate) => post<Address>('/addresses', data),
    update: (id: string, data: AddressCreate) => put<Address>(`/addresses/${id}`, data),
    delete: (id: string) => del(`/addresses/${id}`),
  },

  // PRODUCTS & CATEGORIES — powers: homepage category tiles, product listing, search
  products: {
    categories: () => get<Category[]>('/categories'),

    list: (params: ProductListParams = {}) => {
      const qs = new URLSearchParams();
      if (params.category_slug) qs.set('category_slug', params.category_slug);
      if (params.material)      qs.set('material', params.material);
      if (params.min_price)     qs.set('min_price', String(params.min_price));
      if (params.max_price)     qs.set('max_price', String(params.max_price));
      if (params.sort)          qs.set('sort', params.sort);
      if (params.page)          qs.set('page', String(params.page));
      if (params.limit)         qs.set('limit', String(params.limit));
      return get<PaginatedResponse<ProductListItem>>(`/products?${qs}`);
    },

    featured: (limit = 12) =>
      get<ProductListItem[]>(`/products/featured?limit=${limit}`),

    search: (q: string, page = 1) =>
      get<PaginatedResponse<ProductListItem>>(`/products/search?q=${encodeURIComponent(q)}&page=${page}`),

    detail: (slug: string) => get<ProductDetail>(`/products/${slug}`),

    related: (productId: string) =>
      get<ProductListItem[]>(`/products/${productId}/related`),

    recentlyViewed: () => get<ProductListItem[]>('/products/recently-viewed'),

    reviews: (productId: string) => get(`/products/${productId}/reviews`),
    addReview: (productId: string, data: { rating: number; comment?: string }) =>
      post(`/products/${productId}/reviews`, data),
  },

  // CART — powers: bag icon badge, cart page
  cart: {
    get: () => get<Cart>('/cart'),

    count: () => get<{ count: number }>('/cart/count'),  // for header badge

    add: (productId: string, quantity = 1, variantId?: string) =>
      post('/cart/add', { product_id: productId, quantity, variant_id: variantId }),

    update: (itemId: string, quantity: number) =>
      put(`/cart/items/${itemId}`, { quantity }),

    remove: (itemId: string) => del(`/cart/items/${itemId}`),

    clear: () => del('/cart/clear'),
  },

  // WISHLIST — powers: heart icon toggle
  wishlist: {
    get: () => get('/wishlist'),

    toggle: (productId: string) =>
      post<{ in_wishlist: boolean; message: string }>('/wishlist/toggle', { product_id: productId }),

    moveToCart: (productId: string) =>
      post(`/wishlist/${productId}/move-to-cart`, {}),
  },

  // ORDERS — powers: checkout, order history page
  orders: {
    validateCoupon: (code: string, cartTotal: number) =>
      post<CouponValidateResponse>('/coupons/validate', { code, cart_total: cartTotal }),

    checkout: (addressId: string, couponCode?: string) =>
      post<CheckoutResponse>('/orders/checkout', {
        address_id: addressId,
        coupon_code: couponCode,
      }),

    list: () => get<Order[]>('/orders'),

    detail: (orderNumber: string) => get<Order>(`/orders/${orderNumber}`),

    cancel: (orderNumber: string) => post(`/orders/${orderNumber}/cancel`, {}),
  },

  // HOMEPAGE CONTENT — powers all homepage sections
  homepage: {
    announcements: () => get<Announcement[]>('/announcements'),     // rotating top bar
    heroBanners: () => get<HeroBanner[]>('/hero-banners'),          // hero carousel
    testimonials: () => get<Testimonial[]>('/testimonials'),        // reviews section
    trustStats: () => get<TrustStats>('/trust-stats'),              // counter section
    storeLocations: () => get<StoreLocation[]>('/store-locations'),
  },

  // CHAT — powers floating chat widget
  chat: {
    send: (sessionId: string, message: string) =>
      post<ChatResponse>('/chat/message', { session_id: sessionId, message }),

    history: (sessionId: string) =>
      get(`/chat/history/${sessionId}`),
  },

  // HEALTH CHECK
  health: () => fetch(`${BASE_URL.replace('/api/v1', '')}/health`).then((r) => r.json()),
};

export default api;


// ─────────── TypeScript Interfaces ───────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'staff';
  is_verified: boolean;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface AddressCreate {
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  is_default?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  display_order: number;
  children: Category[];
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  primary_image: string | null;
  base_price: number;
  discount_price: number | null;
  material: string;
  purity: string | null;
  is_featured: boolean;
  stock_quantity: number;
  category_name: string | null;
}

export interface ProductDetail extends ProductListItem {
  description: string | null;
  weight_grams: number | null;
  sku: string;
  images: { id: string; image_url: string; display_order: number; is_primary: boolean }[];
  variants: { id: string; variant_name: string; additional_price: number; stock_quantity: number }[];
  category: Category | null;
  average_rating: number | null;
  review_count: number;
}

export interface ProductListParams {
  category_slug?: string;
  material?: string;
  min_price?: number;
  max_price?: number;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'featured';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  product_slug: string;
  variant_id: string | null;
  variant_name: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
  stock_available: number;
  stock_issue: boolean;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  subtotal: number;
  item_count: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  subtotal: number;
  discount_amount: number;
  coupon_code: string | null;
  total_amount: number;
  payment_status: 'unpaid' | 'paid' | 'refunded' | 'failed';
  address_snapshot: Address;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name_snapshot: string;
  product_image_snapshot: string | null;
  quantity: number;
  price_at_purchase: number;
  variant_details: { name: string } | null;
  line_total: number;
}

export interface CheckoutResponse {
  order: Order;
  payment_info: {
    id: string;
    amount: number;
    currency: string;
    _stub?: boolean;
  };
  razorpay_key: string;
}

export interface CouponValidateResponse {
  valid: boolean;
  discount_amount: number;
  message: string;
}

export interface Announcement {
  id: string;
  message: string;
  link_url: string | null;
  display_order: number;
}

export interface HeroBanner {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  mobile_image_url: string | null;
  cta_text: string | null;
  cta_url: string | null;
  display_order: number;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string | null;
  rating: number;
  comment: string;
  avatar_url: string | null;
}

export interface TrustStats {
  years_of_trust: number;
  happy_customers: number;
  purity_guarantee: string;
  store_locations: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string | null;
  map_link: string | null;
  opening_hours: Record<string, string> | null;
}

export interface ChatResponse {
  session_id: string;
  reply: string;
  timestamp: string;
}
