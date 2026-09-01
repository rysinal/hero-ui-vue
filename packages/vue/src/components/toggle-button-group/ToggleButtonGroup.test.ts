/* global document, HTMLElement, KeyboardEvent */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import ToggleButton from '../toggle-button/ToggleButton.vue'
import ToggleButtonGroup from './ToggleButtonGroup.vue'

const mountGroup = (template: string) =>
  mount(
    { components: { ToggleButtonGroup, ToggleButton }, template },
    { attachTo: document.body },
  )

const pressed = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('button').map((button) => button.attributes('data-selected') === 'true')

describe('ToggleButtonGroup selection model', () => {
  it('marks defaultSelectedKeys as selected on its children', async () => {
    const wrapper = mountGroup(`
      <ToggleButtonGroup :default-selected-keys="['center']" selection-mode="single">
        <ToggleButton id="left">Left</ToggleButton>
        <ToggleButton id="center">Center</ToggleButton>
        <ToggleButton id="right">Right</ToggleButton>
      </ToggleButtonGroup>
    `)
    await nextTick()

    expect(pressed(wrapper)).toEqual([false, true, false])
    wrapper.unmount()
  })

  it('replaces the selection in single mode', async () => {
    const wrapper = mountGroup(`
      <ToggleButtonGroup :default-selected-keys="['center']" selection-mode="single">
        <ToggleButton id="left">Left</ToggleButton>
        <ToggleButton id="center">Center</ToggleButton>
      </ToggleButtonGroup>
    `)

    await wrapper.findAll('button')[0]!.trigger('click')
    await nextTick()

    expect(pressed(wrapper)).toEqual([true, false])
    wrapper.unmount()
  })

  it('accumulates the selection in multiple mode', async () => {
    const wrapper = mountGroup(`
      <ToggleButtonGroup :default-selected-keys="['bold']" selection-mode="multiple">
        <ToggleButton id="bold">B</ToggleButton>
        <ToggleButton id="italic">I</ToggleButton>
      </ToggleButtonGroup>
    `)

    await wrapper.findAll('button')[1]!.trigger('click')
    await nextTick()

    expect(pressed(wrapper)).toEqual([true, true])
    wrapper.unmount()
  })

  it('emits selectionChange with the new keys', async () => {
    const wrapper = mount(ToggleButtonGroup, {
      props: { selectionMode: 'multiple' as const },
      slots: { default: '<button id="ignored" />' },
    })
    wrapper.unmount()

    const group = mountGroup(`
      <ToggleButtonGroup selection-mode="multiple">
        <ToggleButton id="bold">B</ToggleButton>
      </ToggleButtonGroup>
    `)
    await group.findAll('button')[0]!.trigger('click')
    await nextTick()

    const emitted = group.findComponent(ToggleButtonGroup).emitted('selectionChange')
    expect(emitted?.[0]?.[0]).toEqual(['bold'])
    group.unmount()
  })

  it('honours a controlled selectedKeys prop', async () => {
    const wrapper = mountGroup(`
      <ToggleButtonGroup :selected-keys="['bold']" selection-mode="multiple">
        <ToggleButton id="bold">B</ToggleButton>
        <ToggleButton id="italic">I</ToggleButton>
      </ToggleButtonGroup>
    `)
    await nextTick()

    // Controlled: clicking must not mutate state without the parent committing.
    await wrapper.findAll('button')[1]!.trigger('click')
    await nextTick()

    expect(pressed(wrapper)).toEqual([true, false])
    wrapper.unmount()
  })

  it('keeps a selected key when disallowEmptySelection is set', async () => {
    const wrapper = mountGroup(`
      <ToggleButtonGroup :default-selected-keys="['left']" disallow-empty-selection selection-mode="single">
        <ToggleButton id="left">Left</ToggleButton>
      </ToggleButtonGroup>
    `)

    await wrapper.findAll('button')[0]!.trigger('click')
    await nextTick()

    expect(pressed(wrapper)).toEqual([true])
    wrapper.unmount()
  })

  it('propagates group size and isDisabled to children', async () => {
    const wrapper = mountGroup(`
      <ToggleButtonGroup is-disabled size="lg">
        <ToggleButton id="a">A</ToggleButton>
      </ToggleButtonGroup>
    `)
    await nextTick()

    const button = wrapper.find('button')
    expect(button.attributes('data-disabled')).toBe('true')
    expect(button.attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })

  it('still works standalone without a group', async () => {
    const wrapper = mount(ToggleButton, { props: { defaultSelected: true } })
    await nextTick()

    expect(wrapper.find('button').attributes('data-selected')).toBe('true')
    wrapper.unmount()
  })
})

describe('ToggleButtonGroup keyboard navigation', () => {
  it('moves focus between buttons with arrow keys', async () => {
    const wrapper = mountGroup(`
      <ToggleButtonGroup selection-mode="multiple">
        <ToggleButton id="bold">B</ToggleButton>
        <ToggleButton id="italic">I</ToggleButton>
      </ToggleButtonGroup>
    `)
    await nextTick()

    const buttons = wrapper.findAll('button')
    const first = buttons[0]!.element as HTMLElement
    first.focus()
    first.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }))
    await nextTick()

    expect(document.activeElement).toBe(buttons[1]!.element)
    wrapper.unmount()
  })
})
