/**
 * Performance monitoring utilities for development and debugging
 */

// Performance measurement utilities
export const perf = {
  // Measure component render time
  measureRender: (componentName: string, fn: () => void) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      fn()
      const end = performance.now()
      console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`)
    } else {
      fn()
    }
  },

  // Measure async operations
  measureAsync: async <T>(
    operationName: string,
    fn: () => Promise<T>
  ): Promise<T> => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      const result = await fn()
      const end = performance.now()
      console.log(`${operationName} time: ${(end - start).toFixed(2)}ms`)
      return result
    }
    return fn()
  },

  // Mark performance milestones
  mark: (name: string) => {
    if (process.env.NODE_ENV === 'development' && 'mark' in performance) {
      performance.mark(name)
    }
  },

  // Measure between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (process.env.NODE_ENV === 'development' && 'measure' in performance) {
      performance.measure(name, startMark, endMark)
      const entries = performance.getEntriesByName(name)
      if (entries.length > 0) {
        console.log(`${name}: ${entries[0].duration.toFixed(2)}ms`)
      }
    }
  },

  // Log bundle size information
  logBundleInfo: () => {
    if (process.env.NODE_ENV === 'development') {
      // Log performance navigation timing
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming
      if (navigation) {
        console.group('Performance Metrics')
        console.log(
          `DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`
        )
        console.log(
          `Load Complete: ${navigation.loadEventEnd - navigation.loadEventStart}ms`
        )
        console.log(
          `First Paint: ${navigation.domContentLoadedEventEnd - navigation.fetchStart}ms`
        )
        console.groupEnd()
      }

      // Log resource timing for chunks
      const resources = performance.getEntriesByType('resource')
      const jsResources = resources.filter(r => r.name.includes('.js'))
      const cssResources = resources.filter(r => r.name.includes('.css'))

      if (jsResources.length > 0 || cssResources.length > 0) {
        console.group('Resource Loading')
        jsResources.forEach(r => {
          console.log(
            `JS: ${r.name.split('/').pop()} - ${r.duration.toFixed(2)}ms`
          )
        })
        cssResources.forEach(r => {
          console.log(
            `CSS: ${r.name.split('/').pop()} - ${r.duration.toFixed(2)}ms`
          )
        })
        console.groupEnd()
      }
    }
  },
}

// React performance utilities
import React from 'react'

export const withPerformanceMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return (props: P) => {
    if (process.env.NODE_ENV === 'development') {
      perf.mark(`${componentName}-start`)
      const result = React.createElement(Component, props)
      perf.mark(`${componentName}-end`)
      perf.measure(
        `${componentName}-render`,
        `${componentName}-start`,
        `${componentName}-end`
      )
      return result
    }
    return React.createElement(Component, props)
  }
}

// Web Vitals monitoring (for production)
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    // In a real app, you would send this to your analytics service
    console.log(metric)
  }
}

// Memory usage monitoring
export const logMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memory = (performance as any).memory
    console.group('Memory Usage')
    console.log(`Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`)
    console.log(
      `Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`
    )
    console.log(
      `Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
    )
    console.groupEnd()
  }
}
