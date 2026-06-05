import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteConfig } from '@/lib/cms/queries'
import {
  buildPersonJsonLd,
  buildSiteMetadata,
  buildWebsiteJsonLd,
  JsonLd,
} from '@/lib/seo'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig()
  return buildSiteMetadata(siteConfig)
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteConfig = await getSiteConfig()

  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col font-sans'>
        <JsonLd data={[buildPersonJsonLd(siteConfig), buildWebsiteJsonLd(siteConfig)]} />
        <Navbar />
        <div className='flex-1'>{children}</div>
        <Footer siteConfig={siteConfig} />
      </body>
    </html>
  )
}
