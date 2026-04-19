import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--nav-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        transition: 'opacity 0.2s',
        opacity: 0.7,
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
