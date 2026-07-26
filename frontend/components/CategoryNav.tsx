'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Circle,
  CircleDot,
  Coins,
  Diamond,
  Droplet,
  Gem,
  Gift,
  Heart,
  Link as LinkIcon,
  Link2,
  Sparkle,
  Sparkles,
  Watch,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '@/lib/api/types';

const ICONS_BY_SLUG: Record<string, LucideIcon> = {
  rings: CircleDot,
  earrings: Droplet,
  chains: LinkIcon,
  necklaces: Link2,
  bangles: Circle,
  bracelets: Watch,
  pendants: Heart,
  'pendant-sets': Gem,
  'nose-pins': Sparkle,
  'jewellery-sets': Gift,
  mangalsutra: Diamond,
  'mens-jewellery': Coins,
};

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get('category_slug');
  const isAllActive = pathname === '/products' && !activeSlug;

  return (
    <nav aria-label="Shop by category" className="relative border-b border-neutral-100 bg-white">
      {/* Mobile: icon scroller */}
      <div className="relative md:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />
        <div className="container">
          <div className="scrollbar-hide flex snap-x scroll-px-4 items-center gap-5 overflow-x-auto px-4 py-4">
            <Link
              href="/products"
              className="group flex shrink-0 snap-start flex-col items-center gap-1.5 text-neutral-600 transition duration-200 hover:text-maroon"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory ring-1 ring-gold/25 transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-maroon/5 group-hover:ring-maroon/40 group-hover:shadow-gold-glow">
                <Sparkles className="h-5 w-5 text-gold-dark transition duration-200 group-hover:text-maroon" strokeWidth={1.5} />
              </span>
              <span className="whitespace-nowrap text-[11px] font-medium tracking-wide">All Jewellery</span>
            </Link>
            {categories.map((category) => {
              const Icon = ICONS_BY_SLUG[category.slug] ?? Sparkles;
              return (
                <Link
                  key={category.id}
                  href={`/products?category_slug=${category.slug}`}
                  className="group flex shrink-0 snap-start flex-col items-center gap-1.5 text-neutral-600 transition duration-200 hover:text-maroon"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory ring-1 ring-gold/25 transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-maroon/5 group-hover:ring-maroon/40 group-hover:shadow-gold-glow">
                    <Icon className="h-5 w-5 text-gold-dark transition duration-200 group-hover:text-maroon" strokeWidth={1.5} />
                  </span>
                  <span className="whitespace-nowrap text-[11px] font-medium tracking-wide">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop: text nav */}
      <div className="hidden md:block">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 lg:gap-x-8">
            <Link
              href="/products"
              className={`whitespace-nowrap border-b-2 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] transition duration-200 ${
                isAllActive
                  ? 'border-maroon text-maroon'
                  : 'border-transparent text-neutral-600 hover:text-maroon'
              }`}
            >
              All Jewellery
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category_slug=${category.slug}`}
                className={`whitespace-nowrap border-b-2 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] transition duration-200 ${
                  activeSlug === category.slug
                    ? 'border-maroon text-maroon'
                    : 'border-transparent text-neutral-600 hover:text-maroon'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
