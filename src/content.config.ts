import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

// One markdown file per project directly under src/content/projects/.
// Gallery/diagram images live in src/content/projects/assets/<slug>/ and are
// referenced with paths relative to the .md file (e.g. ./assets/<slug>/01.png).
// Pattern is top-level only so nothing under assets/ can ever become an entry.
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Sort position on the grid (lower first).
      order: z.number(),
      // shipped = in production / live for real users.
      status: z.enum(["shipped", "in-progress", "planned"]),
      // Grouping on the grid. Only "product" exists today; kept as a field so
      // another group can be added later without a schema migration.
      category: z.enum(["product"]).default("product"),
      // Context line, e.g. "Spreadcom LLC" or "Example Corp (employer)".
      org: z.string().optional(),
      // Optional Jira epic key shown as a chip when no org is set.
      epic: z.string().optional(),
      // true = excluded from every build (dev and prod). Use while a repo
      // still needs scrubbing before it can be linked publicly.
      draft: z.boolean().default(false),
      summary: z.string(),
      problem: z.string(),
      architecture: z.string(),
      diagram: image().optional(),
      diagramAlt: z.string().optional(),
      // Demo note; optional now: products use the gallery instead.
      demo: z.string().optional(),
      demoUrl: z.url().optional(),
      demoGif: image().optional(),
      demoGifAlt: z.string().optional(),
      // Screenshot gallery. First item doubles as the card thumbnail.
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string().min(1),
            caption: z.string().optional(),
          }),
        )
        .optional(),
      stack: z.array(z.string()),
      // Links row
      repoUrl: z.url().optional(),
      repoName: z.string().optional(),
      // public: link repoUrl. private: "Private repository — available on request".
      // pending: "Private repository — public release pending security scan".
      repoVisibility: z.enum(["public", "private", "pending"]).default("public"),
      confluenceUrl: z.url().optional(),
      confluenceLabel: z.string().default("Confluence docs"),
      // Slug of an entry in the `docs` collection. When set, the links row shows
      // an internal "Project docs" link and suppresses the Confluence link.
      docsSlug: z.string().optional(),
      liveUrl: z.url().optional(),
    })
    // Privacy guard: a private/pending entry must never carry a repo URL, so
    // one can't leak into the page even if the links component changes.
    .refine((d) => d.repoVisibility === "public" || !d.repoUrl, {
      message: 'repoUrl is only allowed when repoVisibility is "public"',
      path: ["repoUrl"],
    }),
});

// Project documentation hosted on this site (src/content/docs/<slug>.md),
// mirrored from private Confluence spaces and sanitised for public viewing.
const docs = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    // Slug of the related entry in the `projects` collection.
    project: z.string(),
    summary: z.string(),
    sourceLabel: z.string(),
    // Display date, e.g. "2026-10-09".
    updated: z.string(),
    // Position among a project's docs (lower first). The main doc omits `parent`.
    order: z.number().default(0),
    // Slug of the project's main doc; set on child docs only.
    parent: z.string().optional(),
  }),
});

export const collections = { projects, docs };
