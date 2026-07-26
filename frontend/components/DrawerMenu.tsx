'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  MapPin,
  User,
  X,
  Youtube,
} from 'lucide-react';
import { brand } from '@/lib/data';
import type { Category, User as ApiUser } from '@/lib/api/types';

type Props = {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  user: ApiUser | null;
};

const MotionLink = motion.create(Link);

const listVariants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.045, delayChildren: 0.12 },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: -18 },
  open: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function DrawerMenu({ open, onClose, categories, user }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const accountLinks = [
    { label: 'My Account', href: user ? '/account' : '/login', icon: User },
    { label: 'Wishlist', href: '/wishlist', icon: Heart },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
              <div className="leading-tight">
                <p className="font-serif text-lg font-semibold text-maroon">
                  {brand.firm}
                </p>
                <p className="font-serif text-sm font-semibold text-maroon">
                  {brand.unitLine}
                </p>
              </div>
              <button
                aria-label="Close menu"
                onClick={onClose}
                className="rounded-full p-2 text-neutral-500 transition duration-200 hover:bg-neutral-100 hover:text-maroon active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              className="flex-1 overflow-y-auto px-2 py-4"
            >
              <p className="px-4 pb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-gold-dark">
                Shop by Category
              </p>
              <MotionLink
                variants={itemVariants}
                href="/products"
                onClick={onClose}
                className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm text-neutral-700 transition duration-200 hover:bg-ivory hover:text-maroon"
              >
                All Jewellery
                <ChevronRight className="h-4 w-4 text-gold" />
              </MotionLink>
              {categories.map((category) => (
                <MotionLink
                  key={category.id}
                  variants={itemVariants}
                  href={`/products?category_slug=${category.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm text-neutral-700 transition duration-200 hover:bg-ivory hover:text-maroon"
                >
                  {category.name}
                  <ChevronRight className="h-4 w-4 text-gold" />
                </MotionLink>
              ))}

              <div className="mx-4 my-4 h-px bg-neutral-100" />

              <p className="px-4 pb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-gold-dark">
                Account
              </p>
              {accountLinks.map((link) => (
                <MotionLink
                  key={link.label}
                  variants={itemVariants}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-neutral-700 transition duration-200 hover:bg-ivory hover:text-maroon"
                >
                  <link.icon className="h-4 w-4 text-gold" />
                  {link.label}
                </MotionLink>
              ))}
              <motion.a
                variants={itemVariants}
                href={brand.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-neutral-700 transition duration-200 hover:bg-ivory hover:text-maroon"
              >
                <MapPin className="h-4 w-4 text-gold" />
                Locate Our Store
              </motion.a>
            </motion.div>

            <div className="border-t border-neutral-100 px-5 py-4">
              <div className="mb-3 flex items-center gap-4 text-neutral-500">
                <a href="#" aria-label="Instagram" className="transition hover:text-maroon">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Facebook" className="transition hover:text-maroon">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" aria-label="YouTube" className="transition hover:text-maroon">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
              <p className="text-[10px] leading-relaxed text-neutral-400">
                {brand.nameHindi} · {brand.firm}
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
