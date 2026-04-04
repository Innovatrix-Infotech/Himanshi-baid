'use client'

import { useMemo } from 'react'
import { marked } from 'marked'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import type { HBBlogPost } from '@/lib/cms/types'

interface BlogPostBodySectionProps {
  post: HBBlogPost
}

export function BlogPostBodySection({ post }: BlogPostBodySectionProps) {
  const htmlContent = useMemo(() => {
    if (!post.body) return ''
    return marked.parse(post.body, { async: false }) as string
  }, [post.body])

  return (
    <section className="bg-white pb-20 md:pb-24">
      <Container size="narrow">
        <ScrollReveal>
          <article
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-navy
              prose-h2:mt-10 prose-h2:text-2xl md:prose-h2:text-3xl
              prose-h3:mt-8 prose-h3:text-xl
              prose-p:leading-relaxed prose-p:text-foreground/80
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-navy
              prose-ul:my-4 prose-li:text-foreground/80
              prose-ol:my-4
              prose-blockquote:border-accent prose-blockquote:text-muted"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </ScrollReveal>

        <div className="mt-12 border-t border-border pt-8">
          <Button variant="ghost" href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
            Back to All Posts
          </Button>
        </div>
      </Container>
    </section>
  )
}
