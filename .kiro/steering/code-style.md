# Steering — Code Style

## General
- **Functional components only.** No class components.
- **Hooks for state and effects.** No HOCs, no render props.
- **Named exports** for utility modules; **default exports** for React components.
- **One component per file**, file name matches component name (`ItemList.jsx`).
- **JSX file extension** (`.jsx`) for components, `.js` for everything else.

## File organization
- Imports at top, grouped: (1) React/external libs, (2) internal modules with absolute-ish paths from `src/`, (3) styles
- Co-locate component-specific CSS as `ComponentName.css` next to the component only if the styles are non-trivial; otherwise use the global stylesheet

## Naming
- Components: `PascalCase`
- Hooks: `useCamelCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Files for components: `PascalCase.jsx`
- Files for non-components: `camelCase.js`

## Data layer
- **All async.** Even when the underlying call is sync (localStorage), wrap it in a Promise so callers always `await`.
- **Never** import `localStorageAdapter` directly from a component. Components only import `trailheadClient`.
- **No hardcoded URLs.** Anything that looks like an endpoint comes from `process.env.REACT_APP_*`.

## Error handling
- Wrap `trailheadClient` calls in try/catch at the dispatch site (i.e. in the component or hook that triggers the action)
- Dispatch `SET_ERROR` with a human-readable message; don't surface raw error objects to the UI

## Comments
- Comment **why**, not what
- When overriding a default from `requirements.md` because of `TRAILHEAD_TODOS.md`, leave a comment: `// override from TRAILHEAD_TODOS.md: <reason>`

## What not to do
- Don't add prop-types or runtime type checking — the user didn't ask for it and it adds noise
- Don't add a logger library; `console.error` is fine for Phase 1
- Don't add fancy animations; keep transitions to simple CSS where helpful
