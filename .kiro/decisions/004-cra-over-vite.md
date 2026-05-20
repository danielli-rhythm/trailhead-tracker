# ADR 004 — Create React App over Vite

**Date:** 2026-05-20  
**Status:** Accepted

## Context

A React scaffolding tool is needed. CRA is deprecated upstream but the user explicitly requested it. Vite is the modern default for new React projects.

## Decision

Use `create-react-app` as requested. The project uses CRA's built-in webpack config, Jest test runner, and build pipeline without ejecting.

## Alternatives

1. **Vite** — faster dev server and builds, actively maintained, but the user specifically asked for CRA.
2. **Next.js** — adds SSR/SSG capabilities, but the project requires a pure static SPA (requirement N1).
3. **Manual webpack config** — maximum control, but unnecessary maintenance burden for a simple CRUD app.

## Consequences

- Dev server shows deprecation warnings on Node 20+ (cosmetic, no functional impact).
- CRA will not receive new features; if a blocking bug is found, ejecting or migrating to Vite becomes necessary.
- Jest + React Testing Library are pre-configured with zero setup.
- `npm run build` produces a standard `build/` directory compatible with Amplify Hosting's expected artifact path.
