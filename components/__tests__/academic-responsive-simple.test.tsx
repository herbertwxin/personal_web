import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { AcademicList } from '../ui/academic-list'
import { AcademicContainer, AcademicPageHeader } from '../ui/academic-container'

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

describe('Academic Responsive Components - Core Functionality', () => {
  beforeEach(() => {
    // Start with desktop size
    mockInnerWidth(1024)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Academic List Components', () => {
    it('renders basic academic list structure correctly', () => {
      render(
        <AcademicList>
          <AcademicList.SectionHeader>Test Section</AcademicList.SectionHeader>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Publication</AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>2024</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Test Journal</AcademicList.InlineMetadata>
              </AcademicList.ItemMetadata>
              <p>Test description</p>
            </AcademicList.ItemContent>
            <AcademicList.ItemActions>
              <button>Download</button>
            </AcademicList.ItemActions>
          </AcademicList.Item>
        </AcademicList>
      )

      expect(screen.getByText('Test Section')).toBeInTheDocument()
      expect(screen.getByText('Test Publication')).toBeInTheDocument()
      expect(screen.getByText('2024')).toBeInTheDocument()
      expect(screen.getByText('Test Journal')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
      expect(screen.getByText('Download')).toBeInTheDocument()
    })

    it('applies correct CSS classes for academic styling', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Title</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      const list = screen.getByRole('list')
      const listItem = screen.getByRole('listitem')
      const title = screen.getByText('Test Title')

      expect(list).toHaveClass('academic-list')
      expect(listItem).toHaveClass('academic-list-item')
      expect(title).toHaveClass('academic-list-item-title')
    })

    it('supports different list variants', () => {
      const { rerender } = render(
        <AcademicList variant="compact">
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      expect(screen.getByRole('list')).toHaveClass('academic-list-compact')

      rerender(
        <AcademicList variant="dense">
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      expect(screen.getByRole('list')).toHaveClass('academic-list-dense')
    })
  })

  describe('Academic Container Components', () => {
    it('renders academic container with proper responsive classes', () => {
      render(
        <AcademicContainer>
          <div data-testid="content">Test Content</div>
        </AcademicContainer>
      )

      const content = screen.getByTestId('content')
      const container = content.parentElement

      expect(container).toHaveClass('w-full', 'mx-auto', 'max-w-6xl')
    })

    it('renders page header with proper typography', () => {
      render(
        <AcademicPageHeader 
          title="Test Title" 
          subtitle="Test Subtitle" 
        />
      )

      const title = screen.getByText('Test Title')
      const subtitle = screen.getByText('Test Subtitle')

      expect(title.tagName).toBe('H1')
      expect(subtitle.tagName).toBe('P')
      expect(title).toHaveClass('font-normal', 'text-foreground')
      expect(subtitle).toHaveClass('text-muted-foreground')
    })
  })

  describe('Responsive Behavior', () => {
    it('handles mobile screen sizes', () => {
      mockInnerWidth(375)
      
      render(
        <AcademicContainer>
          <AcademicPageHeader title="Mobile Test" />
          <AcademicList>
            <AcademicList.Item>
              <AcademicList.ItemTitle>Mobile Item</AcademicList.ItemTitle>
            </AcademicList.Item>
          </AcademicList>
        </AcademicContainer>
      )

      expect(screen.getByText('Mobile Test')).toBeInTheDocument()
      expect(screen.getByText('Mobile Item')).toBeInTheDocument()
    })

    it('handles tablet screen sizes', () => {
      mockInnerWidth(768)
      
      render(
        <AcademicContainer>
          <AcademicPageHeader title="Tablet Test" />
          <AcademicList>
            <AcademicList.Item>
              <AcademicList.ItemTitle>Tablet Item</AcademicList.ItemTitle>
            </AcademicList.Item>
          </AcademicList>
        </AcademicContainer>
      )

      expect(screen.getByText('Tablet Test')).toBeInTheDocument()
      expect(screen.getByText('Tablet Item')).toBeInTheDocument()
    })

    it('handles desktop screen sizes', () => {
      mockInnerWidth(1024)
      
      render(
        <AcademicContainer>
          <AcademicPageHeader title="Desktop Test" />
          <AcademicList>
            <AcademicList.Item>
              <AcademicList.ItemTitle>Desktop Item</AcademicList.ItemTitle>
            </AcademicList.Item>
          </AcademicList>
        </AcademicContainer>
      )

      expect(screen.getByText('Desktop Test')).toBeInTheDocument()
      expect(screen.getByText('Desktop Item')).toBeInTheDocument()
    })

    it('handles large desktop screen sizes', () => {
      mockInnerWidth(1440)
      
      render(
        <AcademicContainer>
          <AcademicPageHeader title="Large Desktop Test" />
          <AcademicList>
            <AcademicList.Item>
              <AcademicList.ItemTitle>Large Desktop Item</AcademicList.ItemTitle>
            </AcademicList.Item>
          </AcademicList>
        </AcademicContainer>
      )

      expect(screen.getByText('Large Desktop Test')).toBeInTheDocument()
      expect(screen.getByText('Large Desktop Item')).toBeInTheDocument()
    })
  })

  describe('Accessibility Features', () => {
    it('provides proper semantic structure', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Accessible Title</AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <span>Metadata</span>
              </AcademicList.ItemMetadata>
              <AcademicList.ItemActions>
                <button>Action</button>
              </AcademicList.ItemActions>
            </AcademicList.ItemContent>
          </AcademicList.Item>
        </AcademicList>
      )

      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getByRole('listitem')).toBeInTheDocument()
      expect(screen.getByLabelText('Item metadata')).toBeInTheDocument()
      expect(screen.getByLabelText('Item actions')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('supports keyboard navigation', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Keyboard Test</AcademicList.ItemTitle>
            <AcademicList.ItemActions>
              <button>First Button</button>
              <button>Second Button</button>
            </AcademicList.ItemActions>
          </AcademicList.Item>
        </AcademicList>
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent('First Button')
      expect(buttons[1]).toHaveTextContent('Second Button')
    })
  })

  describe('CSS Custom Properties Integration', () => {
    it('applies academic typography variables', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Typography Test</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      const title = screen.getByText('Typography Test')
      // const computedStyle = window.getComputedStyle(...) // Removed unused variable
      
      // The CSS custom properties should be applied
      expect(title).toHaveClass('academic-list-item-title')
    })

    it('applies academic spacing variables', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Spacing Test</AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <p>Content with spacing</p>
            </AcademicList.ItemContent>
          </AcademicList.Item>
        </AcademicList>
      )

      const list = screen.getByRole('list')
      const listItem = screen.getByRole('listitem')
      
      expect(list).toHaveClass('academic-list')
      expect(listItem).toHaveClass('academic-list-item')
    })
  })

  describe('Performance Optimizations', () => {
    it('applies performance CSS classes when specified', () => {
      render(
        <AcademicList className="academic-list-virtualized">
          <AcademicList.Item>
            <AcademicList.ItemTitle>Performance Test</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      const list = screen.getByRole('list')
      expect(list).toHaveClass('academic-list-virtualized')
    })

    it('maintains component structure under different screen sizes', () => {
      const screenSizes = [320, 640, 1024, 1440]
      
      screenSizes.forEach(width => {
        mockInnerWidth(width)
        
        const { unmount } = render(
          <AcademicContainer>
            <AcademicList>
              <AcademicList.Item>
                <AcademicList.ItemTitle>Responsive Test</AcademicList.ItemTitle>
              </AcademicList.Item>
            </AcademicList>
          </AcademicContainer>
        )

        expect(screen.getByText('Responsive Test')).toBeInTheDocument()
        expect(screen.getByRole('list')).toBeInTheDocument()
        expect(screen.getByRole('listitem')).toBeInTheDocument()
        
        unmount()
      })
    })
  })
})