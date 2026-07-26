'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { heroSlides as fallbackSlides } from '@/lib/data';
import type { HeroBanner } from '@/lib/api/types';

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const textItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

interface Slide {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  ctaText: string;
  ctaUrl: string;
}

function toSlides(banners: HeroBanner[]): Slide[] {
  if (banners.length === 0) {
    return fallbackSlides.map((s) => ({
      src: s.src,
      alt: s.alt,
      eyebrow: 'Rajesh Jewellers Presents',
      title: 'Our Luxury Jewelry Collection',
      ctaText: 'Explore Collection',
      ctaUrl: '#collections',
    }));
  }
  return banners.map((b) => ({
    src: b.image_url,
    alt: b.title ?? 'Rajesh Jewellers collection',
    eyebrow: b.subtitle ?? 'Rajesh Jewellers Presents',
    title: b.title ?? 'Our Luxury Jewelry Collection',
    ctaText: b.cta_text ?? 'Explore Collection',
    ctaUrl: b.cta_url ?? '#collections',
  }));
}

export default function Hero({ banners }: { banners: HeroBanner[] }) {
  const slides = toSlides(banners);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[index];

  return (
    <section className="relative h-[72vh] min-h-[440px] w-full overflow-hidden bg-maroon-deep md:h-[82vh]">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.16 }}
            transition={{ duration: 9, ease: 'linear' }}
          >
            <Image src={current.src} alt={current.alt} fill priority={index === 0} sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          variants={textContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            variants={textItem}
            className="mb-4 text-[10px] font-medium uppercase tracking-[0.45em] text-gold-light md:text-xs"
          >
            {current.eyebrow}
          </motion.p>
          <motion.h1
            variants={textItem}
            className="max-w-3xl font-serif text-4xl italic leading-tight text-white md:text-6xl"
          >
            {current.title}
          </motion.h1>
          <motion.div variants={textItem} className="mt-5 h-px w-20 bg-gold" />
          <motion.div variants={textItem} className="mt-7">
            <Link
              href="/products"
              className="inline-block rounded-full border border-white/70 px-8 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition duration-300 hover:border-gold hover:bg-white/10 hover:text-gold-light active:scale-95"
            >
              {current.ctaText}
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src + i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === index ? 'w-8 bg-gold' : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
