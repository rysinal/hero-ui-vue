<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABS_CONTEXT_KEY } from './context'
import { TAB_CONTEXT_KEY } from './tab-context'

interface TabIndicatorProps {
  class?: string
}

const props = defineProps<TabIndicatorProps>()
const tabsContext = inject(TABS_CONTEXT_KEY, null)
const tabContext = inject(TAB_CONTEXT_KEY, null)

/**
 * React Aria's SelectionIndicator sits inside each Tab and only paints for the
 * selected one; tabs.css sizes it to fill its parent tab. Rendering it in every
 * tab and hiding the inactive ones keeps that contract.
 */
const isSelected = computed(() => tabContext?.isSelected.value ?? false)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, tabsContext?.slots.tabIndicator?.()),
)
</script>

<template>
  <span
    v-if="isSelected"
    :class="indicatorClass"
    aria-hidden="true"
    data-slot="tabs-indicator"
  />
</template>
