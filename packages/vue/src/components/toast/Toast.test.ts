/* global document, setTimeout */
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import ToastHarness from './__fixtures__/ToastHarness.vue'
import { ToastQueue, createToast } from './queue'

const flush = async () => {
  await nextTick()
  await nextTick()
}

describe('ToastQueue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('adds and auto-dismisses after the timeout', () => {
    const queue = new ToastQueue()
    const toast = createToast(queue)

    toast('Saved')
    expect(queue.toasts).toHaveLength(1)

    vi.advanceTimersByTime(4000)
    expect(queue.toasts).toHaveLength(0)
  })

  it('keeps a toast with timeout 0 until it is closed', () => {
    const queue = new ToastQueue()
    const toast = createToast(queue)

    const key = toast('Uploading', { timeout: 0 })
    vi.advanceTimersByTime(60_000)
    expect(queue.toasts).toHaveLength(1)

    toast.close(key)
    expect(queue.toasts).toHaveLength(0)
  })

  it('pauses and resumes the countdown', () => {
    const queue = new ToastQueue()
    const toast = createToast(queue)

    toast('Saved')
    vi.advanceTimersByTime(2000)
    queue.pauseAll()
    // While paused the remaining time must not tick down.
    vi.advanceTimersByTime(10_000)
    expect(queue.toasts).toHaveLength(1)

    queue.resumeAll()
    vi.advanceTimersByTime(2000)
    expect(queue.toasts).toHaveLength(0)
  })

  it('applies a variant per helper', () => {
    const queue = new ToastQueue()
    const toast = createToast(queue)

    toast.success('yes')
    toast.danger('no')
    toast.warning('careful')
    toast.info('fyi')

    expect(queue.toasts.map((t) => t.variant)).toEqual([
      'success',
      'danger',
      'warning',
      'accent',
    ])
  })

  it('swaps a loading toast for the outcome of a promise', async () => {
    vi.useRealTimers()
    const queue = new ToastQueue()
    const toast = createToast(queue)

    toast.promise(Promise.resolve('done'), {
      error: 'Failed',
      loading: 'Working',
      success: (data) => `Got ${data}`,
    })

    expect(queue.toasts[0]?.isLoading).toBe(true)
    await flush()

    expect(queue.toasts).toHaveLength(1)
    expect(queue.toasts[0]?.title).toBe('Got done')
    expect(queue.toasts[0]?.variant).toBe('success')
  })

  it('reports a rejected promise as a danger toast', async () => {
    vi.useRealTimers()
    const queue = new ToastQueue()
    const toast = createToast(queue)

    toast.promise(Promise.reject(new Error('nope')), {
      error: (error) => `Failed: ${error.message}`,
      loading: 'Working',
      success: 'Done',
    })
    await flush()

    expect(queue.toasts[0]?.title).toBe('Failed: nope')
    expect(queue.toasts[0]?.variant).toBe('danger')
  })

  it('clears every toast', () => {
    const queue = new ToastQueue()
    const toast = createToast(queue)

    toast('one')
    toast('two')
    toast.clear()

    expect(queue.toasts).toHaveLength(0)
  })
})

describe('ToastProvider', () => {
  it('renders queued toasts and marks the frontmost one', async () => {
    const wrapper = mount(ToastHarness, { attachTo: document.body })
    await flush()

    const toasts = wrapper.findAll('[data-slot="toast"]')
    expect(toasts).toHaveLength(2)
    // Newest first, so the last one added is in front.
    expect(toasts[0]?.attributes('data-frontmost')).toBe('true')
    expect(toasts[1]?.attributes('data-frontmost')).toBeUndefined()
    expect(toasts[0]?.text()).toContain('Second')

    wrapper.unmount()
  })
})
