<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DRAWER_CONTEXT_KEY } from './context'

interface DrawerFooterProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<DrawerFooterProps>(), {
  as: 'div',
})

const context = inject(DRAWER_CONTEXT_KEY, null)
const footerClass = computed(() => composeTwClasses(props.class, context?.slots.value.footer()))
</script>

<template>
  <component :is="as" :class="footerClass" data-slot="drawer-footer">
    <slot />
  </component>
</template>
