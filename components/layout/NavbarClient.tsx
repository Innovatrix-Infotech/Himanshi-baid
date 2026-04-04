'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from './nav-links'
import { Menu, X } from 'lucide-react'

export function NavbarClient() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/50 bg-white/80 shadow-sm backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2.5'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-navy'>
              <span className='font-serif text-xs font-bold text-white'>HB</span>
            </div>
            <div className='hidden sm:block'>
              <p className='text-sm font-bold leading-tight text-navy'>Dr. Himanshi Baid</p>
              <p className='text-[10px] leading-tight text-muted'>Emergency Medicine</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className='hidden items-center gap-1 lg:flex'>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-accent'
                      : 'text-muted hover:text-foreground',
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className='absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent' />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className='flex items-center gap-3'>
            <Link
              href='/contact'
              className='hidden rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-dark lg:inline-flex'
            >
              Get in Touch
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className='flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-background-alt lg:hidden'
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <X className='h-5 w-5' strokeWidth={2} />
              ) : (
                <Menu className='h-5 w-5' strokeWidth={2} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className='fixed inset-0 z-40 bg-white lg:hidden'>
          <div className='flex h-full flex-col pt-20'>
            <nav className='flex-1 overflow-y-auto px-6 py-8'>
              <ul className='space-y-1'>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={cn(
                        'flex items-center rounded-xl px-4 py-3.5 text-lg font-medium transition-colors',
                        isActive(link.href)
                          ? 'bg-accent-light text-accent'
                          : 'text-foreground hover:bg-background-alt',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='border-t border-border px-6 py-6'>
              <Link
                href='/contact'
                onClick={closeMobile}
                className='flex w-full items-center justify-center rounded-xl bg-navy px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-dark'
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
