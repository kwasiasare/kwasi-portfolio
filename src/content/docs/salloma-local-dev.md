---
title: "salloma.com: Local Development Guide"
project: "salloma"
summary: "How to clone, run and build the salloma.com site locally."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-06-15"
order: 4
parent: "salloma"
---

How to clone, run, and build the site locally.

## Prerequisites

| Tool | Version | Used for |
| --- | --- | --- |
| Node.js | 20+ | Astro site build and dev server |
| Python | 3.12+ | Content/video pipeline and R2 upload (boto3, python-docx, python-pptx) |
| Git | any recent | Source control |
| Azure CLI | 2.80+ | Static Web Apps management (optional, for manual deploys) |
| GitHub CLI (`gh`) | any recent | PRs, CI monitoring (optional) |

## Clone and configure

```bash
git clone https://github.com/kwasiasare/tw-training-site.git
cd tw-training-site
cp .env.example .env      # then fill in the Azure Speech and Cloudflare R2 keys
```

## Run the site (dev server)

```bash
cd site
npm install
npm run dev               # http://localhost:4321/
```

With no video CDN base set, videos load from the local `site/public/videos/*.mp4` (the fallback base is `/videos`). To preview R2 delivery locally, set the variable before building.

## Build for production

```bash
cd site
PUBLIC_VIDEO_CDN_BASE="<r2 public base url>" npm run build   # outputs to site/dist
```

CI does this automatically; you rarely need to build by hand.

## Branching workflow

1. Create work on `dev` (never commit directly to `master`).
2. Push `dev`; open a PR to `master`.
3. The PR builds a preview environment, which is where testing happens.
4. After approval, merge to `master` to deploy to production.

## Repository layout

| Path | Contents |
| --- | --- |
| `site/` | Astro app (pages, components, content, styles) |
| `site/src/consts.ts` | Curriculum outline and the video CDN base |
| `site/public/staticwebapp.config.json` | Static Web Apps routing / MIME / cache config (copied into the build) |
| `videos/_decks/*.json` | Lesson decks, the source of truth |
| `make_*.py`, `doc_helpers.py` | Generate Word/PPTX study materials |
| `make_slides.py`, `render_narration_azure.py`, `build_one_video.py`, `batch_render.py` | Deck, slides, narration and MP4 pipeline |
| `convert_decks_to_md.py` | Deck JSON to Astro lesson markdown |
| `upload_videos_r2.py` | Upload/sync videos to Cloudflare R2 |
| `.github/workflows/` | CI/CD workflow |

`node_modules/`, `dist/`, `.env`, and the MP4 files are git-ignored. After cloning you will not have the videos locally; re-render them or pull from R2 if you need them for local playback.
