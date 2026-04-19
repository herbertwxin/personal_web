import { useMemo } from 'react'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderContent = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      if (line.startsWith('```')) {
        const language = line.substring(3).trim()
        const codeLines: string[] = []
        i++

        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }
        if (i < lines.length) i++

        let codeContent = codeLines.join('\n')
        if (codeLines.length > 0 && codeLines[0].trim() !== '') {
          const firstLineIndent = codeLines[0].match(/^[\t\s]*/)?.[0] || ''
          if (firstLineIndent && codeLines.every((l: string) => l.startsWith(firstLineIndent) || l.trim() === '')) {
            codeContent = codeLines.map((l: string) => l.substring(firstLineIndent.length)).join('\n')
          }
        }

        let detectedLanguage = language
        if (!detectedLanguage && codeContent.includes('[Desktop Entry]')) {
          detectedLanguage = 'desktop'
        }

        let textColor = 'text-gray-100'
        if (detectedLanguage === 'bash') textColor = 'text-purple-300'
        else if (detectedLanguage === 'desktop') textColor = 'text-blue-300'

        elements.push(
          <div key={`code-${i}`} className='my-4'>
            <div className='bg-[#1e1e1c] rounded-lg overflow-hidden border border-[#30302e]'>
              {(language || detectedLanguage) && (
                <div className='bg-[#141413] px-4 py-2 text-sm text-[#87867f] font-mono border-b border-[#30302e]'>
                  {language || detectedLanguage}
                </div>
              )}
              <pre className='p-4 overflow-x-auto'>
                <code className={`text-sm font-mono ${textColor}`}>{codeContent}</code>
              </pre>
            </div>
          </div>
        )
        continue
      }

      let processedLine = line.replace(
        /`([^`]+)`/g,
        '<code class="bg-bd-subtle px-1 py-0.5 rounded text-sm font-mono text-tx-primary">$1</code>'
      )
      processedLine = processedLine.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-ac-brand hover:text-ac-hover underline">$1</a>'
      )
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className='border-l-4 border-ac-brand pl-4 py-2 my-4 bg-sf-hover text-tx-secondary italic rounded-r-md'>
            <div dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />
          </blockquote>
        )
        i++
        continue
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className='font-serif text-3xl font-medium mt-8 mb-4 text-tx-primary'>
            <div dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className='font-serif text-2xl font-medium mt-6 mb-3 text-tx-primary'>
            <div dangerouslySetInnerHTML={{ __html: processedLine.substring(3) }} />
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className='font-serif text-xl font-medium mt-4 mb-2 text-tx-primary'>
            <div dangerouslySetInnerHTML={{ __html: processedLine.substring(4) }} />
          </h3>
        )
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={i} className='text-lg font-medium mt-3 mb-2 text-tx-primary'>
            <div dangerouslySetInnerHTML={{ __html: processedLine.substring(5) }} />
          </h4>
        )
      } else if (line.trim() === '') {
        elements.push(<br key={i} />)
      } else if (line.trim().startsWith('- ')) {
        const listText = processedLine.substring(processedLine.indexOf('- ') + 2)
        elements.push(
          <li key={i} className='ml-4 mb-1 text-tx-secondary list-disc'>
            <div dangerouslySetInnerHTML={{ __html: listText }} />
          </li>
        )
      } else if (/^\d+\./.test(line.trim())) {
        const listText = processedLine.substring(processedLine.indexOf('.') + 1).trim()
        elements.push(
          <li key={i} className='ml-4 mb-1 text-tx-secondary list-decimal'>
            <div dangerouslySetInnerHTML={{ __html: listText }} />
          </li>
        )
      } else {
        elements.push(
          <p key={i} className='mb-3 text-tx-secondary leading-relaxed' dangerouslySetInnerHTML={{ __html: processedLine }} />
        )
      }

      i++
    }

    return elements
  }

  const renderedContent = useMemo(() => renderContent(content), [content])

  return (
    <div className='prose prose-lg max-w-none'>
      {renderedContent}
    </div>
  )
}
