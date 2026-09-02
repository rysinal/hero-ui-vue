/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicRange from './__fixtures__/BasicRange.vue'

enableAutoUnmount(afterEach)

const cellFor = (wrapper: ReturnType<typeof mount>, day: string) =>
  wrapper
    .findAll('[data-slot="calendar-cell"]:not([data-outside-month="true"])')
    .find((cell) => cell.text() === day)!

describe('RangeCalendar', () => {
  it('reuses the calendar parts', async () => {
    const wrapper = mount(BasicRange, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<rangecalendar\.[a-z]+/i)
    expect(wrapper.find('[data-slot="range-calendar"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-slot="calendar-header-cell"]')).toHaveLength(7)
  })

  it('takes two clicks to make a range and fills the days between', async () => {
    const wrapper = mount(BasicRange, { attachTo: document.body })
    await nextTick()

    await cellFor(wrapper, '10').trigger('click')
    // One click only anchors; nothing between is highlighted yet.
    expect(cellFor(wrapper, '12').attributes('data-selected')).toBeUndefined()

    await cellFor(wrapper, '14').trigger('click')
    expect(cellFor(wrapper, '10').attributes('data-selection-start')).toBe('true')
    expect(cellFor(wrapper, '14').attributes('data-selection-end')).toBe('true')
    expect(cellFor(wrapper, '12').attributes('data-selected')).toBe('true')
  })

  it('accepts the two clicks in either order', async () => {
    const wrapper = mount(BasicRange, { attachTo: document.body })
    await nextTick()

    await cellFor(wrapper, '14').trigger('click')
    await cellFor(wrapper, '10').trigger('click')

    expect(cellFor(wrapper, '10').attributes('data-selection-start')).toBe('true')
    expect(cellFor(wrapper, '14').attributes('data-selection-end')).toBe('true')
  })

  it('refuses a range that steps over an unavailable day', async () => {
    const wrapper = mount(BasicRange, { attachTo: document.body })
    await nextTick()

    expect(cellFor(wrapper, '20').attributes('data-unavailable')).toBe('true')

    await cellFor(wrapper, '18').trigger('click')
    await cellFor(wrapper, '22').trigger('click')

    // The 20th is booked, so the span is rejected rather than silently split.
    expect(cellFor(wrapper, '19').attributes('data-selected')).toBeUndefined()
  })
})
