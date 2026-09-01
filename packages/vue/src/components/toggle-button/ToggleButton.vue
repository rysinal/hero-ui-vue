<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { Toggle } from 'radix-vue'
import { toggleButtonVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import {
  TOGGLE_BUTTON_GROUP_CONTEXT_KEY,
  type ToggleButtonGroupKey,
} from '../toggle-button-group/context'

interface ToggleButtonProps {
  class?: string
  defaultSelected?: boolean
  disabled?: boolean
  /** Identifies this button inside a ToggleButtonGroup that drives selection. */
  id?: ToggleButtonGroupKey
  isDisabled?: boolean
  isIconOnly?: boolean
  isSelected?: boolean
  selected?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost'
}

const props = withDefaults(defineProps<ToggleButtonProps>(), {
  defaultSelected: false,
  disabled: undefined,
  id: undefined,
  isDisabled: undefined,
  isIconOnly: false,
  isSelected: undefined,
  selected: undefined,
  size: undefined,
})

const emit = defineEmits<{
  'update:selected': [selected: boolean]
  change: [selected: boolean]
}>()

const group = inject(TOGGLE_BUTTON_GROUP_CONTEXT_KEY, null)

/** The group owns selection only when it was given a selectionMode and this button has an id. */
const isGroupControlled = computed(
  () => group !== null && group.selectionMode.value !== undefined && props.id !== undefined,
)

const internalSelected = ref(props.defaultSelected)
const controlledSelected = computed(() => props.selected ?? props.isSelected)

const isSelected = computed(() => {
  if (isGroupControlled.value) return group!.isSelected(props.id!)
  return controlledSelected.value ?? internalSelected.value
})

const finalIsDisabled = computed(
  () => props.disabled ?? props.isDisabled ?? group?.isDisabled.value,
)
const finalSize = computed(() => props.size ?? group?.size.value)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

watch(
  () => props.defaultSelected,
  (value) => {
    if (controlledSelected.value === undefined) internalSelected.value = value
  },
)

const toggleClass = computed(() =>
  composeTwClasses(
    props.class,
    toggleButtonVariants({
      isIconOnly: props.isIconOnly,
      size: finalSize.value,
      variant: props.variant,
    }),
  ),
)

const handlePressedChange = (nextPressed: boolean) => {
  if (finalIsDisabled.value) return

  if (isGroupControlled.value) {
    group!.toggleKey(props.id!)
    return
  }

  if (controlledSelected.value === undefined) internalSelected.value = nextPressed

  emit('update:selected', nextPressed)
  emit('change', nextPressed)
}
</script>

<template>
  <Toggle
    :aria-disabled="dataAttr(finalIsDisabled)"
    :class="toggleClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-selected="dataAttr(isSelected)"
    :disabled="finalIsDisabled"
    :pressed="isSelected"
    data-slot="toggle-button"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @update:pressed="handlePressedChange"
  >
    <slot :is-selected="isSelected" />
  </Toggle>
</template>
