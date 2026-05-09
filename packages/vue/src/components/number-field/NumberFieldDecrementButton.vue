<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { NUMBER_FIELD_CONTEXT_KEY } from './context'

interface NumberFieldDecrementButtonProps {
  class?: string
}

const props = defineProps<NumberFieldDecrementButtonProps>()
const numberFieldContext = inject(NUMBER_FIELD_CONTEXT_KEY, null)
const slots = useSlots()
const buttonClass = computed(() =>
  composeTwClasses(props.class, numberFieldContext?.slots.value.decrementButton()),
)
const { interactionAttrs, interactionHandlers } = useInteractionStates(
  () => numberFieldContext?.isDecrementDisabled.value,
)
</script>

<template>
  <button
    :aria-disabled="dataAttr(numberFieldContext?.isDecrementDisabled.value)"
    :class="buttonClass"
    :data-disabled="dataAttr(numberFieldContext?.isDecrementDisabled.value)"
    :disabled="numberFieldContext?.isDecrementDisabled.value"
    aria-label="Decrease value"
    data-slot="number-field-decrement-button"
    slot="decrement"
    type="button"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="numberFieldContext?.decrement()"
  >
    <slot>
      <svg v-if="!slots.default" aria-hidden="true" data-slot="number-field-decrement-button-icon" viewBox="0 0 16 16">
        <path d="M4 7.25h8a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1 0-1.5Z" fill="currentColor" />
      </svg>
    </slot>
  </button>
</template>
