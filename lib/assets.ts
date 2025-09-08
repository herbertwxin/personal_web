/**
 * Asset loading utilities and fallback mechanisms
 */

// Asset loading with fallbacks
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

// Asset URL helpers
export const getAssetUrl = (path: string): string => {
  // Handle both development and production asset URLs
  if (path.startsWith('/')) {
    return path
  }
  return `/${path}`
}

// Icon fallback system
export const getIconFallback = (iconName: string): string => {
  // Provide fallback icons for missing assets
  const fallbacks: Record<string, string> = {
    default: '📄',
    error: '❌',
    loading: '⏳',
    success: '✅',
    warning: '⚠️',
    info: 'ℹ️',
  }

  return fallbacks[iconName] || fallbacks.default
}

// CSS asset loading
export const loadCSS = (href: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`))
    document.head.appendChild(link)
  })
}

// Preload critical assets
export const preloadAssets = (assets: string[]) => {
  assets.forEach(asset => {
    const link = document.createElement('link')
    link.rel = 'preload'

    // Determine asset type
    if (asset.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      link.as = 'image'
    } else if (asset.match(/\.(woff|woff2|ttf|otf)$/i)) {
      link.as = 'font'
      link.crossOrigin = 'anonymous'
    } else if (asset.match(/\.css$/i)) {
      link.as = 'style'
    }

    link.href = getAssetUrl(asset)
    document.head.appendChild(link)
  })
}
