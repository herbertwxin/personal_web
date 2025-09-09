import { useState, useEffect } from 'react'

// Custom hook for media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    
    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        // Fallback for older browsers
        media.removeListener(listener)
      }
    }
  }, [query])

  return matches
}

// Predefined breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}

export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
