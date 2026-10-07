import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;
export type Category = Project["data"]["category"];

export const CATEGORIES: { key: Category; label: string; blurb: string }[] = [
  {
    key: "product",
    label: "Products & client work",
    blurb: "Software built and operated for Spreadcom LLC and its clients.",
  },
];

const catRank = (c: Category) => CATEGORIES.findIndex((x) => x.key === c);

/** All non-draft projects, by category then `order`. */
export async function getPublishedProjects(): Promise<Project[]> {
  const all = await getCollection("projects", ({ data }) => !data.draft);
  return all.sort(
    (a, b) => catRank(a.data.category) - catRank(b.data.category) || a.data.order - b.data.order,
  );
}

export function groupByCategory(projects: Project[]) {
  return CATEGORIES.map((c) => ({
    ...c,
    projects: projects.filter((p) => p.data.category === c.key),
  })).filter((g) => g.projects.length > 0);
}
