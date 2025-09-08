import React from 'react'
import { cn } from './utils'

interface AcademicListProps {
  children: React.ReactNode
  variant?: 'default' | 'compact' | 'dense' | 'spaced'
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  id?: string
}

interface AcademicListItemProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  'aria-describedby'?: string
  id?: string
}

interface AcademicListItemTitleProps {
  children: React.ReactNode
  className?: string
  level?: 2 | 3 | 4 | 5 | 6
  id?: string
}

interface AcademicListItemContentProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  id?: string
}

interface AcademicListItemMetadataProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  id?: string
}

interface AcademicListItemActionsProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  id?: string
}

interface AcademicSectionHeaderProps {
  children: React.ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  id?: string
  style?: React.CSSProperties
}

interface AcademicNestedListProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  id?: string
}

interface AcademicInlineMetadataProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  id?: string
}

interface AcademicBadgeProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  id?: string
}

// Main Academic List Container
export function AcademicList({ 
  children, 
  variant = 'default', 
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  id
}: AcademicListProps) {
  return (
    <section 
      className={cn(
        'academic-list',
        variant !== 'default' && `academic-list-${variant}`,
        className
      )}
      role="list"
      aria-label={ariaLabel || 'Academic content list'}
      aria-labelledby={ariaLabelledby}
      id={id}
    >
      {children}
    </section>
  )
}

// Academic List Item
export function AcademicListItem({ 
  children, 
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  id
}: AcademicListItemProps) {
  return (
    <article 
      className={cn('academic-list-item', className)}
      role="listitem"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      id={id}
      tabIndex={0}
    >
      {children}
    </article>
  )
}

// Academic List Item Title
export function AcademicListItemTitle({ 
  children, 
  className, 
  level = 3,
  id
}: AcademicListItemTitleProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <HeadingTag 
      className={cn('academic-list-item-title', className)}
      id={id}
    >
      {children}
    </HeadingTag>
  )
}

// Academic List Item Content
export function AcademicListItemContent({ 
  children, 
  className,
  'aria-label': ariaLabel,
  id
}: AcademicListItemContentProps) {
  return (
    <div 
      className={cn('academic-list-item-content', className)}
      aria-label={ariaLabel}
      id={id}
    >
      {children}
    </div>
  )
}

// Academic List Item Metadata
export function AcademicListItemMetadata({ 
  children, 
  className,
  'aria-label': ariaLabel,
  id
}: AcademicListItemMetadataProps) {
  return (
    <div 
      className={cn('academic-list-item-metadata', className)}
      role="group"
      aria-label={ariaLabel || 'Item metadata'}
      id={id}
    >
      {children}
    </div>
  )
}

// Academic List Item Actions
export function AcademicListItemActions({ 
  children, 
  className,
  'aria-label': ariaLabel,
  id
}: AcademicListItemActionsProps) {
  return (
    <div 
      className={cn('academic-list-item-actions', className)}
      role="group"
      aria-label={ariaLabel || 'Available actions'}
      id={id}
    >
      {children}
    </div>
  )
}

// Academic Section Header
export function AcademicSectionHeader({ 
  children, 
  className, 
  level = 2,
  id,
  style
}: AcademicSectionHeaderProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <HeadingTag 
      className={cn('academic-section-header', className)}
      id={id}
      style={style}
    >
      {children}
    </HeadingTag>
  )
}

// Academic Nested List
export function AcademicNestedList({ 
  children, 
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  id
}: AcademicNestedListProps) {
  return (
    <div 
      className={cn('academic-nested-list', className)}
      role="list"
      aria-label={ariaLabel || 'Nested list items'}
      aria-labelledby={ariaLabelledby}
      id={id}
    >
      {children}
    </div>
  )
}

// Academic Inline Metadata
export function AcademicInlineMetadata({ 
  children, 
  className,
  'aria-label': ariaLabel,
  id
}: AcademicInlineMetadataProps) {
  return (
    <span 
      className={cn('academic-inline-metadata', className)}
      aria-label={ariaLabel}
      id={id}
    >
      {children}
    </span>
  )
}

// Academic Badge
export function AcademicBadge({ 
  children, 
  className,
  'aria-label': ariaLabel,
  id
}: AcademicBadgeProps) {
  return (
    <span 
      className={cn('academic-badge', className)}
      role="status"
      aria-label={ariaLabel}
      id={id}
    >
      {children}
    </span>
  )
}

// Compound component exports
AcademicList.Item = AcademicListItem
AcademicList.ItemTitle = AcademicListItemTitle
AcademicList.ItemContent = AcademicListItemContent
AcademicList.ItemMetadata = AcademicListItemMetadata
AcademicList.ItemActions = AcademicListItemActions
AcademicList.SectionHeader = AcademicSectionHeader
AcademicList.NestedList = AcademicNestedList
AcademicList.InlineMetadata = AcademicInlineMetadata
AcademicList.Badge = AcademicBadge