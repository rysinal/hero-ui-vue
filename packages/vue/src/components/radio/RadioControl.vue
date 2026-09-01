<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { RADIO_CONTEXT_KEY } from './context'

interface RadioControlProps {
  class?: string
}

const props = defineProps<RadioControlProps>()
const context = inject(RADIO_CONTEXT_KEY, null)
const controlClass = computed(() => composeTwClasses(props.class, context?.slots.value.control()))
</script>

<template>
  <span :class="controlClass" data-slot="radio-control">
    <slot />
  </span>
</template>
