---
title: "Shopify Manager — Store Operations Dashboard"
order: 5
status: "in-progress"
category: "product"
org: "Spreadcom LLC"
summary: "One private web app to run two Shopify stores — a side-by-side dashboard and an approvals inbox, with an automated morning run planned — on a serverless Azure stack with no stored passwords."
problem: "Running two stores meant a daily checklist across Shopify, ad platforms and a scripted browser run writing markdown logs. The app turns that into a dashboard, approval cards and scheduled jobs, so the owner reviews and approves instead of clicking through admin pages."
architecture: "A React single-page app on Azure Static Web Apps signs in with Microsoft Entra ID and calls an Express API on Azure Container Apps that validates the Entra token against an allow-list. A scheduled Container Apps Job, built from the same image as the API, refreshes store data from the official Shopify Admin GraphQL API into Azure SQL. Everything runs as a user-assigned managed identity: Azure SQL uses Entra-only authentication, secrets live in Key Vault and are referenced by URL, and images are pulled from Azure Container Registry with the same identity, so no password exists anywhere. GitHub Actions deploys through OIDC federated credentials; infrastructure is Bicep with a what-if check on every change and a confirm-gated deploy. Dev runs as a named preview environment on the same resources; production deploys only after the owner approves the merge."
stack: ["React 18", "Vite", "TypeScript", "Express", "Zod", "Prisma", "Microsoft Entra ID (MSAL)", "Shopify Admin GraphQL", "Azure Static Web Apps", "Azure Container Apps + Jobs", "Azure SQL (Entra-only)", "Azure Key Vault", "Managed identity", "Azure Container Registry", "Log Analytics", "Bicep", "GitHub Actions (OIDC)"]
repoVisibility: "private"
gallery:
  - image: "./assets/shop-manager/01-dashboard.png"
    alt: "Side-by-side dashboard for two stores with traffic charts, catalog counts, collection coverage and price anomalies; store names and sales figures blurred"
    caption: "Dashboard: both stores side by side (store names and sales figures blurred)"
  - image: "./assets/shop-manager/02-inbox.png"
    alt: "Approvals inbox listing draft-and-redirect cards for sold-out products, each with created and expiry times"
    caption: "Approvals inbox: each card runs one allow-listed Shopify write when approved"
  - image: "./assets/shop-manager/03-runs.png"
    alt: "Runs table showing the scheduled refresh job succeeding every fifteen minutes"
    caption: "Run history from the scheduled Container Apps Job"
  - image: "./assets/shop-manager/04-audit.png"
    alt: "Audit log of approval and agent events with actor, action, store, target and card; agent identifier and store codes blurred"
    caption: "Audit log of every approval and agent event (store codes blurred)"
liveUrl: "https://black-meadow-0de3a880f.2.azurestaticapps.net/"
---

Sign-in is limited to the store owner, so the live link shows the Microsoft sign-in screen. Source is in a private repository and available on request.

## Architecture

- **Web:** React 18 + Vite on Azure Static Web Apps (Free). The browser signs in with Microsoft Entra ID (MSAL) and sends an access token to the API.
- **API:** Express + Zod on Azure Container Apps (Consumption, scales to zero). Every request is checked against the Entra token and an allow-list of permitted users.
- **Scheduled refresh:** an Azure Container Apps Job on a cron schedule, from the same container image, pulls orders, products, collections and shipping settings from the Shopify Admin GraphQL API and writes them to the database.
- **Data:** Azure SQL with Entra-only authentication: a Basic-tier database in production and a serverless free-offer database for dev that auto-pauses when idle. Prisma for schema and queries.
- **Identity and secrets:** one user-assigned managed identity pulls images from Azure Container Registry, reads Key Vault through RBAC and connects to SQL with an Entra token. No SQL passwords or secrets in code, CI logs or app settings.
- **Shopify access:** a Dev Dashboard app installed on both stores; short-lived tokens through the client-credentials grant, refreshed before expiry.
- **Shopify writes:** limited to an allow-list of four mutations (product status, URL redirect, variant price update and publish). Each runs only from an approved card and is written to the audit log.
- **Delivery:** GitHub Actions with OIDC federated credentials (no stored Azure secrets); Bicep infrastructure with a what-if job on every change and a confirm-gated deploy; dev → preview → approve → production.

## Roadmap

1. **Read-only dashboard (built and live since 2026-10-07):** orders and revenue, funnel, active vs sold-out products, collection coverage, price anomalies, shipping checks and run history.
2. **Approvals inbox (built and live since 2026-10-07):** approval cards support approve, reject, snooze and retry. Approving a card runs the Shopify write, and every write goes to an audit log.
3. **Ads monitoring (planned):** Meta and Google Ads read access, plus one autonomous rule: pause a campaign that spends $30 or more with no add-to-carts, then notify.
4. **Morning run in the cloud (planned):** scheduled steps move to Container Apps Jobs; only browser-only steps stay on a desktop agent that reports back to the API.
5. **Content and alerts (planned).**
