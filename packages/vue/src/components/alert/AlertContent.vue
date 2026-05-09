<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_CONTEXT_KEY } from './context'

interface AlertContentProps {
  class?: string
}

const props = defineProps<AlertContentProps>()
const alertContext = inject(ALERT_CONTEXT_KEY, null)
const contentClass = computed(() => composeTwClasses(props.class, alertContext?.slots.content()))
</script>

<template>
  <div :class="contentClass" data-slot="alert-content">
    <slot />
  </div>
</template>
