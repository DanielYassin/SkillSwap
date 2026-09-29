import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SessionUser } from '@skillswap/shared';

export type SessionState = {
  user: SessionUser | null;
  isHydrated: boolean;
  isLoggedIn: boolean;
  setUser: (user: SessionUser | null) => void;
  clearSession: () => void;
  /**
   * Dev/mock sign-in used by placeholder auth screens until cookie session
   * (SS-26) is wired to a real backend. Replace call sites with API login.
   */
  mockSignIn: (user?: SessionUser) => void;
};

const SessionContext = createContext<SessionState | null>(null);

const MOCK_USER: SessionUser = {
  id: 'mock-user-1',
  email: 'demo@skillswap.local',
  displayName: 'Demo Learner',
  avatarUrl: null,
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<SessionUser | null>(null);
  const [isHydrated] = useState(true);

  const setUser = useCallback((next: SessionUser | null) => {
    setUserState(next);
  }, []);

  const clearSession = useCallback(() => {
    setUserState(null);
  }, []);

  const mockSignIn = useCallback((next?: SessionUser) => {
    setUserState(next ?? MOCK_USER);
  }, []);

  const value = useMemo<SessionState>(
    () => ({
      user,
      isHydrated,
      isLoggedIn: user !== null,
      setUser,
      clearSession,
      mockSignIn,
    }),
    [user, isHydrated, setUser, clearSession, mockSignIn],
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
