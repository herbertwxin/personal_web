import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({
      // Include .tsx files in Fast Refresh
      include: '**/*.tsx',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./components', import.meta.url)),
      '@/ui': fileURLToPath(new URL('./components/ui', import.meta.url)),
      '@/styles': fileURLToPath(new URL('./styles', import.meta.url)),
      '@/lib': fileURLToPath(new URL('./lib', import.meta.url)),
      '@/utils': fileURLToPath(new URL('./utils', import.meta.url)),
      '@/types': fileURLToPath(new URL('./types', import.meta.url)),
      '@/hooks': fileURLToPath(new URL('./hooks', import.meta.url)),
    },
  },
  css: {
    postcss: './postcss.config.js',
    // Enable source maps for development debugging
    devSourcemap: true,
    // Optimize CSS processing
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
    // Configure CSS modules for better performance
    modules: {
      localsConvention: 'camelCase',
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:base64:5]'
          : '[name]__[local]___[hash:base64:5]',
    },
  },
  // Asset handling configuration
  assetsInclude: [
    '**/*.svg',
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.webp',
    '**/*.ico',
  ],
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
    host: true,
    cors: true,
    // Enable HMR for better development experience
    hmr: {
      overlay: true,
      // Optimize HMR performance
      port: 24678,
    },
    // Optimize development server performance
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    outDir: 'dist',
    // Configure source maps for different environments
    sourcemap: process.env.NODE_ENV === 'development' ? true : 'hidden',
    // Optimize build performance and output
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    minify: 'esbuild',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096,
    // Enable build optimizations
    reportCompressedSize: false,
    // Improve build performance with better chunk splitting
    rollupOptions: {
      output: {
        // Optimize manual chunks for better caching
        manualChunks: id => {
          // 1. 首先处理最具体的条件
          // Radix UI 组件 - 按使用频率分组
          if (id.includes('@radix-ui')) {
            // 核心 UI 组件
            if (
              id.includes('react-slot') ||
              id.includes('react-dialog') ||
              id.includes('react-popover') ||
              id.includes('react-dropdown-menu')
            ) {
              return 'ui-core'
            }
            // 表单组件
            if (
              id.includes('react-checkbox') ||
              id.includes('react-radio-group') ||
              id.includes('react-select') ||
              id.includes('react-switch') ||
              id.includes('react-slider') ||
              id.includes('react-label')
            ) {
              return 'ui-forms'
            }
            // 布局组件
            if (
              id.includes('react-accordion') ||
              id.includes('react-collapsible') ||
              id.includes('react-tabs') ||
              id.includes('react-separator') ||
              id.includes('react-scroll-area')
            ) {
              return 'ui-layout'
            }
            // 导航组件
            if (
              id.includes('react-navigation-menu') ||
              id.includes('react-menubar') ||
              id.includes('react-tooltip') ||
              id.includes('react-hover-card')
            ) {
              return 'ui-navigation'
            }
            // 剩余的 UI 组件
            return 'ui-misc'
          }

          // 2. 处理其他特定库
          // React 核心库 - 最稳定，缓存时间最长
          if (id.includes('/node_modules/react/') || 
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/react/jsx-runtime')) {
            return 'vendor-react'
          }

          // 动画库 - 用于可选加载的独立块
          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }

          // 图标库 - 用于延迟加载
          if (id.includes('lucide-react')) {
            return 'vendor-icons'
          }

          // 图表和数据可视化
          if (id.includes('recharts')) {
            return 'vendor-charts'
          }

          // 表单处理
          if (id.includes('react-hook-form')) {
            return 'vendor-forms'
          }

          // 工具库 - 小型且常用
          if (
            id.includes('class-variance-authority') ||
            id.includes('clsx') ||
            id.includes('tailwind-merge')
          ) {
            return 'utils-styling'
          }

          // 3. 处理其他 vendor 库
          if (id.includes('node_modules')) {
            // 根据模块大小进一步优化
            const match = id.match(/node_modules\/([^/]+)/)
            if (match) {
              const packageName = match[1]
              
              // 大型库单独分包
              if (packageName.startsWith('@') || packageName.length > 15) {
                return `vendor-${packageName.replace(/[^a-zA-Z0-9]/g, '-')}`
              }
              
              // 小型库分组
              return 'vendor-misc'
            }
            
            return 'vendor-misc'
          }

          // 4. 默认返回 null 让 Rollup 决定
          return null
        },
        // Optimize chunk and asset file names for caching
        chunkFileNames: chunkInfo => {
          const _facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk'
          return `assets/js/[name]-[hash].js`
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          if (!assetInfo.name) {return `assets/[name]-[hash].[ext]`}

          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].[ext]`
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].[ext]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].[ext]`
          }
          return `assets/misc/[name]-[hash].[ext]`
        },
      },
      // Optimize external dependencies
      external: [],
    },
    // Optimize build size and performance
    chunkSizeWarningLimit: 500,
  },
  // Optimize dependencies for faster dev server startup
  optimizeDeps: {
    include: [
      // Core React
      'react',
      'react-dom',
      'react/jsx-runtime',

      // Animation
      'framer-motion',

      // Essential UI components (most frequently used)
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-dropdown-menu',

      // Styling utilities
      'class-variance-authority',
      'clsx',
      'tailwind-merge',

      // Icons
      'lucide-react',

      // Form handling
      'react-hook-form',

      // Theme management
      'next-themes',
    ],
    // Exclude heavy dependencies that can be loaded on demand
    exclude: [
      // Chart library - only needed on specific pages
      'recharts',
      // Carousel - only needed on specific components
      'embla-carousel-react',
      // Command palette - only needed when invoked
      'cmdk',
      // Drawer - only needed on mobile
      'vaul',
    ],
    // Enable esbuild optimization
    esbuildOptions: {
      target: 'es2020',
      // Enable tree shaking for dependencies
      treeShaking: true,
    },
  },
  // Configure esbuild for optimization
  esbuild: {
    // Remove console logs in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Optimize for size in production
    minifyIdentifiers: process.env.NODE_ENV === 'production',
    minifySyntax: true,
    minifyWhitespace: true,
  },

  // Define environment variables
  define: {
    __DEV__: 'import.meta.env.DEV',
  },
})
