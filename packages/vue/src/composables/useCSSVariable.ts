import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import { useIsHydrated } from './useIsHydrated'

// Cache for CSS variable values to avoid repeated DOM queries.
const cssVariableCache = new Map<string, string | undefined>()

/** Clears the cache. Exposed for tests and for themes swapped at runtime. */
export const clearCSSVariableCache = () => {
  cssVariableCache.clear()
}

/**
 * Reads a CSS custom property off the document element, with SSR safety,
 * an optional override, and caching.
 *
 * @param variableName - Custom property name, e.g. `--skeleton-animation`
 * @param override - Takes precedence over the CSS variable when defined
 * @param cache - Cache the resolved value (default: true)
 *
 * @example
 * ```ts
 * const animationType = useCSSVariable('--skeleton-animation', () => props.animationType)
 * ```
 */
export function useCSSVariable(
  variableName: MaybeRefOrGetter<string>,
  override?: MaybeRefOrGetter<string | undefined>,
  cache: MaybeRefOrGetter<boolean> = true,
): ComputedRef<string | undefined> {
  const isHydrated = useIsHydrated()

  return computed(() => {
    const overrideValue = toValue(override)
    if (overrideValue !== undefined) return overrideValue

    // Nothing to read from before hydration.
    if (!isHydrated.value) return undefined

    const name = toValue(variableName)
    const shouldCache = toValue(cache)

    if (shouldCache && cssVariableCache.has(name)) {
      return cssVariableCache.get(name)
    }

    try {
      const root = document.documentElement
      const value = getComputedStyle(root).getPropertyValue(name).trim() || undefined

      if (shouldCache) cssVariableCache.set(name, value)

      return value
    } catch {
      // document may be unavailable; treat as unset.
      return undefined
    }
  })
}
