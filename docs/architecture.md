# SkillSwap architecture

**Branch base:** `cursor/mobile-foundation-8606` @ `3058a0a`  
**Date:** 2026-09-30

## Product

SkillSwap is a skill-exchange marketplace. Users offer skills, browse others’ offerings, match, and chat to arrange swaps. Clients (mobile and eventually web) share one session-cookie auth model with a single API.

## Target monorepo

```text
skillswap/
  apps/
    mobile/     Expo React Native (Expo Router)
    web/        Web client (planned — not implemented)
    api/        HTTP API + session auth (planned — not implemented)
  packages/
    shared/     Shared TypeScript types / contracts
  docs/
  package.json
  pnpm-workspace.yaml
  pnpm-lock.yaml
  README.md
```

`pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

No Turbo (or other orchestrator) is required for the current slice.

## Current vs planned

| Package | Role | Current |
|---------|------|---------|
| `@skillswap/mobile` | Native client | **Present** — foundation |
| `apps/web` | Browser client | **Placeholder** (`README` + `.gitkeep`) |
| `apps/api` | Backend | **Placeholder** (`README` + `.gitkeep`) |
| `@skillswap/shared` | Cross-app types | **Present** — minimal API/session types |
| SS-16 tokens package | Design system | **Absent** |

## Session auth (intended)

```text
Mobile / Web
    │  fetch(..., { credentials: 'include' })
    ▼
apps/api  ──► httpOnly session cookie (Set-Cookie on login/register)
    │
    ├── POST /auth/login
    ├── POST /auth/register
    ├── GET  /auth/me
    └── POST /auth/logout
```

- Clients never store JWTs or Bearer tokens for auth.
- `401` clears client session state; navigation returns to the auth group.
- CORS must allow credentials once `apps/api` exists.

These paths and envelopes are **assumed** from `@skillswap/shared` and the mobile client until a real API is inspected.

## Shared package contract

See [mobile-foundation.md](./mobile-foundation.md#packagesshared-types) for the exact exported types. Shared is types-only today (no runtime validators, no Zod schemas).

## Mobile app layers

```text
apps/mobile/src/
  app/            Expo Router — (auth) + (app) groups, AuthGate
  components/     UI primitives (Button, TextInput, Card, …)
  lib/            env resolution, SessionProvider
  services/api/   typed fetch client + auth helpers
  theme/          temporary tokens (replace when SS-16 lands)
  types/          mobile-local env types
```

## Non-goals for this tree (so far)

- Inventing Express/Next stubs or fake business logic in `apps/api` / `apps/web`
- Second auth strategy (JWT, SecureStore tokens, etc.)
- Claiming SS-24 complete while api/web are empty
