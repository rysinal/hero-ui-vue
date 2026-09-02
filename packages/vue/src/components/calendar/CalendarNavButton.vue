<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { CALENDAR_CONTEXT_KEY, calendarSlotName } from './context'

interface CalendarNavButtonProps {
  class?: string
  slot?: 'previous' | 'next'
}

const props = withDefaults(defineProps<CalendarNavButtonProps>(), {
  slot: 'previous',
})

const context = inject(CALENDAR_CONTEXT_KEY, null)

const isPrevious = computed(() => props.slot === 'previous')
const isDisabled = computed(() => {
  if (context?.isDisabled.value) return true
  return isPrevious.value ? !context?.canGoPrevious.value : !context?.canGoNext.value
})

const { interactionAttrs, interactionHandlers } = useInteractionStates(() => isDisabled.value)

const buttonClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.navButton()),
)
const iconClass = computed(() => context?.slots.value.navButtonIcon())

const navigate = () => {
  if (isDisabled.value) return
  if (isPrevious.value) context?.goToPreviousMonth()
  else context?.goToNextMonth()
}

const slotName = computed(() => calendarSlotName(context, 'nav-button'))
const iconSlotName = computed(() => calendarSlotName(context, 'nav-button-icon'))
</script>

<template>
  <button
    :aria-label="isPrevious ? 'Previous month' : 'Next month'"
    :class="buttonClass"
    :data-disabled="dataAttr(isDisabled)"
    :disabled="isDisabled"
    :slot="props.slot"
    :data-slot="slotName"
    type="button"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="navigate"
  >
    <slot>
      <svg
        :class="iconClass"
        :data-slot="iconSlotName"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path :d="isPrevious ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'" />
      </svg>
    </slot>
  </button>
</template>
