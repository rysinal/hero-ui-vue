/* global document, FocusEvent */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import ComposedGroup from './__fixtures__/ComposedGroup.vue'

enableAutoUnmount(afterEach)

describe('InputGroup interaction state', () => {
  it('emits data-focus-within while a child holds focus', async () => {
    const wrapper = mount(ComposedGroup, { attachTo: document.body })
    const group = wrapper.get('[data-slot="input-group"]')

    expect(group.attributes('data-focus-within')).toBeUndefined()

    await group.trigger('focusin')
    expect(group.attributes('data-focus-within')).toBe('true')

    // input-group.css combines data-hovered with data-focus-within, so both
    // have to be emitted for the hover rules to behave.
    await group.element.dispatchEvent(new FocusEvent('focusout', { relatedTarget: null }))
    await nextTick()
    expect(group.attributes('data-focus-within')).toBeUndefined()
  })

  it('emits data-hovered on pointer enter', async () => {
    const wrapper = mount(ComposedGroup, { attachTo: document.body })
    const group = wrapper.get('[data-slot="input-group"]')

    await group.trigger('pointerenter')
    expect(group.attributes('data-hovered')).toBe('true')
  })

  it('renders prefix, input and suffix through the dot API', () => {
    const wrapper = mount(ComposedGroup, { attachTo: document.body })

    expect(wrapper.find('[data-slot="input-group-prefix"]').text()).toBe('https://')
    expect(wrapper.find('[data-slot="input-group-suffix"]').text()).toBe('.com')
    expect(wrapper.find('input').exists()).toBe(true)
  })
})
