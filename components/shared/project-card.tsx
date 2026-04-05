"use client"
import { BsArrowRight } from "react-icons/bs"
import { cn } from '../../lib/utils'
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { H2 } from '../ui/typography'
import { Project } from "@/lib/db/schema"
import Link from "next/link"
import Image from "next/image"

const imageStyles = [
    { flex: 'flex-[1]',   height: 'h-44', rotate: '-rotate-2', sink: 'translate-y-6'  },
    { flex: 'flex-[1.5]', height: 'h-52', rotate:  'rotate-0', sink: 'translate-y-8'  },
    { flex: 'flex-[0.8]', height: 'h-40', rotate: 'rotate-2', sink: 'translate-y-6'  },
    { flex: 'flex-[1.2]', height: 'h-56', rotate:  'rotate-2', sink: 'translate-y-6'  },
]

export const ProjectCard = ({ title, description, gallery, slug }: Project) => {
    return (
        <div className="group hover:-translate-y-1 transition-transform duration-300 ease-out">
            <Card className="w-full pb-0 bg-gray-100 dark:bg-card overflow-hidden">
                <CardHeader>
                    <div className="flex items-center text-lg font-semibold justify-between">
                        <Link href={`/projects/${slug}`}>
                            <H2 className="border-none">{title}</H2>
                        </Link>
                        <Link href={`/projects/${slug}`}>
                            <BsArrowRight
                                size={40}
                                className="-rotate-30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </div>
                    <CardDescription className="md:max-w-2/5">{description}</CardDescription>
                </CardHeader>

                <CardContent className="py-0 px-0">
                    <div className="flex flex-row gap-1.5 items-end py-4 overflow-hidden md:px-14">
                        {gallery?.map((src, index) => {
                            const style = imageStyles[index % imageStyles.length]
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        'min-w-0 transition-all duration-300 ease-out',
                                        'hover:scale-105 hover:-translate-y-2',
                                        style.flex,
                                        style.height,
                                        style.rotate,
                                        style.sink,
                                    )}
                                >
                                    <Image
                                        src={src.src}
                                        width={1000}
                                        height={1000}
                                        alt={src.alt}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
