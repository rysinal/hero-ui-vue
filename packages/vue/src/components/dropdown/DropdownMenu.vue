<script setup lang="ts">
import { computed, inject, watchEffect } from 'vue'
import { composeTwClasses } from '../../utils'
import {
  DROPDOWN_CONTEXT_KEY,
  type DropdownKey,
  type DropdownSelectionMode,
} from './context'

interface DropdownMenuProps {
  class?: string
  /** React declares selection on the Menu rather than the root. */
  selectionMode?: DropdownSelectionMode
  selectedKeys?: DropdownKey[]
  defaultSelectedKeys?: DropdownKey[]
}

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  defaultSelectedKeys: undefined,
  selectedKeys: undefined,
  selectionMode: undefined,
})

const emit = defineEmits<{
  'update:selectedKeys': [keys: DropdownKey[]]
  selectionChange: [keys: DropdownKey[]]
  action: [key: DropdownKey | undefined]
}>()

const context = inject(DROPDOWN_CONTEXT_KEY, null)

// Hand the menu's selection settings up to the root, which owns the state.
watchEffect(() => {
  context?.adoptMenuSelection({
    defaultSelectedKeys: props.defaultSelectedKeys,
    onSelectionChange: (keys) => {
      emit('update:selectedKeys', keys)
      emit('selectionChange', keys)
    },
    selectedKeys: props.selectedKeys,
    selectionMode: props.selectionMode,
  })
})

const menuClass = computed(() => composeTwClasses(props.class, context?.slots.value.menu()))
const selectionMode = computed(() => context?.selectionMode.value ?? 'none')
</script>

<template>
  <div
    :class="menuClass"
    :data-selection-mode="selectionMode"
    data-slot="dropdown-menu"
    role="none"
  >
    <slot />
  </div>
</template>
