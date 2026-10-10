---
title: "IntuneManager"
order: 4
status: "shipped"
category: "product"
org: "Spreadcom LLC"
summary: "Web app that turns Intune app packaging and deployment into one workflow for Windows and macOS, with a Claude agent doing the packaging."
problem: "Packaging and deploying apps through Intune means checking versions by hand, building .intunewin packages, writing install, uninstall and detection scripts, and moving between several portal blades. IntuneManager puts discovery, packaging, upload, deployment history and device status in one web app, and a Claude agent handles the packaging steps."
architecture: "A React 18 and Vite single-page app and an Express (Node 20, TypeScript) API run in one container on Azure Container Apps, scaling to zero, with Azure SQL serverless on the free offer (auto-pause, with a database-waking notice) through Prisma. Packaging is Linux-native: PowerShell 7 with the WinTuner module and SvRooij.ContentPrep builds .intunewin files (IntuneWinAppUtil.exe is not used), and the Graph token reaches each PowerShell process only through a per-process environment variable that is redacted from logs. Claude is served from Microsoft Foundry through the app's user-assigned managed identity, so no API key is stored for the live path; the direct Anthropic API and Bedrock are fallbacks, and the model is chosen by a setting (default Claude Sonnet). Long operations run as background jobs streamed over Server-Sent Events inside the 240 s ingress timeout. Azure Files is mounted for packaging source and output, and installers up to 4 GiB upload straight to Blob storage. Key Vault is read through the managed identity. OpenID Connect sign-in is pinned to one Entra tenant, with an allow-list and viewer, operator, admin and superadmin roles. The Microsoft Graph connection uses a separate delegated flow with encrypted tokens. GitHub Actions deploys GHCR images over OIDC, with migrations and a health-check smoke test. Infrastructure is Bicep, including a budget alert."
stack: ["React 18", "Vite", "TypeScript", "Express", "Node 20", "Prisma", "PowerShell 7", "WinTuner", "Microsoft Graph API", "Microsoft Intune", "WinGet", "Chocolatey", "Homebrew", "Claude via Microsoft Foundry", "Azure Container Apps", "Azure SQL (serverless)", "Azure Key Vault", "Managed identity", "Azure Blob Storage", "Bicep", "GitHub Actions (OIDC)"]
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
docsSlug: "intunemanager"
---

Sign-in is restricted to allow-listed users in Spreadcom's own tenant, so there is no public demo link. Source is in a private repository and available on request.

## Features

- **Windows Win32 packaging by a Claude agent:** eleven tools cover winget and Chocolatey search, version lookup, installer download, install, uninstall and detection scripts, package settings, build, create and upload to Intune. Package-only and upload-only modes let an operator review a package before it reaches Intune. Newer versions are detected, and an "Update All" queue applies them.
- **macOS:** .pkg and .dmg upload with bundle inspection, and a Homebrew cask catalog with one-click deploy.
- **App deletion (admin only):** retire a Windows or macOS app from the tenant with a typed-name confirmation; deletion is blocked while the app still has assignments unless explicitly forced, and every attempt is written to the admin audit log.
- **Devices:** compliance, Windows and driver update sync, and diagnostics.
- **History and audit:** deployment history with CSV and JSON export, an audit log and an admin audit.
- **Hardening:** CSRF and Origin checks, an SSRF policy, an upload allow-list with magic-byte checks and size caps, and a non-root container.
