import { describe, expect, it } from 'vitest'
import { dataAttr, isArray, isEmpty, isEmptyArray, isEmptyObject, isNumeric, isObject } from '../assertion'

describe('assertion utils', () => {
  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
    })

    it('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false)
      expect(isArray('string')).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
    })
  })

  describe('isEmptyArray', () => {
    it('should return true for empty arrays', () => {
      expect(isEmptyArray([])).toBe(true)
    })

    it('should return false for non-empty arrays', () => {
      expect(isEmptyArray([1])).toBe(false)
    })
  })

  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ a: 1 })).toBe(true)
    })

    it('should return false for arrays', () => {
      expect(isObject([])).toBe(false)
    })

    it('should return false for primitives', () => {
      expect(isObject(null)).toBe(false)
      expect(isObject(undefined)).toBe(false)
      expect(isObject('string')).toBe(false)
      expect(isObject(123)).toBe(false)
    })
  })

  describe('isEmptyObject', () => {
    it('should return true for empty objects', () => {
      expect(isEmptyObject({})).toBe(true)
    })

    it('should return false for non-empty objects', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false)
    })
  })

  describe('isEmpty', () => {
    it('should return true for empty values', () => {
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
    })

    it('should return false for non-empty values', () => {
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty('text')).toBe(false)
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(false)).toBe(false)
    })
  })

  describe('dataAttr', () => {
    it('should return "true" for true condition', () => {
      expect(dataAttr(true)).toBe('true')
    })

    it('should return undefined for false condition', () => {
      expect(dataAttr(false)).toBe(undefined)
      expect(dataAttr(undefined)).toBe(undefined)
    })
  })

  describe('isNumeric', () => {
    it('should return true for positive numbers', () => {
      expect(isNumeric(1)).toBe(true)
      expect(isNumeric('10')).toBe(true)
      expect(isNumeric(100)).toBe(true)
    })

    it('should return true for zero', () => {
      expect(isNumeric(0)).toBe(true)
      expect(isNumeric('0')).toBe(true)
    })

    it('should return false for negative numbers', () => {
      expect(isNumeric(-1)).toBe(false)
      expect(isNumeric('-10')).toBe(false)
    })

    it('should return false for non-numeric values', () => {
      expect(isNumeric(undefined)).toBe(false)
      expect(isNumeric('abc')).toBe(false)
    })
  })
})
