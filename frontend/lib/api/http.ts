import { useAuthStore } from '@/lib/stores/auth-store';
import { refreshTokens } from './refresh-mutex';
import { PUBLIC_API_URL } from './config';
import type { ApiError } from './types';

const BASE_URL = PUBLIC_API_URL;

/**
 * The backend returns error bodies in more than one shape depending on which handler
 * produced them: {"error":{code,message}} for HTTPExceptions and the 500/404 handlers,
 * {"detail":[{loc,msg,type}, ...]} for Pydantic 422 validation errors, and occasionally
 * a plain {"detail": "string"}. This normalizes all of them into one shape.
 */
async function parseError(res: Response): Promise<ApiError> {
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body
  }

  if (body && typeof body === 'object') {
    const b = body as Record<string, unknown>;

    if (b.error && typeof b.error === 'object') {
      const e = b.error as Record<string, unknown>;
      return {
        status: res.status,
        code: typeof e.code === 'string' ? e.code : 'UNKNOWN',
        message: typeof e.message === 'string' ? e.message : 'Something went wrong. Please try again.',
      };
    }

    if (Array.isArray(b.detail)) {
      const fieldErrors: Record<string, string> = {};
      for (const item of b.detail as Array<Record<string, unknown>>) {
        const loc = Array.isArray(item.loc) ? item.loc : [];
        const field = String(loc[loc.length - 1] ?? 'form');
        fieldErrors[field] = typeof item.msg === 'string' ? item.msg : 'Invalid value';
      }
      return {
        status: res.status,
        code: 'VALIDATION_ERROR',
        message: 'Please check the highlighted fields.',
        fieldErrors,
      };
    }

    if (b.detail && typeof b.detail === 'object') {
      const d = b.detail as Record<string, unknown>;
      return {
        status: res.status,
        code: typeof d.code === 'string' ? d.code : 'UNKNOWN',
        message: typeof d.message === 'string' ? d.message : 'Something went wrong. Please try again.',
      };
    }

    if (typeof b.detail === 'string') {
      return { status: res.status, code: 'ERROR', message: b.detail };
    }
  }

  return {
    status: res.status,
    code: 'UNKNOWN',
    message: `Request failed (${res.status}). Please try again.`,
  };
}

interface RequestOptions extends RequestInit {
  /** Set false to skip attaching the Bearer header even if a token exists (e.g. login/register). */
  auth?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}, retry = true): Promise<T> {
  const { auth = true, headers: optHeaders, ...rest } = options;
  const { accessToken } = useAuthStore.getState();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(optHeaders as Record<string, string>),
  };
  if (auth && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...rest, headers });

  if (res.status === 401 && retry && auth) {
    const { refreshToken, clear } = useAuthStore.getState();
    if (refreshToken) {
      try {
        const tokens = await refreshTokens(refreshToken);
        useAuthStore.getState().setSession(tokens);
        return request<T>(path, options, false);
      } catch {
        clear();
        throw await parseError(res);
      }
    }
  }

  if (!res.ok) {
    throw await parseError(res);
  }

  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const http = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'DELETE' }),
};

export function isApiError(err: unknown): err is ApiError {
  return typeof err === 'object' && err !== null && 'status' in err && 'code' in err;
}
