import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { readItems, readSingleton, aggregate } from '@directus/sdk'
import { directusClient, directusRequest } from './directus-client'
import { CMS_TAGS, type CmsTag } from './cache-tags'
import {
  mapSiteConfig,
  mapBlogPost,
  mapAward,
  mapEducation,
  mapExperience,
  mapArray,
  mapCertification,
  mapPublication,
  mapConference,
  mapThesis,
} from './mappers'
import type { HBSiteConfig, HBBlogPost, HBBlogCategory, HBEducation, HBExperience, HBCertification, HBPublication, HBConference, HBThesis } from './types'

async function safeCmsQuery<T>(queryFn: () => Promise<T>, fallback: unknown): Promise<T | typeof fallback> {
  try {
    return await directusRequest(queryFn)
  } catch {
    return fallback as T
  }
}

const DATA_CACHE_TTL = 60

function taggedCache<T>(key: string, tags: CmsTag[], queryFn: () => Promise<T>) {
  if (process.env.NODE_ENV === 'test') {
    return queryFn
  }
  return unstable_cache(queryFn, [key], { tags, revalidate: DATA_CACHE_TTL })
}

const getSiteConfigCached = taggedCache(
  'cms-site-config',
  [CMS_TAGS.site_config],
  async () => {
    const data = await safeCmsQuery(
      () => directusClient.request(readSingleton('hb_site_config')),
      {},
    )
    return mapSiteConfig(data)
  },
)

export const getSiteConfig = cache(async (): Promise<HBSiteConfig> => {
  return getSiteConfigCached()
})

export const getPublicationsCount = cache(async (): Promise<number> => {
  const fn = taggedCache(
    'cms-publications-count',
    [CMS_TAGS.publications],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            aggregate('hb_publications', {
              aggregate: { count: ['id'] },
            }),
          ),
        [],
      )
      const row = Array.isArray(data) ? data[0] : null
      const count = (row as Record<string, Record<string, string>> | null)?.count?.id
      return Number(count ?? 0)
    },
  )
  return fn()
})

export const getGoldMedalsCount = cache(async (): Promise<number> => {
  const fn = taggedCache(
    'cms-gold-medals-count',
    [CMS_TAGS.awards],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            aggregate('hb_awards', {
              aggregate: { count: ['id'] },
            }),
          ),
        [],
      )
      const row = Array.isArray(data) ? data[0] : null
      const count = (row as Record<string, Record<string, string>> | null)?.count?.id
      return Number(count ?? 0)
    },
  )
  return fn()
})

export const getConferencesCount = cache(async (): Promise<number> => {
  const fn = taggedCache(
    'cms-conferences-count',
    [CMS_TAGS.conferences],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            aggregate('hb_conferences', {
              aggregate: { count: ['id'] },
            }),
          ),
        [],
      )
      const row = Array.isArray(data) ? data[0] : null
      const count = (row as Record<string, Record<string, string>> | null)?.count?.id
      return Number(count ?? 0)
    },
  )
  return fn()
})

export const getLatestBlogPosts = cache(
  async (category: HBBlogCategory | null, limit: number): Promise<HBBlogPost[]> => {
    const cacheKey = `cms-latest-blogs-${category ?? 'all'}-${limit}`
    const fn = taggedCache(
      cacheKey,
      [CMS_TAGS.blogs],
      async () => {
        const filter: Record<string, unknown> = {
          status: { _eq: 'published' },
        }
        if (category) {
          filter.category = { _eq: category }
        }

        const data = await safeCmsQuery(
          () =>
            directusClient.request(
              readItems('hb_blogs', {
                filter,
                sort: ['-published_at'],
                limit,
              }),
            ),
          [],
        )
        return mapArray(data, mapBlogPost)
      },
    )
    return fn()
  },
)

export const getAllBlogPosts = cache(async (): Promise<HBBlogPost[]> => {
  const fn = taggedCache(
    'cms-all-blogs',
    [CMS_TAGS.blogs],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_blogs', {
              filter: { status: { _eq: 'published' } },
              sort: ['-published_at'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapBlogPost)
    },
  )
  return fn()
})

