<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { NUMBER_FIELD_CONTEXT_KEY } from './context'

interface NumberFieldIncrementButtonProps {
  class?: string
}

const props = defineProps<NumberFieldIncrementButtonProps>()
const numberFieldContext = inject(NUMBER_FIELD_CONTEXT_KEY, null)
const slots = useSlots()
const buttonClass = computed(() =>
  composeTwClasses(props.class, numberFieldContext?.slots.value.incrementButton()),
)
const { interactionAttrs, interactionHandlers } = useInteractionStates(
  () => numberFieldContext?.isIncrementDisabled.value,
)
</script>

<template>
  <button
    :aria-disabled="dataAttr(numberFieldContext?.isIncrementDisabled.value)"
    :class="buttonClass"
    :data-disabled="dataAttr(numberFieldContext?.isIncrementDisabled.value)"
    :disabled="numberFieldContext?.isIncrementDisabled.value"
    aria-label="Increase value"
    data-slot="number-field-increment-button"
    slot="increment"
    type="button"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="numberFieldContext?.increment()"
  >
    <slot>
      <svg v-if="!slots.default" aria-hidden="true" data-slot="number-field-increment-button-icon" viewBox="0 0 16 16">
        <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H12a.75.75 0 0 1 0 1.5H8.75V12a.75.75 0 0 1-1.5 0V8.75H4a.75.75 0 0 1 0-1.5h3.25V4A.75.75 0 0 1 8 3.25Z" fill="currentColor" />
      </svg>
    </slot>
  </button>
</template>
