interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown-like rendering for mathematical content
  const renderContent = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let i = 0
    
    while (i < lines.length) {
      const line = lines[i]
      
      // Handle code blocks
      if (line.startsWith('```')) {
        const language = line.substring(3).trim()
        const codeLines: string[] = []
        i++ // Move past opening ```
        
        // Collect code lines until closing ```
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }
        
        // Move past closing ``` if found
        if (i < lines.length) {
          i++
        }
        
        let codeContent = codeLines.join('\n')
        
        // Clean up code content (remove leading tabs/spaces if consistent)
        if (codeLines.length > 0 && codeLines[0].trim() !== '') {
          const firstLineIndent = codeLines[0].match(/^[\t\s]*/)?.[0] || ''
          if (firstLineIndent && codeLines.every((line: string) => line.startsWith(firstLineIndent) || line.trim() === '')) {
            codeContent = codeLines.map((line: string) => line.substring(firstLineIndent.length)).join('\n')
          }
        }
        
        // Auto-detect language if not specified
        let detectedLanguage = language
        if (!detectedLanguage && codeContent.includes('[Desktop Entry]')) {
          detectedLanguage = 'desktop'
        }
        
        // Determine text color based on language
        let textColor = 'text-gray-100'
        if (detectedLanguage === 'bash') {
          textColor = 'text-purple-400'
        } else if (detectedLanguage === 'desktop') {
          textColor = 'text-blue-300'
        }
        
        elements.push(
          <div key={`code-${i}`} className="my-4">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              {(language || detectedLanguage) && (
                <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 font-mono border-b border-gray-700">
                  {language || detectedLanguage}
                </div>
              )}
              <pre className="p-4 overflow-x-auto">
                <code className={`text-sm font-mono ${textColor}`}>
                  {codeContent}
                </code>
              </pre>
            </div>
          </div>
        )
        
        continue // Skip the increment at the bottom
      }
      
      // Handle inline formatting (code, links, bold, italic)
      let processedLine = line.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">$1</code>')
      
      // Handle markdown links [text](url)
      processedLine = processedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
      
      // Handle bold and italic (do bold first, then italic to avoid conflicts)
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Handle blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-blue-300 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic">
            <div dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />
          </blockquote>
        )
        i++
        continue
      }
      
      // Headers (apply formatting to header text)
      if (line.startsWith('# ')) {
        const headerText = processedLine.substring(2)
        elements.push(
          <h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-black">
            <div dangerouslySetInnerHTML={{ __html: headerText }} />
          </h1>
        )
      } else if (line.startsWith('## ')) {
        const headerText = processedLine.substring(3)
        elements.push(
          <h2 key={i} className="text-2xl font-semibold mt-6 mb-3 text-black">
            <div dangerouslySetInnerHTML={{ __html: headerText }} />
          </h2>
        )
      } else if (line.startsWith('### ')) {
        const headerText = processedLine.substring(4)
        elements.push(
          <h3 key={i} className="text-xl font-medium mt-4 mb-2 text-black">
            <div dangerouslySetInnerHTML={{ __html: headerText }} />
          </h3>
        )
      } else if (line.startsWith('#### ')) {
        const headerText = processedLine.substring(5)
        elements.push(
          <h4 key={i} className="text-lg font-medium mt-3 mb-2 text-black">
            <div dangerouslySetInnerHTML={{ __html: headerText }} />
          </h4>
        )
      } else if (line.trim() === '') {
        // Empty lines
        elements.push(<br key={i} />)
      } else if (line.includes('=') && (line.includes('_') || line.includes('^') || line.includes('∑') || line.includes('∫'))) {
        // Mathematical expressions (simple detection)
        elements.push(
          <div key={i} className="bg-gray-50 p-3 my-2 rounded border-l-4 border-blue-200 font-mono text-sm">
            {line}
          </div>
        )
      } else if (line.trim().startsWith('- ')) {
        // Unordered lists
        const listText = processedLine.substring(processedLine.indexOf('- ') + 2)
        elements.push(
          <li key={i} className="ml-4 mb-1 text-gray-700 list-disc">
            <div dangerouslySetInnerHTML={{ __html: listText }} />
          </li>
        )
      } else if (/^\d+\./.test(line.trim())) {
        // Ordered lists
        const listText = processedLine.substring(processedLine.indexOf('.') + 1).trim()
        elements.push(
          <li key={i} className="ml-4 mb-1 text-gray-700 list-decimal">
            <div dangerouslySetInnerHTML={{ __html: listText }} />
          </li>
        )
      } else {
        // Regular paragraphs with all formatting applied
        elements.push(
          <p key={i} className="mb-3 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />
        )
      }
      
      i++ // Move to next line
    }
    
    return elements
  }

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  )
}