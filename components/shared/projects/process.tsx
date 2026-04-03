"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import type { CaseStudyProcess } from "@/types/case-study"
import { TiptapRenderer, InlineRenderer } from "./tiptap-renderer"

interface ProcessProps {
  data: CaseStudyProcess | null
}

export function Process({ data }: ProcessProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="process" className="py-24 md:py-32 bg-secondary/30" ref={ref}>
      <div className="px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-4">
            Process
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
            <InlineRenderer content={data?.sectionTitle as string} />
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-24 md:space-y-32">
          {data?.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1], 
                delay: 0.2 + index * 0.15 
              }}
              className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <span className="text-6xl md:text-7xl font-serif text-muted-foreground/30 font-medium">
                  <InlineRenderer content={step.number} />
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-medium -mt-4">
                  <InlineRenderer content={step.title} />
                </h3>
                <div className="text-muted-foreground leading-relaxed text-lg">
                  <TiptapRenderer content={step.description} />
                </div>
              </div>
              <div className={`relative aspect-4/3 rounded-lg overflow-hidden bg-muted ${
                index % 2 === 1 ? "md:order-1" : ""
              }`}>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
