<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { SWITCH_CONTEXT_KEY } from './context'

interface SwitchIconProps {
  class?: string
}

const props = defineProps<SwitchIconProps>()
const context = inject(SWITCH_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.icon()))
</script>

<template>
  <span :class="elementClass" data-slot="switch-icon">
    <slot v-bind="context?.state.value ?? {}" />
  </span>
</template>
