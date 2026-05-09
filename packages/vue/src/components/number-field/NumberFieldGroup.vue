<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { NUMBER_FIELD_CONTEXT_KEY } from './context'

interface NumberFieldGroupProps {
  class?: string
}

const props = defineProps<NumberFieldGroupProps>()
const numberFieldContext = inject(NUMBER_FIELD_CONTEXT_KEY, null)
const groupClass = computed(() =>
  composeTwClasses(props.class, numberFieldContext?.slots.value.group()),
)
const { interactionAttrs, interactionHandlers } = useInteractionStates(
  () => numberFieldContext?.isDisabled.value,
)
</script>

<template>
  <div
    :aria-disabled="dataAttr(numberFieldContext?.isDisabled.value)"
    :class="groupClass"
    :data-disabled="dataAttr(numberFieldContext?.isDisabled.value)"
    :data-focus-within="dataAttr(numberFieldContext?.isFocused.value)"
    :data-invalid="dataAttr(numberFieldContext?.isInvalid.value)"
    data-slot="number-field-group"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
  >
    <slot />
  </div>
</template>
