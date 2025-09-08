import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { HomePage } from '../HomePage'
import { BlogPage } from '../BlogPage'
import { ResumePage } from '../ResumePage'
import { TeachingPage } from '../TeachingPage'
import App from '../../App'

// Mock UI components that might cause issues
vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}))

vi.mock('../ui/badge', () => ({
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}))

vi.mock('../ui/dialog', () => ({
  Dialog: ({ children }: any) => <div>{children}</div>,
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogDescription: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
  DialogTrigger: ({ children }: any) => <div>{children}</div>,
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}))

// Mock Navigation component to avoid complex dependencies
vi.mock('../Navigation', () => ({
  Navigation: ({ onPageChange }: any) => (
    <nav>
      <button onClick={() => onPageChange('home')}>Home</button>
      <button onClick={() => onPageChange('blog')}>Blog</button>
      <button onClick={() => onPageChange('resume')}>Resume</button>
      <button onClick={() => onPageChange('teaching')}>Teaching</button>
    </nav>
  ),
}))

// Mock window dimensions for responsive tests
const mockWindowDimensions = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
}

describe('Content Positioning Tests', () => {
  beforeEach(() => {
    // Reset window dimensions to desktop default
    mockWindowDimensions(1024, 768)
    
    // Mock performance API
    global.performance = {
      ...global.performance,
      mark: vi.fn(),
      measure: vi.fn(),
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('HomePage Content Positioning', () => {
    it('should render HomePage content immediately visible on load', async () => {
      render(<HomePage />)
      
      // Verify hero section is present and positioned correctly
      const heroTitle = screen.getByText('Dr. Academic Researcher')
      expect(heroTitle).toBeInTheDocument()
      
      // Check that the main container has proper spacing
      const mainContainer = heroTitle.closest('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('pb-12', 'px-6')
      
      // Verify hero content is in the first section (should be immediately visible)
      const heroSection = screen.getByText('Professor of Economics').closest('div')
      expect(heroSection).toBeInTheDocument()
      
      // Check that content doesn't have excessive top padding
      const contentWrapper = screen.getByText('Dr. Academic Researcher').closest('.max-w-6xl')
      expect(contentWrapper).toBeInTheDocument()
      
      await waitFor(() => {
        expect(heroTitle).toBeVisible()
      })
    })

    it('should have appropriate spacing for navigation clearance', () => {
      render(<HomePage />)
      
      // Verify the main container doesn't have excessive top padding
      const mainContainer = screen.getByText('Dr. Academic Researcher').closest('.min-h-screen')
      expect(mainContainer).not.toHaveClass('pt-20') // Should not have excessive padding
      expect(mainContainer).not.toHaveClass('pt-8') // Should not have redundant padding
    })

    it('should display office hours and contact information immediately', () => {
      render(<HomePage />)
      
      // Verify office hours section is visible
      expect(screen.getByText('Office Hours')).toBeInTheDocument()
      expect(screen.getByText('Monday')).toBeInTheDocument()
      expect(screen.getByText('2:00 - 4:00 PM')).toBeInTheDocument()
      
      // Verify contact information is visible
      expect(screen.getByText('Economics Building, Room 304')).toBeInTheDocument()
    })
  })

  describe('BlogPage Content Positioning', () => {
    it('should render BlogPage content with consistent spacing', () => {
      const mockOnReadPost = vi.fn()
      render(<BlogPage onReadPost={mockOnReadPost} />)
      
      // Verify header is present and positioned correctly
      const pageTitle = screen.getByText('Academic Blog')
      expect(pageTitle).toBeInTheDocument()
      
      // Check main container spacing
      const mainContainer = pageTitle.closest('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('pt-8', 'pb-12', 'px-6')
      
      // Verify content is immediately accessible
      expect(screen.getByText(/Insights, thoughts, and discussions/)).toBeInTheDocument()
    })

    it('should display blog posts without excessive top spacing', () => {
      const mockOnReadPost = vi.fn()
      render(<BlogPage onReadPost={mockOnReadPost} />)
      
      // Verify featured post is visible
      expect(screen.getByText('Featured')).toBeInTheDocument()
      expect(screen.getByText('Understanding DSGE Models in Modern Economics')).toBeInTheDocument()
      
      // Check that blog posts are positioned appropriately
      const featuredPost = screen.getByText('Understanding DSGE Models in Modern Economics').closest('.border-l-4')
      expect(featuredPost).toBeInTheDocument()
    })
  })

  describe('ResumePage Content Positioning', () => {
    it('should render ResumePage content with proper spacing', () => {
      render(<ResumePage />)
      
      // Verify header is present
      const pageTitle = screen.getByText('Curriculum Vitae')
      expect(pageTitle).toBeInTheDocument()
      
      // Check main container spacing
      const mainContainer = pageTitle.closest('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('pt-8', 'pb-12', 'px-6')
      
      // Verify education section is immediately visible
      expect(screen.getByText('Education')).toBeInTheDocument()
      expect(screen.getByText('Ph.D. in Economics')).toBeInTheDocument()
    })

    it('should display professional experience without scrolling', () => {
      render(<ResumePage />)
      
      // Verify professional experience section
      expect(screen.getByText('Professional Experience')).toBeInTheDocument()
      expect(screen.getByText('Professor of Economics')).toBeInTheDocument()
    })
  })

  describe('TeachingPage Content Positioning', () => {
    it('should render TeachingPage content with consistent spacing', () => {
      render(<TeachingPage />)
      
      // Verify header is present
      const pageTitle = screen.getByText('Teaching Materials')
      expect(pageTitle).toBeInTheDocument()
      
      // Check main container spacing
      const mainContainer = pageTitle.closest('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('pt-8', 'pb-12', 'px-6')
      
      // Verify course statistics are visible
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('Active Courses')).toBeInTheDocument()
    })

    it('should display current courses immediately', () => {
      render(<TeachingPage />)
      
      // Verify current courses section
      expect(screen.getByText('Current Courses')).toBeInTheDocument()
      expect(screen.getByText('ECON 8301')).toBeInTheDocument()
      expect(screen.getByText('Advanced Macroeconomic Theory I')).toBeInTheDocument()
    })
  })

  describe('App Component Content Positioning', () => {
    it('should render App with proper main content padding', () => {
      render(<App />)
      
      // Verify main element has correct padding classes
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      expect(mainElement).toHaveClass('pt-14', 'sm:pt-15', 'md:pt-16')
      
      // Verify HomePage content is rendered by default
      expect(screen.getByText('Dr. Academic Researcher')).toBeInTheDocument()
    })

    it('should have navigation positioned correctly', () => {
      render(<App />)
      
      // Navigation should be present
      // const navigation = document.querySelector('nav') || document.querySelector('[role="navigation"]')
      // Navigation component might not have explicit nav tag, so we check for its content
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })

  describe('Responsive Content Positioning', () => {
    it('should maintain proper spacing on mobile devices', () => {
      // Mock mobile viewport
      mockWindowDimensions(375, 667)
      
      render(<HomePage />)
      
      // Verify content is still properly positioned on mobile
      const heroTitle = screen.getByText('Dr. Academic Researcher')
      expect(heroTitle).toBeInTheDocument()
      
      // Check that mobile-specific classes are applied correctly
      const mainContainer = heroTitle.closest('.min-h-screen')
      expect(mainContainer).toHaveClass('px-6') // Should maintain horizontal padding
    })

    it('should maintain proper spacing on tablet devices', () => {
      // Mock tablet viewport
      mockWindowDimensions(768, 1024)
      
      render(<BlogPage onReadPost={vi.fn()} />)
      
      // Verify content positioning on tablet
      const pageTitle = screen.getByText('Academic Blog')
      expect(pageTitle).toBeInTheDocument()
      
      const mainContainer = pageTitle.closest('.min-h-screen')
      expect(mainContainer).toHaveClass('pt-8', 'pb-12', 'px-6')
    })

    it('should maintain proper spacing on desktop devices', () => {
      // Mock desktop viewport
      mockWindowDimensions(1920, 1080)
      
      render(<ResumePage />)
      
      // Verify content positioning on desktop
      const pageTitle = screen.getByText('Curriculum Vitae')
      expect(pageTitle).toBeInTheDocument()
      
      const mainContainer = pageTitle.closest('.min-h-screen')
      expect(mainContainer).toHaveClass('pt-8', 'pb-12', 'px-6')
    })
  })

  describe('Navigation Clearance Tests', () => {
    it('should ensure navigation never overlaps content', () => {
      render(<App />)
      
      // Check that main content has appropriate top padding
      const mainElement = document.querySelector('main')
      expect(mainElement).toHaveClass('pt-14', 'sm:pt-15', 'md:pt-16')
      
      // Verify content starts below navigation
      const heroContent = screen.getByText('Dr. Academic Researcher')
      expect(heroContent).toBeInTheDocument()
    })

    it('should have appropriate visual spacing between navigation and content', () => {
      render(<App />)
      
      // Verify the spacing calculation: navigation height + visual spacing
      // pt-14 = 56px, pt-15 = 60px, pt-16 = 64px (responsive)
      const mainElement = document.querySelector('main')
      expect(mainElement).toHaveClass('pt-14') // Base mobile spacing
      expect(mainElement).toHaveClass('sm:pt-15') // Small screen spacing
      expect(mainElement).toHaveClass('md:pt-16') // Medium+ screen spacing
    })
  })

  describe('Content Visibility Tests', () => {
    it('should ensure HomePage hero section is immediately visible', async () => {
      render(<HomePage />)
      
      // Hero content should be visible without scrolling
      const heroTitle = screen.getByText('Dr. Academic Researcher')
      const heroSubtitle = screen.getByText('Professor of Economics')
      const heroDescription = screen.getByText(/Advancing the frontiers of macroeconomic theory/)
      
      await waitFor(() => {
        expect(heroTitle).toBeVisible()
        expect(heroSubtitle).toBeVisible()
        expect(heroDescription).toBeVisible()
      })
    })

    it('should ensure all page headers are immediately visible', async () => {
      const pages = [
        { component: <BlogPage onReadPost={vi.fn()} />, title: 'Academic Blog' },
        { component: <ResumePage />, title: 'Curriculum Vitae' },
        { component: <TeachingPage />, title: 'Teaching Materials' },
      ]

      for (const page of pages) {
        const { unmount } = render(page.component)
        
        await waitFor(() => {
          expect(screen.getByText(page.title)).toBeVisible()
        })
        
        unmount()
      }
    })
  })

  describe('Spacing Consistency Tests', () => {
    it('should use consistent padding across all pages', () => {
      const pages = [
        <HomePage />,
        <BlogPage onReadPost={vi.fn()} />,
        <ResumePage />,
        <TeachingPage />,
      ]

      pages.forEach((page) => {
        const { unmount } = render(page)
        
        // All pages should have consistent main container classes
        const mainContainer = document.querySelector('.min-h-screen')
        expect(mainContainer).toBeInTheDocument()
        
        // Check for consistent horizontal padding
        expect(mainContainer).toHaveClass('px-6')
        
        // Check for consistent bottom padding
        expect(mainContainer).toHaveClass('pb-12')
        
        unmount()
      })
    })

    it('should follow the same spacing calculation method', () => {
      render(<App />)
      
      // Main content should use calculated spacing: navigation height + visual spacing
      const mainElement = document.querySelector('main')
      
      // Responsive padding should account for navigation height (48px) + visual spacing
      expect(mainElement).toHaveClass('pt-14') // 56px for mobile
      expect(mainElement).toHaveClass('sm:pt-15') // 60px for small screens  
      expect(mainElement).toHaveClass('md:pt-16') // 64px for medium+ screens
    })
  })
})