'use client'

import { useState, type ReactNode } from 'react'
import { ExternalLink, BookOpen, Hash, Quote, UserCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { HBPublication, HBPublicationCategory } from '@/lib/cms/types'

const H_INDEX = 5
const TOTAL_CITATIONS = 126

const CATEGORY_LABELS: Record<HBPublicationCategory, string> = {
  case_report: 'Case Report',
  original_research: 'Original Research',
  review: 'Review',
  letter: 'Letter',
}

const CATEGORY_COLORS: Record<HBPublicationCategory, string> = {
  case_report: 'bg-accent',
  original_research: 'bg-navy',
  review: 'bg-gold',
  letter: 'bg-muted',
}

const CATEGORY_BADGE_COLORS: Record<HBPublicationCategory, string> = {
  case_report: 'bg-accent-light text-accent',
  original_research: 'bg-navy/10 text-navy',
  review: 'bg-gold/10 text-gold',
  letter: 'bg-background-alt text-muted',
}

const FILTER_CATEGORIES: { key: HBPublicationCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'case_report', label: 'Case Reports' },
  { key: 'original_research', label: 'Original Research' },
  { key: 'review', label: 'Reviews' },
  { key: 'letter', label: 'Letters' },
]

function highlightAuthor(authors: string, name = 'Baid H'): ReactNode[] {
  const parts = authors.split(new RegExp(`(${name})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === name.toLowerCase()
      ? <strong key={i} className="font-bold text-navy">{part}</strong>
      : <span key={i}>{part}</span>,
  )
}

const FALLBACK_PUBLICATIONS: HBPublication[] = [
  {
    id: 'fallback-1',
    status: 'published',
    sort: 1,
    title: 'Iatrogenic intussusception due to gossypiboma presenting as acute intestinal obstruction to a tertiary care emergency department',
    authors: 'Sharma P, Baid H, Sandhu H, Singh M',
    journal: 'Cureus',
    year: 2025,
    doi_url: 'https://doi.org/10.7759/cureus.87411',
    url: '',
    pubmed_id: '40772198',
    category: 'case_report',
    abstract: '',
    is_corresponding: true,
  },
  {
    id: 'fallback-2',
    status: 'published',
    sort: 2,
    title: 'Accidental organophosphate poisoning in a toddler: A case report',
    authors: 'Patel R, Patel S, Verma A, Baid H',
    journal: 'Cureus',
    year: 2024,
    doi_url: 'https://doi.org/10.7759/cureus.63027',
    url: '',
    pubmed_id: '39050305',
    category: 'case_report',
    abstract: '',
    is_corresponding: true,
  },
  {
    id: 'fallback-3',
    status: 'published',
    sort: 3,
    title: 'The diagnostic accuracy of point-of-care ultrasound parameters for airway assessment in patients undergoing intubation in emergency department – an observational study',
    authors: 'Pillai A, Arora P, Kabi A, Chauhan U, Asokan R, Akhil P, Shankar T, Lalneiruol DJ, Baid H, Chawang H',
    journal: 'Int J Emerg Med',
    year: 2024,
    doi_url: 'https://doi.org/10.1186/s12245-024-00585-6',
    url: '',
    pubmed_id: '38287263',
    category: 'original_research',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-4',
    status: 'published',
    sort: 4,
    title: 'Point of care gastric ultrasound to predict aspiration in patients undergoing urgent endotracheal intubation in the emergency medicine department',
    authors: 'Asokan R, Bhardwaj BB, Agrawal N, Chauhan U, Pillai A, Shankar T, Lalneiruol DJ, Baid H, Chawang H, Patel SM',
    journal: 'BMC Emerg Med',
    year: 2023,
    doi_url: 'https://doi.org/10.1186/s12873-023-00881-z',
    url: '',
    pubmed_id: '37735359',
    category: 'original_research',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-5',
    status: 'published',
    sort: 5,
    title: 'Off with the blues: Therapeutic plasma exchange in a case of copper sulphate poisoning',
    authors: 'Banerjee P, Mohan AK, Baid H, Kaeley N, Khiamniungan CB, Prasanth V, Jain A, Kaur D, Negi G',
    journal: 'Transfus Apher Sci',
    year: 2023,
    doi_url: 'https://doi.org/10.1016/j.transci.2023.103811',
    url: '',
    pubmed_id: '37730446',
    category: 'case_report',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-6',
    status: 'published',
    sort: 6,
    title: 'Treatment modalities in calcium channel blocker overdose: A systematic review',
    authors: 'Baid H, Kaeley N, Singh S, Mahala P, Chawang H, Datta SS, Manchanda H, Shankar T',
    journal: 'Cureus',
    year: 2023,
    doi_url: 'https://doi.org/10.7759/cureus.42854',
    url: '',
    pubmed_id: '37664357',
    category: 'review',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-7',
    status: 'published',
    sort: 7,
    title: 'Anti-snake venom-induced Kounis syndrome: A unique case in the emergency department',
    authors: 'Verma A, Baid H, Sharma N, Vaya S, Patel SM',
    journal: 'Cureus',
    year: 2022,
    doi_url: 'https://doi.org/10.7759/cureus.31510',
    url: '',
    pubmed_id: '36532914',
    category: 'case_report',
    abstract: '',
    is_corresponding: true,
  },
  {
    id: 'fallback-8',
    status: 'published',
    sort: 8,
    title: 'Ultrasound-guided estimation of internal jugular vein collapsibility index in patients with shock in emergency department',
    authors: 'Chawang HJ, Kaeley N, Bhardwaj BB, Chauhan U, Baid H, Asokan R, Galagali SS',
    journal: 'Turk J Emerg Med',
    year: 2022,
    doi_url: 'https://doi.org/10.4103/2452-2473.357352',
    url: '',
    pubmed_id: '36353383',
    category: 'original_research',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-9',
    status: 'published',
    sort: 9,
    title: 'Point of care ultrasound as initial diagnostic tool in acute dyspnea patients in the emergency department of a tertiary care center: Diagnostic accuracy study',
    authors: 'Baid H, Vempalli N, Kumar S, Arora P, Walia R, Chauhan U, Shukla K, Verma A, Chawang H, Agarwal D',
    journal: 'Int J Emerg Med',
    year: 2022,
    doi_url: 'https://doi.org/10.1186/s12245-022-00430-8',
    url: '',
    pubmed_id: '35698060',
    category: 'original_research',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-10',
    status: 'published',
    sort: 10,
    title: 'Difficult mask ventilation in penetrating facial trauma due to animal attack: A unique challenge in the emergency department',
    authors: 'Baid H, Arora P, Arora RK, Chawang H, Pillai A',
    journal: 'Cureus',
    year: 2022,
    doi_url: 'https://doi.org/10.7759/cureus.23831',
    url: '',
    pubmed_id: '35530820',
    category: 'case_report',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-11',
    status: 'published',
    sort: 11,
    title: 'Rupture of sinus of Valsalva aneurysm: A rare cause of acute ischaemic chest pain in the emergency department',
    authors: 'Baid H, Vempalli N, Shukla K, Asokan R',
    journal: 'BMJ Case Rep',
    year: 2022,
    doi_url: 'https://doi.org/10.1136/bcr-2022-249065',
    url: '',
    pubmed_id: '35365475',
    category: 'case_report',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-12',
    status: 'published',
    sort: 12,
    title: 'Cardiovascular manifestations of COVID-19: A case series',
    authors: 'Kaeley N, Chawang HJ, Baid H, Pillai A',
    journal: 'J Family Med Prim Care',
    year: 2021,
    doi_url: 'https://doi.org/10.4103/jfmpc.jfmpc_232_21',
    url: '',
    pubmed_id: '34934708',
    category: 'case_report',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-13',
    status: 'published',
    sort: 13,
    title: 'Marijuana-induced acute myocardial infarction in a young adult male',
    authors: 'Verma A, Nanda V, Kabi A, Baid H',
    journal: 'BMJ Case Rep',
    year: 2021,
    doi_url: 'https://doi.org/10.1136/bcr-2021-243335',
    url: '',
    pubmed_id: '34257123',
    category: 'case_report',
    abstract: '',
    is_corresponding: false,
  },
  {
    id: 'fallback-14',
    status: 'published',
    sort: 14,
    title: 'Intractable hypocalcemic seizures with neuropsychiatric symptoms – an under-diagnosed case',
    authors: 'Kaeley N, Baid H, Chawang H, Vempalli N',
    journal: 'J Family Med Prim Care',
    year: 2021,
    doi_url: 'https://doi.org/10.4103/jfmpc.jfmpc_2468_20',
    url: '',
    pubmed_id: '34195144',
    category: 'case_report',
    abstract: '',
    is_corresponding: true,
  },
]

interface PublicationsListSectionProps {
  publications: HBPublication[]
}

export function PublicationsListSection({ publications }: PublicationsListSectionProps) {
  const [activeFilter, setActiveFilter] = useState<HBPublicationCategory | 'all'>('all')
  const displayPubs = publications.length > 0 ? publications : FALLBACK_PUBLICATIONS

  const filtered = activeFilter === 'all'
    ? displayPubs
    : displayPubs.filter((p) => p.category === activeFilter)

  const availableCategories = new Set(displayPubs.map((p) => p.category))
  const correspondingCount = displayPubs.filter((p) => p.is_corresponding).length

  const categoryCounts = displayPubs.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1
    return acc
  }, {})

  return (
    <section className="bg-background-alt py-16 md:py-20">
      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar — sticky on desktop */}
          <aside className="lg:sticky lg:top-28 lg:h-fit lg:w-72 lg:shrink-0">
            <ScrollReveal>
              {/* Research metrics */}
              <div className="rounded-2xl border border-border bg-white p-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Research Metrics
                </p>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light">
                      <BookOpen className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-navy">{displayPubs.length}</p>
                      <p className="text-[11px] text-muted">Publications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light">
                      <Hash className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-navy">{H_INDEX}</p>
                      <p className="text-[11px] text-muted">h-index</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light">
                      <Quote className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-navy">{TOTAL_CITATIONS}</p>
                      <p className="text-[11px] text-muted">Citations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light">
                      <UserCheck className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-navy">{correspondingCount}</p>
                      <p className="text-[11px] text-muted">Corresponding Author</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="mt-4 rounded-2xl border border-border bg-white p-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  By Category
                </p>
                <div className="space-y-3">
                  {FILTER_CATEGORIES.filter((c) => c.key === 'all' || availableCategories.has(c.key)).map((cat) => {
                    const count = cat.key === 'all' ? displayPubs.length : (categoryCounts[cat.key] ?? 0)
                    const isActive = activeFilter === cat.key
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setActiveFilter(cat.key)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-navy text-white'
                            : 'text-muted hover:bg-background-alt hover:text-navy'
                        }`}
                      >
                        {cat.key !== 'all' && (
                          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${CATEGORY_COLORS[cat.key]}`} />
                        )}
                        <span className="flex-1 font-medium">{cat.label}</span>
                        <span className={`text-xs ${isActive ? 'text-white/70' : 'text-muted/60'}`}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          </aside>

          {/* Main publication list */}
          <div className="min-w-0 flex-1">
            <ScrollReveal>
              <p className="mb-6 text-sm text-muted">
                Showing {filtered.length} of {displayPubs.length} publications
                {activeFilter !== 'all' && (
                  <>
                    {' '}in <span className="font-medium text-navy">{CATEGORY_LABELS[activeFilter]}</span>
                  </>
                )}
              </p>
            </ScrollReveal>

            <div className="space-y-0">
              {filtered.map((pub, index) => {
                const pubNumber = activeFilter === 'all'
                  ? displayPubs.length - displayPubs.indexOf(pub)
                  : filtered.length - index

                return (
                  <ScrollReveal key={pub.id} staggerDelay={index * 50}>
                    <article className="group relative border-b border-border py-6 first:pt-0 last:border-b-0">
                      <div className="flex gap-4 md:gap-6">
                        {/* Publication number */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-navy/10 font-serif text-lg font-bold text-navy/30 transition-colors group-hover:border-accent group-hover:text-accent md:h-12 md:w-12 md:text-xl">
                          {pubNumber}
                        </div>

                        {/* Citation content */}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[15px] font-semibold leading-snug text-navy transition-colors group-hover:text-accent">
                            {pub.title}
                          </h3>

                          <p className="mt-1.5 text-sm leading-relaxed text-muted">
                            {highlightAuthor(pub.authors)}.{' '}
                            <em className="text-navy/60">{pub.journal}</em>.{' '}
                            {pub.year && <span className="text-navy/60">{pub.year}.</span>}
                          </p>

                          {/* Badges + links row */}
                          <div className="mt-2.5 flex flex-wrap items-center gap-2">
                            {pub.is_corresponding && (
                              <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                                Corresponding Author
                              </span>
                            )}
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                                CATEGORY_BADGE_COLORS[pub.category] ?? 'bg-background-alt text-muted'
                              }`}
                            >
                              {CATEGORY_LABELS[pub.category] ?? pub.category}
                            </span>

                            <span className="mx-1 hidden text-border sm:inline">|</span>

                            {pub.doi_url && (
                              <a
                                href={pub.doi_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                                DOI
                              </a>
                            )}
                            {pub.pubmed_id && (
                              <a
                                href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pubmed_id}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                                PubMed
                              </a>
                            )}
                            {pub.url && (
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                                Full Text
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>

            {filtered.length === 0 && (
              <p className="py-12 text-center text-sm text-muted">
                No publications found in this category.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
