'use client'

import { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TocHeading } from './BlogPostContent'

interface TableOfContentsProps {
  headings: TocHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 },
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <div className="mb-4 flex items-center gap-1.5">
        <BookOpen className="h-3.5 w-3.5 text-navy/40" strokeWidth={2} />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-navy/50">
          On This Page
        </h2>
      </div>

      <ul className="space-y-0.5">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block border-l-2 py-1.5 text-[13px] leading-snug transition-all duration-200',
                  heading.level === 3 ? 'pl-5' : 'pl-3',
                  isActive
                    ? 'border-accent font-semibold text-accent'
                    : 'border-border text-navy/50 hover:border-navy/30 hover:text-navy/80',
                )}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
