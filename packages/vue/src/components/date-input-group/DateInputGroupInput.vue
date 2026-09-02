<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { DATE_INPUT_GROUP_KEY } from './context'

interface DateInputGroupInputProps {
  class?: string
  /**
   * Which end of a range this input edits. Only meaningful inside a
   * DateRangePicker, where the two inputs share one value.
   */
  slot?: 'start' | 'end'
}

const props = defineProps<DateInputGroupInputProps>()
const context = inject(DATE_INPUT_GROUP_KEY, null)

const inputClass = computed(() => composeTwClasses(props.class, context?.slots.value.input()))
const segments = computed(() => {
  if (props.slot && context?.segmentsFor) return context.segmentsFor(props.slot)
  return context?.segments.value ?? []
})
</script>

<template>
  <div
    :class="inputClass"
    :data-disabled="dataAttr(context?.isDisabled.value)"
    :data-slot-name="props.slot"
    data-slot="date-input-group-input"
    role="group"
  >
    <!-- The caller renders each segment, as React does through its child fn. -->
    <slot :segments="segments" />
  </div>
</template>
