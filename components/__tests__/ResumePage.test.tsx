import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ResumePage } from '../ResumePage'

describe('ResumePage', () => {
  it('renders the academic CV format correctly', () => {
    render(<ResumePage />)
    
    // Check main heading
    expect(screen.getByText('Curriculum Vitae')).toBeInTheDocument()
    
    // Check section headers
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument()
    expect(screen.getByText('Awards & Recognition')).toBeInTheDocument()
    
    // Check education entries
    expect(screen.getByText('Ph.D. in Economics')).toBeInTheDocument()
    expect(screen.getAllByText('Harvard University')).toHaveLength(2) // PhD and award
    
    // Check experience entries
    expect(screen.getByText('Professor of Economics')).toBeInTheDocument()
    expect(screen.getAllByText('University of Excellence')).toHaveLength(2) // Experience and award
    
    // Check skills are displayed as comma-separated text
    expect(screen.getByText('MATLAB, Python, R, Stata, Dynare')).toBeInTheDocument()
    
    // Check awards
    expect(screen.getByText('Excellence in Teaching Award')).toBeInTheDocument()
    
    // Check download button
    expect(screen.getByText('Download PDF')).toBeInTheDocument()
  })

  it('displays dates consistently on the right side', () => {
    render(<ResumePage />)
    
    // Check that dates are present for education and experience
    expect(screen.getByText('2015-2020')).toBeInTheDocument()
    expect(screen.getByText('2023-Present')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument() // Award year
  })

  it('uses academic formatting without decorative elements', () => {
    const { container } = render(<ResumePage />)
    
    // Check that there are no decorative border classes
    expect(container.querySelector('.border-l-4')).not.toBeInTheDocument()
    expect(container.querySelector('.border-\\[\\#d6ceff\\]')).not.toBeInTheDocument()
    
    // Check for clean academic styling
    expect(container.querySelector('.border-b.border-gray-200')).toBeInTheDocument()
  })
})