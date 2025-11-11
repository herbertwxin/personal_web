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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B19EEF]"></div>
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
        <h1
          className="text-3xl font-bold text-black mb-4"
          data-latex-title={content.title}
        >
          <TextRenderer content={content.title} />
        </h1>
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
    // Remove metadata commands that otherwise leak curly-brace text
    .replace(/\\title\{[^}]*\}\s*/g, '')
    .replace(/\\author\{[^}]*\}\s*/g, '')
    .replace(/\\date\{[^}]*\}\s*/g, '')
    .replace(/\\thanks\{[^}]*\}\s*/g, '')
    // Handle labels and equation references
    .replace(/\\label\{[^}]+\}/g, '') // Remove label commands
    // Handle spacing commands like \\[4pt]
    .replace(/\\\\\[\d+pt\]/g, '\\\\') // Convert \\[4pt] to \\
    .replace(/\\\\\[\d+mm\]/g, '\\\\') // Convert \\[4mm] to \\
    .replace(/\\\\\[\d+cm\]/g, '\\\\') // Convert \\[4cm] to \\
    // Clean up extra line breaks and spacing
    .replace(/\\\\\\\\/g, '\\\\') // Convert \\\\ to \\
    .replace(/\s*\\\\\s*/g, ' \\\\ ') // Normalize spacing around line breaks
    // Remove title blocks that may appear after command stripping
    .replace(/\{[^}]*\}\s*\{[^}]*\}\s*\{\s*\}/g, '')
    // Remove figure-related commands since we're focusing on text content
    .replace(/\\includegraphics\[[^\]]*\]\{[^}]+\}/g, '') // Remove includegraphics
    .replace(/\\caption\{[^}]+\}/g, '') // Remove caption commands
    .replace(/\\captionof\{[^}]+\}\{[^}]+\}/g, '') // Remove captionof commands
    .replace(/\\begin\{figure\}[\s\S]*?\\end\{figure\}/g, '') // Remove entire figure environments
    .replace(/\\begin\{table\}[\s\S]*?\\end\{table\}/g, '') // Remove table environments

  // Normalize inline math delimiters such as \(...\) into $...$
  content = content.replace(/\\\((.+?)\\\)/gs, (_, inner) => `$${inner.trim()}$`)

  // Normalize display math written with $$...$$ into \[ ... \]
  content = content.replace(/\$\$([\s\S]+?)\$\$/g, (_match, inner) => `\\[${inner.trim()}\\]`)

  // Standardize line endings
  content = content.replace(/\r\n?/g, '\n')

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

    // Skip leftover title metadata braces that occasionally slip through
    if (/^\{[^}]+\}\s*\{[^}]+\}\s*\{?[^}]*\}?\s*$/.test(line)) {
      i++
      continue
    }

    // Handle manual bullet markers ($\bullet$)
    if (line.startsWith('$\\bullet$')) {
      const bulletItems: string[] = []
      let j = i
      while (j < lines.length) {
        const candidate = lines[j].trim()
        if (!candidate.startsWith('$\\bullet$')) {
          break
        }
        bulletItems.push(candidate.replace(/^\$\\bullet\$\s*/, ''))
        j++
      }

      elements.push(
        <ul key={`manual-bullets-${i}`} className="list-disc list-inside space-y-2 ml-4">
          {bulletItems.map((item, index) => (
            <li key={index} className="text-gray-700">
              <TextRenderer content={item} />
            </li>
          ))}
        </ul>
      )

      i = j
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

    const heading = matchHeading(line)
    if (heading) {
      const { title, tag: Tag, className } = heading
      elements.push(
        <Tag
          key={i}
          className={className}
          data-latex-title={title}
        >
          <TextRenderer content={title} />
        </Tag>
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

      // cases environment is rendered directly with displayMode: true
      // KaTeX will handle it properly in display mode
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

type HeadingMatch = {
  level: number
  title: string
  tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className: string
}

function matchHeading(line: string): HeadingMatch | null {
  const definitions: Array<{ regex: RegExp; level: number; tag: HeadingMatch['tag']; className: string }> = [
    {
      regex: /^\\section\*?\{([\s\S]+)\}$/,
      level: 2,
      tag: 'h2',
      className: 'text-2xl font-bold mt-8 mb-4 text-black border-b border-gray-200 pb-2',
    },
    {
      regex: /^\\subsection\*?\{([\s\S]+)\}$/,
      level: 3,
      tag: 'h3',
      className: 'text-xl font-semibold mt-6 mb-3 text-black',
    },
    {
      regex: /^\\subsubsection\*?\{([\s\S]+)\}$/,
      level: 4,
      tag: 'h4',
      className: 'text-lg font-medium mt-4 mb-2 text-black',
    },
    {
      regex: /^\\paragraph\*?\{([\s\S]+)\}$/,
      level: 5,
      tag: 'h5',
      className: 'text-base font-medium mt-3 mb-2 text-black',
    },
    {
      regex: /^\\subparagraph\*?\{([\s\S]+)\}$/,
      level: 6,
      tag: 'h6',
      className: 'text-sm font-semibold mt-2 mb-1 text-black',
    },
  ]

  for (const definition of definitions) {
    const match = line.match(definition.regex)
    if (match) {
      return {
        level: definition.level,
        title: match[1].trim(),
        tag: definition.tag,
        className: definition.className,
      }
    }
  }

  return null
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
  } else if (startLine.startsWith('\\begin{cases}')) {
    // Handle cases environment specially
    content = startLine + '\n'
    i++
    while (i < lines.length) {
      const line = lines[i].trim()
      content += line + '\n'
      if (line.startsWith('\\end{cases}')) {
        break
      }
      i++
    }
  } else {
    // Handle align, equation, and gather environments - include the environment tags for KaTeX
    content = startLine + '\n' // Include the \begin{...} line
    i++
    while (i < lines.length) {
      const line = lines[i].trim()
      content += line + '\n'
      if (line.startsWith('\\end{align') || line.startsWith('\\end{equation') || line.startsWith('\\end{gather') || line.startsWith('\\end{array')) {
        break
      }
      i++
    }
  }

  return { content: content.trim(), endIndex: i }
}

function MathRenderer({ content, displayMode }: { content: string, displayMode: boolean }) {
  try {
    let cleanContent = content.replace(/\r\n?/g, '\n').trim()

    // Normalize excessive backslashes while maintaining structure
    cleanContent = cleanContent.replace(/\\\\\\\\/g, '\\\\')

    if (displayMode) {
      cleanContent = cleanContent
        .replace(/\\begin{align\*}/g, '\\begin{aligned}')
        .replace(/\\end{align\*}/g, '\\end{aligned}')
        .replace(/\\begin{align}/g, '\\begin{aligned}')
        .replace(/\\end{align}/g, '\\end{aligned}')
        .replace(/\\begin{gather\*}/g, '\\begin{aligned}')
        .replace(/\\end{gather\*}/g, '\\end{aligned}')
        .replace(/\\begin{gather}/g, '\\begin{aligned}')
        .replace(/\\end{gather}/g, '\\end{aligned}')
    }

    // Debug logging for cases environment
    if (cleanContent.includes('\\begin{cases}')) {
      console.log('Rendering cases environment:', cleanContent)
    }

    const html = katex.renderToString(cleanContent, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: true,
      fleqn: false,
      macros: {
        "\\eqref": "(\\text{#1})"
      }
    })

    return (
      <span
        dangerouslySetInnerHTML={{ __html: html }}
        className={displayMode ? "block text-center my-4" : "inline"}
      />
    )
  } catch (error) {
    // Fallback for invalid LaTeX
    console.error('KaTeX rendering error:', error, 'Content:', content)
    return (
      <span className={`font-mono text-red-600 ${displayMode ? 'block' : 'inline'}`}>
        Error: {content}
      </span>
    )
  }
}

export function TextRenderer({ content }: { content: string }) {
  // Handle inline math with KaTeX and standalone \implies commands
  const normalized = content
    .replace(/\\\((.+?)\\\)/gs, (_, inner) => `$${inner.trim()}$`)

  // Split on math expressions, standalone math commands, and math environments
  const parts = normalized.split(/(\$[^$]+\$|\\implies|\\impies|\\Rightarrow|\\rightarrow|\\leftarrow|\\begin\{cases\}[\s\S]*?\\end\{cases\})/)

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          // This is inline math with $ delimiters
          const mathContent = part.slice(1, -1) // Remove $ delimiters
          return <MathRenderer key={index} content={mathContent} displayMode={false} />
        } else if (part.match(/\\begin\{cases\}[\s\S]*?\\end\{cases\}/)) {
          // Handle cases environment in display mode
          // KaTeX renders cases properly when displayMode is true
          return (
            <div key={index} className="my-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200">
                <MathRenderer content={part} displayMode={true} />
              </div>
            </div>
          )
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
            .replace(/\\eqref\{([^}]+)\}/g, '<span class="equation-ref">($1)</span>') // Convert equation references with styling
            .replace(/\\ref\{([^}]+)\}/g, '$1') // Convert other references
            .replace(/\\impies/g, '\\implies') // Fix typo
            .replace(/\\&/g, '&')
            .replace(/\\%/g, '%')
            .replace(/\\#/g, '#')
            .replace(/\\_/g, '_')
            .replace(/\\~/g, '&nbsp;')
            .replace(/\\\\/g, '<br />')

          return <span key={index} dangerouslySetInnerHTML={{ __html: processedText }} />
        }
      })}
    </>
  )
}
