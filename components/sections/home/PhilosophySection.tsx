'use client'

import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Quote } from 'lucide-react'

interface PhilosophySectionProps { philosophy: string }

export function PhilosophySection({ philosophy }: PhilosophySectionProps) {
  if (!philosophy) return null

  return (
    <section className='bg-navy py-24'>
      <Container size='narrow'>
        <ScrollReveal>
          <blockquote className='text-center'>
            <Quote className='mx-auto h-10 w-10 text-accent' strokeWidth={1.5} />
            <p className='mt-6 font-serif text-2xl font-light italic leading-relaxed text-white md:text-3xl'>
              {philosophy}
            </p>
            <div className='mx-auto mt-8 h-[2px] w-12 bg-accent' />
            <footer className='mt-4'>
              <p className='text-sm font-semibold text-white'>Dr. Himanshi Baid</p>
              <p className='text-xs text-white/50'>MD Emergency Medicine</p>
            </footer>
          </blockquote>
        </ScrollReveal>
      </Container>
    </section>
  )
}
