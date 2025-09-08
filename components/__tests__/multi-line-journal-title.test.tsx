import { render, screen } from '@testing-library/react'
import { PublicationsPage } from '../PublicationsPage'

describe('Multi-line Journal Title Layout', () => {
  it('should properly separate citation metadata from journal information', () => {
    render(<PublicationsPage />)
    
    // Find publications with different journal title lengths
    const publications = screen.getAllByRole('listitem')
    
    publications.forEach((pub) => {
      // Check that status badge is in a separate container from journal title
      const statusBadge = pub.querySelector('[class*="bg-green-100"], [class*="bg-yellow-100"], [class*="bg-blue-100"]')
      
      if (statusBadge) {
        // Status badge should be in a flex container for proper alignment
        const flexContainer = statusBadge.closest('[class*="flex"]')
        expect(flexContainer).toBeInTheDocument()
        expect(flexContainer).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-2')
        
        // The flex container should be separate from the journal title area
        const journalElement = pub.querySelector('em')
        if (journalElement) {
          expect(flexContainer).not.toContain(journalElement)
        }
      }
    })
  })

  it('should maintain consistent spacing for status badges across all publications', () => {
    render(<PublicationsPage />)
    
    // Get publication articles and find status badges within them
    const publications = screen.getAllByRole('listitem')
    
    publications.forEach((pub) => {
      const statusBadge = pub.querySelector('[class*="bg-green-100"], [class*="bg-yellow-100"], [class*="bg-blue-100"]')
      
      if (statusBadge) {
        // Each badge should have consistent padding and styling
        expect(statusBadge).toHaveClass('inline-block', 'px-2', 'py-0.5', 'rounded', 'text-xs')
        
        // Badge should be in a flex container with proper gap
        const container = statusBadge.closest('[class*="gap-2"]')
        expect(container).toBeInTheDocument()
      }
    })
  })

  it('should properly align citation counts with status badges', () => {
    render(<PublicationsPage />)
    
    // Find publications with citations
    const citationElements = screen.getAllByText(/Cited \d+ times/)
    
    citationElements.forEach((citation) => {
      // Citation should be in the same flex container as status badge
      const flexContainer = citation.closest('[class*="flex"][class*="items-center"]')
      expect(flexContainer).toBeInTheDocument()
      
      // Should have proper text styling
      expect(citation).toHaveClass('text-sm', 'text-gray-600')
      
      // Should be in same container as a status badge
      const statusBadge = flexContainer?.querySelector('[class*="bg-green-100"], [class*="bg-yellow-100"], [class*="bg-blue-100"]')
      expect(statusBadge).toBeInTheDocument()
    })
  })

  it('should handle publications without citations properly', () => {
    render(<PublicationsPage />)
    
    // Find publications without citations (like "Under Review" status)
    const underReviewBadges = screen.getAllByText('Under Review')
    
    underReviewBadges.forEach((badge) => {
      const flexContainer = badge.closest('[class*="flex"][class*="items-center"]')
      expect(flexContainer).toBeInTheDocument()
      
      // Should not have citation text in the same container
      const citationText = flexContainer?.querySelector('[class*="text-gray-600"]')
      if (citationText) {
        expect(citationText.textContent).not.toMatch(/Cited \d+ times/)
      }
    })
  })

  it('should maintain proper visual hierarchy with separated metadata', () => {
    render(<PublicationsPage />)
    
    const publications = screen.getAllByRole('listitem')
    
    publications.forEach((pub) => {
      // Title should be in the main citation line
      const title = pub.querySelector('h3')
      expect(title).toBeInTheDocument()
      
      // Status badge should be in a separate metadata line
      const statusBadge = pub.querySelector('[class*="bg-green-100"], [class*="bg-yellow-100"], [class*="bg-blue-100"]')
      
      if (statusBadge && title) {
        // They should not be in the same immediate container
        const statusBadgeInline = statusBadge.closest('.inline')
        const titleInline = title.closest('.inline')
        
        // Status badge should not be in an inline container (it's in flex now)
        expect(statusBadgeInline).toBeNull()
        
        // Title should be in an inline container
        expect(titleInline).toBeInTheDocument()
      }
    })
  })
})