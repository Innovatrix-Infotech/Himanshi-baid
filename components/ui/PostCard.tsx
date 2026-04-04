import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { formatCmsDate } from '@/lib/utils'
import { ArrowRight, Clock, User } from 'lucide-react'
import type { HBBlogPost, HBBlogCategory } from '@/lib/cms/types'

function getCategoryColor(category: HBBlogCategory) {
  return category === 'education'
    ? 'bg-medical-red/8 text-medical-red border border-medical-red/15'
    : 'bg-accent/8 text-accent border border-accent/15'
}

interface PostCardProps {
  post: HBBlogPost
  index?: number
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <ScrollReveal staggerDelay={index * 120}>
      <a
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div
          className={`h-1 w-full ${post.category === 'education' ? 'bg-medical-red' : 'bg-accent'}`}
        />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(post.category)}`}
            >
              {post.category === 'education' ? 'Education' : 'Blog'}
            </span>
            {post.reading_time && (
              <span className="flex items-center gap-1 text-[11px] text-muted">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {post.reading_time} min read
              </span>
            )}
          </div>

          <h3 className="mt-4 text-lg font-semibold leading-snug text-navy transition-colors group-hover:text-accent">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
              {post.excerpt}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-background-alt px-2 py-0.5 text-[10px] font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-navy/5">
                <User className="h-3 w-3 text-navy/50" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-navy">
                  Dr. Himanshi Baid
                </span>
                {post.published_at && (
                  <span className="text-[10px] text-muted">
                    {formatCmsDate(post.published_at)}
                  </span>
                )}
              </div>
            </div>
            <ArrowRight
              className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </a>
    </ScrollReveal>
  )
}
