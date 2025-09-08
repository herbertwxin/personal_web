// Application constants

export const APP_CONFIG = {
  name: 'Academic Portfolio',
  description: 'Professional academic portfolio and research showcase',
  version: '1.0.0',
  author: 'Dr. Academic Researcher',
  email: 'researcher@university.edu',
  university: 'University of Economics',
  department: 'Department of Economics',
} as const

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'publications', label: 'Publications' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'resume', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'stack', label: 'Models' },
] as const

export const PUBLICATION_TYPES = [
  'Research',
  'Policy',
  'Review',
  'Book Chapter',
  'Conference Paper',
] as const

export const COMPLEXITY_LEVELS = ['Basic', 'Intermediate', 'Advanced'] as const

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const OFFICE_HOURS = [
  { day: 'Monday', time: '2:00 - 4:00 PM' },
  { day: 'Wednesday', time: '10:00 - 12:00 PM' },
  { day: 'Friday', time: '1:00 - 3:00 PM' },
] as const
