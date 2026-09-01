import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DefaultCheckbox from './__fixtures__/DefaultCheckbox.vue'
import ComposedCheckbox from './__fixtures__/ComposedCheckbox.vue'

describe('Checkbox composition', () => {
  it('renders control, indicator and content by default', () => {
    const wrapper = mount(DefaultCheckbox)

    expect(wrapper.find('[data-slot="checkbox-control"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="checkbox-indicator"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="checkbox-content"]').text()).toBe('Accept terms')
  })

  it('supports explicit composition via the dot API', () => {
    const wrapper = mount(ComposedCheckbox)

    // Composed parts must render exactly once, not alongside the defaults.
    expect(wrapper.findAll('[data-slot="checkbox-control"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-slot="checkbox-indicator"]')).toHaveLength(1)
    expect(wrapper.find('[data-slot="checkbox-indicator"]').text()).toBe('X')
  })
})
