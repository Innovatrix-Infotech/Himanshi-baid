import { render, screen } from '@testing-library/react'
import { ConferencesListSection } from '@/components/sections/conferences/ConferencesListSection'
import type { HBConference } from '@/lib/cms/types'

const conferences: HBConference[] = [
  {
    id: 'conf-1',
    status: 'published',
    sort: 1,
    title: 'Point-of-care ultrasound',
    conference_name: 'EmergeUK 2025',
    type: 'oral_presentation',
    role: 'Faculty',
    date: '2025-09-27',
    year: 2025,
    location: 'Dehradun',
    topic: 'Ultrasound',
    description: '',
  },
  {
    id: 'conf-2',
    status: 'published',
    sort: 2,
    title: 'Early emergency care',
    conference_name: 'Emergency Medicine Update 2023',
    type: 'workshop_facilitated',
    role: 'Workshop Faculty',
    date: '2023-05-01',
    year: 2023,
    location: 'Rishikesh',
    topic: 'Emergency Medicine',
    description: '',
  },
  {
    id: 'conf-3',
    status: 'published',
    sort: 3,
    title: 'Emergency systems',
    conference_name: 'Emergency Medicine Update 2024',
    type: 'oral_presentation',
    role: 'Speaker',
    date: null,
    year: null,
    location: 'Delhi',
    topic: 'Emergency Medicine',
    description: '',
  },
]

describe('ConferencesListSection', () => {
  it('left aligns each year timeline group on desktop', () => {
    render(<ConferencesListSection conferences={conferences} />)

    const yearGroup = screen.getByTestId('conference-year-group-2025')
    expect(yearGroup).toHaveClass('md:grid-cols-[5rem_minmax(0,1fr)]')
    expect(yearGroup).toHaveClass('md:items-start')
  })

  it('renders conference years from earliest to latest', () => {
    render(<ConferencesListSection conferences={conferences} />)

    const year2023 = screen.getByTestId('conference-year-group-2023')
    const year2024 = screen.getByTestId('conference-year-group-2024')
    const year2025 = screen.getByTestId('conference-year-group-2025')

    expect(year2023.compareDocumentPosition(year2024)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(year2024.compareDocumentPosition(year2025)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })
})
