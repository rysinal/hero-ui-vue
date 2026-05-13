<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DRAWER_CONTEXT_KEY } from './context'

interface DrawerHeadingProps {
  as?: string
  class?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const props = withDefaults(defineProps<DrawerHeadingProps>(), {
  level: 2,
})

const context = inject(DRAWER_CONTEXT_KEY, null)
const headingClass = computed(() => composeTwClasses(props.class, context?.slots.value.heading()))
const headingElement = computed(() => props.as ?? `h${props.level}`)
</script>

<template>
  <component :is="headingElement" :class="headingClass" data-slot="drawer-heading">
    <slot />
  </component>
</template>
