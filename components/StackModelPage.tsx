import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NewLaTeXRenderer } from './NewLaTeXRenderer'
import { TableOfContents } from './TableOfContents'
import { stackModels } from '../lib/stackModels'

interface StackModelPageProps {
  modelId: number | null
  onBack: () => void
}

export function StackModelPage({ modelId, onBack }: StackModelPageProps) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])



  const model = stackModels.find(m => m.id === modelId)

  if (!model) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Model not found</h1>
          <Button onClick={onBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Stack
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='py-8'
        >
          <Button
            variant='ghost'
            onClick={onBack}
            className='mb-8 text-black hover:bg-gray-100'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Stack
          </Button>

          {/* Model Header */}
          <header className='mb-8 page-header'>
            <h1
              className='text-black mb-4'
              style={{
                fontSize: 'var(--academic-font-size-page-title)',
                fontWeight: 'var(--academic-font-weight-page-title)',
                lineHeight: 'var(--academic-line-height-tight)'
              }}
            >
              {model.title}
            </h1>

            <p className='text-gray-700 mb-6 text-lg leading-relaxed'>
              {model.description}
            </p>

            {/* Metadata */}
            <div className='flex flex-wrap items-center gap-6 mb-6'>
              <div className='flex items-center gap-2 text-gray-600'>
                <span style={{ fontSize: 'var(--academic-font-size-metadata)' }}>
                  Difficulty: <span className={`font-medium ${
                    model.difficulty === 'Beginner' ? 'text-green-700' :
                    model.difficulty === 'Intermediate' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>{model.difficulty}</span>
                </span>
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <span style={{ fontSize: 'var(--academic-font-size-metadata)' }}>
                  Topics: {model.topics.join(', ')}
                </span>
              </div>
            </div>

            {/* Download Button */}
            <Button
              variant='outline'
              className='border-[#B19EEF] text-[#B19EEF] hover:bg-[#B19EEF] hover:text-white'
              onClick={() => {
                const link = document.createElement('a');
                link.href = model.pdfPath;
                link.download = model.pdfPath.split('/').pop() || 'document.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className='w-4 h-4 mr-2' />
              Download PDF
            </Button>
          </header>
        </motion.div>

        {/* Content with TOC Layout */}
        <div className='flex gap-8 relative'>
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex-1 max-w-none min-w-0'
            style={{
              fontSize: 'var(--academic-font-size-body)',
              lineHeight: 'var(--academic-line-height-normal)',
              color: 'var(--academic-text-primary)'
            }}
            data-toc-root
          >
            <NewLaTeXRenderer
              filename={model.latexFile}
            />
          </motion.article>

          {/* Table of Contents Sidebar - Sticky */}
          <div className='hidden lg:block w-64 flex-shrink-0'>
            <div className='sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto'>
              <TableOfContents className='w-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
