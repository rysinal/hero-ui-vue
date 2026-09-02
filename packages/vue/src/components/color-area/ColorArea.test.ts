/* global document, PointerEvent */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicColorArea from './__fixtures__/BasicColorArea.vue'

enableAutoUnmount(afterEach)

describe('ColorArea', () => {
  it('renders every part and resolves the dotted names', async () => {
    const wrapper = mount(BasicColorArea, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<colorarea\.[a-z]+/i)
    expect(wrapper.find('[data-slot="color-area"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="color-area-thumb"]').exists()).toBe(true)
  })

  it('places the thumb from the two channels, with y inverted', async () => {
    const wrapper = mount(BasicColorArea, { attachTo: document.body })
    await nextTick()

    // hsl(220, 100%, 50%) is fully saturated, so the thumb sits at the right
    // edge; brightness is at its maximum, which is the top once y is flipped.
    const style = wrapper.get('[data-slot="color-area-thumb"]').attributes('style')
    expect(style).toContain('left: 100%')
    expect(style).toContain('top: 0%')
  })

  it('exposes the colour on the thumb for assistive tech', async () => {
    const wrapper = mount(BasicColorArea, { attachTo: document.body })
    await nextTick()

    const thumb = wrapper.get('[data-slot="color-area-thumb"]')
    expect(thumb.attributes('role')).toBe('slider')
    expect(thumb.attributes('aria-valuetext')).toBeTruthy()
  })

  // color-area.css only enlarges the thumb from [data-dragging="true"], so
  // without this attribute the rule never applies and a drag has no feedback.
  it('marks the thumb as dragging for the duration of a pointer drag', async () => {
    const wrapper = mount(BasicColorArea, { attachTo: document.body })
    await nextTick()

    const thumb = wrapper.get('[data-slot="color-area-thumb"]')
    expect(thumb.attributes('data-dragging')).toBeUndefined()

    await wrapper.get('[data-slot="color-area"]').trigger('pointerdown')
    expect(thumb.attributes('data-dragging')).toBe('true')

    document.dispatchEvent(new PointerEvent('pointerup'))
    await nextTick()
    expect(thumb.attributes('data-dragging')).toBeUndefined()
  })

  it('ignores a drag while disabled', async () => {
    const wrapper = mount(BasicColorArea, {
      attachTo: document.body,
      props: { isDisabled: true },
    })
    await nextTick()

    await wrapper.get('[data-slot="color-area"]').trigger('pointerdown')

    expect(wrapper.get('[data-slot="color-area-thumb"]').attributes('data-dragging')).toBeUndefined()
  })

  it('stops tracking the drag once unmounted', async () => {
    const wrapper = mount(BasicColorArea, { attachTo: document.body })
    await nextTick()
    await wrapper.get('[data-slot="color-area"]').trigger('pointerdown')

    wrapper.unmount()

    // A drag released after teardown must not reach the removed listeners.
    expect(() => document.dispatchEvent(new PointerEvent('pointerup'))).not.toThrow()
  })
})
