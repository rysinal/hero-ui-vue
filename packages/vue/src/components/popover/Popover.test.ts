/* global document, HTMLElement, ResizeObserver */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
  PopoverTrigger,
} from './index'

enableAutoUnmount(afterEach)

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const originalResizeObserver = globalThis.ResizeObserver
globalThis.ResizeObserver = ResizeObserverStub as typeof ResizeObserver

beforeEach(() => {
  document.body.innerHTML = '<div id="popover-portal"></div>'
})

afterEach(async () => {
  await nextTick()
  document.body.innerHTML = ''
})

afterAll(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

const flushPopover = async () => {
  await nextTick()
  await Promise.resolve()
  await nextTick()
}

const createPopover = () =>
  mount(
    {
      components: {
        Popover,
        PopoverArrow,
        PopoverContent,
        PopoverDialog,
        PopoverHeading,
        PopoverTrigger,
      },
      template: `
        <Popover>
          <PopoverTrigger as-child>
            <button data-test="trigger">Open popover</button>
          </PopoverTrigger>
          <PopoverContent portal-container="#popover-portal" placement="top" :offset="12" data-test="content">
            <PopoverDialog data-test="dialog">
              <PopoverArrow data-test="arrow" />
              <PopoverHeading data-test="heading">Popover title</PopoverHeading>
              <p>Popover body</p>
            </PopoverDialog>
          </PopoverContent>
        </Popover>
      `,
    },
    { attachTo: document.body },
  )

describe('Popover', () => {
  it('opens from a trigger and renders popover semantics', async () => {
    const wrapper = createPopover()

    expect(document.querySelector('[data-slot="popover-content"]')).toBeNull()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushPopover()

    const content = document.querySelector<HTMLElement>('[data-slot="popover-content"]')
    const dialog = document.querySelector<HTMLElement>('[data-slot="popover-dialog"]')

    expect(content).not.toBeNull()
    expect(content?.getAttribute('data-placement')).toBe('top')
    expect(content?.getAttribute('data-entering')).toBe('true')
    expect(dialog?.getAttribute('role')).toBe('dialog')
    expect(document.querySelector('[data-slot="popover-overlay-arrow"]')).not.toBeNull()
    expect(document.querySelector('[data-test="heading"]')?.tagName).toBe('H3')
  })

  it('supports custom heading level and custom content attributes', async () => {
    const wrapper = mount(
      {
        components: {
          Popover,
          PopoverContent,
          PopoverDialog,
          PopoverHeading,
          PopoverTrigger,
        },
        template: `
          <Popover default-open>
            <PopoverTrigger as-child>
              <button>Open</button>
            </PopoverTrigger>
            <PopoverContent data-custom="foo" portal-container="#popover-portal">
              <PopoverDialog>
                <PopoverHeading :level="4" data-test="heading">Title</PopoverHeading>
              </PopoverDialog>
            </PopoverContent>
          </Popover>
        `,
      },
      { attachTo: document.body },
    )
    await flushPopover()

    expect(wrapper.exists()).toBe(true)
    expect(document.querySelector('[data-slot="popover-content"]')?.getAttribute('data-custom')).toBe(
      'foo',
    )
    expect(document.querySelector('[data-test="heading"]')?.tagName).toBe('H4')
  })

  it('emits controlled open changes', async () => {
    const isOpen = ref(false)
    const wrapper = mount(
      {
        components: {
          Popover,
          PopoverContent,
          PopoverDialog,
          PopoverTrigger,
        },
        setup() {
          return { isOpen }
        },
        template: `
          <Popover v-model="isOpen">
            <PopoverTrigger as-child>
              <button data-test="trigger">Toggle</button>
            </PopoverTrigger>
            <PopoverContent portal-container="#popover-portal">
              <PopoverDialog>Content</PopoverDialog>
            </PopoverContent>
          </Popover>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushPopover()

    expect(isOpen.value).toBe(true)
    expect(document.querySelector('[data-slot="popover-content"]')).not.toBeNull()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushPopover()

    expect(isOpen.value).toBe(false)
    expect(document.querySelector('[data-slot="popover-content"]')).toBeNull()
  })

  it('does not open from a disabled trigger', async () => {
    const wrapper = mount(
      {
        components: {
          Popover,
          PopoverContent,
          PopoverDialog,
          PopoverTrigger,
        },
        template: `
          <Popover>
            <PopoverTrigger as-child disabled>
              <button data-test="trigger">Open</button>
            </PopoverTrigger>
            <PopoverContent portal-container="#popover-portal">
              <PopoverDialog>Content</PopoverDialog>
            </PopoverContent>
          </Popover>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushPopover()

    expect(document.querySelector('[data-slot="popover-content"]')).toBeNull()
  })
})

describe('Popover accessibility', () => {
  it('labels the dialog with its heading', async () => {
    const wrapper = mount(
      {
        components: { Popover, PopoverTrigger, PopoverContent, PopoverDialog, PopoverHeading },
        template: `
          <Popover>
            <PopoverTrigger data-test="trigger">Open</PopoverTrigger>
            <PopoverContent>
              <PopoverDialog>
                <PopoverHeading>Popover title</PopoverHeading>
                <p>Body</p>
              </PopoverDialog>
            </PopoverContent>
          </Popover>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))

    const dialog = document.querySelector('[data-slot="popover-dialog"]')
    const heading = document.querySelector('[data-slot="popover-heading"]')

    expect(heading?.id).toBeTruthy()
    expect(dialog?.getAttribute('aria-labelledby')).toBe(heading?.id)
    wrapper.unmount()
  })
})
