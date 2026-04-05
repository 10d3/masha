"use client"

import { FaDribbble, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CaseStudyFooter } from "@/types/case-study"
import { InlineRenderer } from "./tiptap-renderer"
import { BsArrowRight } from "react-icons/bs"


interface FooterProps {
  data: CaseStudyFooter
}

export function Footer({ data }: FooterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer className="bg-foreground text-background w-full min-w-100vw" ref={ref}>
      {/* Next Project CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
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
<BsArrowRight
                                size={24}
                                className="-rotate-30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />

            </div>
          </Link>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <div className="border-t border-background/10 py-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-background/50">
            &copy; 2026 AMK Brand Studio. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a href="https://ht.linkedin.com/in/marckenley-antoine-60a43b400" className="text-sm text-background/50 hover:text-background transition-colors">
              <FaLinkedinIn size={24}/>
            </a>
            <a href="https://dribbble.com/marckenley-antoine" className="text-sm text-background/50 hover:text-background transition-colors">
              <FaDribbble size={24} />
            </a>
            <a href="https://www.instagram.com/amk.brand.studio?igsh=Z2E2MXJuMGV1emZ0&utm_source=qr" className="text-sm text-background/50 hover:text-background transition-colors">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
