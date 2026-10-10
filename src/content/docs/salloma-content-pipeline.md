---
title: "salloma.com: Content Production Pipeline"
project: "salloma"
summary: "How a single JSON deck produces both a lesson page and a narrated video, and how new courses are added."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-06-16"
order: 5
parent: "salloma"
---

Every lesson is generated from a single JSON deck, which produces both the website page and a narrated MP4, so the two never drift. The pipeline is **course-aware**: the same tools build any course.

**Course-aware via a course selector.** Every script takes a course slug (a CLI argument or an environment variable) and reads and writes under `course-materials/<slug>/`. This is how a whole second course was produced with the existing tooling.

## Per-course layout

```text
course-materials/<slug>/
  course.json     # metadata (title, modules)
  decks/*.json    # lesson source of truth
  lessons/*.md    # generated Astro pages (carry a `course` field)
  videos/*.mp4    # rendered videos (git-ignored -> R2)
  study-packs/*.docx
```

## Pipeline stages

| # | Stage | Script | Output |
| --- | --- | --- | --- |
| 1 | Author deck | n/a | `decks/<slug>.json` (title, slides, script, quiz) |
| 2 | Deck to lesson page | `convert_decks_to_md.py <course>` | `lessons/<slug>.md` |
| 3-5 | Deck, slides, narration, MP4 | `batch_render.py` / `build_one_video.py` | `videos/<slug>.mp4` |
| 6 | Publish video | `upload_videos_r2.py` | Object in Cloudflare R2 |
| 7 | Study packs | `make_study_packs.py <course>` | `study-packs/Module_*.docx` |

## Narration and voice standards

- Azure Neural TTS in an East US region.
- **Alternating voices** by lesson parity (odd and even lessons use different voices) for variety.
- The TTS helper has retry/backoff so transient failures don't break a batch render.

## Adding a new course

1. Create `course-materials/<slug>/` with `course.json` and a `decks/` folder.
2. Author the deck JSONs (a shared authoring spec plus a gold-standard deck keeps quality consistent; subagents can draft modules in parallel). **Validate** the JSON and required fields.
3. Run `convert_decks_to_md.py <slug>` to generate lesson pages.
4. Render videos with the batch script, then upload them to R2.
5. Run `make_study_packs.py <slug>` for study packs.
6. Add a catalog entry in `site/src/consts.ts` (`COURSES`). The site picks up the lessons automatically.
7. Commit on `dev`, open a PR, verify the preview, merge.
