'use client'

import { BookOpen, ScanLine, HeartPulse, Activity, Monitor, FlaskConical } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { ReactNode } from 'react'

interface ResearchArea {
  icon: ReactNode
  title: string
  description: string
}

const RESEARCH_AREAS: ResearchArea[] = [
  {
    icon: <BookOpen className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Emergency Medicine Education',
    description: 'MD/DNB training curriculum design, assessment methods, and faculty development',
  },
  {
    icon: <ScanLine className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Point-of-Care Ultrasound',
    description: 'Diagnostic accuracy studies and novel POCUS applications in the ED',
  },
  {
    icon: <HeartPulse className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Resuscitation Science',
    description: 'Cardiac, trauma, and pediatric resuscitation protocols and outcomes',
  },
  {
    icon: <Activity className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Hemodynamic Monitoring',
    description: 'Bedside assessment of shock and fluid responsiveness in emergencies',
  },
  {
    icon: <Monitor className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Simulation-Based Education',
    description: 'High-fidelity simulation for skill acquisition and competency assessment',
  },
  {
    icon: <FlaskConical className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Emergency Toxicology',
    description: 'Poisoning patterns, antidote protocols, and toxicological case series',
  },
]

export function ResearchInterestsSection() {
  return (
    <section className="bg-navy py-20 md:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Research
            </p>
            <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
              Core Academic Interests
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_AREAS.map((area, index) => (
            <ScrollReveal key={area.title} staggerDelay={index * 80}>
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  {area.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {area.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                  {area.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
