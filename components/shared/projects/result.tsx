"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import type { CaseStudyResults } from "@/types/case-study"
import { TiptapRenderer, InlineRenderer } from "./tiptap-renderer"

interface ResultsProps {
  data: CaseStudyResults | null
}

export function Results({ data }: ResultsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="results" className="py-24 md:py-32" ref={ref}>
    <div className="">
    <div className="grid md:grid-cols-12 gap-12 md:gap-8">
    {/* Label */}
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="md:col-span-3"
    >
    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
    Results
    </span>
    </motion.div>

    {/* Content */}
    <div className="md:col-span-9">
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    className="mb-16"
    >
    <div className="text-2xl md:text-3xl font-serif leading-relaxed text-balance">
    <TiptapRenderer content={data?.introText as string} />
    </div>
    </motion.div>
    </div>

    {/* Stats Grid */}
   {/* Stats Grid */}
<div className="md:col-span-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {data?.stats.map((stat, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2 + index * 0.1
                }}
                className="text-center md:text-left"
            >
                <span className="block text-3xl md:text-5xl font-serif font-medium mb-2">
                    <InlineRenderer content={stat.value} />
                </span>
                <span className="text-sm text-muted-foreground">
                    <InlineRenderer content={stat.label} />
                </span>
            </motion.div>
        ))}
    </div>
</div>    </div>

    {/* Testimonial */}
    <motion.div 
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
    className="mt-24 md:mt-32 pt-12 border-t border-border"
    >
    <div className="max-w-4xl mx-auto text-center">
    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed mb-8">
    <span>&ldquo;</span>
    <TiptapRenderer content={data?.testimonial.quote as string} className="inline" />
    <span>&rdquo;</span>
    </blockquote>
    <div className="flex flex-col items-center gap-2">
    <span className="font-medium">
    <InlineRenderer content={data?.testimonial.authorName as string} />
    </span>
    <span className="text-sm text-muted-foreground">
    <InlineRenderer content={data?.testimonial.authorTitle as string} />
    </span>
    </div>
    </div>
    </motion.div>
    </div>
    </section>
  )
}
