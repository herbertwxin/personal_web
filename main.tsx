import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { preloadFonts, optimizeFontDisplay } from './lib/fonts'
import { enhanceCSS } from './lib/css-fallbacks'
import { preloadAssets } from './lib/assets'

// Initialize asset handling and performance optimizations
const initializeAssets = () => {
  // Enhance CSS with fallbacks and feature detection
  enhanceCSS()

  // Optimize font loading
  preloadFonts()
  optimizeFontDisplay()

  // Preload critical assets
  const criticalAssets = ['/favicon.svg', '/favicon.png']
  preloadAssets(criticalAssets)
}

// Get the root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

// Initialize assets before rendering
initializeAssets()

// Create root and render the app
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
