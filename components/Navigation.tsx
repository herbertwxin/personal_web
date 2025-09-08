import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [searchMode, setSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [tempPosition, setTempPosition] = useState({ x: 0, width: 0 })
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  // Responsive behavior detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const pages = [
    { id: 'home', label: 'Home', width: isMobile ? 60 : 82, mobileLabel: 'Home' },
    { id: 'stack', label: 'Stack', width: isMobile ? 60 : 82, mobileLabel: 'Stack' },
    { id: 'publications', label: isMobile ? 'Pubs' : 'Publications', width: isMobile ? 50 : 110, mobileLabel: 'Pubs' },
    { id: 'resume', label: 'Resume', width: isMobile ? 60 : 82, mobileLabel: 'Resume' },
    { id: 'teaching', label: isMobile ? 'Teach' : 'Teaching', width: isMobile ? 50 : 88, mobileLabel: 'Teach' },
    { id: 'blog', label: 'Blog', width: isMobile ? 50 : 82, mobileLabel: 'Blog' },
  ]

  // Calculate selector width and position based on page data
  const getCurrentPageData = () => {
    // Map sub-pages to their parent pages for navigation highlighting
    const getNavigationPage = (page: string) => {
      if (page === 'stack-model') {return 'stack'}
      if (page === 'blog-post') {return 'blog'}
      return page
    }

    const navigationPage = getNavigationPage(currentPage)
    const currentPageData = pages.find(p => p.id === navigationPage)
    const pageIndex = pages.findIndex(p => p.id === navigationPage)

    // Calculate accurate x position based on container padding and item positioning
    // Account for container padding (16px) and precise item positioning
    let xPosition = 0 // Start from container edge
    const itemGap = isMobile ? 8 : 12 // Smaller gap on mobile
    for (let i = 0; i < pageIndex; i++) {
      xPosition += pages[i].width + itemGap // width + gap between items
    }
    
    // Add small offset to center the selector better on the text
    const centeringOffset = isMobile ? 2 : 4
    xPosition += centeringOffset

    return {
      width: currentPageData?.width || 82,
      index: pageIndex,
      xPosition,
    }
  }

  const { width: selectorWidth, xPosition } = getCurrentPageData()

  const handlePageChange = (pageId: string, button: HTMLButtonElement) => {
    // Start zoom animation immediately
    setIsAnimating(true);
    
    // Change page immediately so movement starts at the same time
    onPageChange(pageId);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 400); // Slightly longer to ensure smooth completion
  };

  return (
    <nav className='fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50'>
      <motion.div
        className='relative backdrop-blur-xl rounded-full shadow-2xl overflow-hidden'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          width: searchMode ? (isMobile ? 320 : 420) : (isMobile ? 480 : 700),
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          width: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
        whileHover={{
          scale: searchMode ? 1 : 1.005,
          transition: { duration: 0.2 },
        }}
        style={{
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          willChange: 'transform, width',
          padding: '8px 16px',
          height: '48px',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          border: 'none',
          boxShadow: 'none',
          minWidth: searchMode ? (isMobile ? '320px' : '420px') : (isMobile ? '480px' : '700px'),
          maxWidth: searchMode ? (isMobile ? '320px' : '420px') : (isMobile ? '480px' : '700px'),
        }}
      >
        <AnimatePresence>
          {!searchMode && (
            <motion.div
              className='absolute top-1.5 bottom-1.5 rounded-full overflow-hidden'
              initial={false}
              animate={{
                x: xPosition,
                width: selectorWidth,
                scale: isAnimating ? 1.3 : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
                mass: 0.4,
              }}
              style={{
                // 液体玻璃效果背景
                background: 'rgba(106, 90, 205, 0.15)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(106, 90, 205, 0.2)',
                boxShadow: `
                  0 4px 20px rgba(106, 90, 205, 0.15),
                  inset 0 1px 1px rgba(255, 255, 255, 0.4),
                  inset 0 -1px 1px rgba(0, 0, 0, 0.05)
                `,
                willChange: 'transform, width, scale',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                left: '13px',
                right: 'auto',
              }}
            >
              {/* 液体流动效果 */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {searchMode ? (
            <motion.div
              key='search'
              className='flex items-center space-x-3 w-full h-8'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Search className='w-5 h-5 text-black flex-shrink-0' />
              <input
                type='text'
                placeholder='Search academic content...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='flex-1 bg-transparent text-black placeholder-gray-500 border-none outline-none text-sm h-full'
                autoFocus
              />
              <motion.button
                onClick={() => {
                  setSearchMode(false)
                  setSearchQuery('')
                }}
                className='text-black hover:text-gray-800 transition-colors flex-shrink-0'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className='w-4 h-4' />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key='navigation'
              className='flex relative items-center h-8'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {pages.map((page, index) => {
                const getNavigationPage = (page: string) => {
                  if (page === 'stack-model') {return 'stack'}
                  if (page === 'blog-post') {return 'blog'}
                  return page
                }
                const isActive = getNavigationPage(currentPage) === page.id;
                
                return (
                  <motion.div
                    key={page.id}
                    whileHover={{
                      scale: isActive ? 1 : 1.05,
                      y: isActive ? 0 : -1,
                      opacity: isActive ? 1 : 0.9,
                      transition: {
                        duration: 0.15,
                        type: 'spring',
                        stiffness: 400,
                      },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                    style={{
                      marginRight: index < pages.length - 1 ? (isMobile ? '8px' : '12px') : '0',
                    }}
                  >
                    <button
                      ref={(el) => {
                        if (el) {
                          buttonRefs.current.set(page.id, el);
                        } else {
                          buttonRefs.current.delete(page.id);
                        }
                      }}
                      onClick={(e) => handlePageChange(page.id, e.currentTarget)}
                      className={`relative transition-all duration-200 rounded-full z-10 h-8 justify-center font-medium flex items-center hover:bg-transparent border-0 shadow-none focus:outline-none focus:ring-0 active:bg-transparent ${
                        isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'
                      }`}
                      style={{
                        width: `${page.width}px`,
                        color: '#000000',
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      {page.label}
                    </button>
                  </motion.div>
                )
              })}

              {/* Search Icon */}
              <motion.button
                onClick={() => setSearchMode(true)}
                className='ml-3 p-2 text-black hover:text-gray-800 transition-colors rounded-full hover:bg-[#f3f1ff] h-8 w-8 flex items-center justify-center'
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.1 },
                }}
              >
                <Search className='w-4 h-4' />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glass reflection effect */}
        <div
          className='absolute inset-0 rounded-full pointer-events-none overflow-hidden'
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, rgba(255,255,255,0.1) 100%)',
          }}
        />
      </motion.div>
    </nav>
  )
}