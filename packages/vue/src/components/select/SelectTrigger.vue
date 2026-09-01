<script setup lang="ts">
/* global HTMLButtonElement */
import { computed, inject, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
import { PopoverTrigger } from 'radix-vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { SELECT_CONTEXT_KEY } from './context'

defineOptions({
  inheritAttrs: false,
})

interface SelectTriggerProps {
  class?: string
  disabled?: boolean
  isDisabled?: boolean
}

const props = withDefaults(defineProps<SelectTriggerProps>(), {
  disabled: undefined,
  isDisabled: undefined,
})

const context = inject(SELECT_CONTEXT_KEY, null)
const attrs = useAttrs()
const triggerRef = ref<HTMLButtonElement | null>(null)
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled ?? context?.isDisabled.value)
const triggerClass = computed(() => composeTwClasses(props.class, context?.slots.value.trigger()))
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)
const triggerAttrs = computed(() => ({
  ...attrs,
  ...interactionAttrs.value,
}))

onMounted(() => {
  context?.setTriggerElement(triggerRef.value)
})

onBeforeUnmount(() => {
  context?.setTriggerElement(null)
})
</script>

<template>
  <PopoverTrigger as-child>
    <button
      ref="triggerRef"
      v-bind="triggerAttrs"
      :aria-disabled="dataAttr(finalIsDisabled)"
      :aria-expanded="dataAttr(context?.isOpen.value)"
      :class="triggerClass"
      :data-disabled="dataAttr(finalIsDisabled)"
      :data-open="dataAttr(context?.isOpen.value)"
      :disabled="finalIsDisabled"
      data-slot="select-trigger"
      type="button"
      v-on="interactionHandlers"
    >
      <slot :is-disabled="finalIsDisabled" :is-open="context?.isOpen.value" />
    </button>
  </PopoverTrigger>
</template>
