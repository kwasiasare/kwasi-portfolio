---
title: "IntuneManager"
order: 4
status: "shipped"
category: "product"
org: "Spreadcom LLC"
summary: "Web app that turns Intune app packaging and deployment into one workflow for Windows and macOS, with a Claude agent doing the packaging."
problem: "Packaging and deploying apps through Intune means checking versions by hand, building .intunewin packages, writing install, uninstall and detection scripts, and moving between several portal blades. IntuneManager puts discovery, packaging, upload, deployment history and device status in one web app, and a Claude agent handles the packaging steps."
architecture: "A React 18 and Vite single-page app and an Express (Node 20, TypeScript) API run in one container with PowerShell 7 and WinTuner for .intunewin packaging. It runs on Azure Container Apps, scaling to zero, with Azure SQL serverless on the free offer (auto-pause, with a database-waking notice) through Prisma. Key Vault is read through a managed identity, and installers up to 4 GiB are stored in Blob storage. OpenID Connect sign-in is pinned to one Entra tenant, with an allow-list and viewer, operator and admin roles. The Microsoft Graph connection uses a separate delegated flow with encrypted tokens. GitHub Actions deploys GHCR images over OIDC, with migrations and a health-check smoke test. Infrastructure is Bicep, including a budget alert."
stack: ["React 18", "Vite", "TypeScript", "Express", "Node 20", "Prisma", "PowerShell 7", "WinTuner", "Microsoft Graph API", "Microsoft Intune", "WinGet", "Chocolatey", "Homebrew", "Claude API", "Azure Container Apps", "Azure SQL (serverless)", "Azure Key Vault", "Managed identity", "Azure Blob Storage", "Bicep", "GitHub Actions (OIDC)"]
repoVisibility: "private"
gallery:
  - image: "./assets/intunemanager/01-dashboard.png"
    alt: "Dashboard with app inventory, OS version distribution and device health tiles; signed-in account blurred"
    caption: "Dashboard: app inventory and device health at a glance"
  - image: "./assets/intunemanager/02-installed-apps.png"
    alt: "Installed Apps grid of Win32 apps with versions, WinTuner update check and Details and Delete actions"
    caption: "Installed Win32 apps with WinTuner version checks"
  - image: "./assets/intunemanager/03-catalog.png"
    alt: "App Catalog of recommended enterprise apps, each with a Deploy button that packages it as an .intunewin file"
    caption: "App Catalog: one click to package and deploy"
  - image: "./assets/intunemanager/04-devices.png"
    alt: "Devices table with compliance, Windows update and driver update status; device names and users blurred"
    caption: "Device compliance (device names and users blurred)"
  - image: "./assets/intunemanager/05-history.png"
    alt: "Deployment history with operation type, status, duration and error details, plus CSV export"
    caption: "Deployment history with CSV/JSON export"
confluenceUrl: "https://spreadcomgh.atlassian.net/wiki/spaces/IM/pages/1376300"
confluenceLabel: "Confluence docs (IntuneManager)"
---

Sign-in is restricted to allow-listed users in Spreadcom's own tenant, so there is no public demo link. Source is in a private repository and available on request.

## Features

- **Windows Win32 packaging by a Claude agent:** winget and Chocolatey search, installer download, install, uninstall and detection scripts, build and upload to Intune. Newer versions are detected, and an "Update All" queue applies them.
- **macOS:** .pkg and .dmg upload with bundle inspection, and a Homebrew cask catalog with one-click deploy.
- **Devices:** compliance, Windows and driver update sync, and diagnostics.
- **History and audit:** deployment history with CSV and JSON export, an audit log and an admin audit.
- **Hardening:** CSRF and Origin checks, an SSRF policy, an upload allow-list with magic-byte checks and size caps, and a non-root container.
