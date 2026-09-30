# Mobile foundation

**Source tip:** `cursor/mobile-foundation-8606` @ `3058a0a`  
**Package:** `@skillswap/mobile` → `apps/mobile`  
**Date:** 2026-09-30 (inspection re-verify)

## Stack

| Piece | Version / choice |
|-------|------------------|
| Expo | ~53.0.20 |
| Expo Router | ~5.1.4 (`experiments.typedRoutes: true`) |
| React Native | 0.79.6 |
| React | 19.0.0 |
| Scheme | `skillswap` |
| Bundle IDs | `com.skillswap.mobile` (iOS/Android) |
| Metro port | 19000 |

## `packages/shared` types

File: `packages/shared/src/index.ts` (types only — no Zod/runtime schemas).

### `ApiErrorBody`

```ts
{
  error: {
    message: string;
    details?: unknown;
  };
}
```

### `UserSummary` / `SessionUser`

```ts
{
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
}
```

`SessionUser` is an alias of `UserSummary`.

### `AuthLoginRequest`

```ts
{ email: string; password: string; }
```

### `AuthRegisterRequest`

```ts
{ email: string; password: string; displayName: string; }
```

### `AuthSessionResponse`

```ts
{ user: SessionUser; }
```

Package metadata: `@skillswap/shared` `0.0.1`, `type: module`, exports `"."` → `./src/index.ts`.

## Ticket verification (CODE VERIFIED via inspection)

Re-checked on tip `3058a0a`. No functional changes made for this prep pass.

### SS-25 — Navigation shell — **CODE VERIFIED**

| Check | Evidence |
|-------|----------|
| Expo Router under `src/app/` | Present |
| `(auth)` group | `index`, `login`, `register` + `_layout` |
| `(app)` tabs | `dashboard`, `marketplace`, `matches`, `chat`, `profile` |
| Auth gate | Root `_layout.tsx` — `AuthGate` after `isHydrated` |
| Typed routes | `app.json` → `experiments.typedRoutes: true` |
| Feature screens | Placeholders only — no Figma redesign |

Runtime on device/simulator: **NOT TESTED** (Linux VM).

### SS-26 — Cookie-session client — **CODE VERIFIED**

| Check | Evidence |
|-------|----------|
| Typed `fetch` wrapper | `src/services/api/client.ts` |
| Default `credentials: 'include'` | `apiRequest` options |
| Auth helpers | `login` / `register` / `fetchSessionUser` / `logout` |
| Paths | `/auth/login`, `/auth/register`, `/auth/me`, `/auth/logout` |
| Boot hydrate | `SessionProvider` → `GET /auth/me` |
| 401 → clear session | `configureApiSessionHooks({ onUnauthorized })` |
| No JWT / Bearer / AsyncStorage / SecureStore | Grep: only docs forbidding them |

Native cookie set / persist / restore after kill: **NOT TESTED** (no `apps/api`, no simulators).

### SS-27 — Env + deep links — **CODE VERIFIED**

| Check | Evidence |
|-------|----------|
| `EXPO_PUBLIC_API_URL` / `EXPO_PUBLIC_APP_ENV` | `.env.example`, `env.ts`, `env-helpers.ts` |
| Local iOS default | `127.0.0.1:4000` |
| Local Android default | `10.0.2.2:4000` |
| Scheme | `skillswap` in `app.json` + `getMobileEnv()` |
| No secrets in public env | Example file is public URL + env name only |
| No committed LAN IP | Only `.env.example` present |

Device/tunnel runtime: **NOT TESTED**.

### SS-28 — UI primitives + theme — **CODE VERIFIED**

| Check | Evidence |
|-------|----------|
| Theme modules | `colors`, `typography`, `spacing`, `radii`, `useTheme` |
| Primitives | Button, TextInput, Card, Avatar, Badge, LoadingState, EmptyState, Screen |
| Theme consumption | Components import `@/theme` |
| SS-16 shared tokens | **ABSENT** — temporary teal-ink tokens marked for replacement |

## Key files to preserve

- `apps/mobile/src/app/**` — navigation shell
- `apps/mobile/src/services/api/**` — cookie client
- `apps/mobile/src/lib/session.tsx`, `env.ts`, `env-helpers.ts`
- `apps/mobile/src/theme/**`, `src/components/**`
- `apps/mobile/.env.example`
- `packages/shared/src/index.ts`

## What is not claimed

- Backend implemented
- Cookie persistence proven on iOS/Android
- SS-16 or full SS-24 complete
