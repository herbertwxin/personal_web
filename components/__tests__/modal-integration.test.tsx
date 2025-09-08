import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TeachingPage } from '../TeachingPage'
import { vi, describe, it, expect, beforeEach } from 'vitest'

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

describe('Modal Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  describe('Complete Modal Workflow Validation', () => {
    it('should complete full modal interaction workflow without errors', async () => {
      render(<TeachingPage />)
      
      // Step 1: Verify initial state - no dialogs open
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      
      // Step 2: Open first course dialog
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      expect(viewMaterialsButtons.length).toBeGreaterThan(0)
      
      await user.click(viewMaterialsButtons[0])
      
      // Step 3: Verify dialog opens correctly
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Step 4: Verify dialog content is accessible
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('role', 'dialog')
      expect(dialog).toHaveAttribute('tabindex', '-1')
      
      // Step 5: Verify overlay is present with correct properties
      const overlay = document.querySelector('[data-slot="dialog-overlay"]')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveClass('backdrop-blur-sm')
      expect(overlay).toHaveClass('pointer-events-auto')
      
      // Step 6: Test keyboard navigation (ESC key)
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      
      // Step 7: Open resource dialog
      const accessResourceButtons = screen.getAllByText('Access Resource')
      expect(accessResourceButtons.length).toBeGreaterThan(0)
      
      await user.click(accessResourceButtons[0])
      
      // Step 8: Verify resource dialog opens
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Step 9: Test close button functionality
      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(closeButton).toBeInTheDocument()
      
      await user.click(closeButton)
      
      // Step 10: Verify dialog closes properly
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      
      // Step 11: Test rapid open/close operations
      for (let i = 0; i < 2; i++) {
        await user.click(viewMaterialsButtons[0])
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument()
        })
        
        const currentCloseButton = screen.getByRole('button', { name: /close/i })
        await user.click(currentCloseButton)
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
      }
      
      // Step 12: Verify no memory leaks or artifacts remain
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(document.querySelectorAll('[data-slot="dialog-overlay"]')).toHaveLength(0)
    })

    it('should handle multiple dialog types without conflicts', async () => {
      render(<TeachingPage />)
      
      // Test course dialog
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Verify course-specific content
      expect(screen.getByText(/Available Materials/)).toBeInTheDocument()
      expect(screen.getByText(/Topics Covered/)).toBeInTheDocument()
      
      // Close course dialog
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      
      // Test resource dialog
      const accessResourceButtons = screen.getAllByText('Access Resource')
      await user.click(accessResourceButtons[0])
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Verify resource-specific content
      expect(screen.getByText(/Resource Details/)).toBeInTheDocument()
      expect(screen.getByText(/Preview Content/)).toBeInTheDocument()
      
      // Close resource dialog
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should maintain proper z-index stacking and backdrop effects', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Check overlay properties
      const overlay = document.querySelector('[data-slot="dialog-overlay"]')
      expect(overlay).toHaveClass('z-[9999]')
      expect(overlay).toHaveClass('backdrop-blur-sm')
      expect(overlay).toHaveClass('bg-black/60')
      
      // Check content properties
      const content = document.querySelector('[data-slot="dialog-content"]')
      expect(content).toHaveClass('z-[10000]')
      expect(content).toHaveClass('fixed')
      expect(content).toHaveClass('top-[50%]')
      expect(content).toHaveClass('left-[50%]')
      
      // Verify performance optimization classes
      expect(overlay).toHaveClass('transform-gpu')
      expect(overlay).toHaveClass('will-change-[backdrop-filter]')
      expect(content).toHaveClass('transform-gpu')
      expect(content).toHaveClass('will-change-transform')
    })

    it('should handle accessibility requirements correctly', async () => {
      render(<TeachingPage />)
      
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const dialog = screen.getByRole('dialog')
      
      // Check ARIA attributes
      expect(dialog).toHaveAttribute('role', 'dialog')
      expect(dialog).toHaveAttribute('tabindex', '-1')
      
      // Check for dialog title
      const dialogTitle = screen.getByRole('heading')
      expect(dialogTitle).toBeInTheDocument()
      
      // Check for close button accessibility
      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(closeButton).toBeInTheDocument()
      expect(closeButton).toHaveAttribute('type', 'button')
      
      // Verify screen reader text
      expect(screen.getByText('Close')).toBeInTheDocument()
    })

    it('should handle error scenarios gracefully', async () => {
      render(<TeachingPage />)
      
      // Test clicking on non-existent overlay
      const nonExistentOverlay = document.createElement('div')
      fireEvent.click(nonExistentOverlay)
      
      // Should not cause errors
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      
      // Test opening dialog normally
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Test multiple ESC key presses
      await user.keyboard('{Escape}')
      await user.keyboard('{Escape}')
      await user.keyboard('{Escape}')
      
      // Should close gracefully without errors
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should validate all requirements from the spec', async () => {
      render(<TeachingPage />)
      
      // Requirement 1.1: Dialog opens when clicked
      const viewMaterialsButtons = screen.getAllByText('View Materials')
      await user.click(viewMaterialsButtons[0])
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Requirement 1.2: Dialog shows course information
      expect(screen.getByText(/Available Materials/)).toBeInTheDocument()
      
      // Requirement 1.3: Background is properly blurred
      const overlay = document.querySelector('[data-slot="dialog-overlay"]')
      expect(overlay).toHaveClass('backdrop-blur-sm')
      
      // Requirement 1.4: Download buttons are functional (present and clickable)
      const dialog = screen.getByRole('dialog')
      const downloadButtons = dialog.querySelectorAll('button[type="button"]')
      expect(downloadButtons.length).toBeGreaterThan(0)
      
      // Requirement 1.5: Close button works
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      
      // Requirement 1.6: No visual artifacts remain
      expect(document.querySelectorAll('[data-slot="dialog-overlay"]')).toHaveLength(0)
    })
  })
})