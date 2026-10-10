---
title: "IntuneManager: Project Overview"
project: "intunemanager"
summary: "Architecture, Claude via Microsoft Foundry, authentication and session design, roles, security controls, data model, cost design and limitations of IntuneManager."
sourceLabel: "Mirrored from the project's repository overview, plus the October 2026 app-deletion and Foundry changes"
updated: "2026-10-10"
---

This page reflects the repository's project overview together with two October 2026 changes: admin-only deletion of Intune apps, and Claude served from Microsoft Foundry.

## What is IntuneManager?

IntuneManager is a single-tenant, AI-assisted web application for managing applications and devices in Microsoft Intune. It packages and deploys Windows (Win32) and macOS (pkg/dmg) apps, shows device and update health, and records an audit trail. Access is by Microsoft (Entra) sign-in with four role levels.

It runs as one container on Azure Container Apps. There is no desktop (Electron) client and no local password login in production.

### Core capabilities

**Windows applications**

- Package Win32 apps as `.intunewin` and create/upload them to Intune (WinTuner module + `SvRooij.ContentPrep`, running under PowerShell 7 on Linux)
- Claude-driven packaging workflow (winget/Chocolatey search, download, install/uninstall/detect scripts, build, create, upload)
- Installed-app inventory with newer-version detection and an "Update All" queue
- Direct-to-blob upload of large installers (up to 4 GiB)

**macOS applications**

- Manual upload of `.pkg` / `.dmg` installers (Intune `macOSPkgApp` / `macOSDmgApp`), inspected for bundle id and version
- Homebrew cask catalog with one-click deploy for casks that download a `.pkg`, a `.dmg` or a `.zip` containing a `.pkg`
- Installed macOS app list from Intune

**Administration**

- Role-based access: viewer, operator, admin, superadmin
- Tenant connect/disconnect (delegated Graph permissions, OAuth2 authorization code + PKCE, or device code)
- User allow-list management, admin audit log, deployment history with CSV/JSON export
- Admin-only deletion of an Intune app (Windows or macOS) with a typed-name confirmation; blocked while the app still has assignments unless explicitly forced, and every attempt (including refused ones) is written to the admin audit log
- Device list with compliance, Windows/driver update sync and diagnostics requests

## Architecture

| Layer | Technology |
| --- | --- |
| Frontend | React 18 + Vite SPA (HashRouter), built into the image and served by Express |
| Backend | Express on Node 20, TypeScript, Prisma |
| Database | Azure SQL (serverless, free offer), Prisma provider `sqlserver`, migrations via `prisma migrate deploy` |
| Graph/Intune bridge | PowerShell 7 scripts (`server/ps-scripts`) spawned by `services/ps-bridge.ts`; the Graph token reaches each script only through a per-spawn environment variable (never on the command line) and is redacted from logs |
| Storage | Azure Files mounted into the container for source and output; Blob Storage for direct installer uploads |
| Hosting | Azure Container Apps, West US 3, Consumption plan, single revision, min 0 / max 1 replica |
| Secrets | Held in Key Vault and read by a user-assigned managed identity |
| Claude | Claude via Microsoft Foundry, authenticated with the app's user-assigned managed identity (keyless, so no API key is stored for the live path); the direct Anthropic API and then AWS Bedrock are fallbacks; the model is chosen by a setting (default Claude Sonnet) |
| CI/CD | GitHub Actions (CI and deploy workflows), Azure login by OIDC |

### Authentication and sessions

- **User sign-in** (`/api/auth/signin-start` then `/api/auth/signin-callback`): OpenID Connect with identity-only scopes (`openid profile email`). The `id_token` signature, issuer, audience, nonce and tenant ID are verified against a single pinned tenant.
- **Session:** an 8-hour HS256 JWT in an `HttpOnly`, `SameSite=Lax` cookie, signed with an application secret.
- **First user and platform admin:** a designated platform admin account can be configured; it is created as superadmin and the first-user rule is disabled. Only when none is configured does the very first Microsoft identity become superadmin. Everyone else must be pre-added by an admin (matched on the `email` claim) or gets "not authorised".
- **Tenant connection** (`/api/auth/ms-callback`): a separate, privileged delegated-scope flow started by an admin. Tokens are stored AES-256-CBC encrypted (key derived from the application secret).
- **Local username/password** exists only as an explicit development setting, and the server refuses to start with it when running in production mode.

### Roles

Enforced centrally in `server/middleware/rbac.ts`. Insufficient role is always `403 {code:'forbidden'}`; `401` means no or expired session.

| Role | Allowed |
| --- | --- |
| viewer | All read-only (GET) pages and APIs |
| operator | Everything a viewer can, plus every other non-GET action by default (deploy, update, assign, sync) |
| admin | Operator plus user management, admin audit log, tenant connect/disconnect, settings writes and cache clear |
| superadmin | Admin plus granting/revoking admin and superadmin |

### Other security controls

