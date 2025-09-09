import { useState, useEffect } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface LaTeXContent {
  title: string
  author: string
  sections: LaTeXSection[]
  content: string
}

interface LaTeXSection {
  level: number
  title: string
  content: string
}

interface NewLaTeXRendererProps {
  filename: string
}

export function NewLaTeXRenderer({ filename }: NewLaTeXRendererProps) {
  const [content, setContent] = useState<LaTeXContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFile() {
      try {
        setLoading(true)
        const response = await fetch(`/downloadable/stack/${filename}`)
        if (!response.ok) throw new Error('Failed to load file')
        
        const text = await response.text()
        const parsed = parseLaTeX(text)
        setContent(parsed)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadFile()
  }, [filename])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6A5ACD]"></div>
        <div className="text-gray-600">Loading document...</div>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-6">
        <h3 className="text-red-800 font-medium mb-2">Error Loading Document</h3>
        <p className="text-red-700">Unable to load the LaTeX document. Please download the PDF version instead.</p>
      </div>
    )
  }

  return (
    <div className="max-w-none">
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-black mb-4">{content.title}</h1>
      </header>

      {/* Content */}
      <div className="space-y-6">
        <LaTeXContentRenderer content={content.content} />
      </div>
    </div>
  )
}

function parseLaTeX(text: string): LaTeXContent {
  // Extract title
  const titleMatch = text.match(/\\title\{([^}]+)\}/)
  const title = titleMatch ? titleMatch[1] : 'Untitled'

  // Don't extract author - we're not displaying it
  const author = ''

  // Remove preamble and get document body
  const documentStart = text.indexOf('\\begin{document}')
  const documentEnd = text.indexOf('\\end{document}')
  
  let content = ''
  if (documentStart !== -1 && documentEnd !== -1) {
    content = text.substring(documentStart + 16, documentEnd)
  } else {
    content = text
  }

  // Clean up common LaTeX commands we don't need
  content = content
    .replace(/\\maketitle/g, '')
    .replace(/\\tableofcontents/g, '')
    .replace(/\\thispagestyle\{[^}]+\}/g, '')
    .replace(/\\vspace\{[^}]+\}/g, '')
    .replace(/\\newpage/g, '')
    .replace(/\\pagebreak/g, '')
    // Handle labels and equation references
    .replace(/\\label\{[^}]+\}/g, '') // Remove label commands
    // Handle spacing commands like \\[4pt]
    .replace(/\\\\\[\d+pt\]/g, '\\\\') // Convert \\[4pt] to \\
    .replace(/\\\\\[\d+mm\]/g, '\\\\') // Convert \\[4mm] to \\
    .replace(/\\\\\[\d+cm\]/g, '\\\\') // Convert \\[4cm] to \\
    // Clean up extra line breaks and spacing
    .replace(/\\\\\\\\/g, '\\\\') // Convert \\\\ to \\
    .replace(/\s*\\\\\s*/g, ' \\\\ ') // Normalize spacing around line breaks
    // Remove \(...\) delimiters - just keep the content
    .replace(/\\\(/g, '') // Remove \(
    .replace(/\\\)/g, '') // Remove \)
    // Remove title/author blocks like {Complete Markets} {Herbert W. Xin} {}
    .replace(/\{[^}]*\}\s*\{[^}]*\}\s*\{\s*\}/g, '')
    // Remove figure-related commands since we're focusing on text content
    .replace(/\\includegraphics\[[^\]]*\]\{[^}]+\}/g, '') // Remove includegraphics
    .replace(/\\caption\{[^}]+\}/g, '') // Remove caption commands
    .replace(/\\captionof\{[^}]+\}\{[^}]+\}/g, '') // Remove captionof commands
    .replace(/\\begin\{figure\}[\s\S]*?\\end\{figure\}/g, '') // Remove entire figure environments
    .replace(/\\begin\{table\}[\s\S]*?\\end\{table\}/g, '') // Remove table environments

  return { title, author, sections: [], content }
}

function LaTeXContentRenderer({ content }: { content: string }) {
  const parts = processLaTeX(content)
  
  return (
    <div className="space-y-4">
      {parts.map((part, index) => (
        <div key={index}>{part}</div>
      ))}
    </div>
  )
}

