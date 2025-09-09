import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NewLaTeXRenderer } from './NewLaTeXRenderer'

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

  const models = [
    {
      id: 0,
      title: 'Complete Markets',
      description: 'Comprehensive analysis of complete markets with social planner solutions, competitive equilibrium, and Arrow-Debreu market structures.',
      difficulty: 'Advanced',
      topics: ['Complete Markets', 'Arrow-Debreu', 'General Equilibrium'],
      pdfPath: 'downloadable/stack/Complete_markets.pdf',
      latexFile: 'Complete_markets.tex',
      lastUpdated: 'Dec 2024'
    },    
    {
      id: 1,
      title: 'Differential Equations in Economics',
      description: 'Mathematical foundations of differential equations applied to economic modeling and dynamic systems.',
      difficulty: 'Intermediate',
      topics: ['Differential Equations', 'Dynamic Systems', 'Mathematical Methods'],
      pdfPath: 'downloadable/stack/Differential.pdf',
      latexFile: 'Differential.tex',
      lastUpdated: 'Dec 2024'
    },
    {
      id: 2,
      title: 'Endogenous Growth Theory',
      description: 'Advanced treatment of endogenous growth models with human capital, R&D, and technological progress.',
      difficulty: 'Advanced',
      topics: ['Endogenous Growth', 'Human Capital', 'Innovation'],
      pdfPath: 'downloadable/stack/End_Growth.pdf',
      latexFile: 'End_Growth.tex',
      lastUpdated: 'Dec 2024'
    },
    {
      id: 3,
      title: 'Monetary Economics',
      description: 'Theoretical foundations of monetary economics including money demand, inflation, and monetary policy transmission.',
      difficulty: 'Intermediate',
      topics: ['Monetary Theory', 'Inflation', 'Central Banking'],
      pdfPath: 'downloadable/stack/Monetary.pdf',
      latexFile: 'Monetary.tex',
      lastUpdated: 'Dec 2024'
    },
    {
      id: 4,
      title: 'Neoclassical Growth Model',
      description: 'Classical treatment of the Solow-Swan growth model with extensions and empirical applications.',
      difficulty: 'Beginner',
      topics: ['Solow Model', 'Growth Theory', 'Capital Accumulation'],
      pdfPath: 'downloadable/stack/Neo_classical.pdf',
      latexFile: 'Neo_classical.tex',
      lastUpdated: 'Dec 2024'
    },
    {
      id: 5,
      title: 'New Keynesian Model',
      description: 'Modern New Keynesian framework with price rigidities, monopolistic competition, and monetary policy analysis.',
      difficulty: 'Advanced',
      topics: ['New Keynesian', 'Price Rigidity', 'Monetary Policy'],
      pdfPath: 'downloadable/stack/NK.pdf',
      latexFile: 'NK.tex',
      lastUpdated: 'Dec 2024'
    },
    {
      id: 6,
      title: 'Overlapping Generations Model',
      description: 'Dynamic general equilibrium model with overlapping generations, lifecycle behavior, and intergenerational transfers.',
      difficulty: 'Advanced',
      topics: ['OLG Model', 'Lifecycle', 'Intergenerational'],
      pdfPath: 'downloadable/stack/OLG.pdf',
      latexFile: 'OLG.tex',
      lastUpdated: 'Dec 2024'
    }, 
    {
      id: 7,
      title: 'Ramsey Growth Model',
      description: 'Optimal growth theory with intertemporal choice, dynamic optimization, and welfare analysis.',
      difficulty: 'Intermediate',
      topics: ['Ramsey Model', 'Optimal Growth', 'Dynamic Optimization'],
      pdfPath: 'downloadable/stack/Ramsey.pdf',
      latexFile: 'Ramsey.tex',
      lastUpdated: 'Dec 2024'
    },
    {
      id: 8,
      title: 'Real Business Cycle Model',
      description: 'Classical RBC framework with technology shocks, calibration methods, and business cycle analysis.',
      difficulty: 'Intermediate',
      topics: ['RBC Model', 'Technology Shocks', 'Business Cycles'],
      pdfPath: 'downloadable/stack/RBC.pdf',
      latexFile: 'RBC.tex',
      lastUpdated: 'Dec 2024'
    },   
    {
      id: 9,
      title: 'Solow Growth Model',
      description: 'Fundamental growth model covering Kaldor facts, steady state analysis, and transitional dynamics.',
      difficulty: 'Beginner',
      topics: ['Solow Model', 'Growth Theory', 'Steady State'],
      pdfPath: 'downloadable/stack/Solow.pdf',
      latexFile: 'Solow.tex',
      lastUpdated: 'Dec 2024'
    }
  ]

  const model = models.find(m => m.id === modelId)

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
    <div className='min-h-screen pb-12'>
      <div className='max-w-4xl mx-auto px-6'>
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
          <header className='mb-8'>
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
              className='border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white'
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

        {/* Model Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='max-w-none'
          style={{
            fontSize: 'var(--academic-font-size-body)',
            lineHeight: 'var(--academic-line-height-normal)',
            color: 'var(--academic-text-primary)'
          }}
        >
          <NewLaTeXRenderer 
            filename={model.latexFile}
          />
        </motion.article>
      </div>
    </div>
  )
}