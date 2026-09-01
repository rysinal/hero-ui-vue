<script setup lang="ts">
import { computed, inject } from 'vue'
import { TabsList } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { TABS_CONTEXT_KEY } from './context'
import { TAB_LIST_CONTAINER_KEY } from './tab-context'

interface TabListProps {
  class?: string
}

const props = defineProps<TabListProps>()
const tabsContext = inject(TABS_CONTEXT_KEY, null)

// React requires an explicit Tabs.ListContainer. Keep working without one by
// wrapping ourselves, so `<Tabs><Tabs.List>` stays valid.
const hasContainer = inject(TAB_LIST_CONTAINER_KEY, false)

const listClass = computed(() => composeTwClasses(props.class, tabsContext?.slots.tabList()))
</script>

<template>
  <TabsList v-if="hasContainer" :class="listClass" data-slot="tabs-list">
    <slot />
  </TabsList>
  <div v-else :class="tabsContext?.slots.tabListContainer()" data-slot="tabs-list-container">
    <TabsList :class="listClass" data-slot="tabs-list">
      <slot />
    </TabsList>
  </div>
</template>
