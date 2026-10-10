---
title: "salloma.com: AI Features, Architecture & Status"
project: "salloma"
summary: "Design of the student-facing Claude features on Microsoft Foundry: the cross-course chatbot, two-stage routing, guardrails and roadmap."
sourceLabel: "Mirrored from the project's Confluence documentation"
updated: "2026-10-10"
order: 9
parent: "salloma"
---

This page covers the AI surfaces on salloma.com ([www.salloma.com](https://www.salloma.com)), their trust boundaries and the roadmap. **All student-facing AI runs on Claude via Microsoft Foundry** (Anthropic models served through Azure, meeting the quality and safety bar for real students). The chatbot (phase 1) is live in production.

**One boundary rule.** Student-facing AI runs on Claude. Earlier internal, author-facing tooling that used a self-hosted local model platform has been discontinued and is not described here.

## 1. Student-facing surfaces

Three surfaces were live before the chatbot, all in the API layer's shared modules. All now run on Claude via Microsoft Foundry:

- **Tutor:** narrow per-lesson deep-dive Q&A.
- **Grader:** quiz and exercise grading.
- **Custom Training Advisor:** resume plus questionnaire produces a course match or a bespoke course pipeline.

These surfaces handle real students (and, for the advisor, real personal data) and are deliberately on Claude. They are not moved or duplicated onto internal-only systems.

## 2. Cross-course chatbot

**Phase 1 is live in production** behind a feature flag, verified with real Claude calls.

### Architecture summary

- **Surface:** a global floating widget in the base layout (every page), for signed-in students only. It runs alongside the per-lesson tutor and does not replace or widen it.
- **API:** a single chat endpoint with structured trace logging per request. Log Analytics (KQL) queries cover volume and outcome mix, failure rate and refusal rate.
- **Backend:** an Azure Functions API calls Claude through the Microsoft Foundry SDK. Models are deployed in the Azure tenant, so usage runs on Azure billing and governance. The model for each task (selection, answering, tutor/grader/advisor) is configured in app settings, so it can be changed without a code change. A direct Anthropic API key is a fallback only, used when the Foundry settings are absent.
- **Grounding:** a committed, generated bundle of all 360 lessons (unpublished courses excluded) read through a lightweight two-stage lookup: metadata index first, then targeted full-body fetch. There is no vector database. Site help answers from a curated FAQ. Off-topic and no-match questions get a fixed reply.
- **Guardrails:** tightened off-topic handling, prompt-injection guarding, and rate limiting from day one (the first rate limiting anywhere in this API, required because this is an ambient every-page surface).

### Two-stage model routing (the key engineering decision)

The approved plan named the largest model throughout. During implementation planning this was revised, with a cost comparison, to **two-stage routing**, because the pipeline's two sub-tasks have very different shapes:

- **Stage 1, intent classification and lesson selection:** Claude Haiku (a high-volume, low-difficulty routing task).
- **Stage 2, grounded answer from already-retrieved lesson text:** Claude Sonnet at low effort (answering from provided text is not work for the largest model).

Both stages run on Claude via Microsoft Foundry. This keeps the student-facing quality bar on Claude while controlling cost and latency.

### Why Foundry

Production chat failed on the direct Anthropic API (an invalid key, then an exhausted credit balance). Migrating all student-facing AI to Claude via Microsoft Foundry moved usage onto Azure billing and governance and removed the dependency on a separately funded API account. An alternative knowledge-base retrieval engine was never released and was closed as superseded.

### Post-launch production fixes

- **Stale-course citation bug:** the chatbot could cite lessons from an unpublished course, producing 404 citation links. The lesson-index builder now excludes unpublished courses, mirroring the exclusion in the site's content config. Reviewed, deployed and live-verified.
- **Formatted replies:** tutor and chatbot replies now render as formatted text (raw markdown was previously visible).

### Approval-gate history

This work crossed a new trust boundary (the first expansion of the public student-facing AI surface since the advisor) and was explicitly gated: scope was limited to course content and site help, with zero live account-data reads, and Claude was the approved engine. Phase 3 is **not** authorised by that approval and has its own separate future gate.

## 3. Roadmap

All items below are unstarted and awaiting prioritisation.

| Feature | Notes |
| --- | --- |
| Chatbot phase 2: site-help / FAQ scope expansion | Covered by the original approval (non-personal FAQ only) |
| Chatbot phase 3: account/progress-aware help | Requires its own separate approval gate (live Cosmos reads) |
| Cross-course search and discovery | Enrichment; largely independent of the chatbot gate |
| Personalised "what's next" recommendation | Enrichment |
| Progress dashboard enrichment | Enrichment; no AI dependency |
| Spaced-repetition quiz review | Enrichment |
| Certificate and badge expansion (milestone badges) | Enrichment; no AI dependency |
| "Recently updated" course banner | Needs re-scoping now that the internal tooling it planned to consume is discontinued |
