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
  const [selectedFilter, setSelectedFilter] = useState('All Publications')
  const [filteredPublications, setFilteredPublications] = useState<
    Publication[]
  >([])

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
    <main
      className='min-h-screen pb-12 px-6'
      id="main-content"
      role="main"
      aria-label="Publications page content"
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <header
          className='mb-12'
          role="banner"
        >
          <h1 
            className='text-5xl font-bold text-white tracking-tighter mb-6'
            id="page-title"
          >
            Publications
          </h1>
          <p className='text-lg text-white/70 mb-8 max-w-3xl leading-relaxed'>
            Research contributions in economics and related fields.
          </p>
          <div className='flex items-center gap-2 text-sm text-white/70'>
            <span>ORCID:</span>
            <a 
              href="https://orcid.org/0009-0000-9394-9423" 
              target="_blank" 
              rel="noopener noreferrer"
              className='text-[#B19EEF] hover:underline'
            >
              https://orcid.org/0009-0000-9394-9423
            </a>
          </div>
        </header>

        {/* Filter Options */}
        <nav
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
                  ? 'bg-[#B19EEF] text-white border-[#B19EEF]'
                  : 'text-white/70 border-white/20 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => setSelectedFilter(option)}
              aria-pressed={selectedFilter === option}
              aria-label={`Filter by ${option}`}
            >
              {option}
            </button>
          ))}
        </nav>

        {/* Academic Bibliography List */}
        <section
          aria-label="Publications by year"
        >
          {sortedYears.map((year) => (
            <section
              key={year}
              className='mb-12'
              aria-labelledby={`year-${year}`}
            >
              {/* Year Header */}
              <h2 
                className='text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2'
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
                  <article
                    key={index}
                    className='group'
                    role="listitem"
                    tabIndex={0}
                    aria-label={`Publication: ${pub.title}`}
                    id={`pub-${year}-${index}`}
                  >
                    {/* Citation Entry - Each element on separate line */}
                    <div className='mb-3'>
                      {/* Line 1: Title */}
                      <h3
                        className='text-white font-medium text-xl leading-tight mb-1'
                        id={`pub-title-${year}-${index}`}
                      >
                        {pub.title}
                      </h3>

                      {/* Line 2: Authors */}
                      <div className='text-white/90 text-base mb-1'>
                        {pub.authors}
                      </div>

                      {/* Line 3: Journal, Volume, Pages */}
                      <div className='text-white/90 text-base'>
                        <em>{pub.journal}</em>
                        {pub.volume && <span>, {pub.volume}</span>}
                        {pub.pages && <span>, {pub.pages}</span>}
                      </div>
                    </div>

                    {/* Abstract */}
                    <div className='ml-4 mb-3'>
                      <p 
                        className='text-sm text-white/70 leading-relaxed'
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
                            className='text-xs text-[#B19EEF] bg-white/10 px-2 py-0.5 rounded'
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
                            className='text-xs text-[#B19EEF] hover:text-[#B19EEF] hover:bg-white/10 p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                            aria-label={`View ${pub.title} online`}
                            onClick={() => window.open(`https://doi.org/${pub.doi}`, '_blank')}
                          >
                            <ExternalLink className='w-3 h-3 mr-1' aria-hidden="true" />
                            View
                          </Button>
                        )}
                        <Button
                          size='sm'
                          variant='ghost'
                          className='text-xs text-[#B19EEF] hover:text-[#B19EEF] hover:bg-white/10 p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          aria-label={`Download PDF of ${pub.title}`}
                          onClick={() => {
                            const pdfUrl = `/downloadable/publications/${pub.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
                            window.open(pdfUrl, '_blank')
                          }}
                        >
                          <Download className='w-3 h-3 mr-1' aria-hidden="true" />
                          PDF
                        </Button>
                        <Button
                          size='sm'
                          variant='ghost'
                          className='text-xs text-[#B19EEF] hover:text-[#B19EEF] hover:bg-white/10 p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          aria-label={`Get citation for ${pub.title}`}
                          onClick={() => {
                            const citation = `${pub.authors}. "${pub.title}." ${pub.journal}, ${pub.volume}, ${pub.pages} (${pub.year}). https://doi.org/${pub.doi}`
                            navigator.clipboard.writeText(citation)
                            alert('Citation copied to clipboard!')
                          }}
                        >
                          <Quote className='w-3 h-3 mr-1' aria-hidden="true" />
                          Cite
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </section>


      </div>
    </main>
  )
}
