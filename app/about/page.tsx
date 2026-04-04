import type { Metadata } from 'next'
import { getSiteConfig, getCertifications } from '@/lib/cms/queries'
import { PageWrapper } from '@/components/PageWrapper'
import { AboutHeaderSection } from '@/components/sections/about/AboutHeaderSection'
import { BioSection } from '@/components/sections/about/BioSection'
import { ClinicalExpertiseSection } from '@/components/sections/about/ClinicalExpertiseSection'
import { TeachingSection } from '@/components/sections/about/TeachingSection'
import { ResearchInterestsSection } from '@/components/sections/about/ResearchInterestsSection'
import { CertificationsSection } from '@/components/sections/about/CertificationsSection'

export const metadata: Metadata = {
  title: 'About | Dr. Himanshi Baid',
  description:
    'Emergency Medicine physician, academic faculty, and researcher with expertise in POCUS, toxicology, simulation-based education, and resuscitation science.',
}

export default async function AboutPage() {
  const [siteConfig, certifications] = await Promise.all([
    getSiteConfig(),
    getCertifications(),
  ])

  return (
    <PageWrapper>
      <main>
        <AboutHeaderSection />
        <BioSection bioFull={siteConfig.bio_full} />
        <ClinicalExpertiseSection />
        <TeachingSection />
        <ResearchInterestsSection />
        <CertificationsSection certifications={certifications} />
      </main>
    </PageWrapper>
  )
}
