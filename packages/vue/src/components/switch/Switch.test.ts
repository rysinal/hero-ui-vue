import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import Switch from './Switch.vue'

const control = (wrapper: ReturnType<typeof mount>) => wrapper.find('button[role="switch"]')

describe('Switch controlled state', () => {
  it('stays off when controlled via :checked and the parent does not commit the change', async () => {
    const wrapper = mount(Switch, { props: { checked: false } })

    await control(wrapper).trigger('click')
    await nextTick()

    // Controlled: without the parent updating `checked`, the switch must not flip itself.
    expect(control(wrapper).attributes('aria-checked')).toBe('false')
    wrapper.unmount()
  })

  it('reflects a controlled :checked prop update from the parent', async () => {
    const wrapper = mount(Switch, { props: { checked: false } })

    await wrapper.setProps({ checked: true })
    await nextTick()

    expect(control(wrapper).attributes('aria-checked')).toBe('true')
    wrapper.unmount()
  })

  it('stays off when controlled via :is-selected and the parent does not commit', async () => {
    const wrapper = mount(Switch, { props: { isSelected: false } })

    await control(wrapper).trigger('click')
    await nextTick()

    expect(control(wrapper).attributes('aria-checked')).toBe('false')
    wrapper.unmount()
  })

  it('stays controlled when :checked is explicitly passed as undefined', async () => {
    // Regression: `undefined` reaching radix's v-model made it fall back to
    // passive/uncontrolled mode, so the switch silently flipped itself.
    // Checkbox guards this with `?? false`; Switch must behave the same.
    const wrapper = mount({
      components: { Switch },
      template: `<Switch :checked="undefined" />`,
    })
    const el = wrapper.find('button[role="switch"]')

    await el.trigger('click')
    await nextTick()

    expect(el.attributes('aria-checked')).toBe('false')
    wrapper.unmount()
  })

  it('still toggles freely when uncontrolled', async () => {
    const wrapper = mount(Switch)

    await control(wrapper).trigger('click')
    await nextTick()

    expect(control(wrapper).attributes('aria-checked')).toBe('true')
    wrapper.unmount()
  })

  it('honours defaultSelected when uncontrolled', async () => {
    const wrapper = mount(Switch, { props: { defaultSelected: true } })
    await nextTick()

    expect(control(wrapper).attributes('aria-checked')).toBe('true')
    wrapper.unmount()
  })
})

describe('Switch composition', () => {
  it('renders default control, thumb and content', () => {
    const wrapper = mount(Switch, { slots: { default: 'Wi-Fi' } })

    expect(wrapper.find('[data-slot="switch-control"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="switch-thumb"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="switch-content"]').text()).toBe('Wi-Fi')
  })
})
