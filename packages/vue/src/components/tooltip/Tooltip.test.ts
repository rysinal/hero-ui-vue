/* global document, setTimeout */
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import BasicTooltip from './__fixtures__/BasicTooltip.vue'

const flush = () => new Promise((resolve) => setTimeout(resolve, 200))

/**
 * The tooltip teleports into body and radix's popper teardown throws under
 * jsdom, so mount once and assert everything against that single render
 * rather than unmounting between cases.
 */
describe('Tooltip', () => {
  beforeAll(async () => {
    mount(BasicTooltip, { attachTo: document.body })
    await flush()
  })

  it('renders its content when open', () => {
    const tooltip = document.querySelector('[data-slot="tooltip"]')

    expect(tooltip).not.toBeNull()
    expect(tooltip?.textContent).toContain('Tooltip content')
  })

  it('applies the tooltip class and placement contract', () => {
    const tooltip = document.querySelector('[data-slot="tooltip"]')

    // tooltip.css keys its animations off data-placement and data-entering.
    expect(tooltip?.className).toContain('tooltip')
    expect(tooltip?.getAttribute('data-placement')).toBe('top')
    expect(tooltip?.getAttribute('data-entering')).toBe('true')
  })

  it('renders the default arrow', () => {
    // React puts tooltip-arrow on the wrapper and overlay-arrow on the svg it
    // wraps; tooltip.css selects the inner one, so both have to be emitted.
    const arrow = document.querySelector('[data-slot="tooltip-arrow"]')

    expect(arrow).not.toBeNull()
    expect(arrow?.querySelector('[data-slot="overlay-arrow"]')).not.toBeNull()
  })

  it('resolves every dotted part to a real component', () => {
    expect(document.body.innerHTML).not.toMatch(/<tooltip\.[a-z]+/i)
    expect(document.querySelector('[data-slot="tooltip-trigger"]')).not.toBeNull()
  })
})
