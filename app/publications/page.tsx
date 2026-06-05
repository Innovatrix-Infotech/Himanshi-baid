import type { Metadata } from 'next'
import { getSiteConfig, getPublications } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { PublicationsHeaderSection } from '@/components/sections/publications/PublicationsHeaderSection'
import { PublicationsListSection } from '@/components/sections/publications/PublicationsListSection'
import {
  buildPageJsonLd,
  buildPageMetadata,
  buildPublicationItemListJsonLd,
  JsonLd,
  SEO_ROUTES,
} from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata(SEO_ROUTES.publications)

export default async function PublicationsPage() {
  const [siteConfig, publications] = await Promise.all([
    getSiteConfig(),
    getPublications(),
  ])

  return (
    <>
      <JsonLd
        data={buildPageJsonLd(SEO_ROUTES.publications, {
          mainEntity: buildPublicationItemListJsonLd(publications),
        })}
      />
      <PageWrapper>
        <main>
          <PublicationsHeaderSection siteConfig={siteConfig} />
          <PublicationsListSection publications={publications} />
        </main>
      </PageWrapper>
    </>
  )
}
