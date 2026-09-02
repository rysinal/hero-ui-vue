<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons'
import { Spinner } from '../spinner'
import { TOAST_ITEM_KEY } from './context'

interface ToastIndicatorProps {
  class?: string
}

const props = defineProps<ToastIndicatorProps>()
const item = inject(TOAST_ITEM_KEY, null)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, item?.slots.value.indicator?.()),
)
const variant = computed(() => item?.toast.value.variant ?? 'default')
const isLoading = computed(() => item?.toast.value.isLoading === true)

// Same glyph set React uses per status.
const defaultIcon = computed(() => {
  switch (variant.value) {
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
  <span :class="indicatorClass" aria-hidden="true" data-slot="toast-indicator">
    <slot>
      <!--
        Only the fallback carries `toast-default-icon`: the stylesheet sizes it
        with `.toast__indicator [data-slot="toast-default-icon"]`, so custom
        children supplied by the caller stay untouched, exactly as in React.
      -->
      <Spinner v-if="isLoading" color="current" size="sm" />
      <component :is="defaultIcon" v-else data-slot="toast-default-icon" />
    </slot>
  </span>
</template>
