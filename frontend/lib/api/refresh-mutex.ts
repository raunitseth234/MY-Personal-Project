import { PUBLIC_API_URL } from './config';
import type { TokenResponse } from './types';

const BASE_URL = PUBLIC_API_URL;

let inFlight: Promise<TokenResponse> | null = null;

/**
 * Refresh tokens are single-use server-side (the old jti gets blacklisted on every
 * successful refresh). If two requests 401 near-simultaneously, they must share one
 * in-flight refresh call instead of both firing /auth/refresh, or the second call's
 * token has already been blacklisted by the first and the user gets force-logged-out.
 */
export function refreshTokens(refreshToken: string): Promise<TokenResponse> {
  if (inFlight) return inFlight;

  inFlight = fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
    .then(async (res) => {
      if (!res.ok) throw new Error('refresh_failed');
      return res.json() as Promise<TokenResponse>;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}
