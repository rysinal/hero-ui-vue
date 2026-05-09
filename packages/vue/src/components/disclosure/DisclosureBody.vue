<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DISCLOSURE_CONTEXT_KEY } from './context'

interface DisclosureBodyProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<DisclosureBodyProps>(), {
  as: 'div',
})

const disclosureContext = inject(DISCLOSURE_CONTEXT_KEY, null)
const bodyClass = computed(() => composeTwClasses(props.class, disclosureContext?.slots.value.body()))
</script>

<template>
  <component :is="props.as" :class="bodyClass" data-slot="disclosure-body">
    <slot />
  </component>
</template>
