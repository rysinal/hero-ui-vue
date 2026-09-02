/* global document, MouseEvent */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicDateRangePicker from './__fixtures__/BasicDateRangePicker.vue'

enableAutoUnmount(afterEach)

const inputFor = (wrapper: ReturnType<typeof mount>, end: 'start' | 'end') =>
  wrapper.get(`[data-slot="date-input-group-input"][data-slot-name="${end}"]`)

const segmentText = (wrapper: ReturnType<typeof mount>, end: 'start' | 'end', type: string) =>
  inputFor(wrapper, end).get(`[data-slot="date-input-group-segment"][data-type="${type}"]`)

// The popover is portalled to the body.
const calendarCells = () =>
  Array.from(document.querySelectorAll('[data-slot="range-calendar-cell"]'))

const openPopover = async (wrapper: ReturnType<typeof mount>) => {
  await wrapper.get('[data-slot="date-range-picker-trigger"]').trigger('click')
  await nextTick()
  await nextTick()
}

const hiddenValue = (wrapper: ReturnType<typeof mount>, name: string) =>
  wrapper.get(`input[type="hidden"][name="${name}"]`).attributes('value')

describe('DateRangePicker', () => {
  afterEach(() => {
    document
      .querySelectorAll('[data-slot="date-range-picker-popover"]')
      .forEach(node => node.remove())
  })

  it('renders the dotted parts and resolves the names', async () => {
    const wrapper = mount(BasicDateRangePicker, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<daterangepicker\.[a-z]+/i)
    expect(wrapper.find('[data-slot="date-range-picker"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="date-range-picker-trigger"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="date-range-picker-range-separator"]').exists()).toBe(true)
  })

  it('gives each end its own segments', async () => {
    const wrapper = mount(BasicDateRangePicker, { attachTo: document.body })
    await nextTick()

    expect(segmentText(wrapper, 'start', 'day').text()).toBe('05')
    expect(segmentText(wrapper, 'end', 'day').text()).toBe('12')
    // Both ends sit in the same month here, so only the day differs.
    expect(segmentText(wrapper, 'start', 'month').text()).toBe('09')
    expect(segmentText(wrapper, 'end', 'month').text()).toBe('09')
  })

  it('writes both ends into hidden inputs for forms', async () => {
    const wrapper = mount(BasicDateRangePicker, { attachTo: document.body })
    await nextTick()

    expect(hiddenValue(wrapper, 'startDate')).toBe('2026-09-05')
    expect(hiddenValue(wrapper, 'endDate')).toBe('2026-09-12')
  })

  it('edits only the end the segment belongs to', async () => {
    const wrapper = mount(BasicDateRangePicker, { attachTo: document.body })
    await nextTick()

    await segmentText(wrapper, 'start', 'day').trigger('keydown', { key: 'ArrowUp' })
    expect(segmentText(wrapper, 'start', 'day').text()).toBe('06')
    // The other end is untouched.
    expect(segmentText(wrapper, 'end', 'day').text()).toBe('12')
    expect(hiddenValue(wrapper, 'endDate')).toBe('2026-09-12')
  })

  it('keeps the ends ordered while typing', async () => {
    const wrapper = mount(BasicDateRangePicker, { attachTo: document.body })
    await nextTick()

    // Pushing the start past the end swaps them rather than inverting the range.
    const startDay = () => segmentText(wrapper, 'start', 'day')
    await startDay().trigger('keydown', { key: '2' })
    await startDay().trigger('keydown', { key: '0' })
    await nextTick()

    const start = hiddenValue(wrapper, 'startDate')!
    const end = hiddenValue(wrapper, 'endDate')!
    expect(start <= end).toBe(true)
  })

  it('marks the whole range as selected in the calendar', async () => {
    const wrapper = mount(BasicDateRangePicker, { attachTo: document.body })
    await nextTick()
    await openPopover(wrapper)

    const selected = calendarCells().filter(cell => cell.getAttribute('data-selected') === 'true')
    // 5th through 12th inclusive.
    expect(selected).toHaveLength(8)
    expect(calendarCells().some(c => c.getAttribute('data-selection-start') === 'true')).toBe(true)
    expect(calendarCells().some(c => c.getAttribute('data-selection-end') === 'true')).toBe(true)
  })

  it('fills both fields and closes once a range is completed', async () => {
    const wrapper = mount(BasicDateRangePicker, { attachTo: document.body })
    await nextTick()
    await openPopover(wrapper)

    const dayCell = (day: string) =>
      calendarCells().find(
        cell =>
          cell.textContent?.trim() === day && cell.getAttribute('data-outside-month') !== 'true',
      )!

    // First click anchors, the second completes.
    dayCell('20').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    dayCell('24').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(hiddenValue(wrapper, 'startDate')).toBe('2026-09-20')
    expect(hiddenValue(wrapper, 'endDate')).toBe('2026-09-24')
    expect(
      wrapper.get('[data-slot="date-range-picker-trigger"]').attributes('data-open'),
    ).toBeUndefined()
  })

  it('disables the trigger along with the group', async () => {
    const wrapper = mount(BasicDateRangePicker, {
      attachTo: document.body,
      props: { isDisabled: true },
    })
    await nextTick()

    const trigger = wrapper.get('[data-slot="date-range-picker-trigger"]')
    expect(trigger.attributes('data-disabled')).toBe('true')
    expect(trigger.attributes('disabled')).toBeDefined()
  })
})
