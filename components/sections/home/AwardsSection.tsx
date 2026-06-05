'use client'

import { Medal, Award, Star } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { HBAward, HBAwardCategory } from '@/lib/cms/types'

function getCategoryStyles(category: HBAwardCategory) {
  switch (category) {
    case 'gold_medal':
      return {
        icon: Medal,
        iconBg: 'bg-gold/10',
        iconColor: 'text-gold',
        borderColor: 'border-l-gold',
      }
    case 'nomination':
    case 'university_rank':
      return {
        icon: Award,
        iconBg: 'bg-accent-light',
        iconColor: 'text-accent',
        borderColor: 'border-l-accent',
      }
    default:
      return {
        icon: Star,
        iconBg: 'bg-navy/5',
        iconColor: 'text-navy-light',
        borderColor: 'border-l-navy-light',
      }
  }
}

interface AwardsSectionProps {
  awards: HBAward[]
}

export function AwardsSection({ awards }: AwardsSectionProps) {
  return (
    <section className="bg-background-alt py-20 md:py-24">
      <Container>
        {/* Header */}
        <ScrollReveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Recognition
            </p>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
              Awards & Honours
            </h2>
          </div>
        </ScrollReveal>

        {awards.length === 0 && (
          <ScrollReveal>
            <div className="mx-auto max-w-2xl rounded-lg border border-dashed border-border bg-white px-6 py-8 text-center">
              <p className="text-sm font-medium text-navy">
                Awards will appear here once they are published in Directus.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Grid — equal-height cards */}
        {awards.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, index) => {
            const { icon: Icon, iconBg, iconColor, borderColor } = getCategoryStyles(award.category)

            return (
              <ScrollReveal key={award.id} staggerDelay={index * 100}>
                <div
                  className={`group flex h-full flex-col rounded-2xl border border-border border-l-4 ${borderColor} bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} transition-colors duration-300`}
                    >
                      <Icon className={`h-5 w-5 ${iconColor}`} />
                    </div>
                    {award.year && (
                      <span className="rounded-full bg-background-alt px-2.5 py-0.5 text-xs font-medium text-muted">
                        {award.year}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-navy">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {award.awarding_body}
                  </p>
                  {award.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted/70">
                      {award.description}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
