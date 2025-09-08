import { render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import { HomePage } from '../HomePage'
import { StackPage } from '../StackPage'
import { PublicationsPage } from '../PublicationsPage'
import { it } from 'node:test'
import { it } from 'node:test'
import { it } from 'node:test'
import { describe } from 'node:test'
import { it } from 'node:test'
import { it } from 'node:test'
import { it } from 'node:test'
import { describe } from 'node:test'
import { it } from 'node:test'
import { it } from 'node:test'
import { it } from 'node:test'
import { beforeEach } from 'node:test'
import { describe } from 'node:test'
import { it } from 'node:test'
import { it } from 'node:test'
import { it } from 'node:test'
import { describe } from 'node:test'
import { afterEach } from 'node:test'
import { describe } from 'node:test'

describe('UI Cleanup Responsive Layout Tests', () => {
  // Mock window.matchMedia for responsive testing
  const mockMatchMedia = (matches: boolean, query: string = '(max-width: 768px)') => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((mediaQuery) => ({
        matches: mediaQuery === query ? matches : false,
        media: mediaQuery,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  }

  afterEach(() => {
    // Reset matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  describe('HomePage Responsive Layout', () => {
    it('should maintain proper mobile layout after section removal', () => {
      mockMatchMedia(true, '(max-width: 768px)')
      render(<HomePage />)
      
      // Should have responsive classes for mobile
      const heroSection = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="flex-col"]')
      expect(heroSection).toBeInTheDocument()
      
      // Should maintain proper spacing without removed sections
      const container = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="px-6"]')
      expect(container).toBeInTheDocument()
      
      // Office hours should still be present and properly styled
      expect(screen.getByRole('heading', { name: /office hours/i })).toBeInTheDocument()
      
      // Selected publications should still be present
      expect(screen.getByRole('heading', { name: /selected publications/i })).toBeInTheDocument()
    })

    it('should maintain proper tablet layout after section removal', () => {
      mockMatchMedia(true, '(max-width: 1024px)')
      render(<HomePage />)
      
      // Should maintain responsive structure
      const container = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="max-w-6xl"]')
      expect(container).toBeInTheDocument()
      
      // Should not have excessive spacing from removed sections
      const sections = container?.querySelectorAll('[class*="mb-16"], [class*="mt-12"]')
      expect(sections?.length).toBeLessThan(5) // Reasonable number of sections
    })

    it('should maintain proper desktop layout after section removal', () => {
      mockMatchMedia(false) // Desktop
      render(<HomePage />)
      
      // Should have desktop layout classes
      const heroSection = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="lg:flex-row"]')
      expect(heroSection).toBeInTheDocument()
      
      // Should maintain proper grid structure without removed sections
      const container = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="max-w-6xl"]')
      expect(container).toBeInTheDocument()
    })
  })

  describe('StackPage Responsive Layout', () => {
    const mockOnViewModel = vi.fn()

    beforeEach(() => {
      mockOnViewModel.mockClear()
    })

    it('should maintain proper mobile layout after section removal', () => {
      mockMatchMedia(true, '(max-width: 768px)')
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Should maintain header structure
      const header = screen.getByRole('heading', { name: /mathematical macroeconomics stack/i })
      expect(header).toBeInTheDocument()
      
      // Should have proper mobile spacing
      const container = header.closest('[class*="px-6"]')
      expect(container).toBeInTheDocument()
      
      // Filter section should be responsive
      const filterSection = screen.getByText(/filter:/i).closest('[class*="flex-wrap"]')
      expect(filterSection).toBeInTheDocument()
      
      // Models should be in responsive grid
      const modelsContainer = screen.getByText(/dsge model framework/i).closest('[class*="space-y-6"]')
      expect(modelsContainer).toBeInTheDocument()
    })

    it('should maintain proper tablet layout after section removal', () => {
      mockMatchMedia(true, '(max-width: 1024px)')
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Should maintain responsive grid for model metadata
      const modelElements = screen.getAllByText(/topics:/i)
      modelElements.forEach(element => {
        const gridContainer = element.closest('[class*="md:grid-cols-3"]')
        expect(gridContainer).toBeInTheDocument()
      })
    })

    it('should handle filter button wrapping on small screens', () => {
      mockMatchMedia(true, '(max-width: 480px)')
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Filter buttons should wrap properly
      const filterContainer = screen.getByText(/filter:/i).closest('[class*="flex-wrap"]')
      expect(filterContainer).toBeInTheDocument()
      expect(filterContainer).toHaveClass('flex-wrap')
      
      // All filter buttons should be present - look in the filter container specifically
      const filterButtons = within(filterContainer!).getAllByRole('button')
      expect(filterButtons.length).toBe(4) // All Models, DSGE, Growth Theory, New Keynesian
      
      // Verify specific filter buttons exist
      expect(within(filterContainer!).getByText(/all models/i)).toBeInTheDocument()
      expect(within(filterContainer!).getByText(/dsge/i)).toBeInTheDocument()
      expect(within(filterContainer!).getByText(/growth theory/i)).toBeInTheDocument()
      expect(within(filterContainer!).getByText(/new keynesian/i)).toBeInTheDocument()
    })
  })

  describe('PublicationsPage Responsive Layout', () => {
    it('should maintain proper mobile layout after section removal', () => {
      mockMatchMedia(true, '(max-width: 768px)')
      render(<PublicationsPage />)
      
      // Should have proper mobile container
      const container = screen.getByRole('main').querySelector('[class*="max-w-4xl"]')
      expect(container).toBeInTheDocument()
      
      // Filter buttons should wrap on mobile
      const filterContainer = screen.getByText(/all publications/i).closest('[class*="flex-wrap"]')
      expect(filterContainer).toBeInTheDocument()
      
      // Publications should maintain proper spacing
      const publications = screen.getAllByRole('listitem')
      expect(publications.length).toBeGreaterThan(0)
    })

    it('should handle long journal titles properly on mobile', () => {
      mockMatchMedia(true, '(max-width: 768px)')
      render(<PublicationsPage />)
      
      // Find publication with long journal title
      const longJournalPub = screen.getByText('American Economic Journal: Macroeconomics')
      const article = longJournalPub.closest('article')
      
      // Should maintain proper citation structure on mobile
      const citationContainer = longJournalPub.closest('[class*="ml-8"][class*="-indent-8"]')
      expect(citationContainer).toBeInTheDocument()
      
      // Metadata should be in separate container
      const statusBadge = article?.querySelector('[class*="bg-green-100"]')
      const metadataContainer = statusBadge?.closest('[class*="ml-8"][class*="mt-1"]')
      expect(metadataContainer).toBeInTheDocument()
      
      // Should have proper flex wrapping for metadata
      const flexContainer = statusBadge?.closest('[class*="flex-wrap"]')
      expect(flexContainer).toBeInTheDocument()
    })

    it('should maintain proper spacing between publication years on all screen sizes', () => {
      // Test multiple screen sizes
      const screenSizes = [
        { matches: true, query: '(max-width: 480px)' }, // Mobile
        { matches: true, query: '(max-width: 768px)' }, // Tablet
        { matches: false, query: '(min-width: 1024px)' } // Desktop
      ]
      
      screenSizes.forEach(({ matches, query }) => {
        mockMatchMedia(matches, query)
        render(<PublicationsPage />)
        
        // Should have year headers with proper spacing
        const yearHeaders = screen.getAllByRole('heading', { level: 2 })
        expect(yearHeaders.length).toBeGreaterThan(0)
        
        yearHeaders.forEach(header => {
          // Each year section should have proper margin
          const yearSection = header.closest('[class*="mb-12"]')
          expect(yearSection).toBeInTheDocument()
        })
      })
    })
  })

  describe('Cross-Component Responsive Consistency', () => {
    it('should maintain consistent container widths across all components', () => {
      const mockOnViewModel = vi.fn()
      
      // Test HomePage
      render(<HomePage />)
      const homeContainer = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="max-w-6xl"]')
      expect(homeContainer).toBeInTheDocument()
      
      // Test StackPage
      render(<StackPage onViewModel={mockOnViewModel} />)
      const stackContainer = screen.getByRole('heading', { name: /mathematical macroeconomics stack/i }).closest('[class*="max-w-6xl"]')
      expect(stackContainer).toBeInTheDocument()
      
      // Test PublicationsPage (uses max-w-4xl for better readability)
      render(<PublicationsPage />)
      const pubContainer = screen.getByRole('main').querySelector('[class*="max-w-4xl"]')
      expect(pubContainer).toBeInTheDocument()
    })

    it('should maintain consistent padding across all components', () => {
      const mockOnViewModel = vi.fn()
      
      // All components should use px-6 for horizontal padding
      render(<HomePage />)
      const homeMain = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="px-6"]')
      expect(homeMain).toBeInTheDocument()
      
      render(<StackPage onViewModel={mockOnViewModel} />)
      const stackMain = screen.getByRole('heading', { name: /mathematical macroeconomics stack/i }).closest('[class*="px-6"]')
      expect(stackMain).toBeInTheDocument()
      
      render(<PublicationsPage />)
      const pubMain = screen.getByRole('main')
      expect(pubMain).toHaveClass('px-6')
    })

    it('should handle text wrapping consistently across components', () => {
      mockMatchMedia(true, '(max-width: 480px)')
      const mockOnViewModel = vi.fn()
      
      // Test text wrapping on small screens
      render(<HomePage />)
      const homeTitle = screen.getByRole('heading', { name: /dr\. academic researcher/i })
      expect(homeTitle).toHaveClass('leading-tight')
      
      render(<StackPage onViewModel={mockOnViewModel} />)
      const stackTitle = screen.getByRole('heading', { name: /mathematical macroeconomics stack/i })
      expect(stackTitle).toBeInTheDocument()
      
      render(<PublicationsPage />)
      const pubTitle = screen.getByRole('heading', { name: /^publications$/i })
      expect(pubTitle).toHaveClass('leading-tight')
    })
  })
})