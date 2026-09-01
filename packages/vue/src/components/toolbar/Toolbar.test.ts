/* global document, KeyboardEvent */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { Button } from '../button'
import { Separator } from '../separator'
import { Toolbar } from './index'

enableAutoUnmount(afterEach)

const createToolbar = (orientation = 'horizontal') =>
  mount(
    {
      components: { Toolbar, Button, Separator },
      props: { orientation: { type: String, default: orientation } },
      template: `
        <Toolbar :orientation="orientation">
          <Button data-test="first">One</Button>
          <Separator data-test="separator" />
          <Button data-test="second">Two</Button>
          <Button data-test="third">Three</Button>
        </Toolbar>
      `,
    },
    { attachTo: document.body },
  )

const press = (element: Element, key: string) =>
  element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key }))

describe('Toolbar keyboard navigation', () => {
  it('moves focus with arrow keys instead of tabbing through every control', async () => {
    const wrapper = createToolbar()
    await nextTick()

    const first = wrapper.get('[data-test="first"]').element as HTMLElement
    const second = wrapper.get('[data-test="second"]').element as HTMLElement

    first.focus()
    press(first, 'ArrowRight')
    await nextTick()

    expect(document.activeElement).toBe(second)
    wrapper.unmount()
  })

  it('wraps from the last control back to the first', async () => {
    const wrapper = createToolbar()
    await nextTick()

    const first = wrapper.get('[data-test="first"]').element as HTMLElement
    const third = wrapper.get('[data-test="third"]').element as HTMLElement

    third.focus()
    press(third, 'ArrowRight')
    await nextTick()

    expect(document.activeElement).toBe(first)
    wrapper.unmount()
  })

  it('uses vertical arrows when the toolbar is vertical', async () => {
    const wrapper = createToolbar('vertical')
    await nextTick()

    const first = wrapper.get('[data-test="first"]').element as HTMLElement
    const second = wrapper.get('[data-test="second"]').element as HTMLElement

    first.focus()
    press(first, 'ArrowDown')
    await nextTick()

    expect(document.activeElement).toBe(second)
    wrapper.unmount()
  })
})

describe('Toolbar separator orientation', () => {
  it('flips the separator to cross the toolbar axis', async () => {
    const wrapper = createToolbar()
    await nextTick()

    // React flips SeparatorContext: a horizontal toolbar needs vertical rules.
    expect(wrapper.get('[data-slot="separator"]').attributes('data-orientation')).toBe('vertical')
    wrapper.unmount()
  })
})