- CSRF: state-changing `/api` calls must carry a custom `X-Requested-With` header and an allowed `Origin`.
- SSRF policy for server-side downloads (private ranges, the Azure wireserver and 6to4-embedded IPv4 are blocked).
- Upload validation: extension allow-list, magic-byte sniffing, 4 GiB size cap.
- Secrets arrive as environment variables sourced from Key Vault. The live Claude path is keyless (managed identity); any fallback API key is never stored in the database or returned by any endpoint, and the settings API exposes only a boolean "Foundry configured" flag, never the resource name. Responses that carry secrets are `no-store`.
- The container runs as non-root (uid/gid 1000).

### Data model (Prisma)

`User`, `Session`, `TenantConfig`, `OAuthState`, `AppSetting` (key-value, also the cache), `GroupAssignmentHistory`, `WtDetectedUpdate`, `AppDeployment` (job history), `AdminAuditLog` (append-only: user add/role change/delete, settings update/clear cache, tenant connect/disconnect, Intune app delete and refused delete attempts).

## Deployment and cost

Infrastructure is Bicep in two phases (A: foundation, B: Container App), deployed to West US 3 in a single resource group.

- Log Analytics capped at 0.1 GB/day, 30-day retention
- Container App 0.5 vCPU / 1 GiB, scale to zero, 600 s cooldown
- Azure SQL serverless **free offer**: 100,000 vCore-seconds and 32 GB per month at no charge; configured to auto-pause (60 min) rather than bill on exhaustion
- A $5 resource-group budget alert
- Storage (Files + Blob) is small and billed per use

The design target is a near-zero idle cost portfolio instance.

## Limitations

- **240 s ingress timeout.** Long operations run as background jobs streamed over Server-Sent Events (`/api/events`); large installers go straight to blob storage so they never cross Express.
- **Cold start and database wake.** The first request after idle waits for the container and for the paused SQL database (up to about 60 s). The API answers `503 {code:'db_waking'}` and the SPA shows a "Waking up the database" notice and retries.
- **Single replica.** SSE connections are held in process memory, so the app is capped at one replica.
- **macOS DMGs.** Images the server's 7-Zip cannot read are rejected: APFS-formatted, encrypted, GPT-partitioned, or using newer compression (LZFSE/LZMA). Use a `.pkg`, or upload manually with the bundle id and version entered by hand.
- **macOS casks.** A `.zip` containing only a `.app` is refused (wrapping an app into a pkg needs macOS tooling). Casks with separate Apple Silicon and Intel downloads deploy the arm64 build by default; use manual upload for Intel. The Intune app is created with a minimum OS of macOS 11.0, so assign casks that need a newer OS only to suitable groups.
- **Packaging is Linux-native.** `.intunewin` files are built with `SvRooij.ContentPrep` from the WinTuner module; `IntuneWinAppUtil.exe` is not used.
- **Graph throttling** can slow bulk operations; retry after a minute.

## Repository layout

```
IntuneManagerUI/
├── Dockerfile            spa-builder -> server-builder -> runtime (node:20-slim + pwsh + p7zip + WinTuner)
├── src/                  React SPA (pages, components, contexts, hooks, settings tabs, lib)
└── server/
    ├── app.ts, index.ts  Express app and bootstrap
    ├── middleware/       auth, csrf, rbac, async-routes
    ├── routes/           auth, ms-signin, ms-auth, ps, ai, deployments (+macos, +macos-cask),
    │                     catalog-macos, intune-apps, settings, admin, events, health
    ├── services/         graph-auth, ms-signin, session, encryption, ps-bridge, blob-sas, claude-client,
    │                     macos-inspect, cask-resolve/-downloader/-unwrap, upload-validator, ...
    ├── ps-scripts/       PowerShell bridge scripts (Graph/Intune operations)
    └── prisma/           schema.prisma and migrations
infra/                    main.bicep, main.bicepparam, modules/
.github/workflows/        ci.yml, deploy.yml
docs/                     project documentation
```

### PowerShell bridge protocol

Scripts print `LOG:<level text>` lines (streamed to the job log) and a final `RESULT:<json>` line (the return value). `runPsScript()` in `ps-bridge.ts` parses both, applies a per-script timeout (scalable with a multiplier setting) and kills the process on timeout or cancellation.

### Claude via Microsoft Foundry

A single client factory picks the connection at startup: Microsoft Foundry when a Foundry resource is configured (in production the token comes from the app's user-assigned managed identity; an API key is accepted only for local development), otherwise the direct Anthropic API, otherwise AWS Bedrock from Settings. The model is a deployment name read from a setting (default Claude Sonnet). The tool-use loop classifies every stop reason: refusals, token-limit and context-overflow stops fail the job with a readable error instead of looping, `pause_turn` re-sends the conversation, and authentication failures are mapped to a remedy for the active provider. The managed-identity token provider is cached per process rather than created per job.

### Claude packaging tools

The AI agent in `routes/ai.ts` has eleven tools: `search_winget`, `search_chocolatey`, `get_latest_version`, `download_app`, `generate_install_script`, `generate_uninstall_script`, `generate_detect_script`, `generate_package_settings`, `build_package`, `create_intune_app`, `upload_to_intune`. Endpoints: `POST /api/ai/deploy` (full pipeline), `POST /api/ai/package-only`, `POST /api/ai/upload-only`, `GET /api/ai/recommendations`, `DELETE /api/ai/jobs/:jobId`. Package-only plus upload-only lets an operator review a package before it reaches Intune.
