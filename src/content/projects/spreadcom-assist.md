---
title: "Spreadcom Assist — Secure Enterprise AI Assistant"
order: 7
status: "shipped"
category: "product"
org: "Spreadcom LLC"
summary: "Retrieval-grounded AI assistant for an IT department, running in a live Microsoft cloud tenant: answers with citations from company documents, keyless managed identities, Entra group trimming and Microsoft Purview label-aware search."
problem: "An IT department answers the same policy and how-to questions all day and spends time hunting for documents. The security requirement is strict: no made-up answers and no leaks across permission boundaries. Spreadcom Assist answers from the company's own documents, cites them, and says it does not know when they do not cover the question."
architecture: "Azure AI Search (Basic, semantic ranker) indexes company policies, invoices and SharePoint documents held in Blob storage. Chat and embeddings come from Microsoft Foundry models (GPT-4.1 mini and text-embedding-3-small); invoices and scanned PDFs are read with Azure AI Document Intelligence; SharePoint Online content arrives through a Logic App. Search reaches storage and the models through its managed identity, with no keys. Access is trimmed by an audience field mapped to nested Entra security groups, and a Purview-enabled index carries the sensitivity-label annotations the service requires, so labelled documents, including encrypted ones, are indexed with their labels. A subscription budget with 50, 80 and 100 percent alerts, free and basic tiers, on-demand jobs and resource tags keep the cost bounded."
stack: ["Azure AI Search", "Microsoft Foundry", "Azure OpenAI (GPT-4.1 mini, text-embedding-3-small)", "Azure AI Document Intelligence", "Azure Logic Apps", "SharePoint Online", "Azure Blob Storage", "Microsoft Entra ID", "Microsoft Purview", "Managed identity", "Azure CLI", "Bicep"]
repoVisibility: "private"
---

Spreadcom Assist is the capstone of a secure enterprise AI architecture track (LLM foundations, enterprise RAG, document intelligence, Copilot extensibility, AI agents, secure solution design). Its position is that the data-governance, identity and endpoint-security foundations an enterprise already needs — Purview, Entra, Defender — are what let it adopt AI safely. The system runs in a real Azure and Microsoft 365 tenant over synthetic company documents. Source is in a private repository and available on request.

## What it does

- **Grounded answers:** an Azure AI Search index over company policies, invoices and SharePoint documents, with the semantic ranker on. Answers cite the documents they came from, and the assistant says it does not know when the documents do not cover a question.
- **Document ingestion:** invoice PDFs read by Document Intelligence and SharePoint libraries imported through a Logic App, both landing in the same index.
- **Keyless connections:** Search connects to storage and to the models through its managed identity.
- **Permission trimming:** every document carries an audience field that mirrors nested Entra security groups, so an employee, an analyst and an admin query the same index and see only what their groups allow.
- **Sensitivity labels:** Purview labels, including encrypted tiers, are applied to documents, and a Purview-enabled index carries the three label annotations the service requires. The indexer ingests labelled documents, including encrypted ones, under a narrowly scoped service permission.
- **Cost controls:** a subscription budget with alerts, free and basic tiers, on-demand jobs and tags on every resource.

## Applying this to company data

The same build is how an IT or operations team gets an assistant over its own policies, runbooks and knowledge-base articles: index the documents with their metadata, keep retrieval inside the company's Azure subscription, connect every service by managed identity, trim results by the groups people already belong to, and let Purview labels travel with the content into the index.
