"use client"
import { BLUR_FADE_DELAY } from "@/lib/utils"
import { BlurFade } from "@/components/ui/blur-fade"
import { ScreenWrapper } from "../ui/typography"
import { ProjectCard } from "./project-card"
import { Project } from "@/lib/db/schema"

export const Works = ({ works }:{works: Project[]}) => {

    return (
        <ScreenWrapper className="flex flex-col gap-12 w-full min-h-fit">
            {works.map((project, index) => (
                <BlurFade
                    key={index}
                    delay={BLUR_FADE_DELAY * (index + 1)}
                    inView
                >
                    <ProjectCard {...project} />
                </BlurFade>
            ))}
        </ScreenWrapper>
    )
}