---
title: "Spreadcom Assist — Secure Enterprise AI Assistant"
order: 7
status: "in-progress"
category: "product"
org: "Spreadcom LLC"
summary: "Capstone of a secure-AI architecture track: a retrieval-grounded assistant for an IT department, built in a live Microsoft cloud tenant over synthetic documents, with keyless identities, Entra group trimming and label-aware search."
problem: "An IT department answers the same policy and how-to questions all day and spends time hunting for documents. The security requirement is strict: no made-up answers, no leaks across permission boundaries, and a human in the loop for anything that acts. Spreadcom Assist is the build that meets that bar, one session at a time, with every step verified in the portal and the Azure CLI."
architecture: "Azure AI Search (Basic, semantic ranker) indexes company policies, invoices and SharePoint documents held in Blob storage. Chat and embeddings come from Microsoft Foundry models (GPT-4.1 mini and text-embedding-3-small); invoices and scanned PDFs are read with Azure AI Document Intelligence; SharePoint Online content arrives through a Logic App. Search reaches storage and the models through its managed identity, with no keys, and a key that one wizard stored automatically was removed over REST. Access trimming is designed around an audience field mapped to nested Entra security groups, with the end-to-end demonstration still to come. A Purview-enabled index carries the sensitivity-label annotations the service requires, so labelled documents, including encrypted ones, are ingested with their labels; query-time enforcement is not yet tested. A subscription budget with 50, 80 and 100 percent alerts, free and basic tiers, on-demand jobs and resource tags keep the cost bounded."
stack: ["Azure AI Search", "Microsoft Foundry", "Azure OpenAI (GPT-4.1 mini, text-embedding-3-small)", "Azure AI Document Intelligence", "Azure Logic Apps", "SharePoint Online", "Azure Blob Storage", "Microsoft Entra ID", "Microsoft Purview", "Managed identity", "Azure CLI", "Bicep"]
repoVisibility: "private"
---

Spreadcom Assist is the capstone of a self-directed AI architect track (LLM foundations, enterprise RAG, document intelligence, Copilot extensibility, AI agents, secure solution design). The track's position is that the data-governance, identity and endpoint-security foundations an enterprise already needs — Purview, Entra, Defender — are what let it adopt AI safely. The build runs in a real tenant, but every document in it is fictional. Source is in a private repository and available on request.

## Built and verified so far

- **Grounded retrieval:** an Azure AI Search index over company policies, invoices and SharePoint documents, with the semantic ranker on. Early grounding tests pass in the portal: answers cite the documents, and the assistant says it does not know when they do not cover a question. The scripted test path is still open.
- **Document ingestion:** invoice PDFs read by Document Intelligence and SharePoint libraries imported through a Logic App, both landing in the same index.
- **Keyless connections:** Search connects to storage and to the models through its managed identity. A key that the knowledge-base wizard stored was found and removed.
- **Permission trimming (groundwork):** an audience field on every document and nested Entra security groups with test users are in place; the filtered-results demonstration, where an employee, an analyst and an admin see different results from the same index, is still to come.
- **Sensitivity labels:** Purview labels, including encrypted tiers, are applied to documents, and a Purview-enabled index carries the three label annotations the service requires. The first indexer run ingested all five labelled documents, including the two encrypted ones, under a narrowly scoped service permission. Query-time enforcement is not yet tested.
- **Cost controls:** a subscription budget with alerts, free and basic tiers, on-demand jobs and tags on every resource.

## Next

Status: 7 of 19 build sessions complete. Next: the permission-trimming and query-time label enforcement demonstrations, disabling key access so only Entra roles remain, the drafting agent (drafts, never sends), prompt-injection testing and guardrails, operations, and the architecture document.
