import type {
  HBSiteConfig,
  HBEducation,
  HBExperience,
  HBAward,
  HBPublication,
  HBConference,
  HBCertification,
  HBBlogPost,
  HBContactSubmission,
  HBStatus,
  HBAwardCategory,
  HBBlogCategory,
  HBConferenceType,
  HBPublicationCategory,
  HBExperienceType,
} from './types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return fallback
}

function asNumber(value: unknown, fallback: number | null = null): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value
  return fallback
}

function asAssetId(value: unknown): string | null {
  if (typeof value === 'string' && value.length > 0) return value
  if (isRecord(value) && typeof value.id === 'string') return value.id
  return null
}

function asStatus(value: unknown): HBStatus {
  if (value === 'published' || value === 'draft' || value === 'archived') return value
  return 'draft'
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string')
  return []
}

const VALID_AWARD_CATEGORIES = new Set<HBAwardCategory>(['gold_medal', 'university_rank', 'nomination', 'other'])
function asAwardCategory(value: unknown): HBAwardCategory {
  if (typeof value === 'string' && VALID_AWARD_CATEGORIES.has(value as HBAwardCategory)) {
    return value as HBAwardCategory
  }
  return 'other'
}

const VALID_BLOG_CATEGORIES = new Set<HBBlogCategory>(['education', 'blog'])
function asBlogCategory(value: unknown): HBBlogCategory {
  if (typeof value === 'string' && VALID_BLOG_CATEGORIES.has(value as HBBlogCategory)) {
    return value as HBBlogCategory
  }
  return 'blog'
}

const VALID_CONFERENCE_TYPES = new Set<HBConferenceType>([
  'oral_presentation', 'poster', 'workshop_attended', 'workshop_facilitated',
])
function asConferenceType(value: unknown): HBConferenceType {
  if (typeof value === 'string' && VALID_CONFERENCE_TYPES.has(value as HBConferenceType)) {
    return value as HBConferenceType
  }
  return 'oral_presentation'
}

const VALID_PUB_CATEGORIES = new Set<HBPublicationCategory>([
  'original_research', 'case_report', 'review', 'letter',
])
function asPublicationCategory(value: unknown): HBPublicationCategory {
  if (typeof value === 'string' && VALID_PUB_CATEGORIES.has(value as HBPublicationCategory)) {
    return value as HBPublicationCategory
  }
  return 'original_research'
}

const VALID_EXP_TYPES = new Set<HBExperienceType>(['academic', 'clinical', 'admin'])
function asExperienceType(value: unknown): HBExperienceType {
  if (typeof value === 'string' && VALID_EXP_TYPES.has(value as HBExperienceType)) {
    return value as HBExperienceType
  }
  return 'academic'
}

export function mapSiteConfig(input: unknown): HBSiteConfig {
  const r = isRecord(input) ? input : {}
  return {
    id: typeof r.id === 'number' ? r.id : 1,
    site_title: asString(r.site_title, 'Dr. Himanshi Baid'),
    tagline: asString(r.tagline, 'Where Critical Care Meets Academic Rigour'),
    bio: asString(r.bio),
    bio_short: asString(r.bio_short),
    bio_full: asString(r.bio_full),
    philosophy: asString(r.philosophy),
    profile_photo: asAssetId(r.profile_photo),
    cv_file: asAssetId(r.cv_file),
    linkedin_url: asString(r.linkedin_url),
    email: asString(r.email),
    google_scholar_url: asString(r.google_scholar_url),
    orcid_url: asString(r.orcid_url),
    covid_section_content: asString(r.covid_section_content),
    seo_title: asString(r.seo_title, 'Dr. Himanshi Baid | Emergency Medicine'),
    seo_description: asString(r.seo_description),
    og_image: asAssetId(r.og_image),
  }
}

export function mapEducation(input: unknown): HBEducation {
  const r = isRecord(input) ? input : {}
  return {
    id: asString(r.id),
    status: asStatus(r.status),
    sort: asNumber(r.sort, 0) ?? 0,
    degree: asString(r.degree),
    institution: asString(r.institution),
    location: asString(r.location),
    start_year: asNumber(r.start_year),
    end_year: asNumber(r.end_year),
    thesis_title: asString(r.thesis_title),
    highlights: asStringArray(r.highlights),
  }
}

