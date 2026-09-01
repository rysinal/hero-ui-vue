/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicCalendar from './__fixtures__/BasicCalendar.vue'

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
})
