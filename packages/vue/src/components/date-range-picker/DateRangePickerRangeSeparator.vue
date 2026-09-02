<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DATE_RANGE_PICKER_CONTEXT_KEY } from './context'

interface DateRangePickerRangeSeparatorProps {
  class?: string
}

const props = defineProps<DateRangePickerRangeSeparatorProps>()
const picker = inject(DATE_RANGE_PICKER_CONTEXT_KEY, null)

const separatorClass = computed(() =>
  composeTwClasses(props.class, picker?.slots.value.rangeSeparator()),
)
</script>

<template>
  <span
    :class="separatorClass"
    aria-hidden="true"
    data-slot="date-range-picker-range-separator"
  >
    <slot>&nbsp;-&nbsp;</slot>
  </span>
</template>
