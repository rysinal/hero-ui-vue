<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { SWITCH_CONTEXT_KEY } from './context'

interface SwitchContentProps {
  class?: string
}

const props = defineProps<SwitchContentProps>()
const context = inject(SWITCH_CONTEXT_KEY, null)
const elementClass = computed(() => composeTwClasses(props.class, context?.slots.value.content()))
</script>

<template>
  <div :class="elementClass" data-slot="switch-content">
    <slot v-bind="context?.state.value ?? {}" />
  </div>
</template>
