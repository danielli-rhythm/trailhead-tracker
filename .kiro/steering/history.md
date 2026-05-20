# Steering — History and Decisions

## After every completed task

Append a brief summary to `.kiro/sessions/YYYY-MM-DD-task-N-<slug>.md` with:
- Task number and name
- Files created or modified
- Any decisions made or assumptions resolved
- Verification result (test passed, build succeeded, etc.)
- Anything the next session would need to know

Keep it to ~10–20 lines. This is a logbook, not a transcript.

## When a non-trivial decision is made

A "non-trivial decision" is anything that:
- Overrides a default from requirements.md or design.md
- Picks between two reasonable alternatives
- Adds, removes, or renames a field in the entity schema
- Changes the data-layer contract
- Introduces a new dependency

When one happens, write a numbered ADR to `.kiro/decisions/NNN-<slug>.md` with:
- **Context** — what situation prompted the decision
- **Decision** — what was chosen
- **Alternatives** — what else was considered
- **Consequences** — what this enables or constrains going forward

Three to five sentences per section is enough. Reference the ADR number in your task summary.

## Existing decisions to back-fill

If `.kiro/decisions/` is empty when you start, back-fill these from the spec:
- 001 — Schema reconciliation with TRAILHEAD_TODOS.md
- 002 — Amplify Hosting over raw S3 + CloudFront
- 003 — localStorage as Phase 1 backend with swappable adapter
- 004 — CRA over Vite (per user request)