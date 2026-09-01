/* global document, KeyboardEvent */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { ColorSwatch } from '../color-swatch'
import HueSlider from './__fixtures__/HueSlider.vue'

enableAutoUnmount(afterEach)

describe('ColorSlider', () => {
  it('renders every part and resolves the dotted names', async () => {
    const wrapper = mount(HueSlider, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<colorslider\.[a-z]+/i)
    expect(wrapper.find('[data-slot="color-slider-track"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="color-slider-thumb"]').exists()).toBe(true)
  })

  it('shows the channel value rather than the whole colour', async () => {
    const wrapper = mount(HueSlider, { attachTo: document.body })
    await nextTick()

    expect(wrapper.get('[data-slot="color-slider-output"]').text()).toBe('0°')
  })

  it('paints the track with a gradient across the channel', async () => {
    const wrapper = mount(HueSlider, { attachTo: document.body })
    await nextTick()

    const style = wrapper.get('[data-slot="color-slider-track"]').attributes('style')
    expect(style).toContain('linear-gradient')
  })

  it('moves the channel with the arrow keys', async () => {
    const wrapper = mount(HueSlider, { attachTo: document.body })
    await nextTick()

    const thumb = wrapper.get('[data-slot="color-slider-thumb"]')
    expect(thumb.attributes('aria-valuenow')).toBe('0')

    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.get('[data-slot="color-slider-thumb"]').attributes('aria-valuenow')).toBe('1')

    await wrapper.get('[data-slot="color-slider-thumb"]').trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.get('[data-slot="color-slider-thumb"]').attributes('aria-valuenow')).toBe('0')
  })

  it('exposes the channel range to assistive tech', async () => {
    const wrapper = mount(HueSlider, { attachTo: document.body })
    await nextTick()

    const thumb = wrapper.get('[data-slot="color-slider-thumb"]')
    expect(thumb.attributes('aria-valuemin')).toBe('0')
    expect(thumb.attributes('aria-valuemax')).toBe('360')
    expect(thumb.attributes('role')).toBe('slider')
  })
})

describe('ColorSwatch', () => {
  it('paints from the css variable the stylesheet reads', () => {
    const wrapper = mount(ColorSwatch, { props: { color: '#7434ff' } })

    expect(wrapper.attributes('style')).toContain('--color-swatch-current: #7434ff')
    expect(wrapper.classes().join(' ')).toContain('color-swatch')
  })

  it('accepts a parsed colour as well as a string', () => {
    const wrapper = mount(ColorSwatch, { props: { color: 'rgb(1, 2, 3)', shape: 'square' } })

    expect(wrapper.attributes('style')).toContain('rgb(1, 2, 3)')
    expect(wrapper.classes().join(' ')).toContain('color-swatch--square')
  })
})
