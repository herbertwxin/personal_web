import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Play } from 'lucide-react'
import { useState, useEffect } from 'react'
import { stackModels, type StackModel } from '../lib/stackModels'

interface StackPageProps {
  onViewModel: (modelId: number) => void
}

export function StackPage({ onViewModel }: StackPageProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All Models')
  const [filteredModels, setFilteredModels] = useState<StackModel[]>(stackModels)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

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
        return 'text-green-700'
      case 'Intermediate':
        return 'text-yellow-700'
      case 'Advanced':
        return 'text-red-700'
      default:
        return 'text-[#5a4fcf]'
    }
  }

  const filterOptions = ['All Models', 'Growth Theory', 'New Keynesian', 'Monetary', 'Advanced Models']

  return (
    <motion.div
      className='min-h-screen pb-12 px-6'
      initial={hasAnimated ? false : { opacity: 0, y: 10 }}
      animate={hasAnimated ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: hasAnimated ? 'auto' : 'transform, opacity' }}
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={hasAnimated ? false : { opacity: 0, y: 20 }}
          animate={hasAnimated ? false : { opacity: 1, y: 0 }}
          transition={{
            duration: hasAnimated ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='mb-12'
        >
          <h1 className='text-3xl font-normal text-black mb-4'>
            Mathematical Macroeconomics Stack
          </h1>
          <p className='text-lg text-gray-700 mb-6 max-w-4xl'>
            A comprehensive collection of mathematical notes and derivations covering fundamental and advanced topics in macroeconomic theory.
          </p>
        </motion.div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className='flex flex-wrap gap-2 justify-start mb-8'
        >
          <span className='text-sm text-black mr-4 self-center'>Filter:</span>
          {filterOptions.map(option => (
            <button
              key={option}
              className={`text-sm px-3 py-1 rounded transition-colors ${selectedFilter === option
                ? 'bg-gray-100 text-black'
                : 'text-gray-600 hover:text-black'
                }`}
              onClick={() => setSelectedFilter(option)}
            >
              {option}
            </button>
          ))}
        </motion.div>

        {/* Models Reference List */}
        <motion.div
          className='space-y-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {filteredModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.3 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='group border-b border-gray-200 pb-6 last:border-b-0'
            >
              <div className='flex gap-4'>
                {/* Academic numbering */}
                <div className='flex-shrink-0 w-8 text-right'>
                  <span className='text-sm font-medium text-gray-600'>
                    [{index + 1}]
                  </span>
                </div>

                {/* Content */}
                <div className='flex-1'>
                  {/* Title and metadata row */}
                  <div className='flex items-start justify-between mb-2'>
                    <h3
                      className='text-lg font-medium text-black group-hover:text-[#B19EEF] transition-colors cursor-pointer'
                      onClick={() => onViewModel(model.id)}
                    >
                      {model.title}
                    </h3>
                    <div className='flex items-center gap-4 text-sm text-gray-600 ml-4'>
                      <span className={`font-medium ${getDifficultyColor(model.difficulty)}`}>
                        {model.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-sm text-gray-700 leading-relaxed mb-3'>
                    {model.description}
                  </p>

                  {/* Tabular metadata */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm'>
                    <div>
                      <span className='font-medium text-gray-600'>Topics:</span>{' '}
                      <span className='text-gray-700'>
                        {model.topics.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium text-gray-600'>Last Updated:</span>{' '}
                      <span className='text-gray-700'>{model.lastUpdated}</span>
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
                      className='text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800'
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
            </motion.div>
          ))}
        </motion.div>


      </div>
    </motion.div>
  )
}
