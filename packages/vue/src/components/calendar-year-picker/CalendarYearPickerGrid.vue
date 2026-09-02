<script setup lang="ts">
/* global HTMLElement, KeyboardEvent, requestAnimationFrame, cancelAnimationFrame */
import { computed, inject, onBeforeUnmount, provide, ref, shallowRef, watch } from 'vue'
import { calendarYearPickerVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, getYearRange } from '../../utils'
import { CALENDAR_CONTEXT_KEY } from '../calendar/context'
import { YEAR_PICKER_CONTEXT_KEY, YEAR_PICKER_GRID_CONTEXT_KEY } from './context'

interface CalendarYearPickerGridProps {
  class?: string
}

const props = defineProps<CalendarYearPickerGridProps>()

const calendar = inject(CALENDAR_CONTEXT_KEY, null)
const yearPicker = inject(YEAR_PICKER_CONTEXT_KEY, null)

const gridRef = ref<HTMLElement | null>(null)
const slots = computed(() => calendarYearPickerVariants())
const gridClass = computed(() => composeTwClasses(props.class, slots.value.yearGrid()))

const isOpen = computed(() => yearPicker?.isOpen.value ?? false)
const focusedYear = computed(() => calendar?.focusedDate.value.year ?? new Date().getFullYear())

// Calendar-aware year list, so non-Gregorian systems get correct boundaries.
const yearDates = shallowRef(getYearRange(yearPicker?.minValue.value, yearPicker?.maxValue.value))
watch(
  () => [yearPicker?.minValue.value, yearPicker?.maxValue.value] as const,
  ([min, max]) => {
    yearDates.value = getYearRange(min, max)
  },
)

const years = computed(() => yearDates.value.map((date) => date.year))

const formatYear = (year: number) => {
  const date = yearDates.value.find((candidate) => candidate.year === year)
  if (!date) return String(year)

  const focused = calendar?.focusedDate.value
  const identifier = focused?.calendar.identifier ?? 'gregory'

  return new Intl.DateTimeFormat(calendar?.locale.value ?? 'en-US', {
    calendar: identifier,
    era: identifier === 'gregory' && focused?.era === 'BC' ? 'short' : undefined,
    year: 'numeric',
  }).format(date.toDate('UTC'))
}

const activeYear = ref(focusedYear.value)
const setActiveYear = (year: number) => {
  activeYear.value = year
}

const selectYear = (year: number) => {
  const focused = calendar?.focusedDate.value
  if (focused) calendar?.setFocusedDate(focused.set({ year }))
  yearPicker?.setIsOpen(false)
}

const focusYearCell = (year: number) => {
  gridRef.value?.querySelector<HTMLElement>(`[data-year='${year}']`)?.focus()
}

/**
 * The year grid is absolutely positioned, so it has to be told where the day
 * grid sits and how tall it is. The CSS relies on this being set here.
 */
const alignToDayGrid = () => {
  const grid = gridRef.value
  const root = yearPicker?.calendarRef.value
  const slot = yearPicker?.calendarGridSlot
  if (!grid || !root || !slot) return

  const dayGrid = root.querySelector<HTMLElement>(`[data-slot='${slot}']`)
  if (!dayGrid) return

  grid.style.top = `${dayGrid.offsetTop}px`
  grid.style.height = `${dayGrid.offsetHeight}px`
}

let rafId: number | undefined
const cancelPendingFocus = () => {
  if (rafId !== undefined) cancelAnimationFrame(rafId)
  rafId = undefined
}

// Anchor keyboard navigation to the selected year whenever the picker opens.
watch([isOpen, focusedYear, years], ([open]) => {
  alignToDayGrid()
  if (!open || years.value.length === 0) return

  const next = years.value.includes(focusedYear.value) ? focusedYear.value : years.value[0]!
  activeYear.value = next

  cancelPendingFocus()
  rafId = requestAnimationFrame(() => {
    rafId = undefined
    focusYearCell(next)
  })
})

watch([activeYear, isOpen, years], ([active, open]) => {
  if (!open || years.value.length === 0) return
  if (!years.value.includes(active as number)) activeYear.value = years.value[0]!
})

onBeforeUnmount(cancelPendingFocus)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    yearPicker?.setIsOpen(false)
    return
  }

  if (!isOpen.value || years.value.length === 0) return

  const current = years.value.indexOf(activeYear.value)
  if (current === -1) return

  const last = years.value.length - 1
  let next = current

  // Three columns, matching the CSS grid.
  switch (event.key) {
    case 'ArrowRight':
      next = Math.min(current + 1, last)
      break
    case 'ArrowLeft':
      next = Math.max(current - 1, 0)
      break
    case 'ArrowDown':
      next = Math.min(current + 3, last)
      break
    case 'ArrowUp':
      next = Math.max(current - 3, 0)
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = last
      break
    default:
      return
  }

  event.preventDefault()
  const year = years.value[next]!
  activeYear.value = year
  focusYearCell(year)
}

provide(YEAR_PICKER_GRID_CONTEXT_KEY, {
  activeYear,
  focusedYear,
  formatYear,
  isOpen,
  selectYear,
  setActiveYear,
  years,
})
</script>

<template>
  <div
    ref="gridRef"
    :class="gridClass"
    :data-open="dataAttr(isOpen)"
    data-slot="calendar-year-picker-grid"
    role="grid"
    @keydown="handleKeydown"
  >
    <slot :years="years" />
  </div>
</template>
