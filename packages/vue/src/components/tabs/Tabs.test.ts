/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicTabs from './__fixtures__/BasicTabs.vue'
import BareTabs from './__fixtures__/BareTabs.vue'

enableAutoUnmount(afterEach)

describe('Tabs indicator', () => {
  it('renders the indicator only inside the selected tab', async () => {
    const wrapper = mount(BasicTabs, { attachTo: document.body })
    await nextTick()

    const indicators = wrapper.findAll('[data-slot="tabs-indicator"]')
    // React Aria paints the indicator for the selected tab only; tabs.css
    // sizes it to fill its parent tab.
    expect(indicators).toHaveLength(1)

    const selectedTab = wrapper.get('[data-slot="tabs-tab"][data-selected="true"]')
    expect(selectedTab.find('[data-slot="tabs-indicator"]').exists()).toBe(true)
  })

  it('moves the indicator when the selection changes', async () => {
    const wrapper = mount(BasicTabs, { attachTo: document.body })
    await nextTick()

    // radix drives selection from pointer/keyboard events, and jsdom does not
    // synthesise the pointer sequence, so use the keyboard path.
    await wrapper.findAll('[data-slot="tabs-tab"]')[0]!.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()

    const tabs = wrapper.findAll('[data-slot="tabs-tab"]')
    expect(tabs[0]!.find('[data-slot="tabs-indicator"]').exists()).toBe(false)
    expect(tabs[1]!.find('[data-slot="tabs-indicator"]').exists()).toBe(true)
  })

  it('resolves every dotted part to a real component', async () => {
    const wrapper = mount(BasicTabs, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<[a-z]+\.[a-z]+/i)
    expect(wrapper.findAll('[data-slot="tabs-tab"]')).toHaveLength(2)
    expect(wrapper.get('[data-slot="tabs-panel"]').text()).toBe('Panel A')
  })

  it('wraps the list itself when no ListContainer is given', async () => {
    const wrapper = mount(BareTabs, { attachTo: document.body })
    await nextTick()

    expect(wrapper.findAll('[data-slot="tabs-list-container"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-slot="tabs-list"]')).toHaveLength(1)
  })
})
