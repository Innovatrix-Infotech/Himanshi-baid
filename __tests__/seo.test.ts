/** @jest-environment node */

const mockGetAllBlogPosts = jest.fn()

jest.mock('@/lib/cms/queries', () => ({
  getAllBlogPosts: () => mockGetAllBlogPosts(),
}))

import manifest from '@/app/manifest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import {
  absoluteUrl,
  buildBlogPostJsonLd,
  buildPageMetadata,
  buildPersonJsonLd,
  SEO_ROUTES,
  stringifyJsonLd,
} from '@/lib/seo'
import type { HBBlogPost, HBSiteConfig } from '@/lib/cms/types'

const siteConfig: HBSiteConfig = {
  id: 1,
  site_title: 'Dr. Himanshi Baid',
  tagline: 'Where Critical Care Meets Academic Rigour',
  bio: 'Emergency Medicine physician and academic faculty.',
  bio_short: 'Assistant Professor of Emergency Medicine.',
  bio_full: 'Assistant Professor of Emergency Medicine.',
  philosophy: '',
  profile_photo: 'profile-photo-id',
  cv_file: null,
  linkedin_url: 'https://www.linkedin.com/in/himanshi-baid',
  email: 'doctor@example.com',
  google_scholar_url: 'https://scholar.google.com/citations?user=example',
  orcid_url: 'https://orcid.org/0000-0000-0000-0000',
  covid_section_content: '',
  seo_title: 'Dr. Himanshi Baid | Emergency Medicine',
  seo_description: 'Emergency medicine academic profile.',
  og_image: null,
  footer_links: [],
  smtp_host: '',
  smtp_port: null,
  smtp_secure: false,
  smtp_user: '',
  smtp_password: '',
  smtp_from_email: '',
  smtp_to_email: '',
}

const blogPost: HBBlogPost = {
  id: 'post-1',
  status: 'published',
  slug: 'pocus-in-emergency-care',
  title: 'POCUS in Emergency Care',
  category: 'education',
  excerpt: 'How point-of-care ultrasound supports emergency diagnosis.',
  body: 'Point of care ultrasound helps emergency teams make faster decisions.',
  featured_image: 'featured-image-id',
  tags: ['POCUS', 'Emergency Medicine'],
  published_at: '2026-05-14',
  reading_time: 4,
  seo_title: '',
  seo_description: '',
}

describe('SEO metadata helpers', () => {
  it('builds route metadata with canonical, Open Graph, and Twitter fields', () => {
    const metadata = buildPageMetadata(SEO_ROUTES.about)

    expect(metadata.title).toBe('About')
    expect(metadata.description).toMatch(/Emergency Medicine physician/)
    expect(metadata.alternates).toEqual({ canonical: '/about' })
    expect(metadata.openGraph).toMatchObject({
      title: 'About | Dr. Himanshi Baid',
      url: '/about',
      type: 'website',
    })
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'About | Dr. Himanshi Baid',
    })
  })

  it('builds sanitized Person JSON-LD from site config', () => {
    const schema = buildPersonJsonLd(siteConfig)

    expect(schema).toMatchObject({
      '@type': 'Person',
      '@id': absoluteUrl('/#person'),
      name: 'Dr. Himanshi Baid',
      email: 'doctor@example.com',
    })
    expect(schema.sameAs).toEqual([
      'https://www.linkedin.com/in/himanshi-baid',
      'https://scholar.google.com/citations?user=example',
      'https://orcid.org/0000-0000-0000-0000',
    ])
  })

  it('escapes unsafe characters when serializing JSON-LD', () => {
    const serialized = stringifyJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: '<script>alert(1)</script>',
    })

    expect(serialized).toContain('\\u003cscript>')
    expect(serialized).not.toContain('<script>')
  })

  it('builds BlogPosting JSON-LD for article pages', () => {
    const schemas = buildBlogPostJsonLd(blogPost)
    const article = schemas.find((schema) => schema['@type'] === 'BlogPosting')

    expect(article).toMatchObject({
      '@id': absoluteUrl('/blog/pocus-in-emergency-care#article'),
      headline: 'POCUS in Emergency Care',
      datePublished: '2026-05-14',
      articleSection: 'Medical Education',
    })
  })
})

describe('SEO metadata routes', () => {
  beforeEach(() => {
    mockGetAllBlogPosts.mockReset()
  })

  it('generates robots.txt settings with sitemap and API disallow rules', () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      sitemap: absoluteUrl('/sitemap.xml'),
      host: absoluteUrl('/').replace(/\/$/, ''),
    })
  })

  it('generates a manifest with installable icons', () => {
    expect(manifest()).toMatchObject({
      name: 'Dr. Himanshi Baid | Emergency Medicine',
      short_name: 'Dr. Himanshi Baid',
      start_url: '/',
      display: 'standalone',
      icons: expect.arrayContaining([
        expect.objectContaining({ src: '/icon', sizes: '512x512' }),
        expect.objectContaining({ src: '/apple-icon', sizes: '180x180' }),
      ]),
    })
  })

  it('generates static routes and published blog posts in the sitemap', async () => {
    mockGetAllBlogPosts.mockResolvedValueOnce([blogPost])

    const entries = await sitemap()
    const urls = entries.map((entry) => entry.url)

    expect(urls).toEqual(
      expect.arrayContaining([
        absoluteUrl('/'),
        absoluteUrl('/about'),
        absoluteUrl('/blog'),
        absoluteUrl('/blog/pocus-in-emergency-care'),
      ]),
    )
    expect(entries.find((entry) => entry.url.endsWith('/blog/pocus-in-emergency-care'))).toMatchObject({
      changeFrequency: 'monthly',
      priority: 0.65,
    })
  })
})
