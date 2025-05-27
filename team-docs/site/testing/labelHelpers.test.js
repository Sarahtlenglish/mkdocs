import { describe, test, expect } from 'vitest'
import { getStatusLabel, getBannerType, getRoleLabel } from '@/utils/labelHelpers'

describe('getStatusLabel', () => {
  test('should return correct label for afvigelse', () => {
    expect(getStatusLabel('afvigelse')).toBe('Afvigelse')
  })

  test('should return correct label for overskredet', () => {
    expect(getStatusLabel('overskredet')).toBe('Overskredet')
  })
})

describe('getBannerType', () => {
  test('should return completed for udført', () => {
    expect(getBannerType('udført')).toBe('completed')
  })

  test('should return inactive for afvigelse', () => {
    expect(getBannerType('afvigelse')).toBe('deviation')
  })
})

describe('getRoleLabel', () => {
  test('should return correct label for service_bruger', () => {
    expect(getRoleLabel('service_bruger')).toBe('Service Bruger')
  })

  test('should return correct label for facility_manager', () => {
    expect(getRoleLabel('facility_manager')).toBe('Facility Manager')
  })

  test('should return correct label for administrator', () => {
    expect(getRoleLabel('administrator')).toBe('Administrator')
  })

  test('should return correct label for visnings_bruger', () => {
    expect(getRoleLabel('visnings_bruger')).toBe('Visnings Bruger')
  })

  test('should return input value for unknown role', () => {
    expect(getRoleLabel('unknown')).toBe('unknown')
  })
})
