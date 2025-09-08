import { motion, useScroll, useTransform } from 'framer-motion'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { BookOpen, Download, Video, FileText } from 'lucide-react'
import { useRef, useState, useCallback, useEffect } from 'react'

interface Course {
  code: string
  title: string
  level: string
  semester: string
  description: string
  materials: {
    type: string
    count: number
    icon: React.ComponentType
  }[]
  topics: string[]
}

interface Resource {
  title: string
  description: string
  type: string
  items: number
  level: string
  lastUpdated: string
}

interface DialogState {
  isOpen: boolean
  dialogId: string
  content: Course | Resource | null
  triggerElement: HTMLElement | null
}

export function TeachingPage() {
  const containerRef = useRef(null)
  
  // Enhanced dialog state management
  const [dialogStates, setDialogStates] = useState<Map<string, DialogState>>(new Map())
  const dialogTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map())
  
  // Track active dialogs for proper cleanup
  const activeDialogs = useRef<Set<string>>(new Set())

  // Enhanced dialog management functions
  const openDialog = useCallback((dialogId: string, content: Course | Resource, triggerElement: HTMLElement | null) => {
    // Clear any existing timeout for this dialog
    const existingTimeout = dialogTimeouts.current.get(dialogId)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
      dialogTimeouts.current.delete(dialogId)
    }

    // Update dialog state
    setDialogStates(prev => {
      const newStates = new Map(prev)
      newStates.set(dialogId, {
        isOpen: true,
        dialogId,
        content,
        triggerElement
      })
      return newStates
    })

    // Track active dialog
    activeDialogs.current.add(dialogId)
  }, [])

  const closeDialog = useCallback((dialogId: string) => {
    const dialogState = dialogStates.get(dialogId)
    
    // Return focus to trigger element if available
    if (dialogState?.triggerElement) {
      // Use a timeout to ensure the dialog has fully closed before focusing
      const timeout = setTimeout(() => {
        try {
          dialogState.triggerElement?.focus()
        } catch (error) {
          // Silently handle focus errors (element might be unmounted)
          console.debug('Focus restoration failed for dialog:', dialogId, error)
        }
        dialogTimeouts.current.delete(dialogId)
      }, 100)
      
      dialogTimeouts.current.set(dialogId, timeout)
    }

    // Update dialog state
    setDialogStates(prev => {
      const newStates = new Map(prev)
      newStates.set(dialogId, {
        ...dialogState,
        isOpen: false,
        content: null
      } as DialogState)
      return newStates
    })

    // Remove from active dialogs
    activeDialogs.current.delete(dialogId)
  }, [dialogStates])

  const getDialogState = useCallback((dialogId: string): DialogState => {
    return dialogStates.get(dialogId) || {
      isOpen: false,
      dialogId,
      content: null,
      triggerElement: null
    }
  }, [dialogStates])

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      // Clear all timeouts on unmount
      dialogTimeouts.current.forEach(timeout => clearTimeout(timeout))
      dialogTimeouts.current.clear()
      
      // Clear active dialogs tracking
      activeDialogs.current.clear()
      
      // Clear dialog states
      setDialogStates(new Map())
    }
  }, [])

  // Handle dialog state changes and cleanup
  useEffect(() => {
    // Clean up closed dialogs after a delay to prevent memory leaks
    const cleanupTimeout = setTimeout(() => {
      setDialogStates(prev => {
        const newStates = new Map()
        prev.forEach((state, id) => {
          // Keep only open dialogs or recently closed ones
          if (state.isOpen || activeDialogs.current.has(id)) {
            newStates.set(id, state)
          }
        })
        return newStates
      })
    }, 5000) // Clean up after 5 seconds

    return () => clearTimeout(cleanupTimeout)
  }, [dialogStates])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -20])

  const courses = [
    {
      code: 'ECON 8301',
      title: 'Advanced Macroeconomic Theory I',
      level: 'Graduate',
      semester: 'Fall 2024',
      description:
        'First-year PhD course covering dynamic optimization, growth theory, and real business cycle models.',
      materials: [
        { type: 'Lecture Notes', count: 12, icon: FileText },
        { type: 'Problem Sets', count: 8, icon: FileText },
        { type: 'Video Lectures', count: 24, icon: Video },
        { type: 'Matlab Code', count: 15, icon: FileText },
      ],
      topics: [
        'Dynamic Programming',
        'Growth Models',
        'RBC Theory',
        'Calibration',
      ],
    },
    {
      code: 'ECON 8302',
      title: 'Advanced Macroeconomic Theory II',
      level: 'Graduate',
      semester: 'Spring 2024',
      description:
        'Second-year PhD course on New Keynesian models, monetary policy, and business cycles.',
      materials: [
        { type: 'Lecture Notes', count: 14, icon: FileText },
        { type: 'Problem Sets', count: 6, icon: FileText },
        { type: 'Video Lectures', count: 28, icon: Video },
        { type: 'Dynare Code', count: 10, icon: FileText },
      ],
      topics: [
        'New Keynesian Models',
        'Monetary Policy',
        'DSGE Methods',
        'Bayesian Estimation',
      ],
    },
    {
      code: 'ECON 4050',
      title: 'Intermediate Macroeconomics',
      level: 'Undergraduate',
      semester: 'Fall 2024',
      description:
        'Upper-level undergraduate course on macroeconomic theory and policy applications.',
      materials: [
        { type: 'Lecture Slides', count: 20, icon: FileText },
        { type: 'Problem Sets', count: 5, icon: FileText },
        { type: 'Exams', count: 3, icon: FileText },
        { type: 'Review Sessions', count: 10, icon: Video },
      ],
      topics: [
        'IS-LM Model',
        'AD-AS Framework',
        'Fiscal Policy',
        'Monetary Policy',
      ],
    },
    {
      code: 'ECON 7100',
      title: 'Mathematical Methods for Economists',
      level: 'Graduate',
      semester: 'Summer 2024',
      description:
        'Intensive course on mathematical techniques essential for graduate economic analysis.',
      materials: [
        { type: 'Lecture Notes', count: 16, icon: FileText },
        { type: 'Problem Sets', count: 12, icon: FileText },
        { type: 'Software Tutorials', count: 8, icon: Video },
        { type: 'Reference Materials', count: 25, icon: FileText },
      ],
      topics: [
        'Linear Algebra',
        'Real Analysis',
        'Optimization',
        'Dynamic Systems',
      ],
    },
  ]

  const resources = [
    {
      title: 'DSGE Modeling Tutorial Series',
      description:
        'Comprehensive video series on building and estimating DSGE models',
      type: 'Video Series',
      items: 15,
      level: 'Advanced',
      lastUpdated: '2024-01-15',
    },
    {
      title: 'Macroeconomics Problem Bank',
      description:
        'Collection of solved problems covering all major macroeconomic topics',
      type: 'Problem Sets',
      items: 120,
      level: 'All Levels',
      lastUpdated: '2023-12-20',
    },
    {
      title: 'MATLAB for Economists',
      description:
        'Complete guide to using MATLAB for economic research and analysis',
      type: 'Code Repository',
      items: 45,
      level: 'Intermediate',
      lastUpdated: '2024-01-10',
    },
    {
      title: 'Economic Data Analysis Workshop',
      description:
        'Workshop materials on working with macroeconomic time series data',
      type: 'Workshop',
      items: 8,
      level: 'Intermediate',
      lastUpdated: '2023-11-30',
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Undergraduate':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'Graduate':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'Advanced':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'All Levels':
        return 'bg-[#e9e5ff] text-[#5a4fcf] border-[#b8a9ff]'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className='min-h-screen pb-12 px-6'
      style={{ y }}
    >
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl text-black mb-4'>Teaching Materials</h1>
          <p className='text-xl text-black mb-6 max-w-3xl mx-auto'>
            Educational resources, course materials, and tutorials for students
            and researchers in macroeconomics and mathematical economics.
          </p>
        </div>

        {/* Current Courses */}
        <div className='mb-16'>
          <h2 className='text-3xl text-black mb-8 border-b border-[#d6ceff] pb-4'>
            Current Courses
          </h2>
          <div className='space-y-6'>
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className='border-b border-gray-200 pb-6 last:border-b-0'
              >
                {/* Course Header with Tabular Information */}
                <div className='mb-4'>
                  <div className='flex items-start justify-between mb-2'>
                    <div className='flex-1'>
                      <h3 className='text-xl font-medium text-black mb-1'>
                        {course.code}: {course.title}
                      </h3>
                      <div className='text-sm text-gray-600 mb-2'>
                        {course.description}
                      </div>
                    </div>
                    <div className='ml-6 text-right'>
                      <Dialog 
                        open={getDialogState(`course-${index}`).isOpen}
                        onOpenChange={(open) => {
                          if (!open) {
                            closeDialog(`course-${index}`)
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size='sm'
                            variant='outline'
                            className='border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#f3f1ff]'
                            onClick={(e) => {
                              openDialog(`course-${index}`, course, e.currentTarget)
                            }}
                          >
                            View Materials
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
                          <DialogHeader>
                            <DialogTitle className='text-2xl text-black mb-2'>
                              {course.title} - Course Materials
                            </DialogTitle>
                            <DialogDescription>
                              Access all course materials, assignments, and
                              resources for this {course.level.toLowerCase()} level
                              course.
                            </DialogDescription>
                            <Badge
                              className={`w-fit ${getLevelColor(course.level)}`}
                            >
                              {course.level}
                            </Badge>
                          </DialogHeader>
                          <div className='mt-6'>
                            <div className='mb-6'>
                              <p className='text-black mb-4'>
                                {course.description}
                              </p>
                              <div className='flex items-center space-x-4 text-sm text-black'>
                                <span>
                                  <strong>Course Code:</strong> {course.code}
                                </span>
                                <span>
                                  <strong>Semester:</strong> {course.semester}
                                </span>
                              </div>
                            </div>

                            <div className='mb-6'>
                              <h4 className='text-lg text-black mb-3'>
                                Available Materials
                              </h4>
                              <div className='space-y-2'>
                                {course.materials.map((material, matIndex) => (
                                  <div
                                    key={matIndex}
                                    className='flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded'
                                  >
                                    <div className='flex items-center space-x-3'>
                                      <material.icon className='w-4 h-4 text-[#6A5ACD]' />
                                      <span className='text-black text-sm'>
                                        {material.type} ({material.count} items)
                                      </span>
                                    </div>
                                    <Button
                                      size='sm'
                                      variant='outline'
                                      className='border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#e9e5ff] text-xs'
                                    >
                                      <Download className='w-3 h-3 mr-1' />
                                      Get
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className='text-lg text-black mb-3'>
                                Topics Covered
                              </h4>
                              <div className='text-sm text-gray-600'>
                                {course.topics.join(', ')}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  {/* Tabular Course Information */}
                  <div className='grid grid-cols-3 gap-4 text-sm bg-gray-50 p-3 rounded'>
                    <div>
                      <span className='font-medium text-gray-700'>Level:</span> {course.level}
                    </div>
                    <div>
                      <span className='font-medium text-gray-700'>Semester:</span> {course.semester}
                    </div>
                    <div>
                      <span className='font-medium text-gray-700'>Materials:</span> {course.materials.reduce((sum, m) => sum + m.count, 0)} items
                    </div>
                  </div>
                </div>

                {/* Materials List */}
                <div className='mb-4'>
                  <h4 className='text-sm font-medium text-gray-700 mb-2'>Course Materials:</h4>
                  <ul className='space-y-1 ml-4'>
                    {course.materials.map((material, matIndex) => (
                      <li key={matIndex} className='text-sm text-gray-600 flex items-center'>
                        <span className='w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0'></span>
                        {material.type}: {material.count} items
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Topics */}
                <div>
                  <h4 className='text-sm font-medium text-gray-700 mb-2'>Topics:</h4>
                  <div className='text-sm text-gray-600 ml-4'>
                    {course.topics.join(' • ')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className='mb-16'>
          <h2 className='text-3xl text-black mb-8 border-b border-[#d6ceff] pb-4'>
            Additional Resources
          </h2>
          <div className='space-y-4'>
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className='border-b border-gray-200 pb-4 last:border-b-0'
              >
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h3 className='text-lg font-medium text-black mb-1'>
                      {resource.title}
                    </h3>
                    <p className='text-sm text-gray-600 mb-2'>
                      {resource.description}
                    </p>
                  </div>
                  <div className='ml-6 text-right'>
                    <Dialog
                      open={getDialogState(`resource-${index}`).isOpen}
                      onOpenChange={(open) => {
                        if (!open) {
                          closeDialog(`resource-${index}`)
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          className='border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#f3f1ff]'
                          onClick={(e) => {
                            openDialog(`resource-${index}`, resource, e.currentTarget)
                          }}
                        >
                          Access Resource
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto'>
                        <DialogHeader>
                          <DialogTitle className='text-2xl text-black mb-2'>
                            {resource.title}
                          </DialogTitle>
                          <DialogDescription>
                            Explore this {resource.type.toLowerCase()} designed
                            for {resource.level.toLowerCase()} learners with{' '}
                            {resource.items} available items.
                          </DialogDescription>
                          <div className='flex items-center space-x-2'>
                            <Badge
                              variant='secondary'
                              className='bg-[#e9e5ff] text-[#5a4fcf] border-[#b8a9ff]'
                            >
                              {resource.type}
                            </Badge>
                            <Badge className={getLevelColor(resource.level)}>
                              {resource.level}
                            </Badge>
                          </div>
                        </DialogHeader>
                        <div className='mt-6'>
                          <p className='text-black mb-6'>
                            {resource.description}
                          </p>

                          <div className='mb-6'>
                            <h4 className='text-lg text-black mb-3'>
                              Resource Details
                            </h4>
                            <div className='bg-[#f3f1ff] p-4 rounded border border-[#e9e5ff]'>
                              <div className='grid md:grid-cols-2 gap-4 text-sm text-black'>
                                <div>
                                  <strong>Total Items:</strong> {resource.items}
                                </div>
                                <div>
                                  <strong>Difficulty Level:</strong>{' '}
                                  {resource.level}
                                </div>
                                <div>
                                  <strong>Last Updated:</strong>{' '}
                                  {resource.lastUpdated}
                                </div>
                                <div>
                                  <strong>Format:</strong> {resource.type}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='mb-6'>
                            <h4 className='text-lg text-black mb-3'>
                              Preview Content
                            </h4>
                            <div className='bg-gray-50 p-4 rounded border'>
                              <p className='text-gray-600 text-sm italic'>
                                {resource.type === 'Video Series' &&
                                  'This resource includes comprehensive video tutorials with step-by-step explanations and practical examples.'}
                                {resource.type === 'Problem Sets' &&
                                  'A curated collection of problems with detailed solutions and explanations for self-study.'}
                                {resource.type === 'Code Repository' &&
                                  'Complete code examples with documentation and tutorials for hands-on learning.'}
                                {resource.type === 'Workshop' &&
                                  'Interactive workshop materials including exercises, data, and guided activities.'}
                              </p>
                            </div>
                          </div>

                          <div className='flex space-x-2'>
                            <Button className='bg-[#6A5ACD] hover:bg-[#5a4fcf] text-white flex-1'>
                              <BookOpen className='w-4 h-4 mr-2' />
                              Open Full Resource
                            </Button>
                            <Button
                              variant='outline'
                              className='border-[#b8a9ff] text-[#6A5ACD] hover:bg-[#f3f1ff]'
                            >
                              <Download className='w-4 h-4 mr-2' />
                              Download
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                {/* Inline Metadata */}
                <div className='grid grid-cols-4 gap-4 text-sm bg-gray-50 p-3 rounded'>
                  <div>
                    <span className='font-medium text-gray-700'>Type:</span> {resource.type}
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>Level:</span> {resource.level}
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>Items:</span> {resource.items}
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>Updated:</span> {resource.lastUpdated}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </motion.div>
  )
}
