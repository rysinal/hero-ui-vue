import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProgressCircle from './ProgressCircle.vue'

// Mirrors the React source constants:
// STROKE_WIDTH = 4, CENTER = 18, RADIUS = CENTER - STROKE_WIDTH / 2 = 16
const CENTER = 18
const RADIUS = 16
const STROKE_WIDTH = 4
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

describe('ProgressCircle geometry parity with React', () => {
  it('uses the same viewBox as React', () => {
    const wrapper = mount(ProgressCircle, { props: { value: 50 } })

    expect(wrapper.find('svg').attributes('viewBox')).toBe(`0 0 ${CENTER * 2} ${CENTER * 2}`)
    wrapper.unmount()
  })

  it('uses the same circle centre, radius and stroke width as React', () => {
    const wrapper = mount(ProgressCircle, { props: { value: 50 } })
    const circles = wrapper.findAll('circle')

    expect(circles).toHaveLength(2)
    circles.forEach((circle) => {
      expect(circle.attributes('cx')).toBe(String(CENTER))
      expect(circle.attributes('cy')).toBe(String(CENTER))
      expect(circle.attributes('r')).toBe(String(RADIUS))
      expect(circle.attributes('stroke-width')).toBe(String(STROKE_WIDTH))
    })
    wrapper.unmount()
  })

  it('rotates the fill circle around the React centre', () => {
    const wrapper = mount(ProgressCircle, { props: { value: 50 } })

    const fill = wrapper.findAll('circle')[1]!

    expect(fill.attributes('transform')).toBe(`rotate(-90 ${CENTER} ${CENTER})`)
    wrapper.unmount()
  })

  it('computes stroke-dashoffset from the React circumference', () => {
    const wrapper = mount(ProgressCircle, { props: { value: 25 } })
    const fill = wrapper.findAll('circle')[1]!

    expect(Number(fill.attributes('stroke-dasharray'))).toBeCloseTo(CIRCUMFERENCE, 5)
    expect(Number(fill.attributes('stroke-dashoffset'))).toBeCloseTo(CIRCUMFERENCE * 0.75, 5)
    wrapper.unmount()
  })

  it('uses 0.75 of the circumference when indeterminate, matching React', () => {
    const wrapper = mount(ProgressCircle)
    const fill = wrapper.findAll('circle')[1]!

    expect(Number(fill.attributes('stroke-dashoffset'))).toBeCloseTo(CIRCUMFERENCE * 0.75, 5)
    wrapper.unmount()
  })

  it('omits aria-valuenow when indeterminate', () => {
    const wrapper = mount(ProgressCircle)

    expect(wrapper.attributes('aria-valuenow')).toBeUndefined()
    wrapper.unmount()
  })
})
