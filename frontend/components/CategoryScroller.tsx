'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { categoryCircles as fallbackCircles } from '@/lib/data';
import type { Category } from '@/lib/api/types';
import ShimmerImage from './ui/ShimmerImage';

export default function CategoryScroller({ categories }: { categories: Category[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const realCircles = categories
    .filter((c): c is Category & { image_url: string } => !!c.image_url)
    .map((c) => ({ label: c.name, image: c.image_url, slug: c.slug as string | undefined }));
  const categoryCircles =
    realCircles.length > 0
      ? realCircles
      : fallbackCircles.map((c) => ({ ...c, slug: undefined as string | undefined }));

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container">
        <div className="mb-7 text-center md:mb-10">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
            Categories
          </p>
          <h2 className="font-serif text-2xl text-maroon md:text-3xl">
            Shop by Category
          </h2>
        </div>

        <div
          ref={ref}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:justify-center md:gap-8 md:px-0"
        >
          {categoryCircles.map((category, i) => (
            <motion.a
              key={category.label}
              href={category.slug ? `/products?category_slug=${category.slug}` : '#'}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="group w-[88px] shrink-0 snap-start md:w-28"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-neutral-200/80 transition duration-500 group-hover:shadow-gold-glow group-hover:ring-gold/60">
                <ShimmerImage
                  src={category.image}
                  alt={`${category.label} jewellery`}
                  sizes="(min-width: 768px) 112px, 88px"
                  className="group-hover:scale-110"
                />
              </div>
              <p className="mt-2.5 text-center text-xs font-medium tracking-wide text-neutral-700 transition group-hover:text-maroon md:text-sm">
                {category.label}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
