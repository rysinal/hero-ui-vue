// Compound namespace: mirrors the React dot-notation API
// (DateRangePicker.Trigger, ...). Requires <script setup>; the options-API
// `components` option cannot resolve dotted tags.
import DateRangePicker from './DateRangePicker.vue'
import DateRangePickerPopover from './DateRangePickerPopover.vue'
import DateRangePickerRangeSeparator from './DateRangePickerRangeSeparator.vue'
import DateRangePickerTrigger from './DateRangePickerTrigger.vue'
import DateRangePickerTriggerIndicator from './DateRangePickerTriggerIndicator.vue'

type DateRangePickerCompound = typeof DateRangePicker & {
  Popover: typeof DateRangePickerPopover
  RangeSeparator: typeof DateRangePickerRangeSeparator
  Root: typeof DateRangePicker
  Trigger: typeof DateRangePickerTrigger
  TriggerIndicator: typeof DateRangePickerTriggerIndicator
}

export const DateRangePickerNamespace: DateRangePickerCompound = Object.assign(DateRangePicker, {
  Popover: DateRangePickerPopover,
  RangeSeparator: DateRangePickerRangeSeparator,
  Root: DateRangePicker,
  Trigger: DateRangePickerTrigger,
  TriggerIndicator: DateRangePickerTriggerIndicator,
})
