import { render, screen } from '@testing-library/react'
import { PageWrapper } from '@/components/PageWrapper'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { HighlightsSection } from '@/components/sections/home/HighlightsSection'
import { PhilosophySection } from '@/components/sections/home/PhilosophySection'
import { LatestPostsSection } from '@/components/sections/home/LatestPostsSection'
import type { HBSiteConfig } from '@/lib/cms/types'

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

  it('renders photo placeholder when no profile photo', () => {
    renderWithWrapper(<HeroSection siteConfig={mockSiteConfig} />)
    expect(screen.getByText('Photo coming soon')).toBeInTheDocument()
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
