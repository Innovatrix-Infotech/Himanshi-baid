import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { BlogHeaderSection } from '@/components/sections/blog/BlogHeaderSection'
import { BlogGridSection } from '@/components/sections/blog/BlogGridSection'

const POSTS_PER_PAGE = 9

export const metadata: Metadata = {
  title: 'Blog | Dr. Himanshi Baid',
  description:
    'Insights on emergency medicine, medical education, and academic research from Dr. Himanshi Baid.',
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)

  const { posts, total } = await getBlogPosts(page, POSTS_PER_PAGE)
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE))

  return (
    <PageWrapper>
      <main>
        <BlogHeaderSection />
        <BlogGridSection
          posts={posts}
          currentPage={page}
          totalPages={totalPages}
        />
      </main>
    </PageWrapper>
  )
}
