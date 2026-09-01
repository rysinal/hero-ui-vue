import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ComposedRadio from './__fixtures__/ComposedRadio.vue'

describe('Radio composition', () => {
  it('supports explicit composition via the dot API', () => {
    const wrapper = mount(ComposedRadio)

    expect(wrapper.findAll('[data-slot="radio-control"]')).toHaveLength(1)
    expect(wrapper.find('[data-slot="radio-indicator"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="radio-content"]').text()).toBe('Option A')
  })
})
