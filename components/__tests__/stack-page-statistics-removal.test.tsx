import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { StackPage } from '../StackPage'

describe('StackPage Statistics Removal', () => {
  it('should not display statistics in header', () => {
    render(<StackPage onViewModel={vi.fn()} />)
    
    // Verify statistics are not present
    expect(screen.queryByText('6 Model Sets')).not.toBeInTheDocument()
    expect(screen.queryByText('1.2k+ Downloads')).not.toBeInTheDocument()
    expect(screen.queryByText('259 Pages')).not.toBeInTheDocument()
  })

  it('should preserve header title and description', () => {
    render(<StackPage onViewModel={vi.fn()} />)
    
    // Verify header content is preserved
    expect(screen.getByText('Mathematical Macroeconomics Stack')).toBeInTheDocument()
    expect(screen.getByText(/A curated collection of mathematical models/)).toBeInTheDocument()
  })

  it('should maintain proper layout structure', () => {
    const { container } = render(<StackPage onViewModel={vi.fn()} />)
    
    // Verify the component renders without errors
    expect(container.firstChild).toBeInTheDocument()
    
    // Verify filter options are still present
    expect(screen.getByText('Filter:')).toBeInTheDocument()
    expect(screen.getByText('All Models')).toBeInTheDocument()
  })

  it('should preserve model functionality', () => {
    const mockOnViewModel = vi.fn()
    render(<StackPage onViewModel={mockOnViewModel} />)
    
    // Verify models are still displayed
    expect(screen.getByText('DSGE Model Framework')).toBeInTheDocument()
    expect(screen.getByText('Growth Theory Toolkit')).toBeInTheDocument()
    
    // Verify View Model buttons are present
    const viewButtons = screen.getAllByText('View Model')
    expect(viewButtons.length).toBeGreaterThan(0)
  })
})