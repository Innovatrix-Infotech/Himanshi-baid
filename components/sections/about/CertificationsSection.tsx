'use client'

import { BadgeCheck, Building2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { HBCertification } from '@/lib/cms/types'

const FALLBACK_CERTIFICATIONS: HBCertification[] = [
  {
    id: 'fallback-1',
    status: 'published',
    sort: 1,
    name: 'BLS & ACLS',
    issuing_body: 'American Heart Association',
    year: null,
    credential_id: '',
    url: '',
  },
  {
    id: 'fallback-2',
    status: 'published',
    sort: 2,
    name: 'ATLS',
    issuing_body: 'American College of Surgeons',
    year: null,
    credential_id: '',
    url: '',
  },
  {
    id: 'fallback-3',
    status: 'published',
    sort: 3,
    name: 'BCME & CISP',
    issuing_body: 'National Medical Commission',
    year: null,
    credential_id: '',
    url: '',
  },
  {
    id: 'fallback-4',
    status: 'published',
    sort: 4,
    name: 'Simulation-Based Medical Education',
    issuing_body: 'Pedistars FDP Level 1',
    year: null,
    credential_id: '',
    url: '',
  },
  {
    id: 'fallback-5',
    status: 'published',
    sort: 5,
    name: 'E-Content Development',
    issuing_body: 'Certified Programme',
    year: null,
    credential_id: '',
    url: '',
  },
]

interface Membership {
  name: string
  abbreviation: string
}

const MEMBERSHIPS: Membership[] = [
  { name: 'Royal College of Emergency Medicine', abbreviation: 'RCEM (UK)' },
  { name: 'Academic Emergency Medicine Association', abbreviation: 'AEME' },
  { name: 'Emergency Medicine Association', abbreviation: 'EMA' },
  { name: 'Pedistars', abbreviation: 'Pedistars' },
]

interface CertificationsSectionProps {
  certifications: HBCertification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const displayCerts = certifications.length > 0 ? certifications : FALLBACK_CERTIFICATIONS

  return (
    <section className="bg-background-alt py-20 md:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Credentials
            </p>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
              Certifications & Affiliations
            </h2>
          </div>
        </ScrollReveal>

        {/* Certifications — compact rows */}
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              {displayCerts.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`flex items-center gap-4 px-6 py-4 transition-colors hover:bg-background-alt/50 ${
                    index < displayCerts.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light">
                    <BadgeCheck className="h-4.5 w-4.5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy">{cert.name}</p>
                    <p className="text-xs text-muted">{cert.issuing_body}</p>
                  </div>
                  {cert.year && (
                    <span className="shrink-0 rounded-full bg-background-alt px-2.5 py-0.5 text-[11px] font-medium text-muted">
                      {cert.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Memberships — inline tags */}
        <div className="mx-auto mt-12 max-w-4xl">
          <ScrollReveal>
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Professional Memberships
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {MEMBERSHIPS.map((m) => (
                <div
                  key={m.abbreviation}
                  className="flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Building2 className="h-4 w-4 text-navy-light" strokeWidth={1.5} />
                  <div>
                    <span className="text-sm font-semibold text-navy">{m.abbreviation}</span>
                    {m.abbreviation !== m.name && (
                      <span className="ml-1.5 text-xs text-muted">{m.name}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
