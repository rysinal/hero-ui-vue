<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import { PopoverRoot } from 'radix-vue'
import { selectVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY, type SelectKey } from './context'
import { useSelectState, type SelectValue } from './useSelectState'
import type { SelectSelectionMode } from './context'

defineOptions({
  inheritAttrs: false,
})

interface SelectProps {
  as?: string
  class?: string
  defaultOpen?: boolean
  defaultValue?: SelectValue
  disabled?: boolean
  disabledKeys?: SelectKey[]
  fullWidth?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isOpen?: boolean
  isRequired?: boolean
  modelValue?: SelectValue
  name?: string
  placeholder?: string
  required?: boolean
  selectionMode?: SelectSelectionMode
  value?: SelectValue
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<SelectProps>(), {
  as: 'div',
  defaultOpen: false,
  defaultValue: undefined,
  disabled: undefined,
  disabledKeys: () => [],
  fullWidth: false,
  isDisabled: undefined,
  isInvalid: undefined,
  isOpen: undefined,
  isRequired: undefined,
  modelValue: undefined,
  placeholder: 'Select one',
  required: undefined,
  selectionMode: 'single',
  value: undefined,
  variant: 'primary',
})

const emit = defineEmits<{
  change: [value: SelectValue]
  'open-change': [isOpen: boolean]
  'selection-change': [keys: SelectKey[]]
  'update:isOpen': [isOpen: boolean]
  'update:modelValue': [value: SelectValue]
  'update:value': [value: SelectValue]
}>()

const attrs = useAttrs()

const slots = computed(() => selectVariants({ fullWidth: props.fullWidth, variant: props.variant }))
const isDisabled = computed(() => props.disabled ?? props.isDisabled)
const isRequired = computed(() => props.required ?? props.isRequired)
const isInvalid = computed(() => props.isInvalid)

const state = useSelectState(props, {
  isDisabled,
  isInvalid,
  isRequired,
  onOpenChange: (nextOpen) => {
    emit('update:isOpen', nextOpen)
    emit('open-change', nextOpen)
  },
  onSelectionChange: (keys, value) => {
    emit('update:modelValue', value)
    emit('update:value', value)
    emit('selection-change', keys)
    emit('change', value)
  },
  placeholder: computed(() => props.placeholder),
  slots,
})

const { hiddenInputValues, isOpen, selectedItems, selectedKeys, setOpen } = state
const selectClass = computed(() => composeTwClasses(props.class, slots.value.base()))

provide(SELECT_CONTEXT_KEY, state.context)
</script>

<template>
  <PopoverRoot :open="isOpen" @update:open="setOpen">
    <component
      :is="as"
      v-bind="attrs"
      :aria-disabled="dataAttr(isDisabled)"
      :aria-invalid="dataAttr(isInvalid)"
      :class="selectClass"
      :data-disabled="dataAttr(isDisabled)"
      :data-invalid="dataAttr(isInvalid)"
      :data-open="dataAttr(isOpen)"
      :data-required="dataAttr(isRequired)"
      data-slot="select"
    >
      <slot
        :is-disabled="isDisabled"
        :is-invalid="isInvalid"
        :is-open="isOpen"
        :is-required="isRequired"
        :selected-items="selectedItems"
        :selected-keys="selectedKeys"
      />
      <template v-if="name || isRequired">
        <input
          v-if="selectionMode === 'single'"
          :disabled="isDisabled"
          :name="name"
          :required="isRequired"
          :value="hiddenInputValues[0] ?? ''"
          class="select__validation-proxy"
          tabindex="-1"
        />
        <template v-else>
          <input
            v-if="hiddenInputValues.length === 0"
            :disabled="isDisabled"
            :name="name"
            :required="isRequired"
            class="select__validation-proxy"
            tabindex="-1"
            value=""
          />
          <input
            v-for="hiddenValue in hiddenInputValues"
            v-else
            :key="hiddenValue"
            :disabled="isDisabled"
            :name="name"
            :value="hiddenValue"
            class="select__validation-proxy"
            tabindex="-1"
          />
        </template>
      </template>
    </component>
  </PopoverRoot>
</template>
