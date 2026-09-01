<script setup lang="ts">
import { computed, inject, provide, useSlots } from 'vue'
import { RadioGroupItem, RadioGroupIndicator } from 'radix-vue'
import { radioVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import RadioControl from './RadioControl.vue'
import { RADIO_CONTEXT_KEY } from './context'
import { RADIO_GROUP_CONTEXT_KEY } from '../radio-group/context'

interface RadioProps {
  class?: string
  controlClass?: string
  contentClass?: string
  indicatorClass?: string
  value: string
  disabled?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  required?: boolean
  isRequired?: boolean
  id?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: undefined,
  isDisabled: undefined,
  isInvalid: undefined,
  isRequired: undefined,
  required: undefined,
})
const radioGroupContext = inject(RADIO_GROUP_CONTEXT_KEY, null)

const styles = computed(() => radioVariants())
const baseClass = computed(() => composeTwClasses(props.class, styles.value.base()))
const controlClass = computed(() => composeTwClasses(props.controlClass, styles.value.control()))
const indicatorClass = computed(() =>
  composeTwClasses(props.indicatorClass, styles.value.indicator()),
)
const contentClass = computed(() => composeTwClasses(props.contentClass, styles.value.content()))
const finalIsDisabled = computed(
  () => props.disabled ?? props.isDisabled ?? radioGroupContext?.isDisabled.value,
)
const finalIsInvalid = computed(() => props.isInvalid ?? radioGroupContext?.isInvalid.value)
const finalIsReadOnly = computed(() => radioGroupContext?.isReadOnly.value)
const isSelected = computed(() => radioGroupContext?.selectedValue.value === props.value)
const slotContent = useSlots()

/** True when the caller composed <Radio.Control> themselves. */
const hasComposedControl = computed(() => {
  const containsControl = (list: unknown): boolean => {
    if (Array.isArray(list)) return list.some(containsControl)
    const vnode = list as { type?: unknown; children?: unknown } | null
    if (!vnode || typeof vnode !== 'object') return false
    if (vnode.type === RadioControl) return true
    return containsControl(vnode.children)
  }
  try {
    return containsControl(slotContent.default?.({}) ?? [])
  } catch {
    return false
  }
})

provide(RADIO_CONTEXT_KEY, {
  slots: styles,
  state: computed(() => ({
    isDisabled: finalIsDisabled.value === true,
    isInvalid: finalIsInvalid.value === true,
    isSelected: isSelected.value,
  })),
})

const { interactionAttrs, interactionHandlers } = useInteractionStates(
  () => finalIsDisabled.value || finalIsReadOnly.value,
)
</script>

<template>
  <RadioGroupItem
    :class="baseClass"
    :value="value"
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-invalid="dataAttr(finalIsInvalid)"
    :aria-readonly="dataAttr(finalIsReadOnly)"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-invalid="dataAttr(finalIsInvalid)"
    :data-readonly="dataAttr(finalIsReadOnly)"
    :data-selected="dataAttr(isSelected)"
    :disabled="finalIsDisabled"
    :required="required ?? isRequired"
    :id="id"
    data-slot="radio"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
  >
    <div v-if="!hasComposedControl" :class="controlClass" data-slot="radio-control">
      <RadioGroupIndicator :class="indicatorClass" data-slot="radio-indicator" force-mount>
        <slot
          name="indicator"
          :checked="isSelected"
          :is-selected="isSelected"
          :is-disabled="finalIsDisabled"
          :is-invalid="finalIsInvalid"
          :is-read-only="finalIsReadOnly"
        />
      </RadioGroupIndicator>
    </div>
    <!-- Composed: render the caller's parts as-is. Otherwise wrap the default
         slot in the content element for the common `<Radio>Label</Radio>`. -->
    <slot
      v-if="hasComposedControl"
      :checked="isSelected"
      :is-selected="isSelected"
      :is-disabled="finalIsDisabled"
      :is-invalid="finalIsInvalid"
      :is-read-only="finalIsReadOnly"
    />
    <div v-else-if="$slots.default" :class="contentClass" data-slot="radio-content">
      <slot
        :checked="isSelected"
        :is-selected="isSelected"
        :is-disabled="finalIsDisabled"
        :is-invalid="finalIsInvalid"
        :is-read-only="finalIsReadOnly"
      />
    </div>
  </RadioGroupItem>
</template>
