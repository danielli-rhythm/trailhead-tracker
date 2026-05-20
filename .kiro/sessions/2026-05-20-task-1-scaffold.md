# Session Log — Task 1: Scaffold the project

**Date:** 2026-05-20  
**Commit:** d76672f `chore: scaffold trailhead tracker`

## Files created
- `package.json`, `package-lock.json` — CRA scaffold + react-router-dom@6, uuid
- `public/` — CRA default public assets
- `src/` — CRA default + empty subdirs: api/, components/, pages/, context/, hooks/, utils/, styles/
- `.gitignore` — covers node_modules, build, .env*, .DS_Store
- `.env.example` — documents REACT_APP_API_BASE_URL
- `amplify.yml` — Amplify Hosting build spec from steering
- `docs/TRAILHEAD_TODOS.md` — copied from .kiro/info/ for project reference

## Decisions
- Used temp-directory workaround for CRA (it refuses to scaffold in non-empty dirs)
- Had to `rm -rf node_modules && npm install` after copy (symlinks broke across dirs)
- Back-filled ADRs 002–004 per history.md steering

## Verification
- `npm start` → "Compiled successfully!" at localhost:3000
- Only deprecation warnings from webpack-dev-server (cosmetic, CRA + Node 26)

## Next session needs to know
- Project name in package.json is `trailhead-tracker` (CRA default from temp dir) — rename if desired
- Node 26 is in use; CRA works but shows deprecation warnings
