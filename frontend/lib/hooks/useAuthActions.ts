'use client';

import { useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/endpoints/auth';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useGuestWishlistMerge } from './useGuestWishlistMerge';

export function useAuthActions() {
  const setSession = useAuthStore((s) => s.setSession);
  const clear = useAuthStore((s) => s.clear);
  const mergeGuestData = useGuestWishlistMerge();
  const queryClient = useQueryClient();

  async function login(identifier: string, password: string) {
    const tokens = await authApi.login({ identifier, password });
    setSession(tokens);
    await mergeGuestData();
    return tokens;
  }

  async function register(data: { name: string; email: string; phone: string; password: string }) {
    const tokens = await authApi.register(data);
    setSession(tokens);
    await mergeGuestData();
    return tokens;
  }

  async function logout() {
    const refreshToken = useAuthStore.getState().refreshToken;
    clear();
    queryClient.clear();
    if (refreshToken) {
      try {
        await authApi.logout(refreshToken);
      } catch {
        // best-effort — token is already cleared client-side regardless
      }
    }
  }

  return { login, register, logout };
}
