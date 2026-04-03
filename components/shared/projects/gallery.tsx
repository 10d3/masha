"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import type { CaseStudyGallery, GalleryImage } from "@/types/case-study"

interface GalleryProps {
  data: CaseStudyGallery
}

function getImageClassName(image: GalleryImage, index: number): string {
  if (image.span === "full") {
    return "md:col-span-2 aspect-[16/10]"
  }
  // Alternate between portrait aspects for visual variety
  return index % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/5]"
}

export function Gallery({ data }: GalleryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-12 md:py-16" ref={ref}>
      <div className="">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {data.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1], 
                delay: index * 0.1 
              }}
              className={`relative overflow-hidden rounded-lg bg-muted ${getImageClassName(image, index)}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
