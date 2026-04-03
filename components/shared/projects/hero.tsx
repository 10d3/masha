"use client"

import { motion } from "motion/react"
import Image from "next/image"
import type { CaseStudyMeta } from "@/types/case-study"
import { InlineRenderer } from "./tiptap-renderer"

interface HeroProps {
  data: CaseStudyMeta
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="">
        {/* Project Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-12"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            <InlineRenderer content={data.category} />
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95]">
            <InlineRenderer content={data.title} />
          </h1>
        </motion.div>

        {/* Project Meta */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-border"
        >
          <div>
            <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Client</span>
            <span className="text-sm font-medium">
              <InlineRenderer content={data.client} />
            </span>
          </div>
          <div>
            <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Role</span>
            <span className="text-sm font-medium">
              <InlineRenderer content={data.role} />
            </span>
          </div>
          <div>
            <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Timeline</span>
            <span className="text-sm font-medium">
              <InlineRenderer content={data.timeline} />
            </span>
          </div>
          <div>
            <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Year</span>
            <span className="text-sm font-medium">
              <InlineRenderer content={data.year} />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="mt-16 md:mt-24"
      >
        <div className="">
          <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
            <Image
              src={data.heroImage}
              alt={`${data.title} Hero`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
