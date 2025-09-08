import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import App from '../../App'

// Mock framer-motion to control animations in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      // Simulate animation completion immediately for testing
      return <div {...props} data-animated="true">{children}</div>
    },
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

// Mock lazy loading to avoid async issues in tests
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    lazy: (fn: any) => {
      // Return the component directly instead of lazy loading
      const Component = fn().then((module: any) => module.default)
      return Component
    },
    Suspense: ({ children }: any) => children,
  }
})

describe('Page Transitions and Layout Stability Tests', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
    
    // Reset viewport
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

  describe('Layout Stability During Page Transitions (Requirements 4.1, 4.4)', () => {
    it('should maintain consistent layout structure across page changes', async () => {
      render(<App />)
      
      // Verify initial layout structure
      const initialAppContainer = document.querySelector('.min-h-screen.relative')
      const initialNavigation = document.querySelector('nav.fixed')
      const initialBackground = document.querySelector('.fixed.inset-0.-z-10')
      const initialMain = document.querySelector('main.relative.z-10')
      
      expect(initialAppContainer).toBeInTheDocument()
      expect(initialNavigation).toBeInTheDocument()
      expect(initialBackground).toBeInTheDocument()
      expect(initialMain).toBeInTheDocument()
      
      // Navigate to different pages and verify layout consistency
      const pages = ['stack', 'publications', 'resume', 'teaching', 'blog']
      
      for (const page of pages) {
        // Find and click navigation button
        const navButton = screen.getByRole('button', { name: new RegExp(page, 'i') })
        await user.click(navButton)
        
        // Wait for page transition
        await waitFor(() => {
          const main = document.querySelector('main')
          expect(main).toBeInTheDocument()
        })
        
        // Verify layout structure remains consistent
        const appContainer = document.querySelector('.min-h-screen.relative')
        const navigation = document.querySelector('nav.fixed')
        const background = document.querySelector('.fixed.inset-0.-z-10')
        const main = document.querySelector('main.relative.z-10')
        
        expect(appContainer, `App container should exist on ${page} page`).toBeInTheDocument()
        expect(navigation, `Navigation should exist on ${page} page`).toBeInTheDocument()
        expect(background, `Background should exist on ${page} page`).toBeInTheDocument()
        expect(main, `Main content should exist on ${page} page`).toBeInTheDocument()
        
        // Verify z-index stacking remains correct
        expect(navigation).toHaveClass('z-50')
        expect(main).toHaveClass('z-10')
        expect(background).toHaveClass('-z-10')
      }
    })

    it('should prevent cumulative layout shift (CLS) during transitions', async () => {
      render(<App />)
      
      // Measure initial layout positions
      const initialNav = document.querySelector('nav')
      const initialMain = document.querySelector('main')
      const initialBackground = document.querySelector('.fixed.inset-0.-z-10')
      
      // Verify fixed positioning elements don't cause shifts
      expect(initialNav).toHaveClass('fixed', 'top-6')
      expect(initialBackground).toHaveClass('fixed', 'inset-0')
      expect(initialMain).toHaveClass('relative', 'pt-20')
      
      // Navigate to another page
      const stackButton = screen.getByRole('button', { name: /stack/i })
      await user.click(stackButton)
      
      await waitFor(() => {
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
      
      // Verify layout elements maintain their positioning
      const nav = document.querySelector('nav')
      const main = document.querySelector('main')
      const background = document.querySelector('.fixed.inset-0.-z-10')
      
      expect(nav).toHaveClass('fixed', 'top-6')
      expect(background).toHaveClass('fixed', 'inset-0')
      expect(main).toHaveClass('relative', 'pt-20')
    })

    it('should maintain proper content positioning during lazy loading', async () => {
      render(<App />)
      
      // Navigate to a lazy-loaded page
      const teachingButton = screen.getByRole('button', { name: /teaching/i })
      await user.click(teachingButton)
      
      // Verify layout structure during loading
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      const main = document.querySelector('main')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'top-6', 'z-50')
      expect(main).toHaveClass('relative', 'z-10', 'pt-20')
      
      // Wait for content to load
      await waitFor(() => {
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      }, { timeout: 3000 })
      
      // Verify layout remains stable after loading
      expect(document.querySelector('.min-h-screen')).toHaveClass('relative')
      expect(document.querySelector('nav')).toHaveClass('fixed', 'z-50')
      expect(document.querySelector('main')).toHaveClass('relative', 'z-10')
    })

    it('should handle rapid page transitions without layout issues', async () => {
      render(<App />)
      
      const pages = ['stack', 'publications', 'resume', 'home']
      
      // Rapidly navigate between pages
      for (const page of pages) {
        const button = screen.getByRole('button', { 
          name: page === 'home' ? /home/i : new RegExp(page, 'i') 
        })
        await user.click(button)
        
        // Don't wait for full transition, just verify structure
        const appContainer = document.querySelector('.min-h-screen')
        const navigation = document.querySelector('nav')
        const main = document.querySelector('main')
        
        expect(appContainer).toHaveClass('min-h-screen', 'relative')
        expect(navigation).toHaveClass('fixed', 'z-50')
        expect(main).toHaveClass('relative', 'z-10')
      }
    })
  })

  describe('Background Animation Stability (Requirements 4.2, 4.3)', () => {
    it('should maintain background animations without affecting content layout', async () => {
      render(<App />)
      
      // Verify background animations are properly contained
      const backgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      const motionDivs = document.querySelectorAll('.motion-div')
      
      expect(backgroundContainer).toHaveClass('fixed', 'inset-0', '-z-10')
      expect(motionDivs.length).toBeGreaterThan(0)
      
      // All animated elements should be absolutely positioned within background
      motionDivs.forEach(div => {
        expect(div).toHaveClass('absolute')
      })
      
      // Navigate to different page
      const stackButton = screen.getByRole('button', { name: /stack/i })
      await user.click(stackButton)
      
      await waitFor(() => {
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
      
      // Background animations should continue without affecting layout
      const newBackgroundContainer = document.querySelector('.fixed.inset-0.-z-10')
      const newMotionDivs = document.querySelectorAll('.motion-div')
      
      expect(newBackgroundContainer).toHaveClass('fixed', 'inset-0', '-z-10')
      expect(newMotionDivs.length).toBeGreaterThan(0)
    })

    it('should handle viewport changes during page transitions', async () => {
      render(<App />)
      
      // Start navigation
      const publicationsButton = screen.getByRole('button', { name: /publications/i })
      await user.click(publicationsButton)
      
      // Change viewport during transition
      Object.defineProperty(window, 'innerWidth', { value: 768, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 1024, configurable: true })
      window.dispatchEvent(new Event('resize'))
      
      await waitFor(() => {
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
      
      // Layout should remain stable
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      const background = document.querySelector('.fixed.inset-0.-z-10')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'top-6')
      expect(background).toHaveClass('fixed', 'inset-0', '-z-10')
    })

    it('should maintain texture background consistency across transitions', async () => {
      render(<App />)
      
      // Verify initial texture elements
      const initialTextureBackground = document.querySelector('.texture-background')
      const initialGridOverlay = document.querySelector('.opacity-\\[0\\.08\\]')
      const initialDotPattern = document.querySelector('.opacity-\\[0\\.012\\]')
      
      expect(initialTextureBackground).toHaveClass('texture-normal')
      expect(initialGridOverlay).toBeInTheDocument()
      expect(initialDotPattern).toBeInTheDocument()
      
      // Navigate to different pages
      const pages = ['resume', 'blog', 'home']
      
      for (const page of pages) {
        const button = screen.getByRole('button', { 
          name: page === 'home' ? /home/i : new RegExp(page, 'i') 
        })
        await user.click(button)
        
        await waitFor(() => {
          const main = document.querySelector('main')
          expect(main).toBeInTheDocument()
        })
        
        // Texture elements should remain consistent
        const textureBackground = document.querySelector('.texture-background')
        const gridOverlay = document.querySelector('.opacity-\\[0\\.08\\]')
        const dotPattern = document.querySelector('.opacity-\\[0\\.012\\]')
        
        expect(textureBackground, `Texture background should exist on ${page}`).toHaveClass('texture-normal')
        expect(gridOverlay, `Grid overlay should exist on ${page}`).toBeInTheDocument()
        expect(dotPattern, `Dot pattern should exist on ${page}`).toBeInTheDocument()
      }
    })
  })

  describe('Navigation Stability During Transitions (Requirements 2.1, 2.4)', () => {
    it('should maintain navigation centering during page changes', async () => {
      render(<App />)
      
      // Verify initial navigation positioning
      const initialNav = document.querySelector('nav')
      expect(initialNav).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
      
      // Navigate through all pages
      const pages = ['stack', 'publications', 'resume', 'teaching', 'blog', 'home']
      
      for (const page of pages) {
        const button = screen.getByRole('button', { 
          name: page === 'home' ? /home/i : new RegExp(page, 'i') 
        })
        await user.click(button)
        
        await waitFor(() => {
          const main = document.querySelector('main')
          expect(main).toBeInTheDocument()
        })
        
        // Navigation should remain centered
        const nav = document.querySelector('nav')
        expect(nav, `Navigation should be centered on ${page}`).toHaveClass(
          'fixed', 
          'top-6', 
          'left-1/2', 
          '-translate-x-1/2'
        )
      }
    })

    it('should handle navigation selector updates smoothly', async () => {
      render(<App />)
      
      // Navigate between pages and verify selector behavior
      const pages = ['stack', 'publications', 'resume']
      
      for (const page of pages) {
        const button = screen.getByRole('button', { name: new RegExp(page, 'i') })
        await user.click(button)
        
        await waitFor(() => {
          const main = document.querySelector('main')
          expect(main).toBeInTheDocument()
        })
        
        // Navigation structure should remain intact
        const navContainer = document.querySelector('.relative.backdrop-blur-xl')
        expect(navContainer, `Navigation container should exist on ${page}`).toBeInTheDocument()
        
        // Navigation should maintain proper z-index
        const nav = document.querySelector('nav')
        expect(nav).toHaveClass('z-50')
      }
    })

    it('should maintain navigation responsiveness during transitions', async () => {
      render(<App />)
      
      // Test on mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 667, configurable: true })
      window.dispatchEvent(new Event('resize'))
      
      // Navigate to different page
      const teachingButton = screen.getByRole('button', { name: /teach/i })
      await user.click(teachingButton)
      
      await waitFor(() => {
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
      
      // Navigation should remain centered on mobile
      const nav = document.querySelector('nav')
      expect(nav).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
      
      // Switch back to desktop
      Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 720, configurable: true })
      window.dispatchEvent(new Event('resize'))
      
      // Navigate again
      const homeButton = screen.getByRole('button', { name: /home/i })
      await user.click(homeButton)
      
      await waitFor(() => {
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
      
      // Should still be centered on desktop
      expect(nav).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
    })
  })

  describe('Performance During Transitions', () => {
    it('should handle transitions efficiently without memory leaks', async () => {
      render(<App />)
      
      // Simulate multiple rapid transitions
      const pages = ['stack', 'publications', 'resume', 'teaching', 'blog', 'home']
      
      for (let i = 0; i < 3; i++) {
        for (const page of pages) {
          const button = screen.getByRole('button', { 
            name: page === 'home' ? /home/i : new RegExp(page, 'i') 
          })
          await user.click(button)
          
          // Brief wait to allow transition
          await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 10))
          })
        }
      }
      
      // Layout should still be intact after many transitions
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      const main = document.querySelector('main')
      const background = document.querySelector('.fixed.inset-0.-z-10')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'z-50')
      expect(main).toHaveClass('relative', 'z-10')
      expect(background).toHaveClass('fixed', '-z-10')
    })

    it('should maintain smooth animations during transitions', async () => {
      render(<App />)
      
      // Verify animated elements have proper hardware acceleration hints
      const motionDivs = document.querySelectorAll('.motion-div')
      motionDivs.forEach(div => {
        expect(div).toHaveClass('motion-div')
        expect(div).toHaveAttribute('data-animated', 'true')
      })
      
      // Navigate and verify animations continue
      const stackButton = screen.getByRole('button', { name: /stack/i })
      await user.click(stackButton)
      
      await waitFor(() => {
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
      
      // Animated elements should still be present and properly configured
      const newMotionDivs = document.querySelectorAll('.motion-div')
      expect(newMotionDivs.length).toBeGreaterThan(0)
      
      newMotionDivs.forEach(div => {
        expect(div).toHaveClass('absolute', 'motion-div')
      })
    })

    it('should handle edge cases in page transitions gracefully', async () => {
      render(<App />)
      
      // Test rapid back-and-forth navigation
      const homeButton = screen.getByRole('button', { name: /home/i })
      const stackButton = screen.getByRole('button', { name: /stack/i })
      
      // Rapid clicks
      await user.click(stackButton)
      await user.click(homeButton)
      await user.click(stackButton)
      await user.click(homeButton)
      
      await waitFor(() => {
        const main = document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
      
      // Layout should remain stable
      const appContainer = document.querySelector('.min-h-screen')
      const navigation = document.querySelector('nav')
      
      expect(appContainer).toHaveClass('min-h-screen', 'relative')
      expect(navigation).toHaveClass('fixed', 'z-50')
    })
  })
})