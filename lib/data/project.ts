import { unstable_cache } from "next/cache"
import { db } from "@/lib/db"
import { projects } from "@/lib/db/schema"
import { eq, asc, and, gt, ne } from "drizzle-orm"

export const getActiveProjects = unstable_cache(
  async () => {
    return db
    .select({
      id: projects.id,
      title: projects.title,
      slug: projects.slug,
      description: projects.description,
      category: projects.category,
      year: projects.year,
      heroImage: projects.heroImage,
      videoUrl: projects.videoUrl,
      technologies: projects.technologies,
      gallery: projects.gallery,
      siteUrl: projects.siteUrl,
      sourceUrl: projects.sourceUrl,
      active: projects.active,
      order: projects.order,
      dates: projects.dates,
    })
    .from(projects)
    .where(eq(projects.active, true))
    .orderBy(asc(projects.order))
  },
  ["active-projects"],        // cache key
  { tags: ["projects"] }      // revalidation tag
)

export const getProjectBySlug = unstable_cache(
  async (slug: string) => {
    const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1)
    return project ?? null
  },
  ["project-by-slug"],
  { tags: ["projects"] }      // same tag — revalidates together
)

export const getNextProject = unstable_cache(
  async (currentOrder: number, currentId: string) => {
    const [next] = await db
    .select({
      title:     projects.title,
      category:  projects.category,
      slug:      projects.slug,
      heroImage: projects.heroImage,
    })
    .from(projects)
    .where(and(eq(projects.active, true), gt(projects.order, currentOrder)))
    .orderBy(asc(projects.order))
    .limit(1)

    if (next) return next

      // wrap around
      const [fallback] = await db
      .select({
        title:     projects.title,
        category:  projects.category,
        slug:      projects.slug,
        heroImage: projects.heroImage,
      })
      .from(projects)
      .where(and(eq(projects.active, true), ne(projects.id, currentId)))
      .orderBy(asc(projects.order))
      .limit(1)

      return fallback ?? null
  },
  ["next-project"],
  { tags: ["projects"] }
)
