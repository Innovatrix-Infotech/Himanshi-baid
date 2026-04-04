'use client'

import { CheckCircle, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const TEACHING_HIGHLIGHTS = [
  'Undergraduate and postgraduate teaching — lectures, bedside teaching, and simulation',
  'PG thesis co-guide for 4 MD Emergency Medicine students',
  'Board of Studies member and PG exit examination contributor',
  'Quizmaster at institutional, state, and national academic forums',
  'Faculty at simulation-based education workshops and conferences',
  'Internship supervisor and academic schedule planner',
]

export function TeachingSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Teaching
            </p>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
              Education & Mentorship
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-5">
          {/* Teaching highlights */}
          <div className="md:col-span-3">
            <ScrollReveal>
              <ul className="space-y-4">
                {TEACHING_HIGHLIGHTS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                    <span className="text-sm leading-relaxed text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Mentorship card */}
          <div className="md:col-span-2">
            <ScrollReveal staggerDelay={200}>
              <div className="rounded-2xl border border-border bg-background-alt p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light">
                  <Users className="h-7 w-7 text-accent" strokeWidth={1.5} />
                </div>
                <p className="text-4xl font-bold text-navy">4</p>
                <p className="mt-1 text-sm font-medium text-navy">
                  PG Thesis Students
                </p>
                <p className="mt-1 text-xs text-muted">
                  Supervised as Co-Guide
                </p>
                <div className="mx-auto mt-5 h-px w-12 bg-border" />
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Active involvement in simulation-based medical education, journal clubs, seminars, and academic audits.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
