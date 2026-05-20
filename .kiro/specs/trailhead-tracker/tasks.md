# Tasks — Trailhead Tracker

Execute these in order. After **each numbered task**:

1. Summarize what you changed (files added/modified)
2. Run the verification step listed for that task
3. **Stop and wait for me to say "continue"** before starting the next task

Before Task 1, you should have already read:

- All files in `.kiro/steering/`
- `.kiro/specs/trailhead-tracker/requirements.md`
- `.kiro/specs/trailhead-tracker/design.md`
- `/Users/Daniel.Li/Documents/trailhead-tracker/docs/TRAILHEAD_TODOS.md`

If `TRAILHEAD_TODOS.md` conflicts with `requirements.md`, the TODOs file wins.
Note any conflicts you resolved in your task summary.

---

## Task 1 — Scaffold the project

- [ ] Initialize the React app in `/Users/Daniel.Li/Documents/trailhead-tracker` using `npx create-react-app .` (note the dot; we're already inside the target directory)
- [ ] Initialize git: `git init`, add a `.gitignore` covering `node_modules`, `build`, `.env*` (except `.env.example`), `.DS_Store`
- [ ] Create the empty folder structure from `design.md` (api/, components/, pages/, context/, hooks/, utils/, styles/)
- [ ] Install runtime deps: `react-router-dom@6`, `uuid`
- [ ] Create `.env.example` with `REACT_APP_API_BASE_URL=` (empty, documented)
- [ ] Make initial commit: "chore: scaffold trailhead tracker"

**Verify:** `npm start` boots the default CRA welcome screen at `localhost:3000` without errors.

---

## Task 2 — Build the data layer

- [ ] Create `src/api/localStorageAdapter.js` implementing the contract from `design.md` (list/get/create/update/remove), keyed under `trailhead_items_v1`
- [ ] Create `src/api/trailheadClient.js` that re-exports the adapter as `trailheadClient`
- [ ] Match the entity shape to whatever `TRAILHEAD_TODOS.md` specifies (override the Default Entity Shape if needed)
- [ ] Add a one-file unit test `src/api/localStorageAdapter.test.js` covering create → list → update → remove

**Verify:** `npm test -- --watchAll=false` passes.

---

## Task 3 — Context and state

- [ ] Create `src/context/TrailheadContext.jsx` with a Provider that loads items on mount via `trailheadClient.list()` and exposes state + dispatch
- [ ] Implement the reducer with actions: `LOAD`, `ADD`, `PATCH`, `REMOVE`, `SET_LOADING`, `SET_ERROR`
- [ ] Create `src/hooks/useTrailhead.js` as the consumer hook
- [ ] Wrap `<App />` in the Provider inside `index.js`

**Verify:** App still boots. Add a temporary `console.log` in App.jsx that prints `useTrailhead()`'s state — confirm it shows the loaded list (empty array on first run).

---

## Task 4 — Routing and pages shell

- [ ] Set up `react-router-dom` in `App.jsx` with routes for `/`, `/new`, `/edit/:id`
- [ ] Create placeholder `HomePage.jsx`, `NewItemPage.jsx`, `EditItemPage.jsx` (each just renders its name)
- [ ] Add a simple nav header with links to Home and New

**Verify:** Clicking nav links changes the URL and the visible page name.

---

## Task 5 — List, search, filter (the R in CRUD)

- [ ] Build `ItemList.jsx` and `ItemRow.jsx` to render the items from context
- [ ] Add a search input (filters by `name`, case-insensitive)
- [ ] Add status filter buttons: All / Not Started / In Progress / Completed
- [ ] Build `StatusBadge.jsx` with color coding per design.md
- [ ] Wire it all into `HomePage.jsx`

**Verify:** Manually inject 3 items via DevTools (`localStorage.setItem('trailhead_items_v1', JSON.stringify([...]))`), refresh, confirm they render and filter/search works.

---

## Task 6 — Create and Edit forms (the C and U)

- [ ] Build `ItemForm.jsx` — a reusable form for both new and edit, controlled inputs for every field in the entity shape
- [ ] Wire `NewItemPage.jsx` to call `trailheadClient.create()` and navigate home on success
- [ ] Wire `EditItemPage.jsx` to load the item by id and call `trailheadClient.update()` on submit
- [ ] On submit, dispatch the appropriate context action so the list updates without a refresh

**Verify:** Create a new item via the UI, see it in the list, edit it, see changes reflected. Refresh the page — changes persist.

---

## Task 7 — Delete with confirmation (the D)

- [ ] Build `ConfirmDialog.jsx` (plain modal, no library)
- [ ] Add a delete button to each `ItemRow` that opens the confirm dialog
- [ ] On confirm, call `trailheadClient.remove()` and dispatch `REMOVE`

**Verify:** Delete an item, see it disappear, refresh, confirm it's gone.

---

## Task 8 — Dashboard

- [ ] Build `Dashboard.jsx` showing: total count, count per status, completion percentage
- [ ] Render it at the top of `HomePage.jsx`

**Verify:** Counts update live as items are added/edited/deleted.

---

## Task 9 — Error handling and polish

- [ ] Build `ErrorBanner.jsx`, wire to context error state, dismissible
- [ ] Add basic responsive styles in `styles/global.css` (mobile-first)
- [ ] Make sure there are no console warnings (key props, controlled inputs, etc.)
- [ ] Run `npm run build` and `npx serve build` — confirm the production build works

**Verify:** Both `npm start` and `npx serve build` work cleanly. Resize browser to mobile width and confirm layout holds.

---

## Task 10 — Git remote and Amplify Hosting deployment

Before this task, confirm the AWS profile from `.kiro/steering/aws-access.md` works:
```bash
aws sts get-caller-identity --profile saferfleet
```

- [ ] Create a GitHub repo (or CodeCommit repo) for the project. Ask me which I prefer before proceeding.
- [ ] Push the project to the remote
- [ ] Create `amplify.yml` at the project root with the build spec from `design.md`
- [ ] Use the AWS CLI to create an Amplify app connected to the repo (`aws amplify create-app` then `aws amplify create-branch` for `main`), or walk me through the Amplify Console steps if CLI auth to the repo provider is awkward
- [ ] Trigger the first deployment
- [ ] Wait for the build to complete; report the live `*.amplifyapp.com` URL

**Verify:** Open the live URL. Confirm the app loads, you can create/edit/delete items, and refreshing preserves them (localStorage on the deployed origin).

---

## Task 11 — README

- [ ] Write a project `README.md` covering: what the app is, how to run locally, how the data layer abstraction works, how Phase 2 will swap in the real backend, the Amplify Hosting URL, and how to redeploy (just push to main)

**Verify:** I can read the README and understand the project without other context.
