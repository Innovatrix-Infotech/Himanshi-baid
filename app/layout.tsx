import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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

export const metadata: Metadata = {
  title: {
    default: 'Dr. Himanshi Baid | Emergency Medicine',
    template: '%s | Dr. Himanshi Baid',
  },
  description:
    'Academic portfolio of Dr. Himanshi Baid — MBBS, MD Emergency Medicine (AIIMS Rishikesh). Where Critical Care Meets Academic Rigour.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col font-sans'>
        <Navbar />
        <div className='flex-1'>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
