import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Navigation } from '../Navigation'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  X: () => <div data-testid="x-icon" />,
}))

describe('Navigation Centering Tests', () => {
  let user: ReturnType<typeof userEvent.setup>
  const mockOnPageChange = vi.fn()

  beforeEach(() => {
    user = userEvent.setup()
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

  describe('Navigation Positioning (Requirements 2.1, 2.2)', () => {
    it('should center navigation horizontally at top of page', () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      const navigation = document.querySelector('nav')
      expect(navigation).toBeInTheDocument()
      expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2', 'z-50')
    })

    it('should maintain consistent positioning across all screen sizes', () => {
      const screenSizes = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 414, height: 896, name: 'mobile-large' },
        { width: 768, height: 1024, name: 'tablet-portrait' },
        { width: 1024, height: 768, name: 'tablet-landscape' },
        { width: 1280, height: 720, name: 'desktop' },
        { width: 1366, height: 768, name: 'laptop' },
        { width: 1920, height: 1080, name: 'desktop-large' },
        { width: 2560, height: 1440, name: 'ultrawide' },
      ]

      screenSizes.forEach(({ width, height, name }) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        // Trigger resize event to update responsive behavior
        window.dispatchEvent(new Event('resize'))
        
        render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
        
        const navigation = document.querySelector('nav')
        expect(navigation, `Navigation should be centered on ${name} (${width}x${height})`).toHaveClass(
          'fixed',
          'top-6',
          'left-1/2',
          '-translate-x-1/2',
          'z-50'
        )
        
        // Verify navigation container maintains proper structure
        const navContainer = navigation?.querySelector('.relative.backdrop-blur-xl.rounded-full')
        expect(navContainer, `Navigation container should exist on ${name}`).toBeInTheDocument()
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })

    it('should have proper backdrop blur and glass morphism effects', () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      const navContainer = document.querySelector('.relative.backdrop-blur-xl.rounded-full')
      expect(navContainer).toBeInTheDocument()
      expect(navContainer).toHaveClass(
        'relative',
        'backdrop-blur-xl',
        'rounded-full',
        'shadow-2xl',
        'overflow-hidden'
      )
      
      // Check for glass reflection effect
      const glassEffect = navContainer?.querySelector('.absolute.inset-0.rounded-full.pointer-events-none')
      expect(glassEffect).toBeInTheDocument()
    })

    it('should maintain z-index stacking order', () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('z-50')
      
      // Navigation should be above other content
      const navContainer = navigation?.querySelector('.relative')
      expect(navContainer).toBeInTheDocument()
    })
  })

  describe('Responsive Navigation Behavior (Requirements 2.2, 2.4)', () => {
    it('should adapt navigation items for mobile screens', async () => {
      // Set mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 667, configurable: true })
      
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      // Wait for responsive behavior to take effect
      await waitFor(() => {
        const navigation = document.querySelector('nav')
        expect(navigation).toBeInTheDocument()
      })
      
      // Navigation should still be centered
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
      
      // Check that navigation items are present (mobile labels may be different)
      const navButtons = document.querySelectorAll('nav button')
      expect(navButtons.length).toBeGreaterThan(0)
    })

    it('should handle tablet landscape orientation correctly', () => {
      // Set tablet landscape viewport
      Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true })
      
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
      
      // Verify navigation container adapts to landscape
      const navContainer = navigation?.querySelector('.relative.backdrop-blur-xl')
      expect(navContainer).toBeInTheDocument()
    })

    it('should maintain centering during viewport orientation changes', async () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      // Start in portrait
      Object.defineProperty(window, 'innerWidth', { value: 768, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 1024, configurable: true })
      window.dispatchEvent(new Event('resize'))
      
      await waitFor(() => {
        const navigation = document.querySelector('nav')
        expect(navigation).toHaveClass('left-1/2', '-translate-x-1/2')
      })
      
      // Change to landscape
      Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true })
      window.dispatchEvent(new Event('resize'))
      
      await waitFor(() => {
        const navigation = document.querySelector('nav')
        expect(navigation).toHaveClass('left-1/2', '-translate-x-1/2')
      })
    })

    it('should handle extreme viewport sizes gracefully', () => {
      const extremeSizes = [
        { width: 320, height: 568, name: 'very-small-mobile' },
        { width: 3840, height: 2160, name: '4k-display' },
        { width: 2560, height: 1080, name: 'ultrawide-21-9' },
      ]

      extremeSizes.forEach(({ width, height, name }) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
        
        const navigation = document.querySelector('nav')
        expect(navigation, `Navigation should be centered on ${name}`).toHaveClass(
          'fixed',
          'top-6',
          'left-1/2',
          '-translate-x-1/2'
        )
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })
  })

  describe('Navigation Selector Positioning (Requirements 2.4)', () => {
    it('should position selector correctly for each navigation item', async () => {
      const pages = ['home', 'stack', 'publications', 'resume', 'teaching', 'blog']
      
      for (const page of pages) {
        render(<Navigation currentPage={page} onPageChange={mockOnPageChange} />)
        
        // Wait for navigation to render
        await waitFor(() => {
          const navigation = document.querySelector('nav')
          expect(navigation).toBeInTheDocument()
        })
        
        // Check that navigation items are present
        const navButtons = document.querySelectorAll('nav button')
        expect(navButtons.length).toBeGreaterThan(0)
        
        // Verify navigation container structure for selector positioning
        const navContainer = document.querySelector('.relative.backdrop-blur-xl')
        expect(navContainer).toBeInTheDocument()
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      }
    })

    it('should handle selector animation smoothly', async () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      // Wait for initial render
      await waitFor(() => {
        const navigation = document.querySelector('nav')
        expect(navigation).toBeInTheDocument()
      })
      
      // Find navigation buttons
      const navButtons = document.querySelectorAll('nav button')
      expect(navButtons.length).toBeGreaterThan(0)
      
      // Click on a different navigation item
      if (navButtons[1]) {
        await user.click(navButtons[1])
        expect(mockOnPageChange).toHaveBeenCalled()
      }
    })

    it('should maintain selector accuracy across different screen sizes', () => {
      const screenSizes = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1280, height: 720 },  // Desktop
      ]

      screenSizes.forEach(({ width, height }) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
        
        // Verify navigation structure for selector positioning
        const navigation = document.querySelector('nav')
        const navContainer = navigation?.querySelector('.relative.backdrop-blur-xl')
        
        expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
        expect(navContainer).toBeInTheDocument()
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })
  })

  describe('Search Mode Centering', () => {
    it('should maintain centering when switching to search mode', async () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      // Find and click search button
      const searchButton = screen.getByRole('button', { name: /search/i })
      await user.click(searchButton)
      
      // Navigation should still be centered
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
      
      // Search input should be visible
      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText(/search academic content/i)
        expect(searchInput).toBeInTheDocument()
      })
    })

    it('should maintain centering when exiting search mode', async () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      // Enter search mode
      const searchButton = screen.getByRole('button', { name: /search/i })
      await user.click(searchButton)
      
      // Exit search mode
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      
      // Navigation should still be centered
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
    })

    it('should handle search mode centering across different screen sizes', async () => {
      const screenSizes = [
        { width: 375, height: 667 },
        { width: 1280, height: 720 },
      ]

      for (const { width, height } of screenSizes) {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        
        render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
        
        // Enter search mode
        const searchButton = screen.getByRole('button', { name: /search/i })
        await user.click(searchButton)
        
        // Navigation should remain centered
        const navigation = document.querySelector('nav')
        expect(navigation).toHaveClass('fixed', 'top-6', 'left-1/2', '-translate-x-1/2')
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      }
    })
  })

  describe('Cross-Browser Centering Compatibility', () => {
    it('should use CSS transforms for reliable centering', () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('left-1/2', '-translate-x-1/2')
      
      // This approach works across all modern browsers
      // left-1/2 sets left: 50%
      // -translate-x-1/2 sets transform: translateX(-50%)
    })

    it('should maintain centering with backdrop-filter support', () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      const navContainer = document.querySelector('.backdrop-blur-xl')
      expect(navContainer).toBeInTheDocument()
      
      // Navigation should still be centered even with backdrop effects
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
    })

    it('should handle centering with different font sizes and zoom levels', () => {
      // Simulate different zoom levels by changing base font size
      const zoomLevels = [0.8, 1.0, 1.2, 1.5]
      
      zoomLevels.forEach(zoom => {
        // Mock different zoom by changing viewport
        const baseWidth = 1280
        const baseHeight = 720
        Object.defineProperty(window, 'innerWidth', { 
          value: baseWidth / zoom, 
          configurable: true 
        })
        Object.defineProperty(window, 'innerHeight', { 
          value: baseHeight / zoom, 
          configurable: true 
        })
        
        render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
        
        const navigation = document.querySelector('nav')
        expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
        
        // Clean up for next iteration
        document.body.innerHTML = ''
      })
    })
  })

  describe('Performance and Centering Stability', () => {
    it('should maintain centering during rapid viewport changes', () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      // Simulate rapid viewport changes
      const changes = [
        { width: 375, height: 667 },
        { width: 1280, height: 720 },
        { width: 768, height: 1024 },
        { width: 1920, height: 1080 },
      ]
      
      changes.forEach(({ width, height }) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: height, configurable: true })
        window.dispatchEvent(new Event('resize'))
        
        const navigation = document.querySelector('nav')
        expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
      })
    })

    it('should maintain centering with hardware acceleration', () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      const navigation = document.querySelector('nav')
      const navContainer = navigation?.querySelector('.relative.backdrop-blur-xl')
      
      expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
      expect(navContainer).toBeInTheDocument()
      
      // Hardware acceleration should not affect centering
      expect(navigation).toHaveClass('z-50')
    })

    it('should handle centering with animation states', async () => {
      render(<Navigation currentPage="home" onPageChange={mockOnPageChange} />)
      
      // Navigation should be centered during initial animation
      const navigation = document.querySelector('nav')
      expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
      
      // Interact with navigation to trigger animations
      const navButtons = document.querySelectorAll('nav button')
      if (navButtons[0]) {
        fireEvent.mouseEnter(navButtons[0])
        fireEvent.mouseLeave(navButtons[0])
        
        // Should still be centered after hover animations
        expect(navigation).toHaveClass('fixed', 'left-1/2', '-translate-x-1/2')
      }
    })
  })
})