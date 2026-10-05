---
title: "IntuneManager Enterprise"
order: 1
status: "shipped"
# TODO(kwasi): confirm current live URL — old prod hostname no longer resolves
category: "product"
org: "Spreadcom LLC"
summary: "Multi-tenant SaaS for managing Windows and macOS endpoints through Microsoft Intune: AI-assisted Win32 packaging, one-click catalog deploys, and a ~6,000-app macOS catalog."
problem: "Packaging and deploying applications to Intune is slow, manual, and repeated per tenant. IntuneManager Enterprise gives MSPs and IT teams a per-organisation tenant connection and a catalog-driven workflow so Windows and macOS apps can be packaged, encrypted, uploaded, and assigned without hand-building each package."
architecture: "Per-organisation Intune tenant connection with row-level data isolation. Windows: AI-powered Win32 packaging (WinTuner plus a Claude agent) and a WinGet-backed catalog with one-click deploy. macOS: a ~6,000-app catalog sourced from Homebrew Cask — download, unwrap dmg/zip, encrypt, upload to Intune, assign. Device health and compliance dashboards, audit trail, server-sent-event job logs, and Stripe billing. Hosted on Azure Container Apps."
stack: ["Microsoft Intune", "Microsoft Graph API", "WinTuner", "WinGet", "Homebrew Cask", "Claude agent", "TypeScript", "Docker", "Azure Container Apps", "Stripe", "Server-Sent Events"]
repoUrl: "https://github.com/kwasiasare/IntuneManager-Enterprise"
repoName: "IntuneManager-Enterprise"
repoVisibility: "public"
confluenceUrl: "https://spreadcomgh.atlassian.net/wiki/spaces/IME/pages/1015994"
confluenceLabel: "Confluence docs (IME)"
---

Also see the [IntuneManager project overview](https://spreadcomgh.atlassian.net/wiki/spaces/IM/pages/1376300) on Confluence.
