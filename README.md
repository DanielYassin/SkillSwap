# SkillSwap

pnpm monorepo for SkillSwap. Mobile foundation lives in `apps/mobile` (Expo + Expo Router).

## Requirements

- Node.js 20+
- pnpm 10+

## Setup

```bash
pnpm install
```

## Mobile app

```bash
# Start Expo (Metro)
pnpm mobile

# Typecheck / lint
pnpm mobile:typecheck
pnpm mobile:lint
```

Copy `apps/mobile/.env.example` to `apps/mobile/.env` and set `EXPO_PUBLIC_API_URL` for your target (see SS-27 notes in the mobile README).

Deep link scheme: `skillswap`.

## Packages

| Package | Path | Role |
|---------|------|------|
| `@skillswap/mobile` | `apps/mobile` | Expo React Native app |
| `@skillswap/shared` | `packages/shared` | Shared TypeScript types |
