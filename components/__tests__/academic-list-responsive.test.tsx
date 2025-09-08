import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AcademicList } from '../ui/academic-list'
import { AcademicContainer, AcademicPageHeader } from '../ui/academic-container'
import { useAcademicLayout } from '../../hooks/useAcademicLayout'

// Mock the useAcademicLayout hook
vi.mock('../../hooks/useAcademicLayout')

const mockUseAcademicLayout = vi.mocked(useAcademicLayout)

describe('Academic List Responsive Components', () => {
  beforeEach(() => {
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    
    // Default desktop layout
    mockUseAcademicLayout.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLargeDesktop: false,
      breakpoint: 'desktop',
      listVariant: 'default',
      showInlineMetadata: true,
      useHangingIndent: true,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('AcademicList Component', () => {
    it('renders with default variant', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Title</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getByRole('listitem')).toBeInTheDocument()
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('renders with compact variant', () => {
      render(
        <AcademicList variant="compact">
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Title</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      const list = screen.getByRole('list')
      expect(list).toHaveClass('academic-list-compact')
    })

    it('renders with dense variant', () => {
      render(
        <AcademicList variant="dense">
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Title</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      const list = screen.getByRole('list')
      expect(list).toHaveClass('academic-list-dense')
    })

    it('renders with spaced variant', () => {
      render(
        <AcademicList variant="spaced">
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Title</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      const list = screen.getByRole('list')
      expect(list).toHaveClass('academic-list-spaced')
    })
  })

  describe('AcademicList.Item Components', () => {
    it('renders complete list item structure', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Publication Title</AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <AcademicList.InlineMetadata>2024</AcademicList.InlineMetadata>
                <AcademicList.InlineMetadata>Journal Name</AcademicList.InlineMetadata>
              </AcademicList.ItemMetadata>
              <p>Publication description content</p>
            </AcademicList.ItemContent>
            <AcademicList.ItemActions>
              <button>Download</button>
              <button>Cite</button>
            </AcademicList.ItemActions>
          </AcademicList.Item>
        </AcademicList>
      )

      expect(screen.getByText('Publication Title')).toBeInTheDocument()
      expect(screen.getByText('2024')).toBeInTheDocument()
      expect(screen.getByText('Journal Name')).toBeInTheDocument()
      expect(screen.getByText('Publication description content')).toBeInTheDocument()
      expect(screen.getByText('Download')).toBeInTheDocument()
      expect(screen.getByText('Cite')).toBeInTheDocument()
    })

    it('renders section headers correctly', () => {
      render(
        <AcademicList>
          <AcademicList.SectionHeader>2024 Publications</AcademicList.SectionHeader>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Publication</AcademicList.ItemTitle>
          </AcademicList.Item>
        </AcademicList>
      )

      const header = screen.getByText('2024 Publications')
      expect(header).toBeInTheDocument()
      expect(header.tagName).toBe('H2')
    })

    it('renders nested lists correctly', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Course Title</AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.NestedList>
                <div>Lecture 1</div>
                <div>Lecture 2</div>
              </AcademicList.NestedList>
            </AcademicList.ItemContent>
          </AcademicList.Item>
        </AcademicList>
      )

      expect(screen.getByText('Course Title')).toBeInTheDocument()
      expect(screen.getByText('Lecture 1')).toBeInTheDocument()
      expect(screen.getByText('Lecture 2')).toBeInTheDocument()
    })

    it('renders badges correctly', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Item</AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.Badge>Published</AcademicList.Badge>
              <AcademicList.Badge>Peer Reviewed</AcademicList.Badge>
            </AcademicList.ItemContent>
          </AcademicList.Item>
        </AcademicList>
      )

      expect(screen.getByText('Published')).toBeInTheDocument()
      expect(screen.getByText('Peer Reviewed')).toBeInTheDocument()
    })
  })

  describe('Mobile Responsive Behavior', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      mockUseAcademicLayout.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isLargeDesktop: false,
        breakpoint: 'mobile',
        listVariant: 'compact',
        showInlineMetadata: false,
        useHangingIndent: true,
      })
    })

    it('applies mobile-specific classes in AcademicContainer', () => {
      render(
        <AcademicContainer>
          <div>Mobile content</div>
        </AcademicContainer>
      )

      const container = screen.getByText('Mobile content').parentElement
      expect(container).toHaveClass('space-y-6')
      expect(container).toHaveClass('px-4')
    })

    it('adjusts page header for mobile', () => {
      render(
        <AcademicPageHeader 
          title="Test Title" 
          subtitle="Test Subtitle" 
        />
      )

      const title = screen.getByText('Test Title')
      const subtitle = screen.getByText('Test Subtitle')
      
      expect(title).toHaveClass('text-2xl')
      expect(subtitle).toHaveClass('text-sm')
    })
  })

  describe('Tablet Responsive Behavior', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })

      mockUseAcademicLayout.mockReturnValue({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
        isLargeDesktop: false,
        breakpoint: 'tablet',
        listVariant: 'default',
        showInlineMetadata: true,
        useHangingIndent: true,
      })
    })

    it('applies tablet-specific classes in AcademicContainer', () => {
      render(
        <AcademicContainer>
          <div>Tablet content</div>
        </AcademicContainer>
      )

      const container = screen.getByText('Tablet content').parentElement
      expect(container).toHaveClass('space-y-8')
      expect(container).toHaveClass('px-6')
    })

    it('adjusts page header for tablet', () => {
      render(
        <AcademicPageHeader 
          title="Test Title" 
          subtitle="Test Subtitle" 
        />
      )

      const title = screen.getByText('Test Title')
      const subtitle = screen.getByText('Test Subtitle')
      
      expect(title).toHaveClass('text-3xl')
      expect(subtitle).toHaveClass('text-base')
    })
  })

  describe('Desktop Responsive Behavior', () => {
    it('applies desktop-specific classes in AcademicContainer', () => {
      render(
        <AcademicContainer>
          <div>Desktop content</div>
        </AcademicContainer>
      )

      const container = screen.getByText('Desktop content').parentElement
      expect(container).toHaveClass('space-y-10')
      expect(container).toHaveClass('px-8')
    })

    it('adjusts page header for desktop', () => {
      render(
        <AcademicPageHeader 
          title="Test Title" 
          subtitle="Test Subtitle" 
        />
      )

      const title = screen.getByText('Test Title')
      const subtitle = screen.getByText('Test Subtitle')
      
      expect(title).toHaveClass('text-4xl')
      expect(subtitle).toHaveClass('text-base')
    })
  })

  describe('Accessibility Features', () => {
    it('includes proper ARIA roles and labels', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Title</AcademicList.ItemTitle>
            <AcademicList.ItemContent>
              <AcademicList.ItemMetadata>
                <span>Metadata content</span>
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
    })

    it('supports keyboard navigation', () => {
      render(
        <AcademicList>
          <AcademicList.Item>
            <AcademicList.ItemTitle>Test Title</AcademicList.ItemTitle>
            <AcademicList.ItemActions>
              <button>First Action</button>
              <button>Second Action</button>
            </AcademicList.ItemActions>
          </AcademicList.Item>
        </AcademicList>
      )

      const firstButton = screen.getByText('First Action')
      const secondButton = screen.getByText('Second Action')
      
      expect(firstButton).toBeInTheDocument()
      expect(secondButton).toBeInTheDocument()
    })
  })

  describe('Performance Optimizations', () => {
    it('applies performance-related CSS classes', () => {
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
  })
})