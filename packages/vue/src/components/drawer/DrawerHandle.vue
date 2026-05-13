<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DRAWER_CONTEXT_KEY } from './context'

interface DrawerHandleProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<DrawerHandleProps>(), {
  as: 'div',
})

const context = inject(DRAWER_CONTEXT_KEY, null)
const handleClass = computed(() => composeTwClasses(props.class, context?.slots.value.handle()))
</script>

<template>
  <component :is="as" aria-hidden="true" :class="handleClass" data-slot="drawer-handle">
    <div data-slot="drawer-handle-bar" />
  </component>
</template>
