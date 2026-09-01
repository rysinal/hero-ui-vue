/* global document, setTimeout */
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import BasicDropdown from './__fixtures__/BasicDropdown.vue'
import SelectableDropdown from './__fixtures__/SelectableDropdown.vue'

const flush = () => new Promise((resolve) => setTimeout(resolve, 120))

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Dropdown', () => {
  it('renders the menu and its items when open', async () => {
    mount(BasicDropdown, { attachTo: document.body })
    await flush()

    expect(document.querySelector('[data-slot="dropdown-popover"]')).not.toBeNull()
    expect(document.querySelectorAll('[data-slot="menu-item"]')).toHaveLength(3)
    expect(document.body.innerHTML).not.toMatch(/<dropdown\.[a-z]+/i)
  })

  it('marks a disabled item so menu-item.css can style it', async () => {
    mount(BasicDropdown, { attachTo: document.body })
    await flush()

    const disabled = [...document.querySelectorAll('[data-slot="menu-item"]')].find(
      (item) => item.textContent?.trim() === 'Edit',
    )
    expect(disabled?.getAttribute('data-disabled')).toBe('true')
  })

  it('reflects the selection on the item and its indicator', async () => {
    mount(SelectableDropdown, { attachTo: document.body })
    await flush()

    const items = [...document.querySelectorAll('[data-slot="menu-item"]')]
    const listItem = items.find((item) => item.textContent?.includes('List'))
    const gridItem = items.find((item) => item.textContent?.includes('Grid'))

    expect(listItem?.getAttribute('data-selected')).toBe('true')
    expect(gridItem?.getAttribute('data-selected')).toBeNull()
    // menu-item.css keys the checkmark off data-visible on the indicator.
    expect(listItem?.querySelector('[data-slot="menu-item-indicator"]')?.getAttribute('data-visible')).toBe('true')
  })

  it('tells the menu which selection mode is in play', async () => {
    mount(SelectableDropdown, { attachTo: document.body })
    await flush()

    expect(
      document.querySelector('[data-slot="dropdown-menu"]')?.getAttribute('data-selection-mode'),
    ).toBe('single')
  })
})
