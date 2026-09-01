import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import {
  Disclosure,
  DisclosureContent,
  DisclosureHeading,
  DisclosureIndicator,
  DisclosureTrigger,
} from '../disclosure'
import { DisclosureGroup } from './index'

const createDisclosureGroup = (
  options: { allowsMultipleExpanded?: boolean; disabled?: boolean } = {},
) =>
  mount({
    components: {
      Disclosure,
      DisclosureContent,
      DisclosureHeading,
      DisclosureIndicator,
      DisclosureGroup,
      DisclosureTrigger,
    },
    setup() {
      const expandedKeys = ref<Set<string | number>>(new Set(['first']))

      return {
        allowsMultipleExpanded: options.allowsMultipleExpanded,
        disabled: options.disabled,
        expandedKeys,
      }
    },
    template: `
      <DisclosureGroup
        v-model:expanded-keys="expandedKeys"
        :allows-multiple-expanded="allowsMultipleExpanded"
        :is-disabled="disabled"
      >
        <Disclosure id="first">
          <DisclosureHeading data-test="first-heading">
            First heading
          </DisclosureHeading>
          <DisclosureTrigger data-test="first-trigger">First</DisclosureTrigger>
          <DisclosureContent data-test="first-content">First content</DisclosureContent>
        </Disclosure>
        <Disclosure id="second">
          <DisclosureTrigger data-test="second-trigger">Second</DisclosureTrigger>
          <DisclosureContent data-test="second-content">Second content</DisclosureContent>
        </Disclosure>
      </DisclosureGroup>
    `,
  })

describe('DisclosureGroup', () => {
  it('coordinates single expanded disclosure by id', async () => {
    const wrapper = createDisclosureGroup()

    expect(wrapper.get('[data-test="first-content"]').attributes('data-expanded')).toBe('true')
    expect(wrapper.get('[data-test="second-content"]').attributes('data-expanded')).toBeUndefined()

    await wrapper.get('[data-test="second-trigger"]').trigger('click')

    expect(wrapper.get('[data-test="first-content"]').attributes('data-expanded')).toBeUndefined()
    expect(wrapper.get('[data-test="second-content"]').attributes('data-expanded')).toBe('true')
  })

  it('can keep multiple disclosures expanded', async () => {
    const wrapper = createDisclosureGroup({ allowsMultipleExpanded: true })

    await wrapper.get('[data-test="second-trigger"]').trigger('click')

    expect(wrapper.get('[data-test="first-content"]').attributes('data-expanded')).toBe('true')
    expect(wrapper.get('[data-test="second-content"]').attributes('data-expanded')).toBe('true')
  })

  it('propagates disabled state to children', async () => {
    const wrapper = createDisclosureGroup({ disabled: true })

    await wrapper.get('[data-test="second-trigger"]').trigger('click')

    expect(wrapper.get('[data-test="first-content"]').attributes('data-expanded')).toBe('true')
    expect(wrapper.get('[data-test="second-content"]').attributes('data-expanded')).toBeUndefined()
    expect(wrapper.get('[data-test="second-trigger"]').attributes('aria-disabled')).toBe('true')
  })

  it('renders disclosure heading with React Aria level semantics', () => {
    const defaultWrapper = createDisclosureGroup()

    expect(defaultWrapper.get('[data-test="first-heading"]').element.tagName).toBe('H3')

    const levelWrapper = mount({
      components: {
        Disclosure,
        DisclosureHeading,
      },
      template: `
        <Disclosure>
          <DisclosureHeading :level="4" data-test="heading">
            Level heading
          </DisclosureHeading>
        </Disclosure>
      `,
    })

    expect(levelWrapper.get('[data-test="heading"]').element.tagName).toBe('H4')
  })

  it('renders the default disclosure indicator as the React source chevron svg', () => {
    const wrapper = mount({
      components: {
        Disclosure,
        DisclosureIndicator,
        DisclosureTrigger,
      },
      template: `
        <Disclosure default-expanded>
          <DisclosureTrigger>
            Trigger
            <DisclosureIndicator data-test="indicator" />
          </DisclosureTrigger>
        </Disclosure>
      `,
    })

    const indicator = wrapper.get('[data-test="indicator"]')

    expect(indicator.element.tagName).toBe('svg')
    expect(indicator.attributes('data-expanded')).toBe('true')
    expect(indicator.attributes('viewBox')).toBe('0 0 16 16')
  })
})

describe('Disclosure collapsed content', () => {
  it('hides collapsed content from the tab order', async () => {
    const wrapper = mount(
      {
        components: { Disclosure, DisclosureContent, DisclosureTrigger },
        template: `
          <Disclosure>
            <DisclosureTrigger>Toggle</DisclosureTrigger>
            <DisclosureContent>
              <button data-test="inside">Inside</button>
            </DisclosureContent>
          </Disclosure>
        `,
      },
      { attachTo: document.body },
    )
    await nextTick()

    expect(wrapper.get('[data-slot="disclosure-content"]').attributes('inert')).toBeDefined()

    await wrapper.get('[data-slot="disclosure-trigger"]').trigger('click')
    await nextTick()

    expect(wrapper.get('[data-slot="disclosure-content"]').attributes('inert')).toBeUndefined()
    wrapper.unmount()
  })
})
