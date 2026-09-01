<script setup lang="ts">
/* global Event, HTMLElement, HTMLInputElement, KeyboardEvent */
import { computed, inject, ref, watch } from 'vue'
import { PopoverAnchor } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { COMBO_BOX_CONTEXT_KEY } from './context'

interface ComboBoxInputGroupProps {
  class?: string
}

const props = defineProps<ComboBoxInputGroupProps>()
const context = inject(COMBO_BOX_CONTEXT_KEY, null)

const groupClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.inputGroup()),
)

/**
 * The input lives in the caller's markup, so listen on the group and drive the
 * ComboBox from whichever input is inside it.
 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target?.tagName === 'INPUT') context?.setInputValue(target.value)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') context?.setOpen(false)
  else if (event.key === 'ArrowDown' && !context?.isOpen.value) context?.setOpen(true)
}

const groupRef = ref<HTMLElement | null>(null)

/**
 * The input belongs to the caller, so push the ComboBox value into it whenever
 * the selection changes rather than requiring them to bind it themselves.
 */
watch(
  () => context?.inputValue.value,
  (value) => {
    const input = groupRef.value?.querySelector('input')
    if (input && value !== undefined && input.value !== value) input.value = value
  },
  { flush: 'post' },
)
</script>

<template>
  <PopoverAnchor as-child>
    <div
      ref="groupRef"
      :class="groupClass"
      :data-disabled="dataAttr(context?.isDisabled.value)"
      :data-invalid="dataAttr(context?.isInvalid.value)"
      data-slot="combo-box-input-group"
      @input="handleInput"
      @keydown="handleKeydown"
    >
      <slot />
    </div>
  </PopoverAnchor>
</template>
