interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown-like rendering for mathematical content
  const renderContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-black">
              {line.substring(2)}
            </h1>
          )
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-black">
              {line.substring(3)}
            </h2>
          )
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-medium mt-4 mb-2 text-black">
              {line.substring(4)}
            </h3>
          )
        }
        if (line.startsWith('#### ')) {
          return (
            <h4 key={index} className="text-lg font-medium mt-3 mb-2 text-black">
              {line.substring(5)}
            </h4>
          )
        }

        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />
        }

        // Mathematical expressions (simple detection)
        if (line.includes('=') && (line.includes('_') || line.includes('^') || line.includes('∑') || line.includes('∫'))) {
          return (
            <div key={index} className="bg-gray-50 p-3 my-2 rounded border-l-4 border-blue-200 font-mono text-sm">
              {line}
            </div>
          )
        }

        // Lists
        if (line.trim().startsWith('- ')) {
          return (
            <li key={index} className="ml-4 mb-1 text-gray-700">
              {line.substring(line.indexOf('- ') + 2)}
            </li>
          )
        }

        if (/^\d+\./.test(line.trim())) {
          return (
            <li key={index} className="ml-4 mb-1 text-gray-700 list-decimal">
              {line.substring(line.indexOf('.') + 1).trim()}
            </li>
          )
        }

        // Bold text
        const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

        // Regular paragraphs
        return (
          <p key={index} className="mb-3 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldText }} />
        )
      })
  }

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  )
}