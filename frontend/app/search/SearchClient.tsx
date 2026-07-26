'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchQuery } from '@/lib/queries/search';
import ProductGrid from '@/components/shop/ProductGrid';
import Pagination from '@/components/shop/Pagination';
import SectionHeading from '@/components/ui/SectionHeading';

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError } = useSearchQuery(q, page);

  return (
    <div className="container py-10 md:py-14">
      <SectionHeading
        eyebrow="Search Results"
        title={q ? `"${q}"` : 'Search'}
        subtitle={data ? `${data.total} result${data.total === 1 ? '' : 's'}` : undefined}
      />

      {!q ? (
        <p className="text-center text-sm text-neutral-500">Enter a search term to find jewellery.</p>
      ) : (
        <>
          <ProductGrid
            items={data?.items ?? []}
            isLoading={isLoading}
            isError={isError}
            emptyTitle="No results found"
            emptyMessage={`We couldn't find anything matching "${q}". Try a different search term.`}
          />
          {data && (
            <Pagination
              page={data.page}
              pages={data.pages}
              onChange={(p) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('page', String(p));
                router.push(`/search?${params}`, { scroll: false });
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
