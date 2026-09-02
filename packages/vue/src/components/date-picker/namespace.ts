// Compound namespace: mirrors the React dot-notation API
// (DatePicker.Trigger, ...). Requires <script setup>; the options-API
// `components` option cannot resolve dotted tags.
import DatePicker from './DatePicker.vue'
import DatePickerPopover from './DatePickerPopover.vue'
import DatePickerTrigger from './DatePickerTrigger.vue'
import DatePickerTriggerIndicator from './DatePickerTriggerIndicator.vue'

type DatePickerCompound = typeof DatePicker & {
  Popover: typeof DatePickerPopover
  Root: typeof DatePicker
  Trigger: typeof DatePickerTrigger
  TriggerIndicator: typeof DatePickerTriggerIndicator
}

export const DatePickerNamespace: DatePickerCompound = Object.assign(DatePicker, {
  Popover: DatePickerPopover,
  Root: DatePicker,
  Trigger: DatePickerTrigger,
  TriggerIndicator: DatePickerTriggerIndicator,
})
