/* global clearTimeout, setTimeout */
import { shallowReactive, shallowRef, triggerRef } from 'vue'
import { DEFAULT_TOAST_TIMEOUT } from './constants'

export type ToastVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger'

export interface ToastContentValue {
  title?: string
  description?: string
  variant?: ToastVariant
  isLoading?: boolean
  /** Label and handler for the optional action button. */
  action?: { label: string; onPress?: () => void }
}

export interface ToastOptions extends Omit<ToastContentValue, 'title'> {
  /** Milliseconds before auto-dismiss. Pass 0 to keep it until closed. */
  timeout?: number
  onClose?: () => void
}

export interface QueuedToast extends ToastContentValue {
  key: string
  timeout: number
  onClose?: () => void
}

export interface ToastPromiseOptions<T = unknown> {
  loading: string
  success: string | ((data: T) => string)
  error: string | ((error: Error) => string)
}

export interface ToastQueueOptions {
  /** How many toasts stay expanded; the rest stack behind them. */
  maxVisibleToasts?: number
}

let nextId = 0

/**
 * A standalone toast queue. It is plain reactive state rather than a
 * composable, so `toast(...)` can be called from anywhere — event handlers,
 * stores, plain modules — the way React's exported queue is.
 */
export class ToastQueue {
  readonly toasts = shallowReactive<QueuedToast[]>([])
  readonly maxVisibleToasts: number | undefined

  private timers = new Map<string, ReturnType<typeof setTimeout>>()
  private remaining = new Map<string, number>()
  private startedAt = new Map<string, number>()
  private version = shallowRef(0)

  constructor(options?: ToastQueueOptions) {
    this.maxVisibleToasts = options?.maxVisibleToasts
  }

  add(content: ToastContentValue, options?: ToastOptions): string {
    const key = `heroui-toast-${(nextId += 1)}`
    const timeout = options?.timeout ?? DEFAULT_TOAST_TIMEOUT

    this.toasts.push({ ...content, key, onClose: options?.onClose, timeout })
    if (timeout > 0) this.scheduleClose(key, timeout)

    return key
  }

  close(key: string): void {
    const index = this.toasts.findIndex((toast) => toast.key === key)
    if (index === -1) return

    const [removed] = this.toasts.splice(index, 1)
    this.clearTimer(key)
    removed?.onClose?.()
  }

  clear(): void {
    for (const key of [...this.timers.keys()]) this.clearTimer(key)
    this.toasts.splice(0, this.toasts.length)
  }

  /** Freezes the countdown, e.g. while the pointer is over the region. */
  pauseAll(): void {
    const now = Date.now()
    for (const [key, timer] of this.timers) {
      clearTimeout(timer)
      const started = this.startedAt.get(key) ?? now
      const left = (this.remaining.get(key) ?? 0) - (now - started)
      this.remaining.set(key, Math.max(0, left))
    }
    this.timers.clear()
  }

  resumeAll(): void {
    for (const [key, left] of this.remaining) {
      if (left > 0) this.scheduleClose(key, left)
    }
  }

  private scheduleClose(key: string, timeout: number) {
    this.remaining.set(key, timeout)
    this.startedAt.set(key, Date.now())
    this.timers.set(
      key,
      setTimeout(() => this.close(key), timeout),
    )
  }

  private clearTimer(key: string) {
    const timer = this.timers.get(key)
    if (timer) clearTimeout(timer)
    this.timers.delete(key)
    this.remaining.delete(key)
    this.startedAt.delete(key)
    triggerRef(this.version)
  }
}

export interface ToastFunction {
  (message: string, options?: ToastOptions): string
  success: (message: string, options?: Omit<ToastOptions, 'variant'>) => string
  danger: (message: string, options?: Omit<ToastOptions, 'variant'>) => string
  info: (message: string, options?: Omit<ToastOptions, 'variant'>) => string
  warning: (message: string, options?: Omit<ToastOptions, 'variant'>) => string
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastPromiseOptions<T>,
  ) => string
  close: (key: string) => void
  clear: () => void
  pauseAll: () => void
  resumeAll: () => void
  getQueue: () => ToastQueue
}

export const createToast = (queue: ToastQueue): ToastFunction => {
  const toastFn = ((message: string, options?: ToastOptions) =>
    queue.add(
      {
        action: options?.action,
        description: options?.description,
        isLoading: options?.isLoading,
        title: message,
        variant: options?.variant ?? 'default',
      },
      options,
    )) as ToastFunction

  toastFn.success = (message, options) => toastFn(message, { ...options, variant: 'success' })
  toastFn.danger = (message, options) => toastFn(message, { ...options, variant: 'danger' })
  toastFn.info = (message, options) => toastFn(message, { ...options, variant: 'accent' })
  toastFn.warning = (message, options) => toastFn(message, { ...options, variant: 'warning' })

  toastFn.promise = (promise, options) => {
    const running = typeof promise === 'function' ? promise() : promise
    // A loading toast never auto-dismisses; it is replaced by the outcome.
    const loadingKey = queue.add({ isLoading: true, title: options.loading }, { timeout: 0 })

    void running
      .then((data) => {
        queue.close(loadingKey)
        toastFn.success(
          typeof options.success === 'function' ? options.success(data) : options.success,
        )
      })
      .catch((error: Error) => {
        queue.close(loadingKey)
        toastFn.danger(typeof options.error === 'function' ? options.error(error) : options.error)
      })

    return loadingKey
  }

  toastFn.close = (key) => queue.close(key)
  toastFn.clear = () => queue.clear()
  toastFn.pauseAll = () => queue.pauseAll()
  toastFn.resumeAll = () => queue.resumeAll()
  toastFn.getQueue = () => queue

  return toastFn
}

/** The queue used when no custom one is supplied. */
export const globalToastQueue = new ToastQueue()

export const toast = createToast(globalToastQueue)
