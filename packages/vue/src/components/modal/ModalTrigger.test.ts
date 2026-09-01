import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Button } from '../button'
import Modal from './Modal.vue'
import ModalBackdrop from './ModalBackdrop.vue'
import ModalContainer from './ModalContainer.vue'
import ModalDialog from './ModalDialog.vue'
import ModalTrigger from './ModalTrigger.vue'

const flush = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))
}

const isDialogVisible = () => document.querySelector('[data-slot="modal-dialog"]') !== null

describe('Modal trigger semantics', () => {
  it('does not open from a disabled ModalTrigger', async () => {
    const wrapper = mount(
      {
        components: { Modal, ModalTrigger, ModalBackdrop, ModalContainer, ModalDialog, Button },
        template: `
          <Modal>
            <ModalTrigger is-disabled><Button>open</Button></ModalTrigger>
            <ModalBackdrop><ModalContainer><ModalDialog>body</ModalDialog></ModalContainer></ModalBackdrop>
          </Modal>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.find('button').trigger('click')
    await flush()

    expect(isDialogVisible()).toBe(false)
    wrapper.unmount()
  })

  it('does not open when clicking a non-trigger descendant', async () => {
    const wrapper = mount(
      {
        components: { Modal, ModalBackdrop, ModalContainer, ModalDialog },
        template: `
          <Modal>
            <span data-test="bystander">not a trigger</span>
            <ModalBackdrop><ModalContainer><ModalDialog>body</ModalDialog></ModalContainer></ModalBackdrop>
          </Modal>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.find('[data-test="bystander"]').trigger('click')
    await flush()

    expect(isDialogVisible()).toBe(false)
    wrapper.unmount()
  })

  it('still opens from the first child acting as trigger', async () => {
    const wrapper = mount(
      {
        components: { Modal, ModalBackdrop, ModalContainer, ModalDialog, Button },
        template: `
          <Modal>
            <Button>Open Modal</Button>
            <ModalBackdrop><ModalContainer><ModalDialog>body</ModalDialog></ModalContainer></ModalBackdrop>
          </Modal>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.find('button').trigger('click')
    await flush()

    expect(isDialogVisible()).toBe(true)
    wrapper.unmount()
  })

  it('still opens from an explicit enabled ModalTrigger', async () => {
    const wrapper = mount(
      {
        components: { Modal, ModalTrigger, ModalBackdrop, ModalContainer, ModalDialog, Button },
        template: `
          <Modal>
            <ModalTrigger><Button>open</Button></ModalTrigger>
            <ModalBackdrop><ModalContainer><ModalDialog>body</ModalDialog></ModalContainer></ModalBackdrop>
          </Modal>
        `,
      },
      { attachTo: document.body },
    )

    await wrapper.find('button').trigger('click')
    await flush()

    expect(isDialogVisible()).toBe(true)
    wrapper.unmount()
  })
})
