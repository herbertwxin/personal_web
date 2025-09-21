import { useState, Suspense, lazy, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Navigation } from './components/Navigation'
import { HomePage } from './components/HomePage'
import { perf, logMemoryUsage } from './lib/performance'
import PixelBlast from './components/pixel-blast/PixelBlast'

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
  <motion.div 
    className='flex items-center justify-center min-h-[60vh]'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.3 }}
  >
    <motion.div
      className='w-6 h-6 border-2 border-transparent border-t-muted-purple-600 rounded-full'
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  </motion.div>
)

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentModelId, setCurrentModelId] = useState<number | null>(null)
  const [currentBlogId, setCurrentBlogId] = useState<number | null>(null)
  const [isSearchActive, setIsSearchActive] = useState(false)

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
    <div className='relative min-h-screen overflow-hidden text-foreground'>
      <div className='pixel-blast-background' aria-hidden='true'>
        <PixelBlast
          variant='circle'
          pixelSize={6}
          color='#B19EEF'
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
          autoPauseOffscreen
        />
      </div>

      {isSearchActive && (
        <div 
          className='fixed inset-0 z-40 backdrop-blur-md bg-black/30 transition-all duration-300'
        />
      )}

      <div className='relative z-50'>
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onSearchStateChange={setIsSearchActive}
        />
      </div>

      <main 
        className={`relative z-30 pt-32 pb-16 transition-all duration-300 ${
          isSearchActive ? 'blur-sm scale-[0.98]' : ''
        }`}
      >
        <div className='px-4 sm:px-6 md:px-10'>
          <div className='page-surface mx-auto w-full max-w-6xl py-10 sm:py-12'>
            {renderPage()}
          </div>
        </div>
      </main>

      <Analytics />
      <SpeedInsights />
    </div>
  )
}
