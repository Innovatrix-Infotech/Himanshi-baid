import type { Metadata, MetadataRoute } from 'next'
import type {
  HBBlogPost,
  HBConference,
  HBPublication,
  HBSiteConfig,
} from '@/lib/cms/types'

type JsonLdObject = Record<string, unknown>
type JsonLdValue = JsonLdObject | JsonLdObject[]
type SitemapEntry = MetadataRoute.Sitemap[number]
type ChangeFrequency = NonNullable<SitemapEntry['changeFrequency']>

interface SeoRoute {
  path: string
  title: string
  description: string
  schemaType: string
  changeFrequency: ChangeFrequency
  priority: number
}

interface PageMetadataOptions {
  title?: string
  description?: string
  path?: string
  image?: string | null
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string | null
  modifiedTime?: string | null
  tags?: string[]
}

const DEFAULT_SITE_URL = 'https://himanshibaid.com'
const DEFAULT_DIRECTUS_URL = 'https://cms.innovatrixinfotech.in'
const DEFAULT_DESCRIPTION =
  'Academic portfolio of Dr. Himanshi Baid, Assistant Professor of Emergency Medicine at Mahatma Gandhi Medical College and Hospital, Jaipur.'

export const SITE_NAME = 'Dr. Himanshi Baid'
export const SITE_TAGLINE = 'Where Critical Care Meets Academic Rigour'
export const SITE_LOCALE = 'en_IN'
export const SITE_LANGUAGE = 'en-IN'
export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL,
)
export const DIRECTUS_ASSET_URL = normalizeSiteUrl(
  process.env.DIRECTUS_URL ?? DEFAULT_DIRECTUS_URL,
)

export const SEO_KEYWORDS = [
  'Dr. Himanshi Baid',
  'Emergency Medicine',
  'Mahatma Gandhi Medical College and Hospital',
  'MGMCH Jaipur',
  'MRCEM UK',
  'Emergency Toxicology',
  'Point of Care Ultrasound',
  'POCUS',
  'Medical Education',
  'Simulation Based Education',
  'Resuscitation Science',
]

