'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Container } from '@/components/ui/Container'
import { formatCmsDate } from '@/lib/utils'
import { ChevronRight, Clock, Calendar, FileText } from 'lucide-react'
import type { HBBlogPost } from '@/lib/cms/types'

interface BlogPostHeaderProps {
  post: HBBlogPost
}

function getCategoryStyles(category: string) {
  return category === 'education'
    ? 'bg-medical-red text-white'
    : 'bg-accent text-white'
}

function estimateWordCount(body: string): string {
  const count = body.split(/\s+/).filter(Boolean).length
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k words`
  return `${count} words`
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <section className="bg-navy-dark pb-14 pt-28 md:pb-20 md:pt-36">
      <Container>
        <ScrollReveal>
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-[13px]">
            <Link href="/" className="text-white/35 transition-colors hover:text-white/60">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-white/20" strokeWidth={2.5} />
            <Link href="/blog" className="text-white/35 transition-colors hover:text-white/60">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3 text-white/20" strokeWidth={2.5} />
            <span className="max-w-[400px] truncate text-white/55">
              {post.title}
            </span>
          </nav>

          <div className="max-w-3xl">
            {/* Category badge */}
            <span
              className={`inline-block rounded-md px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest ${getCategoryStyles(post.category)}`}
            >
              {post.category === 'education' ? 'Education' : 'Blog'}
            </span>

            {/* Title */}
            <h1 className="mt-6 font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.6rem] lg:leading-[1.2]">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mt-5 text-[15px] leading-relaxed text-white/50 md:text-base">
                {post.excerpt}
              </p>
            )}

            {/* Author + Meta — two distinct rows */}
            <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-serif text-sm font-bold text-white/70">
                HB
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Dr. Himanshi Baid</p>
                <p className="text-[11px] text-white/35">Emergency Medicine</p>
              </div>

              {/* Separator */}
              <div className="mx-2 h-8 w-px bg-white/10" />

              {/* Meta items */}
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-white/40">
                {post.published_at && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-white/25" strokeWidth={1.5} />
                    {formatCmsDate(post.published_at, 'long')}
                  </span>
                )}
                {post.reading_time && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-white/25" strokeWidth={1.5} />
                    {post.reading_time} min read
                  </span>
                )}
                {post.body && (
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-white/25" strokeWidth={1.5} />
                    {estimateWordCount(post.body)}
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/45 transition-colors hover:border-white/15 hover:text-white/60"
                  >
                    #{tag.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
