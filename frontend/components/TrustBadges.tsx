'use client';

import { BadgeCheck, Percent, RefreshCw, ShieldCheck, type LucideIcon } from 'lucide-react';
import { trustBadges } from '@/lib/data';

const icons: Record<string, LucideIcon> = {
  ShieldCheck,
  BadgeCheck,
  RefreshCw,
  Percent,
};

export default function TrustBadges() {
  return (
    <section className="border-b border-neutral-100 bg-ivory">
      <div className="container">
        <div className="grid grid-cols-2 gap-y-5 py-5 md:grid-cols-4 md:gap-y-0 md:py-6">
          {trustBadges.map((badge) => {
            const Icon = icons[badge.icon];
            return (
              <div
                key={badge.title}
                className="flex items-center justify-center gap-2.5 px-2 text-center md:justify-start md:text-left"
              >
                <Icon className="h-6 w-6 shrink-0 text-gold-dark" strokeWidth={1.5} />
                <p className="text-[11px] font-medium leading-tight text-neutral-700 md:text-xs">
                  {badge.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
