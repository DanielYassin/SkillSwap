# SkillSwap

SkillSwap is a skill-exchange marketplace: people list what they can teach, discover matches, and chat to arrange swaps. This repository is the **pnpm monorepo** that will hold the mobile app, web client, and API.

**Current state:** mobile foundation is implemented and verified in code. `apps/api` and `apps/web` are **not implemented yet** (placeholders only). There is no live backend in this tree.

## Monorepo layout

```text
apps/
  mobile/     Expo React Native app (foundation — SS-25/26/27/28)
  web/        Placeholder — not implemented yet
  api/        Placeholder — not implemented yet
packages/
  shared/     Shared TypeScript types (API/session contracts)
docs/         Architecture, foundation, migration, status
```

| Path | Package | Status |
|------|---------|--------|
| `apps/mobile` | `@skillswap/mobile` | Implemented (Expo SDK 53) |
| `apps/web` | — | Placeholder only |
| `apps/api` | — | Placeholder only |
| `packages/shared` | `@skillswap/shared` | Minimal shared types |

Workspace: `pnpm-workspace.yaml` includes `apps/*` and `packages/*`. Package manager: **pnpm 10** (`packageManager` field in root `package.json`).

## Mobile stack

- **Expo SDK 53** + **Expo Router** (file-based routes, typed routes)
- **React Native 0.79** / React 19
- Cookie-session API client (`credentials: 'include'`) — **no JWT / Bearer / AsyncStorage / SecureStore auth**
- Temporary mobile theme tokens (SS-28); SS-16 shared design tokens are **not** in this repo yet
- Deep link scheme: `skillswap`

## Tickets (honest status)

| Ticket | Status | Notes |
|--------|--------|-------|
| **SS-24** monorepo | Partial | Mobile + shared + workspace present; api/web placeholders only |
| **SS-25** navigation shell | **CODE VERIFIED** | `(auth)` / `(app)` groups, auth gate, tabs |
| **SS-26** cookie session client | **CODE VERIFIED** | Runtime cookie persistence **NOT TESTED** (no API / simulators here) |
| **SS-27** env / deep links | **CODE VERIFIED** | `EXPO_PUBLIC_*`, scheme `skillswap` |
| **SS-28** UI primitives + theme | **CODE VERIFIED** | Temporary tokens; SS-16 **ABSENT** |
| **SS-16** design tokens | **ABSENT** | Blocks permanent theme |

## Blockers

1. **No `apps/api`** — cannot validate auth routes, CORS, cookie flags, or run a live login spike.
2. **No `apps/web`** — web client not started.
3. **SS-16** shared tokens missing — mobile theme is temporary.
4. **No iOS/Android runtime** in this Linux cloud VM — native cookie restore after kill is unproven.
5. This checkout currently tracks an **agent_temp** Origin remote; promoting to an official GitHub/Origin home is a **user** action (create/push when authorized).

## Requirements

- Node.js **20+**
- pnpm **10+**

## Install

```bash
pnpm install
```

## Run mobile

```bash
pnpm mobile
```

Expo Metro listens on port **19000** by default (`apps/mobile` scripts).

Copy env template before pointing at a real API:

```bash
cp apps/mobile/.env.example apps/mobile/.env
```

| Variable | Purpose |
|----------|---------|
| `EXPO_PUBLIC_API_URL` | API origin (public; no secrets) |
| `EXPO_PUBLIC_APP_ENV` | `local` \| `preview` \| `production` |

Local defaults when URL is unset: iOS Simulator `http://127.0.0.1:4000`, Android Emulator `http://10.0.2.2:4000`. Physical devices need a LAN or tunnel URL — do not commit a permanent LAN IP.

## Tests / typecheck / lint

From repo root:

```bash
pnpm typecheck
pnpm lint
pnpm test
```

Mobile-only:

```bash
pnpm mobile:typecheck
pnpm mobile:lint
pnpm --filter @skillswap/mobile test
```

## Documentation

| Doc | Contents |
|-----|----------|
| [docs/skillswap-repository-status.md](docs/skillswap-repository-status.md) | Audit status, remotes, SS tickets |
| [docs/architecture.md](docs/architecture.md) | Target monorepo architecture |
| [docs/mobile-foundation.md](docs/mobile-foundation.md) | Mobile stack + shared types + SS verification |
| [docs/migration-plan.md](docs/migration-plan.md) | Path to official repo / missing pieces |

## Auth model (do not diverge)

Mobile talks to the future API with **httpOnly session cookies** and `credentials: 'include'`. Assumed paths until a real API lands:

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`
- `POST /auth/logout`

Do **not** invent JWT, Bearer tokens, or local token storage as a workaround.
