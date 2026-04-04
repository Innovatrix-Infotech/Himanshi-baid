'use client'

import { useEffect, useRef, type RefObject } from 'react'

type GSAPRevealOptions = {
  selector: string
  start?: string
  y?: number
  stagger?: number
  duration?: number
}

function resolveRootMargin(start?: string) {
  const normalizedStart = start ?? 'top 80%'
  const match = normalizedStart.match(/^top\s+(\d+)%$/)

  if (!match) {
    return '0px 0px -20% 0px'
  }

  const viewportOffset = 100 - Number(match[1])
  return `0px 0px -${viewportOffset}% 0px`
}

export function useGSAPReveal<T extends HTMLElement>(options: GSAPRevealOptions): RefObject<T | null> {
  const sectionRef = useRef<T>(null)

  useEffect(() => {
    let cancelled = false
    let cleanup: (() => void) | undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const run = async () => {
      const { default: gsap } = await import('gsap')

      if (cancelled || !sectionRef.current) return

      const sectionElement = sectionRef.current
      const targets = sectionElement.querySelectorAll<HTMLElement>(options.selector)

      if (targets.length === 0) return

      let hasAnimated = false
      let observer: IntersectionObserver | undefined

      const ctx = gsap.context(() => {
        const animateIn = () => {
          if (hasAnimated) return
          hasAnimated = true

          gsap.to(targets, {
            opacity: 1,
            y: 0,
            stagger: options.stagger ?? 0.08,
            duration: options.duration ?? 0.8,
            ease: 'power2.out',
          })
        }

        if (typeof window.IntersectionObserver !== 'function') {
          animateIn()
          return
        }

        observer = new window.IntersectionObserver(
          (entries) => {
            const [entry] = entries
            if (!entry?.isIntersecting) return

            animateIn()
            observer?.disconnect()
          },
          {
            root: null,
            rootMargin: resolveRootMargin(options.start),
            threshold: 0.01,
          },
        )

        observer.observe(sectionElement)
      }, sectionElement)

      cleanup = () => {
        observer?.disconnect()
        ctx.revert()
      }
    }

    void run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [options.selector, options.start, options.y, options.stagger, options.duration])

  return sectionRef
}
