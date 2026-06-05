import { mapConference, mapPublication, mapSiteConfig, mapThesis } from '@/lib/cms/mappers'

describe('CMS mappers', () => {
  it('uses bio as the short and full biography fallback', () => {
    const config = mapSiteConfig({
      id: 1,
      bio: 'Emergency Medicine physician and academic faculty.',
    })

    expect(config.bio_short).toBe('Emergency Medicine physician and academic faculty.')
    expect(config.bio_full).toBe('Emergency Medicine physician and academic faculty.')
    expect(config.footer_links).toEqual([])
  })

  it('maps Directus footer links and SMTP settings from site config', () => {
    const config = mapSiteConfig({
      id: 1,
      footer_links: [
        { label: 'Teaching', href: '/teaching' },
        { label: '', href: '/empty-label' },
        { label: 'Empty URL', href: '' },
      ],
      smtp_host: 'smtp.example.com',
      smtp_port: '587',
      smtp_secure: true,
      smtp_user: 'doctor@example.com',
      smtp_password: 'app-password',
      smtp_from_email: 'doctor@example.com',
      smtp_to_email: 'contact@example.com',
    })

    expect(config.footer_links).toEqual([{ label: 'Teaching', href: '/teaching' }])
    expect(config.smtp_host).toBe('smtp.example.com')
    expect(config.smtp_port).toBe(587)
    expect(config.smtp_secure).toBe(true)
    expect(config.smtp_user).toBe('doctor@example.com')
    expect(config.smtp_password).toBe('app-password')
    expect(config.smtp_from_email).toBe('doctor@example.com')
    expect(config.smtp_to_email).toBe('contact@example.com')
  })

  it('maps Directus study publications to original research', () => {
    const publication = mapPublication({
      id: 'pub-1',
      title: 'Prospective cohort study',
      type: 'study',
    })

    expect(publication.category).toBe('original_research')
  })

  it('derives conference year from date when no explicit year exists', () => {
    const conference = mapConference({
      id: 'conf-1',
      title: 'Emergency Medicine Faculty Talk',
      date: '2026-05-14',
    })

    expect(conference.year).toBe(2026)
  })

  it('maps thesis supervision records from Directus', () => {
    const thesis = mapThesis({
      id: 'thesis-1',
      sort: '2',
      student_name: 'Dr. A. Resident',
      title: 'Clinical profile and predictors of outcomes in acute abdomen',
      status: 'completed',
    })

    expect(thesis).toEqual({
      id: 'thesis-1',
      sort: 2,
      student_name: 'Dr. A. Resident',
      title: 'Clinical profile and predictors of outcomes in acute abdomen',
      status: 'completed',
    })
  })
})
