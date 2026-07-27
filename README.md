# kwasi-portfolio

Public portfolio site for Kwasi Asare — Senior Systems Engineer. Front door
for the [Engineering Portfolio program](../../docs/plans/00-program-plan.md):
a professional summary, a projects grid, and a detail page per project
(problem → architecture → demo → stack → repo link).

Built with [Astro](https://astro.build) content collections, static output,
no external CDNs (all fonts/assets are local system fonts and inline SVG).
Dark/light theme follows `prefers-color-scheme` with a manual toggle
persisted in `localStorage`.

## Why Astro

Node/npm were available in the build environment, and the program plan
recommends Astro for this project ("content-driven, fast, low-maintenance").
Content collections let each project entry be one Markdown file validated
against a shared schema — publishing a shipped project is a content PR, not
a code change — and the build ships zero client-side JavaScript beyond the
~20-line theme-toggle script.

## Run locally

Requires Node.js >= 22.12.0 (Astro 7 `engines` requirement; verified with
`node --version` on this machine: v24.15.0).

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build       # runs `astro check` (type-check) then `astro build`
npm run preview      # serve the production build locally
```

`npm run build` outputs static files to `dist/`. This has been run and
verified during this build session — 9 pages generated, 0 type errors.

## Project structure

```
src/
  content.config.ts        # content collection schema (projects)
  content/projects/*.md    # one file per project — see "Add a project" below
  layouts/BaseLayout.astro # <head>, theme bootstrap script, Header/Footer
  components/              # Header, Footer, ThemeToggle, ProjectCard, StatusBadge
  pages/
    index.astro             # Home/About: summary, certifications, featured projects
    projects/index.astro     # Projects grid (all entries, sorted by `order`)
    projects/[slug].astro    # Project detail template
    404.astro
  styles/global.css         # design tokens (light/dark), reset, shared components
public/
  favicon.svg
staticwebapp.config.json    # Azure SWA routing/headers config
.github/workflows/
  azure-static-web-apps.yml # CI/CD: dev -> preview, master -> production
```

## Add a project entry (under 30 minutes)

1. Create `src/content/projects/<slug>.md` (the filename becomes the URL
   slug, e.g. `intune-as-code.md` → `/projects/intune-as-code/`).
2. Fill in frontmatter per the schema in `src/content.config.ts`:

   ```yaml
   ---
   title: "Project Name"
   order: 2                  # sort position on the grid
   status: "shipped"         # "shipped" | "in-progress" | "planned"
   epic: "EP-2"               # Jira epic reference
   summary: "One or two sentences for the grid card."
   problem: "What problem this solves, 2-4 sentences."
   architecture: "How it works, 2-5 sentences."
   demo: "Short note, or delete once demoUrl is set."
   demoUrl: "https://..."     # optional — link to a demo GIF/recording
   stack:
     - "Technology"
     - "Another one"
   repoUrl: "https://github.com/..."  # optional — omit until the repo is public
   repoName: "repo-name"
   ---

   Optional freeform Markdown body — renders below the structured sections
   on the detail page (e.g. extra links, acknowledgements).
   ```

3. `npm run build` — `astro check` will fail loudly if a required field is
   missing or the wrong type, so a bad entry can't ship silently.
4. Commit to `dev`, push, let it land on the preview environment, then PR to
   `master` once approved. That's the whole loop — no code changes needed to
   publish a new project.

**Status badges are honest by design.** `planned` renders as "In
Development" and `in-progress` as "In Progress"; only flip a project to
`shipped` once its repo is public with green CI, per the program's
definition of done.

## Deployment (Azure Static Web Apps)

This build stops short of creating cloud resources or pushing to GitHub —
those are follow-up steps once you're back:

1. **Create the SWA resource** (free tier) in the Azure Portal or via
   `az staticwebapp create`, with **master as the production branch** and
   this repo linked (or deploy manually the first time and link CI after).
   Per the standing Azure preference, do **not** create a separate dev
   resource group — SWA preview environments cover `dev` on the same
   resource.
2. **Add the deployment token** SWA gives you as a GitHub Actions secret
   named `AZURE_STATIC_WEB_APPS_API_TOKEN` (repo Settings → Secrets and
   variables → Actions). `.github/workflows/azure-static-web-apps.yml`
   already references this secret name as a placeholder — the workflow will
   fail until the secret exists.
3. **Push `dev`** — the workflow builds and deploys to an automatic preview
   environment (its own URL) tied to the `dev` branch.
4. **Merge `dev` → `master` via PR** once you've tested the preview — that
   push deploys to the production URL.
5. **Custom domain** (optional, plan story 6) — add it in the SWA resource
   once you've decided on one; not configured here.

`app_location` is `/` and `output_location` is `dist` in the workflow,
matching Astro's static build output. `skip_app_build: true` is set because
the workflow builds the site itself (with `npm run build`, which includes
the `astro check` type-check) before the deploy step, rather than letting
the Oryx builder inside the SWA action rebuild it.

## Design decisions

- **No external CDNs / fonts.** The font stack is the OS system font
  (`-apple-system, "Segoe UI", Roboto, ...`); the only icons are inline SVG
  in `ThemeToggle.astro` and the favicon. Nothing calls out to a third-party
  host, per program constraints.
- **Theme:** default follows `prefers-color-scheme`; the toggle button
  writes an explicit `light`/`dark` override to `localStorage`, applied by a
  small inline script in `<head>` (before first paint, to avoid a flash of
  the wrong theme) and read again by `ThemeToggle.astro`'s client script.
- **Content collections over hardcoded pages.** Every project is one
  Markdown file; the grid and detail template are generic and driven by
  `src/content.config.ts`'s Zod schema, so a malformed entry fails the build
  instead of shipping a broken page.
- **Personal details kept minimal.** Only name, title, certification areas,
  and a LinkedIn link appear anywhere on the site — no phone number or email
  address, per program scope.

## Status

All six program projects are seeded in `src/content/projects/` with honest
status badges:

| Project | Status |
|---|---|
| Identity Lifecycle Automation (EP-1) | In Progress |
| Intune-as-Code (EP-2) | In Development |
| Azure Landing Zone (EP-3) | In Development |
| Security Reporting Dashboard (EP-4) | In Development |
| Containerize the Platform (EP-5) | In Development |
| Portfolio Showcase Website (EP-6, this site) | In Progress |

Update an entry's `status` to `shipped` (and add `repoUrl`/`demoUrl`) as each
project's own "publish entry" story completes, per
[`docs/plans/06-portfolio-site.md`](../../docs/plans/06-portfolio-site.md).
