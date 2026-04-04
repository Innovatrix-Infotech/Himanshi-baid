'use client'

import { useMemo } from 'react'
import { marked } from 'marked'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { TableOfContents } from '@/components/sections/blog/TableOfContents'
import { BlogSidebar } from '@/components/sections/blog/BlogSidebar'
import { ArrowLeft } from 'lucide-react'
import type { HBBlogPost } from '@/lib/cms/types'

export interface TocHeading {
  id: string
  text: string
  level: number
}

function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = []
  const lines = markdown.split('\n')

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].replace(/\*\*/g, '').replace(/\*/g, '').trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
      headings.push({ id, text, level })
    }
  }

  return headings
}

interface BlogPostContentProps {
  post: HBBlogPost
  trendingPosts: HBBlogPost[]
}

export function BlogPostContent({ post, trendingPosts }: BlogPostContentProps) {
  const headings = useMemo(() => extractHeadings(post.body), [post.body])

  const htmlContent = useMemo(() => {
    if (!post.body) return ''

    const renderer = new marked.Renderer()
    renderer.heading = ({ text, depth }) => {
      const cleanText = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').replace(/\*/g, '').trim()
      const id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
      return `<h${depth} id="${id}">${text}</h${depth}>\n`
    }

    return marked.parse(post.body, { renderer, async: false }) as string
  }, [post.body])

  return (
    <section className="bg-white pb-16 md:pb-20">
      <Container>
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[200px_1fr_260px] lg:gap-10 xl:grid-cols-[220px_1fr_280px] xl:gap-14">
          {/* Left sidebar — Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 pt-10">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          {/* Center — Article body */}
          <div className="min-w-0 border-border pt-10 lg:border-x lg:px-10 xl:px-14">
            <ScrollReveal>
              <article
                className="prose max-w-none
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-navy
                  prose-h2:mb-3 prose-h2:mt-10 prose-h2:text-[1.35rem] prose-h2:leading-snug
                  prose-h3:mb-2 prose-h3:mt-7 prose-h3:text-base prose-h3:font-bold
                  prose-p:text-[0.9rem] prose-p:leading-[1.8] prose-p:text-foreground/75
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:font-semibold prose-strong:text-navy
                  prose-ul:my-4 prose-li:text-[0.9rem] prose-li:leading-[1.8] prose-li:text-foreground/75
                  prose-ol:my-4
                  prose-blockquote:border-accent prose-blockquote:text-[0.9rem] prose-blockquote:text-muted
                  prose-code:text-xs prose-code:text-accent
                  prose-hr:my-8"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </ScrollReveal>

            <div className="mt-12 border-t border-border pt-6">
              <Button variant="ghost" href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
                Back to All Posts
              </Button>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 pt-10">
              <BlogSidebar
                tags={post.tags}
                trendingPosts={trendingPosts}
              />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
