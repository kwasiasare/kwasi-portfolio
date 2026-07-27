---
title: "Identity Lifecycle Automation"
order: 1
status: "in-progress"
epic: "EP-1"
summary: "Event-driven joiner/mover/leaver automation for Microsoft Entra and M365, turning manual IAM operations work into engineering evidence."
problem: >
  Joiner, mover, and leaver processes in most M365 tenants are still manual:
  a ticket triggers a checklist, and consistency depends on whoever is on
  shift. This project replaces that checklist with event-driven automation —
  a CSV drop or HTTP call standing in for an HRIS webhook triggers a
  provisioning, access-change, or offboarding flow that runs the same way
  every time, with a full audit trail.
architecture: >
  A queue-triggered Azure Function (Python or PowerShell) picks up one event
  per user, calls Microsoft Graph with a least-privilege managed identity,
  and writes an audit row to a Log Analytics custom table for every action it
  takes. Joiner creates the user, assigns licenses via group-based licensing,
  and provisions standard Teams/SharePoint access. Mover updates group
  membership and licensing on a department or manager change. Leaver disables
  the account, revokes sessions, converts the mailbox to shared, retires
  Intune devices, and schedules a 30-day deferred delete. Every flow is
  idempotent — replaying an event makes no duplicate changes. Infrastructure
  is deployed with Bicep and CI/CD via GitHub Actions, with no client
  secrets: GitHub Actions authenticates to the dev tenant over OIDC.
demo: "In development — demo recording will be added once the joiner/mover/leaver flows are running end-to-end on the dev tenant."
stack:
  - "Microsoft Graph API"
  - "Azure Functions"
  - "Python"
  - "Bicep"
  - "GitHub Actions"
  - "Entra ID"
  - "Log Analytics"
repoName: "identity-lifecycle-automation"
---

First project in the program build order — establishes the dev tenant, Graph
app registration, and GitHub OIDC federation that every later project reuses.
See Jira epic [EP-1](https://spreadcomgh.atlassian.net/browse/EP-1).
