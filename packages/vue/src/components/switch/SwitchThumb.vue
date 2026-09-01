<script setup lang="ts">
import { computed, inject } from 'vue'
import { SwitchThumb as RadixSwitchThumb } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { SWITCH_CONTEXT_KEY } from './context'

interface SwitchThumbProps {
  class?: string
}

const props = defineProps<SwitchThumbProps>()
const context = inject(SWITCH_CONTEXT_KEY, null)
const thumbClass = computed(() => composeTwClasses(props.class, context?.slots.value.thumb()))
</script>

<template>
  <RadixSwitchThumb :class="thumbClass" data-slot="switch-thumb">
    <slot v-bind="context?.state.value ?? {}" />
  </RadixSwitchThumb>
</template>
