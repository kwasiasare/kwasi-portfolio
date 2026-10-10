---
title: "Guardian Baseline"
order: 5
status: "in-progress"
category: "product"
org: "Spreadcom LLC"
summary: "Managed security service for small healthcare-adjacent organisations on Microsoft 365 Business Premium, built from four public building blocks: identity lifecycle automation, Intune-as-code, an Azure landing zone and an endpoint security dashboard."
problem: "Baseline configuration across Intune, Conditional Access, and Defender for Business is hard for small organisations to apply and keep applied. Guardian packages it as a versioned baseline pack with a deployment engine and reporting."
architecture: "The baseline engine holds versioned Intune, Conditional Access and Defender for Business baselines as policy-as-code and runs assess, plan, audit, enforce and drift. The engine and telemetry ingestion were validated in a live tenant in mid-2026, then the environment was torn down to zero cost. The product is being rebuilt on the same pattern as AVD Manager: React and Fluent UI on Azure Static Web Apps, Azure Functions and Table storage. AI-drafted, owner-approved monthly reports from KQL telemetry remain the design."
stack: ["Microsoft 365 Business Premium", "Microsoft Entra ID", "Microsoft Graph API", "Bicep", "Log Analytics", "FastAPI", "Docker", "Microsoft Intune", "Conditional Access", "Defender for Business", "Policy as code", "KQL", "Azure Static Web Apps", "Azure Functions", "Fluent UI"]
repoVisibility: "private"
---

Source is in a private repository and available on request.

## Building blocks

Guardian Baseline is assembled from four smaller projects. Each one is a public repository that can be used on its own:

| Building block | What it does | Repository |
| --- | --- | --- |
| **Identity lifecycle automation** | Event-driven joiner, mover and leaver automation for Microsoft Entra ID and Microsoft 365, on Azure Functions and Microsoft Graph, deployed with Bicep and OIDC CI/CD. | [identity-lifecycle-automation](https://github.com/kwasiasare/identity-lifecycle-automation/tree/dev) |
| **Intune-as-code** | Intune configuration managed like software: export, validate, diff, import and drift detection through Microsoft Graph, with a GitOps pipeline. | [intune-as-code](https://github.com/kwasiasare/intune-as-code) |
| **Azure landing zone** | A small enterprise landing zone in Bicep: management groups, Azure Policy, hub-and-spoke networking and AVD, all deployed by pipeline with a what-if gate. | [azure-landing-zone](https://github.com/kwasiasare/azure-landing-zone/tree/dev) |
| **Endpoint security dashboard** | A live security posture dashboard over Intune and Defender: Graph collectors into Log Analytics, a KQL query library and a FastAPI dashboard, containerised for Azure Container Apps. | [endpoint-security-dashboard](https://github.com/kwasiasare/endpoint-security-dashboard/tree/dev) |

Together they cover what Guardian delivers to a client: identities provisioned and removed on time, device policy kept in code and checked for drift, a governed Azure foundation, and evidence of security posture for the monthly report.
