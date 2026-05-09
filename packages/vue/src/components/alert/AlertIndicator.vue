<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons'
import { ALERT_CONTEXT_KEY } from './context'

interface AlertIndicatorProps {
  class?: string
}

const props = defineProps<AlertIndicatorProps>()
const alertContext = inject(ALERT_CONTEXT_KEY, null)
const indicatorClass = computed(() =>
  composeTwClasses(props.class, alertContext?.slots.indicator()),
)

const defaultIcon = computed(() => {
  switch (alertContext?.status) {
    case 'danger':
      return DangerIcon
    case 'success':
      return SuccessIcon
    case 'warning':
      return WarningIcon
    case 'accent':
    case 'default':
    default:
      return InfoIcon
  }
})
</script>

<template>
  <div :class="indicatorClass" data-slot="alert-indicator">
    <slot>
      <component :is="defaultIcon" data-slot="alert-default-icon" />
    </slot>
  </div>
</template>
