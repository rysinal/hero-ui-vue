<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ACCORDION_CONTEXT_KEY } from './context'

interface AccordionHeadingProps {
  as?: string
  class?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const props = withDefaults(defineProps<AccordionHeadingProps>(), {
  level: 3,
})

const accordionContext = inject(ACCORDION_CONTEXT_KEY, null)
const headingClass = computed(() =>
  composeTwClasses(props.class, accordionContext?.slots.heading()),
)
const headingElement = computed(() => props.as ?? `h${props.level}`)
</script>

<template>
  <component :is="headingElement" :class="headingClass" data-slot="accordion-heading">
    <slot />
  </component>
</template>
