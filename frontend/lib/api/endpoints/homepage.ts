import { http } from '@/lib/api/http';
import type { Announcement, HeroBanner, StoreLocation, Testimonial, TrustStats } from '@/lib/api/types';

export const homepageApi = {
  announcements: () => http.get<Announcement[]>('/announcements', { auth: false }),
  heroBanners: () => http.get<HeroBanner[]>('/hero-banners', { auth: false }),
  testimonials: () => http.get<Testimonial[]>('/testimonials', { auth: false }),
  trustStats: () => http.get<TrustStats>('/trust-stats', { auth: false }),
  storeLocations: () => http.get<StoreLocation[]>('/store-locations', { auth: false }),
};
