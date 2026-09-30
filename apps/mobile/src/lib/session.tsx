import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  AuthLoginRequest,
  AuthRegisterRequest,
  SessionUser,
} from '@skillswap/shared';
import {
  fetchSessionUser,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from '@/services/api/auth';
import { configureApiSessionHooks } from '@/services/api';

export type SessionState = {
  user: SessionUser | null;
  /** False until the first cookie session check (`GET /auth/me`) finishes. */
  isHydrated: boolean;
  isLoggedIn: boolean;
  setUser: (user: SessionUser | null) => void;
  clearSession: () => void;
  /** Login via API; session cookie is the auth source (credentials: include). */
  signIn: (credentials: AuthLoginRequest) => Promise<SessionUser>;
  /** Register via API; same cookie session as login. */
  signUp: (input: AuthRegisterRequest) => Promise<SessionUser>;
  /** Logout via API then clear local session. */
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<SessionUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const setUser = useCallback((next: SessionUser | null) => {
    setUserState(next);
  }, []);

  const clearSession = useCallback(() => {
    setUserState(null);
  }, []);

  useEffect(() => {
    configureApiSessionHooks({
      onUnauthorized: () => {
        setUserState(null);
      },
    });

    let cancelled = false;

    void (async () => {
      try {
        const next = await fetchSessionUser();
        if (!cancelled) {
          setUserState(next);
        }
      } catch {
        // 401 / network / unreachable API → treat as signed out. Cookie jar
        // (if any) remains the server's concern; we never store tokens locally.
        if (!cancelled) {
          setUserState(null);
        }
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (credentials: AuthLoginRequest) => {
    const next = await apiLogin(credentials);
    setUserState(next);
    return next;
  }, []);

  const signUp = useCallback(async (input: AuthRegisterRequest) => {
    const next = await apiRegister(input);
    setUserState(next);
    return next;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // Still clear local state so the auth gate returns to (auth).
    } finally {
      setUserState(null);
    }
  }, []);

  const value = useMemo<SessionState>(
    () => ({
      user,
      isHydrated,
      isLoggedIn: user !== null,
      setUser,
      clearSession,
      signIn,
      signUp,
      signOut,
    }),
    [user, isHydrated, setUser, clearSession, signIn, signUp, signOut],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return ctx;
}
