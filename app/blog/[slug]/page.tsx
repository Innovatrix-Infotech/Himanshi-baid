import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getLatestBlogPosts } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { BlogPostHeader } from '@/components/sections/blog/BlogPostHeader'
import { BlogPostContent } from '@/components/sections/blog/BlogPostContent'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found | Dr. Himanshi Baid' }
  }

  return {
    title: post.seo_title || `${post.title} | Dr. Himanshi Baid`,
    description: post.seo_description || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const [post, latestPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getLatestBlogPosts(null, 5),
  ])

  if (!post) {
    notFound()
  }

  const trendingPosts = latestPosts.filter((p) => p.slug !== slug).slice(0, 4)

  return (
    <PageWrapper>
      <main>
        <BlogPostHeader post={post} />
        <BlogPostContent post={post} trendingPosts={trendingPosts} />
      </main>
    </PageWrapper>
  )
}
