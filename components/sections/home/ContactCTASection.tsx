import { Mail, FileText } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'

interface ContactCTASectionProps {
  email?: string
  cvFileUrl?: string | null
  linkedinUrl?: string
  scholarUrl?: string
  orcidUrl?: string
}

export function ContactCTASection({
  cvFileUrl,
  linkedinUrl,
  scholarUrl,
  orcidUrl,
}: ContactCTASectionProps) {
  return (
    <section className="bg-gradient-to-br from-navy to-navy-dark py-24 md:py-32">
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center">
            {/* Accent line */}
            <div className="mx-auto mb-8 h-[2px] w-12 bg-accent" />

            {/* Heading */}
            <h2 className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Let&apos;s Collaborate
            </h2>

            {/* Subtext */}
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
              Open to academic collaborations, speaking invitations, research
              partnerships, and opportunities in emergency medicine education.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="border-white bg-white text-navy hover:bg-white/90"
              >
                <Mail className="mr-2 h-4.5 w-4.5" />
                Get in Touch
              </Button>

              {cvFileUrl && (
                <Button
                  variant="ghost"
                  size="lg"
                  href={cvFileUrl}
                  className="border-white/30 text-white hover:border-white hover:bg-white/10"
                >
                  <FileText className="mr-2 h-4.5 w-4.5" />
                  Download CV
                </Button>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-10 flex items-center justify-center gap-5">
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}

              {scholarUrl && (
                <a
                  href={scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Scholar"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
                  </svg>
                </a>
              )}

              {orcidUrl && (
                <a
                  href={orcidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ORCID"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.834-1.209-3.722-3.881-3.722h-2.438z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
