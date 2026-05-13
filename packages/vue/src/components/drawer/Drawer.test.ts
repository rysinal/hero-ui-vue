/* global Animation, document, HTMLElement, HTMLButtonElement, KeyboardEvent, MouseEvent, WheelEvent, setTimeout, window */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDialog,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerHeading,
  DrawerTrigger,
} from './index'

const cleanupTeleport = () => {
  document.body.innerHTML = ''
}

const flushDrawerAnimation = async () => {
  await nextTick()
  await Promise.resolve()
  await new Promise((resolve) => setTimeout(resolve, 60))
  await nextTick()
}

enableAutoUnmount(afterEach)

const originalScrollToDescriptor = Object.getOwnPropertyDescriptor(window, 'scrollTo')

beforeEach(() => {
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
    writable: true,
  })
})

afterEach(() => {
  vi.useRealTimers()
  if (originalScrollToDescriptor) {
    Object.defineProperty(window, 'scrollTo', originalScrollToDescriptor)
  }
  cleanupTeleport()
})

const createDrawer = () =>
  mount(
    {
      components: {
        Drawer,
        DrawerBackdrop,
        DrawerBody,
        DrawerCloseTrigger,
        DrawerContent,
        DrawerDialog,
        DrawerFooter,
        DrawerHeader,
        DrawerHeading,
        DrawerTrigger,
      },
      template: `
        <Drawer>
          <DrawerTrigger data-test="trigger">Open drawer</DrawerTrigger>
          <DrawerBackdrop>
            <DrawerContent placement="right">
              <DrawerDialog data-test="dialog">
                <DrawerCloseTrigger />
                <DrawerHeader>
                  <DrawerHeading data-test="heading">Drawer title</DrawerHeading>
                </DrawerHeader>
                <DrawerBody>Drawer body</DrawerBody>
                <DrawerFooter>
                  <button data-drawer-close="true" data-test="close">Close</button>
                </DrawerFooter>
              </DrawerDialog>
            </DrawerContent>
          </DrawerBackdrop>
        </Drawer>
      `,
    },
    { attachTo: document.body },
  )

