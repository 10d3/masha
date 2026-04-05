"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import type { CaseStudyOverview } from "@/types/case-study"
import { TiptapRenderer } from "./tiptap-renderer"

interface OverviewProps {
  data: CaseStudyOverview | null
}

export function Overview({ data }: OverviewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="overview" className="py-24 md:py-32" ref={ref}>
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
              Overview
            </span>
          </motion.div>

          {/* Content */}
          <div className="md:col-span-9 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}   
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-serif text-balance">
                <TiptapRenderer content={data?.mainText as string} />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <TiptapRenderer content={data?.subText as string} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Services */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Services
              </span>
            </div>
            <div className="md:col-span-9">
              <div className="flex flex-wrap gap-3">
                {data?.services.map((service) => (
                  <span 
                    key={service}
                    className="px-4 py-2 text-sm border border-border rounded-full hover:bg-secondary transition-colors"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
