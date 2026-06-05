import type { Metadata } from 'next'
import { getConferences } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { ConferencesHeaderSection } from '@/components/sections/conferences/ConferencesHeaderSection'
import { ConferencesListSection } from '@/components/sections/conferences/ConferencesListSection'
import {
  buildConferenceItemListJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
  JsonLd,
  SEO_ROUTES,
} from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata(SEO_ROUTES.conferences)

export default async function ConferencesPage() {
  const conferences = await getConferences()

  return (
    <>
      <JsonLd
        data={buildPageJsonLd(SEO_ROUTES.conferences, {
          mainEntity: buildConferenceItemListJsonLd(conferences),
        })}
      />
      <PageWrapper>
        <main>
          <ConferencesHeaderSection />
          <ConferencesListSection conferences={conferences} />
        </main>
      </PageWrapper>
    </>
  )
}
