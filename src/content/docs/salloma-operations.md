---
title: "salloma.com: Operations Runbook"
project: "salloma"
summary: "Generic operational procedures for deploying, syncing videos, rotating credentials and troubleshooting the salloma.com platform."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-06-15"
order: 7
parent: "salloma"
---

Common operational tasks for running and maintaining the live platform. Resource names and values are intentionally omitted from this public copy; the procedures are generic.

## Key facts

| Item | Value |
| --- | --- |
| Hosting | Azure Static Web Apps, East US 2 |
| Production URL | [www.salloma.com](https://www.salloma.com) |
| Source repository | [github.com/kwasiasare/tw-training-site](https://github.com/kwasiasare/tw-training-site) |
| Video storage | Cloudflare R2 |

## Deploy a change to production

From `dev`: open a PR, verify the preview, then merge to `master` (merging triggers the production deploy). Use the GitHub CLI to create the PR, then watch the run to green after merge.

## Re-sync / add videos

After rendering new or updated MP4s into the local public videos folder, run the upload script. It is idempotent: it only uploads files that are new or have changed size.

## Rotate the deployment token

If a deploy fails because the token is no longer valid, read the current deployment token from the Static Web Apps resource (Azure portal or CLI) and update the corresponding GitHub Actions secret. To force a brand-new token, reset it on the Static Web Apps resource first, then update the GitHub secret.

## Rotate Cloudflare R2 keys

1. In the Cloudflare dashboard, open R2, then Manage R2 API Tokens. Revoke the old token and create a new Object Read & Write token scoped to the video bucket.
2. Update the access key pair in the local `.env`.
3. No site rebuild is needed; these keys are only used by the upload script, not the runtime.

## Update the R2 public base URL

If the R2 public URL changes (for example when moving to a custom domain), update both the local `.env` value (used by the upload script's messages) and the GitHub Actions **variable** that drives the production build. Then trigger a rebuild (a push to master via PR) so pages pick up the new base.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| CI deploy rejected as invalid token | GitHub secret does not match the Static Web Apps token | Re-set the secret (see "Rotate the deployment token") |
| Videos return 404 in production | Video CDN base variable unset or wrong, or video not uploaded | Check the GitHub variable; run the upload script |
| Videos return Access Denied | R2 public access disabled | Re-enable public access in the bucket settings |
| 404 fallback or wrong MIME type in prod | `staticwebapp.config.json` missing from the build | Ensure it lives in `site/public/` so Astro copies it |
| Build fails installing dependencies | `package-lock.json` out of sync | Run `npm install` locally and commit the updated lockfile |

## Verify production health

Check that the home page returns HTTP 200 and that a sample video URL on the R2 base returns 200 with content-type `video/mp4`. A quick `curl -I` against each confirms both the site and the video CDN are healthy.

Policy: deploy workflows and infrastructure config on `master` are never modified without explicit approval. Infra changes are made on `dev`, validated via the PR preview, and merged only after sign-off.
