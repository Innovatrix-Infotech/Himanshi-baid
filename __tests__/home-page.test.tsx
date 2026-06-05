import { render, screen } from '@testing-library/react'
import { PageWrapper } from '@/components/PageWrapper'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { HighlightsSection } from '@/components/sections/home/HighlightsSection'
import { JourneySection } from '@/components/sections/home/JourneySection'
import { PhilosophySection } from '@/components/sections/home/PhilosophySection'
import { LatestPostsSection } from '@/components/sections/home/LatestPostsSection'
import { AboutHeaderSection } from '@/components/sections/about/AboutHeaderSection'
import type { HBSiteConfig, HBExperience } from '@/lib/cms/types'

function renderWithWrapper(ui: React.ReactElement) {
  return render(<PageWrapper>{ui}</PageWrapper>)
}

const mockSiteConfig: HBSiteConfig = {
  id: 1,
  site_title: 'Dr. Himanshi Baid',
  tagline: 'Where Critical Care Meets Academic Rigour',
  bio: '',
  bio_short: 'A dedicated emergency physician.',
  bio_full: '',
  philosophy: 'Education must be accessible to all.',
  profile_photo: null,
  cv_file: null,
  linkedin_url: '',
  email: 'test@example.com',
  google_scholar_url: '',
  orcid_url: '',
  covid_section_content: '',
  seo_title: '',
  seo_description: '',
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

describe('HeroSection', () => {
  it('renders the site title', () => {
    renderWithWrapper(<HeroSection siteConfig={mockSiteConfig} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dr. Himanshi Baid')
  })

  it('renders the tagline', () => {
    renderWithWrapper(<HeroSection siteConfig={mockSiteConfig} />)
    expect(screen.getByText(/Where Critical Care/)).toBeInTheDocument()
  })

  it('renders CTA links', () => {
    renderWithWrapper(<HeroSection siteConfig={mockSiteConfig} />)
    expect(screen.getByRole('link', { name: /View CV/i })).toHaveAttribute('href', '/cv')
    expect(screen.getByRole('link', { name: 'Read Blog' })).toHaveAttribute('href', '/blog')
  })

  it('uses the local profile photo when no CMS photo is configured', () => {
    renderWithWrapper(<HeroSection siteConfig={mockSiteConfig} />)
    const image = screen.getByAltText('Dr. Himanshi Baid')
    expect(image).toHaveAttribute('src', expect.stringContaining('1.jpeg'))
    expect(screen.queryByText('Photo coming soon')).not.toBeInTheDocument()
  })

  it('renders updated credentials and current institution context', () => {
    renderWithWrapper(<HeroSection siteConfig={mockSiteConfig} />)
    expect(screen.getByText(/MRCEM \(UK\)/)).toBeInTheDocument()
    expect(screen.getByText('MGMCH, Jaipur')).toBeInTheDocument()
  })
})

describe('AboutHeaderSection', () => {
  it('renders the current MGMCH appointment', () => {
    renderWithWrapper(<AboutHeaderSection />)
    expect(
      screen.getByText(/Mahatma Gandhi Medical College and Hospital, Jaipur/),
    ).toBeInTheDocument()
  })
})

describe('HighlightsSection', () => {
  const stats = [
    { label: 'Publications', value: '10' },
    { label: 'Gold Medals', value: '3' },
    { label: 'Conferences', value: '15' },
    { label: 'Training', value: 'AIIMS' },
  ]

  it('renders all stat card labels', () => {
    render(<HighlightsSection stats={stats} />)
    expect(screen.getByText('Publications')).toBeInTheDocument()
    expect(screen.getByText('Gold Medals')).toBeInTheDocument()
    expect(screen.getByText('Conferences')).toBeInTheDocument()
    expect(screen.getByText('Training')).toBeInTheDocument()
  })
})

describe('JourneySection', () => {
  it('keeps education fallback entries when CMS only has experience', () => {
    const experience: HBExperience[] = [
      {
        id: 'current-role',
        status: 'published',
        sort: 1,
        title: '',
        role: 'Assistant Professor - Emergency Medicine',
        organization: 'Mahatma Gandhi Medical College and Hospital, Jaipur',
        institution: 'Mahatma Gandhi Medical College and Hospital, Jaipur',
        department: '',
        start_date: '2026-05-14',
        end_date: null,
        is_current: true,
        type: 'academic',
        description: '',
        is_covid_related: false,
      },
    ]

    render(<JourneySection education={[]} experience={experience} />)
    expect(screen.getAllByText('MBBS').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mahatma Gandhi Medical College and Hospital, Jaipur').length).toBeGreaterThan(0)
  })
})

describe('PhilosophySection', () => {
  it('renders philosophy text', () => {
    render(<PhilosophySection philosophy='Education must be accessible to all.' />)
    expect(screen.getByText('Education must be accessible to all.')).toBeInTheDocument()
  })

  it('renders nothing when philosophy is empty', () => {
    const { container } = render(<PhilosophySection philosophy='' />)
    expect(container.innerHTML).toBe('')
  })
})

describe('LatestPostsSection', () => {
  it('renders fallback posts when no CMS posts provided', () => {
    render(<LatestPostsSection educationPosts={[]} blogPosts={[]} />)
    expect(screen.getByText('Point-of-Care Ultrasound: Transforming Emergency Diagnosis')).toBeInTheDocument()
  })

  it('renders section heading', () => {
    render(<LatestPostsSection educationPosts={[]} blogPosts={[]} />)
    expect(screen.getByText('Latest Writing')).toBeInTheDocument()
  })
})
