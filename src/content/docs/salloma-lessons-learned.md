---
title: "salloma.com: Lessons Learned"
project: "salloma"
summary: "Practical lessons from building the salloma.com platform: architecture, pipeline, CI/CD, verification and theming."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-06-16"
order: 8
parent: "salloma"
---

Practical lessons captured while building the platform, kept current as the project evolves.

## Architecture and platform

- **Static-first, offload heavy media.** Serve the roughly 1 MB site from Azure Static Web Apps; stream about 400 MB of video from Cloudflare R2 (zero egress). Hosting stays effectively free and deploys are tiny.
- **One source of truth prevents drift.** Each lesson is a single JSON deck; the web page and the narrated video are both generated from it.
- **Self-contained course folders scale.** A `course-materials/<slug>/` folder per course made adding a second course a drop-in, and the multi-course platform a small data-driven change rather than a rewrite.
- **Derive structure from data.** The catalog and modules are built from the lessons (a `course` field plus `course.json`), so adding content never means editing a hardcoded curriculum.
- **Astro's glob loader can read outside `src/`** with a `generateId` that keeps slugs stable.

## Pipeline and content production

- **Parameterise tooling early.** A single course selector made every script course-aware; new courses reuse the pipeline unchanged.
- **Parallelise authoring with a shared spec, then validate.** Six subagents authored 35 decks in parallel from one spec and a gold-standard example; output was validated programmatically with zero problems.
- **Idempotent sync.** The R2 uploader skips same-size objects, so it is safe to re-run.

## Git, CI/CD and deployment

- **dev, preview, master, always.** PR previews build on a fresh checkout, catching issues local builds hide (for example, `staticwebapp.config.json` must live in `site/public/`).
- **Stay on `dev`.** After a post-merge pull on master it is easy to keep committing onto master by accident; switch back to dev immediately and check the branch before committing.
- **Watch every deploy to green.** A push that breaks CI is a failure, not a completion.
- **Deployment-token mismatches** ("token provided was invalid") are fixed by re-setting the GitHub secret from the current Static Web Apps token.

## Verification and ways of working

- **Evidence over assertion.** Prove every change: build page counts, `curl` status, R2 `HEAD`, grep on built HTML.
- **Plan first, check in before heavy implementation.** A short plan surfaced real constraints early (self-contained courses meant rewiring the build, not just moving files).
- **Secrets discipline.** `.env` is git-ignored, `.env.example` documents the keys, and public-read R2 has a documented path to signed URLs.

## Theming

- **Separate semantic colours from brand colours.** Headings reused the brand navy, which is also a dark background, and were invisible in dark mode until split into a `--heading` variable. Use `rgba` tints for state colours so they read on any background.
- **No flash of the wrong theme.** Default dark on `<html>` and apply the saved preference in an inline head script before paint; persist to `localStorage`.

## Tooling gotchas (Windows / PowerShell)

- `$HOME` is read-only; parentheses inside `$( ... -match ... )` can break the parser, so prefer `.Contains()`.
- `grep` for a multibyte character (such as an arrow) with `.` matches single bytes; verify with ASCII substrings.
- The harness resets the shell working directory each command, so use absolute paths or `git -C`.
