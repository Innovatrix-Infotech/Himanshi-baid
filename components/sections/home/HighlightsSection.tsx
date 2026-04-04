'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { BookOpen, Medal, Mic, GraduationCap } from 'lucide-react'

interface Stat { label: string; value: string }
interface HighlightsSectionProps { stats: Stat[] }

const ICONS: Record<string, ReactNode> = {
  Publications: <BookOpen className='h-6 w-6' strokeWidth={1.5} />,
  'Gold Medals': <Medal className='h-6 w-6' strokeWidth={1.5} />,
  Conferences: <Mic className='h-6 w-6' strokeWidth={1.5} />,
  Training: <GraduationCap className='h-6 w-6' strokeWidth={1.5} />,
}

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState(value)
  const isNumeric = /^\d+\+?$/.test(value)

  useEffect(() => {
    if (!inView || !isNumeric) return
    const target = parseInt(value.replace('+', ''), 10)
    const suffix = value.includes('+') ? '+' : ''
    let frame = 0
    const total = 25
    const interval = setInterval(() => {
      frame++
      const progress = 1 - Math.pow(1 - frame / total, 3)
      setDisplay(String(Math.round(progress * target)) + suffix)
      if (frame >= total) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [inView, value, isNumeric])

  return <span>{display}</span>
}

export function HighlightsSection({ stats }: HighlightsSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className='bg-gradient-to-b from-background-alt to-white py-20 border-t border-border'>
      <Container>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className='group rounded-2xl border border-border bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
              }}
            >
              <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white'>
                {ICONS[stat.label] ?? <BookOpen className='h-6 w-6' strokeWidth={1.5} />}
              </div>
              <p className='text-3xl font-bold text-navy'>
                <AnimatedValue value={stat.value} inView={inView} />
              </p>
              <p className='mt-1 text-sm text-muted'>{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
