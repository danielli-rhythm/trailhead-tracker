# ADR 003 — localStorage as Phase 1 backend with swappable adapter

**Date:** 2026-05-20  
**Status:** Accepted

## Context

Phase 1 needs data persistence without provisioning any backend infrastructure. Phase 2 will add API Gateway + Lambda + DynamoDB. The architecture must support swapping backends without UI changes.

## Decision

Use `localStorage` behind an async adapter (`localStorageAdapter.js`) that conforms to the same interface as the future HTTP adapter. Components only import `trailheadClient.js`, never the adapter directly.

## Alternatives

1. **IndexedDB** — more capable (structured queries, larger storage), but overkill for a single-entity CRUD app with <100 items.
2. **In-memory only** — simpler, but data lost on refresh violates requirement F5.
3. **No abstraction** — call localStorage directly from components. Faster to write but makes Phase 2 a rewrite instead of a swap.

## Consequences

- Phase 2 migration is a one-line import change in `trailheadClient.js`.
- All data-layer methods are async (return Promises) even though localStorage is synchronous — callers always `await`.
- Storage limited to ~5MB per origin; sufficient for Phase 1 scale.
- Data is origin-scoped — the deployed Amplify URL and localhost have separate stores.
