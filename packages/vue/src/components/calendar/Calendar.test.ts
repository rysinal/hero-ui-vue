/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicCalendar from './__fixtures__/BasicCalendar.vue'
import CellSlotCalendar from './__fixtures__/CellSlotCalendar.vue'
import MultiMonthCalendar from './__fixtures__/MultiMonthCalendar.vue'

enableAutoUnmount(afterEach)

describe('Calendar', () => {
  it('renders a rectangular grid with weekday headers', async () => {
    const wrapper = mount(BasicCalendar, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<calendar\.[a-z]+/i)
    expect(wrapper.findAll('[data-slot="calendar-header-cell"]')).toHaveLength(7)
    // Whole weeks, so the count is always a multiple of seven.
    expect(wrapper.findAll('[data-slot="calendar-cell"]').length % 7).toBe(0)
  })

  // React names the default chevron, so styling hooks match across both sides.
  it('names the default nav button icon', async () => {
    const wrapper = mount(BasicCalendar, { attachTo: document.body })
    await nextTick()

    expect(wrapper.findAll('[data-slot="calendar-nav-button-icon"]')).toHaveLength(2)
  })

  it('names the visible month', async () => {
    const wrapper = mount(BasicCalendar, { attachTo: document.body })
    await nextTick()

    expect(wrapper.get('[data-slot="calendar-heading"]').text()).toBe('September 2026')
  })

  it('marks days from the neighbouring months', async () => {
    const wrapper = mount(BasicCalendar, { attachTo: document.body })
    await nextTick()

    const outside = wrapper.findAll('[data-slot="calendar-cell"][data-outside-month="true"]')
    // September 2026 starts on a Tuesday, so the grid opens with August days.
    expect(outside.length).toBeGreaterThan(0)
  })

  it('disables dates before minValue', async () => {
    const wrapper = mount(BasicCalendar, { attachTo: document.body })
    await nextTick()

    const cells = wrapper.findAll('[data-slot="calendar-cell"]')
    const ninth = cells.find((cell) => cell.text() === '9')!
    const tenth = cells.find((cell) => cell.text() === '10')!

    expect(ninth.attributes('data-disabled')).toBe('true')
    expect(tenth.attributes('data-disabled')).toBeUndefined()
  })

  it('selects a date on click and ignores disabled ones', async () => {
    const wrapper = mount(BasicCalendar, { attachTo: document.body })
    await nextTick()

    const cells = () => wrapper.findAll('[data-slot="calendar-cell"]')
    const ninth = cells().find((cell) => cell.text() === '9')!
    await ninth.trigger('click')
    expect(ninth.attributes('data-selected')).toBeUndefined()

    const fifteenth = cells().find((cell) => cell.text() === '15')!
    await fifteenth.trigger('click')
    expect(
      cells().find((cell) => cell.text() === '15')!.attributes('data-selected'),
    ).toBe('true')
  })

  it('moves between months and stops at the range edge', async () => {
    const wrapper = mount(BasicCalendar, { attachTo: document.body })
    await nextTick()

    const next = wrapper.get('[data-slot="calendar-nav-button"][slot="next"]')
    await next.trigger('click')
    expect(wrapper.get('[data-slot="calendar-heading"]').text()).toBe('October 2026')

    // minValue is in September, so going back past it is blocked.
    const previous = wrapper.get('[data-slot="calendar-nav-button"][slot="previous"]')
    await previous.trigger('click')
    expect(wrapper.get('[data-slot="calendar-heading"]').text()).toBe('September 2026')
    expect(previous.attributes('disabled')).toBeDefined()
  })

  // The React demos render indicators from the cell's own scope, so the cell
  // has to hand out formattedDate and isUnavailable alongside the date.
  it('exposes formattedDate and isUnavailable to the cell slot', async () => {
    const wrapper = mount(CellSlotCalendar, { attachTo: document.body })
    await nextTick()

    const cells = wrapper.findAll('[data-slot="calendar-cell"]')
    const fifth = cells.find((cell) => cell.text().startsWith('5'))!
    // 2026-09-05 is a Saturday, so isUnavailable is true and the slot renders
    // the indicator; formattedDate keeps the day number visible.
    expect(fifth.text()).toContain('5')
    expect(fifth.attributes('data-unavailable')).toBe('true')
    expect(fifth.find('[data-slot="calendar-cell-indicator"]').exists()).toBe(true)

    const seventh = cells.find((cell) => cell.text().trim() === '7')!
    expect(seventh.attributes('data-unavailable')).toBeUndefined()
    expect(seventh.find('[data-slot="calendar-cell-indicator"]').exists()).toBe(false)
  })

  // The multi-month demos label each grid themselves, so the visible months have
  // to come from the calendar rather than being recomputed from today's date;
  // otherwise the labels stay put while the grids move.
  it('hands the visible months to the default slot and keeps them in step', async () => {
    const wrapper = mount(MultiMonthCalendar, { attachTo: document.body })
    await nextTick()

    const first = () => wrapper.get('[data-testid="first-label"]').text()
    const second = () => wrapper.get('[data-testid="second-label"]').text()

    expect(first()).toBe('September 2026')
    expect(second()).toBe('October 2026')

    await wrapper.get('[data-slot="calendar-nav-button"][slot="next"]').trigger('click')
    expect(first()).toBe('October 2026')
    expect(second()).toBe('November 2026')

    await wrapper.get('[data-slot="calendar-nav-button"][slot="previous"]').trigger('click')
    expect(first()).toBe('September 2026')
    expect(second()).toBe('October 2026')
  })
})
