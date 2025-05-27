import { describe, test, expect } from 'vitest'
import { formatDateToISO, isValidDate, getDaysOverdue } from '@/utils/dateHelpers'

describe('formatDateToISO', () => {
  test('should format current date to ISO string', () => {
    const today = new Date()
    const result = formatDateToISO(today)
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/) // Tjekker format YYYY-MM-DD
  })

  test('should format date from form input', () => {
    const formDate = new Date('2024-03-20T00:00:00')
    expect(formatDateToISO(formDate)).toBe('2024-03-20')
  })

  test('should return null for empty form input', () => {
    expect(formatDateToISO('')).toBeNull()
  })
})

describe('isValidDate', () => {
  test('should return true for Date object from datepicker', () => {
    const date = new Date()
    expect(isValidDate(date)).toBe(true)
  })

  test('should return true for ISO date string', () => {
    expect(isValidDate('2024-03-20')).toBe(true)
  })

  test('should return false for null', () => {
    expect(isValidDate(null)).toBe(false)
  })

  test('should return false for empty string', () => {
    expect(isValidDate('')).toBe(false)
  })
})

describe('getDaysOverdue', () => {
  test('should return 0 for today', () => {
    const today = new Date()
    expect(getDaysOverdue(today)).toBe(0)
  })

  test('should return 1 for yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(getDaysOverdue(yesterday)).toBe(1)
  })

  test('should return 7 for last week', () => {
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)
    expect(getDaysOverdue(lastWeek)).toBe(7)
  })

  test('should return 0 for future date', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    expect(getDaysOverdue(tomorrow)).toBe(0)
  })
})
