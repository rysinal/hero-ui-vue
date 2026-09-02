<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CALENDAR_CONTEXT_KEY, calendarSlotName } from './context'

interface CalendarGridBodyProps {
  class?: string
}

const props = defineProps<CalendarGridBodyProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.gridBody()))
const slotName = computed(() => calendarSlotName(context, 'grid-body'))
</script>

<template>
  <tbody :class="elementClass" :data-slot="slotName">
    <slot />
  </tbody>
</template>
