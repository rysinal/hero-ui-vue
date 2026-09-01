import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ComposedField from './__fixtures__/ComposedField.vue'
import ContextField from './__fixtures__/ContextField.vue'
import EditableField from './__fixtures__/EditableField.vue'
import ShorthandField from './__fixtures__/ShorthandField.vue'

describe('TextField composition', () => {
  it('renders composed children instead of its own input', () => {
    const wrapper = mount(ComposedField)

    // React's TextField is a pure container. Composing an InputGroup inside it
    // must not also emit the shorthand input.
    expect(wrapper.find('[data-slot="input-group"]').exists()).toBe(true)
    expect(wrapper.findAll('input')).toHaveLength(1)
    expect(wrapper.find('[data-slot="input-group-prefix"]').text()).toBe('https://')
  })

  it('keeps the shorthand props working when nothing is composed', () => {
    const wrapper = mount(ShorthandField)

    expect(wrapper.find('[data-slot="label"]').text()).toBe('Email')
    expect(wrapper.find('input').attributes('placeholder')).toBe('name@email.com')
    expect(wrapper.find('[data-slot="description"]').text()).toBe('Helper text')
  })
})

describe('TextField context', () => {
  it('passes type, value and state down to a composed Input', async () => {
    const wrapper = mount(ContextField)
    const input = wrapper.get('input')

    expect(input.attributes('type')).toBe('email')
    expect((input.element as HTMLInputElement).value).toBe('a@b.com')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('emits update:modelValue when a composed Input changes', async () => {
    const wrapper = mount(EditableField)

    await wrapper.get('input').setValue('typed')

    expect(wrapper.get('[data-slot="description"]').text()).toBe('5')
  })
})
