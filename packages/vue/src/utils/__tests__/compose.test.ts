import { describe, expect, it } from 'vitest'
import { composeSlotClassName, composeTwClassName } from '../compose'

describe('compose utils', () => {
  describe('composeTwClassName', () => {
    it('should return empty string when no arguments', () => {
      const result = composeTwClassName(undefined, undefined)
      expect(result).toBe('')
    })

    it('should merge static class names', () => {
      const result = composeTwClassName('base-class', 'tw-class')
      expect(result).toContain('base-class')
      expect(result).toContain('tw-class')
    })

    it('should handle function className', () => {
      const result = composeTwClassName(
        (props: { isActive: boolean }) => (props.isActive ? 'active' : 'inactive'),
        'tw-class',
      )

      expect(typeof result).toBe('function')
      if (typeof result === 'function') {
        expect(result({ isActive: true })).toContain('active')
        expect(result({ isActive: true })).toContain('tw-class')
      }
    })

    it('should handle function tailwind', () => {
      const result = composeTwClassName(
        'base-class',
        (props: { size: string }) => `size-${props.size}`,
      )

      expect(typeof result).toBe('function')
      if (typeof result === 'function') {
        expect(result({ size: 'md' })).toContain('base-class')
        expect(result({ size: 'md' })).toContain('size-md')
      }
    })

    it('should handle both functions', () => {
      const result = composeTwClassName(
        (props: { isActive: boolean }) => (props.isActive ? 'active' : ''),
        (props: { isActive: boolean }) => (props.isActive ? 'tw-active' : ''),
      )

      expect(typeof result).toBe('function')
      if (typeof result === 'function') {
        const className = result({ isActive: true })
        expect(className).toContain('active')
        expect(className).toContain('tw-active')
      }
    })
  })

  describe('composeSlotClassName', () => {
    it('should return className when slotFn is undefined', () => {
      const result = composeSlotClassName(undefined, 'test-class')
      expect(result).toBe('test-class')
    })

    it('should call slotFn with className', () => {
      const slotFn = (args: { className?: string } = {}) => `slot ${args.className || ''}`
      const result = composeSlotClassName(slotFn, 'test-class')
      expect(result).toBe('slot test-class')
    })

    it('should pass variants to slotFn', () => {
      const slotFn = (args: { size?: string; className?: string } = {}) =>
        `${args.size || ''} ${args.className || ''}`
      const result = composeSlotClassName(slotFn, 'test-class', { size: 'md' })
      expect(result).toBe('md test-class')
    })
  })
})
