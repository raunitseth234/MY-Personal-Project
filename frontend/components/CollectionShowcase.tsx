import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { collections, editorialImage } from '@/lib/data';
import FadeIn from './ui/FadeIn';
import SectionHeading from './ui/SectionHeading';
import ShimmerImage from './ui/ShimmerImage';

export default function CollectionShowcase() {
  return (
    <section id="collections" className="bg-[#171012]">
      <div className="relative h-[420px] overflow-hidden md:h-[540px]">
        <ShimmerImage
          src={editorialImage}
          alt="Fine gold pendants in warm light"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <FadeIn>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.45em] text-gold-light md:text-xs">
              The Edit
            </p>
            <h2 className="max-w-2xl font-display text-4xl italic leading-tight text-white md:text-6xl">
              Everyday love with{' '}
              <span className="text-gold-light">Fine Jewelry</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/75">
              Handcrafted pieces that turn ordinary moments into heirlooms.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container py-16 md:py-24">
        <SectionHeading
          dark
          eyebrow="Signature"
          title="Premium & Beautiful Collections"
          subtitle="Designed by master karigars, made to be passed on"
        />

        <div className="grid gap-5 sm:grid-cols-2 md:gap-7">
          {collections.map((collection, i) => (
            <FadeIn key={collection.title} delay={(i % 2) * 0.1}>
              <Link
                href="/products"
                className="group block overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-white/10 transition duration-500 hover:shadow-gold-glow hover:ring-gold/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ShimmerImage
                    src={collection.image}
                    alt={collection.title}
                    sizes="(min-width: 1200px) 570px, (min-width: 640px) 50vw, 100vw"
                    className="group-hover:scale-110"
                  />
                  <span className="pointer-events-none absolute inset-0 z-10 -translate-x-[160%] -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[160%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                </div>
                <div className="p-5 pt-2 transition-transform duration-500 group-hover:-translate-y-1 md:p-6 md:pt-3">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                    Signature Collection
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl text-white">
                    {collection.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {collection.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-light transition-transform duration-300 group-hover:translate-x-1">
                    View Collection
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
