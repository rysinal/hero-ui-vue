<script setup lang="ts">
/* global FocusEvent, HTMLElement, HTMLInputElement, HTMLTextAreaElement, MouseEvent, Node */
import { computed, provide, ref } from 'vue'
import { inputGroupVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { INPUT_GROUP_CONTEXT_KEY } from './context'

interface InputGroupProps {
  class?: string
  fullWidth?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<InputGroupProps>(), {
  fullWidth: false,
  isDisabled: undefined,
  isInvalid: undefined,
})

const groupRef = ref<HTMLDivElement | null>(null)
const slots = computed(() =>
  inputGroupVariants({
    fullWidth: props.fullWidth,
    variant: props.variant,
  }),
)

provide(INPUT_GROUP_CONTEXT_KEY, {
  slots,
})

const { interactionAttrs, interactionHandlers } = useInteractionStates(() => props.isDisabled)

// input-group.css keys its hover styles off data-hovered combined with
// data-focus-within, so both have to be emitted.
const isFocusWithin = ref(false)
const handleFocusIn = () => {
  isFocusWithin.value = true
}
const handleFocusOut = (event: FocusEvent) => {
  const next = event.relatedTarget
  if (next instanceof Node && groupRef.value?.contains(next)) return
  isFocusWithin.value = false
}

const groupClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const handleClick = (event: MouseEvent) => {
  const target = event.target
  const input = groupRef.value?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    'input, textarea',
  )

  if (input && target instanceof HTMLElement && target !== input && !input.contains(target)) {
    input.focus()
  }
}
</script>

<template>
  <div
    ref="groupRef"
    :aria-disabled="dataAttr(props.isDisabled)"
    :aria-invalid="dataAttr(props.isInvalid)"
    :class="groupClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :data-focus-within="dataAttr(isFocusWithin)"
    :data-invalid="dataAttr(props.isInvalid)"
    data-slot="input-group"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @click="handleClick"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <slot />
  </div>
</template>
