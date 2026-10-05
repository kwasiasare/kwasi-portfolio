---
title: "IntuneManager"
order: 2
status: "shipped"
category: "product"
org: "Spreadcom LLC"
summary: "Per-tenant Electron desktop app for Windows endpoint management through Microsoft Intune: device health, installed-app version drift against winget, and AI-assisted Win32 packaging and deployment."
problem: "Managing a Windows endpoint fleet in Intune typically requires navigating across multiple portal blades to check device compliance, app deployment status, manually version-checking each app, and hand-building .intunewin packages. IntuneManager consolidates these workflows into a single desktop application: a unified dashboard for device health and app inventory, automatic winget version checking per app, batch updating with a queued pipeline, and an AI agent that handles the full packaging process from installer download to deployment."
architecture: "Electron main process runs on Windows with a React renderer frontend. Core data lives in SQLite via better-sqlite3 and communicates with the renderer through IPC. PowerShell bridge spawns ps.exe to execute scripts that authenticate to Microsoft Graph and manage Intune resources. A Claude agent pipeline (11 tools across 3 job modes) orchestrates app discovery, installer download, script generation, package building via IntuneWinAppUtil, and upload to Intune. Device health, app version status, and deployment history persist in the local database with a TenantContext polling pattern (60-second refresh) to keep the connection status current."
stack: ["Electron", "React", "TypeScript", "Vite", "SQLite (better-sqlite3)", "PowerShell", "Microsoft Graph API", "Microsoft Intune", "WinGet", "Claude API", "IntuneWinAppUtil"]
repoVisibility: "private"
confluenceUrl: "https://spreadcomgh.atlassian.net/wiki/spaces/IM/pages/1376300"
confluenceLabel: "Confluence docs (IntuneManager)"
---
