---
title: "salloma.com: Deployment & CI/CD"
project: "salloma"
summary: "Branching model, the GitHub Actions pipeline, preview environments and how deploys are monitored."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-06-15"
order: 2
parent: "salloma"
---

Deployments are automated through GitHub Actions. The branching model follows **dev, test, approve, prod**, with Azure Static Web Apps preview environments standing in for a dev environment.

## Branching model

| Branch | Purpose | Deploys to |
| --- | --- | --- |
| `dev` | Active development; all changes land here first | (via PR) preview environment |
| `master` | Production; protected, only via approved PR | Production environment |

Nobody pushes directly to `master`. Work happens on `dev`, a PR is opened, the preview environment is reviewed, and the merge to `master` promotes to production.

## Pipeline

| Trigger | Job | Result |
| --- | --- | --- |
| PR to `master` (opened/updated) | build and deploy | Builds the site, deploys to a **preview environment** with its own URL |
| Push to `master` (merge) | build and deploy | Builds and deploys to **production** |
| PR closed | close preview | Tears down the preview environment |

### Build step detail

The CI runner does **not** contain the videos (they are git-ignored), so the public videos folder is empty and the build naturally produces a tiny output. The video CDN base URL is injected at build time from a GitHub variable:

```yaml
- name: Install and build site
  working-directory: site
  env:
    PUBLIC_VIDEO_CDN_BASE: ${{ vars.PUBLIC_VIDEO_CDN_BASE }}
  run: |
    npm ci
    npm run build
```

The build output is then uploaded with `skip_app_build: true` via the `Azure/static-web-apps-deploy` action.

## Required GitHub configuration

| Kind | Purpose |
| --- | --- |
| Secret | The Static Web Apps deployment token |
| Variable | The R2 public base URL used for video links |

## Environments

- **Production:** [www.salloma.com](https://www.salloma.com)
- **Preview:** created per PR with its own URL and removed automatically on PR close.

## Monitoring a deploy

```bash
gh run list  --repo <owner>/<repo> --branch master --limit 3
gh run watch <run-id> --repo <owner>/<repo> --exit-status
```

A push that breaks CI is treated as a failure, not a completion. Every run is watched to green after pushing.
