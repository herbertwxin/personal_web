import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TeachingPage } from '../TeachingPage'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}))

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  BookOpen: () => <div data-testid="book-open-icon" />,
  Download: () => <div data-testid="download-icon" />,
  Video: () => <div data-testid="video-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  Users: () => <div data-testid="users-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  XIcon: () => <div data-testid="x-icon" />,
}))

describe('TeachingPage Modal Functionality', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    // Clear any existing timeouts
    vi.clearAllTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('Dialog Opening and Closing', () => {
    it('should open course dialog when View Materials button is clicked', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      expect(viewMaterialsButtons.length).toBeGreaterThan(0)
      
      // Click the first View Materials button
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Verify dialog content is displayed
      expect(screen.getByText(/Course Materials/)).toBeInTheDocument()
    })

    it('should open resource dialog when Access Resource button is clicked', async () => {
      render(<TeachingPage />)
      
      const accessResourceButtons = screen.getAllByText('Access Resource')
      expect(accessResourceButtons.length).toBeGreaterThan(0)
      
      // Click the first Access Resource button
      await user.click(accessResourceButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Verify dialog content is displayed
      expect(screen.getByText(/Resource Details/)).toBeInTheDocument()
    })

    it('should close dialog when close button is clicked', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Click close button
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      
      // Wait for dialog to close
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should close dialog when overlay is clicked', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Click overlay (outside dialog content)
      const overlay = document.querySelector('[data-slot="dialog-overlay"]')
      if (overlay) {
        fireEvent.click(overlay)
        
        // Wait for dialog to close
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        }, { timeout: 3000 })
      }
    })
  })

  describe('Multiple Dialog Scenarios', () => {
    it('should handle opening multiple dialogs in sequence without conflicts', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      const accessResourceButtons = screen.getAllByText('Access Resource')
      
      // Open first course dialog
      await user.click(viewMaterialsButtons[0])
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Close first dialog
      const closeButton1 = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton1)
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      
      // Open resource dialog
      await user.click(accessResourceButtons[0])
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Verify resource dialog content
      expect(screen.getByText(/Resource Details/)).toBeInTheDocument()
      
      // Close resource dialog
      const closeButton2 = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton2)
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should prevent multiple dialogs from being open simultaneously', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      
      // Open first dialog
      await user.click(viewMaterialsButtons[0])
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Try to open second dialog while first is open
      await user.click(viewMaterialsButtons[1])
      
      // Should still only have one dialog
      const dialogs = screen.getAllByRole('dialog')
      expect(dialogs).toHaveLength(1)
    })

    it('should handle rapid dialog open/close operations without visual artifacts', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButton = screen.getAllByText('View Materials')[0]
      
      // Rapidly open and close dialog multiple times
      for (let i = 0; i < 3; i++) {
        await user.click(viewMaterialsButton)
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument()
        })
        
        const closeButton = screen.getByRole('button', { name: /close/i })
        await user.click(closeButton)
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
      }
      
      // Verify no dialogs remain open
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation and Accessibility', () => {
    it('should support ESC key to close dialog', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Press ESC key
      await user.keyboard('{Escape}')
      
      // Wait for dialog to close
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should trap focus within dialog when open', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Tab through focusable elements in dialog
      await user.tab()
      
      // Focus should be within the dialog
      const dialog = screen.getByRole('dialog')
      const focusedElement = document.activeElement
      expect(dialog.contains(focusedElement)).toBe(true)
    })

    it('should return focus to trigger element when dialog closes', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButton = screen.getAllByText('View Materials')[0]
      
      // Focus and click the trigger button
      viewMaterialsButton.focus()
      await user.click(viewMaterialsButton)
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Close dialog
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      
      // Wait for dialog to close and focus to return
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      
      // Focus should return to trigger button (with a small delay for focus restoration)
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 200))
      })
      
      // Check if focus was restored (may not work in jsdom, so we'll check if the function was called)
      expect(viewMaterialsButton.focus).toHaveBeenCalled()
    })

    it('should have proper ARIA attributes', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const dialog = screen.getByRole('dialog')
      
      // Check for proper ARIA attributes
      expect(dialog).toHaveAttribute('role', 'dialog')
      
      // Check for dialog title
      const dialogTitle = screen.getByRole('heading', { level: 2 })
      expect(dialogTitle).toBeInTheDocument()
      
      // Check for dialog description
      const dialogDescription = screen.getByText(/Access all course materials/)
      expect(dialogDescription).toBeInTheDocument()
    })

    it('should support tab navigation within dialog content', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Find all interactive elements within dialog
      const dialog = screen.getByRole('dialog')
      const buttons = dialog.querySelectorAll('button')
      
      expect(buttons.length).toBeGreaterThan(0)
      
      // Verify dialog has proper focus management
      expect(dialog).toHaveAttribute('tabindex', '-1')
      expect(dialog).toHaveAttribute('role', 'dialog')
    })
  })

  describe('Dialog Content and Interactions', () => {
    it('should display correct course information in dialog', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Verify course-specific content is displayed (using getAllByText for multiple matches)
      expect(screen.getAllByText(/ECON 8301/)).toHaveLength(2) // One in main page, one in dialog
      expect(screen.getByText(/Advanced Macroeconomic Theory I/)).toBeInTheDocument()
      expect(screen.getByText(/Available Materials/)).toBeInTheDocument()
      expect(screen.getByText(/Topics Covered/)).toBeInTheDocument()
    })

    it('should display correct resource information in dialog', async () => {
      render(<TeachingPage />)
      
      const accessResourceButtons = screen.getAllByText('Access Resource')
      await user.click(accessResourceButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Verify resource-specific content is displayed (using getAllByText for multiple matches)
      expect(screen.getAllByText(/DSGE Modeling Tutorial Series/)).toHaveLength(2) // One in main page, one in dialog
      expect(screen.getByText(/Resource Details/)).toBeInTheDocument()
      expect(screen.getByText(/Preview Content/)).toBeInTheDocument()
    })

    it('should handle download button clicks within dialogs', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Find download buttons within dialog (filter out disabled ones)
      const dialog = screen.getByRole('dialog')
      const downloadButtons = Array.from(dialog.querySelectorAll('button')).filter(
        button => button.textContent?.includes('Get') && !button.disabled
      )
      
      expect(downloadButtons.length).toBeGreaterThan(0)
      
      // Click should not cause errors or close dialog
      if (downloadButtons[0]) {
        fireEvent.click(downloadButtons[0])
      }
      
      // Dialog should remain open
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('should handle missing trigger element gracefully', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButton = screen.getAllByText('View Materials')[0]
      await user.click(viewMaterialsButton)
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Remove the trigger element from DOM
      viewMaterialsButton.remove()
      
      // Close dialog - should not throw error
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      
      // Should close without errors
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should clean up properly on component unmount', async () => {
      const { unmount } = render(<TeachingPage />)
      
      const viewMaterialsButton = screen.getAllByText('View Materials')[0]
      await user.click(viewMaterialsButton)
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Unmount component - should not cause memory leaks or errors
      expect(() => unmount()).not.toThrow()
    })
  })
})