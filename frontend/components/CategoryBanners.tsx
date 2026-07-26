import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { categoryBanners } from '@/lib/data';
import FadeIn from './ui/FadeIn';
import ShimmerImage from './ui/ShimmerImage';

export default function CategoryBanners() {
  return (
    <section className="bg-white">
      {categoryBanners.map((banner, i) => {
        const reversed = i % 2 === 1;
        return (
          <FadeIn key={banner.label} y={40}>
            <div className="relative h-[300px] w-full overflow-hidden bg-bluegrey md:h-[400px]">
              <div
                className={`absolute inset-y-0 w-[62%] md:w-[55%] ${
                  reversed ? 'right-0' : 'left-0'
                }`}
                style={{
                  clipPath: reversed
                    ? 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)'
                    : 'polygon(0 0, 100% 0, 82% 100%, 0 100%)',
                }}
              >
                <ShimmerImage
                  src={banner.image}
                  alt={`${banner.label.toLowerCase()} on a model`}
                  sizes="(min-width: 768px) 55vw, 62vw"
                  className="hover:scale-105"
                />
              </div>

              <div
                className={`relative flex h-full items-center px-6 md:px-20 ${
                  reversed ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={reversed ? 'text-left' : 'text-right'}>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 md:text-xs">
                    {banner.tagline}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl tracking-[0.18em] text-maroon md:text-5xl md:tracking-[0.25em]">
                    {banner.label}
                  </h3>
                  <Link
                    href="/products"
                    className={`mt-4 inline-flex items-center gap-1.5 border-b border-maroon/40 pb-1 text-[11px] font-medium uppercase tracking-[0.25em] text-maroon transition duration-300 hover:border-gold hover:text-gold-dark active:scale-95 ${
                      reversed ? '' : 'flex-row-reverse'
                    }`}
                  >
                    Shop Now
                    <ArrowRight
                      className={`h-3.5 w-3.5 ${reversed ? '' : 'rotate-180'}`}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </section>
  );
}
