import {
  getSiteConfig,
  getPublicationsCount,
  getGoldMedalsCount,
  getConferencesCount,
  getLatestBlogPosts,
  getEducation,
  getExperience,
  getAwards,
} from '@/lib/cms/queries'
import { getAssetUrl } from '@/lib/cms/directus-client'
import { PageWrapper } from '@/components/PageWrapper'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { HighlightsSection } from '@/components/sections/home/HighlightsSection'
import { JourneySection } from '@/components/sections/home/JourneySection'
import { PhilosophySection } from '@/components/sections/home/PhilosophySection'
import { AwardsSection } from '@/components/sections/home/AwardsSection'
import { LatestPostsSection } from '@/components/sections/home/LatestPostsSection'
import { ContactCTASection } from '@/components/sections/home/ContactCTASection'

export default async function Home() {
  const [
    siteConfig,
    pubCount,
    goldCount,
    confCount,
    educationPosts,
    blogPosts,
    education,
    experience,
    awards,
  ] = await Promise.all([
    getSiteConfig(),
    getPublicationsCount(),
    getGoldMedalsCount(),
    getConferencesCount(),
    getLatestBlogPosts('education', 2),
    getLatestBlogPosts('blog', 2),
    getEducation(),
    getExperience(),
    getAwards(),
  ])

  const stats = [
    { label: 'Publications', value: pubCount ? String(pubCount) : '10+' },
    { label: 'Gold Medals', value: goldCount ? String(goldCount) : '3' },
    { label: 'Conferences', value: confCount ? String(confCount) : '15+' },
    { label: 'Training', value: 'AIIMS' },
  ]

  const cvFileUrl = getAssetUrl(siteConfig.cv_file)

  return (
    <PageWrapper>
      <main>
        <HeroSection siteConfig={siteConfig} />
        <HighlightsSection stats={stats} />
        <JourneySection education={education} experience={experience} />
        <PhilosophySection
          philosophy={siteConfig.philosophy || 'Education must be accessible to all, in the form they understand.'}
        />
        <AwardsSection awards={awards} />
        <LatestPostsSection educationPosts={educationPosts} blogPosts={blogPosts} />
        <ContactCTASection
          email={siteConfig.email}
          cvFileUrl={cvFileUrl}
          linkedinUrl={siteConfig.linkedin_url}
          scholarUrl={siteConfig.google_scholar_url}
          orcidUrl={siteConfig.orcid_url}
        />
      </main>
    </PageWrapper>
  )
}
