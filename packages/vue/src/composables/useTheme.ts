/* global MediaQueryList, MediaQueryListEvent, localStorage */
import { onMounted, onScopeDispose, readonly, ref, type Ref } from 'vue'

const THEME_STORAGE_KEY = 'heroui-theme'
const PREFERS_DARK_MEDIA = '(prefers-color-scheme: dark)'

export type Theme = string

export interface UseThemeReturn {
  /** The selected theme name, which may be "system". */
  theme: Readonly<Ref<Theme>>
  /** The concrete theme applied to the document, never "system". */
  resolvedTheme: Readonly<Ref<Theme>>
  setTheme: (theme: Theme) => void
}

const prefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia?.(PREFERS_DARK_MEDIA).matches === true

const resolveTheme = (theme: Theme): Theme =>
  theme === 'system' ? (prefersDark() ? 'dark' : 'light') : theme

/**
 * Switches between themes, persisting the choice and following the OS
 * preference when set to "system".
 *
 * Accepts any theme name ("light", "dark", "brutalism-light", ...).
 *
 * @example
 * ```ts
 * const { theme, resolvedTheme, setTheme } = useTheme()
 * setTheme('dark')
 * ```
 */
export function useTheme(defaultTheme: Theme = 'system'): UseThemeReturn {
  const theme = ref<Theme>(defaultTheme)
  const resolvedTheme = ref<Theme>(resolveTheme(defaultTheme))

  const applyTheme = (nextTheme: Theme) => {
    if (typeof document === 'undefined') return

    const resolved = resolveTheme(nextTheme)
    const root = document.documentElement

    if (resolvedTheme.value && resolvedTheme.value !== resolved) {
      root.classList.remove(resolvedTheme.value)
    }

    root.classList.add(resolved)
    root.setAttribute('data-theme', resolved)

    theme.value = nextTheme
    resolvedTheme.value = resolved
  }

  const setTheme = (nextTheme: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // Storage can be unavailable (private mode, disabled cookies).
    }
    applyTheme(nextTheme)
  }

  let media: MediaQueryList | undefined

  const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
    // Only follow the OS while the user has chosen "system".
    if (theme.value === 'system') applyTheme(event.matches ? 'dark' : 'light')
  }

  // Read storage after mount so SSR and the client agree on first render.
  onMounted(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY)
    } catch {
      stored = null
    }

    applyTheme(stored ?? defaultTheme)

    media = window.matchMedia(PREFERS_DARK_MEDIA)
    media.addEventListener('change', handleMediaChange)
  })

  onScopeDispose(() => {
    media?.removeEventListener('change', handleMediaChange)
    media = undefined
  })

  return {
    resolvedTheme: readonly(resolvedTheme),
    setTheme,
    theme: readonly(theme),
  }
}
