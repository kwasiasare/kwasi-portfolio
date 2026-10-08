---
title: "Guardian Baseline"
order: 6
status: "in-progress"
category: "product"
org: "Spreadcom LLC"
summary: "Managed security service for small healthcare-adjacent organisations on Microsoft 365 Business Premium: a versioned, policy-as-code baseline. The engine was validated in a live tenant and the product is being rebuilt."
problem: "Baseline configuration across Intune, Conditional Access, and Defender for Business is hard for small organisations to apply and keep applied. Guardian packages it as a versioned baseline pack with a deployment engine and reporting."
architecture: "The baseline engine holds versioned Intune, Conditional Access and Defender for Business baselines as policy-as-code and runs assess, plan, audit, enforce and drift. The engine and telemetry ingestion were validated in a live tenant in mid-2026, then the environment was torn down to zero cost. The product is being rebuilt on the same pattern as AVD Manager: React and Fluent UI on Azure Static Web Apps, Azure Functions and Table storage. AI-drafted, owner-approved monthly reports from KQL telemetry remain the design."
stack: ["Microsoft 365 Business Premium", "Microsoft Intune", "Conditional Access", "Defender for Business", "Policy as code", "KQL", "Azure Static Web Apps", "Azure Functions", "Fluent UI"]
repoVisibility: "private"
---

Source is in a private repository and available on request.
