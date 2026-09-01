/* global HTMLElement, MutationObserver, ResizeObserver */
import { onScopeDispose, readonly, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'

export interface UseMeasuredHeightReturn {
  /** Measured scrollHeight of the element, or undefined before first measure. */
  height: Readonly<Ref<number | undefined>>
}

/**
 * Tracks an element's scrollHeight, re-measuring on resize and on aria-hidden
 * changes (a collapsed panel reports a different height once revealed).
 *
 * @example
 * ```ts
 * const panelRef = ref<HTMLElement>()
 * const { height } = useMeasuredHeight(panelRef)
 * ```
 */
export const useMeasuredHeight = (
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
): UseMeasuredHeightReturn => {
  const height = ref<number | undefined>(undefined)

  let resizeObserver: ResizeObserver | undefined
  let mutationObserver: MutationObserver | undefined

  const teardown = () => {
    resizeObserver?.disconnect()
    mutationObserver?.disconnect()
    resizeObserver = undefined
    mutationObserver = undefined
  }

  watch(
    () => toValue(target),
    (element) => {
      teardown()

      if (!element || typeof ResizeObserver === 'undefined') return

      const measure = () => {
        const measured = element.scrollHeight
        if (height.value !== measured) height.value = measured
      }

      // ResizeObserver fires an initial notification, so no manual first call.
      resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(element)

      if (typeof MutationObserver !== 'undefined') {
        mutationObserver = new MutationObserver((mutations) => {
          const hasAriaHiddenChange = mutations.some(
            (mutation) =>
              mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden',
          )
          if (hasAriaHiddenChange) measure()
        })
        mutationObserver.observe(element, {
          attributeFilter: ['aria-hidden'],
          attributes: true,
        })
      }
    },
    { immediate: true },
  )

  onScopeDispose(teardown)

  return { height: readonly(height) }
}
