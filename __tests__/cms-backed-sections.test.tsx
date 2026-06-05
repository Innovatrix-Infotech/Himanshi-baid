import { render, screen } from '@testing-library/react'
import { AwardsSection } from '@/components/sections/home/AwardsSection'
import { CertificationsSection } from '@/components/sections/about/CertificationsSection'
import { TeachingSection } from '@/components/sections/about/TeachingSection'
import { ConferencesListSection } from '@/components/sections/conferences/ConferencesListSection'
import type { HBThesis } from '@/lib/cms/types'

describe('CMS-backed academic sections', () => {
  it('renders empty CMS awards as an empty state instead of embedded production awards', () => {
    render(<AwardsSection awards={[]} />)

    expect(screen.getByText(/Awards will appear here once they are published/i)).toBeInTheDocument()
    expect(screen.queryByText('MD Gold Medal')).not.toBeInTheDocument()
  })

  it('renders empty CMS certifications as an empty state instead of embedded production certifications', () => {
    render(<CertificationsSection certifications={[]} />)

    expect(screen.getByText(/Certifications will appear here once they are published/i)).toBeInTheDocument()
    expect(screen.queryByText('BLS & ACLS')).not.toBeInTheDocument()
  })

  it('renders empty CMS conferences as an empty state instead of embedded production conferences', () => {
    render(<ConferencesListSection conferences={[]} />)

    expect(screen.getByText(/Conferences will appear here once they are published/i)).toBeInTheDocument()
    expect(screen.queryByText('AEMECON 2026')).not.toBeInTheDocument()
  })

  it('renders thesis supervision records from Directus data', () => {
    const thesis: HBThesis[] = [
      {
        id: 'thesis-1',
        sort: 1,
        student_name: 'Dr. A. Resident',
        title: 'Clinical profile and predictors of outcomes in acute abdomen',
        status: 'completed',
      },
      {
        id: 'thesis-2',
        sort: 2,
        student_name: 'Dr. B. Resident',
        title: 'Emergency department toxicology outcomes',
        status: 'ongoing',
      },
    ]

    render(<TeachingSection thesis={thesis} />)

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Clinical profile and predictors of outcomes in acute abdomen')).toBeInTheDocument()
    expect(screen.getByText('Dr. B. Resident')).toBeInTheDocument()
  })
})
