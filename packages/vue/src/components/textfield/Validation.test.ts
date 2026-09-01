/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import ValidatedField from './__fixtures__/ValidatedField.vue'

enableAutoUnmount(afterEach)

describe('TextField validate', () => {
  it('surfaces the message from validate through FieldError', async () => {
    const wrapper = mount(ValidatedField, { attachTo: document.body })

    await wrapper.get('input').setValue('nope')
    await nextTick()

    expect(wrapper.get('[data-slot="field-error"]').text()).toBe('Must contain an @')
    expect(wrapper.get('[data-slot="textfield"]').attributes('data-invalid')).toBe('true')
  })

  it('clears the error once the value validates', async () => {
    const wrapper = mount(ValidatedField, { attachTo: document.body })

    await wrapper.get('input').setValue('nope')
    await nextTick()
    await wrapper.get('input').setValue('a@b.com')
    await nextTick()

    expect(wrapper.find('[data-slot="field-error"]').exists()).toBe(false)
    expect(wrapper.get('[data-slot="textfield"]').attributes('data-invalid')).toBeUndefined()
  })
})

describe('TextField validation timing', () => {
  it('stays quiet until the field has been interacted with', () => {
    const wrapper = mount(ValidatedField, { attachTo: document.body })

    // An untouched empty field fails validate(), but showing the error before
    // the user has typed anything is wrong; React Aria waits for interaction.
    expect(wrapper.find('[data-slot="field-error"]').exists()).toBe(false)
    expect(wrapper.get('[data-slot="textfield"]').attributes('data-invalid')).toBeUndefined()
  })
})
