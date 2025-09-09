import { useState, useEffect } from 'react'
import { ProcessedText } from './LaTeXRenderer'
import { loadLatexFile, parseLatexContent, convertLatexToWeb, LaTeXDocument, LaTeXSection } from '../lib/latexLoader'

interface LaTeXDocumentRendererProps {
  filename: string
  className?: string
}

export function LaTeXDocumentRenderer({ filename, className = '' }: LaTeXDocumentRendererProps) {
  const [document, setDocument] = useState<LaTeXDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDocument() {
      try {
        setLoading(true)
        setError(null)
        
        const latexContent = await loadLatexFile(filename)
        const parsedDoc = parseLatexContent(latexContent)
        const webContent = convertLatexToWeb(parsedDoc.content)
        
        setDocument({
          ...parsedDoc,
          content: webContent
        })
      } catch (err) {
        console.error('LaTeX loading error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadDocument()
  }, [filename])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6A5ACD]"></div>
        <div className="text-gray-600">Loading LaTeX document...</div>
        <div className="text-sm text-gray-500">Parsing mathematical content</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-6">
        <h3 className="text-yellow-800 font-medium mb-2">Loading Issue</h3>
        <p className="text-yellow-700 mb-4">
          Unable to load the full LaTeX content. Showing fallback content instead.
        </p>
        <p className="text-sm text-yellow-600">
          For the complete mathematical derivations, please download the PDF version.
        </p>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="text-gray-600 py-6">No document content available.</div>
    )
  }

  return (
    <div className={`latex-document ${className}`}>
      {/* Document Header */}
      <header className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {document.title}
        </h1>
        {document.author && (
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-medium">Author:</span> {document.author}
          </p>
        )}
        {document.date && (
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {document.date}
          </p>
        )}
      </header>

      {/* Table of Contents */}
      {document.sections.length > 0 && (
        <nav className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contents</h2>
          <TableOfContents sections={document.sections} />
        </nav>
      )}

      {/* Document Content */}
      <article className="max-w-none text-gray-700 leading-relaxed">
        <DocumentContent content={document.content} sections={document.sections} />
      </article>
    </div>
  )
}

function TableOfContents({ sections }: { sections: LaTeXSection[] }) {
  return (
    <ul className="space-y-2">
      {sections.map((section, index) => (
        <li key={index}>
          <a 
            href={`#section-${index}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {section.title}
          </a>
          {section.subsections && section.subsections.length > 0 && (
            <ul className="ml-4 mt-1 space-y-1">
              {section.subsections.map((subsection, subIndex) => (
                <li key={subIndex}>
                  <a 
                    href={`#subsection-${index}-${subIndex}`}
                    className="text-blue-500 hover:text-blue-700 hover:underline text-sm"
                  >
                    {subsection.title}
                  </a>
                  {subsection.subsections && subsection.subsections.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {subsection.subsections.map((subsubsection, subsubIndex) => (
                        <li key={subsubIndex}>
                          <a 
                            href={`#subsubsection-${index}-${subIndex}-${subsubIndex}`}
                            className="text-blue-400 hover:text-blue-600 hover:underline text-xs"
                          >
                            {subsubsection.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

function DocumentContent({ content, sections }: { content: string, sections: LaTeXSection[] }) {
  // Split content by sections and render with proper structure
  const renderSection = (section: LaTeXSection, index: number, level: number = 1) => {
    const HeadingTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements
    const sectionId = level === 1 ? `section-${index}` : 
                     level === 2 ? `subsection-${index}` :
                     `subsubsection-${index}`

    return (
      <section key={index} id={sectionId} className="mb-8">
        <HeadingTag className={`font-bold mb-4 ${
          level === 1 ? 'text-2xl' : 
          level === 2 ? 'text-xl' : 
          'text-lg'
        }`}>
          {section.title}
        </HeadingTag>
        
        <div className="mb-6">
          <ProcessedText>{section.content}</ProcessedText>
        </div>

        {section.subsections && section.subsections.map((subsection, subIndex) => 
          renderSection(subsection, subIndex, level + 1)
        )}
      </section>
    )
  }

  return (
    <div className="space-y-8">
      {sections.length > 0 ? (
        sections.map((section, index) => renderSection(section, index))
      ) : (
        <ProcessedText>{content}</ProcessedText>
      )}
    </div>
  )
}

// Enhanced ProcessedText component for LaTeX content
export function LaTeXProcessedText({ children, className = '' }: { children: string, className?: string }) {
  // Enhanced processing for LaTeX-specific content
  let processedContent = children

  // Handle LaTeX-specific environments that weren't caught in the main converter
  processedContent = processedContent
    // Handle theorem-like environments
    .replace(/\\begin\{theorem\}([\s\S]*?)\\end\{theorem\}/g, 
      '<div class="theorem bg-blue-50 border-l-4 border-blue-400 p-4 my-4"><strong>Theorem:</strong> $1</div>')
    .replace(/\\begin\{definition\}([\s\S]*?)\\end\{definition\}/g, 
      '<div class="definition bg-green-50 border-l-4 border-green-400 p-4 my-4"><strong>Definition:</strong> $1</div>')
    .replace(/\\begin\{proof\}([\s\S]*?)\\end\{proof\}/g, 
      '<div class="proof bg-gray-50 border-l-4 border-gray-400 p-4 my-4"><strong>Proof:</strong> $1</div>')
    .replace(/\\begin\{proposition\}([\s\S]*?)\\end\{proposition\}/g, 
      '<div class="proposition bg-purple-50 border-l-4 border-purple-400 p-4 my-4"><strong>Proposition:</strong> $1</div>')

  return <ProcessedText className={className}>{processedContent}</ProcessedText>
}