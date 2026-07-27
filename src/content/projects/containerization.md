---
title: "Containerize the Platform"
order: 5
status: "planned"
epic: "EP-5"
summary: "Packaging the Security Reporting Dashboard into a container, shipping it through a registry, and running it on managed container platforms."
problem: >
  Container fundamentals are best proven on a real app rather than a hello-
  world image. This project takes the Security Reporting Dashboard from P4
  and packages it properly: a multi-stage Docker build, an image pipeline
  through a private registry, and a production home on a managed container
  platform — with just enough Kubernetes exposure to be credible in
  platform-engineering conversations, not a full K8s deep-dive.
architecture: >
  A multi-stage, non-root Dockerfile builds a small image for the dashboard.
  GitHub Actions builds, scans with Trivy, and pushes tagged images to Azure
  Container Registry (Basic). The image deploys to Azure Container Apps
  (consumption plan) with managed identity to Log Analytics, which becomes
  the dashboard's canonical home, retiring its earlier hosting. As a stretch
  goal, the same image deploys to a 1-node AKS sandbox via a Helm chart for a
  single evidenced session, then tears down to control cost, with a written
  comparison of the Container Apps vs. AKS decision.
demo: "In development — fifth in the program build order, after the Security Reporting Dashboard ships."
stack:
  - "Docker"
  - "Azure Container Registry"
  - "Azure Container Apps"
  - "AKS"
  - "Helm"
  - "GitHub Actions"
repoName: "endpoint-security-dashboard"
---

Fifth project in the program build order. Containerizes the P4 dashboard
rather than starting a new app. See Jira epic
[EP-5](https://spreadcomgh.atlassian.net/browse/EP-5).
