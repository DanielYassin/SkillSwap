/**
 * Shared API error envelope expected from SkillSwap backends.
 * Shape: { error: { message: string; details?: unknown } }
 */
export type ApiErrorBody = {
  error: {
    message: string;
    details?: unknown;
  };
};

export type UserSummary = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
};

export type SessionUser = UserSummary;

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthRegisterRequest = {
  email: string;
  password: string;
  displayName: string;
};

export type AuthSessionResponse = {
  user: SessionUser;
};
