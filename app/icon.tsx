import { ImageResponse } from 'next/og'

export const size = {
  width: 512,
  height: 512,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#153b5c',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Georgia, serif',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            border: '10px solid #d7b56d',
            borderRadius: '50%',
            display: 'flex',
            height: 360,
            justifyContent: 'center',
            width: 360,
          }}
        >
          <span
            style={{
              fontSize: 148,
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
