import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One markdown file per project under src/content/projects/.
// Adding a shipped project = adding one file here (see README "Add a project").
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    // Display title, e.g. "Identity Lifecycle Automation"
    title: z.string(),
    // Sort order on the grid — lower ships first (matches program sequencing)
    order: z.number(),
    // Program-level status. "shipped" = live public repo with green CI.
    // "in-progress" = actively being built right now.
    // "planned" = scoped and sequenced, not started yet.
    status: z.enum(["shipped", "in-progress", "planned"]),
    // Jira epic reference, e.g. "EP-1"
    epic: z.string(),
    // One or two sentences for the projects grid card.
    summary: z.string(),
    // Detail page: problem being solved.
    problem: z.string(),
    // Detail page: architecture / approach.
    architecture: z.string(),
    // Detail page: demo status/note. Optional link to a GIF or recording once captured.
    demo: z.string(),
    demoUrl: z.string().url().optional(),
    // Tech/skills tags shown as chips.
    stack: z.array(z.string()),
    // Public GitHub repo URL once the project repo exists and is public.
    repoUrl: z.string().url().optional(),
    // Repo name to display even before repoUrl is live, e.g. "identity-lifecycle-automation"
    repoName: z.string(),
  }),
});

export const collections = { projects };
