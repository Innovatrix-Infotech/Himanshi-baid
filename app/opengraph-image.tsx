import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

export const alt = `${SITE_NAME} academic portfolio`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f8faf8',
          color: '#153b5c',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Georgia, serif',
          height: '100%',
          justifyContent: 'space-between',
          padding: 72,
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 24,
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: '#153b5c',
              borderRadius: '50%',
              color: '#ffffff',
              display: 'flex',
              fontSize: 44,
              fontWeight: 700,
              height: 96,
              justifyContent: 'center',
              width: 96,
            }}
          >
            HB
          </div>
          <div
            style={{
              color: '#6b7280',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: 24,
              gap: 8,
            }}
          >
            <span>Emergency Medicine</span>
            <span>MGMCH, Jaipur</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxWidth: 900,
          }}
        >
          <h1
            style={{
              fontSize: 76,
              letterSpacing: 0,
              lineHeight: 1.04,
              margin: 0,
            }}
          >
            {SITE_NAME}
          </h1>
          <p
            style={{
              color: '#5e6a75',
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: 34,
              lineHeight: 1.28,
              margin: 0,
            }}
          >
            {SITE_TAGLINE}
          </p>
        </div>

        <div
          style={{
            background: '#d7b56d',
            height: 8,
            width: 220,
          }}
        />
      </div>
    ),
    size,
  )
}
