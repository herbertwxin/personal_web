import { render, screen } from '@testing-library/react'
import { PublicationsPage } from '../PublicationsPage'

describe('Publication Citation Layout', () => {
  it('should handle short journal titles correctly', () => {
    render(<PublicationsPage />)
    
    // Find a publication with a short journal title
    const shortJournalPub = screen.getByText('Economic Review')
    expect(shortJournalPub).toBeInTheDocument()
    
    // Check that status badge and citation info are present
    const publishedBadge = shortJournalPub.closest('article')?.querySelector('[class*="bg-green-100"]')
    expect(publishedBadge).toBeInTheDocument()
    
    const citationInfo = shortJournalPub.closest('article')?.querySelector('[class*="text-gray-600"]')
    expect(citationInfo).toBeInTheDocument()
  })

  it('should handle long journal titles correctly', () => {
    render(<PublicationsPage />)
    
    // Find a publication with a long journal title
    const longJournalPub = screen.getByText('American Economic Journal: Macroeconomics')
    expect(longJournalPub).toBeInTheDocument()
    
    // Check that status badge and citation info are present and properly positioned
    const publishedBadge = longJournalPub.closest('article')?.querySelector('[class*="bg-green-100"]')
    expect(publishedBadge).toBeInTheDocument()
    
    const citationInfo = longJournalPub.closest('article')?.querySelector('[class*="text-gray-600"]')
    expect(citationInfo).toBeInTheDocument()
  })

  it('should maintain consistent formatting across all publication entries', () => {
    render(<PublicationsPage />)
    
    // Get all publication articles
    const publications = screen.getAllByRole('listitem')
    expect(publications.length).toBeGreaterThan(0)
    
    // Check that each publication has consistent structure
    publications.forEach((pub) => {
      // Each should have a status badge
      const statusBadge = pub.querySelector('[class*="inline-block"][class*="px-2"][class*="py-0.5"]')
      expect(statusBadge).toBeInTheDocument()
      
      // Publications with citations should have citation info
      const citationInfo = pub.querySelector('[class*="text-gray-600"]')
      const citationText = citationInfo?.textContent
      
      if (citationText && citationText.includes('Cited')) {
        expect(citationText).toMatch(/Cited \d+ times/)
      }
    })
  })

  it('should ensure proper alignment regardless of journal title length', () => {
    render(<PublicationsPage />)
    
    // Test publications with different journal title lengths
    const testCases = [
      'Economic Review', // Short
      'Journal of Economic Theory', // Medium
      'American Economic Journal: Macroeconomics', // Long
    ]
    
    testCases.forEach((journalTitle) => {
      const journalElement = screen.getByText(journalTitle)
      const article = journalElement.closest('article')
      
      // Check that the citation metadata is properly structured
      const statusBadge = article?.querySelector('[class*="bg-green-100"], [class*="bg-yellow-100"], [class*="bg-blue-100"]')
      expect(statusBadge).toBeInTheDocument()
      
      // Verify the status badge has proper spacing classes
      expect(statusBadge).toHaveClass('inline-block', 'px-2', 'py-0.5', 'rounded', 'text-xs')
    })
  })
})