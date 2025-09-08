export interface SearchResult {
  id: string
  title: string
  content: string
  type: 'page' | 'publication' | 'blog' | 'teaching'
  url: string
  excerpt?: string
  metadata?: {
    date?: string
    journal?: string
    year?: string
    tags?: string[]
  }
}

export interface SearchIndex {
  [key: string]: SearchResult[]
}

// Create search index for all content
export const searchData: SearchResult[] = [
  // Home page content
  {
    id: 'home',
    title: 'Home',
    content: 'Academic researcher specializing in macroeconomics, DSGE models, economic theory, publications, teaching, resume, blog',
    type: 'page',
    url: 'home',
    excerpt: 'Welcome to my academic website featuring research in economics and macroeconomic modeling'
  },
  
  // Publications
  {
    id: 'pub-1',
    title: 'Dynamic Equilibrium Models in Modern Macroeconomics',
    content: 'Dynamic Stochastic General Equilibrium DSGE macroeconomics economic theory modeling policy analysis',
    type: 'publication',
    url: 'publications',
    excerpt: 'Research on DSGE models and their applications in macroeconomic analysis',
    metadata: {
      journal: 'Journal of Economic Theory',
      year: '2024'
    }
  },
  {
    id: 'pub-2',
    title: 'Stochastic Growth Models: Theory and Applications',
    content: 'Stochastic growth models economic growth theory applications mathematical economics',
    type: 'publication',
    url: 'publications',
    excerpt: 'Theoretical framework for understanding economic growth through stochastic modeling',
    metadata: {
      journal: 'Econometrica',
      year: '2023'
    }
  },
  {
    id: 'pub-3',
    title: 'Monetary Policy in Open Economy Models',
    content: 'Monetary policy open economy international economics central banking policy analysis',
    type: 'publication',
    url: 'publications',
    excerpt: 'Analysis of monetary policy effectiveness in open economy frameworks',
    metadata: {
      journal: 'American Economic Review',
      year: '2023'
    }
  },
  
  // Blog posts
  {
    id: 'blog-1',
    title: 'Understanding DSGE Models in Modern Economics',
    content: 'DSGE Dynamic Stochastic General Equilibrium models macroeconomics policy analysis mathematical economics microeconomic foundations',
    type: 'blog',
    url: 'blog',
    excerpt: 'A deep dive into Dynamic Stochastic General Equilibrium models and their practical applications',
    metadata: {
      date: '2024-02-15',
      tags: ['Macroeconomics', 'DSGE', 'Policy']
    }
  },
  {
    id: 'blog-2',
    title: 'The Evolution of Economic Thought',
    content: 'Economic history thought evolution classical keynesian neoclassical behavioral economics schools theory',
    type: 'blog',
    url: 'blog',
    excerpt: 'Exploring how economic thought has evolved from classical to modern theories',
    metadata: {
      date: '2024-01-20',
      tags: ['Economic History', 'Theory', 'Schools of Thought']
    }
  },
  {
    id: 'blog-3',
    title: 'Machine Learning in Economic Forecasting',
    content: 'Machine learning artificial intelligence economic forecasting prediction algorithms data science economics',
    type: 'blog',
    url: 'blog',
    excerpt: 'How machine learning is revolutionizing economic forecasting and analysis',
    metadata: {
      date: '2024-01-05',
      tags: ['Machine Learning', 'Forecasting', 'Data Science']
    }
  },
  
  // Teaching content
  {
    id: 'teaching',
    title: 'Teaching',
    content: 'Teaching macroeconomics microeconomics econometrics statistics courses undergraduate graduate education',
    type: 'teaching',
    url: 'teaching',
    excerpt: 'Courses and teaching materials in economics and econometrics'
  },
  
  // Resume/About content
  {
    id: 'resume',
    title: 'Resume & About',
    content: 'CV resume education experience research publications awards grants conferences background academic career',
    type: 'page',
    url: 'resume',
    excerpt: 'Academic background, experience, and achievements'
  },
  
  // Stack/Technology content
  {
    id: 'stack',
    title: 'Technology Stack',
    content: 'Technology stack programming software tools R Python MATLAB Stata econometric software development research tools',
    type: 'page',
    url: 'stack',
    excerpt: 'Technical tools and software used in research and analysis'
  }
]

// Search function with fuzzy matching
export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return []
  
  const searchTerms = query.toLowerCase().split(/\s+/)
  const results: Array<{ result: SearchResult; score: number }> = []
  
  searchData.forEach(item => {
    let score = 0
    const searchableText = `${item.title} ${item.content} ${item.excerpt || ''} ${item.metadata?.tags?.join(' ') || ''}`.toLowerCase()
    
    searchTerms.forEach(term => {
      // Exact title match gets highest score
      if (item.title.toLowerCase().includes(term)) {
        score += 10
      }
      
      // Content match gets medium score
      if (item.content.toLowerCase().includes(term)) {
        score += 5
      }
      
      // Excerpt match gets lower score
      if (item.excerpt?.toLowerCase().includes(term)) {
        score += 3
      }
      
      // Tag match gets medium score
      if (item.metadata?.tags?.some(tag => tag.toLowerCase().includes(term))) {
        score += 7
      }
      
      // Fuzzy matching for similar terms
      if (searchableText.includes(term)) {
        score += 2
      }
    })
    
    if (score > 0) {
      results.push({ result: item, score })
    }
  })
  
  // Sort by score (descending) and return results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Limit to top 10 results
    .map(item => item.result)
}

// Get suggestions for autocomplete
export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return []
  
  const suggestions = new Set<string>()
  const queryLower = query.toLowerCase()
  
  searchData.forEach(item => {
    // Add title words that start with query
    const titleWords = item.title.toLowerCase().split(/\s+/)
    titleWords.forEach(word => {
      if (word.startsWith(queryLower) && word.length > queryLower.length) {
        suggestions.add(word)
      }
    })
    
    // Add tags that start with query
    item.metadata?.tags?.forEach(tag => {
      if (tag.toLowerCase().startsWith(queryLower)) {
        suggestions.add(tag.toLowerCase())
      }
    })
  })
  
  return Array.from(suggestions).slice(0, 5)
}