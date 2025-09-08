import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ExternalLink, Download, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Publication {
  title: string
  authors: string
  journal: string
  year: string
  volume: string
  pages: string
  type: string
  status: string
  abstract: string
  keywords: string[]
  citations: number
  doi: string
}

export function PublicationsPage() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All Publications')
  const [filteredPublications, setFilteredPublications] = useState<
    Publication[]
  >([])

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const publications = [
    {
      title: 'The sacrifice ratio and active fiscal policy',
      authors: 'Christopher G. Gibbs and Herbert W. Xin',
      journal: 'Economics Letters',
      year: '2024',
      volume: 'Vol. 245',
      pages: '112038',
      type: 'Journal Article',
      status: 'Published',
      abstract: 'We compare sacrifice ratios for disinflations under an active monetary and passive fiscal policy mix to those obtained under passive monetary and active fiscal policy, holding all else equal. The sacrifice ratio may be higher or lower in the active fiscal policy regime depending on the fiscal rule and the design of the disinflation policy. Fiscal-led disinflations may be less costly than monetary-led ones when they are anticipated. However, they may generate larger sacrifice ratios than monetary-led ones when implemented "cold turkey". Overall, the variance in possible sacrifice ratios under fiscal-led policies is much higher than under monetary-led policies.',
      keywords: ['Sacrifice ratio', 'Monetary policy', 'Fiscal policy', 'Inflation', 'Disinflation'],
      citations: 0,
      doi: '10.1016/j.econlet.2024.112038',
    },
  ]

  // Filter publications based on selected filter
  useEffect(() => {
    let filtered = publications

    if (selectedFilter === 'Journal Articles') {
      filtered = publications.filter(pub => pub.type === 'Journal Article')
    } else if (selectedFilter === 'Books') {
      filtered = publications.filter(pub => pub.type === 'Book')
    } else if (selectedFilter === 'Working Papers') {
      filtered = publications.filter(pub => pub.type === 'Working Paper')
    }

    setFilteredPublications(filtered)
  }, [selectedFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'Working Paper':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      default:
        return 'bg-[#e9e5ff] text-[#5a4fcf] border-[#b8a9ff]'
    }
  }

  const filterOptions = [
    'All Publications',
    'Journal Articles',
    'Books',
    'Working Papers',
  ]

  // Group publications by year for academic bibliography format
  const groupedPublications = filteredPublications.reduce((groups, pub) => {
    const year = pub.year
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(pub)
    return groups
  }, {} as Record<string, Publication[]>)

  // Sort years in descending order
  const sortedYears = Object.keys(groupedPublications).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <motion.main
      className='min-h-screen pb-12 px-6'
      initial={hasAnimated ? false : { opacity: 0, y: 10 }}
      animate={hasAnimated ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: hasAnimated ? 'auto' : 'transform, opacity' }}
      id="main-content"
      role="main"
      aria-label="Publications page content"
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.header
          initial={hasAnimated ? false : { opacity: 0, y: 20 }}
          animate={hasAnimated ? false : { opacity: 1, y: 0 }}
          transition={{
            duration: hasAnimated ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='mb-12'
          role="banner"
        >
          <h1 
            className='text-[2.5rem] font-normal text-black mb-6 leading-tight'
            id="page-title"
          >
            Publication
          </h1>
          <p className='text-lg text-black mb-8 max-w-3xl leading-relaxed'>
            Research contributions in economics and related fields.
          </p>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <span>ORCID:</span>
            <a 
              href="https://orcid.org/0009-0000-9394-9423" 
              target="_blank" 
              rel="noopener noreferrer"
              className='text-[#6A5ACD] hover:underline'
            >
              https://orcid.org/0009-0000-9394-9423
            </a>
          </div>
        </motion.header>

        {/* Filter Options */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className='flex flex-wrap gap-2 mb-12'
          role="navigation"
          aria-label="Publication filters"
        >
          <span className="sr-only">Filter publications by type:</span>
          {filterOptions.map(option => (
            <button
              key={option}
              className={`px-3 py-1 text-sm border rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                selectedFilter === option
                  ? 'bg-[#6A5ACD] text-white border-[#6A5ACD]'
                  : 'bg-white text-black border-black/10 hover:bg-black/5'
              }`}
              onClick={() => setSelectedFilter(option)}
              aria-pressed={selectedFilter === option}
              aria-label={`Filter by ${option}`}
            >
              {option}
            </button>
          ))}
        </motion.nav>

        {/* Academic Bibliography List */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          aria-label="Publications by year"
        >
          {sortedYears.map((year, yearIndex) => (
            <motion.section
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.3 + yearIndex * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='mb-12'
              aria-labelledby={`year-${year}`}
            >
              {/* Year Header */}
              <h2 
                className='text-[1.75rem] font-medium text-black mb-6 border-b border-black/10 pb-2'
                id={`year-${year}`}
              >
                {year}
              </h2>

              {/* Publications for this year */}
              <div 
                className='space-y-6'
                role="list"
                aria-label={`Publications from ${year}`}
              >
                {groupedPublications[year].map((pub, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.4 + yearIndex * 0.1 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className='group'
                    role="listitem"
                    tabIndex={0}
                    aria-label={`Publication: ${pub.title}`}
                    id={`pub-${year}-${index}`}
                  >
                    {/* Citation Entry with Hanging Indent */}
                    <div className='ml-8 -indent-8 mb-3'>
                      <div className='inline'>
                        <h3 
                          className='text-black font-medium text-[1.25rem] leading-tight inline'
                          id={`pub-title-${year}-${index}`}
                        >
                          {pub.title}
                        </h3>
                        <span className='text-black text-base ml-2'>
                          {pub.authors}.
                        </span>
                        <span className='text-black text-base ml-1'>
                          <em>{pub.journal}</em>
                          {pub.volume && <span>, {pub.volume}</span>}
                          {pub.pages && <span>, {pub.pages}</span>}.
                        </span>
                      </div>
                      
                    </div>
                    
                    {/* Citation Metadata - Separate line for better alignment */}
                    <div className='ml-8 mt-1'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs ${getStatusColor(pub.status)}`}>
                          {pub.status}
                        </span>
                        {pub.citations > 0 && (
                          <span className='text-sm text-gray-600'>
                            Cited {pub.citations} times
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Abstract */}
                    <div className='ml-4 mb-3'>
                      <p 
                        className='text-sm text-gray-600 leading-relaxed'
                        aria-describedby={`pub-title-${year}-${index}`}
                      >
                        {pub.abstract}
                      </p>
                    </div>

                    {/* Keywords and Actions */}
                    <div className='ml-4 flex flex-wrap items-center gap-4'>
                      {/* Keywords */}
                      <div 
                        className='flex flex-wrap gap-1'
                        role="group"
                        aria-label="Publication keywords"
                      >
                        {pub.keywords.map((keyword, keyIndex) => (
                          <span
                            key={keyIndex}
                            className='text-xs text-[#6A5ACD] bg-black/5 px-2 py-0.5 rounded'
                            role="status"
                            aria-label={`Keyword: ${keyword}`}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div 
                        className='flex gap-2 ml-auto'
                        role="group"
                        aria-label="Publication actions"
                      >
                        {pub.doi && (
                          <Button
                            size='sm'
                            variant='ghost'
                            className='text-xs text-[#6A5ACD] hover:text-[#6A5ACD] hover:bg-black/5 p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                            aria-label={`View ${pub.title} online`}
                          >
                            <ExternalLink className='w-3 h-3 mr-1' aria-hidden="true" />
                            View
                          </Button>
                        )}
                        <Button
                          size='sm'
                          variant='ghost'
                          className='text-xs text-[#6A5ACD] hover:text-[#6A5ACD] hover:bg-black/5 p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          aria-label={`Download PDF of ${pub.title}`}
                        >
                          <Download className='w-3 h-3 mr-1' aria-hidden="true" />
                          PDF
                        </Button>
                        <Button
                          size='sm'
                          variant='ghost'
                          className='text-xs text-[#6A5ACD] hover:text-[#6A5ACD] hover:bg-black/5 p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          aria-label={`Get citation for ${pub.title}`}
                        >
                          <Quote className='w-3 h-3 mr-1' aria-hidden="true" />
                          Cite
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.section>


      </div>
    </motion.main>
  )
}
