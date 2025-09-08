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

  fontPreloads.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = href
    document.head.appendChild(link)

    // Also add the actual stylesheet
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.href = href
    document.head.appendChild(stylesheet)
  })
}

// Font display optimization
export const optimizeFontDisplay = () => {
  // Only run in browser environment
  if (typeof document === 'undefined') {
    return
  }

  // Add font-display: swap to improve loading performance
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-family: 'Inter';
      font-display: swap;
    }
  `
  document.head.appendChild(style)
}
