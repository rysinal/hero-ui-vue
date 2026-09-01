<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { RADIO_CONTEXT_KEY } from './context'

interface RadioContentProps {
  class?: string
}

const props = defineProps<RadioContentProps>()
const context = inject(RADIO_CONTEXT_KEY, null)
const contentClass = computed(() => composeTwClasses(props.class, context?.slots.value.content()))
</script>

<template>
  <div :class="contentClass" data-slot="radio-content">
    <slot v-bind="context?.state.value ?? {}" />
  </div>
</template>
