/* global document, setTimeout */
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import BasicComboBox from './__fixtures__/BasicComboBox.vue'

const flush = () => new Promise((resolve) => setTimeout(resolve, 120))

beforeEach(() => {
  document.body.innerHTML = ''
})

const optionTexts = () =>
  [...document.querySelectorAll('[data-slot="list-box-item"]')].map((item) =>
    item.textContent?.trim(),
  )

describe('ComboBox', () => {
  it('renders every part and resolves the dotted names', async () => {
    const wrapper = mount(BasicComboBox, { attachTo: document.body })
    await flush()

    expect(wrapper.html()).not.toMatch(/<combobox\.[a-z]+/i)
    expect(document.querySelector('[data-slot="combo-box"]')).not.toBeNull()
    expect(document.querySelector('[data-slot="combo-box-input-group"]')).not.toBeNull()
    expect(document.querySelector('[data-slot="combo-box-trigger"]')).not.toBeNull()
    expect(optionTexts()).toHaveLength(5)
  })

  it('filters the list as the input changes', async () => {
    const wrapper = mount(BasicComboBox, { attachTo: document.body })
    await flush()

    await wrapper.get('input').setValue('an')
    await flush()

    // Case-insensitive contains: Kangaroo and Panda both hold "an".
    expect(optionTexts()).toEqual(['Kangaroo', 'Panda'])
  })

  it('matches case-insensitively', async () => {
    const wrapper = mount(BasicComboBox, { attachTo: document.body })
    await flush()

    await wrapper.get('input').setValue('CAT')
    await flush()

    expect(optionTexts()).toEqual(['Cat'])
  })

  it('shows everything again when the input is cleared', async () => {
    const wrapper = mount(BasicComboBox, { attachTo: document.body })
    await flush()

    await wrapper.get('input').setValue('dog')
    await flush()
    expect(optionTexts()).toHaveLength(1)

    await wrapper.get('input').setValue('')
    await flush()
    expect(optionTexts()).toHaveLength(5)
  })

  it('puts the chosen label in the input and closes', async () => {
    const wrapper = mount(BasicComboBox, { attachTo: document.body })
    await flush()

    const dog = [...document.querySelectorAll('[data-slot="list-box-item"]')].find((item) =>
      item.textContent?.includes('Dog'),
    ) as HTMLElement
    dog.click()
    await flush()

    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('Dog')
    expect(document.querySelector('[data-slot="combo-box-popover"]')).toBeNull()
  })
})
