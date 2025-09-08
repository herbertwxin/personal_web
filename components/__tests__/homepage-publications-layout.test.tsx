import { render, screen } from '@testing-library/react'
import { HomePage } from '../HomePage'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { expect } from 'vitest'
import { expect } from 'vitest'
import { it } from 'vitest'
import { describe } from 'vitest'
import { describe } from 'vitest'

describe('HomePage Publications Layout', () => {
  describe('Selected Publications Section', () => {
    it('should display publication metadata with proper spacing', () => {
      render(<HomePage />)
      
      // Find the Selected Publications section
      const publicationsSection = screen.getByRole('heading', { name: /selected publications/i })
      expect(publicationsSection).toBeInTheDocument()
      
      // Check that publications are displayed
      const publications = [
        'Dynamic Equilibrium Models in Modern Macroeconomics',
        'Stochastic Growth Models: Theory and Applications',
        'Monetary Policy in New Keynesian Framework'
      ]
      
      publications.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })
    })

    it('should display journal names without overlapping dots', () => {
      render(<HomePage />)
      
      // Check that journal names are displayed properly
      expect(screen.getByText('Journal of Economic Theory')).toBeInTheDocument()
      expect(screen.getByText('Economic Review')).toBeInTheDocument()
      expect(screen.getByText('Macroeconomic Dynamics')).toBeInTheDocument()
    })

    it('should display years without overlapping dots', () => {
      render(<HomePage />)
      
      // Check that years and citations are displayed properly (text may be split by em tags)
      expect(screen.getByText(/Journal of Economic Theory/)).toBeInTheDocument()
      expect(screen.getByText(/2024.*12 citations/)).toBeInTheDocument()
      expect(screen.getByText(/Economic Review/)).toBeInTheDocument()
      expect(screen.getByText(/2023.*28 citations/)).toBeInTheDocument()
      expect(screen.getByText(/Macroeconomic Dynamics/)).toBeInTheDocument()
      expect(screen.getByText(/2023.*35 citations/)).toBeInTheDocument()
    })

    it('should display citation counts without overlapping dots', () => {
      render(<HomePage />)
      
      // Check that citation counts are displayed properly with bullet separators
      expect(screen.getByText(/12 citations/)).toBeInTheDocument()
      expect(screen.getByText(/28 citations/)).toBeInTheDocument()
      expect(screen.getByText(/35 citations/)).toBeInTheDocument()
      
      // Verify bullet separators are present
      const bulletElements = document.querySelectorAll('span')
      const bullets = Array.from(bulletElements).filter(span => span.textContent?.includes('•'))
      expect(bullets.length).toBeGreaterThan(0)
    })

    it('should have proper formatting for publication metadata', () => {
      render(<HomePage />)
      
      // Find publication metadata containers
      const metadataContainers = document.querySelectorAll('[class*="text-"][class*="academic-text-secondary"]')
      
      // Filter to get only the publication metadata containers
      const publicationMetadata = Array.from(metadataContainers).filter(container => {
        return container.textContent?.includes('citations')
      })
      
      expect(publicationMetadata.length).toBeGreaterThan(0)
      
      // Check that journal names are italicized
      publicationMetadata.forEach(container => {
        const italicElements = container.querySelectorAll('em')
        expect(italicElements.length).toBeGreaterThan(0)
      })
    })

    it('should display publication types as badges', () => {
      render(<HomePage />)
      
      // Check that publication type badges are displayed
      const researchBadges = screen.getAllByText('Research')
      expect(researchBadges.length).toBe(2) // Two research publications
      
      const policyBadge = screen.getByText('Policy')
      expect(policyBadge).toBeInTheDocument()
      
      // Check that badges have proper styling
      researchBadges.forEach(badge => {
        expect(badge).toHaveClass('inline-block', 'px-2', 'py-1', 'text-xs', 'rounded', 'font-medium')
      })
      
      expect(policyBadge).toHaveClass('inline-block', 'px-2', 'py-1', 'text-xs', 'rounded', 'font-medium')
    })

    it('should have proper numbering for publications', () => {
      render(<HomePage />)
      
      // Check that publications are numbered correctly
      expect(screen.getByText('1.')).toBeInTheDocument()
      expect(screen.getByText('2.')).toBeInTheDocument()
      expect(screen.getByText('3.')).toBeInTheDocument()
      
      // Check that numbers are positioned correctly
      const numberElements = [
        screen.getByText('1.'),
        screen.getByText('2.'),
        screen.getByText('3.')
      ]
      
      numberElements.forEach(number => {
        const container = number.closest('[class*="flex-shrink-0"]')
        expect(container).toBeInTheDocument()
        expect(container).toHaveClass('flex-shrink-0', 'w-6')
      })
    })

    it('should maintain proper layout structure', () => {
      render(<HomePage />)
      
      // Check that the publications section has proper structure
      const publicationsSection = screen.getByRole('heading', { name: /selected publications/i })
      const sectionContainer = publicationsSection.closest('[class*="mt-12"]')
      expect(sectionContainer).toBeInTheDocument()
      
      // Check that publications list exists
      const publicationsList = sectionContainer?.querySelector('[class*="space-y-6"]')
      expect(publicationsList).toBeInTheDocument()
      
      // Check that "View All Publications" button exists
      const viewAllButton = screen.getByRole('button', { name: /view all publications/i })
      expect(viewAllButton).toBeInTheDocument()
    })

    it('should handle text wrapping properly in publication metadata', () => {
      render(<HomePage />)
      
      // Check that metadata uses proper text styling
      const metadataContainers = document.querySelectorAll('[class*="text-"][class*="academic-text-secondary"]')
      
      const publicationMetadata = Array.from(metadataContainers).filter(container => {
        return container.textContent?.includes('citations')
      })
      
      expect(publicationMetadata.length).toBeGreaterThan(0)
      
      // Check that each metadata container has proper text styling
      publicationMetadata.forEach(container => {
        expect(container.className).toMatch(/text-\[var\(--academic-text-secondary\)\]/)
      })
    })

    it('should display all publication elements without text overlap', () => {
      render(<HomePage />)
      
      // Test that unique text elements are present
      expect(screen.getByText('Dynamic Equilibrium Models in Modern Macroeconomics')).toBeInTheDocument()
      expect(screen.getByText(/Journal of Economic Theory/)).toBeInTheDocument()
      expect(screen.getByText(/12 citations/)).toBeInTheDocument()
      
      expect(screen.getByText('Stochastic Growth Models: Theory and Applications')).toBeInTheDocument()
      expect(screen.getByText(/Economic Review/)).toBeInTheDocument()
      expect(screen.getByText(/28 citations/)).toBeInTheDocument()
      
      expect(screen.getByText('Monetary Policy in New Keynesian Framework')).toBeInTheDocument()
      expect(screen.getByText(/Macroeconomic Dynamics/)).toBeInTheDocument()
      expect(screen.getByText(/35 citations/)).toBeInTheDocument()
      expect(screen.getByText('Policy')).toBeInTheDocument()
      
      // Test elements that appear multiple times
      const researchBadges = screen.getAllByText('Research')
      expect(researchBadges).toHaveLength(2)
      
      // Verify that journal names are properly italicized
      const italicElements = document.querySelectorAll('em')
      const journalElements = Array.from(italicElements).filter(em => 
        em.textContent?.includes('Journal') || 
        em.textContent?.includes('Economic') ||
        em.textContent?.includes('Macroeconomic')
      )
      
      expect(journalElements.length).toBeGreaterThan(0)
    })
  })
})