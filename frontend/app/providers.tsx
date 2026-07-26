'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useGuestWishlistStore } from '@/lib/stores/guest-wishlist-store';

const PERSISTED_STORES = [useAuthStore, useGuestWishlistStore] as const;

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    // skipHydration:true on every persisted store keeps the first client render identical
    // to the server's; rehydrating here (post-mount) avoids a hydration mismatch.
    const unsubs = PERSISTED_STORES.map((store) =>
      store.persist.onFinishHydration(() => {
        (store.getState() as { setHasHydrated?: () => void }).setHasHydrated?.();
      })
    );

    PERSISTED_STORES.forEach((store) => {
      store.persist.rehydrate();
    });

    return () => unsubs.forEach((unsub) => unsub());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: { fontFamily: 'var(--font-inter)' },
        }}
      />
    </QueryClientProvider>
  );
}
