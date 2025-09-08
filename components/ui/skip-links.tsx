// import React from 'react' // Removed unused import
import { cn } from './utils'

interface SkipLinksProps {
  links?: Array<{
    href: string
    label: string
  }>
  className?: string
}

const defaultLinks = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#search', label: 'Skip to search' }
]

export function SkipLinks({ links = defaultLinks, className }: SkipLinksProps) {
  return (
    <div 
      className={cn(
        'skip-links',
        'sr-only focus-within:not-sr-only',
        'fixed top-0 left-0 z-50',
        'bg-white border border-gray-300 shadow-lg',
        'p-2 m-2 rounded',
        className
      )}
      role="navigation"
      aria-label="Skip navigation links"
    >
      <ul className="flex flex-col gap-1">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className={cn(
                'block px-3 py-2 text-sm',
                'text-gray-900 hover:text-blue-600',
                'underline hover:no-underline',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                'rounded'
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Screen reader only utility class
export const srOnly = 'sr-only'

// Focus visible utility for better keyboard navigation
export const focusVisible = cn(
  'focus:outline-none',
  'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  'focus-visible:rounded'
)