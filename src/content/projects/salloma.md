---
title: "salloma.com — IT Training Platform"
order: 1
status: "shipped"
category: "product"
org: "Spreadcom LLC"
summary: "Live IT training platform with 360 lessons across 12 courses and four Claude-powered features served from Microsoft Foundry: a course-grounded chatbot, a per-lesson tutor, a grader and a training advisor."
problem: "Hands-on IT career training needs structured, project-based courses and help that stays on the material. salloma.com delivers lessons with video, learning objectives, and an AI tutor grounded in the course content rather than the open web."
architecture: "Astro front end on Azure Static Web Apps with video on Cloudflare R2 and an Azure Functions API. Every student-facing AI feature calls Claude through Microsoft Foundry, so models run inside Spreadcom's Azure subscription with Azure billing and governance. The model for each task is chosen in app settings (Haiku for routing, Sonnet for answers, Opus for the tutor, grader and advisor), so it can be changed without a code change. The API has a 118-test suite, a strict Content Security Policy and prompt-injection hardening."
gallery:
  - image: "./assets/salloma/01-home.png"
    alt: "salloma.com home page listing project-based AI career courses"
    caption: "Home: course catalogue"
  - image: "./assets/salloma/02-course.png"
    alt: "Course overview page for the VDI and End-User Computing Engineer track"
    caption: "Course overview"
  - image: "./assets/salloma/03-lesson.png"
    alt: "Lesson page with video player and learning objectives"
    caption: "Lesson with video and objectives"
stack: ["Astro", "Azure Static Web Apps", "Azure Functions", "Microsoft Foundry", "Claude (Haiku, Sonnet, Opus)", "Retrieval-grounded answers", "Cloudflare R2", "Microsoft Entra External ID", "Azure Cosmos DB", "Log Analytics (KQL)", "Content Security Policy"]
liveUrl: "https://www.salloma.com"
repoUrl: "https://github.com/kwasiasare/tw-training-site"
repoName: "tw-training-site"
repoVisibility: "public"
confluenceUrl: "https://spreadcomgh.atlassian.net/wiki/spaces/Trainingwe/pages/27361281"
---

## How the chatbot answers a question

The chatbot is a floating widget on every page for signed-in students. It answers from the course material, not the open web:

1. **Find the right lessons.** A fast, low-cost model (Claude Haiku) classifies the question and picks matching lessons from an index of all 360 lessons, using titles and metadata first. There is no vector database: a two-stage lookup over a generated lesson index was enough and is cheaper to run.
2. **Answer only from those lessons.** A stronger model (Claude Sonnet) gets the full text of just the selected lessons and writes the answer from that text, with links back to the lessons it used.
3. **Site help and everything else.** Questions about the site itself are answered from a curated FAQ. Off-topic questions, and questions no lesson covers, get a fixed reply instead of a guess.

Splitting the work this way (a cheap model to route, a stronger one to answer) was a deliberate cost and latency decision. Routing is high-volume and easy; answering from text that has already been retrieved does not need the largest model.

## Guardrails

- **Grounded or nothing:** answers come only from retrieved lesson text or the FAQ; no match means a fixed "can't help with that" reply.
- **Scope boundary:** course content and site help only, with zero reads of student account data. Account-aware help is a separate phase that needs its own approval before it is built.
- **Prompt-injection guarding** on chat input, plus tightened off-topic handling.
- **Rate limiting** on the chat endpoint, because a widget on every page is an easy target for abuse.
- **Signed-in students only**, behind a feature flag.
- **Monitoring:** every request writes a structured trace; KQL queries track volume, failure rate and refusal rate.
- **Content hygiene:** unpublished courses are excluded from the index, after a production check caught answers citing a retired course.

## Applying this to company data

The same pattern is how I would build a chatbot that answers employees' or customers' questions from a company's own documents, such as policies, runbooks, product manuals or IT knowledge-base articles:

- Index the documents with their titles and metadata, and keep personal or restricted data out of the index until it has its own approval gate.
- Use a small model to route each question to the right documents, and a stronger model to answer only from those documents, with citations back to the source.
- Refuse anything outside scope instead of guessing, rate-limit the endpoint, and log every request so refusals and failures can be reviewed.
- Host the models through Microsoft Foundry in the company's own Azure subscription, so data, billing and access stay under the company's existing governance, and model choices can change in settings as needs and costs change.
