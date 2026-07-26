'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials as fallbackTestimonials } from '@/lib/data';
import type { Testimonial } from '@/lib/api/types';
import SectionHeading from './ui/SectionHeading';

export default function Testimonials({ testimonials: real }: { testimonials: Testimonial[] }) {
  const testimonials =
    real.length > 0
      ? real.map((t) => ({ quote: t.comment, name: t.customer_name, city: t.customer_location ?? '', rating: t.rating }))
      : fallbackTestimonials.map((t) => ({ ...t, rating: 5 }));

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  const current = testimonials[index];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="Words From Our Family"
          subtitle="Generations of trust, in their own words"
        />

        <div className="mx-auto max-w-2xl">
          <div className="relative min-h-[220px] text-center md:min-h-[190px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="mb-4 flex justify-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`h-4 w-4 ${starIndex < Math.round(current.rating) ? 'fill-current' : 'fill-none text-neutral-300'}`}
                    />
                  ))}
                </div>
                <blockquote className="font-display text-xl italic leading-relaxed text-neutral-700 md:text-2xl">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-5">
                  <p className="text-sm font-semibold text-maroon">
                    {current.name}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                    {current.city}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-7 bg-maroon'
                    : 'w-2 bg-neutral-300 hover:bg-gold'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
