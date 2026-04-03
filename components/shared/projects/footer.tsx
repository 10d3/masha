"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CaseStudyFooter } from "@/types/case-study"
import { InlineRenderer } from "./tiptap-renderer"

interface FooterProps {
  data: CaseStudyFooter
}

export function Footer({ data }: FooterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer className="bg-foreground text-background" ref={ref}>
      {/* Next Project CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="py-24 md:py-32"
      >
        <div className="">
          <Link 
            href={data.nextProject.href}
            className="group flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-background/50 block mb-4">
                Next Project
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
                <InlineRenderer content={data.nextProject.title} />
              </h2>
              <span className="text-sm text-background/70 mt-2 block">
                <InlineRenderer content={data.nextProject.category} />
              </span>
            </div>
            <div className="flex items-center gap-3 text-background/70 group-hover:text-background transition-colors">
              <span className="text-sm font-medium">View Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <div className="border-t border-background/10 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-background/50">
            &copy; 2024 Studio. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              Dribbble
            </a>
            <a href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
