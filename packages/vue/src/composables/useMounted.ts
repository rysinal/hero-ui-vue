import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

/**
 * Returns a getter reporting whether the component is still mounted. Useful to
 * bail out of async work that resolves after teardown.
 *
 * @example
 * ```ts
 * const isMounted = useIsMounted()
 * const data = await fetchData()
 * if (!isMounted()) return
 * ```
 */
export function useIsMounted(): () => boolean {
  const isMounted = ref(false)

  if (getCurrentInstance()) {
    onMounted(() => {
      isMounted.value = true
    })

    onUnmounted(() => {
      isMounted.value = false
    })
  }

  return () => isMounted.value
}
