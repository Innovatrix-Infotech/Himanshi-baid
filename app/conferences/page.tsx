import type { Metadata } from 'next'
import { getConferences } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { ConferencesHeaderSection } from '@/components/sections/conferences/ConferencesHeaderSection'
import { ConferencesListSection } from '@/components/sections/conferences/ConferencesListSection'

export const metadata: Metadata = {
  title: 'Conferences | Dr. Himanshi Baid',
  description:
    'Faculty, speaker, and workshop facilitator at national and international emergency medicine conferences, CMEs, and simulation-based events.',
}

export default async function ConferencesPage() {
  const conferences = await getConferences()

  return (
    <PageWrapper>
      <main>
        <ConferencesHeaderSection />
        <ConferencesListSection conferences={conferences} />
      </main>
    </PageWrapper>
  )
}
