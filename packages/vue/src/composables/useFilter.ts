import { shallowRef } from 'vue'

export type UseFilterSensitivity = 'base' | 'accent' | 'case' | 'variant'

export interface UseFilterOptions {
  /**
   * How strictly two strings must match.
   * - `'base'`: ignores case and accents (a === A === á)
   * - `'accent'`: ignores case only
   * - `'case'`: ignores accents only
   * - `'variant'`: strict, the default of `Intl.Collator`
   *
   * @default 'variant'
   */
  sensitivity?: UseFilterSensitivity
  /** BCP 47 locale tag used for the comparison. Defaults to the runtime locale. */
  locale?: string
}

export interface UseFilterReturn {
  /** Whether `substring` appears anywhere inside `text`. */
  contains: (text: string, substring: string) => boolean
  /** Whether `text` begins with `substring`. */
  startsWith: (text: string, substring: string) => boolean
  /** Whether `text` ends with `substring`. */
  endsWith: (text: string, substring: string) => boolean
}

/**
 * Locale-aware substring matching, mirroring React Aria's `useFilter`.
 *
 * `Intl.Collator` cannot answer "does this contain that", so the substring is
 * compared slice by slice — the same trick React Aria uses. A `sensitivity` of
 * `'base'` therefore matches "cafe" against "Café".
 *
 * @example
 * ```ts
 * const { contains } = useFilter({ sensitivity: 'base' })
 * contains('Café', 'cafe') // true
 * ```
 */
export function useFilter(options: UseFilterOptions = {}): UseFilterReturn {
  const { locale, sensitivity = 'variant' } = options

  // Intl.Collator is a class instance, so it must not be made deeply reactive.
  const collator = shallowRef(
    new Intl.Collator(locale, { sensitivity, usage: 'search' }),
  )

  const equals = (a: string, b: string) => collator.value.compare(a, b) === 0

  /**
   * Ignorable characters (soft hyphens, some diacritics) compare equal to the
   * empty string, so an empty needle always matches.
   */
  const startsWith = (text: string, substring: string) => {
    if (substring.length === 0) return true

    const normalizedText = text.normalize('NFC')
    const normalizedSubstring = substring.normalize('NFC')

    return equals(normalizedText.slice(0, normalizedSubstring.length), normalizedSubstring)
  }

  const endsWith = (text: string, substring: string) => {
    if (substring.length === 0) return true

    const normalizedText = text.normalize('NFC')
    const normalizedSubstring = substring.normalize('NFC')

    return equals(normalizedText.slice(-normalizedSubstring.length), normalizedSubstring)
  }

  const contains = (text: string, substring: string) => {
    if (substring.length === 0) return true

    const normalizedText = text.normalize('NFC')
    const normalizedSubstring = substring.normalize('NFC')
    const end = normalizedText.length - normalizedSubstring.length

    for (let start = 0; start <= end; start += 1) {
      if (equals(normalizedText.slice(start, start + normalizedSubstring.length), normalizedSubstring)) {
        return true
      }
    }

    return false
  }

  return { contains, endsWith, startsWith }
}
