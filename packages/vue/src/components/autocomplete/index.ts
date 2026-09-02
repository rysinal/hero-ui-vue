// Autocomplete carries the dot-notation parts (Autocomplete.Root, ...)
// while every part stays available as a flat export below.
export { AutocompleteNamespace as Autocomplete } from './namespace'
export { default as AutocompleteRoot } from './Autocomplete.vue'
export { default as AutocompleteClearButton } from './AutocompleteClearButton.vue'
export { default as AutocompleteFilter } from './AutocompleteFilter.vue'
export { default as AutocompleteIndicator } from './AutocompleteIndicator.vue'
export { default as AutocompletePopover } from './AutocompletePopover.vue'
export { default as AutocompleteTrigger } from './AutocompleteTrigger.vue'
export { default as AutocompleteValue } from './AutocompleteValue.vue'
export type { AutocompleteFilterFn } from './context'
