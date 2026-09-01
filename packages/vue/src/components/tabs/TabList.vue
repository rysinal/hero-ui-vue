<script setup lang="ts">
import { computed, inject } from 'vue'
import { TabsList } from 'radix-vue'
import TabIndicator from './TabIndicator.vue'
import { composeTwClasses } from '../../utils'
import { TABS_CONTEXT_KEY } from './context'

interface TabListProps {
  class?: string
  /** Renders the sliding selection indicator. @default true */
  showIndicator?: boolean
}

const props = withDefaults(defineProps<TabListProps>(), { showIndicator: true })
const tabsContext = inject(TABS_CONTEXT_KEY, null)
const listClass = computed(() => composeTwClasses(props.class, tabsContext?.slots.tabList()))
</script>

<template>
  <div :class="tabsContext?.slots.tabListContainer()" data-slot="tabs-list-container">
    <TabsList :class="listClass" data-slot="tabs-list">
      <slot />
    </TabsList>
    <!-- The selection indicator lives beside the list so tabs.css can position
         it against .tabs__list-container. -->
    <TabIndicator v-if="props.showIndicator" />
  </div>
</template>
