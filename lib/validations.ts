// Validation utilities and schemas

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_REGEX = /^[+]?[1-9][\d]{0,15}$/

// Validation functions
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isValidYear(year: string | number): boolean {
  const yearNum = typeof year === 'string' ? parseInt(year, 10) : year
  const currentYear = new Date().getFullYear()
  return yearNum >= 1900 && yearNum <= currentYear + 10
}

// Form validation schemas
export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
}): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.subject.trim()) {
    errors.subject = 'Subject is required'
  } else if (data.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validatePublication(data: {
  title: string
  journal: string
  year: string
  type: string
}): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.title.trim()) {
    errors.title = 'Title is required'
  }

  if (!data.journal.trim()) {
    errors.journal = 'Journal is required'
  }

  if (!data.year.trim()) {
    errors.year = 'Year is required'
  } else if (!isValidYear(data.year)) {
    errors.year = 'Please enter a valid year'
  }

  if (!data.type.trim()) {
    errors.type = 'Publication type is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
