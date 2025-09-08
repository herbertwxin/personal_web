/**
 * CSS and styling fallback utilities
 */

// CSS custom property fallbacks
export const cssVariableFallbacks = {
  // Color fallbacks
  '--background': '#ffffff',
  '--foreground': '#000000',
  '--primary': '#030213',
  '--secondary': '#f3f3f5',
  '--muted': '#ececf0',
  '--accent': '#e9ebef',
  '--border': 'rgba(0, 0, 0, 0.1)',

  // Font fallbacks
  '--font-sans': 'system-ui, -apple-system, sans-serif',
  '--font-mono': 'Monaco, Consolas, monospace',

  // Spacing fallbacks
  '--radius': '0.625rem',
  '--spacing-xs': '0.25rem',
  '--spacing-sm': '0.5rem',
  '--spacing-md': '1rem',
  '--spacing-lg': '1.5rem',
  '--spacing-xl': '2rem',
} as const

// Apply CSS fallbacks for unsupported features
export const applyCSSFallbacks = () => {
  const style = document.createElement('style')
  style.id = 'css-fallbacks'

  style.textContent = `
    /* Backdrop filter fallbacks */
    .glass-effect {
      background: rgba(255, 255, 255, 0.9);
    }
    
    @supports (backdrop-filter: blur(20px)) {
      .glass-effect {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
      }
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.85);
    }
    
    @supports (backdrop-filter: blur(16px)) {
      .glass-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(16px);
      }
    }
    
    /* CSS Grid fallbacks */
    .grid-fallback {
      display: flex;
      flex-wrap: wrap;
    }
    
    @supports (display: grid) {
      .grid-fallback {
        display: grid;
      }
    }
    
    /* Custom scrollbar fallbacks */
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(120, 100, 150, 0.25) rgba(120, 100, 150, 0.05);
    }
    
    /* Smooth scrolling fallback */
    @media (prefers-reduced-motion: no-preference) {
      html {
        scroll-behavior: smooth;
      }
    }
    
    /* Focus visible fallback */
    .focus-visible-fallback:focus {
      outline: 2px solid var(--ring, #708090);
      outline-offset: 2px;
    }
    
    @supports selector(:focus-visible) {
      .focus-visible-fallback:focus {
        outline: none;
      }
      
      .focus-visible-fallback:focus-visible {
        outline: 2px solid var(--ring, #708090);
        outline-offset: 2px;
      }
    }
  `

  document.head.appendChild(style)
}

// Check for CSS feature support
export const checkCSSSupport = {
  backdropFilter: () => CSS.supports('backdrop-filter', 'blur(1px)'),
  grid: () => CSS.supports('display', 'grid'),
  customProperties: () => CSS.supports('color', 'var(--test)'),
  focusVisible: () => CSS.supports('selector(:focus-visible)'),
  scrollBehavior: () => CSS.supports('scroll-behavior', 'smooth'),
}

// Progressive enhancement for CSS features
export const enhanceCSS = () => {
  const root = document.documentElement

  // Add feature detection classes
  if (checkCSSSupport.backdropFilter()) {
    root.classList.add('supports-backdrop-filter')
  }

  if (checkCSSSupport.grid()) {
    root.classList.add('supports-grid')
  }

  if (checkCSSSupport.customProperties()) {
    root.classList.add('supports-custom-properties')
  }

  if (checkCSSSupport.focusVisible()) {
    root.classList.add('supports-focus-visible')
  }

  // Apply fallbacks
  applyCSSFallbacks()
}
