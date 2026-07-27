---
title: "Azure Landing Zone"
order: 3
status: "planned"
epic: "EP-3"
summary: "A miniature enterprise landing zone deployed entirely from Bicep — management groups, policy, hub-spoke networking, and an AVD proof of concept."
problem: >
  Standing up an enterprise-ready Azure environment by hand in the portal
  doesn't scale and doesn't hold up to governance requirements. This project
  builds a small but real landing zone — management group hierarchy, policy
  guardrails, hub-spoke networking, centralized logging, and an Azure Virtual
  Desktop proof of concept — 100% from code, with no portal clicks. It also
  doubles as a working reference for an Omnissa Horizon to AVD/Windows 365
  migration.
architecture: >
  Bicep modules define the management group hierarchy and subscription
  placement, policy assignments (allowed locations, required tags, deny
  public storage), a hub-spoke virtual network with peering and NSGs, a
  central Log Analytics workspace with diagnostic settings applied at scale,
  and a pooled AVD host pool with one Entra-joined session host. GitHub
  Actions runs `az deployment what-if` on every pull request and posts the
  output as a PR comment; merging to master deploys. Azure Bastion is only
  deployed on demand and the AVD session host stays deallocated by default to
  control cost, with a budget alert configured. Authentication uses OIDC
  federated credentials to Azure — no stored secrets.
demo: "In development — third in the program build order, after Intune-as-Code."
stack:
  - "Bicep"
  - "Azure Policy"
  - "Azure Virtual Desktop"
  - "Log Analytics"
  - "GitHub Actions"
  - "OIDC"
repoName: "azure-landing-zone"
---

Third project in the program build order. Early Bicep scaffolding exists in
the working repo; deployment has not run yet. See Jira epic
[EP-3](https://spreadcomgh.atlassian.net/browse/EP-3).
