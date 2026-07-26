import FadeIn from './FadeIn';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, subtitle, dark = false }: Props) {
  return (
    <FadeIn className="mx-auto mb-10 max-w-2xl px-4 text-center md:mb-14">
      {eyebrow && (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl ${dark ? 'text-white' : 'text-maroon'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 font-display text-lg italic md:text-xl ${
            dark ? 'text-white/70' : 'text-neutral-500'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-5 h-px w-16 bg-gold" />
    </FadeIn>
  );
}
