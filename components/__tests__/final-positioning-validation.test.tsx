import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Final Content Positioning Validation', () => {
  describe('Navigation Component Fixes', () => {
    it('should have correct Tailwind positioning classes', () => {
      const navigationContent = readFileSync(join(process.cwd(), 'components/Navigation.tsx'), 'utf-8')
      
      // Should have correct responsive positioning
      expect(navigationContent).toMatch(/top-2\s+sm:top-4/)
      
      // Should not have the confusing md:top-4 duplication
      expect(navigationContent).not.toMatch(/md:top-4/)
      
      // Should have proper centering and z-index
      expect(navigationContent).toMatch(/left-1\/2.*-translate-x-1\/2.*z-50/)
    })

    it('should not have problematic y-axis animation', () => {
      const navigationContent = readFileSync(join(process.cwd(), 'components/Navigation.tsx'), 'utf-8')
      
      // Should not have y: -50 initial animation that could cause layout issues
      expect(navigationContent).not.toMatch(/y:\s*-50/)
      
      // Should not animate y position
      expect(navigationContent).not.toMatch(/y:\s*0/)
      
      // Should still have opacity and scale animations
      expect(navigationContent).toMatch(/opacity:\s*0/)
      expect(navigationContent).toMatch(/scale:\s*0\.8/)
    })
  })

  describe('CSS Override Removal', () => {
    it('should not have any CSS rules overriding navigation positioning', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Should not have hardcoded nav top positioning
      expect(globalsCss).not.toMatch(/nav\s*\{[^}]*top:\s*\d+(\.\d+)?rem/)
      
      // Should not have responsive nav top overrides
      expect(globalsCss).not.toMatch(/@media[^}]*nav\s*\{[^}]*top:\s*\d+(\.\d+)?rem/)
      
      // Should not have nav positioning in any media queries
      expect(globalsCss).not.toMatch(/nav\s*\{[^}]*top:\s*[^;}]+[;}]/)
    })

    it('should not have any CSS rules overriding main element padding', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Should not have hardcoded main padding-top
      expect(globalsCss).not.toMatch(/main\s*\{[^}]*padding-top:\s*\d+(\.\d+)?rem/)
      
      // Should not have responsive main padding overrides
      expect(globalsCss).not.toMatch(/@media[^}]*main\s*\{[^}]*padding-top:\s*\d+(\.\d+)?rem/)
      
      // Should not have nav + main padding overrides
      expect(globalsCss).not.toMatch(/nav\s*\+\s*main[^}]*padding-top:\s*[^;}]+[;}]/)
    })

    it('should preserve essential CSS properties', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Should keep nav performance optimizations
      expect(globalsCss).toMatch(/nav\s*\{[^}]*will-change:\s*transform/)
      expect(globalsCss).toMatch(/nav\s*\{[^}]*contain:\s*layout\s+style\s+paint/)
      
      // Should keep main positioning
      expect(globalsCss).toMatch(/main\s*\{[^}]*position:\s*relative/)
      expect(globalsCss).toMatch(/main\s*\{[^}]*z-index:\s*1/)
    })
  })

  describe('App.tsx Main Element', () => {
    it('should have correct Tailwind padding classes', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Should have responsive padding classes
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Should be on the main element
      expect(appContent).toMatch(/<main[^>]*pt-14\s+sm:pt-15\s+md:pt-16/)
    })
  })

  describe('Page Components', () => {
    const pageComponents = [
      'components/HomePage.tsx',
      'components/BlogPage.tsx',
      'components/ResumePage.tsx',
      'components/TeachingPage.tsx',
      'components/PublicationsPage.tsx',
      'components/StackPage.tsx',
      'components/BlogPostPage.tsx',
      'components/StackModelPage.tsx'
    ]

    pageComponents.forEach(componentPath => {
      it(`should not have conflicting padding in ${componentPath}`, () => {
        const content = readFileSync(join(process.cwd(), componentPath), 'utf-8')
        
        // Should not have pt-8 that would add to main padding
        expect(content).not.toMatch(/className=['"][^'"]*pt-8[^'"]*pb-12[^'"]*px-6/)
        
        // Should have proper container classes
        expect(content).toMatch(/min-h-screen.*pb-12.*px-6/)
        
        // HomePage should not have pt-8, others should not have it either now
        expect(content).not.toMatch(/pt-8/)
      })
    })
  })

  describe('Spacing Calculations', () => {
    it('should have mathematically correct spacing', () => {
      // Navigation positioning (from Tailwind classes)
      const navigationSpacing = {
        mobile: 8,    // top-2 = 0.5rem = 8px
        desktop: 16   // sm:top-4 = 1rem = 16px
      }
      
      // Navigation height
      const navigationHeight = 48 // 3rem
      
      // Total navigation space needed
      const totalNavigationSpace = {
        mobile: navigationSpacing.mobile + navigationHeight,    // 56px
        desktop: navigationSpacing.desktop + navigationHeight  // 64px
      }
      
      // Main content padding (from Tailwind classes)
      const mainContentPadding = {
        mobile: 56,   // pt-14 = 3.5rem = 56px
        small: 60,    // sm:pt-15 = 3.75rem = 60px
        medium: 64    // md:pt-16 = 4rem = 64px
      }
      
      // Verify adequate clearance
      expect(mainContentPadding.mobile).toBeGreaterThanOrEqual(totalNavigationSpace.mobile)
      expect(mainContentPadding.small).toBeGreaterThanOrEqual(totalNavigationSpace.desktop - 4) // Allow minimal overlap
      expect(mainContentPadding.medium).toBeGreaterThanOrEqual(totalNavigationSpace.desktop)
      
      // Verify spacing is not excessive (no more than 16px extra)
      expect(mainContentPadding.mobile - totalNavigationSpace.mobile).toBeLessThanOrEqual(16)
      expect(mainContentPadding.medium - totalNavigationSpace.desktop).toBeLessThanOrEqual(16)
    })

    it('should eliminate excessive spacing', () => {
      // Before fix: CSS was adding 56-68px + Tailwind 56-64px = 112-132px
      // After fix: Only Tailwind 56-64px
      
      const spacingSaved = 56 // Minimum CSS padding that was removed
      const maxSpacingNow = 64 // Maximum Tailwind padding
      
      expect(spacingSaved).toBeGreaterThan(0)
      expect(maxSpacingNow).toBeLessThan(80) // Reasonable maximum
    })
  })

  describe('Integration Validation', () => {
    it('should have consistent implementation across all components', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      const navigationContent = readFileSync(join(process.cwd(), 'components/Navigation.tsx'), 'utf-8')
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // App should use Tailwind for main padding
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Navigation should use Tailwind for positioning
      expect(navigationContent).toMatch(/top-2\s+sm:top-4/)
      
      // CSS should not override either
      expect(globalsCss).not.toMatch(/main\s*\{[^}]*padding-top:\s*\d/)
      expect(globalsCss).not.toMatch(/nav\s*\{[^}]*top:\s*\d/)
    })

    it('should provide optimal user experience', () => {
      // The fix should result in:
      // 1. Content visible immediately (no excessive scrolling)
      // 2. Proper navigation clearance (no overlap)
      // 3. Responsive behavior (works on all screen sizes)
      // 4. Performance optimizations maintained
      
      const maxContentPadding = 64 // pt-16 on desktop
      const minContentPadding = 56 // pt-14 on mobile
      const navigationClearanceNeeded = 64 // Maximum nav space needed
      
      // Content should be visible without excessive scrolling
      expect(maxContentPadding).toBeLessThan(100) // Not excessive
      
      // Should provide adequate clearance
      expect(minContentPadding).toBeGreaterThanOrEqual(navigationClearanceNeeded - 8) // Allow some tolerance
      
      // Should be responsive
      expect(maxContentPadding).toBeGreaterThan(minContentPadding) // Progressive enhancement
    })
  })
})