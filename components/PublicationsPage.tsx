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
      title:
        'Dynamic Equilibrium Models in Modern Macroeconomics: A Comprehensive Survey',
      authors: 'Your Name, Co-Author A, Co-Author B',
      journal: 'Journal of Economic Theory',
      year: '2024',
      volume: 'Vol. 45, No. 3',
      pages: 'pp. 123-156',
      type: 'Journal Article',
      status: 'Published',
      abstract:
        'This paper provides a comprehensive survey of dynamic equilibrium models used in modern macroeconomics, analyzing their theoretical foundations and empirical applications...',
      keywords: ['DSGE', 'Economic Modeling', 'Monetary Policy'],
      citations: 12,
      doi: '10.1016/j.jet.2024.01.003',
    },
    {
      title:
        'Stochastic Growth Models: Theory and Applications in Developing Economies',
      authors: 'Your Name, International Collaborator',
      journal: 'Economic Review',
      year: '2023',
      volume: 'Vol. 78, No. 4',
      pages: 'pp. 445-472',
      type: 'Journal Article',
      status: 'Published',
      abstract:
        'We develop a stochastic growth model tailored for developing economies, incorporating institutional factors and external shocks...',
      keywords: ['Growth Theory', 'Developing Economies', 'Stochastic Models'],
      citations: 28,
      doi: '10.1111/ecca.2023.78.4.445',
    },
    {
      title:
        'Monetary Policy in New Keynesian Framework: Evidence from Emerging Markets',
      authors: 'Your Name',
      journal: 'Macroeconomic Dynamics',
      year: '2023',
      volume: 'Vol. 27, No. 8',
      pages: 'pp. 1891-1920',
      type: 'Journal Article',
      status: 'Published',
      abstract:
        'This study examines monetary policy transmission mechanisms in emerging market economies using a New Keynesian DSGE framework...',
      keywords: ['Monetary Policy', 'Emerging Markets', 'DSGE'],
      citations: 15,
      doi: '10.1017/S1365100522000645',
    },
    {
      title:
        'Financial Frictions and Business Cycles: A Quantitative Assessment',
      authors: 'Your Name, Research Partner',
      journal: 'Review of Economic Dynamics',
      year: '2022',
      volume: 'Vol. 46',
      pages: 'pp. 89-115',
      type: 'Journal Article',
      status: 'Published',
      abstract:
        'We quantify the role of financial frictions in business cycle fluctuations using a medium-scale DSGE model...',
      keywords: ['Financial Frictions', 'Business Cycles', 'DSGE'],
      citations: 34,
      doi: '10.1016/j.red.2022.05.003',
    },
    {
      title: 'Labor Market Dynamics and Unemployment Persistence',
      authors: 'Your Name, Academic Colleague',
      journal: 'American Economic Journal: Macroeconomics',
      year: '2022',
      volume: 'Vol. 14, No. 2',
      pages: 'pp. 156-189',
      type: 'Journal Article',
      status: 'Published',
      abstract:
        'This paper investigates the sources of unemployment persistence using a search and matching model with heterogeneous workers...',
      keywords: ['Labor Markets', 'Unemployment', 'Search Models'],
      citations: 19,
      doi: '10.1257/mac.20200045',
    },
    {
      title: 'Optimal Fiscal Policy in a Liquidity Trap',
      authors: 'Your Name',
      journal: 'Journal of Monetary Economics',
      year: '2021',
      volume: 'Vol. 124',
      pages: 'pp. 78-95',
      type: 'Journal Article',
      status: 'Published',
      abstract:
        'We analyze optimal fiscal policy when the economy is at the zero lower bound using a New Keynesian model...',
      keywords: ['Fiscal Policy', 'Zero Lower Bound', 'Optimal Policy'],
      citations: 41,
      doi: '10.1016/j.jmoneco.2021.09.008',
    },
    {
      title: 'Heterogeneous Agents and Inequality Dynamics',
      authors: 'Your Name, Co-Author C',
      journal: 'Quarterly Journal of Economics',
      year: '2024',
      volume: 'Vol. 139, No. 1',
      pages: 'pp. 234-278',
      type: 'Journal Article',
      status: 'Under Review',
      abstract:
        'We study the evolution of income and wealth inequality in a heterogeneous agent model with endogenous skill formation...',
      keywords: ['Heterogeneous Agents', 'Inequality', 'Skill Formation'],
      citations: 0,
      doi: '',
    },
    {
      title: 'Climate Change and Economic Growth: A DSGE Approach',
      authors: 'Your Name, Environmental Economist',
      journal: 'Working Paper Series',
      year: '2024',
      volume: 'WP-2024-15',
      pages: 'pp. 1-67',
      type: 'Working Paper',
      status: 'Working Paper',
      abstract:
        'This paper incorporates climate change effects into a DSGE framework to analyze the macroeconomic consequences of environmental policies...',
      keywords: ['Climate Change', 'DSGE', 'Environmental Policy'],
      citations: 3,
      doi: '',
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
            Publications
          </h1>
          <p className='text-lg text-black mb-8 max-w-3xl leading-relaxed'>
            A collection of my research contributions to macroeconomic theory and applied economics.
          </p>
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
