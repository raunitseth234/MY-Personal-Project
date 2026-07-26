'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Search } from 'lucide-react';
import { searchPhrases } from '@/lib/data';

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState('');

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phraseIndex];
      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      setText(current.slice(0, charIndex));

      let delay = deleting ? 30 : 65;
      if (!deleting && charIndex === current.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }
      timeout = setTimeout(tick, delay);
    };

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, [phrases]);

  return text;
}

export default function SearchBar({ variant = 'full' }: { variant?: 'full' | 'inline' }) {
  const typed = useTypewriter(searchPhrases);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const field = (
    <div className="flex w-full items-center gap-2 rounded-full border border-neutral-200 bg-white p-1.5 pl-4 shadow-sm transition duration-300 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
      <Search className="h-4 w-4 shrink-0 text-neutral-400" />
      <input
        type="search"
        aria-label="Search jewellery"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${typed}`}
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
      />
      <button
        type="button"
        aria-label="Search by voice"
        className="hidden shrink-0 rounded-full p-2 text-neutral-400 transition duration-200 hover:bg-ivory hover:text-maroon active:scale-95 sm:inline-flex"
      >
        <Mic className="h-4 w-4" />
      </button>
      <button
        type="submit"
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-maroon px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition duration-200 hover:bg-maroon-dark active:scale-95"
      >
        <Search className="h-3.5 w-3.5 md:hidden" />
        <span className="hidden md:inline">Search</span>
      </button>
    </div>
  );

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-md" role="search">
        {field}
      </form>
    );
  }

  return (
    <section className="bg-white py-4 md:py-6">
      <form onSubmit={handleSubmit} className="container" role="search">
        <div className="mx-auto max-w-3xl">{field}</div>
      </form>
    </section>
  );
}