describe('Drawer', () => {
  it('opens from a trigger and closes from a close target', async () => {
    const wrapper = createDrawer()

    expect(document.querySelector('[data-slot="drawer-backdrop"]')).toBeNull()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushDrawerAnimation()

    expect(document.querySelector('[data-slot="drawer-backdrop"]')).not.toBeNull()
    expect(document.querySelector('[data-slot="drawer-dialog"]')?.getAttribute('role')).toBe(
      'dialog',
    )
    expect(document.querySelector('[data-slot="drawer-content"]')?.getAttribute('data-placement')).toBe(
      'right',
    )

    document.querySelector<HTMLButtonElement>('[data-test="close"]')?.click()
    await flushDrawerAnimation()

    expect(document.querySelector('[data-slot="drawer-backdrop"]')).toBeNull()
  })

  it('renders handle and heading semantics', async () => {
    const wrapper = mount(
      {
        components: {
          DrawerBackdrop,
          DrawerBody,
          DrawerContent,
          DrawerDialog,
          DrawerHandle,
          DrawerHeader,
          DrawerHeading,
        },
        template: `
          <DrawerBackdrop default-open>
            <DrawerContent>
              <DrawerDialog>
                <DrawerHandle />
                <DrawerHeader>
                  <DrawerHeading data-test="default-heading">Default heading</DrawerHeading>
                  <DrawerHeading :level="3" data-test="level-heading">Level heading</DrawerHeading>
                </DrawerHeader>
                <DrawerBody>Body</DrawerBody>
              </DrawerDialog>
            </DrawerContent>
          </DrawerBackdrop>
        `,
      },
      { attachTo: document.body },
    )
    await flushDrawerAnimation()

    expect(wrapper.exists()).toBe(true)
    expect(document.querySelector('[data-slot="drawer-handle-bar"]')).not.toBeNull()
    expect(document.querySelector('[data-test="default-heading"]')?.tagName).toBe('H2')
    expect(document.querySelector('[data-test="level-heading"]')?.tagName).toBe('H3')
  })

  it('locks page scroll while open and waits for exit animations before unmounting', async () => {
    const originalGetAnimations = HTMLElement.prototype.getAnimations
    let finishExitAnimation!: () => void
    const exitAnimationFinished = new Promise<Animation>((resolve) => {
      finishExitAnimation = () => resolve({} as Animation)
    })

    HTMLElement.prototype.getAnimations = vi.fn(() => []) as HTMLElement['getAnimations']

    const wrapper = createDrawer()

    try {
      await wrapper.get('[data-test="trigger"]').trigger('click')
      await flushDrawerAnimation()

      expect(document.body.style.overflow).toBe('')
      expect(document.body.style.paddingRight).toBe('')
      expect(document.documentElement.style.overflow).toBe('hidden')
      expect(document.documentElement.style.scrollbarGutter).toBe('stable')
      expect(document.querySelector('[data-slot="drawer-backdrop"]')?.hasAttribute('data-entering')).toBe(
        false,
      )

      HTMLElement.prototype.getAnimations = vi.fn(() => [
        {
          finished: exitAnimationFinished,
          playState: 'running',
        } as Animation,
      ]) as HTMLElement['getAnimations']

      document.querySelector<HTMLButtonElement>('[data-test="close"]')?.click()
      await nextTick()

      expect(document.querySelector('[data-slot="drawer-backdrop"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="drawer-backdrop"]')?.getAttribute('data-exiting')).toBe(
        'true',
      )
      expect(document.querySelector('[data-slot="drawer-content"]')?.getAttribute('data-exiting')).toBe(
        'true',
      )

      await flushDrawerAnimation()
      expect(document.querySelector('[data-slot="drawer-backdrop"]')).not.toBeNull()

      finishExitAnimation()
      await flushDrawerAnimation()

      expect(document.querySelector('[data-slot="drawer-backdrop"]')).toBeNull()
      expect(document.documentElement.style.overflow).toBe('')
      expect(document.documentElement.style.scrollbarGutter).toBe('')
    } finally {
      HTMLElement.prototype.getAnimations = originalGetAnimations
    }
  })

  it('dismisses on backdrop click by default', async () => {
    const wrapper = createDrawer()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushDrawerAnimation()
    document
      .querySelector('[data-slot="drawer-backdrop"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDrawerAnimation()

    expect(document.querySelector('[data-slot="drawer-backdrop"]')).toBeNull()
  })

  it('can keep backdrop click and Escape from dismissing the drawer', async () => {
    const wrapper = mount(
      {
        components: {
          Drawer,
          DrawerBackdrop,
          DrawerContent,
          DrawerDialog,
          DrawerHeading,
          DrawerTrigger,
        },
        template: `
          <Drawer>
            <DrawerTrigger data-test="trigger">Open drawer</DrawerTrigger>
            <DrawerBackdrop :is-dismissable="false" is-keyboard-dismiss-disabled>
              <DrawerContent>
                <DrawerDialog>
                  <DrawerHeading>Locked drawer</DrawerHeading>
                </DrawerDialog>
              </DrawerContent>
            </DrawerBackdrop>
          </Drawer>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushDrawerAnimation()
    document
      .querySelector('[data-slot="drawer-backdrop"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect(document.querySelector('[data-slot="drawer-backdrop"]')).not.toBeNull()
  })

  it('prevents backdrop wheel events from scrolling the page behind the drawer', async () => {
    const wrapper = createDrawer()
    const bodyWheel = vi.fn()
    document.body.addEventListener('wheel', bodyWheel)

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushDrawerAnimation()

    const backdrop = document.querySelector('[data-slot="drawer-backdrop"]')
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 120 })
    const propagated = backdrop?.dispatchEvent(wheel)

    expect(propagated).toBe(false)
    expect(wheel.defaultPrevented).toBe(true)
    expect(bodyWheel).not.toHaveBeenCalled()
    document.body.removeEventListener('wheel', bodyWheel)
  })

  it('allows wheel events inside scrollable drawer body', async () => {
    const wrapper = mount(
      {
        components: {
          Drawer,
          DrawerBackdrop,
          DrawerBody,
          DrawerContent,
          DrawerDialog,
          DrawerTrigger,
        },
        template: `
          <Drawer>
            <DrawerTrigger data-test="trigger">Open drawer</DrawerTrigger>
            <DrawerBackdrop>
              <DrawerContent>
                <DrawerDialog>
                  <DrawerBody data-test="scrollable" style="height: 4rem; overflow-y: auto;">
                    <div style="height: 20rem;">Scrollable drawer body</div>
                  </DrawerBody>
                </DrawerDialog>
              </DrawerContent>
            </DrawerBackdrop>
          </Drawer>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flushDrawerAnimation()

    const scrollable = document.querySelector<HTMLElement>('[data-test="scrollable"]')!
    Object.defineProperty(scrollable, 'clientHeight', { configurable: true, value: 100 })
    Object.defineProperty(scrollable, 'scrollHeight', { configurable: true, value: 300 })
    scrollable.scrollTop = 20

    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 120 })
    const propagated = scrollable.dispatchEvent(wheel)

    expect(propagated).toBe(true)
    expect(wheel.defaultPrevented).toBe(false)
  })

  it('supports standalone controlled backdrop state', async () => {
    const wrapper = mount(
      {
        components: {
          DrawerBackdrop,
          DrawerContent,
          DrawerDialog,
          DrawerHeading,
        },
        setup() {
          const isOpen = ref(true)

          return { isOpen }
        },
        template: `
          <DrawerBackdrop v-model:is-open="isOpen">
            <DrawerContent placement="left">
              <DrawerDialog>
                <DrawerHeading>Controlled drawer</DrawerHeading>
              </DrawerDialog>
            </DrawerContent>
          </DrawerBackdrop>
        `,
      },
      { attachTo: document.body },
    )
    await flushDrawerAnimation()

    expect(document.querySelector('[data-slot="drawer-backdrop"]')).not.toBeNull()

    document
      .querySelector('[data-slot="drawer-backdrop"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(wrapper.vm.isOpen).toBe(false)
    await flushDrawerAnimation()

    expect(document.querySelector('[data-slot="drawer-backdrop"]')).toBeNull()
  })
})
