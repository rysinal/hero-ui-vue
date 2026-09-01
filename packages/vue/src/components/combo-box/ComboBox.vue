<script setup lang="ts">
/* global HTMLElement */
import { computed, provide, ref, watch } from 'vue'
import { PopoverRoot } from 'radix-vue'
import { comboBoxVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY, type SelectItemRecord, type SelectKey } from '../select/context'
import { COMBO_BOX_CONTEXT_KEY, type ComboBoxKey } from './context'

interface ComboBoxProps {
  class?: string
  /** Selected key. Supports `v-model`. */
  modelValue?: ComboBoxKey | null
  defaultValue?: ComboBoxKey | null
  /** Text in the input. Supports `v-model:input-value`. */
  inputValue?: string
  defaultInputValue?: string
  isOpen?: boolean
  defaultOpen?: boolean
  placeholder?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  fullWidth?: boolean
  disabledKeys?: ComboBoxKey[]
  /** Lets the caller keep a value that matches no item. */
  allowsCustomValue?: boolean
  /** Overrides the default case-insensitive "contains" filter. */
  filter?: (textValue: string, inputValue: string) => boolean
  name?: string
}

const props = withDefaults(defineProps<ComboBoxProps>(), {
  allowsCustomValue: false,
  defaultInputValue: '',
  defaultOpen: false,
  defaultValue: null,
  disabledKeys: () => [],
  filter: undefined,
  fullWidth: false,
  inputValue: undefined,
  isDisabled: undefined,
  isInvalid: undefined,
  isOpen: undefined,
  isRequired: undefined,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: ComboBoxKey | null]
  'update:inputValue': [value: string]
  'update:isOpen': [value: boolean]
  openChange: [value: boolean]
  selectionChange: [value: ComboBoxKey | null]
}>()

const itemMap = ref(new Map<SelectKey, SelectItemRecord>())

const internalOpen = ref(props.defaultOpen)
const internalValue = ref<ComboBoxKey | null>(props.defaultValue)
const internalInput = ref(props.defaultInputValue)

const isOpen = computed(() => props.isOpen ?? internalOpen.value)
const selectedKey = computed(() => props.modelValue ?? internalValue.value)
const inputValue = computed(() => props.inputValue ?? internalInput.value)

const slots = computed(() => comboBoxVariants({ fullWidth: props.fullWidth }))
const comboBoxClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const setOpen = (open: boolean) => {
  if (props.isDisabled) return
  internalOpen.value = open
  emit('update:isOpen', open)
  emit('openChange', open)
}

const setInputValue = (value: string) => {
  internalInput.value = value
  emit('update:inputValue', value)
  if (!isOpen.value) setOpen(true)
}

const selectKey = (key: ComboBoxKey | null) => {
  internalValue.value = key
  emit('update:modelValue', key)
  emit('selectionChange', key)

  // Show the chosen item's label in the input, the way React does.
  const label = key === null ? '' : (itemMap.value.get(key)?.textValue ?? String(key))
  internalInput.value = label
  emit('update:inputValue', label)

  setOpen(false)
}

// Keep the input in step when the selection is driven from outside.
watch(
  () => props.modelValue,
  (key) => {
    if (key === undefined || props.inputValue !== undefined) return
    const label = key === null ? '' : (itemMap.value.get(key)?.textValue ?? String(key))
    internalInput.value = label
  },
)

const defaultFilter = (textValue: string, query: string) =>
  textValue.toLowerCase().includes(query.toLowerCase())

/** Items whose label matches the current query. */
const matches = (textValue: string) => {
  if (inputValue.value === '') return true
  return (props.filter ?? defaultFilter)(textValue, inputValue.value)
}

provide(COMBO_BOX_CONTEXT_KEY, {
  inputValue,
  isDisabled: computed(() => props.isDisabled),
  isInvalid: computed(() => props.isInvalid),
  isOpen,
  isRequired: computed(() => props.isRequired),
  placeholder: computed(() => props.placeholder),
  setInputValue,
  setOpen,
  slots,
})

const triggerElement = ref<HTMLElement | null>(null)

// Reuse the Select contract so ListBox items register and select as-is.
provide(SELECT_CONTEXT_KEY, {
  close: () => setOpen(false),
  disabledKeySet: computed(() => new Set(props.disabledKeys)),
  hasSelection: computed(() => selectedKey.value !== null),
  isDisabled: computed(() => props.isDisabled),
  isInvalid: computed(() => props.isInvalid),
  isOpen,
  isRequired: computed(() => props.isRequired),
  matchesFilter: (textValue: string) => matches(textValue),
  placeholder: computed(() => props.placeholder ?? ''),
  registerItem: (item: SelectItemRecord) => {
    const next = new Map(itemMap.value)
    next.set(item.key, item)
    itemMap.value = next
  },
  selectedItems: computed(() =>
    selectedKey.value === null
      ? []
      : [
          itemMap.value.get(selectedKey.value) ?? {
            key: selectedKey.value,
            textValue: String(selectedKey.value),
          },
        ],
  ),
  selectedKeySet: computed(() => new Set(selectedKey.value === null ? [] : [selectedKey.value])),
  selectedKeys: computed(() => (selectedKey.value === null ? [] : [selectedKey.value])),
  selectionMode: computed(() => 'single' as const),
  setOpen,
  setSelectedKeys: (keys: SelectKey[]) => selectKey(keys[0] ?? null),
  setTriggerElement: (element: HTMLElement | null) => {
    triggerElement.value = element
  },
  slots: computed(() => slots.value as never),
  triggerElement,
  unregisterItem: (key: SelectKey) => {
    const next = new Map(itemMap.value)
    next.delete(key)
    itemMap.value = next
  },
})
</script>

<template>
  <PopoverRoot :open="isOpen" @update:open="setOpen">
    <div
      :class="comboBoxClass"
      :data-disabled="dataAttr(props.isDisabled)"
      :data-invalid="dataAttr(props.isInvalid)"
      :data-open="dataAttr(isOpen)"
      data-slot="combo-box"
    >
      <slot :input-value="inputValue" :is-open="isOpen" :selected-key="selectedKey" />
    </div>
  </PopoverRoot>
</template>
