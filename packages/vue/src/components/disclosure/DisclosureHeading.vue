<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DISCLOSURE_CONTEXT_KEY } from './context'

interface DisclosureHeadingProps {
  as?: string
  class?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const props = withDefaults(defineProps<DisclosureHeadingProps>(), {
  level: 3,
})

const disclosureContext = inject(DISCLOSURE_CONTEXT_KEY, null)
const headingClass = computed(() =>
  composeTwClasses(props.class, disclosureContext?.slots.value.heading()),
)
const headingElement = computed(() => props.as ?? `h${props.level}`)
</script>

<template>
  <component :is="headingElement" :class="headingClass" data-slot="disclosure-heading">
    <slot />
  </component>
</template>
