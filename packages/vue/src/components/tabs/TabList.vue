<script setup lang="ts">
import { computed, inject } from 'vue'
import { TabsList } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { TABS_CONTEXT_KEY } from './context'

interface TabListProps {
  class?: string
}

const props = defineProps<TabListProps>()
const tabsContext = inject(TABS_CONTEXT_KEY, null)
const listClass = computed(() => composeTwClasses(props.class, tabsContext?.slots.tabList()))
</script>

<template>
  <div :class="tabsContext?.slots.tabListContainer()" data-slot="tabs-list-container">
    <TabsList :class="listClass" data-slot="tabs-list">
      <slot />
    </TabsList>
  </div>
</template>
