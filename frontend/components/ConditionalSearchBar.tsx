'use client';

import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { isChromeHidden } from '@/lib/utils/chrome-visibility';

export default function ConditionalSearchBar() {
  const pathname = usePathname();
  if (isChromeHidden(pathname)) return null;
  return (
    <div className="md:hidden">
      <SearchBar />
    </div>
  );
}
