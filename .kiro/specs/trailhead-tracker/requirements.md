# Requirements — Trailhead Tracker

## Purpose

A personal CRUD web app to track progress through Salesforce Trailhead modules,
trails, and superbadges. Single-user, browser-based, deployed to AWS via
**Amplify Hosting** (which manages S3 + CloudFront under the hood).

## Source of truth for features

The authoritative feature list and entity shape lives at:

```
docs/TRAILHEAD_TODOS.md
```

**Read that file before generating any code.** If it conflicts with anything in
this spec, the TODOs file wins — adjust the schema and behaviors accordingly and
note the change in a code comment so I can see what was overridden.

If a field referenced in the TODOs file is missing from the Default Entity Shape
below, add it. If a field in the Default Entity Shape isn't mentioned in the
TODOs file, keep it (it's a safe default).

## Scope

### Phase 1 — Frontend CRUD (this build)

A working React app that runs locally and deploys to Amplify Hosting. Data
persists in `localStorage` for now, behind a clean data-layer abstraction so a
real backend (API Gateway + Lambda + DynamoDB) can slot in later without UI
changes.

### Phase 2 — AWS backend (later, not this build)

Out of scope for now but the architecture must not preclude it.

## Functional requirements

- **F1. Create** — Add a new Trailhead item via a form
- **F2. Read** — See a list of all items with filtering by status and search by name
- **F3. Update** — Edit any field on an existing item
- **F4. Delete** — Remove an item with a confirmation prompt
- **F5. Persistence** — Items survive page refresh (localStorage in Phase 1)
- **F6. Status tracking** — Each item has a status: `not_started | in_progress | completed`
- **F7. Dashboard** — A summary view shows counts by status and overall completion percentage

## Non-functional requirements

- **N1. Cloud-ready** — Pure static-site build, no SSR, no Node-only runtime APIs
- **N2. Swappable data layer** — All CRUD goes through `src/api/trailheadClient.js`. Phase 2 replaces the adapter behind it without touching UI code.
- **N3. Environment config** — Any future API base URL must come from `REACT_APP_*` env vars baked in at build time. No hardcoded URLs.
- **N4. CORS-aware client** — The data-layer methods use `fetch` patterns from day 1 (even when wrapping localStorage), so the Phase 2 swap is a no-op for callers.
- **N5. Responsive** — Usable on desktop and mobile widths
- **N6. Deployable** — `npm run build` produces a `build/` directory that Amplify Hosting can serve as-is
- **N7. Git-backed** — Project is a git repo from the start; Amplify Hosting connects to the repo for CI/CD

## Out of scope for Phase 1

- Authentication (single-user, no login)
- Lambda / DynamoDB / API Gateway provisioning
- File uploads to S3 buckets
- Salesforce Trailhead API integration (manual entry only)
- Multi-user / sharing features

## Default entity shape (override with TRAILHEAD_TODOS.md if it specifies)

```typescript
TrailheadItem {
  id: string                  // uuid, client-generated for Phase 1
  name: string                // e.g. "Apex Basics"
  type: 'module' | 'trail' | 'project' | 'superbadge'
  url?: string                // link to trailhead.salesforce.com
  status: 'not_started' | 'in_progress' | 'completed'
  points?: number             // points earned/available
  estimatedMinutes?: number
  startedAt?: string          // ISO date
  completedAt?: string        // ISO date
  notes?: string              // freeform text
  createdAt: string           // ISO date, set on create
  updatedAt: string           // ISO date, set on every write
}
```

## Acceptance criteria

The build is done when:

1. `npm start` boots the app with no errors or console warnings
2. All five functional requirements (F1–F5) work end-to-end against localStorage
3. The dashboard (F7) renders correct counts and percentage
4. `npm run build` succeeds and the output runs via `npx serve build`
5. The data layer (N2) is in place — one file, one swap to point at a real API
6. No hardcoded URLs anywhere; API base URL is `process.env.REACT_APP_API_BASE_URL`
7. The app is deployed to Amplify Hosting and the live URL loads and works
8. The git repo is connected to Amplify so pushes to `main` trigger a redeploy
