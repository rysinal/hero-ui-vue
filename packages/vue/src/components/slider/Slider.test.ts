/* global document, ResizeObserver, PointerEvent */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BasicSlider from './__fixtures__/BasicSlider.vue'
import RangeSlider from './__fixtures__/RangeSlider.vue'

// radix's Slider measures its track; jsdom has no ResizeObserver.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const originalResizeObserver = globalThis.ResizeObserver
globalThis.ResizeObserver = ResizeObserverStub as typeof ResizeObserver

afterAll(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

enableAutoUnmount(afterEach)

describe('Slider', () => {
  it('renders every part and resolves the dotted names', async () => {
    const wrapper = mount(BasicSlider, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<slider\.[a-z]+/i)
    expect(wrapper.find('[data-slot="slider"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="slider-track"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="slider-fill"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="slider-thumb"]').exists()).toBe(true)
  })

  it('sizes the fill from the current value', async () => {
    const wrapper = mount(BasicSlider, { attachTo: document.body })
    await nextTick()

    const fill = wrapper.get('[data-slot="slider-fill"]')
    expect(fill.attributes('style')).toContain('width: 40%')
    expect(fill.attributes('style')).toContain('left: 0%')
  })

  it('spans between both thumbs for a range', async () => {
    const wrapper = mount(RangeSlider, { attachTo: document.body })
    await nextTick()

    const fill = wrapper.get('[data-slot="slider-fill"]')
    expect(fill.attributes('style')).toContain('left: 20%')
    expect(fill.attributes('style')).toContain('width: 40%')
  })

  it('outputs the value, joining both ends of a range', async () => {
    const single = mount(BasicSlider, { attachTo: document.body })
    await nextTick()
    expect(single.get('[data-slot="slider-output"]').text()).toBe('40')

    const range = mount(RangeSlider, { attachTo: document.body })
    await nextTick()
    expect(range.get('[data-slot="slider-output"]').text()).toBe('20 – 60')
  })

  it('marks the track so the css can round the filled end', async () => {
    const wrapper = mount(BasicSlider, { attachTo: document.body })
    await nextTick()

    const track = wrapper.get('[data-slot="slider-track"]')
    expect(track.attributes('data-fill-start')).toBe('true')
    expect(track.attributes('data-fill-end')).toBeUndefined()
  })
})

describe('Slider uncontrolled behaviour', () => {
  it('updates its own value when nothing controls it', async () => {
    const wrapper = mount(BasicSlider, { attachTo: document.body })
    await nextTick()

    // defaultValue alone must still allow the slider to move; only an
    // explicit modelValue should pin it. Emit from radix's root, which is what
    // reports a drag or key press.
    const radixRoot = wrapper.findAllComponents({ name: 'SliderRoot' }).at(-1)!
    radixRoot.vm.$emit('update:modelValue', [55])
    await nextTick()

    expect(wrapper.get('[data-slot="slider-fill"]').attributes('style')).toContain('width: 55%')
  })
})

describe('Slider dragging state', () => {
  // slider.css keys the grabbing cursor and the shrunken thumb off
  // [data-dragging="true"]. radix-vue drives the drag and only reports
  // valueCommit at the end, so the start is observed on the root.
  it('marks the thumb as dragging for the duration of a pointer drag', async () => {
    const wrapper = mount(BasicSlider, { attachTo: document.body })
    await nextTick()

    const thumb = wrapper.get('[data-slot="slider-thumb"]')
    expect(thumb.attributes('data-dragging')).toBeUndefined()

    await wrapper.get('[data-slot="slider"]').trigger('pointerdown')
    expect(thumb.attributes('data-dragging')).toBe('true')

    document.dispatchEvent(new PointerEvent('pointerup'))
    await nextTick()
    expect(thumb.attributes('data-dragging')).toBeUndefined()
  })

  it('clears the drag when the pointer is cancelled rather than released', async () => {
    const wrapper = mount(BasicSlider, { attachTo: document.body })
    await nextTick()
    await wrapper.get('[data-slot="slider"]').trigger('pointerdown')

    document.dispatchEvent(new PointerEvent('pointercancel'))
    await nextTick()

    expect(wrapper.get('[data-slot="slider-thumb"]').attributes('data-dragging')).toBeUndefined()
  })

  it('stops tracking the drag once unmounted', async () => {
    const wrapper = mount(BasicSlider, { attachTo: document.body })
    await nextTick()
    await wrapper.get('[data-slot="slider"]').trigger('pointerdown')

    wrapper.unmount()

    // A drag released after teardown must not reach the removed listeners.
    expect(() => document.dispatchEvent(new PointerEvent('pointerup'))).not.toThrow()
  })
})
