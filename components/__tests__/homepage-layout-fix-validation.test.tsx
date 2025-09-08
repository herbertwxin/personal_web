import { render, screen } from '@testing-library/react'
import { HomePage } from '../HomePage'

describe('HomePage Layout Fix Validation', () => {
  describe('Selected Publications Layout Fix', () => {
    it('should have proper flex layout structure', () => {
      render(<HomePage />)
      
      // Find publication items
      const publications = document.querySelectorAll('[class*="academic-list-item"]')
      expect(publications.length).toBe(3)
      
      publications.forEach(pub => {
        // Each publication should use flex layout
        expect(pub).toHaveClass('flex', 'gap-3')
        
        // Should have number container
        const numberContainer = pub.querySelector('[class*="flex-shrink-0"]')
        expect(numberContainer).toBeInTheDocument()
        expect(numberContainer).toHaveClass('flex-shrink-0', 'w-6')
        
        // Should have content container
        const contentContainer = pub.querySelector('[class*="flex-1"]')
        expect(contentContainer).toBeInTheDocument()
        expect(contentContainer).toHaveClass('flex-1', 'space-y-2')
      })
    })

    it('should have proper badge styling with background coverage', () => {
      render(<HomePage />)
      
      // Find all type badges
      const researchBadges = screen.getAllByText('Research')
      const policyBadge = screen.getByText('Policy')
      
      // Check Research badges
      researchBadges.forEach(badge => {
        expect(badge).toHaveClass('inline-block')
        expect(badge).toHaveClass('px-2', 'py-1')
        expect(badge).toHaveClass('bg-gray-100')
        expect(badge).toHaveClass('text-gray-700')
        expect(badge).toHaveClass('text-xs', 'rounded', 'font-medium')
      })
      
      // Check Policy badge
      expect(policyBadge).toHaveClass('inline-block')
      expect(policyBadge).toHaveClass('px-2', 'py-1')
      expect(policyBadge).toHaveClass('bg-gray-100')
      expect(policyBadge).toHaveClass('text-gray-700')
      expect(policyBadge).toHaveClass('text-xs', 'rounded', 'font-medium')
    })

    it('should have proper text alignment without hanging indent issues', () => {
      render(<HomePage />)
      
      // Find publication titles
      const titles = [
        'Dynamic Equilibrium Models in Modern Macroeconomics',
        'Stochastic Growth Models: Theory and Applications',
        'Monetary Policy in New Keynesian Framework'
      ]
      
      titles.forEach(title => {
        const titleElement = screen.getByText(title)
        expect(titleElement).toBeInTheDocument()
        
        // Title should be in a flex-1 container (not using hanging indent)
        const container = titleElement.closest('[class*="flex-1"]')
        expect(container).toBeInTheDocument()
        expect(container).toHaveClass('flex-1', 'space-y-2')
      })
    })

    it('should have proper spacing between publications', () => {
      render(<HomePage />)
      
      // Publications list should have space-y-6 for better spacing
      const publicationsList = document.querySelector('[class*="space-y-6"]')
      expect(publicationsList).toBeInTheDocument()
      expect(publicationsList).toHaveClass('space-y-6')
    })

    it('should display journal names in italics', () => {
      render(<HomePage />)
      
      // Check that journal names are properly italicized
      const journalNames = [
        'Journal of Economic Theory',
        'Economic Review',
        'Macroeconomic Dynamics'
      ]
      
      journalNames.forEach(journal => {
        const journalElement = screen.getByText(journal)
        expect(journalElement).toBeInTheDocument()
        expect(journalElement.tagName).toBe('EM')
      })
    })

    it('should have consistent vertical spacing in publication content', () => {
      render(<HomePage />)
      
      // Each publication content area should have space-y-2
      const contentContainers = document.querySelectorAll('[class*="flex-1"][class*="space-y-2"]')
      expect(contentContainers.length).toBe(3) // One for each publication
      
      contentContainers.forEach(container => {
        expect(container).toHaveClass('flex-1', 'space-y-2')
      })
    })

    it('should maintain proper responsive behavior', () => {
      render(<HomePage />)
      
      // Publications should be in a responsive container
      const publicationsSection = screen.getByRole('heading', { name: /selected publications/i })
      const container = publicationsSection.closest('[class*="max-w-6xl"]')
      expect(container).toBeInTheDocument()
      
      // Each publication should use flex layout that works on mobile
      const publications = document.querySelectorAll('[class*="academic-list-item"]')
      publications.forEach(pub => {
        expect(pub).toHaveClass('flex', 'gap-3')
      })
    })

    it('should have proper color contrast for badges', () => {
      render(<HomePage />)
      
      // Badges should have proper background and text colors
      const badges = document.querySelectorAll('[class*="bg-gray-100"][class*="text-gray-700"]')
      expect(badges.length).toBe(3) // One for each publication
      
      badges.forEach(badge => {
        expect(badge).toHaveClass('bg-gray-100', 'text-gray-700')
      })
    })

    it('should not have overlapping or misaligned elements', () => {
      render(<HomePage />)
      
      // Check that each publication has proper structure
      const publications = document.querySelectorAll('[class*="academic-list-item"]')
      
      publications.forEach(pub => {
        // Should have number on the left
        const number = pub.querySelector('[class*="flex-shrink-0"]')
        expect(number).toBeInTheDocument()
        
        // Should have content on the right
        const content = pub.querySelector('[class*="flex-1"]')
        expect(content).toBeInTheDocument()
        
        // Content should have title, metadata, and badge
        const title = content?.querySelector('h3')
        const metadata = content?.querySelector('[class*="text-"][class*="academic-text-secondary"]')
        const badge = content?.querySelector('[class*="bg-gray-100"]')
        
        expect(title).toBeInTheDocument()
        expect(metadata).toBeInTheDocument()
        expect(badge).toBeInTheDocument()
      })
    })
  })
})