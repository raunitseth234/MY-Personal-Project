'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Smartphone,
  Store,
  User,
  Youtube,
} from 'lucide-react';
import { brand } from '@/lib/data';
import type { Category } from '@/lib/api/types';
import { useAuthStore } from '@/lib/stores/auth-store';
import DrawerMenu from './DrawerMenu';
import SearchBar from './SearchBar';

export default function Header({ categories }: { categories: Category[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur transition-all duration-300 relative ${
          scrolled ? 'shadow-[0_10px_30px_rgba(20,10,15,0.08)]' : ''
        }`}
      >
        <Image
          src="/logo.png"
          alt={brand.name}
          width={160}
          height={160}
          className="absolute left-0 top-1/2 h-16 w-16 shrink-0 -translate-y-1/2 object-contain md:h-24 md:w-24"
        />
        <div
          className={`container relative flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'py-2' : 'py-3 md:py-4'
          }`}
        >
          <button
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full p-2 text-neutral-700 transition duration-200 hover:bg-ivory hover:text-maroon active:scale-95 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex flex-col items-center text-center leading-none">
            <span className="mb-1 text-[10px] font-medium tracking-[0.25em] text-gold-dark">
              {brand.nameHindi}
            </span>
            <span
              className={`font-serif font-semibold text-maroon transition-all duration-300 ${
                scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
              }`}
            >
              {brand.firm}
            </span>
            <span
              className={`font-serif font-semibold text-maroon transition-all duration-300 ${
                scrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'
              }`}
            >
              {brand.unitLine}
            </span>
          </Link>

          <div className="hidden flex-1 justify-center px-6 md:flex lg:px-10">
            <SearchBar variant="inline" />
          </div>

          <div className="flex items-center gap-0.5 md:hidden">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="rounded-full p-2 text-neutral-700 transition duration-200 hover:bg-ivory hover:text-maroon active:scale-95"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href={user ? '/account' : '/login'}
              aria-label="Account"
              className="rounded-full p-2 text-neutral-700 transition duration-200 hover:bg-ivory hover:text-maroon active:scale-95"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <a
              href={brand.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Locate our store"
              className="flex flex-col items-center gap-1 text-neutral-700 transition duration-200 hover:text-maroon active:scale-95"
            >
              <Store className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wide">Store Locator</span>
            </a>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="flex flex-col items-center gap-1 text-neutral-700 transition duration-200 hover:text-maroon active:scale-95"
            >
              <Heart className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wide">Wishlist</span>
            </Link>
            <Link
              href={user ? '/account' : '/login'}
              aria-label="Account"
              className="flex flex-col items-center gap-1 text-neutral-700 transition duration-200 hover:text-maroon active:scale-95"
            >
              <User className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wide">Account</span>
            </Link>
          </div>
        </div>

        <div
          className={`grid transition-all duration-300 md:hidden ${
            scrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex items-center justify-center gap-3 border-t border-neutral-100 py-2 text-[11px] text-neutral-600 md:gap-5">
              <a
                href="#"
                className="flex items-center gap-1.5 transition hover:text-maroon"
              >
                <MapPin className="h-3 w-3 text-gold-dark" />
                Locate Our Store
              </a>
              <span className="h-3 w-px bg-neutral-200" />
              <a
                href="#"
                className="flex items-center gap-1.5 transition hover:text-maroon"
              >
                <Smartphone className="h-3 w-3 text-gold-dark" />
                Download Our App
              </a>
              <span className="h-3 w-px bg-neutral-200" />
              <span className="flex items-center gap-3 text-neutral-500">
                <a href="#" aria-label="Instagram" className="transition hover:text-maroon">
                  <Instagram className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="Facebook" className="transition hover:text-maroon">
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="YouTube" className="transition hover:text-maroon">
                  <Youtube className="h-3.5 w-3.5" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>

      <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} categories={categories} user={user} />
    </>
  );
}
