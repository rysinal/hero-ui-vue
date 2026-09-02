<script setup lang="ts">
import { computed, inject } from 'vue'
import { calendarYearPickerVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { YEAR_PICKER_GRID_CONTEXT_KEY } from './context'

interface CalendarYearPickerCellProps {
  class?: string
  year: number
}

const props = defineProps<CalendarYearPickerCellProps>()
const grid = inject(YEAR_PICKER_GRID_CONTEXT_KEY, null)

const slots = computed(() => calendarYearPickerVariants())
const cellClass = computed(() => composeTwClasses(props.class, slots.value.yearCell()))

const isSelected = computed(() => props.year === grid?.focusedYear.value)
const isActive = computed(() => props.year === grid?.activeYear.value)
const isOpen = computed(() => grid?.isOpen.value ?? false)
const formattedYear = computed(() => grid?.formatYear(props.year) ?? String(props.year))

// Only the active cell stays tabbable, so Tab enters the grid at one place.
const tabindex = computed(() => (isOpen.value && isActive.value ? 0 : -1))

const select = () => grid?.selectYear(props.year)
</script>

<template>
  <button
    :aria-label="formattedYear"
    :aria-selected="isSelected"
    :class="cellClass"
    :data-selected="dataAttr(isSelected)"
    :data-year="props.year"
    :tabindex="tabindex"
    data-slot="calendar-year-picker-year-cell"
    type="button"
    @click="select"
    @focus="grid?.setActiveYear(props.year)"
  >
    <slot
      :formatted-year="formattedYear"
      :is-current-year="props.year === new Date().getFullYear()"
      :is-open="isOpen"
      :is-selected="isSelected"
      :year="props.year"
    >
      {{ formattedYear }}
    </slot>
  </button>
</template>
