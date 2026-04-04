import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type CmsDateFormat = 'short' | 'long'

const CMS_DATE_FORMATTERS: Record<CmsDateFormat, Intl.DateTimeFormat> = {
  short: new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }),
  long: new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }),
}

export function formatCmsDate(
  dateStr: string | null | undefined,
  format: CmsDateFormat = 'short',
): string {
  if (!dateStr) return ''

  const timestamp = Date.parse(dateStr)
  if (Number.isNaN(timestamp)) return ''

  return CMS_DATE_FORMATTERS[format].format(new Date(timestamp))
}
