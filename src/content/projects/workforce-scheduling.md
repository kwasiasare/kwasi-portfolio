---
title: "ShiftBoard — Workforce Scheduling Platform"
order: 4
status: "shipped"
category: "product"
org: "Spreadcom LLC"
summary: "Shift scheduling and time-and-attendance platform for a staffing business: shift board, multi-channel request intake, eligibility-ranked assignment, geofenced clock-in, timesheets, and a mobile app. Release 1 in production since 2026-09-15."
problem: "Staffing requests arrive by web, SMS, email, and phone and are matched to workers by hand. The platform centralises intake, assignment, and time capture with an audit trail."
architecture: "Shift board; request intake over web, SMS, email, and mobile; assignment eligibility and ranking; geofenced clock-in with location monitoring, exit alerts, and auto-close; timesheets with approval and CSV export; mobile app for staff and client contacts; push, SMS, and email notifications; RBAC with roles-as-data; OTP sign-in; consent and retention controls; audit trail. API on Azure Container Apps, web on Azure Static Web Apps."
stack: ["Azure Container Apps", "Azure Static Web Apps", "Mobile app", "Geofencing", "SMS", "Push notifications", "RBAC", "OTP sign-in"]
repoVisibility: "private"
liveUrl: "https://blue-tree-0762a730f.6.azurestaticapps.net/"
gallery:
  - image: "./assets/workforce-scheduling/01-shift-board.png"
    alt: "Shift board with request columns from received through converted, with fill-by deadline badges"
    caption: "Shift board: requests from every channel, with fill-by deadlines"
  - image: "./assets/workforce-scheduling/02-live.png"
    alt: "Live view showing today's shifts, clock state, geofence status and open alerts"
    caption: "Live: clock-in state, geofence checks and alerts"
  - image: "./assets/workforce-scheduling/03-request-form.png"
    alt: "Request coverage form with client, site, date, times, role and headcount"
    caption: "Raising a coverage request for a client site"
---

Source is in a private repository and available on request. The live demo runs on fictional sample data.
