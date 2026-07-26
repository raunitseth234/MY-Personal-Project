import { categoryGrid as fallbackGrid } from '@/lib/data';
import type { Category } from '@/lib/api/types';
import FadeIn from './ui/FadeIn';
import SectionHeading from './ui/SectionHeading';
import ShimmerImage from './ui/ShimmerImage';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const realGrid = categories
    .filter((c): c is Category & { image_url: string } => !!c.image_url)
    .map((c) => ({ label: c.name, image: c.image_url, slug: c.slug as string | undefined }));
  const categoryGrid = realGrid.length > 0 ? realGrid : fallbackGrid.map((c) => ({ ...c, slug: undefined as string | undefined }));

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Handpicked For You"
          title="Explore Our Collections"
          subtitle="Crafted in gold, silver and diamonds"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categoryGrid.map((category, i) => (
            <FadeIn key={category.label} delay={(i % 4) * 0.06}>
              <a href={category.slug ? `/products?category_slug=${category.slug}` : '#'} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-neutral-200/70 transition duration-500 group-hover:shadow-gold-glow group-hover:ring-gold/70">
                  <ShimmerImage
                    src={category.image}
                    alt={`${category.label} collection`}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="group-hover:scale-110"
                  />
                  <span className="pointer-events-none absolute inset-0 z-10 -translate-x-[160%] -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[160%]" />
                  <span className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 text-center text-[10px] uppercase tracking-[0.3em] text-white transition-transform duration-500 group-hover:translate-y-0">
                    View All
                  </span>
                </div>
                <p className="mt-3 text-center text-sm font-medium tracking-wide text-neutral-800 transition group-hover:text-maroon">
                  {category.label}
                </p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
