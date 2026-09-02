/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicRange from './__fixtures__/BasicRange.vue'

enableAutoUnmount(afterEach)

const cellFor = (wrapper: ReturnType<typeof mount>, day: string) =>
  wrapper
    .findAll('[data-slot="range-calendar-cell"]:not([data-outside-month="true"])')
    .find(cell => cell.text() === day)!

describe('RangeCalendar', () => {
  it('reuses the calendar parts', async () => {
    const wrapper = mount(BasicRange, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<rangecalendar\.[a-z]+/i)
    expect(wrapper.find('[data-slot="range-calendar"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-slot="range-calendar-header-cell"]')).toHaveLength(7)
  })

  // React nests an inner span in every range cell, and range-calendar.css hangs
  // the circle, focus ring, today marker and hover states off it.
  it('wraps each cell in an inner cell button', async () => {
    const wrapper = mount(BasicRange, { attachTo: document.body })
    await nextTick()

    const cells = wrapper.findAll('[data-slot="range-calendar-cell"]')
    const buttons = wrapper.findAll('[data-slot="range-calendar-cell-button"]')
    expect(buttons).toHaveLength(cells.length)
    expect(buttons[0]!.classes()).toContain('range-calendar__cell-button')
    // The day number lives inside the inner span, not directly in the cell.
    expect(cellFor(wrapper, '10').get('[data-slot="range-calendar-cell-button"]').text()).toBe('10')
  })

  it('mirrors the cell state onto the inner button', async () => {
    const wrapper = mount(BasicRange, { attachTo: document.body })
    await nextTick()

    await cellFor(wrapper, '10').trigger('click')
    await cellFor(wrapper, '12').trigger('click')

    // The CSS styles the ends from the inner span's own data-selected.
    const start = cellFor(wrapper, '10').get('[data-slot="range-calendar-cell-button"]')
    const middle = cellFor(wrapper, '11').get('[data-slot="range-calendar-cell-button"]')
    expect(start.attributes('data-selected')).toBe('true')
    // Only the two ends are marked on the inner span, as React does.
    expect(middle.attributes('data-selected')).toBeUndefined()
  })

  it('leaves single calendars without an inner cell button', async () => {
    const wrapper = mount(BasicRange, { attachTo: document.body })
    await nextTick()

    // Sanity: the plain Calendar has no such layer, so the slot must be
    // range-only rather than added to the shared cell unconditionally.
    expect(wrapper.find('[data-slot="calendar-cell-button"]').exists()).toBe(false)
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
