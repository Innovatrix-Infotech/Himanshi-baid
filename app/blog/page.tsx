import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { BlogHeaderSection } from '@/components/sections/blog/BlogHeaderSection'
import { BlogGridSection } from '@/components/sections/blog/BlogGridSection'
import {
  buildBlogIndexJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
  JsonLd,
  SEO_ROUTES,
} from '@/lib/seo'

const POSTS_PER_PAGE = 9

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)

  return buildPageMetadata(SEO_ROUTES.blog, {
    title: page > 1 ? `Blog - Page ${page}` : SEO_ROUTES.blog.title,
    path: page > 1 ? `/blog?page=${page}` : SEO_ROUTES.blog.path,
  })
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)

  const { posts, total } = await getBlogPosts(page, POSTS_PER_PAGE)
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE))

  return (
    <>
      <JsonLd
        data={[
          ...buildPageJsonLd(SEO_ROUTES.blog, {
            title: page > 1 ? `Blog - Page ${page}` : SEO_ROUTES.blog.title,
            path: page > 1 ? `/blog?page=${page}` : SEO_ROUTES.blog.path,
            mainEntity: buildBlogIndexJsonLd(posts),
          }),
        ]}
      />
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
    </>
  )
}
