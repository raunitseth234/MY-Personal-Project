'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';

/**
 * Client-side route guard only — tokens live in localStorage, which Next's edge/server
 * middleware cannot read, so middleware.ts isn't an option here without backend cookie support.
 */
export function useRequireAuth() {
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (hasHydrated && !user) {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`);
    }
  }, [hasHydrated, user, pathname, router]);

  return { user, isChecking: !hasHydrated, isAuthed: hasHydrated && !!user };
}
