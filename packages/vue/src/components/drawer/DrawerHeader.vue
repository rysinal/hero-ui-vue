<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DRAWER_CONTEXT_KEY } from './context'

interface DrawerHeaderProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<DrawerHeaderProps>(), {
  as: 'div',
})

const context = inject(DRAWER_CONTEXT_KEY, null)
const headerClass = computed(() => composeTwClasses(props.class, context?.slots.value.header()))
</script>

<template>
  <component :is="as" :class="headerClass" data-slot="drawer-header">
    <slot />
  </component>
</template>
