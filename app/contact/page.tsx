import type { Metadata } from 'next'
import { PageWrapper } from '@/components/PageWrapper'
import { ContactHeaderSection } from '@/components/sections/contact/ContactHeaderSection'
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection'
import { buildPageJsonLd, buildPageMetadata, JsonLd, SEO_ROUTES } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata(SEO_ROUTES.contact)

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd(SEO_ROUTES.contact)} />
      <PageWrapper>
        <main>
          <ContactHeaderSection />
          <ContactFormSection />
        </main>
      </PageWrapper>
    </>
  )
}
