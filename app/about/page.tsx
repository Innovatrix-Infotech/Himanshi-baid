import type { Metadata } from 'next'
import { getSiteConfig, getCertifications, getThesis } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { AboutHeaderSection } from '@/components/sections/about/AboutHeaderSection'
import { BioSection } from '@/components/sections/about/BioSection'
import { ClinicalExpertiseSection } from '@/components/sections/about/ClinicalExpertiseSection'
import { TeachingSection } from '@/components/sections/about/TeachingSection'
import { ResearchInterestsSection } from '@/components/sections/about/ResearchInterestsSection'
import { CertificationsSection } from '@/components/sections/about/CertificationsSection'
import { buildPageJsonLd, buildPageMetadata, JsonLd, SEO_ROUTES } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata(SEO_ROUTES.about)

export default async function AboutPage() {
  const [siteConfig, certifications, thesis] = await Promise.all([
    getSiteConfig(),
    getCertifications(),
    getThesis(),
  ])

  return (
    <>
      <JsonLd data={buildPageJsonLd(SEO_ROUTES.about)} />
      <PageWrapper>
        <main>
          <AboutHeaderSection />
          <BioSection bioFull={siteConfig.bio_full} />
          <ClinicalExpertiseSection />
          <TeachingSection thesis={thesis} />
          <ResearchInterestsSection />
          <CertificationsSection certifications={certifications} />
        </main>
      </PageWrapper>
    </>
  )
}
