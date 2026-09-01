import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Textarea from './Textarea.vue'

describe('Textarea v-model', () => {
  it('supports v-model through modelValue', async () => {
    const wrapper = mount(Textarea, { props: { modelValue: 'hello' } })

    expect((wrapper.get('textarea').element as HTMLTextAreaElement).value).toBe('hello')

    await wrapper.get('textarea').setValue('world')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('world')
  })

  it('keeps the legacy value / update:value pair working', async () => {
    const wrapper = mount(Textarea, { props: { value: 'legacy' } })

    expect((wrapper.get('textarea').element as HTMLTextAreaElement).value).toBe('legacy')

    await wrapper.get('textarea').setValue('changed')
    expect(wrapper.emitted('update:value')?.[0]?.[0]).toBe('changed')
  })
})
