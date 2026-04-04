'use client'

import { useState, useEffect } from 'react'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1600)
    const doneTimer = setTimeout(() => onComplete(), 2100)
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer) }
  }, [onComplete])

  return (
    <div className={`preloader ${exiting ? 'preloader-exit' : ''}`}>
      <div className='preloader-logo flex flex-col items-center gap-4'>
        {/* HB monogram */}
        <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-navy'>
          <span className='font-serif text-3xl font-bold text-white'>HB</span>
        </div>
        <p className='text-sm font-medium tracking-[0.2em] text-muted uppercase'>
          Dr. Himanshi Baid
        </p>
      </div>
      <div className='preloader-bar mt-8' />
    </div>
  )
}
