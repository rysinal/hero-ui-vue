/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import YearPickerCalendar from '../calendar/__fixtures__/YearPickerCalendar.vue'

enableAutoUnmount(afterEach)

describe('Calendar year picker', () => {
  it('names the focused month and year on the trigger', async () => {
    const wrapper = mount(YearPickerCalendar, { attachTo: document.body })
    await nextTick()

    const trigger = wrapper.get('[data-slot="calendar-year-picker-trigger"]')
    expect(trigger.get('[data-slot="calendar-year-picker-trigger-heading"]').text()).toBe(
      'September 2026',
    )
    expect(trigger.attributes('aria-label')).toBe('September 2026, year selector')
    expect(trigger.attributes('aria-expanded')).toBe('false')
  })

  it('lists one cell per year inside min/max', async () => {
    const wrapper = mount(YearPickerCalendar, { attachTo: document.body })
    await nextTick()

    const cells = wrapper.findAll('[data-slot="calendar-year-picker-year-cell"]')
    // 2024 through 2028 inclusive.
    expect(cells).toHaveLength(5)
    expect(cells.map((cell) => cell.attributes('data-year'))).toEqual([
      '2024',
      '2025',
      '2026',
      '2027',
      '2028',
    ])
  })

  it('marks the focused year as selected', async () => {
    const wrapper = mount(YearPickerCalendar, { attachTo: document.body })
    await nextTick()

    const selected = wrapper.findAll('[data-slot="calendar-year-picker-year-cell"][data-selected="true"]')
    expect(selected).toHaveLength(1)
    expect(selected[0]!.attributes('data-year')).toBe('2026')
  })

  it('toggles open state on the trigger and the grid', async () => {
    const wrapper = mount(YearPickerCalendar, { attachTo: document.body })
    await nextTick()

    const trigger = wrapper.get('[data-slot="calendar-year-picker-trigger"]')
    const grid = () => wrapper.get('[data-slot="calendar-year-picker-grid"]')

    expect(grid().attributes('data-open')).toBeUndefined()

    await trigger.trigger('click')
    // The CSS keys the crossfade off data-open, so both parts must carry it.
    expect(trigger.attributes('data-open')).toBe('true')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(grid().attributes('data-open')).toBe('true')

    await trigger.trigger('click')
    expect(grid().attributes('data-open')).toBeUndefined()
  })

  it('jumps the calendar to the chosen year and closes', async () => {
    const wrapper = mount(YearPickerCalendar, { attachTo: document.body })
    await nextTick()

    await wrapper.get('[data-slot="calendar-year-picker-trigger"]').trigger('click')

    const cell = wrapper.get('[data-slot="calendar-year-picker-year-cell"][data-year="2028"]')
    await cell.trigger('click')
    await nextTick()

    // The month is kept, only the year moves. This fixture mirrors the React
    // demo, which uses the year-picker trigger in place of Calendar.Heading.
    expect(
      wrapper.get('[data-slot="calendar-year-picker-trigger-heading"]').text(),
    ).toBe('September 2028')
    expect(
      wrapper.get('[data-slot="calendar-year-picker-grid"]').attributes('data-open'),
    ).toBeUndefined()
  })

  it('closes on Escape', async () => {
    const wrapper = mount(YearPickerCalendar, { attachTo: document.body })
    await nextTick()

    const trigger = wrapper.get('[data-slot="calendar-year-picker-trigger"]')
    await trigger.trigger('click')
    expect(trigger.attributes('data-open')).toBe('true')

    await trigger.trigger('keydown', { key: 'Escape' })
    expect(trigger.attributes('data-open')).toBeUndefined()
  })

  it('moves the active year with the arrow keys', async () => {
    const wrapper = mount(YearPickerCalendar, { attachTo: document.body })
    await nextTick()

    await wrapper.get('[data-slot="calendar-year-picker-trigger"]').trigger('click')
    await nextTick()

    const grid = wrapper.get('[data-slot="calendar-year-picker-grid"]')
    const cell = (year: number) =>
      wrapper.get(`[data-slot="calendar-year-picker-year-cell"][data-year="${year}"]`)

    // Opening anchors the active year to the focused one, which is tabbable.
    expect(cell(2026).attributes('tabindex')).toBe('0')

    await grid.trigger('keydown', { key: 'ArrowRight' })
    expect(cell(2027).attributes('tabindex')).toBe('0')
    expect(cell(2026).attributes('tabindex')).toBe('-1')

    // Three columns, so ArrowDown steps by three and clamps at the end.
    await grid.trigger('keydown', { key: 'ArrowDown' })
    expect(cell(2028).attributes('tabindex')).toBe('0')

    await grid.trigger('keydown', { key: 'Home' })
    expect(cell(2024).attributes('tabindex')).toBe('0')

    await grid.trigger('keydown', { key: 'End' })
    expect(cell(2028).attributes('tabindex')).toBe('0')
  })
})
