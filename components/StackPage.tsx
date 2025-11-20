import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Play } from 'lucide-react'
import { useState, useEffect } from 'react'
import { stackModels, type StackModel } from '../lib/stackModels'

interface StackPageProps {
  onViewModel: (modelId: number) => void
}

export function StackPage({ onViewModel }: StackPageProps) {
  const [selectedFilter, setSelectedFilter] = useState('All Models')
  const [filteredModels, setFilteredModels] = useState<StackModel[]>(stackModels)

  // Filter models based on selected filter
  useEffect(() => {
    let filtered = stackModels

    if (selectedFilter === 'Growth Theory') {
      filtered = stackModels.filter(
        model =>
          model.topics.some(topic => topic.includes('Growth')) ||
          model.title.toLowerCase().includes('growth') ||
          model.title.toLowerCase().includes('solow') ||
          model.title.toLowerCase().includes('ramsey')
      )
    } else if (selectedFilter === 'New Keynesian') {
      filtered = stackModels.filter(
        model =>
          model.topics.some(topic => topic.includes('Keynesian')) ||
          model.title.toLowerCase().includes('keynesian')
      )
    } else if (selectedFilter === 'Monetary') {
      filtered = stackModels.filter(
        model =>
          model.topics.some(topic => topic.includes('Monetary')) ||
          model.title.toLowerCase().includes('monetary')
      )
    } else if (selectedFilter === 'Advanced Models') {
      filtered = stackModels.filter(
        model =>
          model.difficulty === 'Advanced'
      )
    }

    setFilteredModels(filtered)
  }, [selectedFilter])

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

  const filterOptions = ['All Models', 'Growth Theory', 'New Keynesian', 'Monetary', 'Advanced Models']

  return (
    <motion.div
      className='min-h-screen pb-12 px-6'
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-5xl font-bold text-white tracking-tighter mb-4'>
            Mathematical Macroeconomics Stack
          </h1>
          <p className='text-lg text-white/70 max-w-4xl'>
            A comprehensive collection of mathematical notes and derivations covering fundamental and advanced topics in macroeconomic theory.
          </p>
        </div>

        {/* Filter Options */}
        <div className='flex flex-wrap gap-2 justify-start mb-8'>
          <span className='text-sm text-white/90 mr-4 self-center'>Filter:</span>
          {filterOptions.map(option => (
            <button
              key={option}
              className={`text-sm px-3 py-1 rounded transition-colors ${selectedFilter === option
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              onClick={() => setSelectedFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Models Reference List */}
        <div className='space-y-6'>
          {filteredModels.map((model, index) => (
            <div
              key={index}
              className='group border-b border-white/10 pb-6 last:border-b-0'
            >
              <div className='flex gap-4'>
                {/* Academic numbering */}
                <div className='flex-shrink-0 w-8 text-right'>
                  <span className='text-sm font-medium text-white/50'>
                    [{index + 1}]
                  </span>
                </div>

                {/* Content */}
                <div className='flex-1'>
                  {/* Title and metadata row */}
                  <div className='flex items-start justify-between mb-2'>
                    <h3
                      className='text-lg font-medium text-white group-hover:text-[#B19EEF] transition-colors cursor-pointer'
                      onClick={() => onViewModel(model.id)}
                    >
                      {model.title}
                    </h3>
                    <div className='flex items-center gap-4 text-sm text-white/70 ml-4'>
                      <span className={`font-medium ${getDifficultyColor(model.difficulty)}`}>
                        {model.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-sm text-white/70 leading-relaxed mb-3'>
                    {model.description}
                  </p>

                  {/* Tabular metadata */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm'>
                    <div>
                      <span className='font-medium text-white/50'>Topics:</span>{' '}
                      <span className='text-white/70'>
                        {model.topics.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium text-white/50'>Last Updated:</span>{' '}
                      <span className='text-white/70'>{model.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className='flex justify-end gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-[#B19EEF] border-[#B19EEF] hover:bg-[#B19EEF] hover:text-white'
                      onClick={() => onViewModel(model.id)}
                    >
                      <Play className='w-3 h-3 mr-1' />
                      View Online
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-white/70 border-white/20 hover:bg-white/10 hover:text-white'
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = model.pdfPath;
                        link.download = model.pdfPath.split('/').pop() || 'document.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </motion.div>
  )
}
