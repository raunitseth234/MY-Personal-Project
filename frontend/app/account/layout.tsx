'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, MapPin, User } from 'lucide-react';
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import { useAuthActions } from '@/lib/hooks/useAuthActions';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/account', label: 'Profile', icon: User },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isChecking, isAuthed } = useRequireAuth();
  const pathname = usePathname();
  const { logout } = useAuthActions();
  const router = useRouter();

  if (isChecking || !isAuthed) {
    return <div className="container py-20 text-center text-sm text-neutral-400">Loading your account…</div>;
  }

  return (
    <div className="container grid gap-8 py-10 md:grid-cols-[220px_1fr] md:py-14">
      <aside className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                active ? 'bg-maroon text-white' : 'text-neutral-600 hover:bg-ivory hover:text-maroon'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={async () => {
            await logout();
            router.push('/');
          }}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-neutral-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </aside>

      <div>{children}</div>
    </div>
  );
}
