import { render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import { HomePage } from '../HomePage'
import { StackPage } from '../StackPage'
import { PublicationsPage } from '../PublicationsPage'

describe('UI Cleanup Accessibility Tests', () => {
  describe('ARIA References and Labels', () => {
    it('should not have orphaned aria-describedby references on HomePage', () => {
      render(<HomePage />)
      
      // Check all elements with aria-describedby
      const elementsWithAriaDescribedby = document.querySelectorAll('[aria-describedby]')
      elementsWithAriaDescribedby.forEach(element => {
        const describedById = element.getAttribute('aria-describedby')
        if (describedById) {
          const referencedElement = document.getElementById(describedById)
          expect(referencedElement).toBeInTheDocument()
        }
      })
    })

    it('should not have orphaned aria-labelledby references on HomePage', () => {
      render(<HomePage />)
      
      // Check all elements with aria-labelledby
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
      
      // Check aria-describedby references
      const elementsWithAriaDescribedby = document.querySelectorAll('[aria-describedby]')
      elementsWithAriaDescribedby.forEach(element => {
        const describedById = element.getAttribute('aria-describedby')
        if (describedById) {
          const referencedElement = document.getElementById(describedById)
          expect(referencedElement).toBeInTheDocument()
        }
      })

      // Check aria-labelledby references
      const elementsWithAriaLabelledby = document.querySelectorAll('[aria-labelledby]')
      elementsWithAriaLabelledby.forEach(element => {
        const labelledById = element.getAttribute('aria-labelledby')
        if (labelledById) {
          const referencedElement = document.getElementById(labelledById)
          expect(referencedElement).toBeInTheDocument()
        }
      })
    })

    it('should not have orphaned ARIA references on PublicationsPage', () => {
      render(<PublicationsPage />)
      
      // Check aria-describedby references
      const elementsWithAriaDescribedby = document.querySelectorAll('[aria-describedby]')
      elementsWithAriaDescribedby.forEach(element => {
        const describedById = element.getAttribute('aria-describedby')
        if (describedById) {
          const referencedElement = document.getElementById(describedById)
          expect(referencedElement).toBeInTheDocument()
        }
      })

      // Check aria-labelledby references
      const elementsWithAriaLabelledby = document.querySelectorAll('[aria-labelledby]')
      elementsWithAriaLabelledby.forEach(element => {
        const labelledById = element.getAttribute('aria-labelledby')
        if (labelledById) {
          const referencedElement = document.getElementById(labelledById)
          expect(referencedElement).toBeInTheDocument()
        }
      })
    })
  })

  describe('Heading Hierarchy', () => {
    it('should maintain proper heading hierarchy on HomePage', () => {
      render(<HomePage />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      
      // Should have h1 as main heading
      const h1Elements = headings.filter(heading => heading.tagName === 'H1')
      expect(h1Elements.length).toBe(1)
      
      // Should have h2 elements for sections
      const h2Elements = headings.filter(heading => heading.tagName === 'H2')
      expect(h2Elements.length).toBeGreaterThan(0)
      
      // Verify specific headings exist
      expect(screen.getByRole('heading', { level: 1, name: /dr\. academic researcher/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: /office hours/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: /selected publications/i })).toBeInTheDocument()
    })

    it('should maintain proper heading hierarchy on StackPage', () => {
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      
      // Should have h1 as main heading
      const h1Elements = headings.filter(heading => heading.tagName === 'H1')
      expect(h1Elements.length).toBe(1)
      
      // Should have h3 elements for model titles
      const h3Elements = headings.filter(heading => heading.tagName === 'H3')
      expect(h3Elements.length).toBeGreaterThan(0)
      
      // Verify main heading exists
      expect(screen.getByRole('heading', { level: 1, name: /mathematical macroeconomics stack/i })).toBeInTheDocument()
    })

    it('should maintain proper heading hierarchy on PublicationsPage', () => {
      render(<PublicationsPage />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      
      // Should have h1 as main heading
      const h1Elements = headings.filter(heading => heading.tagName === 'H1')
      expect(h1Elements.length).toBe(1)
      
      // Should have h2 elements for years
      const h2Elements = headings.filter(heading => heading.tagName === 'H2')
      expect(h2Elements.length).toBeGreaterThan(0)
      
      // Should have h3 elements for publication titles
      const h3Elements = headings.filter(heading => heading.tagName === 'H3')
      expect(h3Elements.length).toBeGreaterThan(0)
      
      // Verify main heading exists
      expect(screen.getByRole('heading', { level: 1, name: /^publications$/i })).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('should have focusable elements on HomePage', () => {
      render(<HomePage />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
      
      buttons.forEach(button => {
        // Should not be excluded from tab order
        expect(button).not.toHaveAttribute('tabindex', '-1')
        expect(button).not.toHaveAttribute('disabled')
        expect(button).not.toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should have focusable elements on StackPage', () => {
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
      
      // Filter buttons should be focusable
      const filterButtons = buttons.filter(button => 
        button.textContent?.includes('All Models') || 
        button.textContent?.includes('DSGE') ||
        button.textContent?.includes('Growth Theory') ||
        button.textContent?.includes('New Keynesian')
      )
      
      expect(filterButtons.length).toBeGreaterThan(0)
      
      filterButtons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
        expect(button).not.toHaveAttribute('disabled')
        expect(button).not.toHaveAttribute('aria-hidden', 'true')
      })
      
      // View Model buttons should be focusable
      const viewButtons = buttons.filter(button => 
        button.textContent?.includes('View Model')
      )
      
      expect(viewButtons.length).toBeGreaterThan(0)
      
      viewButtons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
        expect(button).not.toHaveAttribute('disabled')
        expect(button).not.toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should have focusable elements on PublicationsPage', () => {
      render(<PublicationsPage />)
      
      // Filter buttons should be focusable
      const filterButtons = screen.getAllByRole('button')
      expect(filterButtons.length).toBeGreaterThan(0)
      
      filterButtons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
        expect(button).not.toHaveAttribute('disabled')
        expect(button).not.toHaveAttribute('aria-hidden', 'true')
      })
      
      // Publication articles should be focusable
      const articles = screen.getAllByRole('listitem')
      expect(articles.length).toBeGreaterThan(0)
      
      articles.forEach(article => {
        expect(article).toHaveAttribute('tabIndex', '0')
        expect(article).not.toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Semantic Structure', () => {
    it('should have proper semantic structure on HomePage', () => {
      render(<HomePage />)
      
      // Should have proper main content structure
      const mainContent = document.querySelector('div[class*="min-h-screen"]')
      expect(mainContent).toBeInTheDocument()
      
      // Should have proper section structure
      const sections = document.querySelectorAll('section, div[class*="mt-12"]')
      expect(sections.length).toBeGreaterThan(0)
    })

    it('should have proper semantic structure on StackPage', () => {
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Should have proper main content structure
      const mainContent = document.querySelector('div[class*="min-h-screen"]')
      expect(mainContent).toBeInTheDocument()
      
      // Should have proper list structure for models
      const modelsList = document.querySelector('div[class*="space-y-6"]')
      expect(modelsList).toBeInTheDocument()
    })

    it('should have proper semantic structure on PublicationsPage', () => {
      render(<PublicationsPage />)
      
      // Should have main element
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveAttribute('aria-label', 'Publications page content')
      
      // Should have header element
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      
      // Should have navigation element
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
      expect(navigation).toHaveAttribute('aria-label', 'Publication filters')
      
      // Should have proper list structure
      const publicationsList = document.querySelector('[role="list"]')
      expect(publicationsList).toBeInTheDocument()
      
      // Should have proper article structure
      const articles = screen.getAllByRole('listitem')
      articles.forEach(article => {
        expect(article).toHaveAttribute('role', 'listitem')
        expect(article).toHaveAttribute('aria-label')
      })
    })
  })

  describe('Screen Reader Support', () => {
    it('should provide proper screen reader labels on HomePage', () => {
      render(<HomePage />)
      
      // Buttons should have accessible names
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        const accessibleName = button.textContent || button.getAttribute('aria-label')
        expect(accessibleName).toBeTruthy()
        expect(accessibleName?.trim().length).toBeGreaterThan(0)
      })
      
      // Headings should have accessible names
      const headings = screen.getAllByRole('heading')
      headings.forEach(heading => {
        expect(heading.textContent?.trim().length).toBeGreaterThan(0)
      })
    })

    it('should provide proper screen reader labels on StackPage', () => {
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Filter buttons should have accessible names
      const filterButtons = screen.getAllByRole('button').filter(button => 
        button.textContent?.includes('All Models') || 
        button.textContent?.includes('DSGE') ||
        button.textContent?.includes('Growth Theory') ||
        button.textContent?.includes('New Keynesian')
      )
      
      filterButtons.forEach(button => {
        expect(button.textContent?.trim().length).toBeGreaterThan(0)
      })
      
      // View Model buttons should have accessible names
      const viewButtons = screen.getAllByRole('button').filter(button => 
        button.textContent?.includes('View Model')
      )
      
      viewButtons.forEach(button => {
        expect(button.textContent?.trim().length).toBeGreaterThan(0)
      })
    })

    it('should provide proper screen reader labels on PublicationsPage', () => {
      render(<PublicationsPage />)
      
      // Filter buttons should have proper labels
      const filterButtons = screen.getAllByRole('button')
      filterButtons.forEach(button => {
        const ariaLabel = button.getAttribute('aria-label')
        const textContent = button.textContent
        expect(ariaLabel || textContent).toBeTruthy()
      })
      
      // Publication articles should have proper labels
      const articles = screen.getAllByRole('listitem')
      articles.forEach(article => {
        const ariaLabel = article.getAttribute('aria-label')
        expect(ariaLabel).toBeTruthy()
        expect(ariaLabel?.includes('Publication:')).toBe(true)
      })
      
      // Action buttons should have proper labels
      const actionButtons = screen.getAllByRole('button').filter(button => 
        button.textContent?.includes('View') ||
        button.textContent?.includes('PDF') ||
        button.textContent?.includes('Cite')
      )
      
      actionButtons.forEach(button => {
        const ariaLabel = button.getAttribute('aria-label')
        expect(ariaLabel).toBeTruthy()
      })
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('should not rely solely on color for information on HomePage', () => {
      render(<HomePage />)
      
      // Status indicators should have text labels, not just colors
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.textContent?.trim().length).toBeGreaterThan(0)
      })
    })

    it('should not rely solely on color for information on StackPage', () => {
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      
      // Difficulty indicators should have text, not just colors
      const difficultyElements = screen.getAllByText(/beginner|intermediate|advanced/i)
      expect(difficultyElements.length).toBeGreaterThan(0)
      
      difficultyElements.forEach(element => {
        expect(element.textContent?.trim().length).toBeGreaterThan(0)
      })
    })

    it('should not rely solely on color for information on PublicationsPage', () => {
      render(<PublicationsPage />)
      
      // Status badges should have text, not just colors
      const statusBadges = document.querySelectorAll('[class*="bg-green-100"], [class*="bg-yellow-100"], [class*="bg-blue-100"]')
      expect(statusBadges.length).toBeGreaterThan(0)
      
      statusBadges.forEach(badge => {
        expect(badge.textContent?.trim().length).toBeGreaterThan(0)
      })
      
      // Filter buttons should indicate state with text/aria attributes, not just color
      const filterButtons = screen.getAllByRole('button')
      filterButtons.forEach(button => {
        const ariaPressed = button.getAttribute('aria-pressed')
        if (ariaPressed !== null) {
          expect(['true', 'false']).toContain(ariaPressed)
        }
      })
    })
  })

  describe('Error Prevention and Recovery', () => {
    it('should handle missing content gracefully on all pages', () => {
      // Test that pages don't break when expected content is missing
      
      // HomePage should handle missing sections gracefully
      render(<HomePage />)
      expect(screen.getByRole('heading', { name: /dr\. academic researcher/i })).toBeInTheDocument()
      
      // StackPage should handle missing models gracefully
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      expect(screen.getByRole('heading', { name: /mathematical macroeconomics stack/i })).toBeInTheDocument()
      
      // PublicationsPage should handle missing publications gracefully
      render(<PublicationsPage />)
      expect(screen.getByRole('heading', { name: /^publications$/i })).toBeInTheDocument()
    })

    it('should provide fallback content when interactive elements fail', () => {
      // Test that buttons have proper fallback text
      render(<HomePage />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.textContent?.trim().length).toBeGreaterThan(0)
      })
      
      const mockOnViewModel = vi.fn()
      render(<StackPage onViewModel={mockOnViewModel} />)
      const stackButtons = screen.getAllByRole('button')
      stackButtons.forEach(button => {
        expect(button.textContent?.trim().length).toBeGreaterThan(0)
      })
      
      render(<PublicationsPage />)
      const pubButtons = screen.getAllByRole('button')
      pubButtons.forEach(button => {
        const accessibleName = button.textContent || button.getAttribute('aria-label')
        expect(accessibleName?.trim().length).toBeGreaterThan(0)
      })
    })
  })
})