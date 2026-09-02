<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, onMounted, ref } from 'vue'
import { PopoverTrigger } from 'radix-vue'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import { DATE_FIELD_CONTEXT_KEY } from '../date-field/context'
import { DATE_PICKER_CONTEXT_KEY } from './context'

interface DatePickerTriggerProps {
  class?: string
  isDisabled?: boolean
}

// isDisabled defaults to undefined rather than false, so an unset prop falls
// through to the field's own state instead of overriding it.
const props = withDefaults(defineProps<DatePickerTriggerProps>(), {
  isDisabled: undefined,
})

const picker = inject(DATE_PICKER_CONTEXT_KEY, null)
const field = inject(DATE_FIELD_CONTEXT_KEY, null)

const isDisabled = computed(() => props.isDisabled ?? field?.isDisabled.value ?? false)
const triggerClass = computed(() =>
  composeTwClasses(props.class, picker?.slots.value.trigger()),
)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => isDisabled.value)

// Hand the element to the root so it can restore focus after a keyboard close.
const element = ref<HTMLElement | { $el?: HTMLElement } | null>(null)
onMounted(() => {
  if (!picker) return
  const node = element.value
  picker.triggerRef.value =
    node && '$el' in node ? (node.$el ?? null) : (node as HTMLElement | null)
})
</script>

<template>
  <PopoverTrigger
    ref="element"
    :aria-disabled="dataAttr(isDisabled)"
    :class="triggerClass"
    :data-disabled="dataAttr(isDisabled)"
    :data-open="dataAttr(picker?.isOpen.value)"
    :disabled="isDisabled"
    as="button"
    data-slot="date-picker-trigger"
    type="button"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
  >
    <slot :is-open="picker?.isOpen.value ?? false" />
  </PopoverTrigger>
</template>
