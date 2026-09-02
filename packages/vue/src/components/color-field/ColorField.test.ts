/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicPicker from '../color-swatch-picker/__fixtures__/BasicPicker.vue'
import LuminancePicker from '../color-swatch-picker/__fixtures__/LuminancePicker.vue'
import BasicColorField from './__fixtures__/BasicColorField.vue'

enableAutoUnmount(afterEach)

describe('ColorField', () => {
  it('shows the colour as hex and renders the group parts', async () => {
    const wrapper = mount(BasicColorField, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<colorfield\.[a-z]+/i)
    expect(wrapper.find('[data-slot="color-input-group"]').exists()).toBe(true)
    expect((wrapper.get('input[type="text"]').element as HTMLInputElement).value).toBe('#0485f7')
  })

  it('parses what the user types', async () => {
    const wrapper = mount(BasicColorField, { attachTo: document.body })
    await nextTick()

    await wrapper.get('input[type="text"]').setValue('#ff0000')
    await nextTick()

    expect(wrapper.get('[data-slot="color-field"]').attributes('data-invalid')).toBeUndefined()
  })

  it('marks itself invalid when the text does not parse', async () => {
    const wrapper = mount(BasicColorField, { attachTo: document.body })
    await nextTick()

    await wrapper.get('input[type="text"]').setValue('nonsense')
    await nextTick()

    // The field reports the parse failure rather than throwing.
    expect(wrapper.get('[data-slot="color-field"]').attributes('data-invalid')).toBe('true')
  })
})

describe('ColorSwatchPicker', () => {
  it('marks the selected swatch and shows its indicator', async () => {
    const wrapper = mount(BasicPicker, { attachTo: document.body })
    await nextTick()

    const items = wrapper.findAll('[data-slot="color-swatch-picker-item"]')
    expect(items).toHaveLength(3)
    expect(items[1]?.attributes('data-selected')).toBe('true')
    expect(items[1]?.find('[data-slot="color-swatch-picker-indicator"]').exists()).toBe(true)
    expect(items[0]?.find('[data-slot="color-swatch-picker-indicator"]').exists()).toBe(false)
  })

  it('renders the default checkmark inside the indicator', async () => {
    const wrapper = mount(BasicPicker, { attachTo: document.body })
    await nextTick()

    const indicator = wrapper.get('[data-slot="color-swatch-picker-indicator"]')
    expect(indicator.find('[data-slot="color-swatch-picker-checkmark"]').exists()).toBe(true)
  })

  it('selects a different swatch on click', async () => {
    const wrapper = mount(BasicPicker, { attachTo: document.body })
    await nextTick()

    await wrapper.findAll('[data-slot="color-swatch-picker-item"]')[0]!.trigger('click')
    await nextTick()

    const items = wrapper.findAll('[data-slot="color-swatch-picker-item"]')
    expect(items[0]?.attributes('data-selected')).toBe('true')
    expect(items[1]?.attributes('data-selected')).toBeUndefined()
  })

  // The checkmark is white by default, so the stylesheet flips it to black from
  // [data-light-color="true"]. Without the attribute a white swatch shows a
  // white tick on white.
  it('flags a light swatch so the checkmark can invert', async () => {
    const wrapper = mount(LuminancePicker, { attachTo: document.body })
    await nextTick()

    const indicator = wrapper.get('[data-slot="color-swatch-picker-indicator"]')
    expect(indicator.attributes('data-light-color')).toBe('true')
  })

  it('leaves a dark swatch unflagged', async () => {
    const wrapper = mount(LuminancePicker, {
      attachTo: document.body,
      props: { selected: '#1E1B4B' },
    })
    await nextTick()

    const indicator = wrapper.get('[data-slot="color-swatch-picker-indicator"]')
    expect(indicator.attributes('data-light-color')).toBeUndefined()
  })

  it('paints each swatch from the css variable', async () => {
    const wrapper = mount(BasicPicker, { attachTo: document.body })
    await nextTick()

    const swatch = wrapper.get('[data-slot="color-swatch-picker-swatch"]')
    expect(swatch.attributes('style')).toContain('--color-swatch-current')
  })
})
