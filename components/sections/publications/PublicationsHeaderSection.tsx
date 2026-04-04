'use client'

import { ExternalLink } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { HBSiteConfig } from '@/lib/cms/types'

interface PublicationsHeaderSectionProps {
  siteConfig: HBSiteConfig
}

export function PublicationsHeaderSection({ siteConfig }: PublicationsHeaderSectionProps) {
  return (
    <section className="bg-white pb-8 pt-32 md:pt-40">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Publications
            </p>
            <h1 className="font-serif text-4xl font-bold text-navy md:text-5xl">
              Research & Publications
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              14 PubMed-indexed publications spanning case reports, diagnostic validation studies,
              systematic reviews, and original research in emergency medicine.
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-accent" />

            {(siteConfig.google_scholar_url || siteConfig.orcid_url) && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {siteConfig.google_scholar_url && (
                  <a
                    href={siteConfig.google_scholar_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Google Scholar
                  </a>
                )}
                {siteConfig.orcid_url && (
                  <a
                    href={siteConfig.orcid_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                    ORCID
                  </a>
                )}
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
