---
title: "Portfolio Showcase Website"
order: 6
status: "in-progress"
epic: "EP-6"
summary: "The site you're looking at — a public front door for the whole program, built with Astro and updated after every project ships."
problem: >
  Six shipped projects are only evidence if someone can find them. This site
  is the front door for recruiters and hiring managers: a professional
  summary, a projects grid backed by one content file per project, and a
  detail page per project that walks problem, architecture, demo, stack, and
  repo link. It's scaffolded early in the program and updated at the end of
  every later project, so the portfolio grows alongside the work instead of
  being written after the fact.
architecture: >
  Built with Astro using content collections — each project is one Markdown
  file under src/content/projects/, validated against a shared schema, so
  publishing a shipped project is a small content PR rather than a code
  change. The site is static output with no external CDNs or client-side
  frameworks beyond a small theme-toggle script; dark/light mode follows
  prefers-color-scheme with a manual override persisted in localStorage.
  Deployment target is Azure Static Web Apps free tier, with dev branch
  pushes deploying to an SWA preview environment and master deploying to
  production, per the standing Azure preference for preview environments
  over separate dev resources.
demo: "In development — this site is the demo. Azure Static Web Apps deployment is pending; once live, the production URL will be linked here."
stack:
  - "Astro"
  - "TypeScript"
  - "Azure Static Web Apps"
  - "GitHub Actions"
repoName: "kwasi-portfolio"
---

Scaffolded right after Identity Lifecycle Automation (EP-1) started, per the
program plan. See Jira epic [EP-6](https://spreadcomgh.atlassian.net/browse/EP-6).
