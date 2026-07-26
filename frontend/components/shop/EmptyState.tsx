import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { PackageSearch } from 'lucide-react';

interface Props {
  icon?: LucideIcon;
  title: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon: Icon = PackageSearch, title, message, actionLabel, actionHref }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-ivory/40 px-6 py-16 text-center">
      <Icon className="h-10 w-10 text-gold-dark" strokeWidth={1.5} />
      <p className="mt-4 font-serif text-xl text-maroon">{title}</p>
      {message && <p className="mt-2 max-w-sm text-sm text-neutral-500">{message}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 rounded-full bg-maroon px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition duration-200 hover:bg-maroon-dark active:scale-95"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
