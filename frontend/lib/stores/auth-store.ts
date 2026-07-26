import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/api/types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  hasHydrated: boolean;
  setSession: (tokens: { access_token: string; refresh_token: string; user: User }) => void;
  updateUser: (user: User) => void;
  clear: () => void;
  setHasHydrated: () => void;
}

/**
 * skipHydration + a manual rehydrate() call from app/providers.tsx (post-mount) keeps the
 * client's first render identical to the server's (both start from these defaults), avoiding
 * a hydration mismatch. hasHydrated flips true once the persisted value has actually loaded.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      hasHydrated: false,
      setSession: ({ access_token, refresh_token, user }) =>
        set({ accessToken: access_token, refreshToken: refresh_token, user }),
      updateUser: (user) => set({ user }),
      clear: () => set({ accessToken: null, refreshToken: null, user: null }),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'rj-auth',
      skipHydration: true,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
