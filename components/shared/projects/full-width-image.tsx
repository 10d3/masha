"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Image from "next/image"

interface FullWidthImageProps {
    src: string
    alt: string
    caption?: string
}

export function FullWidthImage({ src, alt }: FullWidthImageProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="py-12 md:py-16"
        >
            <div className="">
                <div className="relative aspect-21/9 w-full rounded-lg overflow-hidden bg-muted">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </motion.section>
    )
}
