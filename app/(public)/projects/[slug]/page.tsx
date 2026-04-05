import { Footer } from "@/components/shared/projects/footer"
import { FullWidthImage } from "@/components/shared/projects/full-width-image"
import { Gallery } from "@/components/shared/projects/gallery"
import { Header } from "@/components/shared/projects/header"
import { Hero } from "@/components/shared/projects/hero"
import { Overview } from "@/components/shared/projects/overview"
import { Process } from "@/components/shared/projects/process"
import { Results } from "@/components/shared/projects/result"
import { ScreenWrapper } from "@/components/ui/typography"
import { db } from "@/lib/db"
import { projects } from "@/lib/db/schema"
import { mapProjectToCaseStudy } from "@/lib/mappers/project"
import { CaseStudyFooter } from "@/types/case-study"
import { and, asc, eq, gt, ne } from "drizzle-orm"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProjectBySlug, getNextProject } from "@/lib/data/project"

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug)
  if (!project) return {};

  return {
    title: `${project.title} — MarcKenley`,
    description: project.metaDescription ?? project.description,
    openGraph: {
      title: project.title,
      description: project.metaDescription ?? project.description,
      images: project.heroImage ? [{ url: project.heroImage }] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  // next project by order
  const resolvedNext = await getNextProject(project.order, project.id)

  const caseStudyData = mapProjectToCaseStudy(project)

  const footer: CaseStudyFooter | null = resolvedNext
    ? {
        nextProject: {
          title:    resolvedNext.title,
          category: resolvedNext.category ?? "",
          href:     `/projects/${resolvedNext.slug}`,
          image:    resolvedNext.heroImage ?? "",
        },
      }
    : null

  return (
    <div className="min-h-screen">
    <ScreenWrapper className="min-h-auto mx-auto">
      <Header year={project.year || ""} />
      <Hero data={caseStudyData.meta} />
      {caseStudyData.overview && <Overview data={caseStudyData.overview} />}
      {caseStudyData.gallery.length > 0 && <Gallery data={caseStudyData.gallery} />}
      {caseStudyData.fullWidthImages[0] && (
        <FullWidthImage
          src={caseStudyData.fullWidthImages[0].src}
          alt={caseStudyData.fullWidthImages[0].alt}
          caption={caseStudyData.fullWidthImages[0].caption as string}
        />
      )}
      {caseStudyData.process && <Process data={caseStudyData.process} />}
      {caseStudyData.fullWidthImages[1] && (
        <FullWidthImage
          src={caseStudyData.fullWidthImages[1].src}
          alt={caseStudyData.fullWidthImages[1].alt}
          caption={caseStudyData.fullWidthImages[1].caption as string}
        />
      )}
      {caseStudyData.results && <Results data={caseStudyData.results} />}
    </ScreenWrapper>
    {footer && <Footer data={footer} />}
    </div>
  )
}
