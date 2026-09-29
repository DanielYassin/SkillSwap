import { env } from '@/lib/env';
import { ApiError, parseApiError } from './errors';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiRequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /**
   * When true (default), send cookies via credentials: 'include'.
   * Required for httpOnly session cookies once the backend CORS + SameSite
   * policy allows the native client (see SS-26 spike doc).
   */
  credentials?: RequestCredentials;
};

export type SessionHooks = {
  /**
   * Called on HTTP 401. Must clear session state so the root layout
   * navigates to (auth). Keep navigation out of the API layer.
   */
  onUnauthorized?: () => void;
};

let sessionHooks: SessionHooks = {};

export function configureApiSessionHooks(hooks: SessionHooks): void {
  sessionHooks = hooks;
}

function buildUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = env.apiUrl.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    signal,
    credentials = 'include',
  } = options;

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  };

  let payload: BodyInit | undefined;
  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers: requestHeaders,
    body: payload,
    credentials,
    signal,
  });

  if (response.status === 401) {
    sessionHooks.onUnauthorized?.();
    throw await parseApiError(response);
  }

  if (!response.ok) {
    throw await parseApiError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new ApiError(
      `Expected JSON response, got ${contentType || 'unknown content-type'}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export const api = {
  get: <T>(path: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'DELETE' }),
};
