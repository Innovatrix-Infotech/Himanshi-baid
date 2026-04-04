'use client'

import { useMemo } from 'react'
import { marked } from 'marked'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const FALLBACK_BIO = `Emergency Medicine physician with strong academic orientation and over 3 years of post-MD experience in clinical care, teaching, research, and academic administration. Gold Medalist in MD Emergency Medicine (AIIMS Rishikesh) with national and international exposure, including MRCEM (UK) and PDCC in Toxicology.

Actively involved in undergraduate and postgraduate teaching, simulation-based education, quality improvement projects, and high-impact research with 14 indexed publications. Passionate about building structured emergency medicine training programs and mentoring future clinician-researchers.`

interface BioSectionProps {
  bioFull: string
}

export function BioSection({ bioFull }: BioSectionProps) {
  const content = bioFull || FALLBACK_BIO

  const html = useMemo(() => {
    return marked.parse(content, { async: false }) as string
  }, [content])

  return (
    <section className="bg-white py-10 md:py-14">
      <Container size="narrow">
        <ScrollReveal>
          <div
            className="prose prose-lg mx-auto max-w-none text-center text-muted prose-headings:font-serif prose-headings:text-navy prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ScrollReveal>
      </Container>
    </section>
  )
}
