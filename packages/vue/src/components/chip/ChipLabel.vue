<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CHIP_CONTEXT_KEY } from './context'

interface ChipLabelProps {
  class?: string
}

const props = defineProps<ChipLabelProps>()
const chipContext = inject(CHIP_CONTEXT_KEY, null)
const labelClass = computed(() => composeTwClasses(props.class, chipContext?.slots.label()))
</script>

<template>
  <span :class="labelClass" data-slot="chip-label">
    <slot />
  </span>
</template>
