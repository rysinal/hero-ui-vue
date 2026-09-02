/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicDateField from './__fixtures__/BasicDateField.vue'

enableAutoUnmount(afterEach)

const segmentFor = (wrapper: ReturnType<typeof mount>, type: string) =>
  wrapper.get(`[data-slot="date-input-group-segment"][data-type="${type}"]`)

describe('DateField', () => {
  it('renders one segment per part plus the separators', async () => {
    const wrapper = mount(BasicDateField, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<datefield\.[a-z]+/i)
    expect(segmentFor(wrapper, 'month').text()).toBe('09')
    expect(segmentFor(wrapper, 'day').text()).toBe('05')
    expect(segmentFor(wrapper, 'year').text()).toBe('2026')
    expect(wrapper.findAll('[data-type="literal"]').length).toBeGreaterThan(0)
  })

  it('steps a segment with the arrow keys', async () => {
    const wrapper = mount(BasicDateField, { attachTo: document.body })
    await nextTick()

    await segmentFor(wrapper, 'day').trigger('keydown', { key: 'ArrowUp' })
    expect(segmentFor(wrapper, 'day').text()).toBe('06')

    await segmentFor(wrapper, 'day').trigger('keydown', { key: 'ArrowDown' })
    await segmentFor(wrapper, 'day').trigger('keydown', { key: 'ArrowDown' })
    expect(segmentFor(wrapper, 'day').text()).toBe('04')
  })

  it('accepts typed digits, building the number up', async () => {
    const wrapper = mount(BasicDateField, { attachTo: document.body })
    await nextTick()

    // "1" then "2" reads as December rather than replacing with 2.
    await segmentFor(wrapper, 'month').trigger('keydown', { key: '1' })
    expect(segmentFor(wrapper, 'month').text()).toBe('01')

    await segmentFor(wrapper, 'month').trigger('keydown', { key: '2' })
    expect(segmentFor(wrapper, 'month').text()).toBe('12')
  })

  it('clamps a typed value to the segment range', async () => {
    const wrapper = mount(BasicDateField, { attachTo: document.body })
    await nextTick()

    await segmentFor(wrapper, 'month').trigger('keydown', { key: '9' })
    // 9 cannot take another digit without exceeding 12, so entry restarts.
    await segmentFor(wrapper, 'month').trigger('keydown', { key: '9' })
    expect(segmentFor(wrapper, 'month').text()).toBe('09')
  })

  it('exposes each segment to assistive tech', async () => {
    const wrapper = mount(BasicDateField, { attachTo: document.body })
    await nextTick()

    const day = segmentFor(wrapper, 'day')
    expect(day.attributes('role')).toBe('spinbutton')
    expect(day.attributes('aria-valuemin')).toBe('1')
    expect(day.attributes('aria-valuemax')).toBe('31')
    // A separator is not a control.
    expect(wrapper.get('[data-type="literal"]').attributes('role')).toBeUndefined()
  })
})
