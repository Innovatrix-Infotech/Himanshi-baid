'use client'

import { Heart, ScanLine, FlaskConical, Ambulance, Wind, Activity } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { ReactNode } from 'react'

interface ExpertiseItem {
  icon: ReactNode
  title: string
  description: string
}

const EXPERTISE_AREAS: ExpertiseItem[] = [
  {
    icon: <Heart className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Emergency Resuscitation',
    description: 'ACLS, ATLS, and pediatric resuscitation protocols for cardiac, trauma, and medical emergencies.',
  },
  {
    icon: <ScanLine className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Point-of-Care Ultrasound',
    description: 'Basic to advanced POCUS applications for rapid bedside diagnosis and procedural guidance.',
  },
  {
    icon: <FlaskConical className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Emergency Toxicology',
    description: 'PDCC-trained expertise in poisoning management, antidote therapy, and toxicological emergencies.',
  },
  {
    icon: <Ambulance className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Trauma Management',
    description: 'Comprehensive management of medical, surgical, and pediatric trauma presentations.',
  },
  {
    icon: <Wind className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Airway Management',
    description: 'Difficult airway assessment, rapid sequence intubation, and advanced airway techniques.',
  },
  {
    icon: <Activity className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Critical Care',
    description: 'Emergency ICU care, hemodynamic monitoring, vascular access, and shock management.',
  },
]

export function ClinicalExpertiseSection() {
  return (
    <section className="bg-background-alt py-20 md:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Expertise
            </p>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
              Clinical Skills & Expertise
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE_AREAS.map((item, index) => (
            <ScrollReveal key={item.title} staggerDelay={index * 100}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
