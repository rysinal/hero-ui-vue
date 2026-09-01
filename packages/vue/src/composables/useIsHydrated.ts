import { onMounted, readonly, ref, type Ref } from 'vue'

/**
 * True once the component has mounted on the client, false during SSR.
 *
 * @example
 * ```ts
 * const isHydrated = useIsHydrated()
 * // v-if="isHydrated" for client-only content
 * ```
 */
export function useIsHydrated(): Readonly<Ref<boolean>> {
  const isHydrated = ref(false)

  onMounted(() => {
    isHydrated.value = true
  })

  return readonly(isHydrated)
}
