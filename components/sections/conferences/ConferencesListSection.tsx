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

function groupByYear(conferences: HBConference[]): Map<number, HBConference[]> {
  const groups = new Map<number, HBConference[]>()
  for (const conf of conferences) {
    const yr = conf.year ?? 0
    const group = groups.get(yr) ?? []
    group.push(conf)
    groups.set(yr, group)
  }
  return new Map([...groups.entries()].sort((a, b) => b[0] - a[0]))
}

const FALLBACK_CONFERENCES: HBConference[] = [
  {
    id: 'fallback-1', status: 'published', sort: 1,
    title: 'Beyond Medical Management — Communication in Crisis',
    conference_name: 'AEMECON 2026', type: 'oral_presentation',
    role: 'Faculty, BREM', date: '2026-03-14', year: 2026,
    location: 'Kozhikode', topic: 'Communication in Crisis', description: '',
  },
  {
    id: 'fallback-2', status: 'published', sort: 2,
    title: 'Toxicology & Trauma Case Presentation',
    conference_name: 'AEMECON 2026', type: 'oral_presentation',
    role: 'Judge', date: '2026-03-14', year: 2026,
    location: 'Kozhikode', topic: 'Toxicology and Trauma', description: '',
  },
  {
    id: 'fallback-3', status: 'published', sort: 3,
    title: 'Clinical profile and predictors of outcomes in acute abdomen',
    conference_name: 'EM Pulse 2026', type: 'oral_presentation',
    role: 'Paper Presenter', date: '2026-03-07', year: 2026,
    location: '', topic: 'Acute Abdomen', description: '',
  },
  {
    id: 'fallback-4', status: 'published', sort: 4,
    title: 'Ultrasound Unlimited',
    conference_name: 'EmergeUK 2025 — Chaos to Care CME', type: 'oral_presentation',
    role: 'Faculty', date: '2025-09-27', year: 2025,
    location: 'Max Hospitals, Dehradun', topic: 'Ultrasound', description: '',
  },
  {
    id: 'fallback-5', status: 'published', sort: 5,
    title: 'EM Parv 2025',
    conference_name: 'EM Parv 2025', type: 'oral_presentation',
    role: 'Conference Faculty', date: '2025-07-28', year: 2025,
    location: 'AIIMS Rishikesh', topic: '', description: '',
  },
  {
    id: 'fallback-6', status: 'published', sort: 6,
    title: 'Hemodynamic Monitoring',
    conference_name: 'InnovatEM Workshop, EM Parv 2025', type: 'workshop_facilitated',
    role: 'Workshop Faculty', date: '2025-07-28', year: 2025,
    location: 'AIIMS Rishikesh', topic: 'Hemodynamic Monitoring', description: '',
  },
  {
    id: 'fallback-7', status: 'published', sort: 7,
    title: 'Emergency Medicine Exam Talk Series (MD/DNB)',
    conference_name: 'EM Exam Talk Series', type: 'oral_presentation',
    role: 'Faculty', date: '2025-08-11', year: 2025,
    location: 'RML Institute, Lucknow', topic: 'MD/DNB Exam Preparation', description: '',
  },
  {
    id: 'fallback-8', status: 'published', sort: 8,
    title: 'SIMULUS 10 — International Conference on Simulation',
    conference_name: 'SIMULUS 10', type: 'workshop_facilitated',
    role: 'Faculty & Organising Committee', date: '2025-10-04', year: 2025,
    location: 'HIMS, SRHU', topic: 'Simulation-Based Education', description: '',
  },
  {
    id: 'fallback-9', status: 'published', sort: 9,
    title: 'Point-of-Care Ultrasound (Basic & Advanced)',
    conference_name: 'ISACON 2024 — West Bengal Chapter', type: 'workshop_facilitated',
    role: 'Workshop Faculty', date: null, year: 2024,
    location: '', topic: 'POCUS', description: '',
  },
  {
    id: 'fallback-10', status: 'published', sort: 10,
    title: 'CRISISCARDIO 2024 — Simulation-Based Cardiac Emergencies',
    conference_name: 'CRISISCARDIO 2024', type: 'workshop_facilitated',
    role: 'Workshop Faculty & Organising Committee', date: null, year: 2024,
    location: 'HIMS, SRHU', topic: 'Cardiac Emergencies', description: '',
  },
  {
    id: 'fallback-11', status: 'published', sort: 11,
    title: 'Advanced Cadaver-Based Emergency Skills Workshop',
    conference_name: 'ACES 2024', type: 'workshop_facilitated',
    role: 'Workshop Faculty', date: null, year: 2024,
    location: 'AIIMS Rishikesh', topic: 'Emergency Skills', description: '',
  },
  {
    id: 'fallback-12', status: 'published', sort: 12,
    title: 'Updates in Emergency Medicine',
    conference_name: 'Updates in Emergency Medicine Workshop', type: 'workshop_facilitated',
    role: 'Workshop Faculty', date: '2023-05-01', year: 2023,
    location: 'AIIMS Rishikesh', topic: 'Emergency Medicine Updates', description: '',
  },
  {
    id: 'fallback-13', status: 'published', sort: 13,
    title: 'Chardham Health System Strengthening — Training of Trainers',
    conference_name: 'Chardham Health System Strengthening', type: 'workshop_facilitated',
    role: 'Resource Faculty', date: '2023-04-01', year: 2023,
    location: 'AIIMS Rishikesh', topic: 'Trauma & Emergency Medicine', description: '',
  },
]

interface ConferencesListSectionProps {
  conferences: HBConference[]
}

export function ConferencesListSection({ conferences }: ConferencesListSectionProps) {
  const displayConfs = conferences.length > 0 ? conferences : FALLBACK_CONFERENCES
  const grouped = groupByYear(displayConfs)

  const totalCount = displayConfs.length
  const uniqueRoles = new Set(displayConfs.map((c) => c.role).filter(Boolean)).size
  const years = displayConfs.map((c) => c.year).filter((y): y is number => y !== null)
  const yearRange = years.length > 0
    ? `${Math.min(...years)}–${Math.max(...years)}`
    : '2023–2026'

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

        {/* Year-grouped sections */}
        <div className="mx-auto max-w-5xl space-y-10">
          {[...grouped.entries()].map(([year, items], yearIndex) => (
            <ScrollReveal key={year} staggerDelay={yearIndex * 80}>
              <div className="relative">
                {/* Year header with line */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-lg font-bold text-white shadow-md">
                    {year || '—'}
                  </div>
                  <div className="h-px flex-1 bg-border" />
                  <span className="shrink-0 rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
                    {items.length} {items.length === 1 ? 'event' : 'events'}
                  </span>
                </div>

                {/* Conference rows — compact table-like layout */}
                <div className="ml-6 border-l-2 border-navy/10 pl-6">
                  {items.map((conf, i) => (
                    <div
                      key={conf.id}
                      className={`relative py-4 ${
                        i < items.length - 1 ? 'border-b border-border/50' : ''
                      }`}
                    >
                      {/* Connector dot on the left border */}
                      <div className="absolute -left-[31px] top-6 h-2.5 w-2.5 rounded-full border-2 border-navy/20 bg-white" />

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                        {/* Left: date column */}
                        <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted/70 sm:w-28 sm:pt-0.5">
                          <Calendar className="h-3 w-3" strokeWidth={1.5} />
                          {formatDate(conf.date, conf.year)}
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
      </Container>
    </section>
  )
}
