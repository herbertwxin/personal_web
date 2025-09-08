import { render, screen } from '@testing-library/react'
import { PublicationsPage } from '../PublicationsPage'

describe('Requirement 6 - Publication Citation Layout Validation', () => {
  describe('6.1 - Published label display for long journal titles', () => {
    it('should properly display Published label when journal title is longer than one line', () => {
      render(<PublicationsPage />)
      
      // Test with "American Economic Journal: Macroeconomics" (long title)
      const longJournalPub = screen.getByText('American Economic Journal: Macroeconomics')
      const article = longJournalPub.closest('article')
      
      // Should have "Published" label properly displayed
      const publishedLabel = article?.querySelector('[class*="bg-green-100"]')
      expect(publishedLabel).toBeInTheDocument()
      expect(publishedLabel).toHaveTextContent('Published')
      
      // Should be in a separate metadata container from journal title
      const metadataContainer = publishedLabel?.closest('[class*="ml-8"][class*="mt-1"]')
      expect(metadataContainer).toBeInTheDocument()
      
      // Journal title should be in a different container
      const journalContainer = longJournalPub.closest('[class*="ml-8"][class*="-indent-8"]')
      expect(journalContainer).not.toBe(metadataContainer)
    })
  })

  describe('6.2 - Citation information display for long journal titles', () => {
    it('should properly display citation information when journal title is longer than one line', () => {
      render(<PublicationsPage />)
      
      // Test with "American Economic Journal: Macroeconomics" (long title)
      const longJournalPub = screen.getByText('American Economic Journal: Macroeconomics')
      const article = longJournalPub.closest('article')
      
      // Should have citation information properly displayed
      const citationInfo = article?.querySelector('[class*="text-gray-600"]')
      expect(citationInfo).toBeInTheDocument()
      expect(citationInfo).toHaveTextContent('Cited 19 times')
      
      // Should be in the same flex container as the Published label
      const publishedLabel = article?.querySelector('[class*="bg-green-100"]')
      const flexContainer = publishedLabel?.closest('[class*="flex"][class*="items-center"]')
      expect(flexContainer).toContain(citationInfo)
    })
  })

  describe('6.3 - Proper alignment and readability for multi-line journal titles', () => {
    it('should maintain proper alignment and readability for multi-line journal titles', () => {
      render(<PublicationsPage />)
      
      // Test multiple publications with potentially long titles
      const longTitlePublications = [
        'American Economic Journal: Macroeconomics',
        'Quarterly Journal of Economics',
        'Review of Economic Dynamics'
      ]
      
      longTitlePublications.forEach((journalTitle) => {
        const journalElement = screen.getByText(journalTitle)
        const article = journalElement.closest('article')
        
        // Metadata should be in a separate, properly aligned container
        const statusBadge = article?.querySelector('[class*="bg-green-100"], [class*="bg-yellow-100"], [class*="bg-blue-100"]')
        expect(statusBadge).toBeInTheDocument()
        
        // Should be in a flex container with proper alignment
        const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"][class*="gap-2"]')
        expect(flexContainer).toBeInTheDocument()
        expect(flexContainer).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-2')
        
        // Should have proper margin for alignment
        const metadataContainer = flexContainer?.closest('[class*="ml-8"][class*="mt-1"]')
        expect(metadataContainer).toBeInTheDocument()
      })
    })
  })

  describe('6.4 - Single-line journal title citation display', () => {
    it('should continue to display citation information correctly for single-line journal titles', () => {
      render(<PublicationsPage />)
      
      // Test with "Economic Review" (short, single-line title)
      const shortJournalPub = screen.getByText('Economic Review')
      const article = shortJournalPub.closest('article')
      
      // Should have "Published" label properly displayed
      const publishedLabel = article?.querySelector('[class*="bg-green-100"]')
      expect(publishedLabel).toBeInTheDocument()
      expect(publishedLabel).toHaveTextContent('Published')
      
      // Should have citation information properly displayed
      const citationInfo = article?.querySelector('[class*="text-gray-600"]')
      expect(citationInfo).toBeInTheDocument()
      expect(citationInfo).toHaveTextContent('Cited 28 times')
      
      // Should be in the same flex container
      const flexContainer = publishedLabel?.closest('[class*="flex"][class*="items-center"]')
      expect(flexContainer).toContain(citationInfo)
    })
  })

  describe('6.5 - Consistent formatting across all entries', () => {
    it('should ensure consistent formatting across all entries regardless of title length', () => {
      render(<PublicationsPage />)
      
      const publications = screen.getAllByRole('listitem')
      expect(publications.length).toBeGreaterThan(0)
      
      // Test various journal title lengths
      const testCases = [
        { title: 'Economic Review', expectedCitations: 28 },
        { title: 'Journal of Economic Theory', expectedCitations: 12 },
        { title: 'American Economic Journal: Macroeconomics', expectedCitations: 19 },
        { title: 'Review of Economic Dynamics', expectedCitations: 34 },
        { title: 'Journal of Monetary Economics', expectedCitations: 41 }
      ]
      
      testCases.forEach(({ title, expectedCitations }) => {
        const journalElement = screen.getByText(title)
        const article = journalElement.closest('article')
        
        // Each should have consistent status badge styling
        const statusBadge = article?.querySelector('[class*="bg-green-100"]')
        expect(statusBadge).toBeInTheDocument()
        expect(statusBadge).toHaveClass('inline-block', 'px-2', 'py-0.5', 'rounded', 'text-xs')
        
        // Each should have consistent citation info styling
        const citationInfo = article?.querySelector('[class*="text-gray-600"]')
        expect(citationInfo).toBeInTheDocument()
        expect(citationInfo).toHaveClass('text-sm', 'text-gray-600')
        expect(citationInfo).toHaveTextContent(`Cited ${expectedCitations} times`)
        
        // Each should have consistent container structure
        const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"][class*="gap-2"]')
        expect(flexContainer).toBeInTheDocument()
        expect(flexContainer).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-2')
        expect(flexContainer).toContain(citationInfo)
        
        // Each should have consistent metadata container
        const metadataContainer = flexContainer?.closest('[class*="ml-8"][class*="mt-1"]')
        expect(metadataContainer).toBeInTheDocument()
      })
    })

    it('should handle publications with different statuses consistently', () => {
      render(<PublicationsPage />)
      
      // Test different status types
      const statusTypes = [
        { text: 'Published', class: 'bg-green-100' },
        { text: 'Under Review', class: 'bg-yellow-100' },
        { text: 'Working Paper', class: 'bg-blue-100' }
      ]
      
      statusTypes.forEach(({ text, class: statusClass }) => {
        const statusElements = screen.getAllByText(text)
        
        // Filter to get only publication status badges (not filter buttons)
        const publicationStatusBadges = statusElements.filter(element => 
          element.classList.contains('inline-block') && 
          element.classList.contains('px-2')
        )
        
        publicationStatusBadges.forEach((badge) => {
          // Each should have consistent styling
          expect(badge).toHaveClass('inline-block', 'px-2', 'py-0.5', 'rounded', 'text-xs')
          expect(badge).toHaveClass(statusClass)
          
          // Each should be in a consistent flex container
          const flexContainer = badge.closest('[class*="flex"][class*="items-center"][class*="gap-2"]')
          expect(flexContainer).toBeInTheDocument()
        })
      })
    })
  })
})