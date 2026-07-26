'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Phone, Sparkle } from 'lucide-react';
import { announcements as fallbackAnnouncements, brand } from '@/lib/data';
import type { Announcement } from '@/lib/api/types';

export default function AnnouncementBar({ announcements: realAnnouncements }: { announcements: Announcement[] }) {
  const messages = realAnnouncements.length > 0 ? realAnnouncements.map((a) => a.message) : fallbackAnnouncements;
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + messages.length) % messages.length, dir]);
  }, [messages.length]);

  const restartTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => go(1), 4000);
  }, [go]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restartTimer]);

  return (
    <div className="relative flex h-9 items-center justify-center overflow-hidden bg-maroon px-2 text-white md:justify-between md:px-6">
      <button
        aria-label="Previous announcement"
        onClick={() => {
          go(-1);
          restartTimer();
        }}
        className="absolute left-1.5 rounded-full p-1.5 text-white/70 transition duration-200 hover:bg-white/10 hover:text-white active:scale-95 md:hidden"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex flex-1 items-center justify-center md:flex-none md:justify-start">
        <Sparkle className="mr-2 hidden h-3 w-3 shrink-0 text-gold-light md:inline-block" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={{ opacity: 0, y: direction * 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="px-12 text-center text-[10px] uppercase tracking-[0.18em] md:px-0 md:text-left md:text-[11px]"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="hidden items-center gap-4 text-[11px] tracking-wide md:flex">
        <a
          href={brand.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition hover:text-gold-light"
        >
          <MapPin className="h-3.5 w-3.5" />
          Visit Our Store
        </a>
        <span className="h-3 w-px bg-white/30" />
        <a href={`tel:${brand.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 transition hover:text-gold-light">
          <Phone className="h-3.5 w-3.5" />
          {brand.phone}
        </a>
      </div>

      <button
        aria-label="Next announcement"
        onClick={() => {
          go(1);
          restartTimer();
        }}
        className="absolute right-1.5 rounded-full p-1.5 text-white/70 transition duration-200 hover:bg-white/10 hover:text-white active:scale-95 md:hidden"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
