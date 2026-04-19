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
          <div className='flex items-center'>
            <nav className='flex items-center'>
              {navItems.map(item => {
                const isActive = currentPage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
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
                      if (!isActive) e.currentTarget.style.opacity = '0.85'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.opacity = '0.55'
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>
            <div className='ml-2 pl-2' style={{ borderLeft: '1px solid var(--nav-border)' }}>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
