import { worldMoments } from '@/lib/data';
import FadeIn from './ui/FadeIn';
import SectionHeading from './ui/SectionHeading';
import ShimmerImage from './ui/ShimmerImage';

export default function WorldSection() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Step Into"
          title="Rajesh Jewellers World"
          subtitle="A companion for every occasion"
        />

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {worldMoments.map((moment, i) => (
            <FadeIn key={moment.title} delay={i * 0.08}>
              <a
                href="#"
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl"
              >
                <ShimmerImage
                  src={moment.image}
                  alt={moment.title}
                  sizes="(min-width: 1200px) 570px, 50vw"
                  className="group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-gold-light md:text-[10px]">
                    {moment.tag}
                  </p>
                  <p className="mt-1 font-serif text-lg leading-snug text-white md:text-2xl">
                    {moment.title}
                  </p>
                  <p className="mt-2 inline-block border-b border-gold/60 pb-0.5 text-[10px] uppercase tracking-[0.25em] text-white/80 transition duration-300 group-hover:border-gold group-hover:text-gold-light md:text-[11px]">
                    Explore
                  </p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
