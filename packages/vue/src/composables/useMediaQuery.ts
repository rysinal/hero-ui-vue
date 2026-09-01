/* global MediaQueryList, MediaQueryListEvent */
import { onScopeDispose, readonly, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'

export interface UseMediaQueryOptions {
  /** Value used before the query can be evaluated, e.g. during SSR. */
  defaultValue?: boolean
}

const IS_SERVER = typeof window === 'undefined'

/**
 * Tracks whether a media query currently matches.
 *
 * @example
 * ```ts
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 * ```
 */
export function useMediaQuery(
  query: MaybeRefOrGetter<string>,
  { defaultValue = false }: UseMediaQueryOptions = {},
): Readonly<Ref<boolean>> {
  const matches = ref(defaultValue)

  if (IS_SERVER) return readonly(matches)

  let mediaQuery: MediaQueryList | undefined

  const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
    matches.value = event.matches
  }

  const teardown = () => {
    if (!mediaQuery) return
    // removeListener supports Safari < 14.
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handleChange)
    } else {
      mediaQuery.removeListener(handleChange)
    }
    mediaQuery = undefined
  }

  watch(
    () => toValue(query),
    (nextQuery) => {
      teardown()

      mediaQuery = window.matchMedia(nextQuery)
      matches.value = mediaQuery.matches

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange)
      } else {
        mediaQuery.addListener(handleChange)
      }
    },
    { immediate: true },
  )

  onScopeDispose(teardown)

  return readonly(matches)
}
