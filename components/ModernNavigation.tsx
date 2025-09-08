import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface ModernNavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function ModernNavigation({
  currentPage,
  onPageChange,
}: ModernNavigationProps) {
  const [searchMode, setSearchMode] = useState(false)

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'publications', label: 'Publications' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'resume', label: 'About' },
    { id: 'blog', label: 'Contact' },
  ]

  return (
    <motion.nav
      className='fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50'
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <motion.div
            className='flex items-center space-x-2'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-[#6A5ACD] rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>A</span>
            </div>
            <span className='text-xl font-semibold text-white'>Academic</span>
            <span className='text-blue-400 text-xl'>.</span>
          </motion.div>

          {/* Navigation Links */}
          <div className='flex items-center space-x-8'>
            {pages.map(page => (
              <motion.button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`
                  relative px-4 py-2 rounded-lg transition-all duration-200
                  ${
                    currentPage === page.id
                      ? 'text-white bg-slate-800/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                  }
                `}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.15 }}
              >
                {page.label}
                {currentPage === page.id && (
                  <motion.div
                    className='absolute bottom-0 left-1/2 w-1 h-1 bg-blue-500 rounded-full'
                    layoutId='activeIndicator'
                    style={{ transform: 'translateX(-50%)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center space-x-4'>
            {/* Search */}
            <motion.button
              onClick={() => setSearchMode(!searchMode)}
              className='p-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className='w-5 h-5' />
            </motion.button>

            {/* CTA Button */}
            <Button
              className='bg-gradient-to-r from-blue-600 to-[#6A5ACD] hover:from-blue-700 hover:to-[#5a4fcf] text-white px-6 py-2 rounded-lg transition-all duration-200'
              onClick={() => onPageChange('resume')}
            >
              View CV
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
