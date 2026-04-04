export type HBStatus = 'published' | 'draft' | 'archived'
export type HBAwardCategory = 'gold_medal' | 'university_rank' | 'nomination' | 'other'
export type HBBlogCategory = 'education' | 'blog'
export type HBConferenceType = 'oral_presentation' | 'poster' | 'workshop_attended' | 'workshop_facilitated'
export type HBPublicationCategory = 'original_research' | 'case_report' | 'review' | 'letter'
export type HBExperienceType = 'academic' | 'clinical' | 'admin'

export interface HBSiteConfig {
  id: number
  site_title: string
  tagline: string
  bio: string
  bio_short: string
  bio_full: string
  philosophy: string
  profile_photo: string | null
  cv_file: string | null
  linkedin_url: string
  email: string
  google_scholar_url: string
  orcid_url: string
  covid_section_content: string
  seo_title: string
  seo_description: string
  og_image: string | null
}

export interface HBEducation {
  id: string
  status: HBStatus
  sort: number
  degree: string
  institution: string
  location: string
  start_year: number | null
  end_year: number | null
  thesis_title: string
  highlights: string[]
}

export interface HBExperience {
  id: string
  status: HBStatus
  sort: number
  title: string
  role: string
  organization: string
  institution: string
  department: string
  start_date: string | null
  end_date: string | null
  is_current: boolean
  type: HBExperienceType
  description: string
  is_covid_related: boolean
}

export interface HBAward {
  id: string
  status: HBStatus
  sort: number
  title: string
  category: HBAwardCategory
  awarding_body: string
  year: number | null
  description: string
}

export interface HBPublication {
  id: string
  status: HBStatus
  sort: number
  title: string
  authors: string
  journal: string
  year: number | null
  doi_url: string
  url: string
  pubmed_id: string
  category: HBPublicationCategory
  abstract: string
  is_corresponding: boolean
}

export interface HBConference {
  id: string
  status: HBStatus
  sort: number
  title: string
  conference_name: string
  type: HBConferenceType
  role: string
  date: string | null
  year: number | null
  location: string
  topic: string
  description: string
}

export interface HBCertification {
  id: string
  status: HBStatus
  sort: number
  name: string
  issuing_body: string
  year: number | null
  credential_id: string
  url: string
}

export interface HBBlogPost {
  id: string
  status: HBStatus
  slug: string
  title: string
  category: HBBlogCategory
  excerpt: string
  body: string
  featured_image: string | null
  tags: string[]
  published_at: string | null
  reading_time: number | null
  seo_title: string
  seo_description: string
}

export interface HBContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
}

export interface HBThesis {
  id: string
  sort: number
  student_name: string
  title: string
  status: string
}

export interface HBDirectusSchema {
  hb_site_config: HBSiteConfig
  hb_education: HBEducation[]
  hb_experience: HBExperience[]
  hb_awards: HBAward[]
  hb_publications: HBPublication[]
  hb_conferences: HBConference[]
  hb_certifications: HBCertification[]
  hb_blogs: HBBlogPost[]
  hb_contact_submissions: HBContactSubmission[]
  hb_thesis: HBThesis[]
}
