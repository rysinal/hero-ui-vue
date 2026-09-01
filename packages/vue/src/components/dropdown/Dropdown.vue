<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { DropdownMenuRoot } from 'radix-vue'
import { dropdownVariants } from '@rysinal/heroui-vue-styles'
import {
  DROPDOWN_CONTEXT_KEY,
  type DropdownKey,
  type DropdownMenuSelection,
  type DropdownSelectionMode,
} from './context'

interface DropdownProps {
  /** Controlled open state. Supports `v-model:is-open`. */
  isOpen?: boolean
  defaultOpen?: boolean
  selectionMode?: DropdownSelectionMode
  /** Controlled selection. Supports `v-model:selected-keys`. */
  selectedKeys?: DropdownKey[]
  defaultSelectedKeys?: DropdownKey[]
  disallowEmptySelection?: boolean
}

const props = withDefaults(defineProps<DropdownProps>(), {
  defaultOpen: false,
  defaultSelectedKeys: () => [],
  disallowEmptySelection: false,
  isOpen: undefined,
  selectedKeys: undefined,
  selectionMode: 'none',
})

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'update:selectedKeys': [keys: DropdownKey[]]
  openChange: [value: boolean]
  selectionChange: [keys: DropdownKey[]]
  action: [key: DropdownKey | undefined]
}>()

// Dropdown.Menu may declare the selection instead of the root, which is where
// React puts it; whichever is present wins, with the root taking precedence.
const menuSelection = ref<DropdownMenuSelection>({})

const adoptMenuSelection = (selection: DropdownMenuSelection) => {
  menuSelection.value = selection
}

const effectiveSelectionMode = computed<DropdownSelectionMode>(
  () => menuSelection.value.selectionMode ?? props.selectionMode,
)

const internalSelectedKeys = ref<DropdownKey[]>([...props.defaultSelectedKeys])
const controlledKeys = computed(() => props.selectedKeys ?? menuSelection.value.selectedKeys)
const isSelectionControlled = computed(() => controlledKeys.value !== undefined)
const selectedKeys = computed(() => controlledKeys.value ?? internalSelectedKeys.value)

watch(
  () => menuSelection.value.defaultSelectedKeys,
  (keys) => {
    if (keys && props.defaultSelectedKeys.length === 0) internalSelectedKeys.value = [...keys]
  },
  { immediate: true },
)

const slots = computed(() => dropdownVariants())

const toggleKey = (key: DropdownKey) => {
  if (effectiveSelectionMode.value === 'none') return

  const current = selectedKeys.value
  let next: DropdownKey[]

  if (effectiveSelectionMode.value === 'single') {
    if (current.includes(key)) next = props.disallowEmptySelection ? current : []
    else next = [key]
  } else if (!current.includes(key)) {
    next = [...current, key]
  } else if (props.disallowEmptySelection && current.length === 1) {
    next = current
  } else {
    next = current.filter((item) => item !== key)
  }

  if (next === current) return

  if (!isSelectionControlled.value) internalSelectedKeys.value = next
  emit('update:selectedKeys', next)
  emit('selectionChange', next)
  menuSelection.value.onSelectionChange?.(next)
}

provide(DROPDOWN_CONTEXT_KEY, {
  adoptMenuSelection,
  reportAction: (key) => emit('action', key),
  selectedKeys,
  selectionMode: effectiveSelectionMode,
  slots,
  toggleKey,
})

const handleOpenChange = (value: boolean) => {
  emit('update:isOpen', value)
  emit('openChange', value)
}
</script>

<template>
  <DropdownMenuRoot
    :default-open="props.defaultOpen"
    :open="props.isOpen"
    data-slot="dropdown"
    @update:open="handleOpenChange"
  >
    <slot :selected-keys="selectedKeys" />
  </DropdownMenuRoot>
</template>
