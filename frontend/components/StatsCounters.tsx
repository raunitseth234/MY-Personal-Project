'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { stats as fallbackStats } from '@/lib/data';
import type { TrustStats } from '@/lib/api/types';

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1700;
    let raf = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="px-6 py-8 text-center md:py-4">
      <p className="font-serif text-4xl text-maroon md:text-5xl">
        {display.toLocaleString('en-IN')}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500">
        {label}
      </p>
    </div>
  );
}

export default function StatsCounters({ trustStats }: { trustStats: TrustStats | null }) {
  const stats = trustStats
    ? [
        { value: trustStats.years_of_trust, suffix: '+', label: 'Years of Trust' },
        { value: trustStats.happy_customers, suffix: '+', label: 'Happy Customers' },
        { value: parseFloat(trustStats.purity_guarantee) || 100, suffix: '%', label: 'Hallmarked Jewellery' },
      ]
    : fallbackStats;

  return (
    <section className="border-y border-gold/20 bg-ivory py-10 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 divide-y divide-gold/25 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
