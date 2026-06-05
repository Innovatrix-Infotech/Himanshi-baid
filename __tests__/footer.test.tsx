import { render, screen, within } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'
import type { HBSiteConfig } from '@/lib/cms/types'

const siteConfig: HBSiteConfig = {
  id: 1,
  site_title: 'Dr. Himanshi Baid',
  tagline: 'Emergency Medicine',
  bio: 'Assistant Professor, Emergency Medicine at MGMCH, Jaipur.',
  bio_short: 'Assistant Professor, Emergency Medicine at MGMCH, Jaipur.',
  bio_full: '',
  philosophy: '',
  profile_photo: null,
  cv_file: null,
  linkedin_url: 'https://linkedin.example/himanshi',
  email: 'doctor@example.com',
  google_scholar_url: 'https://scholar.example/himanshi',
  orcid_url: 'https://orcid.org/0000-0000',
  covid_section_content: '',
  seo_title: '',
  seo_description: '',
  og_image: null,
  footer_links: [
    { label: 'Teaching', href: '/teaching' },
    { label: 'Media', href: '/media' },
  ],
  smtp_host: '',
  smtp_port: null,
  smtp_secure: false,
  smtp_user: '',
  smtp_password: '',
  smtp_from_email: '',
  smtp_to_email: '',
}

describe('Footer', () => {
  it('renders main footer links from Directus site config', () => {
    render(<Footer siteConfig={siteConfig} />)

    const quickLinks = screen.getByRole('navigation', { name: 'Footer main links' })
    expect(within(quickLinks).getByRole('link', { name: 'Teaching' })).toHaveAttribute('href', '/teaching')
    expect(within(quickLinks).getByRole('link', { name: 'Media' })).toHaveAttribute('href', '/media')
    expect(within(quickLinks).queryByRole('link', { name: 'Publications' })).not.toBeInTheDocument()
  })

  it('uses Directus contact and profile URLs', () => {
    render(<Footer siteConfig={siteConfig} />)

    expect(screen.getAllByRole('link', { name: /email/i })[0]).toHaveAttribute('href', 'mailto:doctor@example.com')
    expect(screen.getByRole('link', { name: /LinkedIn Profile/i })).toHaveAttribute('href', 'https://linkedin.example/himanshi')
    expect(screen.getByRole('link', { name: /ORCID Profile/i })).toHaveAttribute('href', 'https://orcid.org/0000-0000')
  })
})
