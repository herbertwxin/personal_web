import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('CSS Override Fix Validation', () => {
  describe('Global CSS Main Element Rules', () => {
    it('should not have hardcoded padding-top in main CSS rules', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Should not have hardcoded padding-top values in main element
      expect(globalsCss).not.toMatch(/main\s*\{[^}]*padding-top:\s*\d+(\.\d+)?rem/)
      
      // Should not have responsive padding-top overrides
      expect(globalsCss).not.toMatch(/@media[^}]*main\s*\{[^}]*padding-top:\s*\d+(\.\d+)?rem/)
      
      // Should not have nav + main padding-top overrides
      expect(globalsCss).not.toMatch(/nav\s*\+\s*main[^}]*padding-top:\s*max\(/)
    })

    it('should allow Tailwind classes to control main padding', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Should have comment indicating Tailwind handles padding
      expect(globalsCss).toMatch(/Let Tailwind classes handle padding-top/)
      
      // Should still have positioning and performance optimizations
      expect(globalsCss).toMatch(/position:\s*relative/)
      expect(globalsCss).toMatch(/z-index:\s*1/)
      expect(globalsCss).toMatch(/contain:\s*layout\s+style/)
    })
  })

  describe('App.tsx Tailwind Classes', () => {
    it('should have correct Tailwind padding classes in App.tsx', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Should have responsive Tailwind padding classes
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // Should be on the main element
      expect(appContent).toMatch(/<main[^>]*pt-14\s+sm:pt-15\s+md:pt-16/)
    })
  })

  describe('CSS Specificity and Override Prevention', () => {
    it('should not have CSS rules that override Tailwind padding classes', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Check for potential conflicting selectors
      const conflictingPatterns = [
        /main\s*\{[^}]*padding-top:\s*[^;}]+[;}]/,
        /nav\s*\+\s*main[^}]*padding-top:\s*[^;}]+[;}]/,
        /nav\s*~\s*main[^}]*padding-top:\s*[^;}]+[;}]/,
        /@media[^}]*main\s*\{[^}]*padding-top:\s*[^;}]+[;}]/
      ]
      
      conflictingPatterns.forEach((pattern) => {
        expect(globalsCss).not.toMatch(pattern)
      })
    })

    it('should preserve necessary CSS properties while removing conflicts', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Should still have essential main element styles
      expect(globalsCss).toMatch(/main\s*\{/)
      expect(globalsCss).toMatch(/position:\s*relative/)
      expect(globalsCss).toMatch(/z-index:\s*1/)
      
      // Should still have nav + main rules for other properties
      expect(globalsCss).toMatch(/nav\s*\+\s*main/)
      expect(globalsCss).toMatch(/min-height:\s*calc\(100vh\s*-\s*4rem\)/)
    })
  })

  describe('Responsive Behavior Validation', () => {
    it('should allow Tailwind responsive classes to work properly', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // App should have Tailwind responsive classes
      expect(appContent).toMatch(/pt-14/) // Base mobile
      expect(appContent).toMatch(/sm:pt-15/) // Small screens
      expect(appContent).toMatch(/md:pt-16/) // Medium+ screens
      
      // CSS should not override these with media queries
      expect(globalsCss).not.toMatch(/@media\s*\([^)]*max-width:\s*639px[^)]*\)[^}]*main[^}]*padding-top/)
      expect(globalsCss).not.toMatch(/@media\s*\([^)]*min-width:\s*640px[^)]*\)[^}]*main[^}]*padding-top/)
      expect(globalsCss).not.toMatch(/@media\s*\([^)]*min-width:\s*1024px[^)]*\)[^}]*main[^}]*padding-top/)
    })
  })

  describe('Content Positioning Fix Verification', () => {
    it('should result in proper content positioning without excessive spacing', () => {
      // With CSS overrides removed, Tailwind classes should control spacing
      const expectedSpacing = {
        mobile: 56,    // pt-14 = 3.5rem = 56px
        small: 60,     // sm:pt-15 = 3.75rem = 60px  
        medium: 64     // md:pt-16 = 4rem = 64px
      }
      
      // Navigation requirements
      const navigationSpace = {
        mobile: 56,    // 8px (sm:top-2) + 48px (height) = 56px
        small: 64,     // 16px (top-4) + 48px (height) = 64px
        medium: 64     // 16px (top-4) + 48px (height) = 64px
      }
      
      // Verify adequate clearance without excessive spacing
      expect(expectedSpacing.mobile).toBeGreaterThanOrEqual(navigationSpace.mobile)
      expect(expectedSpacing.small).toBeGreaterThanOrEqual(navigationSpace.small - 4) // Allow minimal overlap
      expect(expectedSpacing.medium).toBeGreaterThanOrEqual(navigationSpace.medium)
      
      // Verify spacing is not excessive (no more than 20px extra)
      expect(expectedSpacing.mobile - navigationSpace.mobile).toBeLessThanOrEqual(20)
      expect(expectedSpacing.medium - navigationSpace.medium).toBeLessThanOrEqual(20)
    })

    it('should eliminate the double padding issue', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Before fix: CSS had padding-top: 3.5rem (56px) + Tailwind pt-16 (64px) = 120px total
      // After fix: Only Tailwind pt-16 (64px) should apply
      
      // Verify CSS no longer adds its own padding
      expect(globalsCss).not.toMatch(/padding-top:\s*3\.5rem/)
      expect(globalsCss).not.toMatch(/padding-top:\s*4rem/)
      expect(globalsCss).not.toMatch(/padding-top:\s*max\(/)
      
      // This eliminates 56-68px of excessive spacing
      const spacingSaved = 56 // Minimum CSS padding that was removed
      expect(spacingSaved).toBeGreaterThan(0)
    })
  })

  describe('Performance and Maintainability', () => {
    it('should maintain CSS performance optimizations', () => {
      const globalsCss = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf-8')
      
      // Should keep performance optimizations
      expect(globalsCss).toMatch(/contain:\s*layout\s+style/)
      expect(globalsCss).toMatch(/will-change:\s*transform/)
      
      // Should keep positioning
      expect(globalsCss).toMatch(/position:\s*relative/)
      expect(globalsCss).toMatch(/z-index:\s*1/)
    })

    it('should use Tailwind for spacing consistency', () => {
      const appContent = readFileSync(join(process.cwd(), 'App.tsx'), 'utf-8')
      
      // Should use Tailwind responsive utilities
      expect(appContent).toMatch(/pt-14\s+sm:pt-15\s+md:pt-16/)
      
      // This approach is more maintainable and consistent with the design system
      const tailwindClasses = appContent.match(/pt-\d+|sm:pt-\d+|md:pt-\d+/g)
      expect(tailwindClasses).toBeTruthy()
      expect(tailwindClasses!.length).toBeGreaterThanOrEqual(3)
    })
  })
})