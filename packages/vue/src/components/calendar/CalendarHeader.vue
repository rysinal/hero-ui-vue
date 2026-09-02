<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CALENDAR_CONTEXT_KEY, calendarSlotName } from './context'

interface CalendarHeaderProps {
  class?: string
}

const props = defineProps<CalendarHeaderProps>()
const context = inject(CALENDAR_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.header()))
const slotName = computed(() => calendarSlotName(context, 'header'))
</script>

<template>
  <div :class="elementClass" :data-slot="slotName">
    <slot />
  </div>
</template>