export const getEducation = cache(async (): Promise<HBEducation[]> => {
  const fn = taggedCache(
    'cms-education',
    [CMS_TAGS.education],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_education', {
              sort: ['sort'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapEducation)
    },
  )
  return fn()
})

export const getExperience = cache(async (): Promise<HBExperience[]> => {
  const fn = taggedCache(
    'cms-experience',
    [CMS_TAGS.experience],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_experience', {
              sort: ['sort'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapExperience)
    },
  )
  return fn()
})

export const getAwards = cache(async (): Promise<ReturnType<typeof mapAward>[]> => {
  const fn = taggedCache(
    'cms-awards',
    [CMS_TAGS.awards],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_awards', {
              sort: ['sort'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapAward)
    },
  )
  return fn()
})

export const getCertifications = cache(async (): Promise<HBCertification[]> => {
  const fn = taggedCache(
    'cms-certifications',
    [CMS_TAGS.certifications],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_certifications', {
              sort: ['sort'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapCertification)
    },
  )
  return fn()
})

export const getPublications = cache(async (): Promise<HBPublication[]> => {
  const fn = taggedCache(
    'cms-publications',
    [CMS_TAGS.publications],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_publications', {
              sort: ['sort'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapPublication)
    },
  )
  return fn()
})

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<HBBlogPost | null> => {
    const fn = taggedCache(
      `cms-blog-slug-${slug}`,
      [CMS_TAGS.blogs],
      async () => {
        const data = await safeCmsQuery(
          () =>
            directusClient.request(
              readItems('hb_blogs', {
                filter: {
                  _and: [
                    { status: { _eq: 'published' } },
                    { slug: { _eq: slug } },
                  ],
                },
                limit: 1,
              }),
            ),
          [],
        )
        const items = mapArray(data, mapBlogPost)
        return items[0] ?? null
      },
    )
    return fn()
  },
)

export const getBlogPosts = cache(
  async (page: number, perPage: number = 9): Promise<{ posts: HBBlogPost[]; total: number }> => {
    const offset = (page - 1) * perPage

    const countFn = taggedCache(
      'cms-blogs-count',
      [CMS_TAGS.blogs],
      async () => {
        const data = await safeCmsQuery(
          () =>
            directusClient.request(
              aggregate('hb_blogs', {
                aggregate: { count: ['id'] },
                query: {
                  filter: { status: { _eq: 'published' } },
                },
              }),
            ),
          [],
        )
        const row = Array.isArray(data) ? data[0] : null
        const count = (row as Record<string, Record<string, string>> | null)?.count?.id
        return Number(count ?? 0)
      },
    )

    const postsFn = taggedCache(
      `cms-blogs-page-${page}-${perPage}`,
      [CMS_TAGS.blogs],
      async () => {
        const data = await safeCmsQuery(
          () =>
            directusClient.request(
              readItems('hb_blogs', {
                filter: { status: { _eq: 'published' } },
                sort: ['-published_at'],
                limit: perPage,
                offset,
              }),
            ),
          [],
        )
        return mapArray(data, mapBlogPost)
      },
    )

    const [total, posts] = await Promise.all([countFn(), postsFn()])
    return { posts, total }
  },
)

export const getConferences = cache(async (): Promise<HBConference[]> => {
  const fn = taggedCache(
    'cms-conferences',
    [CMS_TAGS.conferences],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_conferences', {
              sort: ['sort'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapConference)
    },
  )
  return fn()
})

export const getThesis = cache(async (): Promise<HBThesis[]> => {
  const fn = taggedCache(
    'cms-thesis',
    [CMS_TAGS.thesis],
    async () => {
      const data = await safeCmsQuery(
        () =>
          directusClient.request(
            readItems('hb_thesis', {
              sort: ['sort'],
              limit: -1,
            }),
          ),
        [],
      )
      return mapArray(data, mapThesis)
    },
  )
  return fn()
})
