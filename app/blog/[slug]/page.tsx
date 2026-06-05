import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getLatestBlogPosts } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { BlogPostHeader } from '@/components/sections/blog/BlogPostHeader'
import { BlogPostContent } from '@/components/sections/blog/BlogPostContent'
import {
  absoluteAssetUrl,
  buildBlogPostJsonLd,
  buildPageMetadata,
  JsonLd,
  SEO_ROUTES,
} from '@/lib/seo'

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
    ...buildPageMetadata(SEO_ROUTES.blog, {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      path: `/blog/${post.slug}`,
      image: absoluteAssetUrl(post.featured_image) ?? '/opengraph-image',
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.published_at,
      tags: post.tags,
    }),
  } satisfies Metadata
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
    <>
      <JsonLd data={buildBlogPostJsonLd(post)} />
      <PageWrapper>
        <main>
          <BlogPostHeader post={post} />
          <BlogPostContent post={post} trendingPosts={trendingPosts} />
        </main>
      </PageWrapper>
    </>
  )
}
