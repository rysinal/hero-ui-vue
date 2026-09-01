<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { SWITCH_CONTEXT_KEY } from './context'

interface SwitchControlProps {
  class?: string
}

const props = defineProps<SwitchControlProps>()
const context = inject(SWITCH_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.control()))
</script>

<template>
  <span :class="elementClass" data-slot="switch-control">
    <slot v-bind="context?.state.value ?? {}" />
  </span>
</template>
