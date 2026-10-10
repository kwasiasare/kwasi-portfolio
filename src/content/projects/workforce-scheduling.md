---
title: "ShiftBoard — Workforce Scheduling Platform"
order: 4
status: "shipped"
category: "product"
org: "Spreadcom LLC"
summary: "Shift scheduling and time-and-attendance platform for a staffing business: shift board, multi-channel request intake, eligibility-ranked assignment, geofenced clock-in, timesheets, and a mobile app. Release 2 in production since 2026-10-06."
problem: "Staffing requests arrive by web, SMS, email, and phone and are matched to workers by hand. The platform centralises intake, assignment, and time capture with an audit trail."
architecture: "Shift board; request intake over web, SMS, email, and mobile; assignment eligibility and ranking; geofenced clock-in with location monitoring, exit alerts, and auto-close; timesheets with approval and CSV export; mobile app for staff and client contacts; push, SMS, and email notifications; RBAC with roles-as-data; OTP sign-in; consent and retention controls; audit trail. API on Azure Container Apps (scales to zero), web on Azure Static Web Apps."
stack: ["Azure Container Apps", "Azure Static Web Apps", "Mobile app", "Geofencing", "SMS", "Push notifications", "RBAC", "OTP sign-in"]
repoVisibility: "private"
liveUrl: "https://blue-tree-0762a730f.6.azurestaticapps.net/"
gallery:
  - image: "./assets/workforce-scheduling/01-shift-board.png"
    alt: "Shift board with request columns from received through converted, with fill-by deadline badges"
    caption: "Shift board: requests from every channel, with fill-by deadlines (client names redacted)"
  - image: "./assets/workforce-scheduling/02-live.png"
    alt: "Live view showing today's shifts, clock state, geofence status and open alerts"
    caption: "Live: clock-in state, geofence checks and alerts"
  - image: "./assets/workforce-scheduling/03-request-form.png"
    alt: "Request coverage form with client, site, date, times, role and headcount"
    caption: "Raising a coverage request for a client site (client name redacted)"
---

Source is in a private repository and available on request.

## Release 2 (live in production since 2026-10-06)

- **Client portal:** a client's contacts raise requests and see confirmations, with CSV and print export.
- **Coordinators:** edit requests, reschedule by drag and drop, reassign with a confirmation step, and work from their own board of routed shifts.
- **Mobile staff app:** device time clock with an offline queue, background location, and timesheet.
- **Time capture rules:** time entries close at the scheduled end, and unverified closes are flagged. A shift with no clock-in within an hour of its start is marked a no-show, and a late clock-in then needs a coordinator's approval.
- **Access control:** the API checks permissions, not role names, on every route, so read-only roles cannot write.
- **Hosting:** the API scales to zero when idle. The live demo runs on sample data.

## Try it

1. Open the [live demo](https://blue-tree-0762a730f.6.azurestaticapps.net/).
2. Enter the demo phone number **617 555 0142** and select **Send code**.
3. The demo has no SMS sender, so the 6-digit code appears on screen. Enter it and select **Sign in**.

The demo account is a **Global Reader**: it can open the shift board, schedule, live view, staff list and dashboard, but every write is refused by the API (HTTP 403). The first load can take about 20 seconds while the API wakes up.
