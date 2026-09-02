<script setup lang="ts">
/* global KeyboardEvent */
import { computed, inject, ref } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { DATE_INPUT_GROUP_KEY, type DateSegment } from './context'

interface DateInputGroupSegmentProps {
  class?: string
  segment: DateSegment
}

const props = defineProps<DateInputGroupSegmentProps>()
const context = inject(DATE_INPUT_GROUP_KEY, null)

const isDisabled = computed(() => context?.isDisabled.value ?? false)
const isEditable = computed(() => props.segment.isEditable && !isDisabled.value)

const { interactionAttrs, interactionHandlers } = useInteractionStates(() => isDisabled.value)

const segmentClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.segment()),
)

/** Digits typed so far, so "0" then "9" reads as September. */
const typed = ref('')

const commitTyped = (next: string) => {
  const { maxValue = 9999, minValue = 0, type } = props.segment
  const numeric = Number.parseInt(next, 10)
  if (Number.isNaN(numeric)) return

  // Once another digit could not fit, start the next entry fresh.
  const wouldOverflow = numeric * 10 > maxValue
  typed.value = wouldOverflow ? '' : next

  context?.setSegment(
    type,
    Math.min(maxValue, Math.max(minValue, numeric)),
    props.segment.end,
  )
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isEditable.value || context?.isReadOnly.value) return

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    typed.value = ''
    context?.adjustSegment(props.segment.type, 1, props.segment.end)
    return
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    typed.value = ''
    context?.adjustSegment(props.segment.type, -1, props.segment.end)
    return
  }
  if (/^[0-9]$/.test(event.key)) {
    event.preventDefault()
    commitTyped(typed.value + event.key)
    return
  }
  if (event.key === 'Backspace') {
    event.preventDefault()
    typed.value = ''
  }
}
</script>

<template>
  <span
    :aria-disabled="dataAttr(isDisabled)"
    :aria-label="props.segment.type"
    :aria-valuemax="props.segment.maxValue"
    :aria-valuemin="props.segment.minValue"
    :aria-valuenow="props.segment.value"
    :class="segmentClass"
    :data-disabled="dataAttr(isDisabled)"
    :data-placeholder="dataAttr(props.segment.isPlaceholder)"
    :data-type="props.segment.type"
    :role="isEditable ? 'spinbutton' : undefined"
    :tabindex="isEditable ? 0 : undefined"
    data-slot="date-input-group-segment"
    v-bind="interactionAttrs"
    @keydown="handleKeydown"
    v-on="interactionHandlers"
  >{{ props.segment.text }}</span>
</template>
