import React, { useState, useEffect } from 'react'
import { getAssetUrl } from '../../lib/assets'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

const LOADING_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDQiIHI9IjIwIiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Im00NCAyNGEyMCAyMCAwIDAgMSAyMCAyMCIgc3Ryb2tlPSIjNjY2Ij48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIHZhbHVlcz0iMCA0NCA0NDszNjAgNDQgNDQiLz48L3BhdGg+PC9zdmc+'

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  showLoading?: boolean
  retryCount?: number
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [retryAttempts, setRetryAttempts] = useState(0)

  const {
    src,
    alt,
    style,
    className,
    fallbackSrc = ERROR_IMG_SRC,
    showLoading = true,
    retryCount = 1,
    ...rest
  } = props

  const processedSrc = src ? getAssetUrl(src) : undefined

  useEffect(() => {
    if (processedSrc) {
      setIsLoading(true)
      setDidError(false)
    }
  }, [processedSrc])

  const handleError = () => {
    if (retryAttempts < retryCount) {
      // Retry loading the image
      setRetryAttempts(prev => prev + 1)
      setIsLoading(true)
      // Force reload by adding timestamp
      const img = new Image()
      img.onload = () => {
        setIsLoading(false)
        setDidError(false)
      }
      img.onerror = () => {
        setDidError(true)
        setIsLoading(false)
      }
      img.src = `${processedSrc}?retry=${retryAttempts + 1}`
    } else {
      setDidError(true)
      setIsLoading(false)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
    setDidError(false)
  }

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
        title={`Failed to load image: ${src}`}
      >
        <div className='flex items-center justify-center w-full h-full'>
          <img
            src={fallbackSrc}
            alt={alt || 'Error loading image'}
            {...rest}
            data-original-url={src}
            data-retry-attempts={retryAttempts}
          />
        </div>
      </div>
    )
  }

  if (isLoading && showLoading) {
    return (
      <div
        className={`inline-block bg-gray-50 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className='flex items-center justify-center w-full h-full'>
          <img src={LOADING_IMG_SRC} alt='Loading...' {...rest} />
        </div>
      </div>
    )
  }

  return (
    <img
      src={processedSrc}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}
