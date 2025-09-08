import { render, screen } from '@testing-library/react'
import { TeachingPage } from '../TeachingPage'

describe('Teaching Page - Sections Removal', () => {
  it('should not display statistics section in header', () => {
    render(<TeachingPage />)
    
    // Verify the statistics numbers are not present
    expect(screen.queryByText('4')).not.toBeInTheDocument()
    expect(screen.queryByText('Active Courses')).not.toBeInTheDocument()
    expect(screen.queryByText('500+')).not.toBeInTheDocument()
    expect(screen.queryByText('Resources')).not.toBeInTheDocument()
    expect(screen.queryByText('1200+')).not.toBeInTheDocument()
    expect(screen.queryByText('Students Taught')).not.toBeInTheDocument()
  })

  it('should not display Need Additional Support section', () => {
    render(<TeachingPage />)
    
    // Verify the support section is not present
    expect(screen.queryByText('Need Additional Support?')).not.toBeInTheDocument()
    expect(screen.queryByText(/Looking for tutoring, research guidance/)).not.toBeInTheDocument()
    expect(screen.queryByText('Schedule Office Hours')).not.toBeInTheDocument()
  })

  it('should still display the main header content', () => {
    render(<TeachingPage />)
    
    // Verify the main header content is still present
    expect(screen.getByText('Teaching Materials')).toBeInTheDocument()
    expect(screen.getByText(/Educational resources, course materials, and tutorials/)).toBeInTheDocument()
  })

  it('should still display course and resource sections', () => {
    render(<TeachingPage />)
    
    // Verify main content sections are still present
    expect(screen.getByText('Current Courses')).toBeInTheDocument()
    expect(screen.getByText('Additional Resources')).toBeInTheDocument()
    
    // Verify some course content is still there
    expect(screen.getAllByText(/Advanced Macroeconomic Theory/)).toHaveLength(2) // I and II
    expect(screen.getByText(/DSGE Modeling Tutorial Series/)).toBeInTheDocument()
  })
})