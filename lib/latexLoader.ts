// LaTeX content loader and processor
export interface LaTeXDocument {
  id: number
  title: string
  author?: string
  date?: string
  content: string
  sections: LaTeXSection[]
}

export interface LaTeXSection {
  level: number
  title: string
  content: string
  subsections?: LaTeXSection[]
}

// Load and parse LaTeX files
export async function loadLatexFile(filename: string): Promise<string> {
  try {
    const response = await fetch(`/downloadable/stack/${filename}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to load ${filename}`)
    }
    const content = await response.text()
    if (!content.trim()) {
      throw new Error(`Empty content in ${filename}`)
    }
    return content
  } catch (error) {
    console.error(`Error loading LaTeX file ${filename}:`, error)
    // Return comprehensive fallback content based on filename
    return getFallbackContent(filename)
  }
}

// Fallback content for when LaTeX files can't be loaded
function getFallbackContent(filename: string): string {
  const modelName = filename.replace('.tex', '').replace('_', ' ')
  
  return `\\title{${modelName}}
\\author{Mathematical Economics}
\\date{\\today}

\\section{Introduction}
This document contains mathematical analysis of ${modelName.toLowerCase()}. The content includes detailed derivations, proofs, and economic interpretations.

\\section{Mathematical Framework}
The mathematical framework involves:
- Optimization problems with constraints
- Dynamic systems and equilibrium analysis  
- Comparative statics and welfare analysis

\\subsection{Key Equations}
The model features several key mathematical relationships:

\\[\\max_{x,y} U(x,y)\\]

subject to budget constraints and market clearing conditions.

\\section{Economic Interpretation}
The economic interpretation focuses on:
- Market efficiency and welfare properties
- Policy implications and comparative analysis
- Empirical applications and extensions

\\textbf{Note:} This is fallback content. The full mathematical derivations are available in the PDF version.`
}

// Parse LaTeX content into structured format
export function parseLatexContent(latexContent: string): LaTeXDocument {
  // Remove LaTeX preamble and document wrapper
  let content = latexContent
    .replace(/\\documentclass.*?\n/g, '')
    .replace(/\\usepackage.*?\n/g, '')
    .replace(/\\begin{document}/g, '')
    .replace(/\\end{document}/g, '')
    .replace(/\\maketitle/g, '')
    .replace(/\\tableofcontents/g, '')
    .replace(/\\thispagestyle{fancy}/g, '')

  // Extract title, author, date
  const titleMatch = content.match(/\\title\{([^}]+)\}/)
  const authorMatch = content.match(/\\author\{([^}]+)\}/)
  const dateMatch = content.match(/\\date\{([^}]+)\}/)

  const title = titleMatch ? titleMatch[1] : 'Untitled'
  const author = authorMatch ? authorMatch[1] : undefined
  const date = dateMatch ? dateMatch[1] : undefined

  // Remove title/author/date commands
  content = content
    .replace(/\\title\{[^}]+\}/g, '')
    .replace(/\\author\{[^}]+\}/g, '')
    .replace(/\\date\{[^}]+\}/g, '')

  // Parse sections
  const sections = parseSections(content)

  return {
    id: 0,
    title,
    author,
    date,
    content,
    sections
  }
}

function parseSections(content: string): LaTeXSection[] {
  const sections: LaTeXSection[] = []
  
  // Split by sections
  const sectionRegex = /\\section\{([^}]+)\}/g
  const parts = content.split(sectionRegex)
  
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i]
    const sectionContent = parts[i + 1] || ''
    
    sections.push({
      level: 1,
      title,
      content: sectionContent,
      subsections: parseSubsections(sectionContent)
    })
  }
  
  return sections
}

function parseSubsections(content: string): LaTeXSection[] {
  const subsections: LaTeXSection[] = []
  
  // Split by subsections
  const subsectionRegex = /\\subsection\{([^}]+)\}/g
  const parts = content.split(subsectionRegex)
  
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i]
    const subsectionContent = parts[i + 1] || ''
    
    subsections.push({
      level: 2,
      title,
      content: subsectionContent,
      subsections: parseSubsubsections(subsectionContent)
    })
  }
  
  return subsections
}

function parseSubsubsections(content: string): LaTeXSection[] {
  const subsubsections: LaTeXSection[] = []
  
  // Split by subsubsections
  const subsubsectionRegex = /\\subsubsection\{([^}]+)\}/g
  const parts = content.split(subsubsectionRegex)
  
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i]
    const subsubsectionContent = parts[i + 1] || ''
    
    subsubsections.push({
      level: 3,
      title,
      content: subsubsectionContent
    })
  }
  
  return subsubsections
}

// Convert LaTeX to web-friendly format
export function convertLatexToWeb(latexContent: string): string {
  let content = latexContent

  // Handle sections
  content = content
    .replace(/\\section\{([^}]+)\}/g, '# $1')
    .replace(/\\subsection\{([^}]+)\}/g, '## $1')
    .replace(/\\subsubsection\{([^}]+)\}/g, '### $1')

  // Handle math environments properly
  content = content
    // Handle display math \[ ... \]
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, content) => '$$' + content + '$$')
    // Handle inline math \( ... \)
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$')
    // Handle existing single dollar signs (make them inline)
    .replace(/\$([^$\n]+)\$/g, '$$$1$$')

  // Handle align environments
  content = content
    .replace(/\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g, (_, equations) => {
      return '$$' + equations.replace(/\\\\/g, '\\\\\n') + '$$'
    })

  // Handle equation environments
  content = content
    .replace(/\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g, (_, content) => '$$' + content + '$$')

  // Handle itemize/enumerate
  content = content
    .replace(/\\begin\{itemize\}/g, '')
    .replace(/\\end\{itemize\}/g, '')
    .replace(/\\begin\{enumerate\}/g, '')
    .replace(/\\end\{enumerate\}/g, '')
    .replace(/\\item\s*/g, '- ')

  // Handle text formatting
  content = content
    .replace(/\\textbf\{([^}]+)\}/g, '**$1**')
    .replace(/\\textit\{([^}]+)\}/g, '*$1*')
    .replace(/\\emph\{([^}]+)\}/g, '*$1*')

  // Handle labels and references
  content = content
    .replace(/\\label\{[^}]+\}/g, '')
    .replace(/\\eqref\{([^}]+)\}/g, '($1)')
    .replace(/\\ref\{([^}]+)\}/g, '$1')

  // Handle special environments
  content = content
    .replace(/\\begin\{note\}[\s\S]*?\\end\{note\}/g, '')
    .replace(/\\vspace\{[^}]+\}/g, '')
    .replace(/\\hspace\{[^}]+\}/g, '')

  // Clean up extra whitespace and LaTeX commands
  content = content
    .replace(/\\quad/g, ' ')
    .replace(/\\qquad/g, '  ')
    .replace(/\\,/g, ' ')
    .replace(/\\;/g, ' ')
    .replace(/\\!/g, '')
    .replace(/\\notag/g, '')
    .replace(/\\tag\{[^}]+\}/g, '')

  // Handle common LaTeX symbols that aren't math
  content = content
    .replace(/\\&/g, '&')
    .replace(/\\\$/g, '$')
    .replace(/\\%/g, '%')

  return content.trim()
}