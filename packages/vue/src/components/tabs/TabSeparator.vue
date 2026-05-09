<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABS_CONTEXT_KEY } from './context'

interface TabSeparatorProps {
  class?: string
}

const props = defineProps<TabSeparatorProps>()
const tabsContext = inject(TABS_CONTEXT_KEY, null)
const separatorClass = computed(() =>
  composeTwClasses(props.class, tabsContext?.slots.separator()),
)
</script>

<template>
  <span :class="separatorClass" data-slot="tabs-separator" />
</template>
