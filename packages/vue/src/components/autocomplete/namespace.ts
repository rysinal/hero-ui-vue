// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Autocomplete from './Autocomplete.vue'
import AutocompleteClearButton from './AutocompleteClearButton.vue'
import AutocompleteFilter from './AutocompleteFilter.vue'
import AutocompleteIndicator from './AutocompleteIndicator.vue'
import AutocompletePopover from './AutocompletePopover.vue'
import AutocompleteTrigger from './AutocompleteTrigger.vue'
import AutocompleteValue from './AutocompleteValue.vue'

type AutocompleteCompound = typeof Autocomplete & {
  ClearButton: typeof AutocompleteClearButton
  Filter: typeof AutocompleteFilter
  Indicator: typeof AutocompleteIndicator
  Popover: typeof AutocompletePopover
  Root: typeof Autocomplete
  Trigger: typeof AutocompleteTrigger
  Value: typeof AutocompleteValue
}

export const AutocompleteNamespace: AutocompleteCompound = Object.assign(Autocomplete, {
  ClearButton: AutocompleteClearButton,
  Filter: AutocompleteFilter,
  Indicator: AutocompleteIndicator,
  Popover: AutocompletePopover,
  Root: Autocomplete,
  Trigger: AutocompleteTrigger,
  Value: AutocompleteValue,
})
