import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TextRenderer } from './NewLaTeXRenderer'

interface TOCItem {
  id: string
  title: string
  plainTitle: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const contentRoot = document.querySelector('[data-toc-root]') ?? document.body

    const extractHeadings = () => {
      const headings = contentRoot.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const items: TOCItem[] = []

      headings.forEach((heading, index) => {
        const element = heading as HTMLElement
        const level = parseInt(element.tagName.charAt(1))
        const plainTitle = element.textContent?.trim() || ''
        const dataTitle = element.getAttribute('data-latex-title')?.trim()
        const title = dataTitle && dataTitle.length > 0 ? dataTitle : plainTitle

        // Skip if no title or if it's the main page title
        if (!title || element.closest('.page-header')) {
          return
        }

        let id = element.id
        if (!id) {
          // Generate ID from title
          id = `toc-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-${index}`
          element.id = id
        }

        items.push({ id, title, plainTitle, level })
      })

      setTocItems(items)
    }

    // Initial extraction
    extractHeadings()

    // Re-extract when content changes (for dynamic content like LaTeX)
    const observer = new MutationObserver(() => {
      extractHeadings()
    })

    observer.observe(contentRoot, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-10% 0% -70% 0%',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that's most visible
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
      
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio to find the most visible heading
        const mostVisible = visibleEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        )
        setActiveId(mostVisible.target.id)
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
      // Update active state immediately for better UX
      setActiveId(id)
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={className}
    >
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-medium text-white mb-3 border-b border-gray-500 pb-2">
          Table of Contents
        </h3>
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`
                block w-full text-left text-xs transition-colors duration-200 py-1 px-2 rounded
                ${item.level === 1 ? 'font-medium' : ''}
                ${item.level === 2 ? 'ml-2' : ''}
                ${item.level === 3 ? 'ml-4' : ''}
                ${item.level === 4 ? 'ml-6' : ''}
                ${item.level === 5 ? 'ml-8' : ''}
                ${item.level === 6 ? 'ml-10' : ''}
                ${
                  activeId === item.id
                    ? 'text-[#b19eef] bg-[#b19eef]/20 border-l-3 border-[#b19eef] font-medium'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }
              `}
              title={item.plainTitle}
            >
              <span className="truncate block">
                <TextRenderer content={item.title} />
              </span>
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}
