import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, pages, onChange }: Props) {
  if (pages <= 1) return null;

  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === pages || Math.abs(n - page) <= 1
  );

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <button
        aria-label="Previous page"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="rounded-full p-2 text-neutral-500 transition hover:bg-ivory hover:text-maroon disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {nums.map((n, i) => (
        <span key={n} className="flex items-center">
          {i > 0 && nums[i - 1] !== n - 1 && <span className="px-1 text-neutral-300">…</span>}
          <button
            onClick={() => onChange(n)}
            className={`h-8 w-8 rounded-full text-sm transition ${
              n === page ? 'bg-maroon text-white' : 'text-neutral-600 hover:bg-ivory hover:text-maroon'
            }`}
          >
            {n}
          </button>
        </span>
      ))}

      <button
        aria-label="Next page"
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page >= pages}
        className="rounded-full p-2 text-neutral-500 transition hover:bg-ivory hover:text-maroon disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
