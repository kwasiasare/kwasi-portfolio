---
title: "Shop Manager — Store Operations Dashboard"
order: 5
status: "in-progress"
category: "product"
org: "Spreadcom LLC"
summary: "One private web app to run two Shopify stores — a side-by-side dashboard, an approvals inbox and an automated morning run."
problem: "Running two stores meant a daily checklist across Shopify, ad platforms and a scripted browser run writing markdown logs. The app turns that into a dashboard, approval cards and scheduled jobs."
architecture: "Planned in four phases, with Phase 1 in build. Phase 1 is a read-only dashboard: orders and revenue, funnel, active vs sold-out products, collection coverage, price anomalies, shipping checks and run history. Phase 2 adds an approvals inbox where Approve executes Shopify Admin GraphQL writes, with an audit log. Phase 3 adds ads monitoring (Meta Marketing API, Google Ads API) with a single autonomous rule: pause a campaign that spends $30 or more with no add-to-carts, then notify. Phase 4 moves the morning run to scheduled Azure Container Apps Jobs. Sign-in is with Microsoft Entra ID."
stack: ["React 18", "Vite", "TypeScript", "Express", "Zod", "Microsoft Entra ID (MSAL)", "Shopify Admin GraphQL", "Azure Container Apps + Jobs", "Azure Static Web Apps", "Bicep", "GitHub Actions"]
repoVisibility: "private"
---

Source is in a private repository and available on request.
