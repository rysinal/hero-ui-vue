/* global Animation, document, HTMLElement, HTMLButtonElement, KeyboardEvent, MouseEvent, WheelEvent, setTimeout, window */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContainer,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalHeading,
  ModalTrigger,
} from './index'

const cleanupTeleport = () => {
  document.body.innerHTML = ''
}

const flushModalAnimation = async () => {
  await nextTick()
  await Promise.resolve()
  await new Promise((resolve) => setTimeout(resolve, 50))
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

const createModal = () =>
  mount(
    {
      components: {
        Modal,
        ModalBackdrop,
        ModalBody,
        ModalContainer,
        ModalDialog,
        ModalFooter,
        ModalHeader,
        ModalHeading,
        ModalTrigger,
      },
      template: `
        <Modal>
          <ModalTrigger data-test="trigger">Open modal</ModalTrigger>
          <ModalBackdrop>
            <ModalContainer>
              <ModalDialog data-test="dialog">
                <ModalHeader>
                  <ModalHeading data-test="heading">Modal title</ModalHeading>
                </ModalHeader>
                <ModalBody>Modal body</ModalBody>
                <ModalFooter>
                  <button data-modal-close="true" data-test="close">Close</button>
                </ModalFooter>
              </ModalDialog>
            </ModalContainer>
          </ModalBackdrop>
        </Modal>
      `,
    },
    { attachTo: document.body },
  )

describe('Modal', () => {
  it('opens when a direct trigger child is pressed', async () => {
    const wrapper = mount(
      {
        components: {
          Modal,
          ModalBackdrop,
          ModalContainer,
          ModalDialog,
          ModalHeading,
        },
        template: `
          <Modal>
            <button data-test="trigger">Open modal</button>
            <ModalBackdrop>
              <ModalContainer>
                <ModalDialog>
                  <ModalHeading>Direct trigger</ModalHeading>
                </ModalDialog>
              </ModalContainer>
            </ModalBackdrop>
          </Modal>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')

    expect(document.querySelector('[data-slot="modal-backdrop"]')).not.toBeNull()
  })

  it('opens from the trigger and closes from a close target', async () => {
    const wrapper = createModal()

    expect(document.querySelector('[data-slot="modal-backdrop"]')).toBeNull()

    await wrapper.get('[data-test="trigger"]').trigger('click')

    expect(document.querySelector('[data-slot="modal-backdrop"]')).not.toBeNull()
    expect(document.querySelector('[data-slot="modal-dialog"]')?.getAttribute('role')).toBe(
      'dialog',
    )

    document.querySelector<HTMLButtonElement>('[data-test="close"]')?.click()
    await flushModalAnimation()

    expect(document.querySelector('[data-slot="modal-backdrop"]')).toBeNull()
  })

  it('locks page scroll while open and waits for exit animations before unmounting', async () => {
    const originalGetAnimations = HTMLElement.prototype.getAnimations
    let getAnimationsCalls = 0
    let finishExitAnimation!: () => void
    const exitAnimationFinished = new Promise<Animation>((resolve) => {
      finishExitAnimation = () => resolve({} as Animation)
    })

    HTMLElement.prototype.getAnimations = vi.fn(() => {
      getAnimationsCalls += 1
      if (getAnimationsCalls <= 2) return []

      return [
        {
          finished: exitAnimationFinished,
          playState: 'running',
        } as Animation,
      ]
    }) as HTMLElement['getAnimations']

    const wrapper = createModal()

    try {
      await wrapper.get('[data-test="trigger"]').trigger('click')
      await flushModalAnimation()

      expect(document.body.style.overflow).toBe('')
      expect(document.body.style.paddingRight).toBe('')
      expect(document.documentElement.style.overflow).toBe('hidden')
      expect(document.documentElement.style.scrollbarGutter).toBe('stable')
      expect(
        document.querySelector('[data-slot="modal-backdrop"]')?.hasAttribute('data-entering'),
      ).toBe(false)

      document.querySelector<HTMLButtonElement>('[data-test="close"]')?.click()
      await nextTick()

      expect(document.querySelector('[data-slot="modal-backdrop"]')).not.toBeNull()
      expect(
        document.querySelector('[data-slot="modal-backdrop"]')?.hasAttribute('data-entering'),
      ).toBe(false)
      expect(
        document.querySelector('[data-slot="modal-backdrop"]')?.getAttribute('data-exiting'),
      ).toBe('true')

      await flushModalAnimation()
      expect(document.querySelector('[data-slot="modal-backdrop"]')).not.toBeNull()

      finishExitAnimation()
      await flushModalAnimation()

      expect(document.querySelector('[data-slot="modal-backdrop"]')).toBeNull()
      expect(document.body.style.overflow).toBe('')
      expect(document.body.style.paddingRight).toBe('')
      expect(document.documentElement.style.overflow).toBe('')
      expect(document.documentElement.style.scrollbarGutter).toBe('')
      expect(document.documentElement.style.paddingRight).toBe('')
    } finally {
      HTMLElement.prototype.getAnimations = originalGetAnimations
    }
  })

  it('dismisses on backdrop click by default', async () => {
    const wrapper = createModal()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    document
      .querySelector('[data-slot="modal-backdrop"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushModalAnimation()

    expect(document.querySelector('[data-slot="modal-backdrop"]')).toBeNull()
  })

  it('does not propagate backdrop clicks to the root trigger', async () => {
    const wrapper = createModal()
    const bodyClick = vi.fn()
    document.body.addEventListener('click', bodyClick)

    await wrapper.get('[data-test="trigger"]').trigger('click')
    bodyClick.mockClear()
    document
      .querySelector('[data-slot="modal-backdrop"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushModalAnimation()

    expect(document.querySelector('[data-slot="modal-backdrop"]')).toBeNull()
    expect(bodyClick).not.toHaveBeenCalled()
    document.body.removeEventListener('click', bodyClick)
  })

  it('prevents backdrop wheel events from scrolling the page behind the modal', async () => {
    const wrapper = createModal()
    const bodyWheel = vi.fn()
    document.body.addEventListener('wheel', bodyWheel)

    await wrapper.get('[data-test="trigger"]').trigger('click')

    const backdrop = document.querySelector('[data-slot="modal-backdrop"]')
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 120 })
    const propagated = backdrop?.dispatchEvent(wheel)

    expect(propagated).toBe(false)
    expect(wheel.defaultPrevented).toBe(true)
    expect(bodyWheel).not.toHaveBeenCalled()
    document.body.removeEventListener('wheel', bodyWheel)
  })

  it('allows wheel events inside scrollable modal content', async () => {
    const wrapper = mount(
      {
        components: {
          Modal,
          ModalBackdrop,
          ModalBody,
          ModalContainer,
          ModalDialog,
          ModalTrigger,
        },
        template: `
          <Modal>
            <ModalTrigger data-test="trigger">Open modal</ModalTrigger>
            <ModalBackdrop>
              <ModalContainer>
                <ModalDialog>
                  <ModalBody data-test="scrollable" style="height: 4rem; overflow-y: auto;">
                    <div style="height: 20rem;">Scrollable modal content</div>
                  </ModalBody>
                </ModalDialog>
              </ModalContainer>
            </ModalBackdrop>
          </Modal>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')

    const scrollable = document.querySelector<HTMLElement>('[data-test="scrollable"]')!
    Object.defineProperty(scrollable, 'clientHeight', { configurable: true, value: 100 })
    Object.defineProperty(scrollable, 'scrollHeight', { configurable: true, value: 300 })
    scrollable.scrollTop = 20

    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 120 })
    const propagated = scrollable.dispatchEvent(wheel)

    expect(propagated).toBe(true)
    expect(wheel.defaultPrevented).toBe(false)
  })

  it('focuses the dialog on open and does not restore focus-visible to the trigger on Escape', async () => {
    const wrapper = createModal()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await nextTick()

    expect(document.activeElement?.getAttribute('data-slot')).toBe('modal-dialog')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await flushModalAnimation()

    expect(document.activeElement).not.toBe(wrapper.get('[data-test="trigger"]').element)
    expect(document.querySelector('[data-slot="modal-backdrop"]')).toBeNull()
  })

  it('can keep Escape from dismissing the modal', async () => {
    const wrapper = mount(
      {
        components: {
          Modal,
          ModalBackdrop,
          ModalContainer,
          ModalDialog,
          ModalHeading,
          ModalTrigger,
        },
        template: `
          <Modal>
            <ModalTrigger data-test="trigger">Open modal</ModalTrigger>
            <ModalBackdrop is-keyboard-dismiss-disabled>
              <ModalContainer>
                <ModalDialog>
                  <ModalHeading>Keyboard lock</ModalHeading>
                </ModalDialog>
              </ModalContainer>
            </ModalBackdrop>
          </Modal>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.get('[data-test="trigger"]').trigger('click')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect(document.querySelector('[data-slot="modal-backdrop"]')).not.toBeNull()
  })

  it('supports standalone controlled backdrop state', async () => {
    const wrapper = mount(
      {
        components: {
          ModalBackdrop,
          ModalContainer,
          ModalDialog,
          ModalHeading,
        },
        setup() {
          const isOpen = ref(true)

          return { isOpen }
        },
        template: `
          <ModalBackdrop v-model:is-open="isOpen">
            <ModalContainer>
              <ModalDialog>
                <ModalHeading>Controlled modal</ModalHeading>
              </ModalDialog>
            </ModalContainer>
          </ModalBackdrop>
        `,
      },
      { attachTo: document.body },
    )

    expect(document.querySelector('[data-slot="modal-backdrop"]')).not.toBeNull()

    document
      .querySelector('[data-slot="modal-backdrop"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(wrapper.vm.isOpen).toBe(false)
    await flushModalAnimation()

    expect(document.querySelector('[data-slot="modal-backdrop"]')).toBeNull()
  })

  it('renders heading levels and custom portal containers', async () => {
    const portal = document.createElement('div')
    document.body.appendChild(portal)

    mount(
      {
        components: {
          ModalBackdrop,
          ModalContainer,
          ModalDialog,
          ModalHeading,
        },
        setup() {
          return { portal }
        },
        template: `
          <ModalBackdrop default-open :portal-container="portal">
            <ModalContainer>
              <ModalDialog>
                <ModalHeading data-test="default-heading">Default heading</ModalHeading>
                <ModalHeading :level="2" data-test="level-heading">Level heading</ModalHeading>
              </ModalDialog>
            </ModalContainer>
          </ModalBackdrop>
        `,
      },
      { attachTo: document.body },
    )
    await nextTick()

    expect(portal.querySelector('[data-slot="modal-backdrop"]')).not.toBeNull()
    expect(portal.querySelector('[data-test="default-heading"]')?.tagName).toBe('H3')
    expect(portal.querySelector('[data-test="level-heading"]')?.tagName).toBe('H2')
  })
})
