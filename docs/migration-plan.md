# Migration plan — official SkillSwap repository

**Date:** 2026-09-30  
**User confirmation:** Official SkillSwap monorepo does **not** exist yet.  
**Prep base:** `cursor/mobile-foundation-8606` @ `3058a0a`  
**This pass:** Local preparation only — **no GitHub create, no push**.

## Current state

| Item | Status |
|------|--------|
| Working branch | `cursor/mobile-foundation-8606` |
| Tip (pre-prep) | `3058a0a` — Wire cookie-session login and session hydrate for mobile |
| Remote today | agent_temp Origin (`tmp-e8384e4fe2208001`) — not the official home |
| `apps/mobile` | Present (Expo foundation) |
| `packages/shared` | Present (minimal types) |
| `apps/api` / `apps/web` | Placeholders only (not implemented) |
| Secrets in tree | None committed (`.env` gitignored; only `.env.example`) |

## Foundation recovered

History on this branch (newest first):

1. `3058a0a` — Wire cookie-session login and session hydrate for mobile  
2. `b448dc1` — Polish mobile foundation after verification pass  
3. `cef5d7c` — Add SkillSwap mobile foundation (SS-27/25/26/28)  
4. `9824bf3` — Initialize project  

Recovered / verified deliverables:

- Expo mobile app with auth/app navigation (SS-25)
- Cookie-session API client + session hydrate (SS-26)
- Public env helpers + scheme (SS-27)
- Theme + UI primitives with temporary tokens (SS-28)
- `@skillswap/shared` session/API types
- Root pnpm workspace + lockfile

## Target structure

```text
apps/mobile          # keep foundation
apps/web             # implement later (placeholder now)
apps/api             # implement later (placeholder now)
packages/shared      # keep; grow when API lands
docs/                # status, architecture, foundation, migration
package.json
pnpm-workspace.yaml
pnpm-lock.yaml
README.md
.gitignore
```

When the user creates an official GitHub/Origin repo, this tree (minus agent_temp remote identity) is what should be published as the initial commit / push.

## Missing pieces

| Gap | Impact |
|-----|--------|
| **Backend (`apps/api`)** | Blocks live auth, CORS/cookie flag validation, SS-26 runtime spike |
| **Web (`apps/web`)** | No browser client |
| **SS-24 completeness** | Monorepo skeleton yes; full product monorepo no |
| **SS-16 design tokens** | Theme remains temporary in mobile |
| **Official remote** | User must create/link GitHub (or Origin) when ready — agents must not invent it |
| **Device/simulators** | Cookie kill→restore unproven on this VM |

Do **not** invent Express/Next apps, fake endpoints, JWT, or business logic to fill gaps.

## Next steps (ordered)

1. **User creates** the official SkillSwap GitHub (or Origin) repository when ready.  
2. Point a clean remote at that repo; push this prepared tree (authorized push only).  
3. Implement real `apps/api` with cookie session + CORS credentials (reconcile paths with mobile `AUTH_PATHS`).  
4. Reconcile `@skillswap/shared` with the real API contracts — do not blindly overwrite.  
5. Run SS-26 on iOS Simulator + Android Emulator (login → kill → cold start → `/auth/me`).  
6. Land SS-16 tokens; replace `apps/mobile/src/theme` temporary values.  
7. Scaffold real `apps/web` against the same cookie session model.  
8. Open PRs on the **standard** remote only.

## Risks

| Risk | Mitigation |
|------|------------|
| Treating agent_temp as the official product home | Publish only after user creates the official remote |
| Inventing fake `apps/api` / JWT to “unblock” mobile | Keep placeholders; wait for real backend |
| Overwriting a future real shared package | Diff/reconcile types before merge |
| Assumed `/auth/*` paths mismatch real API | Inspect API first; adjust `AUTH_PATHS` + shared types only |
| Continuing feature work on agent_temp | Prefer official remote before deep product work |
| Touching Mac `Skilswap` XAMPP sandbox | Out of scope — not the monorepo |

## Validations after official publish / API land

1. Secrets scan — no `.env`, keys, or tokens in git history of the published tree  
2. `pnpm install` + `pnpm typecheck` + `pnpm lint` + `pnpm test`  
3. Mobile Metro starts (`pnpm mobile`)  
4. Diff auth routes vs real `apps/api`  
5. iOS + Android cookie spike  
6. Confirm README does not claim backend done  

## Prep checklist (this pass)

- [x] Work from foundation tip `3058a0a`  
- [x] Align folder layout (placeholders for api/web)  
- [x] Professional README (honest about missing backend)  
- [x] In-repo docs (status, architecture, foundation, migration)  
- [x] Secrets / `.gitignore` verified  
- [x] Local commit(s) only — **no push, no GitHub create**
