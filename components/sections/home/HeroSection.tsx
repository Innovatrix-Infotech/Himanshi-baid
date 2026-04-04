'use client'

import { useEffect, useState } from 'react'
import { CmsImage } from '@/components/ui/CmsImage'
import { Button } from '@/components/ui/Button'
import { useRevealReady } from '@/components/PageWrapper'
import { getAssetUrl } from '@/lib/cms/directus-client'
import { Stethoscope, FileText } from 'lucide-react'
import type { HBSiteConfig } from '@/lib/cms/types'

interface HeroSectionProps {
  siteConfig: HBSiteConfig
}

export function HeroSection({ siteConfig }: HeroSectionProps) {
  const photoUrl = getAssetUrl(siteConfig.profile_photo)
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
    <section className='relative min-h-screen overflow-hidden bg-white'>
      {/* Subtle bg accent */}
      <div className='pointer-events-none absolute right-0 top-0 h-[70%] w-[55%] rounded-bl-[80px] bg-accent-light/40' />

      <div className='relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 md:px-8'>
        <div className='grid w-full items-center gap-12 md:grid-cols-12 md:gap-8 lg:gap-16'>

          {/* ── Text ── */}
          <div className='md:col-span-6 lg:col-span-5'>
            {/* Name */}
            <h1
              className={`anim-fade-up font-serif text-5xl font-bold leading-[1.1] tracking-tight text-navy sm:text-6xl lg:text-7xl ${r}`}
              style={d(0)}
            >
              Dr. Himanshi{' '}
              <span className='text-accent'>Baid</span>
            </h1>

            {/* Tagline */}
            <p
              className={`anim-fade-up mt-5 font-serif text-xl italic text-muted md:text-2xl ${r}`}
              style={d(150)}
            >
              {siteConfig.tagline || 'Where Critical Care Meets Academic Rigour'}
            </p>

            {/* Degree */}
            <div className={`anim-fade-up mt-5 ${r}`} style={d(250)}>
              <div className='anim-line h-[2px] w-12 bg-accent revealed' style={d(300)} />
              <p className='mt-3 text-sm font-medium text-muted'>
                MBBS, MD Emergency Medicine &mdash; AIIMS Rishikesh
              </p>
            </div>

            {/* Bio */}
            {siteConfig.bio_short && (
              <p className={`anim-fade-up mt-5 max-w-md text-base leading-relaxed text-muted ${r}`} style={d(350)}>
                {siteConfig.bio_short}
              </p>
            )}

            {/* CTAs */}
            <div className={`anim-fade-up mt-8 flex flex-wrap gap-3 ${r}`} style={d(420)}>
              <Button variant='primary' size='lg' href='/cv'>
                <FileText className='mr-2 h-4 w-4' strokeWidth={2} />
                View CV
              </Button>
              <Button variant='ghost' size='lg' href='/blog'>
                Read Blog
              </Button>
            </div>

            {/* Quick stats row */}
            <div className={`anim-fade-up mt-10 flex gap-8 ${r}`} style={d(500)}>
              <div>
                <p className='text-2xl font-bold text-navy'>10+</p>
                <p className='text-xs text-muted'>Publications</p>
              </div>
              <div className='h-10 w-px bg-border' />
              <div>
                <p className='text-2xl font-bold text-navy'>3</p>
                <p className='text-xs text-muted'>Gold Medals</p>
              </div>
              <div className='h-10 w-px bg-border' />
              <div>
                <p className='text-2xl font-bold text-navy'>AIIMS</p>
                <p className='text-xs text-muted'>Trained</p>
              </div>
            </div>
          </div>

          {/* ── Photo ── */}
          <div className='relative md:col-span-6 lg:col-span-7'>
            <div className={`anim-scale-in ${r}`} style={d(200)}>
              <div className='relative mx-auto max-w-lg'>
                {/* Photo */}
                <div className='relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl'>
                  {photoUrl ? (
                    <CmsImage
                      src={photoUrl}
                      alt={siteConfig.site_title || 'Dr. Himanshi Baid'}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 90vw, 500px'
                      priority
                    />
                  ) : (
                    <div className='flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-accent-light to-white'>
                      <div className='flex h-32 w-32 items-center justify-center rounded-3xl bg-navy/10'>
                        <Stethoscope className='h-16 w-16 text-navy/30' strokeWidth={1} />
                      </div>
                      <p className='mt-4 text-sm text-muted'>Photo coming soon</p>
                    </div>
                  )}
                </div>

                {/* Floating badge */}
                <div className='float-badge absolute -bottom-4 -left-4 rounded-2xl bg-white px-5 py-3 shadow-lg md:-left-8'>
                  <div className='flex items-center gap-2'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100'>
                      <div className='h-2.5 w-2.5 rounded-full bg-green-500' />
                    </div>
                    <div>
                      <p className='text-xs font-bold text-foreground'>15+ Conferences</p>
                      <p className='text-[10px] text-muted'>Speaker &amp; Presenter</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge top */}
                <div className='float-badge absolute -right-4 top-8 rounded-2xl bg-white px-4 py-2.5 shadow-lg md:-right-8' style={{ animationDelay: '1s' }}>
                  <p className='text-xs font-bold text-accent'>AIIMS Rishikesh</p>
                  <p className='text-[10px] text-muted'>MD Emergency Medicine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
