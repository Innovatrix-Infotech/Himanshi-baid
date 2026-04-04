'use client'

import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { formatCmsDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import type { HBBlogPost } from '@/lib/cms/types'

interface BlogPostHeaderSectionProps {
  post: HBBlogPost
}

function getCategoryColor(category: string) {
  return category === 'education'
    ? 'bg-medical-red/8 text-medical-red border border-medical-red/15'
    : 'bg-accent/8 text-accent border border-accent/15'
}

export function BlogPostHeaderSection({ post }: BlogPostHeaderSectionProps) {
  return (
    <section className="bg-white pb-10 pt-32 md:pt-40">
      <Container size="narrow">
        <ScrollReveal>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${getCategoryColor(post.category)}`}
            >
              {post.category === 'education' ? 'Education' : 'Blog'}
            </span>

            {post.reading_time && (
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                {post.reading_time} min read
              </span>
            )}

            {post.published_at && (
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                {formatCmsDate(post.published_at, 'long')}
              </span>
            )}
          </div>

          <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/5">
              <User className="h-5 w-5 text-navy/50" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Dr. Himanshi Baid</p>
              <p className="text-xs text-muted">Emergency Medicine</p>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background-alt px-3 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 h-px w-full bg-border" />
        </ScrollReveal>
      </Container>
    </section>
  )
}
