import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

interface TopNavProps {
  currentPage: string
  onPageChange: (page: string) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'publications', label: 'Publications' },
  { id: 'resume', label: 'Resume' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'blog', label: 'Blog' },
]

export function TopNav({ currentPage, onPageChange, theme, onToggleTheme }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavigate = (page: string) => {
    onPageChange(page)
    setMenuOpen(false)
  }

  // Close the mobile menu on Escape for keyboard users.
  useEffect(() => {
    if (!menuOpen) {return undefined}
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {setMenuOpen(false)}
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'var(--nav-surface)',
        borderBottom: '1px solid var(--nav-border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className='max-w-6xl mx-auto px-4 sm:px-6 md:px-10'>
        <div className='flex items-center justify-end h-14'>
          {/* Desktop inline nav */}
          <nav className='hidden md:flex items-center'>
            {navItems.map(item => {
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className='px-2 sm:px-3 py-1 text-xs sm:text-sm transition-opacity'
                  style={{
                    color: 'var(--nav-text)',
                    opacity: isActive ? 1 : 0.55,
                    borderBottom: isActive
                      ? '1.5px solid var(--accent)'
                      : '1.5px solid transparent',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {e.currentTarget.style.opacity = '0.85'}
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {e.currentTarget.style.opacity = '0.55'}
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div
            className='ml-2 pl-2 flex items-center'
            style={{ borderLeft: '1px solid var(--nav-border)' }}
          >
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>

          {/* Mobile menu toggle */}
          <button
            className='md:hidden ml-1 flex items-center justify-center transition-opacity'
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls='mobile-nav'
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--nav-text)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              opacity: 0.8,
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <nav
          id='mobile-nav'
          className='md:hidden'
          style={{
            borderTop: '1px solid var(--nav-border)',
            background: 'var(--nav-surface)',
          }}
        >
          <div className='max-w-6xl mx-auto px-4 py-2'>
            {navItems.map(item => {
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 8px',
                    fontSize: '15px',
                    color: 'var(--nav-text)',
                    opacity: isActive ? 1 : 0.7,
                    background: 'none',
                    border: 'none',
                    borderLeft: isActive
                      ? '2px solid var(--accent)'
                      : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
