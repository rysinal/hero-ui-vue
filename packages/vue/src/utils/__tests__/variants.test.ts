import { describe, expect, it } from 'vitest'
import { createVariantBuilder, createVariants, mapPropsVariants } from '../variants'

describe('variants utils', () => {
  describe('mapPropsVariants', () => {
    it('should split props into base and variant props', () => {
      const props = { size: 'md', color: 'primary', onClick: () => {} }
      const [baseProps, variantProps] = mapPropsVariants(props, ['size', 'color'])

      expect(baseProps).toEqual({ onClick: expect.any(Function) })
      expect(variantProps).toEqual({ size: 'md', color: 'primary' })
    })

    it('should return all props when no variant keys provided', () => {
      const props = { size: 'md', onClick: () => {} }
      const [baseProps, variantProps] = mapPropsVariants(props)

      expect(baseProps).toEqual(props)
      expect(variantProps).toEqual({})
    })

    it('should keep variant props when removeVariantProps is false', () => {
      const props = { size: 'md', color: 'primary' }
      const [baseProps, variantProps] = mapPropsVariants(props, ['size', 'color'], false)

      expect(baseProps).toEqual(props)
      expect(variantProps).toEqual({ size: 'md', color: 'primary' })
    })
  })

  describe('createVariantBuilder', () => {
    it('should create base class', () => {
      const builder = createVariantBuilder('button')
      expect(builder()).toBe('button')
    })

    it('should add variant classes', () => {
      const builder = createVariantBuilder('button')
      const className = builder({ variants: { size: 'md', color: 'primary' } })

      expect(className).toContain('button')
      expect(className).toContain('button--md')
      expect(className).toContain('button--primary')
    })

    it('should add modifier classes', () => {
      const builder = createVariantBuilder('button')
      const className = builder({ modifiers: { disabled: true, loading: false } })

      expect(className).toContain('button')
      expect(className).toContain('button--disabled')
      expect(className).not.toContain('button--loading')
    })
  })

  describe('createVariants', () => {
    it('should create variant function with defaults', () => {
      const buttonVariants = createVariants({
        base: 'button',
        variants: {
          size: ['sm', 'md', 'lg'] as const,
          variant: ['primary', 'secondary'] as const,
        },
        defaults: {
          size: 'md',
          variant: 'primary',
        },
      })

      const className = buttonVariants()
      expect(className).toContain('button')
      expect(className).toContain('button--md')
      expect(className).toContain('button--primary')
    })

    it('should override defaults with provided props', () => {
      const buttonVariants = createVariants({
        base: 'button',
        variants: {
          size: ['sm', 'md', 'lg'] as const,
        },
        defaults: {
          size: 'md',
        },
      })

      const className = buttonVariants({ size: 'lg' })
      expect(className).toContain('button--lg')
      expect(className).not.toContain('button--md')
    })

    it('should handle modifiers', () => {
      const buttonVariants = createVariants({
        base: 'button',
        variants: {
          size: ['sm', 'md'] as const,
        },
      })

      const className = buttonVariants({
        size: 'sm',
        modifiers: { disabled: true },
      })

      expect(className).toContain('button--sm')
      expect(className).toContain('button--disabled')
    })
  })
})
