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
      rootMargin: '-20% 0% -80% 0%',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
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
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
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
      className={`sticky top-32 ${className}`}
    >
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">
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
                    ? 'text-[#6A5ACD] bg-[#6A5ACD]/10 border-l-2 border-[#6A5ACD]'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
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
