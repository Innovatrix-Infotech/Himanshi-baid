import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { PostCard } from '@/components/ui/PostCard'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { HBBlogPost } from '@/lib/cms/types'

const FALLBACK_POSTS: HBBlogPost[] = [
  {
    id: 'dummy-1',
    status: 'published',
    slug: 'pocus-in-emergency-medicine',
    title: 'Point-of-Care Ultrasound: Transforming Emergency Diagnosis',
    category: 'education',
    excerpt: 'How POCUS is revolutionising bedside assessment and clinical decision-making in the emergency department, from cardiac evaluation to airway management.',
    body: '',
    featured_image: null,
    tags: ['POCUS', 'Emergency Medicine', 'Diagnostics'],
    published_at: '2025-03-15T10:00:00Z',
    reading_time: 6,
    seo_title: '',
    seo_description: '',
  },
  {
    id: 'dummy-2',
    status: 'published',
    slug: 'simulation-based-medical-education',
    title: 'Why Simulation-Based Training is the Future of Emergency Medicine Education',
    category: 'education',
    excerpt: 'Exploring the impact of high-fidelity simulation on clinical competency, decision-making under pressure, and patient safety outcomes in EM training programs.',
    body: '',
    featured_image: null,
    tags: ['Simulation', 'Medical Education', 'Training'],
    published_at: '2025-02-20T10:00:00Z',
    reading_time: 8,
    seo_title: '',
    seo_description: '',
  },
  {
    id: 'dummy-3',
    status: 'published',
    slug: 'toxicology-emergencies-india',
    title: 'Managing Toxicological Emergencies: Lessons from the Indian Context',
    category: 'blog',
    excerpt: 'A practical overview of common poisoning presentations in Indian emergency departments, from organophosphates to snakebites, and evidence-based treatment approaches.',
    body: '',
    featured_image: null,
    tags: ['Toxicology', 'Emergency Medicine', 'India'],
    published_at: '2025-01-10T10:00:00Z',
    reading_time: 7,
    seo_title: '',
    seo_description: '',
  },
]

interface LatestPostsSectionProps {
  educationPosts: HBBlogPost[]
  blogPosts: HBBlogPost[]
}

export function LatestPostsSection({ educationPosts, blogPosts }: LatestPostsSectionProps) {
  const cmsPosts = [...educationPosts, ...blogPosts]
  const displayPosts = cmsPosts.length > 0 ? cmsPosts : FALLBACK_POSTS

  return (
    <section className="bg-white py-20 md:py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-3 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <BookOpen className="h-3.5 w-3.5" strokeWidth={2} />
              Blog
            </span>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
              Latest Writing
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              Thoughts on emergency medicine, medical education, and academic research
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="ghost" href="/blog">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
      </Container>
    </section>
  )
}