export const SEO_ROUTES = {
  home: {
    path: '/',
    title: `${SITE_NAME} | Emergency Medicine`,
    description: DEFAULT_DESCRIPTION,
    schemaType: 'ProfilePage',
    changeFrequency: 'weekly',
    priority: 1,
  },
  about: {
    path: '/about',
    title: 'About',
    description:
      'Emergency Medicine physician, academic faculty, and researcher with expertise in POCUS, toxicology, simulation-based education, and resuscitation science.',
    schemaType: 'AboutPage',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  blog: {
    path: '/blog',
    title: 'Blog',
    description:
      'Insights on emergency medicine, medical education, and academic research from Dr. Himanshi Baid.',
    schemaType: 'Blog',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  publications: {
    path: '/publications',
    title: 'Publications',
    description:
      'Emergency medicine publications including case reports, diagnostic validation studies, systematic reviews, and original research.',
    schemaType: 'CollectionPage',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  conferences: {
    path: '/conferences',
    title: 'Conferences',
    description:
      'Faculty, speaker, and workshop facilitator at national and international emergency medicine conferences, CMEs, and simulation-based events.',
    schemaType: 'CollectionPage',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  contact: {
    path: '/contact',
    title: 'Contact',
    description:
      'Get in touch with Dr. Himanshi Baid for academic collaborations, speaking invitations, research partnerships, and opportunities in emergency medicine education.',
    schemaType: 'ContactPage',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
} satisfies Record<string, SeoRoute>

export const STATIC_SEO_ROUTES = Object.values(SEO_ROUTES)

export function normalizeSiteUrl(value: string): string {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`
  return withProtocol.replace(/\/+$/, '')
}

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export function absoluteAssetUrl(fileIdOrPath: string | null | undefined): string | null {
  if (!fileIdOrPath) return null
  if (/^https?:\/\//.test(fileIdOrPath)) return fileIdOrPath
  if (fileIdOrPath.startsWith('/')) return absoluteUrl(fileIdOrPath)
  return `${DIRECTUS_ASSET_URL}/assets/${encodeURIComponent(fileIdOrPath)}`
}

export function getFullTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
}

export function buildPageMetadata(
  route: SeoRoute,
  options: PageMetadataOptions = {},
): Metadata {
  const title = options.title ?? route.title
  const description = options.description ?? route.description
  const path = options.path ?? route.path
  const fullTitle = getFullTitle(title)
  const image = options.image ?? '/opengraph-image'
  const sharedImage = [
    {
      url: image,
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} academic portfolio`,
    },
  ]

  return {
    title,
    description,
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: options.type ?? 'website',
      images: sharedImage,
      publishedTime: options.publishedTime ?? undefined,
      modifiedTime: options.modifiedTime ?? undefined,
      tags: options.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}

export function buildSiteMetadata(siteConfig: HBSiteConfig): Metadata {
  const title = siteConfig.seo_title || SEO_ROUTES.home.title
  const description = siteConfig.seo_description || SEO_ROUTES.home.description
  const image = absoluteAssetUrl(siteConfig.og_image) ?? '/opengraph-image'

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: SEO_KEYWORDS,
    authors: [{ name: SITE_NAME, url: absoluteUrl('/') }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'Healthcare',
    alternates: {
      canonical: '/',
    },
    icons: {
      icon: [
        { url: '/icon', type: 'image/png', sizes: '512x512' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
      title,
      description,
      url: '/',
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} academic portfolio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export function buildPersonJsonLd(siteConfig: HBSiteConfig): JsonLdObject {
  return cleanJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': absoluteUrl('/#person'),
    name: siteConfig.site_title || SITE_NAME,
    honorificPrefix: 'Dr.',
    url: absoluteUrl('/'),
    image: absoluteAssetUrl(siteConfig.profile_photo) ?? absoluteUrl('/1.jpeg'),
    description: siteConfig.bio_short || siteConfig.bio || DEFAULT_DESCRIPTION,
    jobTitle: [
      'Assistant Professor of Emergency Medicine',
      'Emergency Medicine Physician',
    ],
    worksFor: {
      '@type': 'MedicalOrganization',
      name: 'Mahatma Gandhi Medical College and Hospital',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'AIIMS Jodhpur',
      },
    ],
    knowsAbout: [
      'Emergency Medicine',
      'Emergency Toxicology',
      'Point-of-Care Ultrasound',
      'Simulation-based Medical Education',
      'Resuscitation Science',
    ],
    email: siteConfig.email || undefined,
    sameAs: [
      siteConfig.linkedin_url,
      siteConfig.google_scholar_url,
      siteConfig.orcid_url,
    ],
  })
}

export function buildWebsiteJsonLd(siteConfig: HBSiteConfig): JsonLdObject {
  return cleanJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: siteConfig.site_title || SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: absoluteUrl('/'),
    description: siteConfig.seo_description || DEFAULT_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: {
      '@id': absoluteUrl('/#person'),
    },
  })
}

export function buildPageJsonLd(
  route: SeoRoute,
  options: {
    title?: string
    description?: string
    path?: string
    mainEntity?: JsonLdObject
    datePublished?: string | null
    dateModified?: string | null
  } = {},
): JsonLdObject[] {
  const path = options.path ?? route.path
  const name = options.title ? getFullTitle(options.title) : getFullTitle(route.title)
  const description = options.description ?? route.description
  const pageId = absoluteUrl(`${path}#webpage`)
  const breadcrumbId = absoluteUrl(`${path}#breadcrumb`)

  return [
    cleanJsonLd({
      '@context': 'https://schema.org',
      '@type': route.schemaType,
      '@id': pageId,
      url: absoluteUrl(path),
      name,
      description,
      inLanguage: SITE_LANGUAGE,
      isPartOf: {
        '@id': absoluteUrl('/#website'),
      },
      about: {
        '@id': absoluteUrl('/#person'),
      },
      mainEntity: options.mainEntity ?? {
        '@id': absoluteUrl('/#person'),
      },
      breadcrumb: {
        '@id': breadcrumbId,
      },
      datePublished: options.datePublished,
      dateModified: options.dateModified ?? options.datePublished,
    }),
    buildBreadcrumbJsonLd(path, options.title ?? route.title, breadcrumbId),
  ]
}

export function buildBreadcrumbJsonLd(
  path: string,
  currentLabel: string,
  breadcrumbId = absoluteUrl(`${path}#breadcrumb`),
): JsonLdObject {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: absoluteUrl('/'),
    },
  ]

  if (path !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: currentLabel,
      item: absoluteUrl(path),
    })
  }

  return cleanJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: items,
  })
}

