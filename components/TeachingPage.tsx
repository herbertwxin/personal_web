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

export function TeachingPage() {
  const courses = [
    {
      code: 'EC 201',
      title: 'Principles of Microeconomics',
      level: 'Undergraduate',
      semester: 'Spring 2025',
      description:
        'Examines how consumers and firms make choices when facing scarce resources, and how those choices are related to government policy and market outcomes, such as prices and output.',
      materials: [
        { type: 'Course Materials', count: 0, icon: FileText },
      ],
      topics: [
        'Not available',
      ],
      status: 'Not available in Course Materials'
    },
    {
      code: 'EC201',
      title: 'Principles of Microeconomics',
      level: 'Undergraduate',
      semester: 'Winter 2024',
      description:
        'Examines how consumers and firms make choices when facing scarce resources, and how those choices are related to government policy and market outcomes, such as prices and output.',
      materials: [
        { type: 'Weekly Materials', count: 9, icon: FileText },
        { type: 'PDF Lectures', count: 3, icon: FileText },
        { type: 'Pages Documents', count: 6, icon: FileText },
      ],
      topics: [
        'Consumer Choice Theory',
        'Producer Theory',
        'Market Structures',
        'Government Policy',
        'Market Outcomes',
        'Price Theory',
      ],
      status: 'Available',
      folderPath: 'EC201_Winter_2024'
    },
    {
      code: 'EC101',
      title: 'Contemporary Economic Issues',
      level: 'Undergraduate',
      semester: 'Fall 2024',
      description:
        'Examines contemporary public policy using economic principles. Topics may include balanced budgets and tax reform, unemployment, health care, poverty and income redistribution, environmental policy, and international trade policy.',
      materials: [
        { type: 'Course Materials', count: 0, icon: FileText },
      ],
      topics: [
        'Not available',
      ],
      status: 'Not available in Course Materials'
    },
    {
      code: 'ECON1002',
      title: 'Introductory Macroeconomics',
      level: 'Undergraduate',
      semester: 'Semester 1, 2024',
      description:
        'Addresses the analysis of the level of employment and economic activity in the economy as a whole. The unit examines the main factors that determine the overall levels of production and employment in the economy, including the influence of government policy and international trade. This analysis enables an exploration of money, interest rates and financial markets, and a deeper examination of inflation, unemployment and economic policy. Prior knowledge of algebraic equations and differential calculus is assumed.',
      materials: [
        { type: 'Tutorial Materials', count: 12, icon: FileText },
        { type: 'Weekly Presentations', count: 11, icon: FileText },
        { type: 'Economic Figures', count: 85, icon: FileText },
        { type: 'Interactive Presentations', count: 2, icon: Video },
        { type: 'Answer Keys', count: 4, icon: FileText },
      ],
      topics: [
        'Employment and Economic Activity',
        'Production and Employment Levels',
        'Government Policy',
        'International Trade',
        'Money and Interest Rates',
        'Financial Markets',
        'Inflation and Unemployment',
        'Economic Policy Analysis',
      ],
      status: 'Available',
      folderPath: 'ECON1002_S1_2024'
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
        return 'bg-green-500/20 text-green-300 border-green-300/40'
      case 'Graduate':
        return 'bg-sky-500/20 text-sky-300 border-sky-300/40'
      case 'Advanced':
        return 'bg-rose-500/20 text-rose-300 border-rose-300/40'
      case 'All Levels':
        return 'bg-blue-500/20 text-blue-300 border-blue-300/40'
      case 'Intermediate':
        return 'bg-amber-500/25 text-amber-300 border-amber-300/40'
      default:
        return 'bg-white/10 text-white border-white/30'
    }
  }

  const handleDownload = (folderPath: string) => {
    // Create a zip download link for the entire course folder
    const downloadUrl = `/downloadable/teach/${folderPath}`
    window.open(downloadUrl, '_blank')
  }

  return (
    <div className='min-h-screen pb-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-white tracking-tighter mb-4'>Teaching Materials</h1>
          <p className='text-lg text-white/70 mb-6 max-w-3xl mx-auto'>
            Educational resources, course materials, and tutorials for students.
          </p>
        </div>

        {/* Current Courses */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4'>
            Current Courses
          </h2>
          <div className='space-y-6'>
            {courses.map((course, index) => (
              <div
                key={index}
                className='border-b border-white/10 pb-6 last:border-b-0'
              >
                {/* Course Header with Tabular Information */}
                <div className='mb-4'>
                  <div className='flex items-start justify-between mb-2'>
                    <div className='flex-1'>
                      <h3 className='text-xl font-medium text-white/90 mb-1'>
                        {course.code}: {course.title}
                      </h3>
                      <div className='text-sm text-white/70 mb-2'>
                        {course.description}
                      </div>
                      {course.status === 'Not available in Course Materials' && (
                        <div className='text-sm text-red-400 font-medium mb-2'>
                          Not available in Course Materials
                        </div>
                      )}
                    </div>
                    <div className='ml-6 text-right'>
                      {course.status === 'Available' ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size='sm'
                              variant='outline'
                              className='border-white/20 text-white/80 hover:bg-white/10 hover:text-white'
                            >
                              View Materials
                            </Button>
                          </DialogTrigger>
                          <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto bg-black/80 text-white border border-white/20 backdrop-blur-2xl shadow-2xl shadow-black/40'>
                            <DialogHeader>
                              <DialogTitle className='text-2xl text-white mb-2'>
                                {course.title} - Course Materials
                              </DialogTitle>
                              <DialogDescription className='text-white/70'>
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
                                  <p className='text-white/75 mb-4'>
                                    {course.description}
                                  </p>
                                  <div className='flex items-center space-x-4 text-sm text-white/70'>
                                    <span>
                                      <strong>Course Code:</strong> {course.code}
                                    </span>
                                    <span>
                                      <strong>Semester:</strong> {course.semester}
                                    </span>
                                  </div>
                                </div>

                                <div className='mb-6'>
                                  <div className='flex items-center justify-between mb-3'>
                                    <h4 className='text-lg text-white'>
                                      Available Materials
                                    </h4>
                                    <Button
                                      size='sm'
                                      className='bg-[#B19EEF] hover:bg-[#8f79da] text-white shadow-lg shadow-[#B19EEF]/30'
                                      onClick={() => course.folderPath && handleDownload(course.folderPath)}
                                    >
                                      <Download className='w-3 h-3 mr-1' />
                                      Download All Materials
                                    </Button>
                                  </div>
                                  <div className='space-y-2'>
                                    {course.materials.map((material, matIndex) => (
                                      <div
                                        key={matIndex}
                                        className='flex items-center justify-between py-2 px-3 rounded bg-white/5 hover:bg-white/10 transition-colors'
                                      >
                                        <div className='flex items-center space-x-3'>
                                          <material.icon className='w-4 h-4 text-[#b19eef]' />
                                          <span className='text-white text-sm'>
                                            {material.type} ({material.count} items)
                                          </span>
                                        </div>
                                        <Button
                                          size='sm'
                                          variant='outline'
                                          className='border-white/30 text-white hover:bg-white/10 text-xs'
                                          onClick={() => course.folderPath && handleDownload(course.folderPath)}
                                        >
                                          <Download className='w-3 h-3 mr-1' />
                                          Browse
                                        </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className='text-lg text-white mb-3'>
                                  Topics Covered
                                </h4>
                                <div className='text-sm text-white/70'>
                                  {course.topics.join(', ')}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button
                          size='sm'
                          variant='outline'
                          disabled
                          className='border-gray-500 text-gray-500'
                        >
                          No Materials
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Tabular Course Information */}
                  <div className='grid grid-cols-3 gap-4 text-sm bg-white/5 p-3 rounded border border-white/10'>
                    <div>
                      <span className='font-medium text-white/90'>Level:</span> <span className='text-white/70'>{course.level}</span>
                    </div>
                    <div>
                      <span className='font-medium text-white/90'>Semester:</span> <span className='text-white/70'>{course.semester}</span>
                    </div>
                    <div>
                      <span className='font-medium text-white/90'>Materials:</span> <span className='text-white/70'> {
                        course.status === 'Available'
                          ? `${course.materials.reduce((sum, m) => sum + m.count, 0)} items`
                          : 'Not available'
                      }</span>
                    </div>
                  </div>
                </div>

                {/* Materials List */}
                <div className='mb-4'>
                  <h4 className='text-sm font-medium text-white/90 mb-2'>Course Materials:</h4>
                  {course.status === 'Available' ? (
                    <ul className='space-y-1 ml-4'>
                      {course.materials.map((material, matIndex) => (
                        <li key={matIndex} className='text-sm text-white/70 flex items-center'>
                          <span className='w-2 h-2 bg-white/60 rounded-full mr-3 flex-shrink-0'></span>
                          {material.type}: {material.count} items
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className='text-sm text-red-400 ml-4'>
                      Not available in Course Materials
                    </div>
                  )}
                </div>

                {/* Topics */}
                <div>
                  <h4 className='text-sm font-medium text-white/90 mb-2'>Topics:</h4>
                  <div className='text-sm text-white/70 ml-4'>
                    {course.status === 'Available' && course.topics[0] !== 'Not available'
                      ? course.topics.join(' • ')
                      : 'Not available in Course Materials'
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4'>
            Additional Resources
          </h2>
          <div className='space-y-4'>
            {resources.map((resource, index) => (
              <div
                key={index}
                className='border-b border-white/10 pb-4 last:border-b-0'
              >
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h3 className='text-lg font-medium text-white/90 mb-1'>
                      {resource.title}
                    </h3>
                    <p className='text-sm text-white/70 mb-2'>
                      {resource.description}
                    </p>
                  </div>
                  <div className='ml-6 text-right'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          className='border-white/20 text-white/80 hover:bg-white/10 hover:text-white'
                        >
                          Access Resource
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto bg-black/80 text-white border border-white/20 backdrop-blur-2xl shadow-2xl shadow-black/40'>
                        <DialogHeader>
                          <DialogTitle className='text-2xl text-white mb-2'>
                            {resource.title}
                          </DialogTitle>
                          <DialogDescription className='text-white/70'>
                            Explore this {resource.type.toLowerCase()} designed
                            for {resource.level.toLowerCase()} learners with{' '}
                            {resource.items} available items.
                          </DialogDescription>
                          <div className='flex items-center space-x-2'>
                            <Badge
                              variant='secondary'
                              className='bg-blue-500/20 text-blue-300 border-blue-300/40'
                            >
                              {resource.type}
                            </Badge>
                            <Badge className={getLevelColor(resource.level)}>
                              {resource.level}
                            </Badge>
                          </div>
                        </DialogHeader>
                        <div className='mt-6'>
                          <p className='text-white/75 mb-6'>
                            {resource.description}
                          </p>

                          <div className='mb-6'>
                            <h4 className='text-lg text-white'>
                              Resource Details
                            </h4>
                            <div className='bg-white/5 p-4 rounded border border-white/10'>
                              <div className='grid md:grid-cols-2 gap-4 text-sm text-white/75'>
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
                            <h4 className='text-lg text-white mb-3'>
                              Preview Content
                            </h4>
                            <div className='bg-white/5 p-4 rounded border border-white/10'>
                              <p className='text-white/70 text-sm italic'>
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
                            <Button className='bg-[#B19EEF] hover:bg-[#8f79da] text-white flex-1'>
                              <BookOpen className='w-4 h-4 mr-2' />
                              Open Full Resource
                            </Button>
                            <Button
                              variant='outline'
                              className='border-white/30 text-white hover:bg-white/10'
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
                <div className='grid grid-cols-4 gap-4 text-sm bg-white/5 p-3 rounded border border-white/10'>
                  <div>
                    <span className='font-medium text-white/90'>Type:</span> <span className='text-white/70'>{resource.type}</span>
                  </div>
                  <div>
                    <span className='font-medium text-white/90'>Level:</span> <span className='text-white/70'>{resource.level}</span>
                  </div>
                  <div>
                    <span className='font-medium text-white/90'>Items:</span> <span className='text-white/70'>{resource.items}</span>
                  </div>
                  <div>
                    <span className='font-medium text-white/90'>Updated:</span> <span className='text-white/70'>{resource.lastUpdated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}
