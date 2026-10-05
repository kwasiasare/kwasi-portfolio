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
      // Sort position within its category (lower first).
      order: z.number(),
      // program: shipped = public repo with green CI.
      // product: shipped = in production / live for real users.
      status: z.enum(["shipped", "in-progress", "planned"]),
      // Grouping on the grid. "product" renders first.
      category: z.enum(["product", "program"]).default("program"),
      // Context line, e.g. "Spreadcom LLC" or "Vestmark Inc. (employer)".
      org: z.string().optional(),
      // Jira epic for program entries, e.g. "EP-1". Optional for products.
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
      demoUrl: z.string().url().optional(),
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
      repoUrl: z.string().url().optional(),
      repoName: z.string().optional(),
      // public: link repoUrl. private: "Private repository — available on request".
      // pending: "Private repository — public release pending security scan".
      repoVisibility: z.enum(["public", "private", "pending"]).default("public"),
      confluenceUrl: z.string().url().optional(),
      confluenceLabel: z.string().default("Confluence docs"),
      liveUrl: z.string().url().optional(),
    }),
});

export const collections = { projects };