export function buildBlogPostJsonLd(post: HBBlogPost): JsonLdObject[] {
  const path = `/blog/${post.slug}`
  const image = absoluteAssetUrl(post.featured_image) ?? absoluteUrl('/opengraph-image')
  const description = post.seo_description || post.excerpt
  const article = cleanJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': absoluteUrl(`${path}#article`),
    headline: post.title,
    description,
    url: absoluteUrl(path),
    image,
    datePublished: post.published_at,
    dateModified: post.published_at,
    inLanguage: SITE_LANGUAGE,
    articleSection: post.category === 'education' ? 'Medical Education' : 'Emergency Medicine',
    keywords: post.tags,
    wordCount: getWordCount(post.body),
    author: {
      '@id': absoluteUrl('/#person'),
    },
    publisher: {
      '@id': absoluteUrl('/#person'),
    },
    mainEntityOfPage: {
      '@id': absoluteUrl(`${path}#webpage`),
    },
  })

  return [
    ...buildPageJsonLd(SEO_ROUTES.blog, {
      title: post.title,
      description,
      path,
      mainEntity: {
        '@id': absoluteUrl(`${path}#article`),
      },
      datePublished: post.published_at,
    }),
    article,
  ]
}

export function buildBlogIndexJsonLd(posts: HBBlogPost[]): JsonLdObject {
  return buildItemListJsonLd(
    posts.map((post, index) => ({
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
    absoluteUrl('/blog#item-list'),
  )
}

export function buildPublicationItemListJsonLd(publications: HBPublication[]): JsonLdObject {
  return buildItemListJsonLd(
    publications.map((publication, index) => ({
      position: index + 1,
      url: publication.doi_url || publication.url || absoluteUrl('/publications'),
      name: publication.title,
      item: cleanJsonLd({
        '@type': 'ScholarlyArticle',
        headline: publication.title,
        author: publication.authors,
        datePublished: publication.year ? String(publication.year) : undefined,
        isPartOf: publication.journal
          ? {
              '@type': 'Periodical',
              name: publication.journal,
            }
          : undefined,
        sameAs: publication.doi_url || publication.url || undefined,
        identifier: publication.pubmed_id
          ? `PubMed:${publication.pubmed_id}`
          : undefined,
        description: publication.abstract,
      }),
    })),
    absoluteUrl('/publications#item-list'),
  )
}

export function buildConferenceItemListJsonLd(conferences: HBConference[]): JsonLdObject {
  return buildItemListJsonLd(
    conferences.map((conference, index) => ({
      position: index + 1,
      url: absoluteUrl('/conferences'),
      name: conference.title || conference.conference_name,
      item: cleanJsonLd({
        '@type': 'Event',
        name: conference.title || conference.conference_name,
        description: conference.description || conference.topic,
        startDate: conference.date,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: conference.location
          ? {
              '@type': 'Place',
              name: conference.location,
            }
          : undefined,
        performer: {
          '@id': absoluteUrl('/#person'),
        },
      }),
    })),
    absoluteUrl('/conferences#item-list'),
  )
}

export function buildStaticSitemapEntry(route: SeoRoute): SitemapEntry {
  return {
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }
}

export function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  )
}

export function stringifyJsonLd(data: JsonLdValue): string {
  return JSON.stringify(cleanJsonLd(data)).replace(/</g, '\\u003c')
}

function buildItemListJsonLd(
  items: Array<{
    position: number
    url: string
    name: string
    item?: JsonLdObject
  }>,
  id: string,
): JsonLdObject {
  return cleanJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': id,
    itemListElement: items
      .filter((item) => item.name)
      .map((item) => ({
        '@type': 'ListItem',
        position: item.position,
        url: item.url,
        name: item.name,
        item: item.item,
      })),
  })
}

function cleanJsonLd<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => cleanJsonLd(item))
      .filter((item) => !isEmptyValue(item)) as T
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, entry]) => [key, cleanJsonLd(entry)])
        .filter(([, entry]) => !isEmptyValue(entry)),
    ) as T
  }

  if (typeof value === 'string') {
    return value.trim() as T
  }

  return value
}

function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

function getWordCount(content: string): number | undefined {
  const stripped = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (!stripped) return undefined
  return stripped.split(' ').length
}
