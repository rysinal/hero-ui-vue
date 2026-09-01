<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABS_CONTEXT_KEY } from './context'
import { TAB_LIST_CONTAINER_KEY } from './tab-context'

interface TabListContainerProps {
  class?: string
}

const props = defineProps<TabListContainerProps>()
const tabsContext = inject(TABS_CONTEXT_KEY, null)

provide(TAB_LIST_CONTAINER_KEY, true)

const containerClass = computed(() =>
  composeTwClasses(props.class, tabsContext?.slots.tabListContainer()),
)
</script>

<template>
  <div :class="containerClass" data-slot="tabs-list-container">
    <slot />
  </div>
</template>
