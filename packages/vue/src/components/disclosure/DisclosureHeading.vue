<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DISCLOSURE_CONTEXT_KEY } from './context'

interface DisclosureHeadingProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<DisclosureHeadingProps>(), {
  as: 'h3',
})

const disclosureContext = inject(DISCLOSURE_CONTEXT_KEY, null)
const headingClass = computed(() =>
  composeTwClasses(props.class, disclosureContext?.slots.value.heading()),
)
</script>

<template>
  <component :is="props.as" :class="headingClass" data-slot="disclosure-heading">
    <slot />
  </component>
</template>
