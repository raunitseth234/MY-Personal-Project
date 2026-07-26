'use client';

import { usePathname } from 'next/navigation';
import CategoryNav from './CategoryNav';
import { isChromeHidden } from '@/lib/utils/chrome-visibility';
import type { Category } from '@/lib/api/types';

export default function ConditionalCategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  if (isChromeHidden(pathname)) return null;
  return <CategoryNav categories={categories} />;
}
