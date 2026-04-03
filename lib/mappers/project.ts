
import type { Project } from "@/lib/db/schema"
import type { CaseStudyData, GalleryImage } from "@/types/case-study"

export function mapProjectToCaseStudy(project: Project): CaseStudyData {
  return {
    meta: {
      category:  project.category  ?? "",
      title:     project.title,
      client:    project.client    ?? "",
      role:      project.role      ?? "",
      timeline:  project.timeline  ?? "",
      year:      project.year      ?? "",
      heroImage: project.heroImage ?? "",
    },
    overview: project.overview ?? null,
    gallery: (project.gallery ?? []) as GalleryImage[],
    process: project.process ?? null,
    results: project.results ?? null,
    fullWidthImages: (project.fullWidthImages ?? []),
  }
}