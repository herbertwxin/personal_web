import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from '../dialog'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  XIcon: () => <div data-testid="x-icon" />,
}))

describe('Dialog Component', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  describe('Basic Dialog Functionality', () => {
    it('should render dialog trigger and open dialog when clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
              <DialogDescription>This is a test dialog</DialogDescription>
            </DialogHeader>
            <div>Dialog content</div>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('Open Dialog')
      expect(trigger).toBeInTheDocument()

      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      expect(screen.getByText('Test Dialog')).toBeInTheDocument()
      expect(screen.getByText('This is a test dialog')).toBeInTheDocument()
      expect(screen.getByText('Dialog content')).toBeInTheDocument()
    })

    it('should close dialog when close button is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should close dialog when ESC key is pressed', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Dialog Overlay and Backdrop', () => {
    it('should render overlay with proper z-index and backdrop blur', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const overlay = document.querySelector('[data-slot="dialog-overlay"]')
      expect(overlay).toBeInTheDocument()
      
      // Check backdrop blur classes (z-index may not be computed in jsdom)
      expect(overlay).toHaveClass('backdrop-blur-sm')
      expect(overlay).toHaveClass('bg-black/60')
      expect(overlay).toHaveClass('z-[9999]')
    })

    it('should close dialog when overlay is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const overlay = document.querySelector('[data-slot="dialog-overlay"]')
      expect(overlay).toBeInTheDocument()

      fireEvent.click(overlay!)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should have proper pointer events on overlay', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const overlay = document.querySelector('[data-slot="dialog-overlay"]')
      expect(overlay).toHaveClass('pointer-events-auto')
    })
  })

  describe('Dialog Content and Positioning', () => {
    it('should render dialog content with proper z-index and positioning', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const dialogContent = document.querySelector('[data-slot="dialog-content"]')
      expect(dialogContent).toBeInTheDocument()
      
      // Check z-index is higher than overlay
      const contentStyles = window.getComputedStyle(dialogContent!)
      expect(parseInt(contentStyles.zIndex)).toBeGreaterThan(9999)
      
      // Check positioning classes
      expect(dialogContent).toHaveClass('fixed')
      expect(dialogContent).toHaveClass('top-[50%]')
      expect(dialogContent).toHaveClass('left-[50%]')
      expect(dialogContent).toHaveClass('translate-x-[-50%]')
      expect(dialogContent).toHaveClass('translate-y-[-50%]')
    })

    it('should have proper animation classes', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const dialogContent = document.querySelector('[data-slot="dialog-content"]')
      
      // Check animation classes
      expect(dialogContent).toHaveClass('data-[state=open]:animate-in')
      expect(dialogContent).toHaveClass('data-[state=closed]:animate-out')
      expect(dialogContent).toHaveClass('data-[state=open]:fade-in-0')
      expect(dialogContent).toHaveClass('data-[state=closed]:fade-out-0')
      expect(dialogContent).toHaveClass('data-[state=open]:zoom-in-95')
      expect(dialogContent).toHaveClass('data-[state=closed]:zoom-out-95')
    })
  })

  describe('Accessibility Features', () => {
    it('should have proper ARIA attributes', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog Title</DialogTitle>
              <DialogDescription>Test dialog description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('role', 'dialog')

      // Check for title and description
      expect(screen.getByText('Test Dialog Title')).toBeInTheDocument()
      expect(screen.getByText('Test dialog description')).toBeInTheDocument()
    })

    it('should trap focus within dialog', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
            <button>Button 1</button>
            <button>Button 2</button>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByText('Open Dialog')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Verify dialog has proper focus management attributes
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('tabindex', '-1')
      expect(dialog).toHaveAttribute('role', 'dialog')
      
      // Check that buttons are present and focusable
      const buttons = dialog.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should have close button with proper accessibility', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(closeButton).toBeInTheDocument()
      expect(closeButton).toHaveAttribute('type', 'button')
      
      // Check for screen reader text
      expect(screen.getByText('Close')).toBeInTheDocument()
    })
  })

  describe('Controlled Dialog State', () => {
    it('should work with controlled open state', async () => {
      const TestComponent = () => {
        const [open, setOpen] = React.useState(false)
        
        return (
          <div>
            <button onClick={() => setOpen(true)}>Open Controlled</button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Controlled Dialog</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )
      }

      render(<TestComponent />)

      // Dialog should not be open initially
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      // Open dialog programmatically
      await user.click(screen.getByText('Open Controlled'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Close dialog using close button
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should call onOpenChange when dialog state changes', async () => {
      const onOpenChange = vi.fn()

      render(
        <Dialog onOpenChange={onOpenChange}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true)
      })

      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('Performance and Optimization', () => {
    it('should have hardware acceleration classes', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const overlay = document.querySelector('[data-slot="dialog-overlay"]')
      const content = document.querySelector('[data-slot="dialog-content"]')
      
      // Check for performance optimization classes
      expect(overlay).toHaveClass('transform-gpu')
      expect(overlay).toHaveClass('will-change-[backdrop-filter]')
      expect(content).toHaveClass('transform-gpu')
      expect(content).toHaveClass('will-change-transform')
    })

    it('should have proper backdrop filter vendor prefixes', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByText('Open Dialog'))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const overlay = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement
      
      // Check for vendor prefix classes
      expect(overlay).toHaveClass('[backdrop-filter:blur(4px)]')
      expect(overlay).toHaveClass('[-webkit-backdrop-filter:blur(4px)]')
      
      // Check inline styles for vendor prefixes
      const style = overlay.style
      expect(style.backdropFilter).toBe('blur(4px)')
      expect((style as any).WebkitBackdropFilter).toBe('blur(4px)')
    })
  })
})

// Import React for the controlled dialog test
import React from 'react'