/**
 * Font loading utilities and configurations
 */

// Font loading with fallbacks
export const fontFamilies = {
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'sans-serif',
  ],
  mono: [
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Menlo',
    'Courier',
    'monospace',
  ],
  serif: ['Georgia', 'Times New Roman', 'serif'],
} as const

// Font loading optimization
export const preloadFonts = () => {
  // Only run in browser environment
  if (typeof document === 'undefined') {
    return
  }

  // Preload critical fonts for better performance
  const fontPreloads = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  ]

  // Ensure preconnect is established for remote font origins
  const preconnectOrigins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ] as const

  preconnectOrigins.forEach(origin => {
    if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
      const preconnect = document.createElement('link')
      preconnect.rel = 'preconnect'
      preconnect.href = origin
      if (origin.includes('gstatic')) {
        preconnect.crossOrigin = 'anonymous'
      }
      document.head.appendChild(preconnect)
    }
  })

  fontPreloads.forEach(href => {
    if (document.querySelector(`link[data-font-preload="${href}"]`)) {
      return
    }

    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'style'
    preloadLink.href = href
    preloadLink.crossOrigin = 'anonymous'
    preloadLink.setAttribute('data-font-preload', href)

    const activateStylesheet = () => {
      preloadLink.rel = 'stylesheet'
      preloadLink.removeAttribute('as')
    }

    preloadLink.addEventListener('load', activateStylesheet, { once: true })
    preloadLink.addEventListener('error', activateStylesheet, { once: true })

    // Fallback in case the load event never fires (older browsers)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(activateStylesheet)
    } else {
      setTimeout(activateStylesheet, 1000)
    }

    document.head.appendChild(preloadLink)
  })
}

// Font display optimization
export const optimizeFontDisplay = () => {
  // Only run in browser environment
  if (typeof document === 'undefined') {
    return
  }

  // Add font-display: swap to improve loading performance
  if (!document.getElementById('font-display-optimization')) {
    const style = document.createElement('style')
    style.id = 'font-display-optimization'
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
    `
    document.head.appendChild(style)
  }
}
