'use client'

import { useEffect, useRef, type RefObject } from 'react'

export function useGSAPParallax<T extends HTMLElement>(speed = 0.25): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    let cancelled = false
    let cleanup: (() => void) | undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    if (window.innerWidth < 768) return

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled || !ref.current) return

      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.to(ref.current, {
          yPercent: -100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }, ref)

      cleanup = () => ctx.revert()
    }

    void run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [speed])

  return ref
}
