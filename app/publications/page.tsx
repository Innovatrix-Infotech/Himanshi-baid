import type { Metadata } from 'next'
import { getSiteConfig, getPublications } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { PublicationsHeaderSection } from '@/components/sections/publications/PublicationsHeaderSection'
import { PublicationsListSection } from '@/components/sections/publications/PublicationsListSection'

export const metadata: Metadata = {
  title: 'Publications | Dr. Himanshi Baid',
  description:
    '14 PubMed-indexed publications in emergency medicine including case reports, diagnostic validation studies, systematic reviews, and original research.',
}

export default async function PublicationsPage() {
  const [siteConfig, publications] = await Promise.all([
    getSiteConfig(),
    getPublications(),
  ])

  return (
    <PageWrapper>
      <main>
        <PublicationsHeaderSection siteConfig={siteConfig} />
        <PublicationsListSection publications={publications} />
      </main>
    </PageWrapper>
  )
}
