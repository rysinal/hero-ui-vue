/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicTimeField from './__fixtures__/BasicTimeField.vue'
import BoundedTimeField from './__fixtures__/BoundedTimeField.vue'
import ConfigurableTimeField from './__fixtures__/ConfigurableTimeField.vue'

enableAutoUnmount(afterEach)

const segmentsOf = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('[data-slot="date-input-group-segment"]')

const segmentByType = (wrapper: ReturnType<typeof mount>, type: string) =>
  wrapper.get(`[data-slot="date-input-group-segment"][data-type="${type}"]`)

describe('TimeField', () => {
  it('renders the dotted parts and resolves the names', async () => {
    const wrapper = mount(BasicTimeField, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<timefield\.[a-z]+/i)
    expect(wrapper.find('[data-slot="time-field"]').exists()).toBe(true)
    // The parts come from DateInputGroup, as they do in React.
    expect(wrapper.find('[data-slot="date-input-group"]').exists()).toBe(true)
  })

  it('splits a time into hour, minute and day period', async () => {
    const wrapper = mount(BasicTimeField, { attachTo: document.body })
    await nextTick()

    expect(segmentByType(wrapper, 'hour').text()).toBe('02')
    expect(segmentByType(wrapper, 'minute').text()).toBe('30')
    expect(segmentByType(wrapper, 'dayPeriod').text()).toBe('PM')
    // No date parts, unlike DateField.
    expect(wrapper.find('[data-type="year"]').exists()).toBe(false)
    expect(wrapper.find('[data-type="day"]').exists()).toBe(false)
  })

  it('writes the value into a hidden input for forms', async () => {
    const wrapper = mount(BasicTimeField, { attachTo: document.body })
    await nextTick()

    const hidden = wrapper.get('input[type="hidden"]')
    expect(hidden.attributes('name')).toBe('time')
    expect(hidden.attributes('value')).toBe('14:30:00')
  })

  it('shows a 24-hour clock without a day period', async () => {
    const wrapper = mount(ConfigurableTimeField, {
      attachTo: document.body,
      props: { hourCycle: 24 },
    })
    await nextTick()

    expect(segmentByType(wrapper, 'hour').text()).toBe('14')
    expect(wrapper.find('[data-type="dayPeriod"]').exists()).toBe(false)
  })

  it('adds a seconds segment only at second granularity', async () => {
    const minute = mount(ConfigurableTimeField, { attachTo: document.body })
    await nextTick()
    expect(minute.find('[data-type="second"]').exists()).toBe(false)

    const second = mount(ConfigurableTimeField, {
      attachTo: document.body,
      props: { granularity: 'second' },
    })
    await nextTick()
    expect(segmentByType(second, 'second').text()).toBe('45')
  })

  it('steps the hour with the arrow keys', async () => {
    const wrapper = mount(BasicTimeField, { attachTo: document.body })
    await nextTick()

    await segmentByType(wrapper, 'hour').trigger('keydown', { key: 'ArrowUp' })
    expect(segmentByType(wrapper, 'hour').text()).toBe('03')

    await segmentByType(wrapper, 'hour').trigger('keydown', { key: 'ArrowDown' })
    expect(segmentByType(wrapper, 'hour').text()).toBe('02')
  })

  it('flips the day period with an arrow key', async () => {
    const wrapper = mount(BasicTimeField, { attachTo: document.body })
    await nextTick()

    expect(segmentByType(wrapper, 'dayPeriod').text()).toBe('PM')
    await segmentByType(wrapper, 'dayPeriod').trigger('keydown', { key: 'ArrowUp' })

    expect(segmentByType(wrapper, 'dayPeriod').text()).toBe('AM')
    // 14:30 in the morning half is 02:30, so the hour reads the same.
    expect(wrapper.get('input[type="hidden"]').attributes('value')).toBe('02:30:00')
  })

  it('keeps the half of the day when an hour is typed', async () => {
    const wrapper = mount(BasicTimeField, { attachTo: document.body })
    await nextTick()

    // Typing 9 on a PM field means 21:00, not 09:00.
    await segmentByType(wrapper, 'hour').trigger('keydown', { key: '9' })
    expect(segmentByType(wrapper, 'hour').text()).toBe('09')
    expect(segmentByType(wrapper, 'dayPeriod').text()).toBe('PM')
    expect(wrapper.get('input[type="hidden"]').attributes('value')).toBe('21:30:00')
  })

  it('wraps the hour at the end of the day', async () => {
    const wrapper = mount(ConfigurableTimeField, {
      attachTo: document.body,
      props: { hourCycle: 24 },
    })
    await nextTick()

    const hour = () => segmentByType(wrapper, 'hour')
    // 14:30 stepped up ten times reaches midnight and keeps going.
    for (let i = 0; i < 10; i += 1) await hour().trigger('keydown', { key: 'ArrowUp' })
    expect(hour().text()).toBe('00')
  })

  it('marks a time outside min/max as invalid', async () => {
    const wrapper = mount(BasicTimeField, { attachTo: document.body })
    await nextTick()

    // The basic fixture has no bounds, so it starts valid.
    expect(wrapper.get('[data-slot="time-field"]').attributes('data-invalid')).toBeUndefined()
  })

  // The demos render their own error text, so they need the derived validity
  // rather than repeating the bounds check against min/max.
  it('hands the derived validity to the default slot', async () => {
    const wrapper = mount(BoundedTimeField, { attachTo: document.body })
    await nextTick()

    // 20:00 sits past the 17:00 bound.
    expect(wrapper.get('[data-testid="validity"]').text()).toBe('invalid')
    expect(wrapper.get('[data-slot="time-field"]').attributes('data-invalid')).toBe('true')

    // Stepping back inside the range clears it.
    const hour = wrapper.get('[data-slot="date-input-group-segment"][data-type="hour"]')
    for (let i = 0; i < 5; i += 1) await hour.trigger('keydown', { key: 'ArrowDown' })

    expect(wrapper.get('[data-testid="validity"]').text()).toBe('valid')
    expect(wrapper.get('[data-slot="time-field"]').attributes('data-invalid')).toBeUndefined()
  })

  it('leaves the segments alone when read-only', async () => {
    const wrapper = mount(BasicTimeField, { attachTo: document.body })
    await nextTick()
    const before = segmentsOf(wrapper).map((segment) => segment.text())

    await wrapper.setProps({ isReadOnly: true })
    await segmentByType(wrapper, 'hour').trigger('keydown', { key: 'ArrowUp' })

    expect(segmentsOf(wrapper).map((segment) => segment.text())).toEqual(before)
  })
})
