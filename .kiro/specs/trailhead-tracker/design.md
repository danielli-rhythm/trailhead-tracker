# Design — Trailhead Tracker

## Architecture (Phase 1)

```
┌────────────────────────────────────────────────────────┐
│  React App (create-react-app)                          │
│                                                        │
│  Pages ──▶ Components ──▶ Context (useReducer)         │
│                                  │                     │
│                                  ▼                     │
│             ┌──────────────────────────────────┐       │
│             │  src/api/trailheadClient.js      │       │
│             │  ──── ABSTRACTION BOUNDARY ────  │       │
│             │  Phase 1: localStorage adapter   │       │
│             │  Phase 2: fetch → API Gateway    │       │
│             └──────────────────────────────────┘       │
└────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Amplify Hosting      │
              │  (S3 + CloudFront,    │
              │   managed for us)     │
              └───────────────────────┘
```

The whole design hinges on one thing: **the client module exposes the same
async interface in Phase 1 and Phase 2.** UI never knows where data comes from.

## Folder structure

```
trailhead-tracker/
├── docs/
│   └── TRAILHEAD_TODOS.md          (already exists — source of truth)
├── public/
├── src/
│   ├── api/
│   │   ├── trailheadClient.js      (the swappable boundary)
│   │   └── localStorageAdapter.js  (Phase 1 backend)
│   ├── components/
│   │   ├── ItemList.jsx
│   │   ├── ItemRow.jsx
│   │   ├── ItemForm.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── Dashboard.jsx
│   │   └── ErrorBanner.jsx
│   ├── pages/
│   │   ├── HomePage.jsx            (dashboard + list)
│   │   ├── NewItemPage.jsx
│   │   └── EditItemPage.jsx
│   ├── context/
│   │   └── TrailheadContext.jsx
│   ├── hooks/
│   │   └── useTrailhead.js
│   ├── utils/
│   │   └── formatters.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── index.js
├── .env.example                    (documents REACT_APP_API_BASE_URL)
├── .gitignore
├── amplify.yml                     (Amplify Hosting build spec)
└── package.json
```

## Data-layer contract

`trailheadClient.js` exports exactly this shape. Both adapters (localStorage now,
fetch later) conform to it.

```javascript
export const trailheadClient = {
  list: async () => TrailheadItem[],
  get: async (id) => TrailheadItem | null,
  create: async (input) => TrailheadItem,       // input omits id/createdAt/updatedAt
  update: async (id, patch) => TrailheadItem,   // partial update
  remove: async (id) => void,
};
```

Every method is async even when the underlying call is synchronous — this means
UI `await`s don't change when the backend swaps in.

## State management

- React Context + `useReducer` — no Redux, no Zustand
- Reducer actions: `LOAD`, `ADD`, `PATCH`, `REMOVE`, `SET_LOADING`, `SET_ERROR`
- Provider calls `trailheadClient.list()` on mount

## Routing

`react-router-dom` v6:

- `/` — HomePage (dashboard + list)
- `/new` — NewItemPage
- `/edit/:id` — EditItemPage

## UI approach

- Plain CSS (single global stylesheet) — no UI framework in Phase 1
- Mobile-first responsive layout (flex/grid)
- Status badges color-coded: gray (not_started), blue (in_progress), green (completed)

## Error handling

- Every `trailheadClient` call wrapped in try/catch at the dispatch site
- Errors dispatch `SET_ERROR` and surface via `<ErrorBanner />` at app root
- Banner is dismissible

## Deployment design (Amplify Hosting)

- Source: a git repo (GitHub or CodeCommit) connected to Amplify
- Branch `main` deploys to production
- `amplify.yml` defines the build:
  - `npm ci`
  - `npm run build`
  - artifacts: `build/`
- Amplify auto-provisions: S3 bucket, CloudFront distribution, SSL cert
- Environment variables (e.g. future `REACT_APP_API_BASE_URL`) set in the Amplify Console per-branch

## Phase 2 migration path (documented, not built)

1. Add `src/api/httpAdapter.js` that calls `${process.env.REACT_APP_API_BASE_URL}/items` with `fetch`
2. Change one import line in `trailheadClient.js` to use `httpAdapter` instead of `localStorageAdapter`
3. Set `REACT_APP_API_BASE_URL` in the Amplify Console for the `main` branch
4. Push — Amplify rebuilds with the new env var baked in

UI doesn't change. That's the whole point.
