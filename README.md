# kwasi-portfolio

Public portfolio site for Kwasi Asare — Senior Systems Engineer. A
professional summary, a projects grid in two groups (products and client
work, then the Engineering Portfolio program), and a detail page per project
(problem → architecture → screenshots → demo → stack → links).

> This site is developed as one project (EP-6) within a larger six-project
> program plan. The full program plan lives outside this repository; in
> short, six sequenced projects — identity lifecycle automation,
> configuration-as-code, landing zone infrastructure, a security reporting
> dashboard, containerization, and this site — are each shipping as an
> independent, public GitHub repository with its own CI, tracked as Jira
> epics EP-1 through EP-6. Products and client systems built under Spreadcom
> LLC are listed alongside, in their own group.

Built with [Astro](https://astro.build) content collections, static output,
no external CDNs (all fonts/assets are local system fonts and inline SVG).
Dark/light theme follows `prefers-color-scheme` with a manual toggle
persisted in `localStorage`.

## Why Astro

Content-driven, fast, low-maintenance. Content collections let each project
entry be one Markdown file validated against a shared schema — publishing a
shipped project is a content PR, not a code change — and the build ships
zero client-side JavaScript beyond the ~20-line theme-toggle script.

## Run locally

Requires Node.js >= 22.12.0 (Astro 7 `engines` requirement).

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build       # runs `astro check` (type-check) then `astro build`
npm run preview      # serve the production build locally
```

`npm run build` outputs static files to `dist/`.

## Project structure

```
src/
  consts.ts                # shared constants (e.g. LinkedIn URL)
  content.config.ts        # content collection schema (projects)
  lib/projects.ts          # published-project query, category grouping/sorting
  content/projects/*.md    # one file per project (top level only) — see "Add a project"
  content/projects/assets/<slug>/  # gallery/diagram images for that project
  layouts/BaseLayout.astro # <head>, theme bootstrap script, Header/Footer
  components/              # Header, Footer, ThemeToggle, ProjectCard, StatusBadge,
                           # Gallery, ProjectLinks
  pages/
    index.astro             # Home/About: summary, certifications, featured projects
    projects/index.astro     # Projects grid (grouped by category, sorted by `order`)
    projects/[slug].astro    # Project detail template
    404.astro
  styles/global.css         # design tokens (light/dark), reset, shared components
public/
  favicon.svg
  robots.txt                # allow-all; preview-environment noindex is handled at the SWA level, not here
  staticwebapp.config.json  # Azure SWA routing/headers config (copied into dist/ as a public asset)
.github/workflows/
  azure-static-web-apps.yml # CI/CD: PR build gate, dev -> preview, master -> production
```

## Add a project entry (under 30 minutes)

1. Create `src/content/projects/<slug>.md` (the filename becomes the URL
   slug, e.g. `intune-as-code.md` → `/projects/intune-as-code/`).
2. Fill in frontmatter per the schema in `src/content.config.ts`:

   ```yaml
   ---
   title: "Project Name"
   order: 2                  # sort position within its category
   status: "shipped"         # "shipped" | "in-progress" | "planned"
   category: "product"       # "product" (renders first) | "program" (default)
   org: "Spreadcom LLC"      # optional context chip (products)
   epic: "EP-2"              # optional Jira epic (program entries)
   draft: false              # true = excluded from every build, no page at all
   summary: "One or two sentences for the grid card."
   problem: "What problem this solves, 2-4 sentences."
   architecture: "How it works, 2-5 sentences."
   diagram: "./assets/<slug>/architecture.png"   # optional
   diagramAlt: "Diagram description"
   demo: "Short note (optional)."
   demoUrl: "https://..."    # optional link to a recording
   gallery:                  # optional; first item is also the card thumbnail
     - image: "./assets/<slug>/01-dashboard.png"
       alt: "Describe what the screenshot shows"
       caption: "Optional caption"
   stack:
     - "Technology"
   repoUrl: "https://github.com/..."   # only with repoVisibility "public"
   repoName: "repo-name"
   repoVisibility: "public"  # "public" | "private" | "pending" (scan before release)
   confluenceUrl: "https://..."        # optional
   confluenceLabel: "Confluence docs"  # optional label
   liveUrl: "https://..."              # optional "Visit live site" button
   ---

   Optional freeform Markdown body — renders below the structured sections
   on the detail page (e.g. extra links, acknowledgements).
   ```

   Images live in `src/content/projects/assets/<slug>/` and are referenced
   relative to the `.md` file. Keep `.md` files at the top level of
   `src/content/projects/` (the collection glob is `*.md`). Leave `gallery`
   out until the image files exist, otherwise the build fails. Use PNG/JPG at
   1200px wide or more, with no tenant IDs, emails, or client names visible.

3. `npm run build` — `astro check` will fail loudly if a required field is
   missing or the wrong type, so a bad entry can't ship silently.
4. Commit to `dev`, push, let it land on the preview environment, then PR to
   `master` once approved. That's the whole loop — no code changes needed to
   publish a new project.

**Status badges are honest by design.** `planned` renders as "Planned",
`in-progress` as "In Progress", and `shipped` as "Shipped". For `program`
entries, only use `shipped` once the repo is public with green CI. For
`product` entries, `shipped` means in production and live for real users.

## Deployment (Azure Static Web Apps)

**Where it runs (moved 2026-10-07):** Static Web App `swa-kwasi-portfolio`
(Free tier, East US 2) in resource group `rg-portfolio`, subscription
"Azure subscription 1", Spreadcom tenant. Production:
https://lemon-wave-089b0760f.4.azurestaticapps.net. The `dev` preview is
https://lemon-wave-089b0760f-dev.eastus2.4.azurestaticapps.net. The repo
secret `AZURE_STATIC_WEB_APPS_API_TOKEN` holds this app's deployment token.


Cloud resource creation is a follow-up step outside this repository's code:

1. **Create the SWA resource** (free tier) in the Azure Portal or via
   `az staticwebapp create`, with **master as the production branch** and
   this repo linked (or deploy manually the first time and link CI after).
   Per the standing Azure preference, do **not** create a separate dev
   resource group — SWA preview environments cover `dev` on the same
   resource.
2. **Enable branch preview environments** on the SWA resource (Azure Portal
   → the Static Web App resource → Configuration → Environments) so pushes
   to `dev` (and other non-production branches) get their own preview URL
   instead of being rejected or falling back to production.
3. **Add the deployment token** SWA gives you as a GitHub Actions secret
   named `AZURE_STATIC_WEB_APPS_API_TOKEN` (repo Settings → Secrets and
   variables → Actions). `.github/workflows/azure-static-web-apps.yml`
   already references this secret name as a placeholder — the workflow will
   fail until the secret exists.
4. **Push `dev`** — the workflow builds and deploys to an automatic preview
   environment (its own URL) tied to the `dev` branch.
5. **Merge `dev` → `master` via PR** once you've tested the preview — that
   push deploys to the production URL.
6. **Custom domain** (optional) — add it in the SWA resource once a domain
   is chosen; not configured here (see the `TODO` in `astro.config.mjs`).

`app_location` is `/` and `output_location` is `dist` in the workflow,
matching Astro's static build output. `skip_app_build: true` is set because
the workflow builds the site itself (with `npm run build`, which includes
the `astro check` type-check) before the deploy step, rather than letting
the Oryx builder inside the SWA action rebuild it.

### CI/CD workflow structure

- A build-only **PR validation job** runs on every pull request (including
  fork PRs, which don't have access to repo secrets), so every PR gets a
  build/type-check signal even when the deploy job can't run.
- The **build-and-deploy job** runs on pushes to `dev`/`master` and on
  same-repo pull requests, building and then deploying via
  `Azure/static-web-apps-deploy@v1`. `production_branch: "master"` and a
  computed `deployment_environment` ensure only pushes to `master` hit
  production; pushes to `dev` (or any other branch) land on that branch's
  preview environment.
- Workflow-level `permissions` are scoped to `contents: read` and
  `pull-requests: write` (the minimum the SWA action needs to comment on
  PRs), a `concurrency` group cancels superseded runs per ref, and every job
  has a `timeout-minutes` ceiling.

## Design decisions

- **No external CDNs / fonts.** The font stack is the OS system font
  (`-apple-system, "Segoe UI", Roboto, ...`); the only icons are inline SVG
  in `ThemeToggle.astro` and the favicon. Nothing calls out to a third-party
  host, per program constraints.
- **Theme:** default follows `prefers-color-scheme`; the toggle button
  writes an explicit `light`/`dark` override to `localStorage`, applied by a
  small inline script in `<head>` (before first paint, to avoid a flash of
  the wrong theme) and read again by `ThemeToggle.astro`'s client script.
  Both `localStorage` accesses in the toggle's click handler are wrapped in
  `try/catch` so the toggle still works (for the current page load) in
  privacy modes that block storage.
- **Content collections over hardcoded pages.** Every project is one
  Markdown file; the grid and detail template are generic and driven by
  `src/content.config.ts`'s Zod schema, so a malformed entry fails the build
  instead of shipping a broken page.
- **Personal details kept minimal.** Only name, title, certification areas,
  and a LinkedIn link appear anywhere on the site — no phone number or email
  address, per program scope.
- **Content-Security-Policy allows `script-src 'unsafe-inline'`.** The only
  inline script on the site is the theme-bootstrap snippet in
  `BaseLayout.astro` (it must run before first paint, inline, to avoid a
  flash of the wrong theme). Hash-pinning that script would break on every
  edit to the snippet, which isn't a sustainable tradeoff for a two-person
  maintenance surface, so `'unsafe-inline'` is accepted for `script-src`
  specifically. Every other directive in `public/staticwebapp.config.json`
  is locked down (`default-src 'self'`, `object-src 'none'`,
  `frame-ancestors 'none'`, etc.).
- **Accessibility.** A global `:focus-visible` outline, a stretched-link
  pattern on project cards (the accessible link name is just the project
  title — badges/chips/CTA text sit outside the link), `role="list"` on
  chip lists that use `list-style: none` (which otherwise strips list
  semantics in some browsers), and hover-lift/transition effects gated
  behind `@media (prefers-reduced-motion: no-preference)`.

## Status

Program entries (`shipped` = public repo with green CI):

| Project | Status |
|---|---|
| Identity Lifecycle Automation (EP-1) | Shipped |
| Intune-as-Code (EP-2) | Shipped |
| Azure Landing Zone (EP-3) | Shipped |
| Security Reporting Dashboard (EP-4) | Shipped |
| Containerize the Platform (EP-5) | In Progress |
| Portfolio Showcase Website (EP-6, this site) | In Progress |

Product and client entries (`shipped` = live for real users):

| Project | Status |
|---|---|
| IntuneManager Enterprise | Shipped |
| Guardian Baseline | In Progress |
| Workforce Scheduling Platform | Shipped |
| salloma.com | Shipped |
| Azure Virtual Desktop Estate + AVD Manager | Draft (not built into the site) |
