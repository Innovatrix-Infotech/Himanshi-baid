import type { Metadata } from 'next'
import { PageWrapper } from '@/components/PageWrapper'
import { ContactHeaderSection } from '@/components/sections/contact/ContactHeaderSection'
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection'

export const metadata: Metadata = {
  title: 'Contact | Dr. Himanshi Baid',
  description:
    'Get in touch with Dr. Himanshi Baid for academic collaborations, speaking invitations, research partnerships, and opportunities in emergency medicine education.',
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <main>
        <ContactHeaderSection />
        <ContactFormSection />
      </main>
    </PageWrapper>
  )
}
