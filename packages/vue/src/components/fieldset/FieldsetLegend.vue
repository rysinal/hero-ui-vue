<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { FIELDSET_CONTEXT_KEY } from './context'

interface FieldsetLegendProps {
  class?: string
}

const props = defineProps<FieldsetLegendProps>()
const context = inject(FIELDSET_CONTEXT_KEY, null)

const legendClass = computed(() => composeTwClasses(props.class, context?.slots.legend()))
</script>

<template>
  <legend :class="legendClass" data-slot="fieldset-legend">
    <slot />
  </legend>
</template>
