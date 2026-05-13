/* global HTMLInputElement */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Input } from './index'

const inputElement = (wrapper: ReturnType<typeof mount>) =>
  wrapper.get('input').element as HTMLInputElement

describe('Input', () => {
  it('preserves an uncontrolled value across unrelated rerenders', async () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'Name',
      },
    })

    await wrapper.get('input').setValue('Ada Lovelace')
    await wrapper.setProps({ placeholder: 'Full name' })

    expect(inputElement(wrapper).value).toBe('Ada Lovelace')
  })

  it('keeps controlled value updates authoritative', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'Ada',
      },
    })

    await wrapper.get('input').setValue('Grace')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Grace'])

    await wrapper.setProps({ modelValue: 'Katherine' })

    expect(inputElement(wrapper).value).toBe('Katherine')
  })
})
