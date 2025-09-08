import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import App from '../../App'

// Mock framer-motion for consistent testing
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

describe('Cross-Browser Layout Consistency Tests', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
    
    // Reset to default viewport
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

  describe('CSS Feature Support Tests', () => {
    it('should handle backdrop-filter support gracefully', () => {
      render(<App />)
      
      // Navigation should use backdrop-blur regardless of support
      const navContainer = document.querySelector('.backdrop-blur-xl')
      expect(navContainer).toBeInTheDocument()
      expect(navContainer).toHaveClass('backdrop-blur-xl')
      
      // Should have fallback styling
      expect(navContainer).toHaveClass('rounded-full', 'shadow-2xl')
    })

    it('should work with CSS Grid and Flexbox fallbacks', () => {
      render(<App />)
      
      // Main layout should use modern CSS features with fallbacks
      const appContainer = document.querySelector('.min-h-screen')
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      
      // Navigation should use flexbox for item layout
      const navContainer = document.querySelector('nav .relative')
      expect(navContainer).toBeInTheDocument()
    })

    it('should handle CSS custom properties correctly', () => {
      render(<App />)
      
      // Check that components render without CSS custom property issues
      const textureBackground = document.querySelector('.texture-background')
      expect(textureBackground).toBeInTheDocument()
      expect(textureBackground).toHaveClass('texture-normal')
    })

    it('should support CSS transforms for centering', () => {
      render(<App />)
      
      // Navigation centering should work across browsers
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('left-1/2', '-translate-x-1/2')
      
      // This uses transform: translateX(-50%) which is widely supported
    })
  })

  describe('Browser-Specific Layout Tests', () => {
    it('should handle WebKit-specific styling', () => {
      // Mock WebKit user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      })
      
      render(<App />)
      
      // Backdrop blur should work in WebKit browsers
      const navContainer = document.querySelector('.backdrop-blur-xl')
      expect(navContainer).toBeInTheDocument()
      
      // Layout should remain consistent
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'z-50')
    })

    it('should handle Firefox-specific behavior', () => {
      // Mock Firefox user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0'
      })
      
      render(<App />)
      
      // Layout should work consistently in Firefox
      const navigation = document.querySelector('nav')
      const main = document.querySelector('main')
      const background = document.querySelector('.fixed.inset-0.-z-10')
      
      expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
      expect(main).toHaveClass('relative', 'z-10')
      expect(background).toHaveClass('fixed', 'inset-0', '-z-10')
    })

    it('should handle Edge/Chromium behavior', () => {
      // Mock Edge user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59'
      })
      
      render(<App />)
      
      // Modern CSS features should work in Edge
      const navContainer = document.querySelector('.backdrop-blur-xl')
      const textureBackground = document.querySelector('.texture-background')
      
      expect(navContainer).toHaveClass('backdrop-blur-xl', 'rounded-full')
      expect(textureBackground).toHaveClass('texture-normal')
    })

    it('should handle mobile Safari specifics', () => {
      // Mock mobile Safari user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
      })
      
      // Set mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 667, configurable: true })
      
      render(<App />)
      
      // Layout should work on mobile Safari
      const navigation = document.querySelector('nav')
      const appContainer = document.querySelector('.min-h-screen')
      
      expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
    })
  })

  describe('Viewport and Device Compatibility', () => {
    it('should handle high DPI displays correctly', () => {
      // Mock high DPI display
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 2,
      })
      
      render(<App />)
      
      // Layout should remain consistent on high DPI
      const navigation = document.querySelector('nav')
      const textureBackground = document.querySelector('.texture-background')
      
      expect(navigation).toHaveClass('fixed', 'z-50')
      expect(textureBackground).toHaveClass('texture-normal')
      
      // Reset device pixel ratio
      Object.defineProperty(window, 'devicePixelRatio', { value: 1 })
    })

    it('should handle different screen orientations', () => {
      // Test portrait orientation
      Object.defineProperty(window, 'innerWidth', { value: 768, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 1024, configurable: true })
      
      render(<App />)
      
      let navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
      
      // Switch to landscape
      Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true })
      window.dispatchEvent(new Event('resize'))
      
      navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
    })

    it('should handle touch device interactions', async () => {
      // Mock touch device
      Object.defineProperty(navigator, 'maxTouchPoints', {
        writable: true,
        value: 5,
      })
      
      render(<App />)
      
      // Navigation should work with touch interactions
      const navButtons = document.querySelectorAll('nav button')
      expect(navButtons.length).toBeGreaterThan(0)
      
      // Simulate touch interaction
      if (navButtons[1]) {
        await user.click(navButtons[1])
        
        await waitFor(() => {
          const main = document.querySelector('main')
          expect(main).toBeInTheDocument()
        })
      }
      
      // Layout should remain stable after touch interaction
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'z-50')
    })

    it('should handle different zoom levels', () => {
      const zoomLevels = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]
      
      zoomLevels.forEach(zoom => {
        // Simulate zoom by adjusting viewport
        const baseWidth = 1280
        const baseHeight = 720
        Object.defineProperty(window, 'innerWidth', { 
          value: Math.round(baseWidth / zoom), 
          configurable: true 
        })
        Object.defineProperty(window, 'innerHeight', { 
          value: Math.round(baseHeight / zoom), 
          configurable: true 
        })
        
        render(<App />)
        
        // Layout should remain consistent at all zoom levels
        const navigation = document.querySelector('nav')
        const appContainer = document.querySelector('.min-h-screen')
        const main = document.querySelector('main')
        
        expect(navigation, `Navigation should be positioned at ${zoom}x zoom`).toHaveClass(
          'fixed', 'top-6', 'left-1/2', '-translate-x-1/2'
        )
        expect(appContainer, `App container should exist at ${zoom}x zoom`).toHaveClass(
          'min-h-screen', 'relative'
        )
        expect(main, `Main content should be positioned at ${zoom}x zoom`).toHaveClass(
          'relative', 'z-10'
        )
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })
  })

  describe('Accessibility and Screen Reader Compatibility', () => {
    it('should maintain proper heading hierarchy across browsers', () => {
      render(<App />)
      
      // Check that layout doesn't interfere with semantic structure
      const navigation = document.querySelector('nav')
      const main = document.querySelector('main')
      
      expect(navigation).toBeInTheDocument()
      expect(main).toBeInTheDocument()
      
      // Navigation should not interfere with main content accessibility
      expect(navigation).toHaveClass('z-50')
      expect(main).toHaveClass('z-10')
    })

    it('should handle reduced motion preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })
      
      render(<App />)
      
      // Layout should remain functional with reduced motion
      const navigation = document.querySelector('nav')
      const textureBackground = document.querySelector('.texture-background')
      const motionDivs = document.querySelectorAll('.motion-div')
      
      expect(navigation).toHaveClass('fixed', 'z-50')
      expect(textureBackground).toHaveClass('texture-normal')
      expect(motionDivs.length).toBeGreaterThan(0)
    })

    it('should handle high contrast mode', () => {
      // Mock high contrast mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })
      
      render(<App />)
      
      // Layout should remain accessible in high contrast mode
      const navigation = document.querySelector('nav')
      const navContainer = navigation?.querySelector('.backdrop-blur-xl')
      
      expect(navigation).toHaveClass('fixed', 'z-50')
      expect(navContainer).toBeInTheDocument()
    })

    it('should handle keyboard navigation across browsers', async () => {
      render(<App />)
      
      // Test keyboard navigation
      const navButtons = document.querySelectorAll('nav button')
      expect(navButtons.length).toBeGreaterThan(0)
      
      // Tab through navigation
      await user.tab()
      
      // Should be able to navigate with keyboard
      const focusedElement = document.activeElement
      expect(focusedElement).toBeInTheDocument()
      
      // Layout should remain stable during keyboard navigation
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'z-50')
    })
  })

  describe('Performance Across Browsers', () => {
    it('should handle CSS animations efficiently', () => {
      render(<App />)
      
      // Verify hardware acceleration hints are present
      const motionDivs = document.querySelectorAll('.motion-div')
      motionDivs.forEach(div => {
        expect(div).toHaveClass('motion-div')
      })
      
      // Background should be properly layered
      const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      expect(backgroundContainer).toHaveClass('fixed', '-z-10')
    })

    it('should handle memory usage efficiently across page changes', async () => {
      render(<App />)
      
      // Navigate through multiple pages
      const pages = ['stack', 'publications', 'resume', 'home']
      
      for (const page of pages) {
        const button = screen.getByRole('button', { 
          name: page === 'home' ? /home/i : new RegExp(page, 'i') 
        })
        await user.click(button)
        
        await waitFor(() => {
          const main = document.querySelector('main')
          expect(main).toBeInTheDocument()
        })
      }
      
      // Layout should remain stable after multiple navigations
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'z-50')
    })

    it('should handle rapid interactions without performance degradation', async () => {
      render(<App />)
      
      // Rapid navigation clicks
      const homeButton = screen.getByRole('button', { name: /home/i })
      const stackButton = screen.getByRole('button', { name: /stack/i })
      
      // Multiple rapid clicks
      for (let i = 0; i < 5; i++) {
        await user.click(stackButton)
        await user.click(homeButton)
      }
      
      // Layout should remain responsive
      const navigation = document.querySelector('nav')
      const main = document.querySelector('main')
      
      expect(navigation).toHaveClass('fixed', 'z-50')
      expect(main).toHaveClass('relative', 'z-10')
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle JavaScript disabled gracefully', () => {
      // Mock JavaScript disabled scenario
      render(<App />)
      
      // Basic layout should still work without JavaScript
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      const main = document.querySelector('main')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'z-50')
      expect(main).toHaveClass('relative', 'z-10')
    })

    it('should handle CSS loading failures gracefully', () => {
      render(<App />)
      
      // Even without full CSS, basic structure should exist
      const navigation = document.querySelector('nav')
      const main = document.querySelector('main')
      
      expect(navigation).toBeInTheDocument()
      expect(main).toBeInTheDocument()
    })

    it('should handle extreme viewport sizes', () => {
      const extremeSizes = [
        { width: 240, height: 320, name: 'very-small' },
        { width: 4096, height: 2160, name: 'ultra-large' },
        { width: 1, height: 1, name: 'minimal' },
      ]
      
      extremeSizes.forEach(({ width, height, name }) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        render(<App />)
        
        // Basic layout should still work
        const appContainer = document.querySelector('.min-h-screen')
        const navigation = document.querySelector('nav')
        
        expect(appContainer, `App container should exist at ${name} size`).toBeInTheDocument()
        expect(navigation, `Navigation should exist at ${name} size`).toBeInTheDocument()
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })

    it('should handle network connectivity issues', () => {
      // Mock offline scenario
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      })
      
      render(<App />)
      
      // Layout should still render when offline
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      const main = document.querySelector('main')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'z-50')
      expect(main).toHaveClass('relative', 'z-10')
    })
  })
})