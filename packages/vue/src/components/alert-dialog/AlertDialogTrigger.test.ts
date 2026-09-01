/* global document, setTimeout */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import BareTriggerDialog from './__fixtures__/BareTriggerDialog.vue'
import BystanderDialog from './__fixtures__/BystanderDialog.vue'

enableAutoUnmount(afterEach)

afterEach(() => {
  document.body.innerHTML = ''
})

const flush = () => new Promise((resolve) => setTimeout(resolve, 60))

const isOpen = () => document.querySelector('[data-slot="alert-dialog-dialog"]') !== null

describe('AlertDialog bare trigger', () => {
  it('opens from a plain control used as the first child', async () => {
    // Upstream demos put a bare Button first rather than wrapping it in a
    // Trigger, matching React Aria's DialogTrigger.
    const wrapper = mount(BareTriggerDialog, { attachTo: document.body })

    await wrapper.find('button').trigger('click')
    await flush()

    expect(isOpen()).toBe(true)
  })

  it('does not open from a non-interactive descendant', async () => {
    const wrapper = mount(BystanderDialog, { attachTo: document.body })

    await wrapper.find('[data-test="bystander"]').trigger('click')
    await flush()

    expect(isOpen()).toBe(false)
  })
})
