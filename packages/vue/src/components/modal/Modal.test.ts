/* global document, HTMLButtonElement, KeyboardEvent, MouseEvent */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
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

enableAutoUnmount(afterEach)

afterEach(() => {
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
    await nextTick()

    expect(document.querySelector('[data-slot="modal-backdrop"]')).toBeNull()
  })

  it('dismisses on backdrop click by default', async () => {
    const wrapper = createModal()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    document
      .querySelector('[data-slot="modal-backdrop"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

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
