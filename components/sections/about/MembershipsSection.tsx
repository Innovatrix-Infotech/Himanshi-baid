'use client'

import { Building2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface Membership {
  name: string
  abbreviation: string
}

const MEMBERSHIPS: Membership[] = [
  { name: 'Royal College of Emergency Medicine', abbreviation: 'RCEM (UK)' },
  { name: 'Emergency Medicine Association of India', abbreviation: 'EMAI' },
  { name: 'Academic Emergency Medicine Association', abbreviation: 'AEME' },
  { name: 'Pedistars', abbreviation: 'Pedistars' },
]

export function MembershipsSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Affiliations
            </p>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
              Professional Memberships
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {MEMBERSHIPS.map((membership, index) => (
            <ScrollReveal key={membership.abbreviation} staggerDelay={index * 100}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/5">
                  <Building2 className="h-5 w-5 text-navy-light" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{membership.abbreviation}</p>
                  <p className="mt-0.5 text-xs text-muted">{membership.name}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
