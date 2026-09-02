<script setup lang="ts">
/* global KeyboardEvent */
import { computed, inject } from 'vue'
import { getLocalTimeZone, isSameDay, isSameMonth, today, type CalendarDate } from '@internationalized/date'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { CALENDAR_CONTEXT_KEY, CALENDAR_GRID_CONTEXT_KEY } from './context'

interface CalendarCellProps {
  class?: string
  date: CalendarDate
}

const props = defineProps<CalendarCellProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)
const grid = inject(CALENDAR_GRID_CONTEXT_KEY, null)

const isOutsideMonth = computed(() =>
  grid?.month.value ? !isSameMonth(props.date, grid.month.value) : false,
)
const isUnavailable = computed(() => context?.isDateUnavailable(props.date) ?? false)
const isOutOfRange = computed(() => context?.isDateOutOfRange(props.date) ?? false)
const isDisabled = computed(
  () => (context?.isDisabled.value ?? false) || isOutOfRange.value || isUnavailable.value,
)
const isSelected = computed(() => context?.isSelected(props.date) ?? false)
const isToday = computed(() => isSameDay(props.date, today(getLocalTimeZone())))

// Range highlighting only exists when a RangeCalendar supplies it.
const isInRange = computed(() => context?.isInRange?.(props.date) ?? false)
const isRangeStart = computed(() => context?.isRangeStart?.(props.date) ?? false)
const isRangeEnd = computed(() => context?.isRangeEnd?.(props.date) ?? false)

const { interactionAttrs, interactionHandlers } = useInteractionStates(() => isDisabled.value)

const cellClass = computed(() => composeTwClasses(props.class, context?.slots.value.cell()))

const choose = () => {
  if (isDisabled.value) return
  context?.select(props.date)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  choose()
}
</script>

<template>
  <td
    :aria-disabled="dataAttr(isDisabled)"
    :aria-selected="isSelected"
    :class="cellClass"
    :data-disabled="dataAttr(isDisabled)"
    :data-outside-month="dataAttr(isOutsideMonth)"
    :data-selection-end="dataAttr(isRangeEnd)"
    :data-selection-start="dataAttr(isRangeStart)"
    :data-selected="dataAttr(isSelected || isInRange)"
    :data-today="dataAttr(isToday)"
    :data-unavailable="dataAttr(isUnavailable)"
    :tabindex="isDisabled ? undefined : 0"
    data-slot="calendar-cell"
    role="gridcell"
    v-bind="interactionAttrs"
    @click="choose"
    @keydown="handleKeydown"
    v-on="interactionHandlers"
  >
    <slot :date="props.date" :is-selected="isSelected" :is-today="isToday">
      {{ props.date.day }}
    </slot>
  </td>
</template>
