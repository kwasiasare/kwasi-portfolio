---
title: "AVD Manager — Azure Virtual Desktop Operations"
order: 1
status: "shipped"
category: "product"
org: "Spreadcom LLC"
summary: "Operations console for Azure Virtual Desktop, with a public, no-sign-in demo on a fictional Contoso estate."
problem: "Day-to-day Azure Virtual Desktop operations are spread across many Azure Portal blades. The app puts host pools, sessions, images, scaling, cost, profiles, governance checks and audit in one place for the people who run the estate."
architecture: "A React 18 and Fluent UI v9 single-page app on Azure Static Web Apps with Microsoft Entra sign-in. The API runs on Azure Functions v4 (Node 22, Flex Consumption) with a managed identity and no secrets, and uses the Azure SDKs for Desktop Virtualization, Compute, Cost Management, Network, Storage and Monitor / Log Analytics (KQL). Bicep defines 11 least-privilege custom role definitions. Viewer, operator and admin roles are mapped from Entra groups and enforced in the API. Every change is written to an append-only audit with the operator's reason."
gallery:
  - image: "./assets/avd-manager/01-dashboard.png"
    alt: "AVD Manager dashboard showing sessions, scaling phase, image version, cost and alerts for the Contoso demo estate"
    caption: "Dashboard: sessions, scaling phase, image version, cost and alerts (fictional Contoso demo)"
  - image: "./assets/avd-manager/02-host-pools.png"
    alt: "Host pool page listing session hosts with health status and power controls"
    caption: "Host pool: session hosts with health and power controls (fictional Contoso demo)"
  - image: "./assets/avd-manager/03-sessions.png"
    alt: "Sessions page listing user sessions with message and log-off actions"
    caption: "Sessions: user sessions with message and log-off actions (fictional Contoso demo)"
  - image: "./assets/avd-manager/04-cost.png"
    alt: "Cost page showing month-to-date spend, projected month-end and spend by resource group"
    caption: "Cost: month-to-date spend, projected month-end and spend by resource group (fictional Contoso demo)"
  - image: "./assets/avd-manager/05-governance.png"
    alt: "Governance page listing read-only checks with pass, warn and fail results"
    caption: "Governance: read-only checks with pass, warn and fail results (fictional Contoso demo)"
stack: ["React 18", "Fluent UI v9", "Vite", "TypeScript", "Azure Functions v4", "Azure Static Web Apps", "Microsoft Entra ID", "Managed identity", "Azure Virtual Desktop", "Azure Compute Gallery", "FSLogix", "Log Analytics (KQL)", "Bicep", "GitHub Actions"]
repoUrl: "https://github.com/kwasiasare/avd-manager-portfolio"
repoName: "avd-manager-portfolio"
repoVisibility: "public"
liveUrl: "https://salmon-beach-0b7d4641e.4.azurestaticapps.net/"
---

## Try it

Open the [live demo](https://salmon-beach-0b7d4641e.4.azurestaticapps.net/). No sign-in is needed. Use the role switcher to compare what a viewer, an operator and an admin can see and do.

The demo runs on a fictional, in-memory Contoso estate with a reset button. Reversible actions are simulated and written to the audit; destructive actions are disabled.

## Features

- **Dashboard and incident view.**
- **Host pools and session hosts:** health, drain, power actions, guided provisioning and a staged rollout wizard.
- **Sessions:** search, message, log off and broadcast.
- **Images:** Azure Compute Gallery versions and a guided golden-image build.
- **Scaling plans:** schedules, history and an emergency override.
- **Cost:** spend, host runtime, idle hosts, savings and FSLogix usage.
- **FSLogix profiles:** size, orphan and duplicate detection, restore and reset.
- **Monitoring:** curated KQL views, with alert acknowledge and snooze.
- **Governance:** 12 read-only checks, for example delete locks, private endpoints, Key Vault purge protection, budget and diagnostic settings.
- **Audit** of every change, plus a command palette and keyboard shortcuts.
