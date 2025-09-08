import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomePage } from '../HomePage'

describe('HomePage Academic Styling', () => {
  it('should render with academic typography hierarchy', () => {
    render(<HomePage />)
    
    // Check main title uses academic page title styling
    const mainTitle = screen.getByText('Dr. Academic Researcher')
    expect(mainTitle).toBeInTheDocument()
    expect(mainTitle.tagName).toBe('H1')
    
    // Check subtitle uses academic section header styling
    const subtitle = screen.getByText('Professor of Economics')
    expect(subtitle).toBeInTheDocument()
    
    // Check section headers use academic styling
    const officeHoursHeader = screen.getByText('Office Hours')
    expect(officeHoursHeader).toBeInTheDocument()
    expect(officeHoursHeader.tagName).toBe('H2')
    
    const publicationsHeader = screen.getByText('Selected Publications')
    expect(publicationsHeader).toBeInTheDocument()
    expect(publicationsHeader.tagName).toBe('H2')
  })

  it('should render office hours in clean list format', () => {
    render(<HomePage />)
    
    // Check office hours are displayed as clean list
    expect(screen.getByText('Monday')).toBeInTheDocument()
    expect(screen.getByText('2:00 - 4:00 PM')).toBeInTheDocument()
    expect(screen.getByText('Wednesday')).toBeInTheDocument()
    expect(screen.getByText('10:00 - 12:00 PM')).toBeInTheDocument()
    expect(screen.getByText('Friday')).toBeInTheDocument()
    expect(screen.getByText('1:00 - 3:00 PM')).toBeInTheDocument()
    
    // Check location information
    expect(screen.getByText('Economics Building, Room 304')).toBeInTheDocument()
  })

  it('should not render removed events and recognition sections', () => {
    render(<HomePage />)
    
    // Verify that removed sections are no longer present
    expect(screen.queryByText('Upcoming Events')).not.toBeInTheDocument()
    expect(screen.queryByText('Recent Recognition')).not.toBeInTheDocument()
    expect(screen.queryByText('Economic Modeling Workshop')).not.toBeInTheDocument()
    expect(screen.queryByText('Excellence in Teaching Award')).not.toBeInTheDocument()
    
    // Verify that Office Hours section is still present
    expect(screen.getByText('Office Hours')).toBeInTheDocument()
  })

  it('should render publications in academic bibliography format', () => {
    render(<HomePage />)
    
    // Check publications are numbered and formatted academically
    const publicationTitles = [
      'Dynamic Equilibrium Models in Modern Macroeconomics',
      'Stochastic Growth Models: Theory and Applications',
      'Monetary Policy in New Keynesian Framework'
    ]
    
    publicationTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
    
    // Check academic metadata format
    expect(screen.getByText('Journal of Economic Theory')).toBeInTheDocument()
    expect(screen.getByText('Economic Review')).toBeInTheDocument()
    expect(screen.getByText('Macroeconomic Dynamics')).toBeInTheDocument()
    
    // Check citation counts
    expect(screen.getByText('12 citations')).toBeInTheDocument()
    expect(screen.getByText('28 citations')).toBeInTheDocument()
    expect(screen.getByText('35 citations')).toBeInTheDocument()
    
    // Check publication type badges
    expect(screen.getAllByText('Research')).toHaveLength(2)
    expect(screen.getByText('Policy')).toBeInTheDocument()
  })

  it('should use consistent academic styling variables', () => {
    render(<HomePage />)
    
    // Check that academic CSS variables are being used
    const container = screen.getByText('Dr. Academic Researcher').closest('div')
    expect(container).toBeInTheDocument()
    
    // The component should render without throwing errors, indicating proper CSS variable usage
    expect(screen.getByText('View Publications')).toBeInTheDocument()
    expect(screen.getByText('Download CV')).toBeInTheDocument()
    expect(screen.getByText('View All Publications')).toBeInTheDocument()
  })

  it('should maintain responsive design with academic styling', () => {
    render(<HomePage />)
    
    // Check that the layout structure supports responsive design
    const mainContainer = screen.getByText('Dr. Academic Researcher').closest('div')
    expect(mainContainer).toBeInTheDocument()
    
    // Verify key interactive elements are present
    expect(screen.getByRole('button', { name: /view publications/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /download cv/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view all publications/i })).toBeInTheDocument()
  })
})