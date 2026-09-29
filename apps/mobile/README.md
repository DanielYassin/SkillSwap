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
- Physical device → your machine LAN IP

`src/lib/env.ts` resolves a platform-aware default when `EXPO_PUBLIC_API_URL` is unset in local mode.

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
