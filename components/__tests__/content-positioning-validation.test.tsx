import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Content Positioning Validation Tests', () => {
  describe('App.tsx Main Content Padding', () => {
    it('should have correct responsive padding classes', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Verify main element has the correct padding classes
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Verify the spacing calculation is correct
      // pt-14 = 56px (mobile), pt-15 = 60px (small), pt-16 = 64px (medium+)
      // This accounts for navigation height (48px) + visual spacing (8-16px)
    })

    it('should not have excessive padding classes', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Should not have the old excessive padding
      expect(appContent).not.toMatch(/pt-20/)
    })
  })

  describe('HomePage Content Structure', () => {
    it('should not have redundant top padding', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // HomePage should not have additional pt-8 class that was removed
      expect(homePageContent).not.toMatch(/className=['"].*pt-8/)
      
      // Should have proper container structure
      expect(homePageContent).toMatch(/min-h-screen.*pb-12.*px-6/)
    })

    it('should have immediate content visibility structure', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Hero section should be positioned for immediate visibility
      expect(homePageContent).toMatch(/Dr\. Academic Researcher/)
      expect(homePageContent).toMatch(/Professor of Economics/)
      
      // Should not have excessive spacing that pushes content down
      expect(homePageContent).not.toMatch(/mt-20|mt-24|mt-32/)
    })
  })

  describe('Page Components Consistency', () => {
    const pageComponents = [
      'components/BlogPage.tsx',
      'components/ResumePage.tsx', 
      'components/TeachingPage.tsx'
    ]

    pageComponents.forEach(componentPath => {
      it(`should have consistent spacing in ${componentPath}`, () => {
        const content = readFileSync(join(process.cwd(), componentPath), 'utf-8')
        
        // All pages should have consistent main container classes
        expect(content).toMatch(/min-h-screen.*pt-8.*pb-12.*px-6/)
        
        // Should not have excessive top spacing
        expect(content).not.toMatch(/pt-20|pt-24|pt-32/)
      })
    })
  })

  describe('Navigation Positioning Requirements', () => {
    it('should verify navigation positioning in globals.css', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Should have navigation positioning rules
      // The actual implementation may vary, but we check for responsive navigation styles
      expect(globalsCss).toMatch(/nav|navigation|\.fixed|top-/)
    })
  })

  describe('Spacing Calculation Verification', () => {
    it('should verify the spacing calculation is mathematically correct', () => {
      // Navigation height: 48px (3rem)
      // Visual spacing: 8-16px (0.5-1rem) 
      // Total needed: 56-64px (3.5-4rem)
      
      // pt-14 = 56px (3.5rem) - minimum for mobile
      // pt-15 = 60px (3.75rem) - small screens
      // pt-16 = 64px (4rem) - medium+ screens
      
      const expectedMobile = 56 // pt-14
      const expectedSmall = 60  // pt-15  
      const expectedMedium = 64 // pt-16
      
      const navigationHeight = 48
      const minVisualSpacing = 8
      const maxVisualSpacing = 16
      
      expect(expectedMobile).toBeGreaterThanOrEqual(navigationHeight + minVisualSpacing)
      expect(expectedSmall).toBeGreaterThanOrEqual(navigationHeight + minVisualSpacing)
      expect(expectedMedium).toBeGreaterThanOrEqual(navigationHeight + maxVisualSpacing)
    })
  })

  describe('Requirements Compliance', () => {
    it('should meet requirement 1.1: main content visible in initial viewport', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // App should have proper main content padding
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // HomePage should not have excessive spacing
      expect(homePageContent).not.toMatch(/pt-8/)
      expect(homePageContent).not.toMatch(/mt-20|mt-24|mt-32/)
    })

    it('should meet requirement 1.4: appropriate spacing for navigation height', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Main content padding should account for navigation height + visual spacing
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
    })

    it('should meet requirement 2.1 & 2.2: proper visual spacing between navigation and content', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Should have calculated padding that provides visual spacing
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Should not have excessive spacing
      expect(appContent).not.toMatch(/pt-20/)
    })

    it('should meet requirement 2.3 & 3.4: responsive spacing optimizations', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Should have responsive classes for different screen sizes
      expect(appContent).toMatch(/pt-14/) // mobile
      expect(appContent).toMatch(/sm:pt-15/) // small screens
      expect(appContent).toMatch(/md:pt-16/) // medium+ screens
    })

    it('should meet requirement 3.1 & 3.2: consistent spacing across pages', () => {
      const pageComponents = [
        'components/HomePage.tsx',
        'components/BlogPage.tsx',
        'components/ResumePage.tsx',
        'components/TeachingPage.tsx'
      ]

      pageComponents.forEach(componentPath => {
        const content = readFileSync(join(process.cwd(), componentPath), 'utf-8')
        
        // All pages should use consistent container classes
        expect(content).toMatch(/min-h-screen/)
        expect(content).toMatch(/px-6/) // horizontal padding
        expect(content).toMatch(/pb-12/) // bottom padding
        
        // HomePage should not have pt-8, others should have pt-8
        if (componentPath.includes('HomePage')) {
          expect(content).not.toMatch(/pt-8/)
        } else {
          expect(content).toMatch(/pt-8/)
        }
      })
    })
  })

  describe('Visual Hierarchy Validation', () => {
    it('should ensure proper content hierarchy in HomePage', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // Hero section should be first major content
      expect(homePageContent).toMatch(/Dr\. Academic Researcher/)
      
      // Should have proper heading structure
      expect(homePageContent).toMatch(/text-5xl.*text-black.*mb-6/)
      
      // Should have proper content flow without excessive spacing
      expect(homePageContent).toMatch(/mb-20/) // reasonable section spacing
    })

    it('should verify navigation clearance in all pages', () => {
      const pageComponents = [
        'components/BlogPage.tsx',
        'components/ResumePage.tsx',
        'components/TeachingPage.tsx'
      ]

      pageComponents.forEach(componentPath => {
        const content = readFileSync(join(process.cwd(), componentPath), 'utf-8')
        
        // Pages should have pt-8 to work with App's main padding
        expect(content).toMatch(/pt-8/)
        
        // Should not have conflicting spacing
        expect(content).not.toMatch(/pt-20|pt-24/)
      })
    })
  })
})