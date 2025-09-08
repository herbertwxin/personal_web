import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Play } from 'lucide-react'
import { useState, useEffect } from 'react'

interface StackModel {
  id: number
  title: string
  description: string
  difficulty: string
  topics: string[]
  pdfPath: string
  lastUpdated: string
}

interface StackPageProps {
  onViewModel: (modelId: number) => void
}

export function StackPage({ onViewModel }: StackPageProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All Models')
  const [filteredModels, setFilteredModels] = useState<StackModel[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const models = [
    {
      id: 0,
      title: 'Complete Markets',
      description: 'Comprehensive analysis of complete markets with social planner solutions, competitive equilibrium, and Arrow-Debreu market structures.',
      difficulty: 'Advanced',
      topics: ['Complete Markets', 'Arrow-Debreu', 'General Equilibrium'],
      pdfPath: 'downloadable/stack/Complete_markets.pdf',
      latexFile: 'Complete_markets.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 1,
      title: 'Differential Equations in Economics',
      description: 'Mathematical foundations of differential equations applied to economic modeling and dynamic systems.',
      difficulty: 'Intermediate',
      topics: ['Differential Equations', 'Dynamic Systems', 'Mathematical Methods'],
      pdfPath: 'downloadable/stack/Differential.pdf',
      latexFile: 'Differential.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 2,
      title: 'Endogenous Growth Theory',
      description: 'Advanced treatment of endogenous growth models with human capital, R&D, and technological progress.',
      difficulty: 'Advanced',
      topics: ['Endogenous Growth', 'Human Capital', 'Innovation'],
      pdfPath: 'downloadable/stack/End_Growth.pdf',
      latexFile: 'End_Growth.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 3,
      title: 'Monetary Economics',
      description: 'Theoretical foundations of monetary economics including money demand, inflation, and monetary policy transmission.',
      difficulty: 'Intermediate',
      topics: ['Monetary Theory', 'Inflation', 'Central Banking'],
      pdfPath: 'downloadable/stack/Monetary.pdf',
      latexFile: 'Monetary.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 4,
      title: 'Neoclassical Growth Model',
      description: 'Classical treatment of the Solow-Swan growth model with extensions and empirical applications.',
      difficulty: 'Beginner',
      topics: ['Solow Model', 'Growth Theory', 'Capital Accumulation'],
      pdfPath: 'downloadable/stack/Neo_classical.pdf',
      latexFile: 'Neo_classical.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 5,
      title: 'New Keynesian Model',
      description: 'Modern New Keynesian framework with price rigidities, monopolistic competition, and monetary policy analysis.',
      difficulty: 'Advanced',
      topics: ['New Keynesian', 'Price Rigidity', 'Monetary Policy'],
      pdfPath: 'downloadable/stack/NK.pdf',
      latexFile: 'NK.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 6,
      title: 'Overlapping Generations Model',
      description: 'Dynamic general equilibrium model with overlapping generations, lifecycle behavior, and intergenerational transfers.',
      difficulty: 'Advanced',
      topics: ['OLG Model', 'Lifecycle', 'Intergenerational'],
      pdfPath: 'downloadable/stack/OLG.pdf',
      latexFile: 'OLG.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 7,
      title: 'Ramsey Growth Model',
      description: 'Optimal growth theory with intertemporal choice, dynamic optimization, and welfare analysis.',
      difficulty: 'Intermediate',
      topics: ['Ramsey Model', 'Optimal Growth', 'Dynamic Optimization'],
      pdfPath: 'downloadable/stack/Ramsey.pdf',
      latexFile: 'Ramsey.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 8,
      title: 'Real Business Cycle Model',
      description: 'Classical RBC framework with technology shocks, calibration methods, and business cycle analysis.',
      difficulty: 'Intermediate',
      topics: ['RBC Model', 'Technology Shocks', 'Business Cycles'],
      pdfPath: 'downloadable/stack/RBC.pdf',
      latexFile: 'RBC.tex',
      lastUpdated: 'Dec 2024',
    },
    {
      id: 9,
      title: 'Solow Growth Model',
      description: 'Fundamental growth model covering Kaldor facts, steady state analysis, and transitional dynamics.',
      difficulty: 'Beginner',
      topics: ['Solow Model', 'Growth Theory', 'Steady State'],
      pdfPath: 'downloadable/stack/Solow.pdf',
      latexFile: 'Solow.tex',
      lastUpdated: 'Dec 2024',
    },
  ]

  // Filter models based on selected filter
  useEffect(() => {
    let filtered = models

    if (selectedFilter === 'Growth Theory') {
      filtered = models.filter(
        model =>
          model.topics.some(topic => topic.includes('Growth')) ||
          model.title.toLowerCase().includes('growth') ||
          model.title.toLowerCase().includes('solow') ||
          model.title.toLowerCase().includes('ramsey')
      )
    } else if (selectedFilter === 'New Keynesian') {
      filtered = models.filter(
        model =>
          model.topics.some(topic => topic.includes('Keynesian')) ||
          model.title.toLowerCase().includes('keynesian')
      )
    } else if (selectedFilter === 'Monetary') {
      filtered = models.filter(
        model =>
          model.topics.some(topic => topic.includes('Monetary')) ||
          model.title.toLowerCase().includes('monetary')
      )
    } else if (selectedFilter === 'Advanced Models') {
      filtered = models.filter(
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
      <div className='max-w-6xl mx-auto'>
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
                      className='text-lg font-medium text-black group-hover:text-[#6A5ACD] transition-colors cursor-pointer'
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
                      className='text-[#6A5ACD] border-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white'
                      onClick={() => onViewModel(model.id)}
                    >
                      <Play className='w-3 h-3 mr-1' />
                      View Online
                    </Button>
                    <Button
                      size='sm'
                      variant='ghost'
                      className='text-gray-600 hover:text-gray-800'
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