function processLaTeX(content: string): JSX.Element[] {
  const lines = content.split('\n')
  const elements: JSX.Element[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    // Skip empty lines
    if (!line) {
      i++
      continue
    }

    // Handle \[ ... \] display math early (before other processing)
    if (line.includes('\\[') && line.includes('\\]')) {
      // Extract content between \[ and \] for KaTeX
      const mathContent = line.replace(/.*\\\[/, '').replace(/\\\].*/, '').trim()
      elements.push(
        <div key={i} className="my-6">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200">
            <MathRenderer content={mathContent} displayMode={true} />
          </div>
        </div>
      )
      i++
      continue
    }

    // Handle \[ on its own line (start of multiline display math)
    if (line.trim() === '\\[') {
      const mathContent = extractMathBlock(lines, i)
      elements.push(
        <div key={i} className="my-6">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200">
            <MathRenderer content={mathContent.content} displayMode={true} />
          </div>
        </div>
      )
      i = mathContent.endIndex + 1
      continue
    }

    // Handle sections
    if (line.startsWith('\\section{')) {
      const title = extractBraces(line, '\\section{')
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-black border-b border-gray-200 pb-2">
          {title}
        </h2>
      )
      i++
      continue
    }

    // Handle subsections
    if (line.startsWith('\\subsection{')) {
      const title = extractBraces(line, '\\subsection{')
      elements.push(
        <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-black">
          {title}
        </h3>
      )
      i++
      continue
    }

    // Handle subsubsections
    if (line.startsWith('\\subsubsection{')) {
      const title = extractBraces(line, '\\subsubsection{')
      elements.push(
        <h4 key={i} className="text-lg font-medium mt-4 mb-2 text-black">
          {title}
        </h4>
      )
      i++
      continue
    }

    // Handle lists (enumerate and itemize)
    if (line.startsWith('\\begin{enumerate}') || line.startsWith('\\begin{itemize}')) {
      const listContent = extractListBlock(lines, i)
      const isOrdered = line.startsWith('\\begin{enumerate}')
      elements.push(
        <div key={i} className="my-4">
          {isOrdered ? (
            <ol className="list-decimal list-inside space-y-2 ml-4">
              {listContent.items.map((item, index) => (
                <li key={index} className="text-gray-700">
                  <TextRenderer content={item} />
                </li>
              ))}
            </ol>
          ) : (
            <ul className="list-disc list-inside space-y-2 ml-4">
              {listContent.items.map((item, index) => (
                <li key={index} className="text-gray-700">
                  <TextRenderer content={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )
      i = listContent.endIndex + 1
      continue
    }

    // Handle display math environments
    if (line.startsWith('\\begin{align') || line.startsWith('\\begin{equation') || line.startsWith('\\begin{gather') || line.startsWith('\\begin{cases') || line.startsWith('\\begin{array') || line.startsWith('\\[')) {
      const mathContent = extractMathBlock(lines, i)
      elements.push(
        <div key={i} className="my-6">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200">
            <MathRenderer content={mathContent.content} displayMode={true} />
          </div>
        </div>
      )
      i = mathContent.endIndex + 1
      continue
    }


    // Regular paragraph
    let paragraph = line
    let j = i + 1
    
    // Collect consecutive non-empty lines that aren't special commands
    while (j < lines.length) {
      const nextLine = lines[j].trim()
      if (!nextLine || 
          nextLine.startsWith('\\section') || 
          nextLine.startsWith('\\subsection') ||
          nextLine.startsWith('\\subsubsection') ||
          nextLine.startsWith('\\begin{align') ||
          nextLine.startsWith('\\begin{equation') ||
          nextLine.startsWith('\\begin{gather') ||
          nextLine.startsWith('\\begin{cases') ||
          nextLine.startsWith('\\begin{array') ||
          nextLine.startsWith('\\begin{enumerate}') ||
          nextLine.startsWith('\\begin{itemize}') ||
          nextLine.trim() === '\\[' ||
          (nextLine.includes('\\[') && nextLine.includes('\\]'))) {
        break
      }
      paragraph += ' ' + nextLine
      j++
    }

    if (paragraph.trim()) {
      elements.push(
        <p key={i} className="mb-3 text-gray-700 leading-relaxed">
          <TextRenderer content={paragraph} />
        </p>
      )
    }

    i = j
  }

  return elements
}

function extractBraces(line: string, command: string): string {
  const start = line.indexOf(command) + command.length
  const end = line.indexOf('}', start)
  return end !== -1 ? line.substring(start, end) : line.substring(start)
}

function extractListBlock(lines: string[], startIndex: number): { items: string[], endIndex: number } {
  const startLine = lines[startIndex].trim()
  const isEnumerate = startLine.startsWith('\\begin{enumerate}')
  const endTag = isEnumerate ? '\\end{enumerate}' : '\\end{itemize}'
  
  const items: string[] = []
  let currentItem = ''
  let i = startIndex + 1

  while (i < lines.length) {
    const line = lines[i].trim()
    
    if (line.startsWith(endTag)) {
      // Add the last item if there is one
      if (currentItem.trim()) {
        items.push(currentItem.trim())
      }
      break
    }
    
    if (line.startsWith('\\item')) {
      // Save previous item and start new one
      if (currentItem.trim()) {
        items.push(currentItem.trim())
      }
      currentItem = line.replace(/^\\item\s*/, '')
    } else {
      // Continue current item
      if (currentItem) {
        currentItem += ' ' + line
      }
    }
    
    i++
  }

  return { items, endIndex: i }
}

function extractMathBlock(lines: string[], startIndex: number): { content: string, endIndex: number } {
  const startLine = lines[startIndex].trim()
  let content = ''
  let i = startIndex

  if (startLine.startsWith('\\[')) {
    // Handle \\[ ... \\] blocks - extract content without delimiters for KaTeX
    content = startLine.replace('\\[', '').trim()
    i++
    while (i < lines.length) {
      const line = lines[i].trim()
      if (line.includes('\\]')) {
        content += ' ' + line.replace('\\]', '').trim()
        break
      }
      content += ' ' + line
      i++
    }
  } else {
    // Handle align, equation, and gather environments - include the environment tags for KaTeX
    content = startLine + '\n' // Include the \begin{...} line
    i++
    while (i < lines.length) {
      const line = lines[i].trim()
      content += line + '\n'
      if (line.startsWith('\\end{align') || line.startsWith('\\end{equation') || line.startsWith('\\end{gather') || line.startsWith('\\end{cases') || line.startsWith('\\end{array')) {
        break
      }
      i++
    }
  }

  return { content: content.trim(), endIndex: i }
}

function MathRenderer({ content, displayMode }: { content: string, displayMode: boolean }) {
  try {
    // Clean up content for better KaTeX rendering
    let cleanContent = content
      // Handle line breaks properly - KaTeX expects \\ not \\\\ 
      .replace(/\\\\\\\\/g, '\\\\')
      // Handle extra spacing
      .replace(/\s+/g, ' ')
      .trim()
    
    const html = katex.renderToString(cleanContent, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: true
    })
    
    return (
      <span 
        dangerouslySetInnerHTML={{ __html: html }}
        className={displayMode ? "block text-center my-4" : "inline"}
      />
    )
  } catch (error) {
    // Fallback for invalid LaTeX
    return (
      <span className={`font-mono text-red-600 ${displayMode ? 'block' : 'inline'}`}>
        Error: {content}
      </span>
    )
  }
}

function TextRenderer({ content }: { content: string }) {
  // Handle inline math with KaTeX and standalone \implies commands
  
  // Split on math expressions and standalone math commands
  const parts = content.split(/(\$[^$]+\$|\\implies|\\impies|\\Rightarrow|\\rightarrow|\\leftarrow)/)
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          // This is inline math with $ delimiters
          const mathContent = part.slice(1, -1) // Remove $ delimiters
          return <MathRenderer key={index} content={mathContent} displayMode={false} />
        } else if (part === '\\implies' || part === '\\impies' || part === '\\Rightarrow') {
          // Handle standalone implies as inline math (including typo \impies)
          return <MathRenderer key={index} content="\\implies" displayMode={false} />
        } else if (part === '\\rightarrow') {
          return <MathRenderer key={index} content="\\to" displayMode={false} />
        } else if (part === '\\leftarrow') {
          return <MathRenderer key={index} content="\\gets" displayMode={false} />
        } else {
          // Handle text formatting
          let processedText = part
            .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
            .replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>')
            .replace(/\\text\{([^}]+)\}/g, '$1')
            .replace(/\\eqref\{([^}]+)\}/g, '($1)') // Convert equation references to parentheses
            .replace(/\\ref\{([^}]+)\}/g, '$1') // Convert other references
            .replace(/\\impies/g, '\\implies') // Fix typo
            .replace(/\\([a-zA-Z]+)/g, '') // Remove remaining unknown LaTeX commands
          
          return <span key={index} dangerouslySetInnerHTML={{ __html: processedText }} />
        }
      })}
    </>
  )
}