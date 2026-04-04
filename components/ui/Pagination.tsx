import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

function getPageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = [1]

  if (current > 3) {
    pages.push('ellipsis')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('ellipsis')
  }

  pages.push(total)
  return pages
}

const baseButtonStyles =
  'inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200'

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)
  const isFirst = currentPage <= 1
  const isLast = currentPage >= totalPages

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-center gap-1.5">
      {isFirst ? (
        <span
          className={cn(baseButtonStyles, 'cursor-not-allowed text-muted/40')}
          aria-disabled="true"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        </span>
      ) : (
        <a
          href={getPageHref(basePath, currentPage - 1)}
          className={cn(
            baseButtonStyles,
            'text-navy hover:bg-background-alt',
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        </a>
      )}

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${i}`}
            className="inline-flex h-10 w-10 items-center justify-center text-sm text-muted"
          >
            ...
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            className={cn(
              baseButtonStyles,
              'bg-accent text-white',
            )}
            aria-current="page"
          >
            {page}
          </span>
        ) : (
          <a
            key={page}
            href={getPageHref(basePath, page)}
            className={cn(
              baseButtonStyles,
              'text-navy hover:bg-background-alt',
            )}
          >
            {page}
          </a>
        ),
      )}

      {isLast ? (
        <span
          className={cn(baseButtonStyles, 'cursor-not-allowed text-muted/40')}
          aria-disabled="true"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </span>
      ) : (
        <a
          href={getPageHref(basePath, currentPage + 1)}
          className={cn(
            baseButtonStyles,
            'text-navy hover:bg-background-alt',
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </a>
      )}
    </nav>
  )
}
