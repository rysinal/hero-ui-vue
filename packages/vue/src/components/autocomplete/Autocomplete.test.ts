/* global document, Event, HTMLElement, HTMLInputElement, MouseEvent, ResizeObserver */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useFilter } from '../../composables'
import DotNotationAutocomplete from './__fixtures__/DotNotationAutocomplete.vue'
import FilterableAutocomplete from './__fixtures__/FilterableAutocomplete.vue'

enableAutoUnmount(afterEach)

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const originalResizeObserver = globalThis.ResizeObserver
globalThis.ResizeObserver = ResizeObserverStub as typeof ResizeObserver

beforeEach(() => {
  document.body.innerHTML = '<div id="autocomplete-portal"></div>'
})

afterEach(async () => {
  await nextTick()
  document.body.innerHTML = ''
})

afterAll(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

const flush = async () => {
  for (let tick = 0; tick < 3; tick += 1) {
    await nextTick()
    await Promise.resolve()
  }
}

const openPopover = async (trigger: HTMLElement) => {
  trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await flush()
}

const clickItem = async (selector: string) => {
  document
    .querySelector<HTMLElement>(selector)
    ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await flush()
}

const countItems = () => document.querySelectorAll('[data-slot="list-box-item"]').length

/** jsdom does not run the search field's own handlers, so drive the DOM directly. */
const typeInSearch = async (value: string) => {
  const input = document.querySelector<HTMLInputElement>('[data-slot="search-field-input"]')
  if (!input) throw new Error('search input not found')

  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await flush()
}

describe('useFilter', () => {
  it('ignores case and accents at base sensitivity', () => {
    const { contains, endsWith, startsWith } = useFilter({ sensitivity: 'base' })

    expect(contains('Café Bar', 'cafe')).toBe(true)
    expect(contains('Florida', 'LOR')).toBe(true)
    expect(contains('Florida', 'zz')).toBe(false)
    expect(contains('Florida', '')).toBe(true)
    expect(startsWith('Delaware', 'dela')).toBe(true)
    expect(startsWith('Delaware', 'ware')).toBe(false)
    expect(endsWith('Delaware', 'WARE')).toBe(true)
  })

  it('respects case at variant sensitivity', () => {
    const { contains } = useFilter()

    expect(contains('Florida', 'FLO')).toBe(false)
    expect(contains('Florida', 'Flo')).toBe(true)
  })
})

describe('Autocomplete', () => {
  it('resolves the dot-notation API without leaking unresolved tags', () => {
    const wrapper = mount(DotNotationAutocomplete, { attachTo: document.body })
    const html = wrapper.html()

    expect(html).not.toContain('<autocomplete.')
    expect(html).toContain('data-slot="autocomplete"')
    expect(html).toContain('data-slot="autocomplete-trigger"')
    expect(html).toContain('data-slot="autocomplete-value"')
    expect(html).toContain('data-slot="autocomplete-clear-button"')
    expect(html).toContain('data-slot="autocomplete-default-indicator"')
  })

  it('shows the selected item text in the value after a single selection', async () => {
    const wrapper = mount(FilterableAutocomplete, { attachTo: document.body })

    expect(wrapper.get('[data-test="default-children"]').text()).toBe('Select one')

    await openPopover(wrapper.get('[data-test="trigger"]').element as HTMLElement)
    expect(document.querySelector('[data-slot="autocomplete-popover"]')).not.toBeNull()

    await clickItem('[data-test="option-florida"]')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['florida'])
    expect(wrapper.get('[data-test="labels"]').text()).toBe('Florida')
    expect(wrapper.get('[data-test="default-children"]').text()).toBe('Florida')
    // Single selection closes the popover, as Select does.
    expect(document.querySelector('[data-slot="autocomplete-popover"]')).toBeNull()
  })

  it('accumulates selected items in multiple mode', async () => {
    const wrapper = mount(FilterableAutocomplete, {
      attachTo: document.body,
      props: { selectionMode: 'multiple' },
    })

    await openPopover(wrapper.get('[data-test="trigger"]').element as HTMLElement)

    await clickItem('[data-test="option-florida"]')
    await clickItem('[data-test="option-california"]')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['florida', 'california']])
    expect(wrapper.get('[data-test="count"]').text()).toBe('2')
    expect(wrapper.get('[data-test="labels"]').text()).toBe('Florida|California')
    // Multiple selection keeps the popover open so more items can be picked.
    expect(document.querySelector('[data-slot="autocomplete-popover"]')).not.toBeNull()
  })

  it('filters the list box items through the Filter predicate', async () => {
    const wrapper = mount(FilterableAutocomplete, { attachTo: document.body })

    await openPopover(wrapper.get('[data-test="trigger"]').element as HTMLElement)

    expect(document.querySelector('[data-slot="autocomplete-filter"]')).not.toBeNull()
    expect(countItems()).toBe(3)

    await typeInSearch('flo')
    expect(countItems()).toBe(1)
    expect(document.querySelector('[data-test="option-florida"]')).not.toBeNull()

    // 'base' sensitivity ignores case.
    await typeInSearch('DELA')
    expect(countItems()).toBe(1)
    expect(document.querySelector('[data-test="option-delaware"]')).not.toBeNull()

    await typeInSearch('zzz')
    expect(countItems()).toBe(0)

    await typeInSearch('')
    expect(countItems()).toBe(3)
  })

  it('leaves every item visible when no filter predicate is supplied', async () => {
    const wrapper = mount(FilterableAutocomplete, {
      attachTo: document.body,
      props: { filtered: false },
    })

    await openPopover(wrapper.get('[data-test="trigger"]').element as HTMLElement)
    await typeInSearch('zzz')

    expect(countItems()).toBe(3)
  })

  it('clears the selection and flips data-empty on the clear button', async () => {
    const wrapper = mount(FilterableAutocomplete, {
      attachTo: document.body,
      props: { withClearButton: true },
    })

    expect(wrapper.get('[data-test="clear"]').attributes('data-empty')).toBe('true')

    await openPopover(wrapper.get('[data-test="trigger"]').element as HTMLElement)
    await clickItem('[data-test="option-delaware"]')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['delaware'])
    expect(wrapper.get('[data-test="clear"]').attributes('data-empty')).toBeUndefined()

    await wrapper.get('[data-test="clear"]').trigger('click')
    await flush()

    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([null])
    expect(wrapper.get('[data-test="default-children"]').text()).toBe('Select one')
    expect(wrapper.get('[data-test="clear"]').attributes('data-empty')).toBe('true')
  })

  it('renders the full data-slot contract', async () => {
    const wrapper = mount(FilterableAutocomplete, {
      attachTo: document.body,
      props: { withClearButton: true, withCustomIndicator: true },
    })

    await openPopover(wrapper.get('[data-test="trigger"]').element as HTMLElement)

    const slots = [
      'autocomplete',
      'autocomplete-trigger',
      'autocomplete-value',
      'autocomplete-clear-button',
      'autocomplete-clear-button-icon',
      'autocomplete-indicator',
      'autocomplete-popover',
      'autocomplete-filter',
    ]

    for (const slot of slots) {
      expect(document.querySelector(`[data-slot="${slot}"]`), slot).not.toBeNull()
    }

    // A custom indicator replaces the default chevron rather than adding to it.
    expect(document.querySelector('[data-slot="autocomplete-default-indicator"]')).toBeNull()
  })
})
