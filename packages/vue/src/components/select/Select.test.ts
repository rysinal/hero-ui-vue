/* global document, HTMLElement, MouseEvent, ResizeObserver */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { ListBox, ListBoxItem, ListBoxItemIndicator } from '../list-box'
import { Select, SelectIndicator, SelectPopover, SelectTrigger, SelectValue } from './index'

enableAutoUnmount(afterEach)

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const originalResizeObserver = globalThis.ResizeObserver
globalThis.ResizeObserver = ResizeObserverStub as typeof ResizeObserver

beforeEach(() => {
  document.body.innerHTML = '<div id="select-portal"></div>'
})

afterEach(async () => {
  await nextTick()
  document.body.innerHTML = ''
})

afterAll(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

const flushSelect = async () => {
  await nextTick()
  await Promise.resolve()
  await nextTick()
}

const components = {
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
}

describe('Select', () => {
  it('opens from the trigger, selects one item, and closes the popover', async () => {
    const value = ref<string | number | null>(null)
    const wrapper = mount(
      {
        components,
        setup() {
          return { value }
        },
        template: `
          <Select v-model="value" placeholder="Select one">
            <SelectTrigger data-test="trigger">
              <SelectValue data-test="value" />
              <SelectIndicator />
            </SelectTrigger>
            <SelectPopover portal-container="#select-portal">
              <ListBox>
                <ListBoxItem value="florida" text-value="Florida" data-test="option-florida">
                  Florida
                  <ListBoxItemIndicator />
                </ListBoxItem>
                <ListBoxItem value="texas" text-value="Texas" data-test="option-texas">
                  Texas
                  <ListBoxItemIndicator />
                </ListBoxItem>
              </ListBox>
            </SelectPopover>
          </Select>
        `,
      },
      { attachTo: document.body },
    )

    expect(wrapper.get('[data-test="value"]').text()).toBe('Select one')

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushSelect()

    expect(document.querySelector('[data-slot="select-popover"]')).not.toBeNull()

    document
      .querySelector<HTMLElement>('[data-test="option-florida"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushSelect()

    expect(value.value).toBe('florida')
    expect(wrapper.get('[data-test="value"]').text()).toBe('Florida')
    expect(document.querySelector('[data-slot="select-popover"]')).toBeNull()
  })

  it('keeps multiple selection popovers open while selected keys accumulate', async () => {
    const value = ref<(string | number)[]>([])
    const wrapper = mount(
      {
        components,
        setup() {
          return { value }
        },
        template: `
          <Select v-model="value" selection-mode="multiple">
            <SelectTrigger data-test="trigger">
              <SelectValue data-test="value" />
              <SelectIndicator />
            </SelectTrigger>
            <SelectPopover portal-container="#select-portal">
              <ListBox>
                <ListBoxItem value="florida" text-value="Florida" data-test="option-florida">
                  Florida
                  <ListBoxItemIndicator />
                </ListBoxItem>
                <ListBoxItem value="texas" text-value="Texas" data-test="option-texas">
                  Texas
                  <ListBoxItemIndicator />
                </ListBoxItem>
              </ListBox>
            </SelectPopover>
          </Select>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushSelect()

    document
      .querySelector<HTMLElement>('[data-test="option-florida"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    document
      .querySelector<HTMLElement>('[data-test="option-texas"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushSelect()

    expect(value.value).toEqual(['florida', 'texas'])
    expect(wrapper.get('[data-test="value"]').text()).toBe('Florida, Texas')
    expect(document.querySelector('[data-slot="select-popover"]')).not.toBeNull()
  })

  it('does not select disabled keys from the select context', async () => {
    const value = ref<string | number | null>(null)
    const wrapper = mount(
      {
        components,
        setup() {
          return { value }
        },
        template: `
          <Select v-model="value" :disabled-keys="['texas']">
            <SelectTrigger data-test="trigger">
              <SelectValue />
              <SelectIndicator />
            </SelectTrigger>
            <SelectPopover portal-container="#select-portal">
              <ListBox>
                <ListBoxItem value="texas" text-value="Texas" data-test="option-texas">
                  Texas
                  <ListBoxItemIndicator />
                </ListBoxItem>
              </ListBox>
            </SelectPopover>
          </Select>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushSelect()

    const option = document.querySelector<HTMLElement>('[data-test="option-texas"]')
    expect(option?.getAttribute('data-disabled')).toBe('true')

    option?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushSelect()

    expect(value.value).toBeNull()
  })

  it('supports root element customization and attribute passthrough', () => {
    const wrapper = mount({
      components,
      template: `
        <Select as="section" data-custom="foo">
          <SelectTrigger>
            <SelectValue />
            <SelectIndicator />
          </SelectTrigger>
        </Select>
      `,
    })

    const root = wrapper.get('[data-slot="select"]')

    expect(root.element.tagName).toBe('SECTION')
    expect(root.attributes('data-custom')).toBe('foo')
  })
})

describe('Select value label before first open', () => {
  const template = (selectProps: string) => `
    <Select ${selectProps}>
      <SelectTrigger data-test="trigger">
        <SelectValue data-test="value" />
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover portal-container="#select-portal">
        <ListBox>
          <ListBoxItem value="california" text-value="California">California</ListBoxItem>
          <ListBoxItem value="texas" text-value="Texas">Texas</ListBoxItem>
        </ListBox>
      </SelectPopover>
    </Select>
  `

  it('renders the item label for defaultValue while the popover has never opened', async () => {
    const wrapper = mount(
      { components, template: template('default-value="california"') },
      { attachTo: document.body },
    )
    await flushSelect()

    expect(wrapper.get('[data-test="value"]').text()).toBe('California')
  })

  it('renders the item label for a disabled select', async () => {
    const wrapper = mount(
      { components, template: template('default-value="texas" is-disabled') },
      { attachTo: document.body },
    )
    await flushSelect()

    expect(wrapper.get('[data-test="value"]').text()).toBe('Texas')
  })

  it('renders labels for a multiple selection before opening', async () => {
    const wrapper = mount(
      {
        components,
        template: template(':default-value="[\'california\', \'texas\']" selection-mode="multiple"'),
      },
      { attachTo: document.body },
    )
    await flushSelect()

    expect(wrapper.get('[data-test="value"]').text()).toBe('California, Texas')
  })
})
