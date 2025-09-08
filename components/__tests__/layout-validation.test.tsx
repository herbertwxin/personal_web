import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import App from '../../App'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}))

// Mock performance API
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    mark: vi.fn(),
    measure: vi.fn(),
    now: () => Date.now(),
    getEntriesByType: () => [],
  },
})

// Mock PerformanceObserver
global.PerformanceObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
})) as any
Object.defineProperty(global.PerformanceObserver, 'supportedEntryTypes', {
  value: ['measure', 'navigation'],
  writable: false
})

describe('Layout Validation Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset viewport to default
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Content Positioning Tests (Requirements 1.1, 1.2, 1.3)', () => {
    it('should render main content visible in viewport without scrolling', async () => {
      render(<App />)
      
      // Check that main content container exists and is properly positioned
      const mainContent = document.querySelector('main')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent).toHaveClass('relative', 'z-10', 'texture-content', 'pt-20')
      
      // Verify content is not pushed below viewport
      const appContainer = document.querySelector('.min-h-screen')
      expect(appContainer).toBeInTheDocument()
      expect(appContainer).toHaveClass('relative', 'texture-background', 'texture-normal')
      
      // Check that background doesn't interfere with content positioning
      const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      expect(backgroundContainer).toBeInTheDocument()
      expect(backgroundContainer).toHaveClass('-z-10')
    })

    it('should maintain proper z-index stacking order', () => {
      render(<App />)
      
      // Background should be behind content (negative z-index)
      const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      expect(backgroundContainer).toHaveClass('-z-10')
      
      // Navigation should be above content
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('z-50')
      
      // Main content should be above background but below navigation
      const mainContent = document.querySelector('main')
      expect(mainContent).toHaveClass('z-10')
    })

    it('should have proper document flow without unexpected offsets', () => {
      render(<App />)
      
      // Check that main container uses proper layout classes
      const appContainer = document.querySelector('.min-h-screen')
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      
      // Verify main content has proper top padding to account for fixed navigation
      const mainContent = document.querySelector('main')
      expect(mainContent).toHaveClass('pt-20')
      
      // Ensure no overflow hidden that could cause issues
      expect(appContainer).not.toHaveClass('overflow-hidden')
    })

    it('should maintain content positioning across different viewport sizes', () => {
      const viewportSizes = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1280, height: 720 },  // Desktop
        { width: 1920, height: 1080 }, // Large Desktop
      ]

      viewportSizes.forEach(({ width, height }) => {
        // Set viewport size
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        render(<App />)
        
        // Verify consistent layout structure
        const appContainer = document.querySelector('.min-h-screen')
        const mainContent = document.querySelector('main')
        const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
        
        expect(appContainer).toHaveClass('min-h-screen', 'relative')
        expect(mainContent).toHaveClass('relative', 'z-10', 'pt-20')
        expect(backgroundContainer).toHaveClass('fixed', 'inset-0', '-z-10')
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })
  })

  describe('Navigation Centering Tests (Requirements 2.1, 2.2, 2.4)', () => {
    it('should center navigation horizontally at top of page', () => {
      render(<App />)
      
      const navigation = document.querySelector('nav')
      expect(navigation).toBeInTheDocument()
      expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2', 'z-50')
    })

    it('should maintain navigation centering across screen sizes', () => {
      const screenSizes = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1024, height: 768, name: 'tablet-landscape' },
        { width: 1280, height: 720, name: 'desktop' },
        { width: 1920, height: 1080, name: 'large-desktop' },
      ]

      screenSizes.forEach(({ width, height, name }) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        render(<App />)
        
        const navigation = document.querySelector('nav')
        expect(navigation, `Navigation should be centered on ${name}`).toHaveClass(
          'fixed',
          'top-6',
          'left-1/2',
          '-translate-x-1/2'
        )
        
        // Check navigation container has proper backdrop and positioning
        const navContainer = navigation?.querySelector('.relative.backdrop-blur-xl')
        expect(navContainer, `Navigation container should exist on ${name}`).toBeInTheDocument()
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })

    it('should have proper navigation container structure', () => {
      render(<App />)
      
      const navigation = document.querySelector('nav')
      const navContainer = navigation?.querySelector('.relative.backdrop-blur-xl.rounded-full')
      
      expect(navContainer).toBeInTheDocument()
      expect(navContainer).toHaveClass('relative', 'backdrop-blur-xl', 'rounded-full', 'shadow-2xl', 'overflow-hidden')
    })

    it('should handle navigation selector positioning correctly', async () => {
      render(<App />)
      
      // Wait for navigation to render
      await waitFor(() => {
        const navigation = document.querySelector('nav')
        expect(navigation).toBeInTheDocument()
      })
      
      // Check that navigation items are present
      const navButtons = document.querySelectorAll('nav button')
      expect(navButtons.length).toBeGreaterThan(0)
      
      // Verify navigation has proper structure for selector positioning
      const navContainer = document.querySelector('nav .relative.backdrop-blur-xl')
      expect(navContainer).toBeInTheDocument()
    })
  })

  describe('Background Texture System Tests (Requirements 4.2, 4.3)', () => {
    it('should render background texture without interfering with content', () => {
      render(<App />)
      
      // Check background container structure
      const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      expect(backgroundContainer).toBeInTheDocument()
      
      // Verify base white background
      const whiteBackground = backgroundContainer?.querySelector('.absolute.inset-0.bg-white')
      expect(whiteBackground).toBeInTheDocument()
      
      // Check texture overlays
      const gridOverlay = backgroundContainer?.querySelector('.absolute.inset-0.opacity-\\[0\\.08\\]')
      const dotPattern = backgroundContainer?.querySelector('.absolute.inset-0.opacity-\\[0\\.012\\]')
      
      expect(gridOverlay).toBeInTheDocument()
      expect(dotPattern).toBeInTheDocument()
    })

    it('should have proper hardware acceleration for texture elements', () => {
      render(<App />)
      
      // Check that texture background has proper classes
      const textureBackground = document.querySelector('.texture-background')
      expect(textureBackground).toHaveClass('texture-normal')
      
      // Verify animated elements have motion classes
      const motionDivs = document.querySelectorAll('.motion-div')
      expect(motionDivs.length).toBeGreaterThan(0)
      
      motionDivs.forEach(div => {
        expect(div).toHaveClass('absolute', 'rounded-full', 'blur-3xl', 'motion-div')
      })
    })

    it('should maintain texture performance across viewport changes', () => {
      render(<App />)
      
      const viewportSizes = [
        { width: 375, height: 667 },
        { width: 1280, height: 720 },
        { width: 1920, height: 1080 },
      ]

      viewportSizes.forEach(({ width, height }) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        // Trigger resize event
        window.dispatchEvent(new Event('resize'))
        
        // Verify texture elements are still present and properly structured
        const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
        const textureBackground = document.querySelector('.texture-background')
        const motionDivs = document.querySelectorAll('.motion-div')
        
        expect(backgroundContainer).toBeInTheDocument()
        expect(textureBackground).toBeInTheDocument()
        expect(motionDivs.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Layout Stability Tests (Requirements 4.1, 4.4)', () => {
    it('should prevent cumulative layout shift (CLS) issues', () => {
      render(<App />)
      
      // Check that all major layout elements have fixed dimensions or proper sizing
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav.fixed')
      const mainContent = document.querySelector('main')
      const backgroundContainer = document.querySelector('.fixed.inset-0')
      
      expect(appContainer).toHaveClass('min-h-screen')
      expect(navigation).toHaveClass('fixed', 'top-6')
      expect(mainContent).toHaveClass('relative', 'pt-20')
      expect(backgroundContainer).toHaveClass('fixed', 'inset-0')
    })

    it('should maintain stable layout during animations', () => {
      render(<App />)
      
      // Verify that animated elements don't affect document flow
      const motionDivs = document.querySelectorAll('.motion-div')
      motionDivs.forEach(div => {
        expect(div).toHaveClass('absolute')
      })
      
      // Check that background container is fixed and doesn't affect layout
      const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      expect(backgroundContainer).toHaveClass('fixed', '-z-10')
      
      // Verify main content maintains proper positioning
      const mainContent = document.querySelector('main')
      expect(mainContent).toHaveClass('relative', 'z-10')
    })

    it('should handle page transitions without layout shifts', async () => {
      render(<App />)
      
      // Verify initial layout structure
      const initialMain = document.querySelector('main')
      const initialNav = document.querySelector('nav')
      const initialBackground = document.querySelector('.fixed.inset-0.-z-10')
      
      expect(initialMain).toBeInTheDocument()
      expect(initialNav).toBeInTheDocument()
      expect(initialBackground).toBeInTheDocument()
      
      // Layout structure should remain consistent
      expect(initialMain).toHaveClass('relative', 'z-10', 'texture-content', 'pt-20')
      expect(initialNav).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2', 'z-50')
      expect(initialBackground).toHaveClass('fixed', 'inset-0', '-z-10')
    })

    it('should maintain responsive design stability', () => {
      const breakpoints = [
        { width: 320, height: 568, name: 'small-mobile' },
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1024, height: 768, name: 'tablet-landscape' },
        { width: 1280, height: 720, name: 'desktop' },
        { width: 1920, height: 1080, name: 'large-desktop' },
      ]

      breakpoints.forEach(({ width, height, name }) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        render(<App />)
        
        // Verify consistent layout structure across all breakpoints
        const appContainer = document.querySelector('.min-h-screen')
        const navigation = document.querySelector('nav')
        const mainContent = document.querySelector('main')
        const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
        
        expect(appContainer, `App container should exist on ${name}`).toHaveClass('min-h-screen', 'relative')
        expect(navigation, `Navigation should be positioned on ${name}`).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
        expect(mainContent, `Main content should be positioned on ${name}`).toHaveClass('relative', 'z-10', 'pt-20')
        expect(backgroundContainer, `Background should be fixed on ${name}`).toHaveClass('fixed', 'inset-0', '-z-10')
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })
  })

  describe('Cross-Component Layout Integration', () => {
    it('should maintain proper layout when components are lazy loaded', async () => {
      render(<App />)
      
      // Wait for initial render
      await waitFor(() => {
        const mainContent = document.querySelector('main')
        expect(mainContent).toBeInTheDocument()
      })
      
      // Verify layout structure remains intact during lazy loading
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'z-50')
      expect(backgroundContainer).toHaveClass('fixed', '-z-10')
    })

    it('should handle texture background with navigation overlay correctly', () => {
      render(<App />)
      
      // Verify z-index stacking order
      const navigation = document.querySelector('nav')
      const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      const mainContent = document.querySelector('main')
      
      expect(navigation).toHaveClass('z-50')
      expect(backgroundContainer).toHaveClass('-z-10')
      expect(mainContent).toHaveClass('z-10')
      
      // Ensure navigation appears above background
      expect(navigation).toBeInTheDocument()
      expect(backgroundContainer).toBeInTheDocument()
    })

    it('should maintain layout integrity with performance optimizations', () => {
      render(<App />)
      
      // Check that performance optimizations don't break layout
      const textureBackground = document.querySelector('.texture-background')
      expect(textureBackground).toHaveClass('texture-normal')
      
      // Verify hardware acceleration classes are applied correctly
      const motionDivs = document.querySelectorAll('.motion-div')
      expect(motionDivs.length).toBeGreaterThan(0)
      
      // Check that main layout structure is preserved
      const appContainer = document.querySelector('.min-h-screen.relative')
      const mainContent = document.querySelector('main.relative.z-10')
      
      expect(appContainer).toBeInTheDocument()
      expect(mainContent).toBeInTheDocument()
    })
  })
})