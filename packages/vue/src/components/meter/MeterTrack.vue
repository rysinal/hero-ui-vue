<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { METER_CONTEXT_KEY } from './context'

interface MeterTrackProps {
  class?: string
}

const props = defineProps<MeterTrackProps>()
const context = inject(METER_CONTEXT_KEY, null)
const trackClass = computed(() => composeTwClasses(props.class, context?.slots.value.track()))
</script>

<template>
  <div :class="trackClass" data-slot="meter-track">
    <slot />
  </div>
</template>
