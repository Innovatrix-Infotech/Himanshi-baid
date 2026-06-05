import type { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/cms/queries'
import {
  absoluteAssetUrl,
  absoluteUrl,
  buildStaticSitemapEntry,
  STATIC_SEO_ROUTES,
} from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogPosts()
  const staticEntries = STATIC_SEO_ROUTES.map(buildStaticSitemapEntry)
  const blogEntries = blogPosts
    .filter((post) => post.slug)
    .map((post) => {
      const imageUrl = absoluteAssetUrl(post.featured_image)

      return {
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post.published_at ? new Date(post.published_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.65,
        images: imageUrl ? [imageUrl] : undefined,
      }
    })

  return [...staticEntries, ...blogEntries]
}
