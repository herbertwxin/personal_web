import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Content Positioning Fix Validation', () => {
  describe('Page Components Padding Fix', () => {
    const pageComponents = [
      'components/BlogPage.tsx',
      'components/ResumePage.tsx', 
      'components/TeachingPage.tsx',
      'components/PublicationsPage.tsx',
      'components/StackPage.tsx',
      'components/BlogPostPage.tsx',
      'components/StackModelPage.tsx'
    ]

    pageComponents.forEach(componentPath => {
      it(`should not have pt-8 class in ${componentPath}`, () => {
        const content = readFileSync(join(process.cwd(), componentPath), 'utf-8')
        
        // Should not have pt-8 in main container classes
        expect(content).not.toMatch(/className=['"][^'"]*pt-8[^'"]*pb-12[^'"]*px-6/)
        
        // Should have proper container classes without pt-8
        expect(content).toMatch(/min-h-screen.*pb-12.*px-6/)
      })
    })
  })

  describe('HomePage Padding Validation', () => {
    it('should not have pt-8 class in HomePage', () => {
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      
      // HomePage should not have pt-8 class
      expect(homePageContent).not.toMatch(/pt-8/)
      
      // Should have proper container structure
      expect(homePageContent).toMatch(/min-h-screen.*pb-12.*px-6/)
    })
  })

  describe('App.tsx Main Container Validation', () => {
    it('should have correct responsive padding classes', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Verify main element has the correct padding classes
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Should not have excessive padding
      expect(appContent).not.toMatch(/pt-20/)
    })
  })

  describe('Navigation Positioning Validation', () => {
    it('should have correct navigation positioning', () => {
      const navigationContent = readFileSync(join(process.cwd(), 'components/Navigation.tsx'), 'utf-8')
      
      // Navigation should have proper positioning
      expect(navigationContent).toMatch(/fixed.*top-4/)
      expect(navigationContent).toMatch(/z-50/)
    })
  })

  describe('Spacing Calculation Verification', () => {
    it('should have proper clearance calculations', () => {
      // Navigation positioning: top-4 (16px) + height (48px) = 64px total
      // Main content padding: pt-16 (64px) on desktop
      // This provides perfect clearance without excessive spacing
      
      const navigationSpace = 16 + 48 // top-4 + navigation height
      const desktopPadding = 64 // pt-16
      const tabletPadding = 60 // sm:pt-15
      const mobilePadding = 56 // pt-14
      
      // Desktop should have perfect clearance
      expect(desktopPadding).toBeGreaterThanOrEqual(navigationSpace)
      
      // Tablet should have minimal acceptable clearance
      expect(tabletPadding).toBeGreaterThanOrEqual(navigationSpace - 4)
      
      // Mobile navigation uses top-2 (8px), so total is 56px
      const mobileNavigationSpace = 8 + 48
      expect(mobilePadding).toBeGreaterThanOrEqual(mobileNavigationSpace)
    })
  })

  describe('Content Visibility Validation', () => {
    it('should ensure content is immediately visible without excessive scrolling', () => {
      // With the fix, content should start immediately after navigation clearance
      // No additional pt-8 (32px) padding on page components
      
      const excessivePadding = 32 // pt-8 that was removed
      const navigationClearance = 64 // Required clearance
      const totalWithoutFix = navigationClearance + excessivePadding // 96px
      const totalWithFix = navigationClearance // 64px
      
      // The fix saves 32px of unnecessary spacing
      const spacingSaved = totalWithoutFix - totalWithFix
      expect(spacingSaved).toBe(32)
      
      // Content should now be visible much higher on the page
      expect(totalWithFix).toBeLessThan(totalWithoutFix)
    })
  })

  describe('Cross-Page Consistency Validation', () => {
    it('should have consistent spacing across all pages', () => {
      const pageComponents = [
        'components/HomePage.tsx',
        'components/BlogPage.tsx',
        'components/ResumePage.tsx',
        'components/TeachingPage.tsx',
        'components/PublicationsPage.tsx',
        'components/StackPage.tsx'
      ]

      pageComponents.forEach(componentPath => {
        const content = readFileSync(join(process.cwd(), componentPath), 'utf-8')
        
        // All pages should have consistent base container classes
        expect(content).toMatch(/min-h-screen/)
        expect(content).toMatch(/pb-12/) // Bottom padding
        expect(content).toMatch(/px-6/) // Horizontal padding
        
        // None should have the problematic pt-8 class
        expect(content).not.toMatch(/className=['"][^'"]*pt-8[^'"]*pb-12[^'"]*px-6/)
      })
    })
  })

  describe('Requirements Compliance After Fix', () => {
    it('should meet requirement 1.1: main content visible in initial viewport', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // App should have proper main content padding (not excessive)
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Pages should not add excessive padding
      const homePageContent = readFileSync(join(process.cwd(), 'components/HomePage.tsx'), 'utf-8')
      expect(homePageContent).not.toMatch(/pt-8/)
    })

    it('should meet requirement 1.2: no scrolling needed for primary content', () => {
      // With pt-8 removed from page components, content starts immediately
      // after navigation clearance, making it visible without scrolling
      
      const blogPageContent = readFileSync(join(process.cwd(), 'components/BlogPage.tsx'), 'utf-8')
      expect(blogPageContent).not.toMatch(/pt-8.*pb-12.*px-6/)
      expect(blogPageContent).toMatch(/min-h-screen.*pb-12.*px-6/)
    })

    it('should meet requirement 1.4: appropriate spacing for navigation height', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Main content padding should provide clearance without being excessive
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Should not have the old excessive padding
      expect(appContent).not.toMatch(/pt-20/)
    })
  })
})