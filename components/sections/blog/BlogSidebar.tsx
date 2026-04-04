'use client'

import { TrendingUp, ArrowRight, Mail } from 'lucide-react'
import type { HBBlogPost } from '@/lib/cms/types'

interface BlogSidebarProps {
  tags: string[]
  trendingPosts: HBBlogPost[]
}

export function BlogSidebar({ tags, trendingPosts }: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Trending / Latest Posts */}
      {trendingPosts.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
              Trending
            </h3>
          </div>

          <div className="space-y-0">
            {trendingPosts.map((post, i) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-background-alt"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium leading-snug text-navy transition-colors group-hover:text-accent">
                    {post.title}
                  </p>
                  {post.reading_time && (
                    <p className="mt-1 text-[11px] text-muted">
                      {post.reading_time} min read
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-background-alt px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-accent"
              >
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA Card */}
      <div className="rounded-xl bg-navy p-5">
        <h3 className="text-sm font-bold text-white">
          Get in Touch
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-white/60">
          Interested in collaboration, speaking opportunities, or academic consultation?
        </p>
        <a
          href="/contact"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent/90"
        >
          <Mail className="h-3.5 w-3.5" strokeWidth={2} />
          Contact
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}
