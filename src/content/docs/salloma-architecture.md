---
title: "salloma.com: Architecture Overview"
project: "salloma"
summary: "Static-first, multi-course architecture: Astro on Azure Static Web Apps, video on Cloudflare R2, and a data-driven course model."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-06-16"
order: 1
parent: "salloma"
---

The platform is a **static-first, multi-course** web application: pre-rendered HTML served from a global CDN, with heavy video assets offloaded to object storage. Hosting is effectively free and fast; video streams at zero egress cost.

## High-level components

| Component | Technology | Responsibility |
| --- | --- | --- |
| Web app | Astro (static) | Renders the catalog, course pages, and all lessons across courses at build time |
| Hosting / CDN | Azure Static Web Apps | Serves the static build globally; PR preview environments |
| Video storage | Cloudflare R2 | Stores all course MP4s; serves them over HTTPS at $0 egress |
| Narration engine | Azure Neural TTS | Generates lesson audio (alternating voices) |
| Content source | JSON decks per course | Single source of truth for both lesson pages and videos |
| CI/CD | GitHub Actions | Builds and deploys on push; preview environments on PRs |

## Multi-course architecture

Each course is a **self-contained folder**. Adding a course is a drop-in, and the site is data-driven so nothing is hardcoded:

```text
course-materials/
  <course-a>/    course.json + decks/ + lessons/ + videos/ + study-packs/
  <course-b>/    (same shape)
site/            shared shell: layouts, components, pages, styles, consts
```

- **Content loader:** Astro globs `course-materials/*/lessons/**/*.md` (a `generateId` keeps the slug equal to the filename, so URLs are stable). Each lesson carries a `course` field.
- **Catalog and modules** are derived from the lessons at build time (grouped by `course` then `month`), plus a small `COURSES` catalog in `consts.ts` for course-level metadata.
- **Routing:** homepage is the catalog; `/courses/<slug>` is a course overview; `/topics/<slug>` is a lesson (course-aware breadcrumb and prev/next). Slugs are globally unique across courses.

## Content data flow

```text
course-materials/<course>/decks/<slug>.json   (source of truth)
        ├──> convert_decks_to_md.py <course> ─> lessons/<slug>.md ─> Astro build ─> dist/ (HTML)
        └──> render pipeline ─> videos/<slug>.mp4 ─> upload_videos_r2.py ─> Cloudflare R2
```

## Request flow (production)

1. A learner opens a lesson and Azure Static Web Apps serves static HTML from the nearest edge.
2. The page's `<video>` points at the R2 public base URL plus `/<slug>.mp4`.
3. The browser streams the MP4 from Cloudflare R2 (cached, immutable) with no egress charge.

## Theming

The UI supports light/dark with a header toggle and **defaults to dark**. Colours are CSS variables; a `[data-theme="dark"]` palette overrides them. A separate `--heading` variable keeps headings legible (the brand navy doubles as a dark background). An inline head script applies the saved preference before paint (no flash) and the toggle persists to `localStorage`.

## Evolution

The platform began as a static content site and has since added authentication (Entra External ID), Cosmos DB for progress tracking, Azure Functions, course search, an admin dashboard and Claude-powered AI features. See the [Project Status & Roadmap](/docs/salloma-roadmap/) and [AI Features](/docs/salloma-ai-features/) pages.
