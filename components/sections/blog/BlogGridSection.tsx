'use client'

import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PostCard } from '@/components/ui/PostCard'
import { Pagination } from '@/components/ui/Pagination'
import { FileText } from 'lucide-react'
import type { HBBlogPost } from '@/lib/cms/types'

interface BlogGridSectionProps {
  posts: HBBlogPost[]
  currentPage: number
  totalPages: number
}

export function BlogGridSection({ posts, currentPage, totalPages }: BlogGridSectionProps) {
  if (posts.length === 0) {
    return (
      <section className="bg-background-alt py-20 md:py-24">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <FileText className="h-7 w-7 text-muted" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-navy">
                No posts yet
              </h2>
              <p className="mt-2 text-sm text-muted">
                New articles on emergency medicine, education, and research are coming soon.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-background-alt py-16 md:py-20">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>
      </Container>
    </section>
  )
}
