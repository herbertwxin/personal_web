import { useState, useEffect } from 'react'

interface AcademicLayoutConfig {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'large-desktop'
  listVariant: 'default' | 'compact' | 'dense'
  showInlineMetadata: boolean
  useHangingIndent: boolean
}

export function useAcademicLayout(): AcademicLayoutConfig {
  const [config, setConfig] = useState<AcademicLayoutConfig>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    breakpoint: 'desktop',
    listVariant: 'default',
    showInlineMetadata: true,
    useHangingIndent: true,
  })

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth
      
      const isMobile = width < 640
      const isTablet = width >= 640 && width < 1024
      const isDesktop = width >= 1024 && width < 1440
      const isLargeDesktop = width >= 1440
      
      let breakpoint: AcademicLayoutConfig['breakpoint'] = 'desktop'
      let listVariant: AcademicLayoutConfig['listVariant'] = 'default'
      let showInlineMetadata = true
      let useHangingIndent = true
      
      if (isMobile) {
        breakpoint = 'mobile'
        listVariant = 'compact'
        showInlineMetadata = false
        useHangingIndent = width > 374 // Only use hanging indent on larger mobile screens
      } else if (isTablet) {
        breakpoint = 'tablet'
        listVariant = 'default'
        showInlineMetadata = true
        useHangingIndent = true
      } else if (isDesktop) {
        breakpoint = 'desktop'
        listVariant = 'default'
        showInlineMetadata = true
        useHangingIndent = true
      } else if (isLargeDesktop) {
        breakpoint = 'large-desktop'
        listVariant = 'default'
        showInlineMetadata = true
        useHangingIndent = true
      }
      
      setConfig({
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        breakpoint,
        listVariant,
        showInlineMetadata,
        useHangingIndent,
      })
    }

    // Initial check
    updateLayout()

    // Add event listener
    window.addEventListener('resize', updateLayout)
    
    // Cleanup
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  return config
}

// Hook for academic typography scaling
export function useAcademicTypography() {
  const [scale, setScale] = useState(1)
  
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth
      
      if (width < 375) {
        setScale(0.9) // Smaller text on very small screens
      } else if (width < 640) {
        setScale(0.95) // Slightly smaller on mobile
      } else if (width < 1024) {
        setScale(1) // Normal scale on tablet
      } else if (width < 1440) {
        setScale(1.05) // Slightly larger on desktop
      } else {
        setScale(1.1) // Larger on large screens
      }
    }
    
    updateScale()
    window.addEventListener('resize', updateScale)
    
    return () => window.removeEventListener('resize', updateScale)
  }, [])
  
  return scale
}

// Hook for academic spacing
export function useAcademicSpacing() {
  const layout = useAcademicLayout()
  
  const spacing = {
    listGap: layout.isMobile ? 'var(--academic-spacing-md)' : 'var(--academic-spacing-lg)',
    itemPadding: layout.isMobile ? 'var(--academic-spacing-sm)' : 'var(--academic-spacing-md)',
    sectionMargin: layout.isMobile ? 'var(--academic-spacing-xl)' : 'var(--academic-spacing-2xl)',
    hangingIndent: layout.useHangingIndent ? (
      layout.isMobile ? '1rem' : layout.isTablet ? '1.5rem' : '2rem'
    ) : '0',
    nestedIndent: layout.isMobile ? '1rem' : layout.isTablet ? '1.25rem' : '1.5rem',
  }
  
  return spacing
}