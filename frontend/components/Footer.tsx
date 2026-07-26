'use client';

import { useState } from 'react';
import {
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Send,
  Youtube,
} from 'lucide-react';
import { brand, quickLinks } from '@/lib/data';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-maroon-deep text-white/80">
      <div className="container grid gap-10 py-14 md:grid-cols-2 md:py-20 lg:grid-cols-4">
        <div>
          <p className="text-[11px] tracking-[0.25em] text-gold-light">
            {brand.nameHindi}
          </p>
          <p className="mt-1 font-serif text-2xl font-semibold text-white">
            {brand.firm}
          </p>
          <p className="mt-1 font-serif text-lg font-semibold text-gold-light">
            {brand.unitLine}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Exquisite gold, diamond and bridal jewellery, crafted with devotion
            and trusted across generations.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
              { label: 'Facebook', icon: <Facebook className="h-4 w-4" /> },
              { label: 'YouTube', icon: <Youtube className="h-4 w-4" /> },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition duration-300 hover:border-gold hover:text-gold-light active:scale-95"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            Visit Our Store
          </h4>
          <ul className="space-y-3.5 text-sm text-white/65">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{brand.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="transition hover:text-gold-light">
                {brand.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{brand.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link}>
                <a
                  href={
                    link === 'Our Collections'
                      ? '/products'
                      : link === 'Store Locator'
                        ? brand.mapsUrl
                        : '#'
                  }
                  target={link === 'Store Locator' ? '_blank' : undefined}
                  rel={link === 'Store Locator' ? 'noopener noreferrer' : undefined}
                  className="text-white/65 transition duration-200 hover:text-gold-light"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            Stay In Touch
          </h4>
          <p className="text-sm leading-relaxed text-white/60">
            New collections, festive offers and gold rate updates, straight to
            your inbox.
          </p>
          {subscribed ? (
            <p className="mt-4 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-light">
              Thank you for subscribing. Shubh ho!
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="mt-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 pl-4 transition duration-300 focus-within:border-gold/60"
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-maroon-deep transition duration-200 hover:bg-gold-light active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-center text-[11px] text-white/50 md:flex-row md:text-left">
          <p>
            © 2026 Rajesh Jewellers — A unit of Shree Vishwanath Prasad Seth.
            All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <a href="#" className="transition hover:text-gold-light">
              Privacy Policy
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a href="#" className="transition hover:text-gold-light">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
