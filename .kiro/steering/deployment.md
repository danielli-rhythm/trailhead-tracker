# Steering — Deployment (Amplify Hosting)

## Hosting target

**AWS Amplify Hosting.** Not raw S3 + CloudFront. Amplify manages those under the hood.

The user explicitly chose Amplify Hosting because it handles:
- S3 bucket provisioning
- CloudFront distribution
- ACM wildcard SSL cert (including auto-renewal)
- CI/CD from a git repo
- Per-branch environment variables

Do not try to "improve" on this by provisioning S3 / CloudFront directly. If you think there's a reason to bypass Amplify, ask first.

## Required `amplify.yml`

Create this file at the project root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Connecting the repo

Amplify Hosting needs a git repo. Two options:

1. **GitHub** — most common. Requires an OAuth connection between Amplify and GitHub. This connection is easiest to set up through the Amplify Console (not the CLI). Walk the user through:
   - Console → Amplify → Create new app → Host web app → GitHub → authorize
   - Pick the repo and the `main` branch
   - Confirm Amplify auto-detects the `amplify.yml`
   - Click deploy

2. **CodeCommit** — fully in AWS, no OAuth dance. Can be scripted with the AWS CLI. Lower friction if the user doesn't already have the repo on GitHub.

**Ask the user which they prefer before pushing the repo.**

## Environment variables

Set environment variables in the Amplify Console under App settings → Environment variables, per branch. For Phase 1 there are no required env vars (localStorage). For Phase 2, set `REACT_APP_API_BASE_URL` here.

Remember: CRA bakes `REACT_APP_*` vars in **at build time**, not runtime. Changing a var in the Console requires a rebuild to take effect.

## Custom domain (Phase 1+)

The user has not asked for a custom domain yet. When they do:
- Use the Amplify Console → Domain management flow
- Amplify auto-requests an ACM cert covering apex + wildcard (`example.com` + `*.example.com`)
- Cert is auto-renewed by Amplify

## SPA routing

CRA uses client-side routing (`react-router-dom`). Amplify Hosting needs a rewrite rule so deep links like `/edit/abc123` don't 404. Amplify usually auto-detects this for SPAs, but if direct URLs return 404, add this rewrite rule in Console → Rewrites and redirects:

```
Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>
Target: /index.html
Type: 200 (Rewrite)
```

## After deployment

- Report the live `*.amplifyapp.com` URL to the user
- Confirm a push to `main` triggers an auto-rebuild (this is the default Amplify behavior; don't need to configure it)
