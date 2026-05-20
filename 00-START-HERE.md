# Trailhead Tracker — Kiro Build Prompt

A spec-driven prompt set for Kiro to build a CRUD React app that tracks
Salesforce Trailhead progress, then deploys it to AWS via Amplify Hosting.

---

## Prerequisites (do these once, before opening Kiro)

1. **AWS CLI installed and configured with an admin profile**
   ```bash
   aws --version                          # verify install
   aws configure --profile saferfleet  # or: aws sso login --profile saferfleet
   aws sts get-caller-identity --profile saferfleet   # confirm it works
   ```
   Kiro will use this profile to run AWS commands in your terminal. The profile
   name `saferfleet` is referenced in the steering files — keep it
   consistent or update `.kiro/steering/aws-access.md` to match.

2. **Node.js 18+ and npm installed**
   ```bash
   node --version   # should be >= 18
   ```

3. **Amplify CLI (optional but recommended)**
   ```bash
   npm install -g @aws-amplify/cli
   amplify --version
   ```
   Kiro can also do everything via the AWS CLI + Amplify Console, but the CLI is
   smoother for hosting setup.

4. **Your Trailhead feature list exists at:**
   ```
   /Users/Daniel.Li/Documents/trailhead-tracker/docs/TRAILHEAD_TODOS.md
   ```
   If it doesn't, create it (even as a stub) before Kiro runs — the spec
   treats it as the source of truth for the entity schema.

---

## How to use this folder

1. Create the project directory:
   ```bash
   mkdir -p /Users/Daniel.Li/Documents/trailhead-tracker
   ```
2. Copy the `.kiro/` folder from this prompt set into that directory:
   ```
   /Users/Daniel.Li/Documents/trailhead-tracker/.kiro/
   ```
3. Open the project in Kiro.
4. Paste this kickoff prompt into Kiro:

```
Read these in order before doing anything:

1. .kiro/steering/  (all files — these are always-on rules)
2. .kiro/specs/trailhead-tracker/requirements.md
3. .kiro/specs/trailhead-tracker/design.md
4. /Users/Daniel.Li/Documents/trailhead-tracker/docs/TRAILHEAD_TODOS.md
5. .kiro/specs/trailhead-tracker/tasks.md

Then execute tasks.md in order. After each numbered task:
  - Summarize what you changed
  - Run any verification step listed for that task
  - STOP and wait for me to say "continue" before starting the next task

If TRAILHEAD_TODOS.md conflicts with requirements.md, TRAILHEAD_TODOS.md wins.
Note any conflicts you resolve.
```

---

## File map

```
.kiro/
├── specs/
│   └── trailhead-tracker/
│       ├── requirements.md   ← WHAT to build + acceptance criteria
│       ├── design.md         ← HOW it's structured
│       └── tasks.md          ← Ordered, checkable build steps
└── steering/
    ├── tech-stack.md         ← Pinned tech choices
    ├── code-style.md         ← Conventions
    ├── aws-access.md         ← How Kiro should use AWS credentials
    └── deployment.md         ← Amplify Hosting deployment rules
```

## Why this structure?

Kiro performs best with **specs broken into requirements / design / tasks** plus
**steering files** that act as always-on context. This separation means:

- You can re-run individual tasks without re-explaining the whole project
- Steering files stop Kiro from drifting on stack choices
- The `tasks.md` checklist gives you natural stopping points to review work
