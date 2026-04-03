"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "motion/react"

export function Header({year}:{year:string}) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">Back to Work</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Overview</a>
          <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Process</a>
          <a href="#results" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Results</a>
        </nav>
        
        <span className="text-xs text-muted-foreground tracking-widest uppercase">{year}</span>
      </div>
    </motion.header>
  )
}
