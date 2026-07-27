---
title: "Security Reporting Dashboard"
order: 4
status: "in-progress"
epic: "EP-4"
summary: "A live security posture dashboard over Intune and Defender data — the reporting layer a security-focused endpoint engineer wishes the portal had."
problem: >
  Device compliance, Attack Surface Reduction hits, Defender alerts, secure
  score, stale devices, and Conditional Access failures each live in a
  different pane of the Microsoft admin portals. This project pulls them all
  into one place: a small web dashboard backed by scheduled collectors, so
  the questions security operations actually asks have a direct answer
  instead of five separate reports.
architecture: >
  Timer-triggered Azure Functions pull compliance status, ASR events,
  Defender alerts and secure score, stale device data, and Conditional Access
  sign-in failures from Microsoft Graph into Log Analytics custom tables,
  with a committed library of 10+ KQL queries. A small web app (FastAPI)
  queries the workspace through the Log Analytics Query API and
  renders compliance trend, ASR hits by rule, alert severity mix, stale
  device list, and CA failure hotspots, plus an "automation activity" page
  surfacing the audit trail from Identity Lifecycle Automation. The app is
  deployed from a pipeline behind Entra authentication, using managed
  identity to reach Log Analytics.
demo: "Fourth in the program build order, after Azure Landing Zone — built, awaiting publication."
stack:
  - "KQL"
  - "Log Analytics"
  - "Microsoft Graph API"
  - "Python"
  - "Azure Functions"
  - "Entra ID"
repoName: "endpoint-security-dashboard"
---

Fourth project in the program build order. Reuses the Log Analytics workspace
from the Azure Landing Zone and the Graph patterns from earlier epics. See
Jira epic [EP-4](https://spreadcomgh.atlassian.net/browse/EP-4).
