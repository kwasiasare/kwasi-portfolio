---
title: "salloma.com: Cloudflare R2 Video Hosting"
project: "salloma"
summary: "How lesson videos are stored on Cloudflare R2, uploaded idempotently and referenced from the site."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-06-15"
order: 3
parent: "salloma"
---

All lesson videos are stored in a Cloudflare R2 bucket and streamed directly to learners. R2's defining advantage is **zero egress fees**: bandwidth for video playback is free, unlike most object stores. Cost is $0 while within the free tier.

## Bucket configuration

| Setting | Value |
| --- | --- |
| Public access | Enabled via the r2.dev development subdomain |
| Object keys | Lesson slug plus `.mp4` at bucket root, e.g. `m1-l01-how-python-runs.mp4` |
| Cache-Control | `public, max-age=31536000, immutable` |
| Content-Type | `video/mp4` |

The public base URL is stored as a GitHub variable for the production build and in a local, git-ignored `.env` for the upload script.

## Upload / sync pipeline

A boto3 script (R2 is S3-compatible) uploads every MP4 in the site's public videos folder to the bucket. It is **idempotent**: an object is skipped if one of the same size already exists, so re-running only pushes new or changed videos.

What it does:

1. Loads the R2 credentials from `.env` and builds the S3 endpoint for the account.
2. Runs a `head_bucket` connection and auth test before uploading.
3. Uploads each MP4 with `video/mp4` and immutable cache headers (skipping same-size existing objects).
4. Lists the bucket afterwards and prints the total object count plus a sample public URL.

## How the site references videos

The Astro component `VideoEmbed.astro` builds the URL via `videoUrl()` in `consts.ts`:

```ts
videoCdnBase: import.meta.env.PUBLIC_VIDEO_CDN_BASE ?? '/videos'
// videoUrl('m1-l01-how-python-runs.mp4') -> `${videoCdnBase}/m1-l01-how-python-runs.mp4`
```

In production the build sets the CDN base to the R2 public URL, so pages reference `<r2 public base>/<slug>.mp4`. Locally (no variable) it falls back to `/videos` and plays the files in the local public videos folder.

## Credentials

The upload script needs an R2 account id, an access key pair from an R2 API token, the bucket name and the public base URL. `.env` is git-ignored and must never be committed; the repo ships an `.env.example` documenting the keys.

## Security model and roadmap

The bucket is currently **public-read**, which is fine for open course content. The longer-term plan is to make the bucket private and serve **short-lived signed URLs** from an Azure Function, gated by enrollment:

- [x] Create bucket and upload pipeline: done
- [x] Immutable caching headers: done
- [ ] Custom domain via Cloudflare CDN: pending
- [ ] Signed short-lived URL Function: pending
- [ ] Integrate signed URLs into the player: pending
