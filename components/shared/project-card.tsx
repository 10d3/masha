"use client"
import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { BsArrowRight } from "react-icons/bs"
import { cn } from '../../lib/utils'
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { H2 } from '../ui/typography'
import { Project } from "@/lib/db/schema"
import Link from "next/link"

const EASE = [0.22, 1, 0.36, 1] as const

// Numeric values so motion can animate them directly
const imageStyles = [
    { flex: 'flex-[1]', height: 'h-44', rotate: -2, sink: 24 },
    { flex: 'flex-[1.5]', height: 'h-52', rotate: 2, sink: 32 },
    { flex: 'flex-[0.8]', height: 'h-40', rotate: -2, sink: 12 },
    { flex: 'flex-[1.2]', height: 'h-56', rotate: 2, sink: 24 },
]

const headerVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.5, ease: EASE }
    },
}

const imagesContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            // wait for header (0.5s) then stagger images
            delayChildren: 0.5,
            staggerChildren: 0.08,
        }
    }
}

export const ProjectCard = ({ title, description, gallery, slug }: Project) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })
    const animate = isInView ? "visible" : "hidden"

    return (
        <motion.div
            ref={ref}
            whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
            className="group"
        >
            <Card className="w-full pb-0 bg-gray-100 dark:bg-card overflow-hidden">
                <CardHeader>
                    <motion.div
                        variants={headerVariants}
                        initial="hidden"
                        animate={animate}
                        className="flex items-center text-lg font-semibold justify-between"
                    >
                        <Link href={`/projects/${slug}`}>
                            <H2 className="border-none">{title}</H2>
                        </Link>
                        <motion.span
                            className="inline-flex"
                            // arrow nudges on card hover via group, but also has its own whileHover
                            whileHover={{ x: 4, y: -4, transition: { duration: 0.2 } }}
                            animate={animate}
                            variants={{
                                hidden: { opacity: 0, x: -8 },
                                visible: {
                                    opacity: 1, x: 0,
                                    transition: { duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
                                }
                            }}
                        >
                            <Link href={`/projects/${slug}`}>
                                <BsArrowRight
                                    size={40}
                                    className="-rotate-30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </Link>
                        </motion.span>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 8 },
                            visible: {
                                opacity: 1, y: 0,
                                transition: { duration: 0.4, delay: 0.25, ease: "easeOut" }
                            }
                        }}
                        initial="hidden"
                        animate={animate}
                    >
                        <CardDescription className="md:max-w-2/5">{description}</CardDescription>
                    </motion.div>
                </CardHeader>

                <CardContent className="py-0">
                    <motion.div
                        className="flex flex-row gap-3 items-end py-4 overflow-hidden px-14"
                        variants={imagesContainerVariants}
                        initial="hidden"
                        animate={animate}
                    >
                        {gallery?.map((src, index) => {
                            const style = imageStyles[index % imageStyles.length]
                            return (
                                <motion.div
                                    key={index}
                                    className={cn('min-w-0', style.flex, style.height)}
                                    // enter: come from further down to final sink position
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: style.sink + 40,
                                            rotate: style.rotate,
                                            filter: 'blur(6px)',
                                        },
                                        visible: {
                                            opacity: 1,
                                            y: style.sink,
                                            rotate: style.rotate,
                                            filter: 'blur(0px)',
                                            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                                        },
                                    }}
                                    // hover: lift slightly out of the sink
                                    whileHover={{
                                        y: style.sink - 8,
                                        scale: 1.04,
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                >
                                    <img
                                        src={src.src}
                                        alt={src.alt}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </motion.div>
                            )
                        })} 
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}