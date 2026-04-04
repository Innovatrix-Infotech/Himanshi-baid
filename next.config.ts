import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.innovatrixinfotech.in',
        pathname: '/assets/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