export function mapExperience(input: unknown): HBExperience {
  const r = isRecord(input) ? input : {}
  return {
    id: asString(r.id),
    status: asStatus(r.status),
    sort: asNumber(r.sort, 0) ?? 0,
    title: asString(r.title),
    role: asString(r.role),
    organization: asString(r.organization) || asString(r.institution),
    institution: asString(r.institution),
    department: asString(r.department),
    start_date: asString(r.start_date) || null,
    end_date: asString(r.end_date) || null,
    is_current: asBoolean(r.is_current),
    type: asExperienceType(r.type),
    description: asString(r.description),
    is_covid_related: asBoolean(r.is_covid_related),
  }
}

export function mapAward(input: unknown): HBAward {
  const r = isRecord(input) ? input : {}
  return {
    id: asString(r.id),
    status: asStatus(r.status),
    sort: asNumber(r.sort, 0) ?? 0,
    title: asString(r.title),
    category: asAwardCategory(r.category),
    awarding_body: asString(r.awarding_body),
    year: asNumber(r.year),
    description: asString(r.description),
  }
}

export function mapPublication(input: unknown): HBPublication {
  const r = isRecord(input) ? input : {}
  return {
    id: asString(r.id),
    status: asStatus(r.status),
    sort: asNumber(r.sort, 0) ?? 0,
    title: asString(r.title),
    authors: asString(r.authors),
    journal: asString(r.journal),
    year: asNumber(r.year),
    doi_url: asString(r.doi_url),
    url: asString(r.url),
    pubmed_id: asString(r.pubmed_id),
    category: asPublicationCategory(r.category ?? r.type),
    abstract: asString(r.abstract),
    is_corresponding: asBoolean(r.is_corresponding),
  }
}

export function mapConference(input: unknown): HBConference {
  const r = isRecord(input) ? input : {}
  return {
    id: asString(r.id),
    status: asStatus(r.status),
    sort: asNumber(r.sort, 0) ?? 0,
    title: asString(r.title),
    conference_name: asString(r.event_name) || asString(r.conference_name),
    type: asConferenceType(r.type),
    role: asString(r.role),
    date: asString(r.date) || null,
    year: asNumber(r.year),
    location: asString(r.location),
    topic: asString(r.topic),
    description: asString(r.description),
  }
}

export function mapCertification(input: unknown): HBCertification {
  const r = isRecord(input) ? input : {}
  return {
    id: asString(r.id),
    status: asStatus(r.status),
    sort: asNumber(r.sort, 0) ?? 0,
    name: asString(r.name),
    issuing_body: asString(r.issuing_body),
    year: asNumber(r.year),
    credential_id: asString(r.credential_id),
    url: asString(r.url),
  }
}

export function mapBlogPost(input: unknown): HBBlogPost {
  const r = isRecord(input) ? input : {}
  return {
    id: asString(r.id),
    status: asStatus(r.status),
    slug: asString(r.slug),
    title: asString(r.title),
    category: asBlogCategory(r.category),
    excerpt: asString(r.excerpt),
    body: asString(r.body),
    featured_image: asAssetId(r.featured_image),
    tags: asStringArray(r.tags),
    published_at: asString(r.published_at) || null,
    reading_time: asNumber(r.reading_time),
    seo_title: asString(r.seo_title),
    seo_description: asString(r.seo_description),
  }
}

export function mapContactSubmission(input: unknown): HBContactSubmission {
  const r = isRecord(input) ? input : {}
  return {
    id: asString(r.id),
    name: asString(r.name),
    email: asString(r.email),
    subject: asString(r.subject),
    message: asString(r.message),
  }
}

export function mapArray<T>(items: unknown, mapper: (item: unknown) => T): T[] {
  if (!Array.isArray(items)) return []
  return items.map(mapper)
}
