---
title: "IntuneManager"
order: 3
status: "in-progress"
category: "product"
org: "Spreadcom LLC"
summary: "Per-tenant Electron desktop app for Windows endpoint management through Microsoft Intune: device health, installed-app version drift against winget, and AI-assisted Win32 packaging and deployment."
problem: "Managing a Windows endpoint fleet in Intune typically requires navigating across multiple portal blades to check device compliance, app deployment status, manually version-checking each app, and hand-building .intunewin packages. IntuneManager consolidates these workflows into a single desktop application: a unified dashboard for device health and app inventory, automatic winget version checking per app, batch updating with a queued pipeline, and an AI agent that handles the full packaging process from installer download to deployment."
architecture: "Electron main process on Windows with a React and TypeScript renderer built with Vite. Local state lives in SQLite and reaches the UI over IPC. A PowerShell bridge spawns powershell.exe to authenticate to Microsoft Graph and manage Intune resources. A Claude agent pipeline handles app discovery, installer download, script generation, .intunewin packaging with IntuneWinAppUtil, and upload to Intune, with separate package-only and upload-only modes so an admin can review a package before it is deployed."
stack: ["Electron", "React", "TypeScript", "Vite", "SQLite", "PowerShell", "Microsoft Graph API", "Microsoft Intune", "WinGet", "Claude API", "IntuneWinAppUtil"]
repoVisibility: "private"
confluenceUrl: "https://spreadcomgh.atlassian.net/wiki/spaces/IM/pages/1376300"
confluenceLabel: "Confluence docs (IntuneManager)"
---
