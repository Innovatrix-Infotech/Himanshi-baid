'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const callbacks = new Map<Element, () => void>()
let sharedObserver: IntersectionObserver | null = null

function getObserver() {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = callbacks.get(entry.target)
          if (cb) {
            cb()
            callbacks.delete(entry.target)
            sharedObserver!.unobserve(entry.target)
          }
        }
      }
    },
    { rootMargin: '0px 0px 20% 0px', threshold: 0 },
  )

  return sharedObserver
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function ScrollReveal({ children, className, staggerDelay }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-revealed', 'true')
      return
    }

    if (staggerDelay) {
      el.style.transitionDelay = `${staggerDelay}ms`
    }

    const observer = getObserver()
    callbacks.set(el, () => el.setAttribute('data-revealed', 'true'))
    observer.observe(el)

    return () => {
      callbacks.delete(el)
      observer.unobserve(el)
    }
  }, [staggerDelay])

  return (
    <div ref={ref} className={cn('scroll-reveal', className)}>
      {children}
    </div>
  )
}
