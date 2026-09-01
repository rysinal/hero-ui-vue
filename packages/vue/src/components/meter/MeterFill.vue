<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { METER_CONTEXT_KEY } from './context'

interface MeterFillProps {
  class?: string
}

const props = defineProps<MeterFillProps>()
const context = inject(METER_CONTEXT_KEY, null)
const fillClass = computed(() => composeTwClasses(props.class, context?.slots.value.fill()))
const fillStyle = computed(() =>
  context?.percentage.value === undefined ? undefined : { width: `${context.percentage.value}%` },
)
</script>

<template>
  <div :class="fillClass" :style="fillStyle" data-slot="meter-fill">
    <slot />
  </div>
</template>
