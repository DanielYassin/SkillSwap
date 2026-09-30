import type {
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthSessionResponse,
  SessionUser,
} from '@skillswap/shared';
import { api } from './client';

/**
 * Cookie-session auth against the SkillSwap API contract.
 *
 * Paths mirror the shared web/API session surface once `apps/api` is present:
 * login/register set an httpOnly session cookie; `me` reads it; logout clears it.
 * Do not add Bearer/JWT or local token storage here.
 */
export const AUTH_PATHS = {
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  logout: '/auth/logout',
} as const;

export async function login(body: AuthLoginRequest): Promise<SessionUser> {
  const response = await api.post<AuthSessionResponse>(AUTH_PATHS.login, body);
  return response.user;
}

export async function register(body: AuthRegisterRequest): Promise<SessionUser> {
  const response = await api.post<AuthSessionResponse>(AUTH_PATHS.register, body);
  return response.user;
}

/**
 * Returns the current session user when a valid cookie is present.
 * Throws ApiError on 401 (and triggers onUnauthorized via the client).
 */
export async function fetchSessionUser(): Promise<SessionUser> {
  const response = await api.get<AuthSessionResponse>(AUTH_PATHS.me);
  return response.user;
}

/**
 * Best-effort logout. A failed network call still clears local session state
 * at the call site — the server cookie may linger until TTL if unreachable.
 */
export async function logout(): Promise<void> {
  await api.post<void>(AUTH_PATHS.logout);
}
