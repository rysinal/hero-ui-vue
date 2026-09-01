/* global document, KeyboardEvent, setTimeout */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContainer,
  AlertDialogDialog,
  AlertDialogHeader,
  AlertDialogHeading,
  AlertDialogTrigger,
} from './index'

enableAutoUnmount(afterEach)

afterEach(() => {
  document.body.innerHTML = ''
})

const flush = async () => {
  await nextTick()
  await Promise.resolve()
  await new Promise((resolve) => setTimeout(resolve, 60))
  await nextTick()
}

const createAlertDialog = () =>
  mount(
    {
      components: {
        AlertDialog,
        AlertDialogBackdrop,
        AlertDialogBody,
        AlertDialogContainer,
        AlertDialogDialog,
        AlertDialogHeader,
        AlertDialogHeading,
        AlertDialogTrigger,
      },
      template: `
        <AlertDialog>
          <AlertDialogTrigger data-test="trigger">Delete</AlertDialogTrigger>
          <AlertDialogBackdrop>
            <AlertDialogContainer>
              <AlertDialogDialog>
                <AlertDialogHeader>
                  <AlertDialogHeading>Are you sure?</AlertDialogHeading>
                </AlertDialogHeader>
                <AlertDialogBody>This cannot be undone.</AlertDialogBody>
              </AlertDialogDialog>
            </AlertDialogContainer>
          </AlertDialogBackdrop>
        </AlertDialog>
      `,
    },
    { attachTo: document.body },
  )

describe('AlertDialog animation state', () => {
  it('clears data-entering once the enter animation settles', async () => {
    const wrapper = createAlertDialog()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flush()

    const backdrop = document.querySelector('[data-slot="alert-dialog-backdrop"]')
    expect(backdrop).not.toBeNull()
    // data-entering must not stay pinned on forever, otherwise the enter
    // animation class never unloads and will-change is never released.
    expect(backdrop?.getAttribute('data-entering')).not.toBe('true')
  })

  it('labels the dialog with its heading', async () => {
    const wrapper = createAlertDialog()

    await wrapper.get('[data-test="trigger"]').trigger('click')
    await flush()

    const dialog = document.querySelector('[data-slot="alert-dialog-dialog"]')
    const heading = document.querySelector('[data-slot="alert-dialog-heading"]')

    expect(heading?.id).toBeTruthy()
    expect(dialog?.getAttribute('aria-labelledby')).toBe(heading?.id)
  })
})
