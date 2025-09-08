import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PublicationsPage } from '../PublicationsPage'

describe('PublicationsPage - Statistics Removal', () => {
  it('should not display statistics in header', () => {
    render(<PublicationsPage />)
    
    // Verify the statistics are not present
    expect(screen.queryByText(/15\+ Publications/)).not.toBeInTheDocument()
    expect(screen.queryByText(/300\+ Citations/)).not.toBeInTheDocument()
    expect(screen.queryByText(/h-index: 12/)).not.toBeInTheDocument()
  })

  it('should maintain header structure with title and description', () => {
    render(<PublicationsPage />)
    
    // Verify the header content is preserved
    expect(screen.getByRole('heading', { name: /Publications/i })).toBeInTheDocument()
    expect(screen.getByText(/A collection of my research contributions to macroeconomic theory and applied economics/)).toBeInTheDocument()
  })

  it('should maintain proper header layout and spacing', () => {
    render(<PublicationsPage />)
    
    // Verify the header element exists with proper structure
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('mb-12')
    
    // Verify title has proper styling
    const title = screen.getByRole('heading', { name: /Publications/i })
    expect(title).toHaveClass('text-[2.5rem]', 'font-normal', 'text-black', 'mb-6', 'leading-tight')
  })
})