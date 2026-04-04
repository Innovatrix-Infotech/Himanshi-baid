export const CMS_TAGS = {
  site_config: 'hb_site_config',
  education: 'hb_education',
  experience: 'hb_experience',
  awards: 'hb_awards',
  publications: 'hb_publications',
  conferences: 'hb_conferences',
  certifications: 'hb_certifications',
  blogs: 'hb_blogs',
  contact_submissions: 'hb_contact_submissions',
  thesis: 'hb_thesis',
} as const

export type CmsTag = (typeof CMS_TAGS)[keyof typeof CMS_TAGS]
