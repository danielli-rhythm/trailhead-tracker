# ADR 002 — Amplify Hosting over raw S3 + CloudFront

**Date:** 2026-05-20  
**Status:** Accepted

## Context

The app needs static hosting with HTTPS, CI/CD from a git repo, and environment variable injection at build time. Two AWS approaches exist: manually provisioning S3 + CloudFront + ACM, or using Amplify Hosting which manages all three.

## Decision

Use AWS Amplify Hosting. It provisions S3, CloudFront, and ACM under the hood with zero manual resource management.

## Alternatives

1. **Raw S3 + CloudFront + ACM** — full control, but requires manual cert provisioning, distribution config, cache invalidation scripts, and a separate CI/CD pipeline.
2. **Vercel / Netlify** — simpler DX but outside the user's AWS-centric workflow and billing.

## Consequences

- One-click CI/CD: push to `main` triggers rebuild and deploy automatically.
- Per-branch environment variables are set in the Amplify Console (needed for Phase 2 `REACT_APP_API_BASE_URL`).
- SPA rewrite rules may need manual configuration if deep links 404.
- Less granular control over CloudFront behaviors (acceptable for this project's scope).
