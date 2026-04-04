export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Publications', href: '/publications' },
  { label: 'Conferences', href: '/conferences' },
  { label: 'Blog', href: '/blog' },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
