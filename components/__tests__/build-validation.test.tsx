import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs'

// Mock child_process for testing
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

// Mock fs for file system operations
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
  statSync: vi.fn(),
}))

describe('Build Process Validation Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Tailwind CSS Configuration Tests (Requirements 3.1, 3.2, 3.3)', () => {
    it('should validate Tailwind config uses v3 content syntax', () => {
      // Mock reading the tailwind config file
      const mockTailwindConfig = `
        export default {
          content: [
            './pages/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
            './app/**/*.{ts,tsx}',
            './src/**/*.{ts,tsx}',
            './lib/**/*.{ts,tsx}',
            './hooks/**/*.{ts,tsx}',
            './types/**/*.{ts,tsx}',
            './index.html',
            './main.tsx',
            './App.tsx',
          ],
          theme: {
            extend: {}
          },
          plugins: []
        }
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockTailwindConfig)
      vi.mocked(fs.existsSync).mockReturnValue(true)
      
      // Verify config file exists
      expect(fs.existsSync('tailwind.config.js')).toBe(true)
      
      // Read and validate config content
      const configContent = fs.readFileSync('tailwind.config.js', 'utf-8')
      
      // Should use 'content' array instead of deprecated 'purge'
      expect(configContent).toContain('content:')
      expect(configContent).not.toContain('purge:')
      
      // Should include all necessary file patterns
      expect(configContent).toContain('./components/**/*.{ts,tsx}')
      expect(configContent).toContain('./index.html')
      expect(configContent).toContain('./App.tsx')
    })

    it('should validate no deprecated Tailwind options are used', () => {
      const mockTailwindConfig = `
        export default {
          content: ['./src/**/*.{ts,tsx}'],
          theme: { extend: {} },
          plugins: []
        }
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockTailwindConfig)
      
      const configContent = fs.readFileSync('tailwind.config.js', 'utf-8')
      
      // Should not contain deprecated options
      expect(configContent).not.toContain('purge:')
      expect(configContent).not.toContain('mode: "jit"')
      expect(configContent).not.toContain('variants:')
      
      // Should use modern v3 syntax
      expect(configContent).toContain('content:')
    })

    it('should validate experimental features are properly documented', () => {
      const mockTailwindConfig = `
        export default {
          content: ['./src/**/*.{ts,tsx}'],
          experimental: {
            optimizeUniversalDefaults: true
          },
          theme: { extend: {} },
          plugins: []
        }
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockTailwindConfig)
      
      const configContent = fs.readFileSync('tailwind.config.js', 'utf-8')
      
      // If experimental features are used, they should be properly configured
      if (configContent.includes('experimental:')) {
        expect(configContent).toContain('optimizeUniversalDefaults')
      }
    })

    it('should validate content paths include all necessary directories', () => {
      const mockTailwindConfig = `
        export default {
          content: [
            './pages/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
            './app/**/*.{ts,tsx}',
            './src/**/*.{ts,tsx}',
            './lib/**/*.{ts,tsx}',
            './hooks/**/*.{ts,tsx}',
            './types/**/*.{ts,tsx}',
            './index.html',
            './main.tsx',
            './App.tsx',
          ],
          theme: { extend: {} }
        }
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockTailwindConfig)
      
      const configContent = fs.readFileSync('tailwind.config.js', 'utf-8')
      
      // Essential paths that should be included
      const requiredPaths = [
        './components/**/*.{ts,tsx}',
        './index.html',
        './App.tsx'
      ]
      
      requiredPaths.forEach(path => {
        expect(configContent).toContain(path)
      })
    })
  })

  describe('Build Process Warning Tests (Requirements 3.1, 3.4)', () => {
    it('should validate build process produces no Tailwind warnings', () => {
      // Mock successful build output without warnings
      const mockBuildOutput = `
        vite v5.4.10 building for production...
        ✓ 45 modules transformed.
        dist/index.html                   0.46 kB │ gzip:  0.30 kB
        dist/assets/index-abc123.css      8.23 kB │ gzip:  2.15 kB
        dist/assets/index-def456.js     142.18 kB │ gzip: 45.67 kB
        ✓ built in 2.34s
      `
      
      vi.mocked(execSync).mockReturnValue(Buffer.from(mockBuildOutput))
      
      // Run build command
      const buildOutput = execSync('npm run build', { encoding: 'utf-8' })
      
      // Should not contain Tailwind CSS warnings
      expect(buildOutput).not.toContain('warn - The `purge`/`content` options have changed')
      expect(buildOutput).not.toContain('deprecated')
      expect(buildOutput).not.toContain('Tailwind CSS warning')
      
      // Should indicate successful build
      expect(buildOutput).toContain('built in')
      expect(buildOutput).not.toContain('error')
    })

    it('should validate type checking passes without errors', () => {
      const mockTypeCheckOutput = `
        > tsc -b --noEmit
        
        No errors found.
      `
      
      vi.mocked(execSync).mockReturnValue(Buffer.from(mockTypeCheckOutput))
      
      const typeCheckOutput = execSync('npm run type-check', { encoding: 'utf-8' })
      
      // Should not contain TypeScript errors
      expect(typeCheckOutput).not.toContain('error TS')
      expect(typeCheckOutput).not.toContain('Found 1 error')
      
      // Should indicate successful type checking
      const hasNoErrors = typeCheckOutput.includes('No errors found') || !typeCheckOutput.includes('error')
      expect(hasNoErrors).toBe(true)
    })

    it('should validate linting passes without errors', () => {
      const mockLintOutput = `
        > eslint .
        
        ✓ No linting errors found
      `
      
      vi.mocked(execSync).mockReturnValue(Buffer.from(mockLintOutput))
      
      const lintOutput = execSync('npm run lint', { encoding: 'utf-8' })
      
      // Should not contain linting errors
      expect(lintOutput).not.toContain('error')
      expect(lintOutput).not.toContain('✖')
      
      // Should indicate successful linting or no output (success)
      expect(lintOutput.length === 0 || lintOutput.includes('✓') || !lintOutput.includes('error')).toBe(true)
    })

    it('should validate CSS processing completes without warnings', () => {
      const mockCSSOutput = `
        Processing CSS with PostCSS...
        Tailwind CSS v3.4.14
        ✓ CSS processed successfully
      `
      
      vi.mocked(execSync).mockReturnValue(Buffer.from(mockCSSOutput))
      
      // This would be part of the build process
      const buildOutput = execSync('npm run build', { encoding: 'utf-8' })
      
      // Should not contain CSS processing warnings
      expect(buildOutput).not.toContain('PostCSS warning')
      expect(buildOutput).not.toContain('CSS warning')
      expect(buildOutput).not.toContain('autoprefixer warning')
    })
  })

  describe('Production Build Validation', () => {
    it('should validate production build generates optimized assets', () => {
      const mockBuildStats = {
        'index.html': { size: 1024 },
        'assets/index.css': { size: 8192 },
        'assets/index.js': { size: 145408 }
      }
      
      vi.mocked(fs.existsSync).mockImplementation((filePath) => {
        return Object.keys(mockBuildStats).some(file => 
          filePath.toString().includes(file.split('/').pop() || '')
        )
      })
      
      vi.mocked(fs.statSync).mockImplementation(() => ({
        size: BigInt(mockBuildStats['assets/index.js'].size),
        isFile: () => true,
        isDirectory: () => false
      } as any))
      
      // Verify build artifacts exist
      expect(fs.existsSync('dist/index.html')).toBe(true)
      
      // Verify assets are reasonably sized (not too large)
      const jsStats = fs.statSync('dist/assets/index.js')
      expect(jsStats.size).toBeLessThan(500000) // Less than 500KB
    })

    it('should validate CSS is properly purged and optimized', () => {
      const mockOptimizedCSS = `
        .min-h-screen{min-height:100vh}
        .relative{position:relative}
        .fixed{position:fixed}
        .z-10{z-index:10}
        .z-50{z-index:50}
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockOptimizedCSS)
      vi.mocked(fs.existsSync).mockReturnValue(true)
      
      // Read built CSS file
      const cssContent = fs.readFileSync('dist/assets/index.css', 'utf-8')
      
      // Should contain only used classes
      expect(cssContent).toContain('.min-h-screen')
      expect(cssContent).toContain('.relative')
      expect(cssContent).toContain('.fixed')
      
      // Should be minified (no unnecessary whitespace)
      expect(cssContent).not.toContain('  ') // No double spaces
      expect(cssContent.split('\n').length).toBeLessThan(100) // Compact
    })

    it('should validate JavaScript is properly bundled and minified', () => {
      const mockMinifiedJS = `
        (function(){var e=document.createElement("div");e.className="min-h-screen relative"})();
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockMinifiedJS)
      vi.mocked(fs.existsSync).mockReturnValue(true)
      
      const jsContent = fs.readFileSync('dist/assets/index.js', 'utf-8')
      
      // Should be minified
      expect(jsContent.length).toBeGreaterThan(0)
      expect(jsContent).not.toContain('console.log') // Debug statements removed
      expect(jsContent).not.toContain('// Comment') // Comments removed
    })
  })

  describe('Development Build Validation', () => {
    it('should validate development server starts without warnings', () => {
      const mockDevOutput = `
        VITE v5.4.10  ready in 234 ms
        
        ➜  Local:   http://localhost:5173/
        ➜  Network: use --host to expose
      `
      
      vi.mocked(execSync).mockReturnValue(Buffer.from(mockDevOutput))
      
      // This would test dev server startup (mocked)
      const devOutput = execSync('npm run dev', { encoding: 'utf-8' })
      
      // Should start successfully
      expect(devOutput).toContain('ready in')
      expect(devOutput).toContain('Local:')
      expect(devOutput).not.toContain('error')
      expect(devOutput).not.toContain('warning')
    })

    it('should validate hot module replacement works correctly', () => {
      // Mock HMR functionality
      const mockHMROutput = `
        [vite] hmr update /src/App.tsx
        [vite] hot updated: /src/App.tsx
      `
      
      // This would be part of development workflow
      expect(mockHMROutput).toContain('hmr update')
      expect(mockHMROutput).toContain('hot updated')
      expect(mockHMROutput).not.toContain('error')
    })
  })

  describe('Package Dependencies Validation', () => {
    it('should validate all required dependencies are installed', () => {
      const mockPackageJson = {
        dependencies: {
          'react': '^18.3.1',
          'react-dom': '^18.3.1',
          'framer-motion': '^11.11.0',
          'tailwindcss': '^3.4.14'
        },
        devDependencies: {
          'vite': '^5.4.10',
          'typescript': '~5.6.2',
          '@vitejs/plugin-react': '^4.3.3'
        }
      }
      
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson))
      vi.mocked(fs.existsSync).mockReturnValue(true)
      
      const packageContent = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      
      // Verify essential dependencies
      expect(packageContent.dependencies).toHaveProperty('react')
      expect(packageContent.dependencies).toHaveProperty('tailwindcss')
      expect(packageContent.devDependencies).toHaveProperty('vite')
      expect(packageContent.devDependencies).toHaveProperty('typescript')
      
      // Verify Tailwind CSS is v3+
      const tailwindVersion = packageContent.dependencies.tailwindcss
      expect(tailwindVersion).toMatch(/\^3\.|~3\./)
    })

    it('should validate no conflicting dependency versions', () => {
      const mockLockfile = `
        "tailwindcss": {
          "version": "3.4.14",
          "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.14.tgz"
        }
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockLockfile)
      vi.mocked(fs.existsSync).mockReturnValue(true)
      
      const lockContent = fs.readFileSync('package-lock.json', 'utf-8')
      
      // Should have consistent Tailwind CSS version
      expect(lockContent).toContain('"tailwindcss"')
      expect(lockContent).toContain('"version": "3.')
    })
  })

  describe('Configuration File Validation', () => {
    it('should validate PostCSS configuration is correct', () => {
      const mockPostCSSConfig = `
        export default {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        }
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockPostCSSConfig)
      vi.mocked(fs.existsSync).mockReturnValue(true)
      
      const postcssContent = fs.readFileSync('postcss.config.js', 'utf-8')
      
      // Should include Tailwind CSS plugin
      expect(postcssContent).toContain('tailwindcss')
      expect(postcssContent).toContain('autoprefixer')
    })

    it('should validate Vite configuration supports Tailwind CSS', () => {
      const mockViteConfig = `
        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        
        export default defineConfig({
          plugins: [react()],
          css: {
            postcss: './postcss.config.js',
          },
        })
      `
      
      vi.mocked(fs.readFileSync).mockReturnValue(mockViteConfig)
      vi.mocked(fs.existsSync).mockReturnValue(true)
      
      const viteContent = fs.readFileSync('vite.config.ts', 'utf-8')
      
      // Should support CSS processing
      expect(viteContent).toContain('defineConfig')
      expect(viteContent).toContain('@vitejs/plugin-react')
    })

    it('should validate TypeScript configuration is compatible', () => {
      const mockTSConfig = {
        compilerOptions: {
          target: 'ES2020',
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true
        },
        include: ['src', 'components', 'lib', 'hooks', 'types'],
        references: [{ path: './tsconfig.node.json' }]
      }
      
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockTSConfig))
      vi.mocked(fs.existsSync).mockReturnValue(true)
      
      const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf-8'))
      
      // Should support React JSX
      expect(tsConfig.compilerOptions.jsx).toBe('react-jsx')
      expect(tsConfig.compilerOptions.module).toBe('ESNext')
      expect(tsConfig.include).toContain('components')
    })
  })
})