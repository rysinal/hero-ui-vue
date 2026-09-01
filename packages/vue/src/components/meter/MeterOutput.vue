<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { METER_CONTEXT_KEY } from './context'

interface MeterOutputProps {
  class?: string
}

const props = defineProps<MeterOutputProps>()
const context = inject(METER_CONTEXT_KEY, null)
const outputClass = computed(() => composeTwClasses(props.class, context?.slots.value.output()))
</script>

<template>
  <span :class="outputClass" data-slot="meter-output">
    <slot>{{ context?.valueText.value }}</slot>
  </span>
</template>
