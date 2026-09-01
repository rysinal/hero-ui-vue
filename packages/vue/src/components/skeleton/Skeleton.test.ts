/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { clearCSSVariableCache } from '../../composables'
import Skeleton from './Skeleton.vue'

enableAutoUnmount(afterEach)

afterEach(() => {
  document.documentElement.style.removeProperty('--skeleton-animation')
  clearCSSVariableCache()
})

describe('Skeleton animation type', () => {
  // The variable can only be read on the client, so the value settles one tick
  // after mount. This mirrors React, which gates the read behind useIsSSR.
  it('follows the --skeleton-animation CSS variable once hydrated', async () => {
    document.documentElement.style.setProperty('--skeleton-animation', 'pulse')

    const wrapper = mount(Skeleton, { attachTo: document.body })
    await nextTick()

    expect(wrapper.classes().join(' ')).toContain('pulse')
  })

  it('lets an explicit prop win over the CSS variable', async () => {
    document.documentElement.style.setProperty('--skeleton-animation', 'pulse')

    const wrapper = mount(Skeleton, {
      attachTo: document.body,
      props: { animationType: 'none' as const },
    })
    await nextTick()

    expect(wrapper.classes().join(' ')).not.toContain('pulse')
  })

  it('falls back to the default animation when no variable is set', async () => {
    const wrapper = mount(Skeleton, { attachTo: document.body })
    await nextTick()

    expect(wrapper.classes().join(' ')).toContain('skeleton')
  })
})
