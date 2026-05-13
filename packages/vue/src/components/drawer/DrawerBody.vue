<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DRAWER_CONTEXT_KEY } from './context'

interface DrawerBodyProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<DrawerBodyProps>(), {
  as: 'div',
})

const context = inject(DRAWER_CONTEXT_KEY, null)
const bodyClass = computed(() => composeTwClasses(props.class, context?.slots.value.body()))
</script>

<template>
  <component :is="as" :class="bodyClass" data-slot="drawer-body" style="touch-action: pan-y">
    <slot />
  </component>
</template>
