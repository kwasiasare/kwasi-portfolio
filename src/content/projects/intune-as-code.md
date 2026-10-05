---
title: "Intune-as-Code"
order: 2
status: "shipped"
epic: "EP-2"
category: "program"
summary: "Microsoft Intune configuration managed like software: exported to Git, reviewed via PR, and deployed through a pipeline with drift detection."
problem: >
  Intune configuration profiles, compliance policies, and Attack Surface
  Reduction rules are usually managed by hand in the portal, which makes
  changes hard to review, hard to roll back, and easy to drift out of sync
  between environments. This project treats that configuration as code:
  exported to normalized JSON, versioned, reviewed via pull request, and
  deployed through a pipeline with dev-to-prod promotion.
architecture: >
  A CLI (export | validate | diff | import) reads and writes Intune
  configuration profiles, compliance policies, and ASR rules as one JSON file
  per policy, with tenant-specific IDs normalized out on export. GitHub
  Actions runs validate-and-diff on every pull request, deploys to the dev
  tenant automatically on merge to dev, and runs a scheduled drift-detection
  workflow that opens a GitHub issue if the live tenant no longer matches the
  repo. Authentication to Microsoft Graph uses an Entra app registration with
  OIDC federated credentials — no client secrets stored anywhere.
demo: "Public repository with green CI. Demo recording to be added."
stack:
  - "Microsoft Graph API"
  - "PowerShell"
  - "GitHub Actions"
  - "Entra ID app registrations"
  - "OIDC"
repoUrl: "https://github.com/kwasiasare/intune-as-code"
repoName: "intune-as-code"
repoVisibility: "public"
---

Second project in the program build order. Reuses the dev tenant and OIDC
auth pattern established by Identity Lifecycle Automation. See Jira epic
[EP-2](https://spreadcomgh.atlassian.net/browse/EP-2).
