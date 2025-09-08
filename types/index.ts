// Common type definitions for the application

export interface Publication {
  id: string
  title: string
  journal: string
  year: string
  citations: number
  type: 'Research' | 'Policy' | 'Review'
  authors?: string[]
  abstract?: string
  doi?: string
  url?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  author?: string
  published: boolean
}

export interface StackModel {
  id: string
  name: string
  description: string
  category: string
  complexity: 'Basic' | 'Intermediate' | 'Advanced'
  equations?: string[]
  parameters?: Record<string, any>
  references?: string[]
}

export interface NavigationItem {
  id: string
  label: string
  href?: string
  icon?: string
  children?: NavigationItem[]
}

export interface AppState {
  currentPage: string
  currentModelId: string | null
  currentBlogId: string | null
  searchMode: boolean
  searchQuery: string
}

// Utility types
export type PageId =
  | 'home'
  | 'publications'
  | 'teaching'
  | 'resume'
  | 'blog'
  | 'stack'
  | 'stack-model'
  | 'blog-post'

export type Theme = 'light' | 'dark' | 'system'

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Component prop types
export interface PageProps {
  className?: string
}

export interface NavigationProps {
  currentPage: string
  onPageChange: (page: PageId) => void
}

// API response types
export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  error?: string
}

// Form types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SearchFilters {
  type?: string
  year?: string
  category?: string
  tags?: string[]
}
