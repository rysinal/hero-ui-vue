<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY } from './context'

interface SelectValueProps {
  class?: string
  placeholder?: string
}

const props = defineProps<SelectValueProps>()
const context = inject(SELECT_CONTEXT_KEY, null)
const isPlaceholder = computed(() => !context?.hasSelection.value)
const defaultChildren = computed(() => {
  if (!context?.hasSelection.value) return props.placeholder ?? context?.placeholder.value

  return context.selectedItems.value.map((item) => item.textValue).join(', ')
})
const valueClass = computed(() => composeTwClasses(props.class, context?.slots.value.value()))
const state = computed(() => ({
  selectedItems: context?.selectedItems.value ?? [],
  selectedKeys: context?.selectedKeys.value ?? [],
  selectionMode: context?.selectionMode.value,
}))
</script>

<template>
  <span
    :class="valueClass"
    :data-placeholder="dataAttr(isPlaceholder)"
    data-slot="select-value"
  >
    <slot
      :default-children="defaultChildren"
      :is-placeholder="isPlaceholder"
      :state="state"
    >
      {{ defaultChildren }}
    </slot>
  </span>
</template>
