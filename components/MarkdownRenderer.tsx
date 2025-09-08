import { ProcessedText } from './LaTeXRenderer'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  // Process the markdown content
  const processMarkdown = (text: string): JSX.Element[] => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Skip empty lines
      if (line.trim() === '') {
        i++
        continue
      }

      // Headers
      if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={i} className='text-lg font-medium mt-6 mb-3 text-black'>
            <ProcessedText>{line.slice(5)}</ProcessedText>
          </h4>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className='text-xl font-medium mt-8 mb-4 text-black'>
            <ProcessedText>{line.slice(4)}</ProcessedText>
          </h3>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className='text-2xl font-medium mt-10 mb-6 text-black'>
            <ProcessedText>{line.slice(3)}</ProcessedText>
          </h2>
        )
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className='text-3xl font-medium mt-12 mb-8 text-black'>
            <ProcessedText>{line.slice(2)}</ProcessedText>
          </h1>
        )
      }
      // Code blocks
      else if (line.startsWith('```')) {
        const codeLines: string[] = []
        i++ // Skip opening ```

        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }

        elements.push(
          <div
            key={i}
            className='my-6 bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto'
          >
            <pre>{codeLines.join('\n')}</pre>
          </div>
        )
      }
      // Horizontal rule
      else if (line.trim() === '---') {
        elements.push(<hr key={i} className='my-8 border-gray-300' />)
      }
      // Lists
      else if (line.match(/^\d+\.\s/)) {
        // Ordered list
        const listItems: string[] = []
        while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
          listItems.push(lines[i].replace(/^\d+\.\s/, ''))
          i++
        }
        i-- // Back up one since we'll increment at the end of the loop

        elements.push(
          <ol
            key={i}
            className='list-decimal list-inside my-4 space-y-2 text-black'
          >
            {listItems.map((item, idx) => (
              <li key={idx}>
                <ProcessedText>{item}</ProcessedText>
              </li>
            ))}
          </ol>
        )
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        // Unordered list
        const listItems: string[] = []
        while (
          i < lines.length &&
          (lines[i].startsWith('- ') || lines[i].startsWith('* '))
        ) {
          listItems.push(lines[i].slice(2))
          i++
        }
        i-- // Back up one since we'll increment at the end of the loop

        elements.push(
          <ul
            key={i}
            className='list-disc list-inside my-4 space-y-2 text-black'
          >
            {listItems.map((item, idx) => (
              <li key={idx}>
                <ProcessedText>{item}</ProcessedText>
              </li>
            ))}
          </ul>
        )
      }
      // Block quotes
      else if (line.startsWith('> ')) {
        const blockQuoteLines: string[] = []
        while (i < lines.length && lines[i].startsWith('> ')) {
          blockQuoteLines.push(lines[i].slice(2))
          i++
        }
        i-- // Back up one since we'll increment at the end of the loop

        elements.push(
          <blockquote
            key={i}
            className='border-l-4 border-[#b8a9ff] pl-4 my-6 italic text-gray-700'
          >
            <ProcessedText>{blockQuoteLines.join(' ')}</ProcessedText>
          </blockquote>
        )
      }
      // Regular paragraphs
      else {
        // Collect multiple lines for a paragraph
        const paragraphLines: string[] = [line]
        i++

        while (
          i < lines.length &&
          lines[i].trim() !== '' &&
          !lines[i].startsWith('#') &&
          !lines[i].startsWith('- ') &&
          !lines[i].startsWith('* ') &&
          !lines[i].match(/^\d+\./) &&
          !lines[i].startsWith('```') &&
          !lines[i].startsWith('> ') &&
          lines[i].trim() !== '---'
        ) {
          paragraphLines.push(lines[i])
          i++
        }
        i-- // Back up one since we'll increment at the end of the loop

        const paragraphText = paragraphLines.join(' ')

        elements.push(
          <p key={i} className='my-4 text-black leading-relaxed'>
            <ProcessedText>{paragraphText}</ProcessedText>
          </p>
        )
      }

      i++
    }

    return elements
  }

  return (
    <div className={`markdown-content ${className}`}>
      {processMarkdown(content)}
    </div>
  )
}
