---
title: "salloma.com: Project Documentation"
project: "salloma"
summary: "Architecture, courses, platform capabilities and technology choices for the salloma.com IT training platform."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-10-09"
---

**Status:** A multi-course platform is live in production: 12 courses, 360 lessons, full authentication, a hybrid access gate, progress tracking, user profiles, an admin dashboard, course catalog and search, dark theme, videos on Cloudflare R2, Claude-powered AI features served from Microsoft Foundry, and automated CI/CD.

The platform hosts project-based courses that take learners to their first role. This page summarises its architecture, content and capabilities. The deeper documents are hosted on this site and listed in the documentation index below.

## Quick links

| Resource | Location |
| --- | --- |
| Production site | [www.salloma.com](https://www.salloma.com) |
| Source repository (public) | [github.com/kwasiasare/tw-training-site](https://github.com/kwasiasare/tw-training-site) |
| Hosting | Azure Static Web Apps (Standard), East US 2 |
| Video storage | Cloudflare R2 |
| Identity | Microsoft Entra External ID (CIAM) via SWA custom OIDC |
| Data | Azure Cosmos DB (serverless): enrollment, progress, profiles |
| AI | Claude via Microsoft Foundry: cross-course chatbot, per-lesson tutor, grader and training advisor |

## Courses

| Course | Lessons |
| --- | --- |
| **Helpdesk: No Experience to Tier 2** | 65 |
| **Cloud Engineer to Applied GenAI Engineer** | 37 |
| **Helpdesk Tier 3: Advanced Endpoint Engineering** | 36 |
| **VDI & End-User Computing Engineer** | 34 |
| **Cloud Security Engineer & M365 Security Architect** | 31 |
| **Data Scientist Career Accelerator** | 28 |
| **Machine Learning Engineer Bootcamp** | 27 |
| **MLOps Engineering** | 25 |
| **AI Application Developer** | 21 |
| **AI Product Management** | 20 |
| **Agentic AI Engineer** | 20 |
| **Junior Digital Marketing & Social Media Assistant** | 16 |
| **Total** | **360** |

An earlier career course stays in the repository but is unpublished; it was superseded by the AI Application Developer course.

## Platform capabilities

- **Authentication:** Entra External ID register/login/logout; user and admin roles.
- **Hybrid access gate:** the first 2 lessons of each course are free; the rest prompt sign-in.
- **Progress tracking:** per-lesson completion, quiz scores, resume, and a progress UI (Cosmos DB).
- **Profiles and onboarding:** editable display name, enrolled courses, first-run course selection.
- **Admin dashboard:** role-guarded; sign-ups, active users, completion and engagement analytics.
- **Catalog and search**, dark/light theme, and a course-aware content and video pipeline.
- **AI features (Claude via Microsoft Foundry):** a cross-course chatbot that routes each question to matching lessons and answers only from that lesson text; a per-lesson tutor; quiz grading; and a training advisor. Guardrails: course content and site help only, off-topic questions get a fixed reply, prompt-injection guarding, rate limiting, and request tracing in Log Analytics.

## Technology stack

| Layer | Choice | Why |
| --- | --- | --- |
| Site framework | Astro (static, multi-course) | Fast, content-driven; loads lessons from per-course folders |
| Hosting | Azure Static Web Apps (Standard) | Static hosting, PR preview environments, global CDN, managed Functions, custom OIDC |
| Identity | Microsoft Entra External ID (CIAM) | Free under 50k MAU; custom OIDC on the SWA Standard plan |
| Data | Azure Cosmos DB (serverless) | Enrollment, progress, and profile documents |
| AI | Claude via Microsoft Foundry (Haiku, Sonnet, Opus) | Models run inside the Azure tenant; the model per task is set in app settings, with no code change |
| Video delivery | Cloudflare R2 | Zero egress fees |
| Narration | Azure Neural TTS | Alternating voices |
| CI/CD | GitHub Actions | Build and deploy on push; preview environments on PRs |

## Documentation index

- [1. Architecture Overview](/docs/salloma-architecture/): components, multi-course data flow, technology choices, theming.
- [2. Deployment & CI/CD](/docs/salloma-deployment/): branching model, GitHub Actions pipeline, environments.
- [3. Cloudflare R2 Video Hosting](/docs/salloma-r2-video/): bucket setup, upload pipeline, delivery.
- [4. Local Development Guide](/docs/salloma-local-dev/): prerequisites, running the site, building content.
- [5. Content Production Pipeline](/docs/salloma-content-pipeline/): deck to page and video, course-aware tooling, adding a new course.
- [6. Project Status & Roadmap](/docs/salloma-roadmap/): what is done, in progress, and next.
- [7. Operations Runbook](/docs/salloma-operations/): redeploys, credential rotation, troubleshooting.
- [8. Lessons Learned](/docs/salloma-lessons-learned/): practical lessons from building the platform.
- [AI Features: Architecture & Status](/docs/salloma-ai-features/): chatbot design, model routing and guardrails.
