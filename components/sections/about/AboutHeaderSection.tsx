'use client'

import { Container } from '@/components/ui/Container'
import { useRevealReady } from '@/components/PageWrapper'
import { useEffect, useState } from 'react'

export function AboutHeaderSection() {
  const revealReady = useRevealReady()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (revealReady) {
      const t = setTimeout(() => setRevealed(true), 100)
      return () => clearTimeout(t)
    }
  }, [revealReady])

  const r = revealed ? 'revealed' : ''
  const d = (ms: number) => ({ animationDelay: `${ms}ms` })

  return (
    <section className="bg-white pb-4 pt-32 md:pt-40">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={`anim-fade-up mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent ${r}`}
            style={d(0)}
          >
            About
          </p>

          <h1
            className={`anim-fade-up font-serif text-4xl font-bold text-navy md:text-5xl ${r}`}
            style={d(100)}
          >
            Dr. Himanshi Baid
          </h1>

          <p
            className={`anim-fade-up mt-4 text-base text-muted md:text-lg ${r}`}
            style={d(200)}
          >
            MD Emergency Medicine &bull; MRCEM (UK) &bull; PDCC (Emergency Toxicology)
          </p>

          <p
            className={`anim-fade-up mt-2 text-sm text-muted/70 ${r}`}
            style={d(280)}
          >
            Assistant Professor, Emergency Medicine &mdash; HIMS, Swami Rama Himalayan University, Dehradun
          </p>

          <div
            className={`anim-fade-up mx-auto mt-6 h-[2px] w-12 bg-accent ${r}`}
            style={d(350)}
          />
        </div>
      </Container>
    </section>
  )
}
