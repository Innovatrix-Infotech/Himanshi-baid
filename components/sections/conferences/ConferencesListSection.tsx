'use client'

import { Calendar, MapPin, Mic2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { HBConference, HBConferenceType } from '@/lib/cms/types'

const TYPE_LABELS: Record<HBConferenceType, string> = {
  oral_presentation: 'Oral Presentation',
  poster: 'Poster Presentation',
  workshop_attended: 'Workshop',
  workshop_facilitated: 'Workshop (Faculty)',
}

function getRoleBadgeColor(role: string): string {
  const lower = role.toLowerCase()
  if (lower.includes('faculty') || lower.includes('speaker') || lower.includes('resource'))
    return 'bg-accent-light text-accent'
  if (lower.includes('judge'))
    return 'bg-gold/10 text-gold'
  if (lower.includes('present'))
    return 'bg-navy/10 text-navy'
  if (lower.includes('organis') || lower.includes('committee'))
    return 'bg-green-50 text-green-700'
  if (lower.includes('quiz'))
    return 'bg-purple-50 text-purple-700'
  return 'bg-background-alt text-muted'
}

function formatDate(date: string | null, year: number | null): string {
  if (date) {
    const parsed = new Date(date)
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }
  }
  return year ? String(year) : ''
}

function extractYear(value: string | null | undefined): number | null {
  const match = value?.match(/\b(?:19|20)\d{2}\b/)
  return match ? Number(match[0]) : null
}

function getConferenceYear(conf: HBConference): number {
  if (conf.year) return conf.year

  const dateYear = extractYear(conf.date)
  if (dateYear) return dateYear

  const textYear = [
    conf.conference_name,
    conf.title,
    conf.topic,
    conf.description,
  ].map(extractYear).find((year): year is number => year !== null)

  return textYear ?? 0
}

function groupByYear(conferences: HBConference[]): Map<number, HBConference[]> {
  const groups = new Map<number, HBConference[]>()
  for (const conf of conferences) {
    const yr = getConferenceYear(conf)
    const group = groups.get(yr) ?? []
    group.push(conf)
    groups.set(yr, group)
  }
  return new Map([...groups.entries()].sort((a, b) => a[0] - b[0]))
}

interface ConferencesListSectionProps {
  conferences: HBConference[]
}

export function ConferencesListSection({ conferences }: ConferencesListSectionProps) {
  const grouped = groupByYear(conferences)

  const totalCount = conferences.length
  const uniqueRoles = new Set(conferences.map((c) => c.role).filter(Boolean)).size
  const years = conferences.map(getConferenceYear).filter((year) => year !== 0)
  const yearRange = years.length > 0
    ? `${Math.min(...years)}–${Math.max(...years)}`
    : '—'

  return (
    <section className="bg-background-alt py-16 md:py-20">
      <Container>
        {/* Stats strip */}
        <ScrollReveal>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light">
                <Mic2 className="h-4 w-4 text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-lg font-bold text-navy">{totalCount}</p>
                <p className="text-[11px] text-muted">Conferences</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-navy">{uniqueRoles}</p>
              <p className="text-[11px] text-muted">Distinct Roles</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-navy">{yearRange}</p>
              <p className="text-[11px] text-muted">Year Range</p>
            </div>
          </div>
        </ScrollReveal>

        {conferences.length === 0 && (
          <ScrollReveal>
            <div className="mx-auto max-w-2xl rounded-lg border border-dashed border-border bg-white px-6 py-8 text-center">
              <p className="text-sm font-medium text-navy">
                Conferences will appear here once they are published in Directus.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Year-grouped sections */}
        {conferences.length > 0 && (
          <div className="mx-auto max-w-5xl space-y-12">
            {[...grouped.entries()].map(([year, items], yearIndex) => (
            <ScrollReveal key={year} staggerDelay={yearIndex * 80}>
              <div
                data-testid={`conference-year-group-${year}`}
                className="relative md:grid md:grid-cols-[5rem_minmax(0,1fr)] md:items-start md:gap-6"
              >
                <div className="relative flex items-center gap-3 md:block md:h-full">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-xl font-bold text-white shadow-lg ring-8 ring-background-alt">
                    {year || '—'}
                  </div>
                  <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent md:mt-4 md:inline-flex">
                    {items.length} {items.length === 1 ? 'event' : 'events'}
                  </span>
                  <div className="absolute left-8 top-16 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-navy/10 md:block" />
                </div>

                {/* Conference rows — compact table-like layout */}
                <div className="mt-5 border-l-2 border-navy/10 pl-6 md:mt-0 md:border-l-0 md:pl-0">
                  {items.map((conf, i) => (
                    <div
                      key={conf.id}
                      className={`relative rounded-lg py-4 md:px-5 ${
                        i < items.length - 1 ? 'border-b border-border/50' : ''
                      }`}
                    >
                      {/* Connector dot on the left border */}
                      <div className="absolute -left-[31px] top-6 h-2.5 w-2.5 rounded-full border-2 border-navy/20 bg-white md:hidden" />

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                        {/* Left: date column */}
                        <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted/70 sm:w-28 sm:pt-0.5">
                          <Calendar className="h-3 w-3" strokeWidth={1.5} />
                          {formatDate(conf.date, conf.year ?? year)}
                        </div>

                        {/* Center: main content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-navy">
                              {conf.conference_name}
                            </h3>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${getRoleBadgeColor(conf.role)}`}
                            >
                              {conf.role}
                            </span>
                          </div>

                          {(conf.title || conf.topic) && conf.title !== conf.conference_name && (
                            <p className="mt-0.5 text-xs text-muted">
                              {conf.title || conf.topic}
                            </p>
                          )}

                          <div className="mt-1.5 flex flex-wrap items-center gap-3">
                            {conf.location && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-muted/60">
                                <MapPin className="h-2.5 w-2.5" strokeWidth={1.5} />
                                {conf.location}
                              </span>
                            )}
                            <span className="rounded bg-background-alt px-1.5 py-0.5 text-[10px] font-medium text-muted">
                              {TYPE_LABELS[conf.type] ?? conf.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
