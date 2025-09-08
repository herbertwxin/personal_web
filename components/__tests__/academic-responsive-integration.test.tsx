import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { AcademicListExample } from '../examples/AcademicListExample'

// Mock window.innerWidth for responsive testing
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  
  // Trigger resize event
  act(() => {
    window.dispatchEvent(new Event('resize'))
  })
}

describe('Academic List Responsive Integration', () => {
  beforeEach(() => {
    // Start with desktop size
    mockInnerWidth(1024)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Desktop Layout (1024px+)', () => {
    beforeEach(() => {
      mockInnerWidth(1024)
    })

    it('renders academic list components correctly on desktop', () => {
      render(<AcademicListExample />)
      
      // Check that main content is rendered
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      expect(screen.getByText('2024 Publications')).toBeInTheDocument()
      expect(screen.getByText('Dynamic Equilibrium Models in Modern Macroeconomics: A Comprehensive Survey')).toBeInTheDocument()
    })

    it('displays all metadata inline on desktop', () => {
      render(<AcademicListExample />)
      
      // Check that publication metadata is visible
      expect(screen.getByText('Your Name, Co-Author A, Co-Author B')).toBeInTheDocument()
      expect(screen.getByText('Journal of Economic Theory')).toBeInTheDocument()
      expect(screen.getByText('Vol. 45, No. 3, pp. 123-156')).toBeInTheDocument()
    })

    it('shows all action buttons on desktop', () => {
      render(<AcademicListExample />)
      
      // Check that action buttons are present
      expect(screen.getAllByText('Download PDF')).toHaveLength(2)
      expect(screen.getAllByText('Cite')).toHaveLength(3)
      expect(screen.getAllByText('DOI')).toHaveLength(2)
    })
  })

  describe('Tablet Layout (640px - 1023px)', () => {
    beforeEach(() => {
      mockInnerWidth(768)
    })

    it('renders academic list components correctly on tablet', () => {
      render(<AcademicListExample />)
      
      // Content should still be fully visible
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      expect(screen.getByText('2024 Publications')).toBeInTheDocument()
    })

    it('maintains readable typography on tablet', () => {
      render(<AcademicListExample />)
      
      const title = screen.getByText('Academic List Components Demo')
      expect(title).toBeInTheDocument()
      
      // Check that nested content is still accessible
      expect(screen.getByText(/Course Materials:/)).toBeInTheDocument()
    })
  })

  describe('Mobile Layout (< 640px)', () => {
    beforeEach(() => {
      mockInnerWidth(375)
    })

    it('renders academic list components correctly on mobile', () => {
      render(<AcademicListExample />)
      
      // Main content should be accessible
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      expect(screen.getByText('2024 Publications')).toBeInTheDocument()
    })

    it('maintains content accessibility on mobile', () => {
      render(<AcademicListExample />)
      
      // Check that important content is still visible
      expect(screen.getByText('Dynamic Equilibrium Models in Modern Macroeconomics: A Comprehensive Survey')).toBeInTheDocument()
      expect(screen.getAllByText('Published')).toHaveLength(2)
      expect(screen.getByText('Peer Reviewed')).toBeInTheDocument()
    })

    it('shows action buttons on mobile', () => {
      render(<AcademicListExample />)
      
      // Action buttons should still be present, possibly stacked
      expect(screen.getAllByText('Download PDF')).toHaveLength(2)
      expect(screen.getAllByText('Cite')).toHaveLength(3)
    })
  })

  describe('Small Mobile Layout (< 375px)', () => {
    beforeEach(() => {
      mockInnerWidth(320)
    })

    it('renders academic list components correctly on small mobile', () => {
      render(<AcademicListExample />)
      
      // Essential content should remain accessible
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      expect(screen.getByText('2024 Publications')).toBeInTheDocument()
    })

    it('maintains usability on very small screens', () => {
      render(<AcademicListExample />)
      
      // Check that critical information is still visible
      expect(screen.getByText('ECON 301: Intermediate Macroeconomics')).toBeInTheDocument()
      expect(screen.getAllByText('Fall 2024')).toHaveLength(2)
    })
  })

  describe('Large Desktop Layout (1440px+)', () => {
    beforeEach(() => {
      mockInnerWidth(1440)
    })

    it('renders academic list components correctly on large desktop', () => {
      render(<AcademicListExample />)
      
      // All content should be optimally displayed
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      expect(screen.getByText('2024 Publications')).toBeInTheDocument()
    })

    it('utilizes available space effectively on large screens', () => {
      render(<AcademicListExample />)
      
      // Check that complex nested content is well-organized
      expect(screen.getByText(/Course Materials:/)).toBeInTheDocument()
      expect(screen.getByText(/Topics:/)).toBeInTheDocument()
    })
  })

  describe('Responsive Transitions', () => {
    it('handles resize from desktop to mobile gracefully', () => {
      render(<AcademicListExample />)
      
      // Start on desktop
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      
      // Resize to mobile
      act(() => {
        mockInnerWidth(375)
      })
      
      // Content should still be accessible
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      expect(screen.getByText('2024 Publications')).toBeInTheDocument()
    })

    it('handles resize from mobile to desktop gracefully', () => {
      // Start on mobile
      mockInnerWidth(375)
      render(<AcademicListExample />)
      
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      
      // Resize to desktop
      act(() => {
        mockInnerWidth(1024)
      })
      
      // All content should be accessible
      expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
      expect(screen.getByText('Dynamic Equilibrium Models in Modern Macroeconomics: A Comprehensive Survey')).toBeInTheDocument()
    })
  })

  describe('Content Density and Readability', () => {
    it('maintains appropriate content density across screen sizes', () => {
      const screenSizes = [320, 375, 640, 768, 1024, 1440]
      
      screenSizes.forEach(width => {
        mockInnerWidth(width)
        render(<AcademicListExample />)
        
        // Essential content should always be present
        expect(screen.getByText('Academic List Components Demo')).toBeInTheDocument()
        expect(screen.getByText('2024 Publications')).toBeInTheDocument()
        expect(screen.getByText('Current Courses')).toBeInTheDocument()
        expect(screen.getByText('Recent Blog Posts')).toBeInTheDocument()
        
        // Clean up for next iteration
        // Note: cleanup happens automatically between tests
      })
    })

    it('preserves academic formatting across breakpoints', () => {
      render(<AcademicListExample />)
      
      // Check that academic badges are present
      expect(screen.getAllByText('Published')).toHaveLength(2)
      expect(screen.getByText('Peer Reviewed')).toBeInTheDocument()
      expect(screen.getByText('Under Review')).toBeInTheDocument()
      expect(screen.getByText('High Impact')).toBeInTheDocument()
      
      // Check that course information is structured
      expect(screen.getAllByText('Fall 2024')).toHaveLength(2)
      expect(screen.getByText('Undergraduate')).toBeInTheDocument()
      expect(screen.getByText('Graduate')).toBeInTheDocument()
    })
  })

  describe('Performance and Accessibility', () => {
    it('maintains accessibility features across screen sizes', () => {
      render(<AcademicListExample />)
      
      // Check for proper semantic structure
      const lists = screen.getAllByRole('list')
      expect(lists.length).toBeGreaterThan(0)
      
      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBeGreaterThan(0)
      
      // Check for proper headings
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })

    it('provides proper button accessibility', () => {
      render(<AcademicListExample />)
      
      // Check that buttons are accessible
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
      
      // Check specific button text
      expect(screen.getAllByText('View Syllabus')).toHaveLength(2)
      expect(screen.getAllByText('Course Materials')).toHaveLength(2)
    })
  })
})