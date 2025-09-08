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
  pages: number
  downloads: number
  lastUpdated: string
  demoContent: {
    equations: string[]
    codeExample: string
    keyFeatures: string[]
  }
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
      title: 'DSGE Model Framework',
      description:
        'A comprehensive Dynamic Stochastic General Equilibrium model for analyzing monetary policy effects in small open economies.',
      difficulty: 'Advanced',
      topics: ['Monetary Policy', 'Open Economy', 'Bayesian Estimation'],
      pages: 45,
      downloads: 234,
      lastUpdated: 'Nov 2024',
      demoContent: {
        equations: [
          'Y(t) = A(t)K(t)^α L(t)^(1-α)',
          'dA/dt = σA dW(t)',
          'C(t) + I(t) = Y(t)',
        ],
        codeExample:
          '// DSGE Model Simulation\nfunction solveDSGE(params) {\n  const {alpha, beta, sigma} = params;\n  // Solve equilibrium conditions...\n  return solution;\n}',
        keyFeatures: [
          'Bayesian Estimation',
          'Impulse Response Functions',
          'Policy Simulation',
        ],
      },
    },
    {
      id: 1,
      title: 'Growth Theory Toolkit',
      description:
        'Mathematical foundations and computational tools for endogenous growth models with human capital accumulation.',
      difficulty: 'Intermediate',
      topics: ['Growth Theory', 'Human Capital', 'Optimization'],
      pages: 38,
      downloads: 178,
      lastUpdated: 'Oct 2024',
      demoContent: {
        equations: [
          'g = sA - δ',
          'A(t+1) = A(t)(1 + g)',
          'h(t+1) = h(t)(1 + φ(u))',
        ],
        codeExample:
          '// Growth Model Implementation\nconst growthModel = {\n  savings_rate: 0.2,\n  depreciation: 0.05,\n  technology_growth: 0.03\n};',
        keyFeatures: [
          'Human Capital Accumulation',
          'Endogenous Growth',
          'Productivity Analysis',
        ],
      },
    },
    {
      id: 2,
      title: 'New Keynesian Basics',
      description:
        'Introduction to New Keynesian macroeconomics with practical examples and step-by-step derivations.',
      difficulty: 'Beginner',
      topics: ['New Keynesian', 'Price Rigidity', 'Welfare Analysis'],
      pages: 52,
      downloads: 412,
      lastUpdated: 'Sep 2024',
      demoContent: {
        equations: [
          'π(t) = βE[π(t+1)] + κx(t)',
          'x(t) = E[x(t+1)] - σ(i(t) - E[π(t+1)])',
          'i(t) = φ_π π(t) + φ_x x(t)',
        ],
        codeExample:
          '// NK Phillips Curve\nfunction phillipsCurve(inflation, output_gap) {\n  return beta * expected_inflation + \n         kappa * output_gap;\n}',
        keyFeatures: ['Price Rigidities', 'Welfare Analysis', 'Policy Rules'],
      },
    },
    {
      id: 3,
      title: 'Real Business Cycles',
      description:
        'Classical RBC models with productivity shocks, including calibration techniques and empirical validation methods.',
      difficulty: 'Intermediate',
      topics: ['RBC', 'Productivity', 'Calibration'],
      pages: 41,
      downloads: 156,
      lastUpdated: 'Aug 2024',
      demoContent: {
        equations: [
          'Z(t+1) = ρZ(t) + ε(t+1)',
          'Y(t) = Z(t)K(t)^α N(t)^(1-α)',
          'K(t+1) = (1-δ)K(t) + I(t)',
        ],
        codeExample:
          '// RBC Model Calibration\nconst params = {\n  alpha: 0.33,\n  beta: 0.99,\n  delta: 0.025,\n  rho: 0.95\n};',
        keyFeatures: [
          'Technology Shocks',
          'Calibration Methods',
          'Business Cycle Analysis',
        ],
      },
    },
    {
      id: 4,
      title: 'Financial Frictions',
      description:
        'Models incorporating banking sector and financial intermediation in macroeconomic analysis.',
      difficulty: 'Advanced',
      topics: ['Financial Frictions', 'Banking', 'Credit'],
      pages: 48,
      downloads: 89,
      lastUpdated: 'Jul 2024',
      demoContent: {
        equations: [
          'Q(t+1) = θ[S(t) - D(t)] + (1-θ)Q(t)',
          'R(t+1) = R* + ω[Q(t) - Q*]',
          'Y(t) = min(K(t), Q(t)L(t))',
        ],
        codeExample:
          '// Financial Accelerator\nfunction creditSpread(net_worth, leverage) {\n  return base_spread + \n         premium * Math.pow(leverage, elasticity);\n}',
        keyFeatures: [
          'Credit Constraints',
          'Financial Accelerator',
          'Banking Sector',
        ],
      },
    },
    {
      id: 5,
      title: 'Labor Market Dynamics',
      description:
        'Search and matching models for understanding unemployment and labor market fluctuations.',
      difficulty: 'Intermediate',
      topics: ['Search Models', 'Unemployment', 'Matching'],
      pages: 35,
      downloads: 203,
      lastUpdated: 'Jun 2024',
      demoContent: {
        equations: [
          'U(t) = M(u(t), v(t))',
          'u̇(t) = s - δu(t) - f(θ(t))u(t)',
          'v̇(t) = λ - f(θ(t))u(t)',
        ],
        codeExample:
          '// Matching Function\nfunction matchingRate(unemployment, vacancies) {\n  const theta = vacancies / unemployment;\n  return A * Math.pow(theta, alpha);\n}',
        keyFeatures: [
          'Search and Matching',
          'Job Creation',
          'Labor Market Frictions',
        ],
      },
    },
  ]

  // Filter models based on selected filter
  useEffect(() => {
    let filtered = models

    if (selectedFilter === 'DSGE') {
      filtered = models.filter(
        model =>
          model.topics.some(topic => topic.includes('DSGE')) ||
          model.title.toLowerCase().includes('dsge')
      )
    } else if (selectedFilter === 'Growth Theory') {
      filtered = models.filter(
        model =>
          model.topics.some(topic => topic.includes('Growth')) ||
          model.title.toLowerCase().includes('growth')
      )
    } else if (selectedFilter === 'New Keynesian') {
      filtered = models.filter(
        model =>
          model.topics.some(topic => topic.includes('Keynesian')) ||
          model.title.toLowerCase().includes('keynesian')
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

  const filterOptions = ['All Models', 'DSGE', 'Growth Theory', 'New Keynesian']

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
            A curated collection of mathematical models, frameworks, and
            computational tools for advanced macroeconomic analysis.
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
              className={`text-sm px-3 py-1 rounded transition-colors ${
                selectedFilter === option
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
                    <h3 className='text-lg font-medium text-black group-hover:text-[#6A5ACD] transition-colors cursor-pointer'>
                      {model.title}
                    </h3>
                    <div className='flex items-center gap-4 text-sm text-gray-600 ml-4'>
                      <span className={`font-medium ${getDifficultyColor(model.difficulty)}`}>
                        {model.difficulty}
                      </span>
                      <span>{model.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-sm text-gray-700 leading-relaxed mb-3'>
                    {model.description}
                  </p>

                  {/* Tabular metadata */}
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm'>
                    <div>
                      <span className='font-medium text-gray-600'>Topics:</span>{' '}
                      <span className='text-gray-700'>
                        {model.topics.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium text-gray-600'>Pages:</span>{' '}
                      <span className='text-gray-700'>{model.pages}</span>
                    </div>
                    <div>
                      <span className='font-medium text-gray-600'>Downloads:</span>{' '}
                      <span className='text-gray-700'>{model.downloads}</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className='flex justify-end'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-[#6A5ACD] border-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white'
                      onClick={() => onViewModel(model.id)}
                    >
                      <Play className='w-3 h-3 mr-1' />
                      View Model
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
