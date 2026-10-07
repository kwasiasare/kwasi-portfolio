---
title: "AVD Manager — Azure Virtual Desktop Operations"
order: 4
status: "in-progress"
category: "product"
org: "Spreadcom LLC"
summary: "Web app for operating an Azure Virtual Desktop estate — host pools, session hosts, user sessions, golden images, cost and an audit trail — being rebuilt in Spreadcom's own tenant."
problem: "Day-to-day Azure Virtual Desktop operations are spread across many Azure Portal blades. The app puts host pools, sessions, images, cost and audit in one place for the people who run the estate."
architecture: "Design validated in Spreadcom's AVD pilot (2026-08-04). Cloud-only Entra ID users sign in through the Windows App with MFA and single sign-on to Entra-joined pooled session hosts. FSLogix profile containers on Azure Files authenticate with Entra Kerberos, which works with cloud-only identities and needs no hybrid AD. A Windows 11 multi-session golden image is versioned in Azure Compute Gallery. Traffic goes through Azure Firewall Premium, and the environment can be parked (firewall and hosts deallocated) to cut idle cost. The management app covers host pools, sessions, images, cost and audit."
stack: ["Azure Virtual Desktop", "Entra ID", "Entra Kerberos", "FSLogix", "Azure Files", "Azure Compute Gallery", "Azure Firewall Premium", "Microsoft Defender"]
repoVisibility: "private"
---

Being rebuilt in Spreadcom's own tenant; source is in a private repository and available on request.
