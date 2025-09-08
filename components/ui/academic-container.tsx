import React from 'react'
import { cn } from './utils'
import { useAcademicLayout } from '../../hooks/useAcademicLayout'

interface AcademicContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

interface AcademicContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: 'div' | 'main' | 'section' | 'article'
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

export function AcademicContainer({ 
  children, 
  className,
  maxWidth = 'lg',
  padding = 'md',
  as: Component = 'div',
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby
}: AcademicContainerProps) {
  const layout = useAcademicLayout()
  
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }
  
  const paddingClasses = {
    none: '',
    sm: layout.isMobile ? 'px-4' : 'px-6',
    md: layout.isMobile ? 'px-4' : layout.isTablet ? 'px-6' : 'px-8',
    lg: layout.isMobile ? 'px-4' : layout.isTablet ? 'px-8' : 'px-12'
  }
  
  return (
    <Component 
      className={cn(
        'w-full mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        // Responsive spacing adjustments
        layout.isMobile && 'space-y-6',
        layout.isTablet && 'space-y-8', 
        layout.isDesktop && 'space-y-10',
        layout.isLargeDesktop && 'space-y-12',
        className
      )}
      id={id || (Component === 'main' ? 'main-content' : undefined)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </Component>
  )
}

// Academic Page Header Component
interface AcademicPageHeaderProps {
  title: string
  subtitle?: string
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  id?: string
}

export function AcademicPageHeader({ 
  title, 
  subtitle, 
  className, 
  level = 1,
  id 
}: AcademicPageHeaderProps) {
  const layout = useAcademicLayout()
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <header 
      className={cn('mb-8', className)}
      role="banner"
    >
      <HeadingTag 
        className={cn(
          'font-normal text-foreground',
          layout.isMobile ? 'text-2xl' : layout.isTablet ? 'text-3xl' : 'text-4xl',
          'mb-2'
        )}
        style={{ 
          fontSize: 'var(--academic-font-size-page-title)',
          fontWeight: 'var(--academic-font-weight-page-title)',
          lineHeight: 'var(--academic-line-height-tight)'
        }}
        id={id || 'page-title'}
      >
        {title}
      </HeadingTag>
      {subtitle && (
        <p 
          className={cn(
            'text-muted-foreground',
            layout.isMobile ? 'text-sm' : 'text-base'
          )}
          style={{
            fontSize: 'var(--academic-font-size-body)',
            fontWeight: 'var(--academic-font-weight-body)',
            lineHeight: 'var(--academic-line-height-normal)'
          }}
          id={id ? `${id}-subtitle` : 'page-subtitle'}
          aria-describedby={id || 'page-title'}
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}

// Academic Content Section Component
interface AcademicContentSectionProps {
  children: React.ReactNode
  className?: string
  spacing?: 'tight' | 'normal' | 'loose'
}

export function AcademicContentSection({ 
  children, 
  className,
  spacing = 'normal'
}: AcademicContentSectionProps) {
  const layout = useAcademicLayout()
  
  const spacingClasses = {
    tight: layout.isMobile ? 'space-y-4' : 'space-y-6',
    normal: layout.isMobile ? 'space-y-6' : layout.isTablet ? 'space-y-8' : 'space-y-10',
    loose: layout.isMobile ? 'space-y-8' : layout.isTablet ? 'space-y-12' : 'space-y-16'
  }
  
  return (
    <section className={cn(spacingClasses[spacing], className)}>
      {children}
    </section>
  )
}

// Responsive Academic Grid Component
interface AcademicGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3
  className?: string
}

export function AcademicGrid({ children, columns = 1, className }: AcademicGridProps) {
  const layout = useAcademicLayout()
  
  // Force single column on mobile regardless of columns prop
  const actualColumns = layout.isMobile ? 1 : layout.isTablet && columns > 2 ? 2 : columns
  
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }
  
  return (
    <div 
      className={cn(
        'grid gap-6',
        gridClasses[actualColumns],
        layout.isMobile && 'gap-4',
        layout.isTablet && 'gap-6',
        layout.isDesktop && 'gap-8',
        className
      )}
    >
      {children}
    </div>
  )
}