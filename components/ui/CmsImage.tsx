'use client'

import { useState, useCallback } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

export const CMS_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIzMCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMUUzQTVGIi8+PC9zdmc+'

type CmsImageProps = Omit<ImageProps, 'onLoad' | 'placeholder'> & {
  wrapperClassName?: string
  blurDataURL?: string
  disableBlur?: boolean
}

export function CmsImage({
  wrapperClassName,
  className,
  alt,
  blurDataURL,
  disableBlur = false,
  ...rest
}: CmsImageProps) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const blurProps = disableBlur
    ? {}
    : {
        placeholder: 'blur' as const,
        blurDataURL: blurDataURL ?? CMS_BLUR_DATA_URL,
      }

  return (
    <div className={cn(!loaded && 'image-shimmer', wrapperClassName)}>
      <Image
        alt={alt}
        className={cn(
          'transition-opacity duration-500 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        onLoad={handleLoad}
        {...blurProps}
        {...rest}
      />
    </div>
  )
}
