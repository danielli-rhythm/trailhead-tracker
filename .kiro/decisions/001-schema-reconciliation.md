# ADR 001 — Schema Reconciliation (priority fields)

**Date:** 2026-05-20  
**Status:** Accepted

## Context

`TRAILHEAD_TODOS.md` organizes Trailhead items into five priority groups (Priority 1–5), each with a label like "Core Skills (Sprint 0)". The default entity shape in `requirements.md` has no field to capture this grouping. Per project rules, TRAILHEAD_TODOS.md wins on conflicts and missing fields must be added.

## Decision

Added two fields to the entity schema:

- `priority` — integer 1–5, nullable
- `priorityLabel` — string (e.g. "Integration Layer (Before Sprint 1)"), nullable

Both are optional (null when the user doesn't assign a priority). All other default fields from `requirements.md` are retained unchanged.

## Alternatives

1. **Leave them out** — simpler schema, but loses the priority grouping that the user explicitly organized their learning plan around.
2. **Store as a nested object** (e.g. `priority: { level: 2, label: "..." }`) — adds complexity to the flat localStorage structure and makes filtering/sorting harder without benefit.

## Consequences

- The list/filter UI can group and sort items by priority level.
- The form UI needs a priority selector (dropdown or number input).
- Phase 2 DynamoDB schema must include `priority` (Number) and `priorityLabel` (String) attributes; a GSI on `priority` would support efficient queries by priority group.
- Seed data from TRAILHEAD_TODOS.md can be pre-populated with correct priority values.
