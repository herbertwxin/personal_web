import { useState, useEffect, useCallback } from 'react'
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
    if (typeof document === 'undefined') return

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

        if (!title || element.closest('.page-header')) return

        let id = element.id
        if (!id) {
          id = `toc-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-${index}`
          element.id = id
        }

        items.push({ id, title, plainTitle, level })
      })

      setTocItems(items)
    }

    extractHeadings()

    const observer = new MutationObserver(extractHeadings)
    observer.observe(contentRoot, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  const updateActiveId = useCallback(() => {
    if (tocItems.length === 0) return

    const scrollY = window.scrollY
    const offset = 140 // account for fixed nav

    let activeHeadingId = tocItems[0].id

    for (const item of tocItems) {
      const el = document.getElementById(item.id)
      if (!el) continue
      const top = el.getBoundingClientRect().top + scrollY
      if (top - offset <= scrollY) {
        activeHeadingId = item.id
      }
    }

    setActiveId(activeHeadingId)
  }, [tocItems])

  useEffect(() => {
    if (tocItems.length === 0) return

    updateActiveId()
    window.addEventListener('scroll', updateActiveId, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveId)
  }, [tocItems, updateActiveId])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      setActiveId(id)
    }
  }

  if (tocItems.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={className}
    >
      <div className='bg-sf-raised border border-bd-subtle rounded-lg p-4 shadow-sm'>
        <h3 className='text-sm font-medium text-tx-muted mb-3 border-b border-bd-subtle pb-2 uppercase tracking-wide'>
          Contents
        </h3>
        <nav className='space-y-0.5'>
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={[
                'block w-full text-left text-xs transition-colors duration-150 py-1 px-2 rounded',
                item.level === 1 ? 'font-medium' : '',
                item.level === 2 ? 'ml-2' : '',
                item.level === 3 ? 'ml-4' : '',
                item.level === 4 ? 'ml-6' : '',
                item.level === 5 ? 'ml-8' : '',
                item.level === 6 ? 'ml-10' : '',
                activeId === item.id
                  ? 'text-ac-brand bg-sf-active font-medium border-l-2 border-ac-brand pl-1.5'
                  : 'text-tx-muted hover:text-tx-primary hover:bg-sf-hover',
              ].join(' ')}
              title={item.plainTitle}
            >
              <span className='truncate block'>
                <TextRenderer content={item.title} />
              </span>
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}
