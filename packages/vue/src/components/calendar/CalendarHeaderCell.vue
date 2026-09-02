<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CALENDAR_CONTEXT_KEY, calendarSlotName } from './context'

interface CalendarHeaderCellProps {
  class?: string
  title?: string
}

const props = defineProps<CalendarHeaderCellProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)

const cellClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.headerCell()),
)
const slotName = computed(() => calendarSlotName(context, 'header-cell'))
</script>

<template>
  <th :abbr="props.title" :class="cellClass" :data-slot="slotName" scope="col">
    <slot />
  </th>
</template>
