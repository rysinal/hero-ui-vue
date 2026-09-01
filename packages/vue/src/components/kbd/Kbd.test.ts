import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Kbd from './Kbd.vue'

describe('Kbd key symbols', () => {
  it('renders the symbol and accessible label for a known key', () => {
    const wrapper = mount(Kbd, { props: { keys: ['command'] as const } })
    const abbr = wrapper.find('abbr')

    expect(abbr.text()).toBe('⌘')
    // The old implementation rendered the raw key with title="".
    expect(abbr.attributes('title')).toBe('Command')
  })

  it('renders one abbr per key alongside the content', () => {
    const wrapper = mount(Kbd, {
      props: { keys: ['command', 'shift'] as const },
      slots: { default: 'K' },
    })

    expect(wrapper.findAll('abbr').map((a) => a.text())).toEqual(['⌘', '⇧'])
    expect(wrapper.text()).toContain('K')
  })

  it('falls back to the raw value for an unknown key', () => {
    const wrapper = mount(Kbd, { props: { keys: ['nope'] as never } })

    expect(wrapper.find('abbr').text()).toBe('nope')
  })
})
