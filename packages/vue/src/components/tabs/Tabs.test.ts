/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicTabs from './__fixtures__/BasicTabs.vue'

enableAutoUnmount(afterEach)

describe('Tabs indicator', () => {
  it('renders the selection indicator inside the list container', async () => {
    const wrapper = mount(BasicTabs, { attachTo: document.body })
    await nextTick()

    const container = wrapper.get('[data-slot="tabs-list-container"]')
    // The indicator was missing entirely, so the selected pill never rendered.
    expect(container.find('[data-slot="tabs-indicator"]').exists()).toBe(true)
  })

  it('resolves every dotted part to a real component', async () => {
    const wrapper = mount(BasicTabs, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<[a-z]+\.[a-z]+/i)
    expect(wrapper.findAll('[data-slot="tab"]')).toHaveLength(2)
    expect(wrapper.get('[data-slot="tab-panel"]').text()).toBe('Panel A')
  })
})
