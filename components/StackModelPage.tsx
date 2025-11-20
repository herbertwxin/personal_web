import { Button } from './ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import { NewLaTeXRenderer } from './NewLaTeXRenderer'
import { TableOfContents } from './TableOfContents'
import { stackModels } from '../lib/stackModels'

interface StackModelPageProps {
  modelId: number | null
  onBack: () => void
}

export function StackModelPage({ modelId, onBack }: StackModelPageProps) {
  const model = stackModels.find(m => m.id === modelId)

  if (!model) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-white mb-4'>Model not found</h1>
          <Button onClick={onBack} variant="outline" className="text-white/80 border-white/20 hover:bg-white/10 hover:text-white">
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Stack
          </Button>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400'
      case 'Intermediate':
        return 'text-yellow-400'
      case 'Advanced':
        return 'text-red-400'
      default:
        return 'text-blue-400'
    }
  }

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='py-8'>
          <Button
            variant='ghost'
            onClick={onBack}
            className='mb-8 text-white/70 hover:bg-white/10 hover:text-white'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Stack
          </Button>

          {/* Model Header */}
          <header className='mb-8 page-header'>
            <h1 className='text-5xl font-bold text-white tracking-tighter mb-4'>
              {model.title}
            </h1>

            <p className='text-lg text-white/70 mb-6 leading-relaxed'>
              {model.description}
            </p>

            {/* Metadata */}
            <div className='flex flex-wrap items-center gap-6 mb-6'>
              <div className='flex items-center gap-2 text-white/70'>
                <span>
                  Difficulty: <span className={`font-medium ${getDifficultyColor(model.difficulty)}`}>{model.difficulty}</span>
                </span>
              </div>
              <div className='flex items-center gap-2 text-white/70'>
                <span>
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
        </div>

        {/* Content with TOC Layout */}
        <div className='flex gap-8 relative'>
          {/* Main Content */}
          <article
            className='flex-1 max-w-none min-w-0 text-white/90'
            data-toc-root
          >
            <NewLaTeXRenderer
              filename={model.latexFile}
            />
          </article>

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
