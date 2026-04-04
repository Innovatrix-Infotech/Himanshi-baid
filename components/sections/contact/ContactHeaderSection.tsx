'use client'

import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ContactHeaderSection() {
  return (
    <section className="bg-white pb-8 pt-32 md:pt-40">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl font-bold text-navy md:text-5xl">
              Contact
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Open to academic collaborations, speaking invitations, research
              partnerships, and opportunities in emergency medicine education.
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-accent" />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
