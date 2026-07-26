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

export const MATERIALS = ['gold', 'silver', 'diamond', 'platinum', 'imitation', 'kundan'] as const;
export type Material = (typeof MATERIALS)[number];

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  primary_image: string | null;
  base_price: string;
  discount_price: string | null;
  price: string;              // live-computed effective price (what the UI shows)
  material: string;
  purity: string | null;
  weight_grams: string | null;
  is_featured: boolean;
  stock_quantity: number;
  category_name: string | null;
}

export interface ProductImage {
  id: string;
  image_url: string;
  display_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  variant_name: string;
  purity: string | null;
  additional_price: string;
  stock_quantity: number;
  price: string;              // absolute computed unit price for this carat/variant
}

export interface ProductDetail extends ProductListItem {
  description: string | null;
  sku: string;
  images: ProductImage[];
  variants: ProductVariant[];
  category: Category | null;
  average_rating: number | null;
  review_count: number;
}

export interface ProductListParams {
  category_slug?: string;
  material?: Material;
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

export interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string | null;
  is_verified_purchase: boolean;
  created_at: string;
}

export interface WishlistItem {
  id: string;
  product_id: string;
  name: string;
  slug: string;
  primary_image: string | null;
  base_price: string;
  discount_price: string | null;
  added_at: string;
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

export interface ChatHistoryEntry {
  user_message: string;
  bot_reply: string;
  timestamp: string;
}

/** Normalized shape every API error is converted to by lib/api/http.ts, regardless of which
 * of the backend's 3+ raw error shapes it started as. */
export interface ApiError {
  status: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
}
