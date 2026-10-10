---
title: "salloma.com: Project Status & Roadmap"
project: "salloma"
summary: "A snapshot of what has shipped on the salloma.com platform, what is in progress and what is next."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-07-27"
order: 6
parent: "salloma"
---

Status of the platform build-out. This page is a snapshot (updated 2026-07-27); the live source of truth is the project backlog.

**Milestone:** the platform is live in production as a **12-course, 360-lesson** training site with full **authentication**, a **hybrid access gate** (first 2 lessons of every course free, then free registration; all videos free for now, no enrollment or paywall gating), **progress tracking**, **user profiles and onboarding**, an **admin dashboard**, course catalog and search, an AI tutor with open-answer grading, a Custom Training Advisor, dark theme, and automated CI/CD. Every published course ends with a **Capstone & Career Launch** module (capstone, portfolio, resume/ATS, LinkedIn and job search). Issued completion certificates are **durable** (grandfathered when courses grow). In July 2026 the site moved to the custom domain [www.salloma.com](https://www.salloma.com), gained Spreadcom branding and a public contact form, and the homepage was reworked into a compact 12-course catalog grid under a "first IT role" hero.

## Courses live

12 courses and 360 lessons are published. An earlier course exists in the repo but is **unpublished**: it is not in the site catalog and is excluded from chatbot citations.

| Course | Lessons | Focus |
| --- | --- | --- |
| **IT Helpdesk Tier 1/2** | 65 | Support fundamentals, OS/networking, ticketing, customer skills, plus Capstone & Career Launch |
| **Cloud Engineer to Applied GenAI Engineer** | 37 | API fluency, RAG, agents, production engineering, capstone, resume and LinkedIn |
| **IT Helpdesk Tier 3 (Advanced)** | 36 | RCA mindset, Windows internals, advanced troubleshooting, automation, plus Capstone & Career Launch |
| **VDI & End-User Computing Engineer** | 34 | AVD across all four AZ-140 domains, Windows 365, FSLogix/app attach, Citrix/Omnissa cross-platform, plus Capstone |
| **Cloud Security Engineer / M365 Security Architect** | 31 | Zero Trust, Entra, Intune/Defender, Purview, Sentinel/KQL, automation, Azure platform security, AI/agent security and Security Copilot; 7 modules |
| **Data Scientist** | 28 | Stats/ML foundations, productionization/MLOps, GenAI/LLM for data science, plus Capstone & Career Launch |
| **Machine Learning Engineer** | 27 | Classic ML to deep learning, LLMs/RAG/fine-tuning, cloud serving and monitoring, plus Capstone & Career Launch |
| **MLOps Engineer** | 25 | Tracking/registry, Kubernetes serving, CI/CD, LLMOps and GPU serving, plus Capstone & Career Launch |
| **AI Application Developer (2026)** | 21 | LLM app patterns, tool use, RAG, deployment, MCP and Structured Outputs, plus Capstone & Career Launch |
| **Agentic AI Engineer** | 20 | Agent frameworks, tools, orchestration, safety, plus Capstone & Career Launch |
| **AI Product Manager** | 20 | AI product strategy, building blocks, responsible AI, plus Capstone & Career Launch |
| **Junior Digital Marketing** | 16 | Channels, analytics, campaigns, portfolio and career |
| **Total** | **360** | **12 published courses** |

## Completed

| Theme | What shipped |
| --- | --- |
| Homepage revamp (July 2026) | 12-course compact tile grid under the hero, short per-course blurbs, WCAG AA fixes, whole-tile links, hero reframed around "your first IT role" |
| VDI & EUC Engineer course | 7 modules and 34 lessons; vendor-neutral EUC core, AVD mapped to the AZ-140 domains, Citrix/Omnissa grounding; all videos and study packs shipped |
| Branding, contact and delivery polish | Spreadcom footer, public contact form, AI avatar presenter pipeline for course videos, custom domain with www as canonical |
| July 2026 review remediation | Certificate-forging guard and certificate grandfathering, free preview across all courses, Node 22 alignment, full R2 video audit, new MCP and AI/agent security lessons, security hygiene fixes, 24 study packs; seven-reviewer peer reviews on every wave |
| Career-Readiness Standard | A 4-lesson Capstone & Career Launch module added to every published course: 35 new lessons and 35 narrated videos, plus certification-currency fixes |
| Cloud security course update | Azure Platform Security module added to close an SC-500 domain gap; all course videos shipped |
| Course quality remediation | Errata and critical fixes, then net-new curriculum (GenAI/LLM modules, MCP lessons, LLMOps, modern endpoint provisioning) |
| Custom Training Advisor | Resume analysis, match-or-generate course, admin review and publish, reuse library, AI tutor and open-answer grading, completion certificates |
| Content platform and catalog | Multi-course content model, catalog UI, course-aware renderer, landing pages, search and filtering, dark theme |
| Authentication and user management | Entra External ID, register/login/logout, roles and claims, protected routes and API authorization, profile and onboarding |
| Lesson progress tracking | Cosmos DB, enrollment API, progress read/write APIs, quiz score capture, progress UI (ticks, percentages, resume) |
| Foundation | Git and branching, hosting, dev/prod environments, CI/CD |
| Video delivery groundwork | R2 upload/sync pipeline, immutable caching, naming conventions |
| Admin dashboard core | Admin shell and role guard, user list/detail, sign-up and active-user metrics, completion and engagement analytics |

## In progress

| Item | Remaining |
| --- | --- |
| Homepage IT-role narrative | Awaiting approval to merge to production |
| Course quality remediation (Phase 2) | A few remaining course tasks queued |
| Video delivery via R2 | Signed short-lived URLs and player integration, then make the bucket private |
| Admin dashboard | Most-watched/drop-off analytics (needs view-event tracking) and course management |
| Foundation | Bare-apex domain (blocked on a domain transfer) and configuration hardening |
| Content production pipeline | Pipeline hardening and voice/QA standards |

## Not started

Quality, security and launch: automated tests, security review, accessibility pass to WCAG 2.1 AA, performance and cost review, monitoring and alerting and a go-live runbook.

## Recommended next slice

1. Ship the homepage narrative and decide on the site brand/title.
2. Security hardening follow-ups from the June and July reviews (tracked in the private backlog).
3. Quality and security epic: homepage smoke test in CI (assert 12 course tiles in the build), accessibility, performance/cost, go-live runbook.

**Peer review:** every push runs a persona review framework before merge. Course content additionally passes a seven-reviewer review (five personas, a professor-grade reviewer and a top-industry peer), each verifying certification-domain coverage, plus an **adversarial fact-check** against authoritative documentation (e.g. Microsoft Learn) before the production merge.
