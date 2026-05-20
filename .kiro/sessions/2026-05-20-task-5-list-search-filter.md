# Session Log — Task 5: List, search, filter

**Date:** 2026-05-20

## Files created/modified
- `src/components/StatusBadge.jsx` — color-coded badge (gray/blue/green)
- `src/components/ItemRow.jsx` — table row: name, type, status badge, priority, edit link
- `src/components/ItemList.jsx` — search input + status filter buttons + filtered table
- `src/pages/HomePage.jsx` — wires in ItemList
- `src/App.css` — replaced CRA defaults with nav, badge, controls, and table styles

## Decisions
- No new ADRs; straightforward implementation per design.md
- Used `useMemo` for filtered list to avoid recomputing on every render

## Verification
- `npm start` → compiled successfully
- `npm test -- --watchAll=false` → 2 suites, 4 tests pass
- Manual: inject 3 test items via localStorage, confirm render/filter/search works

## Next session needs to know
- ItemRow has an Edit link pointing to `/edit/:id` — needs EditItemPage wired in Task 6
- No delete button yet — that's Task 7
