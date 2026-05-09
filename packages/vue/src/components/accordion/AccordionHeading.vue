<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ACCORDION_CONTEXT_KEY } from './context'

interface AccordionHeadingProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<AccordionHeadingProps>(), {
  as: 'h3',
})

const accordionContext = inject(ACCORDION_CONTEXT_KEY, null)
const headingClass = computed(() => composeTwClasses(props.class, accordionContext?.slots.heading()))
</script>

<template>
  <component :is="as" :class="headingClass" data-slot="accordion-heading">
    <slot />
  </component>
</template>
