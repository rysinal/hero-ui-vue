<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DROPDOWN_ITEM_CONTEXT_KEY } from './context'

interface DropdownSubmenuIndicatorProps {
  class?: string
}

const props = defineProps<DropdownSubmenuIndicatorProps>()
const context = inject(DROPDOWN_ITEM_CONTEXT_KEY, null)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.submenuIndicator()),
)
// React renders nothing unless the item actually opens a submenu.
const hasSubmenu = computed(() => context?.hasSubmenu.value ?? false)
</script>

<template>
  <span
    v-if="hasSubmenu"
    :class="indicatorClass"
    aria-hidden="true"
    data-slot="submenu-indicator"
  >
    <slot>
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </slot>
  </span>
</template>
