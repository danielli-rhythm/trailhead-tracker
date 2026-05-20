# Entity Schema — Trailhead Tracker

Reconciled from `requirements.md` (default entity shape) and `TRAILHEAD_TODOS.md`.
Where they conflict, TRAILHEAD_TODOS.md wins per project rules.

## Conflicts resolved

| Field | requirements.md | TRAILHEAD_TODOS.md | Resolution |
|-------|----------------|-------------------|------------|
| `priority` | not present | items grouped by Priority 1–5 | **Added** — integer 1–5 |
| `priorityLabel` | not present | each priority has a label (e.g. "Core Skills (Sprint 0)") | **Added** — string |
| `type` | `'module' \| 'trail' \| 'project' \| 'superbadge'` | file lists modules, projects, and superbadges (no trails) | **Kept all four** — trails still valid even if none in the seed data |

All other default fields are retained since TRAILHEAD_TODOS.md doesn't exclude them.

## Final entity shape

```javascript
TrailheadItem {
  id: string,                  // uuid, client-generated for Phase 1
  name: string,                // e.g. "Apex Basics & Database"
  type: string,                // 'module' | 'trail' | 'project' | 'superbadge'
  url: string | null,          // link to trailhead.salesforce.com
  status: string,              // 'not_started' | 'in_progress' | 'completed'
  priority: number | null,     // 1–5, from TRAILHEAD_TODOS.md groupings
  priorityLabel: string | null,// e.g. "Core Skills (Sprint 0)"
  points: number | null,       // points earned/available
  estimatedMinutes: number | null,
  startedAt: string | null,    // ISO date
  completedAt: string | null,  // ISO date
  notes: string | null,        // freeform text
  createdAt: string,           // ISO date, set on create
  updatedAt: string,           // ISO date, set on every write
}
```

## Valid values

### `type`
- `module`
- `trail`
- `project`
- `superbadge`

### `status`
- `not_started`
- `in_progress`
- `completed`

### `priority`
| Value | Label |
|-------|-------|
| 1 | Core Skills (Sprint 0) |
| 2 | Integration Layer (Before Sprint 1) |
| 3 | Data Model & Security (Sprint 1) |
| 4 | UI Patterns (Sprint 1–2) |
| 5 | Advanced (Sprint 2+) |

## localStorage key

`trailhead_items_v1`
