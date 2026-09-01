import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AsLabelCheckbox from './__fixtures__/AsLabelCheckbox.vue'

describe('root element override', () => {
  it('renders the checkbox root as the requested element', () => {
    const wrapper = mount(AsLabelCheckbox)
    const root = wrapper.get('[data-slot="checkbox"]')

    // React exposes this as `render`; Vue uses `as`.
    expect(root.element.tagName).toBe('LABEL')
    expect(root.attributes('data-custom')).toBe('bar')
    expect(root.attributes('role')).toBe('checkbox')
  })
})
