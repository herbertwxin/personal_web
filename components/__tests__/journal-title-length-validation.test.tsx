import { render, screen } from '@testing-library/react'
import { PublicationsPage } from '../PublicationsPage'

describe('Journal Title Length Validation', () => {
  it('should handle short journal titles with proper alignment', () => {
    render(<PublicationsPage />)
    
    // Find publication with "Economic Review" (short title)
    const shortJournalPub = screen.getByText('Economic Review')
    const article = shortJournalPub.closest('article')
    
    // Verify status badge is properly positioned
    const statusBadge = article?.querySelector('[class*="bg-green-100"]')
    expect(statusBadge).toBeInTheDocument()
    expect(statusBadge).toHaveTextContent('Published')
    
    // Verify citation info is properly positioned
    const citationInfo = article?.querySelector('[class*="text-gray-600"]')
    expect(citationInfo).toBeInTheDocument()
    expect(citationInfo).toHaveTextContent('Cited 28 times')
    
    // Verify they are in the same flex container
    const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"]')
    expect(flexContainer).toContain(citationInfo)
  })

  it('should handle medium journal titles with proper alignment', () => {
    render(<PublicationsPage />)
    
    // Find publication with "Journal of Economic Theory" (medium title)
    const mediumJournalPub = screen.getByText('Journal of Economic Theory')
    const article = mediumJournalPub.closest('article')
    
    // Verify status badge is properly positioned
    const statusBadge = article?.querySelector('[class*="bg-green-100"]')
    expect(statusBadge).toBeInTheDocument()
    expect(statusBadge).toHaveTextContent('Published')
    
    // Verify citation info is properly positioned
    const citationInfo = article?.querySelector('[class*="text-gray-600"]')
    expect(citationInfo).toBeInTheDocument()
    expect(citationInfo).toHaveTextContent('Cited 12 times')
    
    // Verify they are in the same flex container
    const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"]')
    expect(flexContainer).toContain(citationInfo)
  })

  it('should handle long journal titles with proper alignment', () => {
    render(<PublicationsPage />)
    
    // Find publication with "American Economic Journal: Macroeconomics" (long title)
    const longJournalPub = screen.getByText('American Economic Journal: Macroeconomics')
    const article = longJournalPub.closest('article')
    
    // Verify status badge is properly positioned
    const statusBadge = article?.querySelector('[class*="bg-green-100"]')
    expect(statusBadge).toBeInTheDocument()
    expect(statusBadge).toHaveTextContent('Published')
    
    // Verify citation info is properly positioned
    const citationInfo = article?.querySelector('[class*="text-gray-600"]')
    expect(citationInfo).toBeInTheDocument()
    expect(citationInfo).toHaveTextContent('Cited 19 times')
    
    // Verify they are in the same flex container
    const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"]')
    expect(flexContainer).toContain(citationInfo)
  })

  it('should ensure consistent metadata positioning across all journal title lengths', () => {
    render(<PublicationsPage />)
    
    const testJournals = [
      { title: 'Economic Review', citations: 28 },
      { title: 'Journal of Economic Theory', citations: 12 },
      { title: 'American Economic Journal: Macroeconomics', citations: 19 },
      { title: 'Review of Economic Dynamics', citations: 34 },
    ]
    
    testJournals.forEach(({ title, citations }) => {
      const journalElement = screen.getByText(title)
      const article = journalElement.closest('article')
      
      // Each should have a status badge in a flex container
      const statusBadge = article?.querySelector('[class*="bg-green-100"]')
      expect(statusBadge).toBeInTheDocument()
      
      const flexContainer = statusBadge?.closest('[class*="flex"][class*="items-center"][class*="gap-2"]')
      expect(flexContainer).toBeInTheDocument()
      
      // Each should have citation info in the same flex container
      const citationInfo = article?.querySelector('[class*="text-gray-600"]')
      expect(citationInfo).toBeInTheDocument()
      expect(citationInfo).toHaveTextContent(`Cited ${citations} times`)
      expect(flexContainer).toContain(citationInfo)
      
      // Verify proper spacing classes
      expect(flexContainer).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-2')
    })
  })

  it('should maintain proper separation between journal info and metadata', () => {
    render(<PublicationsPage />)
    
    const publications = screen.getAllByRole('listitem')
    
    publications.forEach((pub) => {
      // Find journal title (in em tag)
      const journalTitle = pub.querySelector('em')
      
      // Find status badge
      const statusBadge = pub.querySelector('[class*="bg-green-100"], [class*="bg-yellow-100"], [class*="bg-blue-100"]')
      
      if (journalTitle && statusBadge) {
        // Journal title should be in the main citation div
        const journalContainer = journalTitle.closest('[class*="ml-8"][class*="-indent-8"]')
        expect(journalContainer).toBeInTheDocument()
        
        // Status badge should be in a separate metadata div
        const metadataContainer = statusBadge.closest('[class*="ml-8"][class*="mt-1"]')
        expect(metadataContainer).toBeInTheDocument()
        
        // They should be different containers
        expect(journalContainer).not.toBe(metadataContainer)
      }
    })
  })

  it('should handle publications without citations correctly', () => {
    render(<PublicationsPage />)
    
    // Find "Under Review" publication (should have 0 citations)
    const underReviewBadge = screen.getByText('Under Review')
    const article = underReviewBadge.closest('article')
    
    // Should have status badge
    expect(underReviewBadge).toHaveClass('inline-block', 'px-2', 'py-0.5', 'rounded', 'text-xs')
    
    // Should be in flex container
    const flexContainer = underReviewBadge.closest('[class*="flex"][class*="items-center"]')
    expect(flexContainer).toBeInTheDocument()
    
    // Should not have citation info in this container
    const citationInfo = flexContainer?.querySelector('[class*="text-gray-600"]')
    expect(citationInfo).toBeNull()
  })
})