import { SERVER_API_URL as BASE_URL } from './config';

/**
 * Fetch for use inside Server Components (layout.tsx, page.tsx). No auth header (these
 * are all public homepage/catalog endpoints), and never throws — callers fall back to
 * lib/data.ts on any failure so the homepage still renders if the backend is unreachable.
 */
export async function serverFetch<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
