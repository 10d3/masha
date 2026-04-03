"use client"
import Image from "next/image"
import { H2, H4, Muted, P, ScreenWrapper, Strong } from "../ui/typography"
import { Mail } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { BLUR_FADE_DELAY } from "@/lib/utils"
import { DATA } from "@/lib/data/data"


const D = BLUR_FADE_DELAY

export const AboutMe = () => {

    const education = [
        {
            period: "2024 — 2025",
            degree: "Graphic Design",
            institution: "California Institute of the Arts, Coursera",
        },
        {
            period: "2023 — 2024",
            degree: "UX/UI Design",
            institution: "Google UX Design Certificate, Coursera",
        },
        {
            period: "2022 — Present",
            degree: "Self-Directed Learning",
            institution: "YouTube, documentation, open-source projects & building in public",
        },
    ]

    const experience = [
        {
            period: "2024 — Present",
            role: "Lead Designer",
            place: "Nexora — Remote",
        },
        {
            period: "2023 — Present",
            role: "Graphic Designer",
            place: "Flora Funeral Services — Remote",
        },
        {
            period: "2023 — Present",
            role: "Freelance Designer & Developer",
            place: "Independent — Remote",
        },
    ]

    return (
        <ScreenWrapper className="flex flex-col gap-6 md:gap-12">
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-12">
                <div className="w-full md:w-2/3 md:h-full h-1/2 gap-6 md:gap-12 flex flex-col">

                    {/* Headline */}
                    <BlurFade delay={D} inView>
                        <H2 className="border-none">
                            Je façonne des identités vivantes, du poli au brut, portées par une intention absolue.
                        </H2>
                    </BlurFade>

                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Profile image */}
                        <BlurFade delay={D + BLUR_FADE_DELAY * 2} inView
                            className="w-full md:w-1/2 flex items-center justify-center md:justify-between">
                            <Image src={DATA.image} alt="Profile Image" width={300} height={400} className="w-full" />
                        </BlurFade>

                        {/* Bio paragraphs */}
                        <div className="w-full md:w-1/2 flex flex-col gap-4">
                            <BlurFade delay={D + BLUR_FADE_DELAY * 3} inView>
                                <P className="font-light text-sm">
                                    <Strong>MarcKenley Antoine</Strong> — Designer Multidisciplinaire <br />
                                    Je conçois des écosystèmes visuels à l'intersection de la culture, de l'émotion et de l'esthétique. Mon travail est une exploration du contraste : comment naviguer entre les identités pour raconter des histoires qui équilibrent la force de la tradition et l'élan du changement.
                                </P>
                            </BlurFade>
                            <BlurFade delay={D + BLUR_FADE_DELAY * 4} inView>
                                <P className="font-light text-sm">
                                    Ma pratique s'étend du design graphique à l'image de marque, de la direction artistique au motion design, en passant par l'UX/UI. Chaque projet est une réponse stratégique et sensible, guidée par une approche intentionnelle, réfléchie et résolument humaine
                                </P>
                            </BlurFade>
                            {/* <BlurFade delay={D + BLUR_FADE_DELAY * 5} inView>
                                <P className="font-light text-sm">
                                    I work accross graphic design, branding, art direction, UX/UI and motion design, creating visual identities that are both strategic and emotional resonant. Influenced by my Haitian roots, my approach is thoughtful, intentional and human.
                                </P>
                            </BlurFade> */}
                        </div>
                    </div>
                </div>

                {/* Education + Experience sidebar */}
                <div className="w-full md:w-1/3 flex flex-col justify-start items-start gap-4">
                    <div>
                        <BlurFade delay={D + BLUR_FADE_DELAY * 6} inView>
                            <H4>education</H4>
                        </BlurFade>
                        <div className="flex flex-col">
                            {education.map((item, i) => (
                                <BlurFade key={i} delay={D + BLUR_FADE_DELAY * (7 + i)} inView>
                                    <div className="flex flex-row gap-2">
                                        <div className="w-1/4"><Muted>{item.period}</Muted></div>
                                        <div className="flex-1">
                                            <H4>{item.degree}</H4>
                                            <P className="not-first:mt-0 font-light leading-5">{item.institution}</P>
                                        </div>
                                    </div>
                                </BlurFade>
                            ))}
                        </div>
                    </div>

                    <div>
                        <BlurFade delay={D + BLUR_FADE_DELAY * (7 + education.length)} inView>
                            <H4>experience</H4>
                        </BlurFade>
                        {experience.map((item, i) => (
                            <BlurFade key={i} delay={D + BLUR_FADE_DELAY * (8 + education.length + i)} inView>
                                <div className="flex flex-row gap-2">
                                    <div className="w-1/4"><Muted>{item.period}</Muted></div>
                                    <div className="flex-1">
                                        <H4>{item.role}</H4>
                                        <P className="not-first:mt-0 font-light leading-5">{item.place}</P>
                                    </div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer row */}
            <div className="w-full flex flex-col-reverse md:flex-row justify-between">
                <BlurFade delay={D + BLUR_FADE_DELAY * 11} inView className="w-full md:w-1/3">
                    <Strong className="text-sm">contact</Strong>
                    <div>
                        <P className="font-light text-sm">
                            <Mail className="inline mr-2" size={16} />
                            <a href="mailto:marckenleyantoine445@gmail.com">marckenleyantoine445@gmail.com</a>
                        </P>
                    </div>
                </BlurFade>
                <BlurFade delay={D + BLUR_FADE_DELAY * 12} inView className="w-full md:w-2/3">
                    <H2 className="border-none">
                        Rien n'est laissé au hasard ; chaque pixel porte une raison d'être.
                    </H2>
                </BlurFade>
            </div>
        </ScreenWrapper>
    )
}