<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CALENDAR_CONTEXT_KEY, calendarSlotName } from './context'

interface CalendarHeadingProps {
  class?: string
}

const props = defineProps<CalendarHeadingProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)

const headingClass = computed(() => composeTwClasses(props.class, context?.slots.value.heading()))

// Name the visible range: one month, or "September – October 2026".
const label = computed(() => {
  const months = context?.visibleMonths.value ?? []
  const locale = context?.locale.value ?? 'en-US'
  if (months.length === 0) return ''

  const format = (date: (typeof months)[number], withYear: boolean) =>
    new Intl.DateTimeFormat(locale, {
      month: 'long',
      ...(withYear ? { year: 'numeric' } : {}),
    }).format(date.toDate('UTC'))

  const first = months[0]!
  const last = months[months.length - 1]!
  if (months.length === 1) return format(first, true)

  return first.year === last.year
    ? `${format(first, false)} – ${format(last, true)}`
    : `${format(first, true)} – ${format(last, true)}`
})
const slotName = computed(() => calendarSlotName(context, 'heading'))
</script>

<template>
  <h2 :class="headingClass" :data-slot="slotName">
    <slot :label="label">{{ label }}</slot>
  </h2>
</template>
