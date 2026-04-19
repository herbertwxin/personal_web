import { Button } from './ui/button'
import { ExternalLink, Download, Quote } from 'lucide-react'
import { useState, useMemo, useCallback } from 'react'

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

  const publications = useMemo(() => [
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
  ], [])

  const filteredPublications = useMemo(() => {
    switch (selectedFilter) {
      case 'Journal Articles':
        return publications.filter(pub => pub.type === 'Journal Article')
      case 'Books':
        return publications.filter(pub => pub.type === 'Book')
      case 'Working Papers':
        return publications.filter(pub => pub.type === 'Working Paper')
      default:
        return publications
    }
  }, [selectedFilter, publications])

  const filterOptions = [
    'All Publications',
    'Journal Articles',
    'Books',
    'Working Papers',
  ]

  const groupedPublications = useMemo(() => filteredPublications.reduce((groups, pub) => {
    const year = pub.year
    if (!groups[year]) groups[year] = []
    groups[year].push(pub)
    return groups
  }, {} as Record<string, Publication[]>), [filteredPublications])

  const sortedYears = useMemo(() => Object.keys(groupedPublications).sort((a, b) => parseInt(b) - parseInt(a)), [groupedPublications])

  const handleOpenDOI = useCallback((doi: string) => {
    window.open(`https://doi.org/${doi}`, '_blank')
  }, [])

  const handleDownloadPDF = useCallback((title: string) => {
    const pdfUrl = `/downloadable/publications/${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    window.open(pdfUrl, '_blank')
  }, [])

  const handleCopyCitation = useCallback((pub: Publication) => {
    const citation = `${pub.authors}. "${pub.title}." ${pub.journal}, ${pub.volume}, ${pub.pages} (${pub.year}). https://doi.org/${pub.doi}`
    navigator.clipboard.writeText(citation).then(() => {
      alert('Citation copied to clipboard!')
    }).catch(() => {
      alert('Failed to copy citation.')
    })
  }, [])

  return (
    <main
      className='min-h-screen pb-12 px-6'
      id="main-content"
      role="main"
      aria-label="Publications page content"
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <header className='mb-12' role="banner">
          <h1
            className='font-serif text-5xl font-medium text-tx-primary tracking-tight mb-6'
            style={{ lineHeight: '1.1' }}
            id="page-title"
          >
            Publications
          </h1>
          <p className='text-lg text-tx-muted mb-8 max-w-3xl leading-relaxed'>
            Research contributions
          </p>
          <div className='flex items-center gap-2 text-sm text-tx-faint'>
            <span>ORCID:</span>
            <a
              href="https://orcid.org/0009-0000-9394-9423"
              target="_blank"
              rel="noopener noreferrer"
              className='text-ac-brand hover:underline'
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
              className={`px-3 py-1 text-sm border rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ac-brand focus-visible:ring-offset-2 ${
                selectedFilter === option
                  ? 'bg-ac-brand text-ac-fg border-ac-brand'
                  : 'text-tx-muted border-bd-strong hover:bg-sf-hover hover:text-tx-primary'
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
        <section aria-label="Publications by year">
          {sortedYears.map((year) => (
            <section key={year} className='mb-12' aria-labelledby={`year-${year}`}>
              <h2
                className='font-serif text-3xl font-medium text-tx-primary mb-6 border-b border-bd-subtle pb-2'
                id={`year-${year}`}
              >
                {year}
              </h2>

              <div className='space-y-6' role="list" aria-label={`Publications from ${year}`}>
                {groupedPublications[year].map((pub, index) => (
                  <article
                    key={index}
                    className='group'
                    role="listitem"
                    tabIndex={0}
                    aria-label={`Publication: ${pub.title}`}
                    id={`pub-${year}-${index}`}
                  >
                    <div className='mb-3'>
                      <h3
                        className='text-tx-primary font-medium text-xl leading-tight mb-1'
                        id={`pub-title-${year}-${index}`}
                      >
                        {pub.title}
                      </h3>

                      <div className='text-tx-secondary text-base mb-1'>
                        {pub.authors}
                      </div>

                      <div className='text-tx-secondary text-base'>
                        <em>{pub.journal}</em>
                        {pub.volume && <span>, {pub.volume}</span>}
                        {pub.pages && <span>, {pub.pages}</span>}
                      </div>
                    </div>

                    <div className='ml-4 mb-3'>
                      <p
                        className='text-sm text-tx-muted leading-relaxed'
                        aria-describedby={`pub-title-${year}-${index}`}
                      >
                        {pub.abstract}
                      </p>
                    </div>

                    <div className='ml-4 flex flex-wrap items-center gap-4'>
                      <div className='flex flex-wrap gap-1' role="group" aria-label="Publication keywords">
                        {pub.keywords.map((keyword, keyIndex) => (
                          <span
                            key={keyIndex}
                            className='text-xs text-ac-brand bg-sf-raised border border-bd-subtle px-2 py-0.5 rounded'
                            role="status"
                            aria-label={`Keyword: ${keyword}`}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>

                      <div className='flex gap-2 ml-auto' role="group" aria-label="Publication actions">
                        {pub.doi && (
                          <Button
                            size='sm'
                            variant='ghost'
                            className='text-xs text-ac-brand hover:text-ac-hover hover:bg-sf-hover p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-ac-brand focus-visible:ring-offset-2'
                            aria-label={`View ${pub.title} online`}
                            onClick={() => handleOpenDOI(pub.doi)}
                          >
                            <ExternalLink className='w-3 h-3 mr-1' aria-hidden="true" />
                            View
                          </Button>
                        )}
                        <Button
                          size='sm'
                          variant='ghost'
                          className='text-xs text-ac-brand hover:text-ac-hover hover:bg-sf-hover p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-ac-brand focus-visible:ring-offset-2'
                          aria-label={`Download PDF of ${pub.title}`}
                          onClick={() => handleDownloadPDF(pub.title)}
                        >
                          <Download className='w-3 h-3 mr-1' aria-hidden="true" />
                          PDF
                        </Button>
                        <Button
                          size='sm'
                          variant='ghost'
                          className='text-xs text-ac-brand hover:text-ac-hover hover:bg-sf-hover p-1 h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-ac-brand focus-visible:ring-offset-2'
                          aria-label={`Get citation for ${pub.title}`}
                          onClick={() => handleCopyCitation(pub)}
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
