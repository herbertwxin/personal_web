import { useState, Suspense, lazy, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from './components/Navigation'
import { HomePage } from './components/HomePage'
import { perf, logMemoryUsage } from './lib/performance'

// Lazy load page components for better performance
const StackPage = lazy(() =>
  import('./components/StackPage').then(module => ({
    default: module.StackPage,
  }))
)
const StackModelPage = lazy(() =>
  import('./components/StackModelPage').then(module => ({
    default: module.StackModelPage,
  }))
)
const PublicationsPage = lazy(() =>
  import('./components/PublicationsPage').then(module => ({
    default: module.PublicationsPage,
  }))
)
const ResumePage = lazy(() =>
  import('./components/ResumePage').then(module => ({
    default: module.ResumePage,
  }))
)
const TeachingPage = lazy(() =>
  import('./components/TeachingPage').then(module => ({
    default: module.TeachingPage,
  }))
)
const BlogPage = lazy(() =>
  import('./components/BlogPage').then(module => ({ default: module.BlogPage }))
)
const BlogPostPage = lazy(() =>
  import('./components/BlogPostPage').then(module => ({
    default: module.BlogPostPage,
  }))
)

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className='flex items-center justify-center min-h-[60vh]'>
    <motion.div
      className='w-8 h-8 border-2 border-muted-purple-300 border-t-muted-purple-600 rounded-full'
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
)

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentModelId, setCurrentModelId] = useState<number | null>(null)
  const [currentBlogId, setCurrentBlogId] = useState<number | null>(null)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // Handle window resize for responsive texture animations
  const handleResize = useCallback(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  // Performance monitoring and texture optimization setup
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      perf.mark('app-mount')
      perf.logBundleInfo()

      // Log memory usage periodically in development
      const memoryInterval = setInterval(logMemoryUsage, 30000)

      return () => {
        clearInterval(memoryInterval)
        perf.mark('app-unmount')
        perf.measure('app-lifetime', 'app-mount', 'app-unmount')
      }
    }
    return undefined
  }, [])

  // Window resize listener for responsive texture behavior
  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  // Texture performance optimization
  useEffect(() => {
    // Enable hardware acceleration for texture elements
    const textureElements = document.querySelectorAll('.texture-background')
    textureElements.forEach(element => {
      const htmlElement = element as HTMLElement
      htmlElement.style.transform = 'translateZ(0)'
      htmlElement.style.willChange = 'transform'
    })

    // Performance monitoring for texture rendering
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name.includes('texture') || entry.name.includes('background')) {
            console.log(`Texture performance: ${entry.name} took ${entry.duration}ms`)
          }
        })
      })
      
      observer.observe({ entryTypes: ['measure', 'navigation'] })
      
      return () => {
        observer.disconnect()
      }
    }
    
    return undefined
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'stack':
        return (
          <Suspense fallback={<PageLoader />}>
            <StackPage
              onViewModel={modelId => {
                setCurrentModelId(modelId)
                setCurrentPage('stack-model')
              }}
            />
          </Suspense>
        )
      case 'stack-model':
        return (
          <Suspense fallback={<PageLoader />}>
            <StackModelPage
              modelId={currentModelId}
              onBack={() => setCurrentPage('stack')}
            />
          </Suspense>
        )
      case 'publications':
        return (
          <Suspense fallback={<PageLoader />}>
            <PublicationsPage />
          </Suspense>
        )
      case 'resume':
        return (
          <Suspense fallback={<PageLoader />}>
            <ResumePage />
          </Suspense>
        )
      case 'teaching':
        return (
          <Suspense fallback={<PageLoader />}>
            <TeachingPage />
          </Suspense>
        )
      case 'blog':
        return (
          <Suspense fallback={<PageLoader />}>
            <BlogPage
              onReadPost={blogId => {
                setCurrentBlogId(blogId)
                setCurrentPage('blog-post')
              }}
            />
          </Suspense>
        )
      case 'blog-post':
        return (
          <Suspense fallback={<PageLoader />}>
            <BlogPostPage
              blogId={currentBlogId}
              onBack={() => setCurrentPage('blog')}
            />
          </Suspense>
        )
      default:
        return <HomePage />
    }
  }

  return (
    <div className='min-h-screen relative'>
      {/* Background Container - ISOLATED */}
      <div className='fixed inset-0 pointer-events-none' style={{ zIndex: 0 }}>
        {/* Base white background */}
        <div className='absolute inset-0 bg-white' />
        


        {/* Animated purple circles */}
        <motion.div
          className='absolute w-96 h-96 rounded-full blur-3xl'
          style={{ 
            backgroundColor: 'rgba(120, 100, 150, 0.25)',
          }}
          animate={{
            x: [100, Math.max(windowDimensions.width - 400, 200), 200, 100],
            y: [150, 300, Math.max(windowDimensions.height - 200, 300), 150],
            scale: [0.8, 1.2, 0.9, 0.8],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute w-80 h-80 rounded-full blur-3xl'
          style={{ 
            backgroundColor: 'rgba(135, 115, 160, 0.2)',
          }}
          animate={{
            x: [
              Math.max(windowDimensions.width - 300, 150),
              150,
              Math.max(windowDimensions.width - 400, 200),
              Math.max(windowDimensions.width - 300, 150),
            ],
            y: [200, Math.max(windowDimensions.height - 300, 200), 100, 200],
            scale: [1, 0.7, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
        <motion.div
          className='absolute w-64 h-64 rounded-full blur-3xl'
          style={{ 
            backgroundColor: 'rgba(105, 90, 140, 0.15)',
          }}
          animate={{
            x: [300, Math.max(windowDimensions.width - 200, 300), 100, 300],
            y: [
              Math.max(windowDimensions.height - 200, 300),
              100,
              Math.max(windowDimensions.height - 300, 200),
              Math.max(windowDimensions.height - 200, 300),
            ],
            scale: [0.9, 1.3, 0.8, 0.9],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 10,
          }}
        />
        <motion.div
          className='absolute w-72 h-72 rounded-full blur-3xl'
          style={{ 
            backgroundColor: 'rgba(140, 120, 165, 0.12)',
          }}
          animate={{
            x: [50, 400, Math.max(windowDimensions.width - 150, 400), 50],
            y: [
              windowDimensions.height / 2,
              80,
              Math.max(windowDimensions.height - 100, 200),
              windowDimensions.height / 2,
            ],
            scale: [1.1, 0.6, 1.4, 1.1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 15,
          }}
        />
      </div>

      {/* Navigation */}
      <div className='relative' style={{ zIndex: 50 }}>
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      {/* Main Content */}
      <main className='relative pt-20' style={{ zIndex: 10 }}>{renderPage()}</main>
    </div>
  )
}
