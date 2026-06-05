'use client'

import { GraduationCap, Stethoscope } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { HBEducation, HBExperience } from '@/lib/cms/types'

interface TimelineItem {
  year: number
  type: 'education' | 'experience'
  title: string
  institution: string
  highlight?: string
  isCurrent?: boolean
}

const FALLBACK_TIMELINE: TimelineItem[] = [
  {
    year: 2017,
    type: 'education',
    title: 'MBBS',
    institution: 'Murshidabad Medical College & Hospital, WBUHS',
    highlight: 'Best Student of Batch',
  },
  {
    year: 2021,
    type: 'education',
    title: 'MD Emergency Medicine',
    institution: 'AIIMS Rishikesh',
    highlight: 'Gold Medalist — 1st Rank',
  },
  {
    year: 2022,
    type: 'experience',
    title: 'Senior Resident, Emergency Medicine',
    institution: 'AIIMS Rishikesh',
  },
  {
    year: 2023,
    type: 'education',
    title: 'PDCC (Emergency Toxicology)',
    institution: 'AIIMS Rishikesh',
  },
  {
    year: 2023,
    type: 'experience',
    title: 'Assistant Professor, Emergency Medicine',
    institution: 'Himalayan Institute of Medical Sciences, Swami Rama Himalayan University, Dehradun',
  },
  {
    year: 2025,
    type: 'education',
    title: 'MRCEM (UK)',
    institution: 'Royal College of Emergency Medicine, London',
  },
  {
    year: 2026,
    type: 'experience',
    title: 'Assistant Professor, Emergency Medicine',
    institution: 'Mahatma Gandhi Medical College and Hospital, Jaipur',
    isCurrent: true,
  },
]

function buildTimeline(
  education: HBEducation[],
  experience: HBExperience[],
): TimelineItem[] {
  if (education.length === 0 && experience.length === 0) {
    return FALLBACK_TIMELINE
  }

  const items: TimelineItem[] = [
    ...(education.length === 0 ? FALLBACK_TIMELINE.filter((item) => item.type === 'education') : []),
    ...(experience.length === 0 ? FALLBACK_TIMELINE.filter((item) => item.type === 'experience') : []),
  ]

  for (const edu of education) {
    items.push({
      year: edu.end_year ?? edu.start_year ?? 0,
      type: 'education',
      title: edu.degree,
      institution: edu.institution,
      highlight: edu.highlights.length > 0 ? edu.highlights[0] : undefined,
    })
  }

  for (const exp of experience) {
    const yearStr = exp.start_date?.slice(0, 4)
    const year = yearStr ? Number(yearStr) : 0
    items.push({
      year,
      type: 'experience',
      title: exp.role || exp.title,
      institution: exp.organization || exp.institution,
      isCurrent: exp.is_current || !exp.end_date,
    })
  }

  items.sort((a, b) => a.year - b.year)
  return items
}

interface JourneySectionProps {
  education: HBEducation[]
  experience: HBExperience[]
}

export function JourneySection({ education, experience }: JourneySectionProps) {
  const timeline = buildTimeline(education, experience)

  return (
    <section className="bg-white py-20 md:py-24">
      <Container>
        {/* Header */}
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Journey
            </p>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
              Education & Career
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Center line — desktop only */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block md:-translate-x-px" />
          {/* Left line — mobile only */}
          <div className="absolute left-4 top-0 block h-full w-px bg-border md:hidden" />

          <div className="space-y-10 md:space-y-14">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0
              const Icon = item.type === 'education' ? GraduationCap : Stethoscope
              const dotColor = item.type === 'education' ? 'bg-accent' : 'bg-navy'

              return (
                <ScrollReveal key={`${item.year}-${item.title}`} staggerDelay={index * 120}>
                  <div className="relative flex items-start md:items-center">
                    {/* Mobile layout — always left-aligned */}
                    <div className="flex w-full md:hidden">
                      {/* Dot + year on the line */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white shadow-md ${dotColor}`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        {item.isCurrent && (
                          <span className="mt-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                        )}
                      </div>

                      {/* Card */}
                      <div className="ml-5 flex-1">
                        <span className="mb-2 inline-block rounded-full bg-background-alt px-2.5 py-0.5 text-xs font-semibold text-muted">
                          {item.year}
                        </span>
                        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                          <h3 className="text-base font-semibold text-navy">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            {item.institution}
                          </p>
                          {item.highlight && (
                            <span className="mt-2 inline-block rounded-full border border-gold/20 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold">
                              {item.highlight}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop layout — alternating */}
                    <div className="hidden w-full md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
                      {/* Left content or spacer */}
                      <div className={`flex ${isLeft ? 'justify-end' : ''}`}>
                        {isLeft ? (
                          <div className="max-w-sm text-right">
                            <span className="mb-2 inline-block rounded-full bg-background-alt px-2.5 py-0.5 text-xs font-semibold text-muted">
                              {item.year}
                            </span>
                            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                              <h3 className="text-base font-semibold text-navy">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-muted">
                                {item.institution}
                              </p>
                              {item.highlight && (
                                <span className="mt-2 inline-block rounded-full border border-gold/20 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold">
                                  {item.highlight}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white shadow-md ${dotColor}`}
                        >
                          <Icon className="h-4.5 w-4.5 text-white" />
                        </div>
                        {item.isCurrent && (
                          <span className="mt-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                        )}
                      </div>

                      {/* Right content or spacer */}
                      <div className={`flex ${!isLeft ? 'justify-start' : ''}`}>
                        {!isLeft ? (
                          <div className="max-w-sm">
                            <span className="mb-2 inline-block rounded-full bg-background-alt px-2.5 py-0.5 text-xs font-semibold text-muted">
                              {item.year}
                            </span>
                            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                              <h3 className="text-base font-semibold text-navy">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-muted">
                                {item.institution}
                              </p>
                              {item.highlight && (
                                <span className="mt-2 inline-block rounded-full border border-gold/20 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold">
                                  {item.highlight}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
