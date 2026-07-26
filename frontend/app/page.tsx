import CategoryBanners from '@/components/CategoryBanners';
import CategoryGrid from '@/components/CategoryGrid';
import CategoryScroller from '@/components/CategoryScroller';
import CollectionShowcase from '@/components/CollectionShowcase';
import Hero from '@/components/Hero';
import StatsCounters from '@/components/StatsCounters';
import Testimonials from '@/components/Testimonials';
import TrustBadges from '@/components/TrustBadges';
import WorldSection from '@/components/WorldSection';
import { serverFetch } from '@/lib/api/server-fetch';
import type { HeroBanner, Testimonial, TrustStats } from '@/lib/api/types';
import { listCategories } from '@/lib/catalog';

export default async function HomePage() {
  const [heroBanners, testimonials, trustStats] = await Promise.all([
    serverFetch<HeroBanner[]>('/hero-banners', 60),
    serverFetch<Testimonial[]>('/testimonials', 60),
    serverFetch<TrustStats>('/trust-stats', 60),
  ]);
  const categories = listCategories();

  return (
    <>
      <Hero banners={heroBanners ?? []} />
      <TrustBadges />
      <CategoryScroller categories={categories ?? []} />
      <WorldSection />
      <CategoryGrid categories={categories ?? []} />
      <CollectionShowcase />
      <CategoryBanners />
      <StatsCounters trustStats={trustStats} />
      <Testimonials testimonials={testimonials ?? []} />
    </>
  );
}
