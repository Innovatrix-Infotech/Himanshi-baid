import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#153b5c',
          color: '#ffffff',
          display: 'flex',
          fontFamily: 'Georgia, serif',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            border: '5px solid #d7b56d',
            borderRadius: '50%',
            display: 'flex',
            height: 128,
            justifyContent: 'center',
            width: 128,
          }}
        >
          <span
            style={{
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: 0,
              lineHeight: 1,
            }}
          >
            HB
          </span>
        </div>
      </div>
    ),
    size,
  )
}
