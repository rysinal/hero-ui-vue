import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DotNotation from './fixtures/DotNotation.vue'
import FlatNotation from './fixtures/FlatNotation.vue'

describe('compound dot-notation API', () => {
  it('resolves dotted parts to real components', () => {
    const wrapper = mount(DotNotation)
    const html = wrapper.html()

    // A failed resolve renders a literal <card.header> tag instead.
    expect(html).not.toMatch(/<[a-z]+\.[a-z]+/i)

    expect(wrapper.find('[data-slot="card-header"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="card-title"]').text()).toBe('Dotted title')
    expect(wrapper.find('[data-slot="card-description"]').text()).toBe('Dotted description')
    expect(wrapper.find('[data-slot="card-content"]').text()).toBe('Body')
    expect(wrapper.find('[data-slot="card-footer"]').text()).toBe('Footer')
    expect(wrapper.find('[data-slot="modal-trigger"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="select-trigger"]').exists()).toBe(true)
  })

  it('keeps the flat exports working for backward compatibility', () => {
    const wrapper = mount(FlatNotation)

    expect(wrapper.find('[data-slot="card-title"]').text()).toBe('Flat title')
    expect(wrapper.find('[data-slot="card-content"]').text()).toBe('Body')
  })
})
