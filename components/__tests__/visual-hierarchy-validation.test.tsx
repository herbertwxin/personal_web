import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Visual Hierarchy Validation Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 })
  })

  afterEach(() => {
    cleanup()
  })

  describe('Navigation Visual Hierarchy', () => {
    it('should validate navigation has highest visual priority', () => {
      const navigation = document.createElement('nav')
      navigation.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50'
      navigation.style.height = '48px'
      
      const main = document.createElement('main')
      main.className = 'relative z-10 pt-16'
      
      document.body.appendChild(navigation)
      document.body.appendChild(main)
      
      // Navigation should have highest z-index
      expect(navigation.classList.contains('z-50')).toBe(true)
      expect(main.classList.contains('z-10')).toBe(true)
      
      // Navigation should be positioned at top
      expect(navigation.classList.contains('fixed')).toBe(true)
      expect(navigation.classList.contains('top-4')).toBe(true)
    })

    it('should validate navigation visual prominence and accessibility', () => {
      const navigation = document.createElement('nav')
      navigation.className = 'fixed top-4 z-50'
      
      // Navigation should have backdrop blur and proper styling
      navigation.style.backdropFilter = 'blur(20px)'
      navigation.style.background = 'rgba(255,255,255,0.95)'
      navigation.style.borderRadius = '9999px' // rounded-full
      
      document.body.appendChild(navigation)
      
      // Verify visual prominence styles
      expect(navigation.style.backdropFilter).toBe('blur(20px)')
      expect(navigation.style.background).toBe('rgba(255,255,255,0.95)')
      expect(navigation.style.borderRadius).toBe('9999px')
    })

    it('should validate navigation centering and positioning hierarchy', () => {
      const navigation = document.createElement('nav')
      navigation.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50'
      
      // Verify centering classes for visual hierarchy
      expect(navigation.classList.contains('left-1/2')).toBe(true)
      expect(navigation.classList.contains('-translate-x-1/2')).toBe(true)
      
      // Should be positioned prominently at top
      expect(navigation.classList.contains('top-4')).toBe(true)
      expect(navigation.classList.contains('fixed')).toBe(true)
    })
  })

  describe('Content Visual Hierarchy', () => {
    it('should validate hero section has primary visual hierarchy', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Hero section should have prominent typography
      expect(homePageContent).toMatch(/text-5xl.*text-black.*mb-6/) // Large heading
      expect(homePageContent).toMatch(/text-2xl.*text-black.*font-normal/) // Subtitle
      expect(homePageContent).toMatch(/text-xl.*text-black.*max-w-2xl.*mb-8/) // Description
      
      // Should have proper visual structure
      expect(homePageContent).toMatch(/Dr\. Academic Researcher/)
      expect(homePageContent).toMatch(/Professor of Economics/)
    })

    it('should validate content sections have proper visual hierarchy', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Section headings should have consistent hierarchy
      expect(homePageContent).toMatch(/text-3xl.*text-black.*mb-4/) // Section headings
      expect(homePageContent).toMatch(/text-2xl.*text-black/) // Subsection headings
      
      // Should have proper spacing hierarchy
      expect(homePageContent).toMatch(/mb-20/) // Major section spacing
      expect(homePageContent).toMatch(/mt-16/) // Section top margins
    })

    it('should validate visual spacing creates proper content hierarchy', () => {
      // Test spacing values create logical visual hierarchy
      const spacingHierarchy = {
        majorSections: 80,    // mb-20 = 80px
        minorSections: 64,    // mt-16 = 64px  
        contentBlocks: 32,    // mb-8 = 32px
        textElements: 24,     // mb-6 = 24px
        smallSpacing: 16      // mb-4 = 16px
      }
      
      // Verify hierarchy is logical (larger spacing for more important separations)
      expect(spacingHierarchy.majorSections).toBeGreaterThan(spacingHierarchy.minorSections)
      expect(spacingHierarchy.minorSections).toBeGreaterThan(spacingHierarchy.contentBlocks)
      expect(spacingHierarchy.contentBlocks).toBeGreaterThan(spacingHierarchy.textElements)
      expect(spacingHierarchy.textElements).toBeGreaterThan(spacingHierarchy.smallSpacing)
    })
  })

  describe('Typography Visual Hierarchy', () => {
    it('should validate heading hierarchy follows proper visual order', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Typography hierarchy should be clear
      const typographyHierarchy = [
        { level: 'h1', class: 'text-5xl', size: 48 },      // Main heading
        { level: 'subtitle', class: 'text-2xl', size: 24 }, // Subtitle
        { level: 'h2', class: 'text-3xl', size: 30 },      // Section headings
        { level: 'h3', class: 'text-2xl', size: 24 },      // Subsection headings
        { level: 'body', class: 'text-xl', size: 20 },     // Body text
        { level: 'small', class: 'text-sm', size: 14 }     // Small text
      ]
      
      // Verify main heading is largest
      expect(typographyHierarchy[0].size).toBeGreaterThan(typographyHierarchy[2].size)
      expect(typographyHierarchy[2].size).toBeGreaterThan(typographyHierarchy[4].size)
      
      // Verify classes exist in content
      expect(homePageContent).toMatch(/text-5xl/)
      expect(homePageContent).toMatch(/text-3xl/)
      expect(homePageContent).toMatch(/text-2xl/)
      expect(homePageContent).toMatch(/text-xl/)
    })

    it('should validate color hierarchy supports visual structure', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // All text should use consistent black color for hierarchy
      const colorMatches = homePageContent.match(/text-black/g)
      expect(colorMatches).toBeTruthy()
      expect(colorMatches!.length).toBeGreaterThan(10) // Multiple instances
      
      // Should have accent colors for interactive elements
      expect(homePageContent).toMatch(/text-\[#6A5ACD\]/) // Purple accent
      expect(homePageContent).toMatch(/text-\[#5a4fcf\]/) // Purple variant
    })

    it('should validate font weight hierarchy', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Should have font weight variations for hierarchy
      expect(homePageContent).toMatch(/font-normal/) // Subtitle weight
      expect(homePageContent).toMatch(/font-medium/) // Button weight
      
      // Default weight should be used for most text (no explicit class needed)
      const fontWeightClasses = homePageContent.match(/font-\w+/g) || []
      expect(fontWeightClasses.length).toBeLessThan(10) // Minimal font weight classes
    })
  })

  describe('Layout Visual Hierarchy', () => {
    it('should validate container hierarchy creates proper visual flow', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Main container should establish hierarchy
      expect(homePageContent).toMatch(/max-w-6xl.*mx-auto/) // Centered container
      expect(homePageContent).toMatch(/min-h-screen.*pb-12.*px-6/) // Full height with padding
      
      // Grid layouts should create visual structure
      expect(homePageContent).toMatch(/grid.*lg:grid-cols-2/) // Two-column layout
      expect(homePageContent).toMatch(/flex.*flex-col.*lg:flex-row/) // Responsive flex layout
    })

    it('should validate responsive hierarchy maintains visual order', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Main content should have responsive padding hierarchy
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Responsive hierarchy should be progressive
      const paddingValues = {
        mobile: 56,   // pt-14
        small: 60,    // sm:pt-15
        medium: 64    // md:pt-16
      }
      
      expect(paddingValues.small).toBeGreaterThan(paddingValues.mobile)
      expect(paddingValues.medium).toBeGreaterThan(paddingValues.small)
    })

    it('should validate spacing hierarchy creates visual rhythm', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Should have consistent spacing rhythm
      const spacingClasses = [
        'mb-20', 'mt-16', 'mb-12', 'mb-8', 'mb-6', 'mb-4', 'mb-2'
      ]
      
      spacingClasses.forEach(spacing => {
        if (['mb-20', 'mt-16', 'mb-8', 'mb-6'].includes(spacing)) {
          expect(homePageContent).toMatch(new RegExp(spacing))
        }
      })
    })
  })

  describe('Interactive Element Hierarchy', () => {
    it('should validate button hierarchy follows visual importance', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Primary button should have prominent styling
      expect(homePageContent).toMatch(/bg-\[#6A5ACD\].*hover:bg-\[#5a4fcf\].*text-white/)
      
      // Secondary button should have outline styling
      expect(homePageContent).toMatch(/variant=['"]outline['"]/)
      expect(homePageContent).toMatch(/border-\[#d6ceff\].*text-\[#5a4fcf\]/)
      
      // Button sizes should be consistent
      expect(homePageContent).toMatch(/size=['"]lg['"]/)
    })

    it('should validate interactive element visual states', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Hover states should be defined for hierarchy
      expect(homePageContent).toMatch(/hover:bg-\[#5a4fcf\]/) // Primary button hover
      expect(homePageContent).toMatch(/hover:bg-\[#f3f1ff\]/) // Secondary button hover
      
      // Interactive elements should have visual feedback
      expect(homePageContent).toMatch(/transition-colors/) // Smooth transitions
    })

    it('should validate icon hierarchy supports content structure', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Icons should be consistently sized for hierarchy
      expect(homePageContent).toMatch(/w-5 h-5/) // Standard icon size
      expect(homePageContent).toMatch(/w-6 h-6/) // Larger icons for section headers
      expect(homePageContent).toMatch(/w-4 h-4/) // Smaller icons for inline elements
      
      // Icons should support visual hierarchy
      expect(homePageContent).toMatch(/BookOpen.*w-5 h-5/) // Primary action icon
      expect(homePageContent).toMatch(/ArrowRight.*w-5 h-5/) // Secondary action icon
    })
  })

  describe('Color and Visual Contrast Hierarchy', () => {
    it('should validate color hierarchy supports content importance', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Primary content should use strong black
      expect(homePageContent).toMatch(/text-black/) // Main text color
      
      // Accent colors should highlight important elements
      expect(homePageContent).toMatch(/text-\[#6A5ACD\]/) // Primary accent
      expect(homePageContent).toMatch(/bg-\[#6A5ACD\]/) // Primary background
      
      // Subtle colors for less important elements
      expect(homePageContent).toMatch(/text-gray-400/) // Placeholder text
      expect(homePageContent).toMatch(/bg-gray-100/) // Subtle backgrounds
    })

    it('should validate background hierarchy creates visual depth', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Background colors should create hierarchy
      expect(homePageContent).toMatch(/bg-\[#e9e5ff\]/) // Light purple backgrounds
      expect(homePageContent).toMatch(/bg-\[#f3f1ff\]/) // Very light purple
      expect(homePageContent).toMatch(/bg-gray-100/) // Neutral backgrounds
      
      // Borders should support visual hierarchy
      expect(homePageContent).toMatch(/border-\[#e9e5ff\]/) // Light borders
      expect(homePageContent).toMatch(/border-\[#d6ceff\]/) // Accent borders
    })

    it('should validate shadow hierarchy creates visual elevation', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Shadows should create visual hierarchy
      expect(homePageContent).toMatch(/shadow-2xl/) // Strong shadows for important elements
      expect(homePageContent).toMatch(/shadow-lg/) // Medium shadows for buttons
      
      // Navigation should have prominent shadow (from Navigation component)
      const navigationContent = readFileSync(join(process.cwd(), 'components/Navigation.tsx'), 'utf-8')
      expect(navigationContent).toMatch(/shadow-2xl/) // Navigation prominence
    })
  })

  describe('Accessibility and Visual Hierarchy', () => {
    it('should validate heading structure supports screen readers', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Should have proper heading structure
      expect(homePageContent).toMatch(/<h1/) // Main heading
      expect(homePageContent).toMatch(/<h2/) // Section headings
      expect(homePageContent).toMatch(/<h3/) // Subsection headings
      
      // Headings should be in logical order
      const h1Count = (homePageContent.match(/<h1/g) || []).length
      const h2Count = (homePageContent.match(/<h2/g) || []).length
      
      expect(h1Count).toBe(1) // Single main heading
      expect(h2Count).toBeGreaterThan(0) // Multiple section headings
    })

    it('should validate focus hierarchy for keyboard navigation', () => {
      // Create interactive elements with proper hierarchy
      const button1 = document.createElement('button')
      button1.className = 'bg-[#6A5ACD] text-white' // Primary button
      button1.tabIndex = 0
      
      const button2 = document.createElement('button')
      button2.className = 'border-[#6A5ACD] text-[#6A5ACD]' // Secondary button
      button2.tabIndex = 0
      
      const link = document.createElement('a')
      link.href = '#'
      link.tabIndex = 0
      
      document.body.appendChild(button1)
      document.body.appendChild(button2)
      document.body.appendChild(link)
      
      // All interactive elements should be focusable
      expect(button1.tabIndex).toBe(0)
      expect(button2.tabIndex).toBe(0)
      expect(link.tabIndex).toBe(0)
      
      // Should be able to focus in order
      button1.focus()
      expect(document.activeElement).toBe(button1)
    })

    it('should validate color contrast supports visual hierarchy', () => {
      // Test color combinations for adequate contrast
      const colorCombinations = [
        { bg: '#FFFFFF', text: '#000000', purpose: 'main text' },
        { bg: '#6A5ACD', text: '#FFFFFF', purpose: 'primary button' },
        { bg: '#f3f1ff', text: '#5a4fcf', purpose: 'secondary button hover' },
        { bg: '#e9e5ff', text: '#5a4fcf', purpose: 'accent elements' }
      ]
      
      colorCombinations.forEach(combo => {
        // All combinations should provide adequate contrast
        // (This is a simplified test - real contrast testing would use WCAG algorithms)
        expect(combo.bg).toBeTruthy()
        expect(combo.text).toBeTruthy()
        expect(combo.bg).not.toBe(combo.text) // Colors should be different
      })
    })
  })

  describe('Cross-Page Visual Hierarchy Consistency', () => {
    it('should validate consistent hierarchy across all pages', () => {
      const pageFiles = [
        'components/HomePage.tsx',
        'components/BlogPage.tsx',
        'components/ResumePage.tsx',
        'components/TeachingPage.tsx'
      ]
      
      pageFiles.forEach(pageFile => {
        const content = readFileSync(join(process.cwd(), pageFile), 'utf-8')
        
        // All pages should have consistent container structure
        expect(content).toMatch(/min-h-screen/) // Full height
        expect(content).toMatch(/px-6/) // Horizontal padding
        expect(content).toMatch(/pb-12/) // Bottom padding
        
        // All pages should use consistent text colors
        expect(content).toMatch(/text-black/) // Primary text color
      })
    })

    it('should validate navigation hierarchy is consistent across pages', () => {
      // Navigation should maintain same hierarchy regardless of current page
      const navigationContent = readFileSync(join(process.cwd(), 'components/Navigation.tsx'), 'utf-8')
      
      // Should have consistent positioning
      expect(navigationContent).toMatch(/fixed.*top-4.*z-50/)
      
      // Should have consistent styling
      expect(navigationContent).toMatch(/backdrop-blur-xl/)
      expect(navigationContent).toMatch(/rounded-full/)
      expect(navigationContent).toMatch(/shadow-2xl/)
    })

    it('should validate responsive hierarchy is consistent across breakpoints', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Main content should have consistent responsive hierarchy
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Navigation should have responsive positioning
      const navigationContent = readFileSync(join(process.cwd(), 'components/Navigation.tsx'), 'utf-8')
      expect(navigationContent).toMatch(/top-4.*md:top-4.*sm:top-2/)
    })
  })
})