import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { HomePage } from '../HomePage'
import { StackPage } from '../StackPage'
import { PublicationsPage } from '../PublicationsPage'

describe('UI Cleanup Comprehensive Tests', () => {
  describe('Removed Sections Validation', () => {
    describe('HomePage - Removed Sections', () => {
      it('should not display upcoming events section', () => {
        render(<HomePage />)
        
        // Should not find any upcoming events content
        expect(screen.queryByText(/upcoming events/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/event/i)).not.toBeInTheDocument()
        
        // Should not find event-related headings
        expect(screen.queryByRole('heading', { name: /upcoming events/i })).not.toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: /events/i })).not.toBeInTheDocument()
      })

      it('should not display recognition section', () => {
        render(<HomePage />)
        
        // Should not find any recognition content
        expect(screen.queryByText(/recognition/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/recent recognition/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/award/i)).not.toBeInTheDocument()
        
        // Should not find recognition-related headings
        expect(screen.queryByRole('heading', { name: /recognition/i })).not.toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: /recent recognition/i })).not.toBeInTheDocument()
      })

      it('should maintain office hours section', () => {
        render(<HomePage />)
        
        // Should still have office hours
        expect(screen.getByRole('heading', { name: /office hours/i })).toBeInTheDocument()
        expect(screen.getByText(/monday/i)).toBeInTheDocument()
        expect(screen.getByText(/wednesday/i)).toBeInTheDocument()
        expect(screen.getByText(/friday/i)).toBeInTheDocument()
      })

      it('should maintain selected publications section', () => {
        render(<HomePage />)
        
        // Should still have selected publications
        expect(screen.getByRole('heading', { name: /selected publications/i })).toBeInTheDocument()
        
        // Look for specific publication titles in the publications section
        const publicationsSection = screen.getByRole('heading', { name: /selected publications/i }).closest('div')
        expect(within(publicationsSection!).getByText(/dynamic equilibrium models in modern macroeconomics/i)).toBeInTheDocument()
        expect(within(publicationsSection!).getByText(/stochastic growth models/i)).toBeInTheDocument()
      })
    })

    describe('StackPage - Removed Sections', () => {
      const mockOnViewModel = vi.fn()

      beforeEach(() => {
        mockOnViewModel.mockClear()
      })

      it('should not display statistics in header', () => {
        render(<StackPage onViewModel={mockOnViewModel} />)
        
        // Should not find statistics content in header area
        const header = screen.getByRole('heading', { name: /mathematical macroeconomics stack/i }).closest('div')
        expect(within(header!).queryByText(/6 model sets/i)).not.toBeInTheDocument()
        expect(within(header!).queryByText(/1\.2k\+ downloads/i)).not.toBeInTheDocument()
        expect(within(header!).queryByText(/259 pages/i)).not.toBeInTheDocument()
        
        // Should not find these specific statistics anywhere
        expect(screen.queryByText(/6 model sets/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/1\.2k\+ downloads/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/259 pages/i)).not.toBeInTheDocument()
      })

      it('should not display custom modeling services section', () => {
        render(<StackPage onViewModel={mockOnViewModel} />)
        
        // Should not find custom services content
        expect(screen.queryByText(/custom modeling services/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/custom services/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/modeling services/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/contact.*service/i)).not.toBeInTheDocument()
      })

      it('should maintain core stack functionality', () => {
        render(<StackPage onViewModel={mockOnViewModel} />)
        
        // Should still have main header
        expect(screen.getByRole('heading', { name: /mathematical macroeconomics stack/i })).toBeInTheDocument()
        
        // Should still have filter options
        expect(screen.getByText(/filter:/i)).toBeInTheDocument()
        expect(screen.getByText(/all models/i)).toBeInTheDocument()
        
        // Should still have model listings
        expect(screen.getByText(/dsge model framework/i)).toBeInTheDocument()
        expect(screen.getByText(/growth theory toolkit/i)).toBeInTheDocument()
        
        // Should still have view model buttons
        const viewButtons = screen.getAllByText(/view model/i)
        expect(viewButtons.length).toBeGreaterThan(0)
      })
    })

    describe('PublicationsPage - Removed Sections', () => {
      it('should not display statistics in header', () => {
        render(<PublicationsPage />)
        
        // Should not find statistics content
        expect(screen.queryByText(/15\+ publications/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/300\+ citations/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/h-index: 12/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/h-index/i)).not.toBeInTheDocument()
      })

      it('should not display collaboration opportunities section', () => {
        render(<PublicationsPage />)
        
        // Should not find collaboration content
        expect(screen.queryByText(/collaboration opportunities/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/collaboration/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/opportunities/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/contact.*collaboration/i)).not.toBeInTheDocument()
      })

      it('should maintain publication listings and functionality', () => {
        render(<PublicationsPage />)
        
        // Should still have main header
        expect(screen.getByRole('heading', { name: /^publications$/i })).toBeInTheDocument()
        
        // Should still have filter options
        expect(screen.getByText(/all publications/i)).toBeInTheDocument()
        expect(screen.getByText(/journal articles/i)).toBeInTheDocument()
        
        // Should still have publication entries
        expect(screen.getByText(/dynamic equilibrium models in modern macroeconomics/i)).toBeInTheDocument()
        expect(screen.getByText(/stochastic growth models/i)).toBeInTheDocument()
      })
    })
  })

  describe('Publication Citation Layout Tests', () => {
    it('should handle short journal titles correctly', () => {
      render(<PublicationsPage />)
      
      // Find publication with short journal title
      const shortJournalPub = screen.getByText('Economic Review')
      const article = shortJournalPub.closest('article')
      
      // Verify proper layout structure
      expect(article).toBeInTheDocument()
      
      // Status badge should be in separate metadata container
      const statusBadge = article?.querySelector('[class*="bg-green-100"]')
      expect(statusBadge).toBeInTheDocument()
      expect(statusBadge).toHaveTextContent('Published')
      
      // Citation info should be in same flex container as status
      const citationInfo = article?.querySelector('[class*="text-gray-600"]')
      expect(citationInfo).toBeInTheDocument()
      expect(citationInfo).toHaveTextContent('Cited 28 times')
      
      // Both should be in flex container with proper alignment
      const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"]')
      expect(flexContainer).toContain(citationInfo)
      expect(flexContainer).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-2')
    })

    it('should handle medium journal titles correctly', () => {
      render(<PublicationsPage />)
      
      // Find publication with medium journal title
      const mediumJournalPub = screen.getByText('Journal of Economic Theory')
      const article = mediumJournalPub.closest('article')
      
      // Verify proper layout structure
      expect(article).toBeInTheDocument()
      
      // Status badge should be properly positioned
      const statusBadge = article?.querySelector('[class*="bg-green-100"]')
      expect(statusBadge).toBeInTheDocument()
      
      // Citation info should be properly positioned
      const citationInfo = article?.querySelector('[class*="text-gray-600"]')
      expect(citationInfo).toBeInTheDocument()
      expect(citationInfo).toHaveTextContent('Cited 12 times')
      
      // Should maintain consistent structure
      const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"]')
      expect(flexContainer).toContain(citationInfo)
    })

    it('should handle long journal titles correctly', () => {
      render(<PublicationsPage />)
      
      // Find publication with long journal title
      const longJournalPub = screen.getByText('American Economic Journal: Macroeconomics')
      const article = longJournalPub.closest('article')
      
      // Verify proper layout structure
      expect(article).toBeInTheDocument()
      
      // Status badge should be in separate metadata line
      const statusBadge = article?.querySelector('[class*="bg-green-100"]')
      expect(statusBadge).toBeInTheDocument()
      
      // Citation info should be properly aligned
      const citationInfo = article?.querySelector('[class*="text-gray-600"]')
      expect(citationInfo).toBeInTheDocument()
      expect(citationInfo).toHaveTextContent('Cited 19 times')
      
      // Metadata should be separated from journal title
      const metadataContainer = statusBadge?.closest('[class*="ml-8"][class*="mt-1"]')
      expect(metadataContainer).toBeInTheDocument()
      
      // Journal title should be in different container
      const journalContainer = longJournalPub.closest('[class*="ml-8"][class*="-indent-8"]')
      expect(journalContainer).not.toBe(metadataContainer)
    })

    it('should maintain consistent formatting across all journal title lengths', () => {
      render(<PublicationsPage />)
      
      const testCases = [
        { journal: 'Economic Review', citations: 28 },
        { journal: 'Journal of Economic Theory', citations: 12 },
        { journal: 'American Economic Journal: Macroeconomics', citations: 19 },
        { journal: 'Review of Economic Dynamics', citations: 34 },
        { journal: 'Journal of Monetary Economics', citations: 41 }
      ]
      
      testCases.forEach(({ journal, citations }) => {
        const journalElement = screen.getByText(journal)
        const article = journalElement.closest('article')
        
        // Each should have consistent status badge styling
        const statusBadge = article?.querySelector('[class*="bg-green-100"]')
        expect(statusBadge).toBeInTheDocument()
        expect(statusBadge).toHaveClass('inline-block', 'px-2', 'py-0.5', 'rounded', 'text-xs')
        
        // Each should have consistent citation styling
        const citationInfo = article?.querySelector('[class*="text-gray-600"]')
        expect(citationInfo).toBeInTheDocument()
        expect(citationInfo).toHaveClass('text-sm', 'text-gray-600')
        expect(citationInfo).toHaveTextContent(`Cited ${citations} times`)
        
        // Each should have consistent container structure
        const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"]')
        expect(flexContainer).toBeInTheDocument()
        expect(flexContainer).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-2')
      })
    })

    it('should handle publications with different statuses consistently', () => {
      render(<PublicationsPage />)
      
      const statusTypes = [
        { text: 'Published', class: 'bg-green-100' },
        { text: 'Under Review', class: 'bg-yellow-100' },
        { text: 'Working Paper', class: 'bg-blue-100' }
      ]
      
      statusTypes.forEach(({ text, class: statusClass }) => {
        const statusElements = screen.getAllByText(text)
        
        // Filter to get only publication status badges
        const publicationStatusBadges = statusElements.filter(element => 
          element.classList.contains('inline-block') && 
          element.classList.contains('px-2')
        )
        
        expect(publicationStatusBadges.length).toBeGreaterThan(0)
        
        publicationStatusBadges.forEach((badge) => {
          expect(badge).toHaveClass('inline-block', 'px-2', 'py-0.5', 'rounded', 'text-xs')
          expect(badge).toHaveClass(statusClass)
          
          const flexContainer = badge.closest('[class*="flex"][class*="items-center"]')
          expect(flexContainer).toBeInTheDocument()
        })
      })
    })
  })

  describe('Responsive Layout Tests', () => {
    // Mock window.matchMedia for responsive testing
    const mockMatchMedia = (matches: boolean) => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })
    }

    it('should maintain proper spacing on HomePage after section removal', () => {
      render(<HomePage />)
      
      // Verify main sections are properly spaced
      const heroSection = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('div')
      const officeHoursSection = screen.getByRole('heading', { name: /office hours/i }).closest('div')
      const publicationsSection = screen.getByRole('heading', { name: /selected publications/i }).closest('div')
      
      expect(heroSection).toBeInTheDocument()
      expect(officeHoursSection).toBeInTheDocument()
      expect(publicationsSection).toBeInTheDocument()
      
      // Verify no large gaps where removed sections were
      const container = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="max-w-6xl"]')
      expect(container).toBeInTheDocument()
      
      // Should not have excessive spacing classes that would indicate missing content
      const spacingElements = container?.querySelectorAll('[class*="mb-16"], [class*="mt-16"], [class*="py-16"]')
      expect(spacingElements?.length).toBeLessThan(5) // Reasonable number of large spacing elements
    })

    it('should maintain proper layout on StackPage after section removal', () => {
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Verify main sections are present and properly spaced
      const header = screen.getByRole('heading', { name: /mathematical macroeconomics stack/i })
      const filterSection = screen.getByText(/filter:/i)
      const modelsSection = screen.getByText(/dsge model framework/i)
      
      expect(header).toBeInTheDocument()
      expect(filterSection).toBeInTheDocument()
      expect(modelsSection).toBeInTheDocument()
      
      // Verify proper container structure
      const container = header.closest('[class*="max-w-6xl"]')
      expect(container).toBeInTheDocument()
      
      // Should not have orphaned spacing from removed sections
      const excessiveSpacing = container?.querySelectorAll('[class*="mb-20"], [class*="mt-20"], [class*="py-20"]')
      expect(excessiveSpacing?.length).toBe(0)
    })

    it('should maintain proper layout on PublicationsPage after section removal', () => {
      render(<PublicationsPage />)
      
      // Verify main sections are present
      const header = screen.getByRole('heading', { name: /^publications$/i })
      const filterSection = screen.getByText(/all publications/i)
      // Look for the first publication title specifically
      const publicationsSection = screen.getByText(/dynamic equilibrium models in modern macroeconomics: a comprehensive survey/i)
      
      expect(header).toBeInTheDocument()
      expect(filterSection).toBeInTheDocument()
      expect(publicationsSection).toBeInTheDocument()
      
      // Verify proper container structure
      const container = header.closest('[class*="max-w-4xl"]')
      expect(container).toBeInTheDocument()
      
      // Should end properly without removed collaboration section
      const lastPublication = screen.getAllByRole('listitem').pop()
      expect(lastPublication).toBeInTheDocument()
    })

    it('should handle mobile viewport properly', () => {
      mockMatchMedia(true) // Simulate mobile
      
      render(<HomePage />)
      
      // Should maintain responsive classes
      const heroSection = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="flex-col"]')
      expect(heroSection).toBeInTheDocument()
      
      // Should have proper mobile spacing
      const container = screen.getByRole('heading', { name: /dr\. academic researcher/i }).closest('[class*="px-6"]')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Accessibility Tests', () => {
    it('should not have orphaned ARIA references on HomePage', () => {
      render(<HomePage />)
      
      // Check for proper heading hierarchy
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      
      // Should not have aria-describedby pointing to non-existent elements
      const elementsWithAriaDescribedby = document.querySelectorAll('[aria-describedby]')
      elementsWithAriaDescribedby.forEach(element => {
        const describedById = element.getAttribute('aria-describedby')
        if (describedById) {
          const referencedElement = document.getElementById(describedById)
          expect(referencedElement).toBeInTheDocument()
        }
      })
      
      // Should not have aria-labelledby pointing to non-existent elements
      const elementsWithAriaLabelledby = document.querySelectorAll('[aria-labelledby]')
      elementsWithAriaLabelledby.forEach(element => {
        const labelledById = element.getAttribute('aria-labelledby')
        if (labelledById) {
          const referencedElement = document.getElementById(labelledById)
          expect(referencedElement).toBeInTheDocument()
        }
      })
    })

    it('should not have orphaned ARIA references on StackPage', () => {
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Check for proper button accessibility
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
      
      // All buttons should be accessible (filter out animated ones that might not be visible)
      const visibleButtons = buttons.filter(button => {
        const style = window.getComputedStyle(button)
        return style.opacity !== '0' && style.visibility !== 'hidden'
      })
      
      visibleButtons.forEach(button => {
        expect(button).not.toHaveAttribute('aria-hidden', 'true')
      })
      
      // Check for orphaned ARIA references
      const elementsWithAriaDescribedby = document.querySelectorAll('[aria-describedby]')
      elementsWithAriaDescribedby.forEach(element => {
        const describedById = element.getAttribute('aria-describedby')
        if (describedById) {
          const referencedElement = document.getElementById(describedById)
          expect(referencedElement).toBeInTheDocument()
        }
      })
    })

    it('should not have orphaned ARIA references on PublicationsPage', () => {
      render(<PublicationsPage />)
      
      // Check for proper ARIA structure
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveAttribute('aria-label', 'Publications page content')
      
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
      expect(navigation).toHaveAttribute('aria-label', 'Publication filters')
      
      // Check publication articles have proper ARIA
      const articles = screen.getAllByRole('listitem')
      articles.forEach(article => {
        expect(article).toHaveAttribute('tabIndex', '0')
        expect(article).toHaveAttribute('aria-label')
      })
      
      // Check for orphaned ARIA references
      const elementsWithAriaDescribedby = document.querySelectorAll('[aria-describedby]')
      elementsWithAriaDescribedby.forEach(element => {
        const describedById = element.getAttribute('aria-describedby')
        if (describedById) {
          const referencedElement = document.getElementById(describedById)
          expect(referencedElement).toBeInTheDocument()
        }
      })
    })

    it('should maintain proper focus flow on HomePage', async () => {
      render(<HomePage />)
      
      // Should have interactive elements that are focusable
      const buttons = screen.getAllByRole('button')
      
      expect(buttons.length).toBeGreaterThan(0)
      
      // Test that buttons are focusable (not disabled or hidden from focus)
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
        expect(button).not.toHaveAttribute('disabled')
        expect(button).not.toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should maintain proper focus flow on StackPage', async () => {
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Should have filter buttons that are focusable
      const filterButtons = screen.getAllByRole('button').filter(button => 
        button.textContent?.includes('All Models') || 
        button.textContent?.includes('DSGE') ||
        button.textContent?.includes('Growth Theory')
      )
      
      expect(filterButtons.length).toBeGreaterThan(0)
      
      // Test that filter buttons are focusable
      filterButtons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
        expect(button).not.toHaveAttribute('disabled')
        expect(button).not.toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should maintain proper focus flow on PublicationsPage', async () => {
      render(<PublicationsPage />)
      
      // Should have filter buttons that are focusable
      const filterButtons = screen.getAllByRole('button').filter(button => 
        button.textContent?.includes('All Publications') || 
        button.textContent?.includes('Journal Articles')
      )
      
      expect(filterButtons.length).toBeGreaterThan(0)
      
      // Test that filter buttons are focusable
      filterButtons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
        expect(button).not.toHaveAttribute('disabled')
        expect(button).not.toHaveAttribute('aria-hidden', 'true')
      })
      
      // Should have publication articles that are focusable
      const articles = screen.getAllByRole('listitem')
      expect(articles.length).toBeGreaterThan(0)
      
      articles.forEach(article => {
        expect(article).toHaveAttribute('tabIndex', '0')
        expect(article).not.toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should have proper heading hierarchy across all pages', () => {
      // Test HomePage
      render(<HomePage />)
      const homeHeadings = screen.getAllByRole('heading')
      expect(homeHeadings.length).toBeGreaterThan(0)
      
      // Should have h1 as main heading
      const h1Elements = homeHeadings.filter(heading => heading.tagName === 'H1')
      expect(h1Elements.length).toBeGreaterThanOrEqual(1)
      
      // Test StackPage
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      const stackHeadings = screen.getAllByRole('heading')
      expect(stackHeadings.length).toBeGreaterThan(0)
      
      // Test PublicationsPage
      render(<PublicationsPage />)
      const pubHeadings = screen.getAllByRole('heading')
      expect(pubHeadings.length).toBeGreaterThan(0)
    })
  })
})