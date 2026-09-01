<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DROPDOWN_ITEM_CONTEXT_KEY } from './context'

interface DropdownItemIndicatorProps {
  class?: string
  type?: 'checkmark' | 'dot'
}

const props = withDefaults(defineProps<DropdownItemIndicatorProps>(), {
  type: 'checkmark',
})

const context = inject(DROPDOWN_ITEM_CONTEXT_KEY, null)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.indicator()),
)
const isSelected = computed(() => context?.isSelected.value ?? false)
</script>

<template>
  <span
    :class="indicatorClass"
    :data-type="props.type"
    :data-visible="isSelected || undefined"
    aria-hidden="true"
    data-slot="menu-item-indicator"
  >
    <slot :is-selected="isSelected">
      <svg
        v-if="props.type === 'dot'"
        aria-hidden="true"
        data-slot="menu-item-indicator--dot"
        fill="currentColor"
        fill-rule="evenodd"
        role="presentation"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path clip-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" fill-rule="evenodd" />
      </svg>
      <svg
        v-else
        :stroke-dashoffset="isSelected ? 44 : 66"
        aria-hidden="true"
        data-slot="menu-item-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-dasharray="22"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    </slot>
  </span>
</template>
