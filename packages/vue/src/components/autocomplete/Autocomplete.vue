<script setup lang="ts">
import { computed, provide, ref, shallowRef, useAttrs } from 'vue'
import { PopoverRoot } from 'radix-vue'
import { autocompleteVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY, type SelectKey, type SelectSelectionMode } from '../select/context'
import { useSelectState, type SelectValue } from '../select/useSelectState'
import { AUTOCOMPLETE_CONTEXT_KEY, type AutocompleteFilterFn } from './context'

defineOptions({
  inheritAttrs: false,
})

interface AutocompleteProps {
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

const props = withDefaults(defineProps<AutocompleteProps>(), {
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
  clear: []
  'open-change': [isOpen: boolean]
  'selection-change': [keys: SelectKey[]]
  'update:isOpen': [isOpen: boolean]
  'update:modelValue': [value: SelectValue]
  'update:value': [value: SelectValue]
}>()

const attrs = useAttrs()

const slots = computed(() =>
  autocompleteVariants({ fullWidth: props.fullWidth, variant: props.variant }),
)
const isDisabled = computed(() => props.disabled ?? props.isDisabled)
const isRequired = computed(() => props.required ?? props.isRequired)
const isInvalid = computed(() => props.isInvalid)

const filterQuery = ref('')
// Holding a function in a plain ref would let Vue invoke it as a getter.
const filterPredicate = shallowRef<AutocompleteFilterFn | null>(null)

/**
 * Items ask whether they still match. Only `Autocomplete.Filter` supplies a
 * predicate, so a bare popover shows everything — and asynchronous demos that
 * filter server-side register `null` to keep every returned item visible.
 */
const matchesFilter = (textValue: string) => {
  if (filterQuery.value === '' || !filterPredicate.value) return true

  return filterPredicate.value(textValue, filterQuery.value)
}

const state = useSelectState(props, {
  isDisabled,
  isInvalid,
  isRequired,
  matchesFilter,
  onOpenChange: (nextOpen) => {
    // A fresh query every time the popover opens, matching React's Autocomplete.
    if (!nextOpen) filterQuery.value = ''

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
  // Autocomplete's recipe adds `filter`/`clearButton` on top of Select's slots.
  // Its own parts read them through AUTOCOMPLETE_CONTEXT_KEY, so the Select
  // context only needs a structurally compatible stand-in here.
  slots: computed(() => slots.value as never),
})

const { hiddenInputValues, isOpen, selectedItems, selectedKeys, setOpen } = state
const autocompleteClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const clear = () => {
  state.context.setSelectedKeys([])
  emit('clear')
}

provide(SELECT_CONTEXT_KEY, state.context)
provide(AUTOCOMPLETE_CONTEXT_KEY, {
  clear,
  filterQuery,
  registerFilter: (predicate) => {
    filterPredicate.value = predicate
  },
  setFilterQuery: (value: string) => {
    filterQuery.value = value
  },
  slots,
})
</script>

<template>
  <PopoverRoot :open="isOpen" @update:open="setOpen">
    <component
      :is="as"
      v-bind="attrs"
      :aria-disabled="dataAttr(isDisabled)"
      :aria-invalid="dataAttr(isInvalid)"
      :class="autocompleteClass"
      :data-disabled="dataAttr(isDisabled)"
      :data-invalid="dataAttr(isInvalid)"
      :data-open="dataAttr(isOpen)"
      :data-required="dataAttr(isRequired)"
      data-slot="autocomplete"
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
          class="autocomplete__validation-proxy"
          tabindex="-1"
        />
        <template v-else>
          <input
            v-if="hiddenInputValues.length === 0"
            :disabled="isDisabled"
            :name="name"
            :required="isRequired"
            class="autocomplete__validation-proxy"
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
            class="autocomplete__validation-proxy"
            tabindex="-1"
          />
        </template>
      </template>
    </component>
  </PopoverRoot>
</template>
