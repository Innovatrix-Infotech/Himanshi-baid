'use client'

import { useState, useCallback, createContext, useContext, type ReactNode } from 'react'
import { Preloader } from '@/components/ui/Preloader'

const RevealContext = createContext(false)

export function useRevealReady() {
  return useContext(RevealContext)
}

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [preloaderDone, setPreloaderDone] = useState(false)

  const handleComplete = useCallback(() => {
    setPreloaderDone(true)
  }, [])

  return (
    <RevealContext.Provider value={preloaderDone}>
      {!preloaderDone && <Preloader onComplete={handleComplete} />}
      {children}
    </RevealContext.Provider>
  )
}
