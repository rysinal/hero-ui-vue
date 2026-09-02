/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicDatePicker from './__fixtures__/BasicDatePicker.vue'

enableAutoUnmount(afterEach)

const segmentFor = (wrapper: ReturnType<typeof mount>, type: string) =>
  wrapper.get(`[data-slot="date-input-group-segment"][data-type="${type}"]`)

// The popover is portalled to the body, so the calendar is not inside the
// wrapper's own tree.
const calendarCells = () =>
  Array.from(document.querySelectorAll('[data-slot="calendar-cell"]'))

const openPopover = async (wrapper: ReturnType<typeof mount>) => {
  await wrapper.get('[data-slot="date-picker-trigger"]').trigger('click')
  await nextTick()
  await nextTick()
}

describe('DatePicker', () => {
  afterEach(() => {
    // Radix portals outlive the wrapper; clear them so tests stay isolated.
    document.querySelectorAll('[data-slot="date-picker-popover"]').forEach((node) => node.remove())
  })

  it('renders the dotted parts and resolves the names', async () => {
    const wrapper = mount(BasicDatePicker, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<datepicker\.[a-z]+/i)
    expect(wrapper.find('[data-slot="date-picker"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="date-picker-trigger"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="date-picker-trigger-indicator"]').exists()).toBe(true)
  })

  it('drives the field segments from its own value', async () => {
    const wrapper = mount(BasicDatePicker, { attachTo: document.body })
    await nextTick()

    // DateField.Group works unchanged inside a DatePicker.
    expect(segmentFor(wrapper, 'month').text()).toBe('09')
    expect(segmentFor(wrapper, 'day').text()).toBe('05')
    expect(segmentFor(wrapper, 'year').text()).toBe('2026')
  })

  it('writes the value into a hidden input for forms', async () => {
    const wrapper = mount(BasicDatePicker, { attachTo: document.body })
    await nextTick()

    const hidden = wrapper.get('input[type="hidden"]')
    expect(hidden.attributes('name')).toBe('date')
    expect(hidden.attributes('value')).toBe('2026-09-05')
  })

  it('opens the popover from the trigger', async () => {
    const wrapper = mount(BasicDatePicker, { attachTo: document.body })
    await nextTick()

    expect(calendarCells()).toHaveLength(0)
    await openPopover(wrapper)

    expect(calendarCells().length).toBeGreaterThan(0)
    expect(wrapper.get('[data-slot="date-picker-trigger"]').attributes('data-open')).toBe('true')
  })

  it('shows the picker value as selected in the calendar', async () => {
    const wrapper = mount(BasicDatePicker, { attachTo: document.body })
    await nextTick()
    await openPopover(wrapper)

    // The calendar borrows DatePicker's value rather than holding its own.
    const selected = calendarCells().filter(
      (cell) => cell.getAttribute('data-selected') === 'true',
    )
    expect(selected).toHaveLength(1)
    expect(selected[0]!.textContent?.trim()).toBe('5')
  })

  it('fills the field and closes when a day is picked', async () => {
    const wrapper = mount(BasicDatePicker, { attachTo: document.body })
    await nextTick()
    await openPopover(wrapper)

    const twelfth = calendarCells().find(
      (cell) =>
        cell.textContent?.trim() === '12' && cell.getAttribute('data-outside-month') !== 'true',
    )!
    twelfth.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(segmentFor(wrapper, 'day').text()).toBe('12')
    expect(wrapper.get('input[type="hidden"]').attributes('value')).toBe('2026-09-12')
    expect(wrapper.get('[data-slot="date-picker-trigger"]').attributes('data-open')).toBeUndefined()
  })

  it('disables the trigger along with the field', async () => {
    const wrapper = mount(BasicDatePicker, {
      attachTo: document.body,
      props: { isDisabled: true },
    })
    await nextTick()

    const trigger = wrapper.get('[data-slot="date-picker-trigger"]')
    expect(trigger.attributes('data-disabled')).toBe('true')
    expect(trigger.attributes('disabled')).toBeDefined()
  })
})
