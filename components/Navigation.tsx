import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { searchContent, SearchResult } from '../lib/search'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  onSearchStateChange?: (isSearchActive: boolean) => void
}

export function Navigation({ currentPage, onPageChange, onSearchStateChange }: NavigationProps) {
  const [searchMode, setSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [, setShowResults] = useState(false)
  const [selectedResultIndex, setSelectedResultIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  useState({ x: 0, width: 0 })
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Responsive behavior detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchContent(searchQuery)
      setSearchResults(results)
      setShowResults(results.length > 0)
      setSelectedResultIndex(0)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchQuery])

  // Lock body scroll when search is active
  useEffect(() => {
    if (searchMode) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [searchMode])

  // Keyboard navigation for search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!searchMode) return

      const suggestions = ['DSGE models', 'Publications', 'Blog posts', 'Economics', 'Teaching']
      const maxIndex = searchQuery.trim() ? Math.max(0, searchResults.length - 1) : suggestions.length - 1

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedResultIndex(prev => prev < maxIndex ? prev + 1 : 0)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedResultIndex(prev => prev > 0 ? prev - 1 : maxIndex)
          break
        case 'Enter':
          e.preventDefault()
          if (!searchQuery.trim()) {
            // Handle suggestion selection
            const suggestion = suggestions[selectedResultIndex]
            if (suggestion) {
              setSearchQuery(suggestion)
            }
          } else if (searchResults.length > 0 && searchResults[selectedResultIndex]) {
            // Handle search result selection
            handleSearchResultClick(searchResults[selectedResultIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          closeSearch()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchMode, searchResults, selectedResultIndex, searchQuery])

  // Search handler functions
  const handleSearchResultClick = (result: SearchResult) => {
    onPageChange(result.url)
    closeSearch()
  }

  const closeSearch = () => {
    setSearchMode(false)
    setSearchQuery('')
    setSearchResults([])
    setShowResults(false)
    setSelectedResultIndex(0)
    onSearchStateChange?.(false)
  }

  const openSearch = () => {
    setSearchMode(true)
    onSearchStateChange?.(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }

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

  const handlePageChange = (pageId: string, _button: HTMLButtonElement) => {
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
    <>
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
          background: 'rgba(255,255,255,0.1)',
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
                ref={searchInputRef}
                type='text'
                placeholder='Search academic content...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='flex-1 bg-transparent text-black placeholder-gray-500 border-none outline-none text-sm h-full'
                autoFocus
              />
              <motion.button
                onClick={closeSearch}
                className='text-black hover:text-gray-800 transition-colors flex-shrink-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 outline-none'
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                }}
                onBlur={(e) => e.target.blur()}
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
                      className={`relative transition-all duration-200 rounded-full z-10 h-8 justify-center font-medium flex items-center hover:bg-transparent border-0 shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:bg-transparent outline-none ${
                        isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'
                      }`}
                      style={{
                        width: `${page.width}px`,
                        color: '#000000',
                        opacity: isActive ? 1 : 0.7,
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                      onBlur={(e) => e.target.blur()}
                    >
                      {page.label}
                    </button>
                  </motion.div>
                )
              })}

              {/* Search Icon */}
              <motion.button
                onClick={openSearch}
                className='ml-3 p-2 text-black hover:text-gray-800 transition-colors rounded-full hover:bg-[#f3f1ff] h-8 w-8 flex items-center justify-center focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 outline-none'
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                }}
                onBlur={(e) => e.target.blur()}
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

    {/* Search Results Dropdown - Outside navigation container */}
    <AnimatePresence>
      {searchMode && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl z-50'
          style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(0,0,0,0.1)',
            maxHeight: '500px',
            overflowY: 'auto',
            width: searchMode ? (isMobile ? '320px' : '420px') : (isMobile ? '480px' : '700px'),
            maxWidth: '90vw',
            marginLeft: '-210px',
          }}
        >
          {!searchQuery.trim() ? (
            // Show search suggestions when no query
            <div className='p-4'>
              <h3 className='text-sm font-semibold text-gray-700 mb-3'>Search Suggestions</h3>
              <div className='space-y-2'>
                {['DSGE models', 'Publications', 'Blog posts', 'Economics', 'Teaching'].map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      index === selectedResultIndex ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50 text-gray-600'
                    }`}
                    whileHover={{ x: 2 }}
                  >
                    <div className='flex items-center space-x-2'>
                      <Search className='w-3 h-3' />
                      <span>{suggestion}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className='mt-4 pt-3 border-t border-gray-100'>
                <p className='text-xs text-gray-500'>
                  💡 <strong>Tip:</strong> Use keywords like "macroeconomics", "policy", or "research" to find specific content
                </p>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            // No results found
            <div className='p-4 text-center'>
              <div className='text-gray-400 mb-2'>
                <Search className='w-8 h-8 mx-auto' />
              </div>
              <h3 className='text-sm font-medium text-gray-700'>No results found</h3>
              <p className='text-xs text-gray-500 mt-1'>
                Try searching for "economics", "DSGE", or "publications"
              </p>
            </div>
          ) : (
            // Categorized search results
            (() => {
              const groupedResults = searchResults.reduce((acc, result, index) => {
                const type = result.type === 'page' ? 'Pages' : 
                           result.type === 'publication' ? 'Publications' :
                           result.type === 'blog' ? 'Blog Posts' :
                           result.type === 'teaching' ? 'Teaching' : 'Other'
                if (!acc[type]) acc[type] = []
                acc[type].push({ ...result, originalIndex: index })
                return acc
              }, {} as Record<string, Array<SearchResult & { originalIndex: number }>>)

              const typeOrder = ['Pages', 'Publications', 'Blog Posts', 'Teaching', 'Other']
              let currentIndex = 0

              return (
                <div className='py-2'>
                  {typeOrder.map(type => {
                    if (!groupedResults[type] || groupedResults[type].length === 0) return null
                    
                    const typeResults = groupedResults[type]
                    const sectionStartIndex = currentIndex
                    currentIndex += typeResults.length

                    return (
                      <div key={type} className='mb-1 last:mb-0'>
                        <div className='px-4 py-2 bg-gray-50'>
                          <h4 className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>
                            {type} ({typeResults.length})
                          </h4>
                        </div>
                        {typeResults.map((result, typeIndex) => {
                          const globalIndex = sectionStartIndex + typeIndex
                          return (
                            <motion.div
                              key={result.id}
                              onClick={() => handleSearchResultClick(result)}
                              className={`px-4 py-3 cursor-pointer transition-all duration-150 border-b border-gray-50 last:border-b-0 ${
                                globalIndex === selectedResultIndex
                                  ? 'bg-purple-50 border-purple-100'
                                  : 'hover:bg-gray-50'
                              }`}
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.15 }}
                            >
                              <div className='flex items-start justify-between'>
                                <div className='flex-1'>
                                  <div className='flex items-center space-x-2'>
                                    <h3 className='text-sm font-medium text-gray-900 line-clamp-1'>
                                      {result.title}
                                    </h3>
                                    <span className={`px-2 py-1 text-xs rounded-full ${{
                                      'page': 'bg-blue-100 text-blue-700',
                                      'publication': 'bg-green-100 text-green-700',
                                      'blog': 'bg-purple-100 text-purple-700',
                                      'teaching': 'bg-orange-100 text-orange-700'
                                    }[result.type]}`}>
                                      {result.type}
                                    </span>
                                  </div>
                                  {result.excerpt && (
                                    <p className='text-xs text-gray-600 mt-1 line-clamp-2'>
                                      {result.excerpt}
                                    </p>
                                  )}
                                  {result.metadata && (
                                    <div className='flex items-center space-x-2 mt-1'>
                                      {result.metadata.date && (
                                        <span className='text-xs text-gray-500'>
                                          {new Date(result.metadata.date).toLocaleDateString()}
                                        </span>
                                      )}
                                      {result.metadata.journal && (
                                        <span className='text-xs text-gray-500'>
                                          {result.metadata.journal}
                                        </span>
                                      )}
                                      {result.metadata.year && (
                                        <span className='text-xs text-gray-500'>
                                          {result.metadata.year}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <ArrowRight className={`w-4 h-4 transition-all duration-150 ${
                                  globalIndex === selectedResultIndex ? 'text-purple-600' : 'text-gray-400'
                                }`} />
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )
            })()
          )}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}