# SkillSwap Mobile

Expo (React Native) app for SkillSwap. Deep link scheme: `skillswap`.

## Run

From repo root:

```bash
pnpm install
pnpm mobile
```

## Environment (SS-27)

Copy `.env.example` → `.env`. Only `EXPO_PUBLIC_*` values are available in the client — never put secrets there.

| Variable | Purpose |
|----------|---------|
| `EXPO_PUBLIC_API_URL` | API origin used by the typed client |
| `EXPO_PUBLIC_APP_ENV` | `local` \| `preview` \| `production` |

Host awareness for local API:

- iOS Simulator → `127.0.0.1`
- Android Emulator → `10.0.2.2`
- Physical device → set `EXPO_PUBLIC_API_URL` to a reachable host (LAN or tunnel). Do not commit a permanent LAN IP.

`src/lib/env.ts` / `env-helpers.ts` resolve a platform-aware default when `EXPO_PUBLIC_API_URL` is unset in local mode.

## Auth (SS-26)

- Typed client always uses `credentials: 'include'` (httpOnly cookie session — same model as web).
- Boot: `GET /auth/me` hydrates session; login/register set the cookie; logout + 401 clear session → auth gate.
- **No** JWT / Bearer / AsyncStorage / SecureStore auth path.

## Structure

```text
src/
  app/           Expo Router routes
  components/    UI primitives (SS-28)
  hooks/
  lib/           env, session
  services/api/  typed fetch client (SS-26)
  theme/         design tokens (SS-28)
  types/
```
