function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `${name} is not set. Copy .env.example to .env.local (or set it in your deploy platform's env vars) before building or running this app.`
    );
  }
  return value.replace(/\/$/, '');
}

/** Public API base URL, reachable from the end user's browser. Inlined at build time. */
export const PUBLIC_API_URL = requireEnv('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);

/**
 * Server-side API base URL, used by Server Components (serverFetch). Defaults to
 * PUBLIC_API_URL but can be overridden with API_INTERNAL_URL when the server and the
 * browser reach the backend through different hosts (e.g. a Docker service name like
 * `http://api:8000/api/v1` internally vs. a public domain for the browser).
 */
export const SERVER_API_URL = (process.env.API_INTERNAL_URL || PUBLIC_API_URL).replace(/\/$/, '');
