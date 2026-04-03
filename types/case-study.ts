// Types for case study data from admin dashboard
// Content fields support Tiptap JSON or plain text/HTML

export interface CaseStudyData {
  meta: CaseStudyMeta
  overview: CaseStudyOverview | null
  gallery: CaseStudyGallery
  process: CaseStudyProcess | null
  results: CaseStudyResults | null
  fullWidthImages: FullWidthImageData[]
}

export interface CaseStudyMeta {
  category: string
  title: string
  client: string
  role: string
  timeline: string
  year: string
  heroImage: string
}

export interface CaseStudyOverview {
  mainText: string // Tiptap JSON or plain text
  subText: string  // Tiptap JSON or plain text
  services: string[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string // Tiptap JSON or plain text
  image: string
}

export interface CaseStudyProcess {
  sectionTitle: string
  steps: ProcessStep[]
}

export interface ResultStat {
  value: string
  label: string
}

export interface CaseStudyResults {
  introText: string // Tiptap JSON or plain text
  stats: ResultStat[]
  testimonial: {
    quote: string   // Tiptap JSON or plain text
    authorName: string
    authorTitle: string
  }
}

export interface GalleryImage {
  src: string
  alt: string
  span?: "full" | "half"
  caption?: string
}

export type CaseStudyGallery = GalleryImage[]

export interface FullWidthImageData {
  src: string
  alt: string
  caption?: string
}

export interface NextProject {
  title: string
  category: string
  href: string
  image: string
}

export interface CaseStudyFooter {
  nextProject: NextProject
}

// Complete case study data structure
// export interface CaseStudyData {
//   meta: CaseStudyMeta
//   overview: CaseStudyOverview
//   gallery: CaseStudyGallery
//   process: CaseStudyProcess
//   results: CaseStudyResults
//   fullWidthImages: FullWidthImageData[]
//   footer: CaseStudyFooter
// }
