import Link from 'next/link'
import { NAV_LINKS } from './nav-links'
import { Mail, BookOpen, ExternalLink } from 'lucide-react'
import type { HBSiteConfig } from '@/lib/cms/types'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
    </svg>
  )
}

const CURRENT_YEAR = new Date().getFullYear()

interface FooterProps {
  siteConfig?: HBSiteConfig
}

export function Footer({ siteConfig }: FooterProps) {
  const footerLinks = siteConfig?.footer_links.length ? siteConfig.footer_links : NAV_LINKS
  const siteTitle = siteConfig?.site_title || 'Dr. Himanshi Baid'
  const tagline = siteConfig?.tagline || 'Emergency Medicine'
  const bio = siteConfig?.bio_short || siteConfig?.bio || 'Assistant Professor, Emergency Medicine at Mahatma Gandhi Medical College and Hospital, Jaipur.'
  const email = siteConfig?.email || 'contact@himanshi.dev'
  const emailHref = `mailto:${email}`
  const linkedinUrl = siteConfig?.linkedin_url || ''
  const googleScholarUrl = siteConfig?.google_scholar_url || ''
  const orcidUrl = siteConfig?.orcid_url || ''

  return (
    <footer className='border-t border-border bg-navy-dark'>
      <div className='mx-auto max-w-7xl px-6 py-16 md:px-8'>
        <div className='grid gap-12 md:grid-cols-3'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-2.5'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/10'>
                <span className='font-serif text-sm font-bold text-white'>HB</span>
              </div>
              <div>
                <p className='text-sm font-bold text-white'>{siteTitle}</p>
                <p className='text-xs text-white/40'>{tagline}</p>
              </div>
            </div>
            <p className='mt-4 max-w-xs text-sm leading-relaxed text-white/50'>
              {bio}
            </p>

            {/* Social links */}
            <div className='mt-6 flex gap-3'>
              <a
                href={emailHref}
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white'
                aria-label='Email'
              >
                <Mail className='h-4 w-4' strokeWidth={1.5} />
              </a>
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white'
                  aria-label='LinkedIn'
                >
                  <LinkedinIcon className='h-4 w-4' />
                </a>
              )}
              {googleScholarUrl && (
                <a
                  href={googleScholarUrl}
                  className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white'
                  aria-label='Google Scholar'
                >
                  <BookOpen className='h-4 w-4' strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label='Footer main links'>
            <h3 className='text-xs font-bold uppercase tracking-[0.15em] text-white/30'>
              Quick Links
            </h3>
            <ul className='mt-4 space-y-2.5'>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-white/50 transition-colors hover:text-white'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className='text-xs font-bold uppercase tracking-[0.15em] text-white/30'>
              Get in Touch
            </h3>
            <ul className='mt-4 space-y-3'>
              <li>
                <a
                  href={emailHref}
                  className='flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white'
                >
                  <Mail className='h-4 w-4' strokeWidth={1.5} />
                  {email}
                </a>
              </li>
              {linkedinUrl && (
                <li>
                  <a
                    href={linkedinUrl}
                    className='flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white'
                  >
                    <LinkedinIcon className='h-4 w-4' />
                    LinkedIn Profile
                  </a>
                </li>
              )}
              {orcidUrl && (
                <li>
                  <a
                    href={orcidUrl}
                    className='flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white'
                  >
                    <ExternalLink className='h-4 w-4' strokeWidth={1.5} />
                    ORCID Profile
                  </a>
                </li>
              )}
            </ul>

            <div className='mt-8'>
              <Link
                href='/contact'
                className='inline-flex items-center rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5'
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-12 border-t border-white/10 pt-6'>
          <div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
            <p className='text-xs text-white/30'>
              &copy; {CURRENT_YEAR} Dr. Himanshi Baid. All rights reserved.
            </p>
            <p className='text-xs text-white/20'>
              Built by{' '}
              <a
                href='https://innovatrixinfotech.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white/30 transition-colors hover:text-white/50'
              >
                Innovatrix Infotech
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
