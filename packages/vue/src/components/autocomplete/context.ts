import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { autocompleteVariants } from '@rysinal/heroui-vue-styles'

/** Matches an item's text against the current query, as React Aria's filters do. */
export type AutocompleteFilterFn = (textValue: string, inputValue: string) => boolean

export interface AutocompleteContext {
  slots: ComputedRef<ReturnType<typeof autocompleteVariants>>
  /** Current text typed into the popover's search field. */
  filterQuery: Ref<string>
  /** Empties the selection and notifies the consumer through `clear`. */
  clear: () => void
  /**
   * Registers the predicate declared on `Autocomplete.Filter`. A `null`
   * predicate means "do not filter here", which is what the asynchronous
   * demos need when the server already narrowed the list.
   */
  registerFilter: (predicate: AutocompleteFilterFn | null) => void
  setFilterQuery: (value: string) => void
}

export const AUTOCOMPLETE_CONTEXT_KEY: InjectionKey<AutocompleteContext> =
  Symbol('AutocompleteContext')
