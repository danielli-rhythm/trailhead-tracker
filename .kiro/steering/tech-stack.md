# Steering — Tech Stack

These choices are **pinned**. Do not substitute alternatives without asking.

## Frontend
- **React** via `create-react-app` (CRA). Yes, CRA is deprecated upstream; we're using it anyway because the user explicitly asked for it. If CRA fails to install or refuses to scaffold, stop and ask before switching to Vite.
- **react-router-dom v6** for routing
- **uuid** for client-side id generation
- **No UI framework** (no MUI, no Tailwind, no Chakra) — plain CSS in `src/styles/global.css`
- **No state library** (no Redux, no Zustand) — React Context + `useReducer` only

## Persistence
- **Phase 1: `localStorage`** behind an adapter
- **Phase 2 (future): API Gateway + Lambda + DynamoDB** — not built yet, but the data-layer abstraction must support it without UI changes

## Hosting
- **AWS Amplify Hosting** — the user explicitly chose this
- Amplify manages S3 + CloudFront under the hood; we do not provision them directly
- Build artifacts come from `npm run build` (the standard CRA `build/` directory)

## Tooling
- **Node.js 18+**, npm
- **Git** from day 1
- **AWS CLI v2** for any AWS operations (profile: see `aws-access.md`)
- **Amplify CLI** optional; AWS CLI alone is sufficient

## Things to avoid
- Don't add TypeScript unless asked — the user said "create-react-app" without `--template typescript`
- Don't add testing libraries beyond what CRA ships with (Jest + React Testing Library are already there)
- Don't add server-side rendering, Next.js, or any non-static build target
- Don't reach for npm packages to solve problems plain React handles fine
