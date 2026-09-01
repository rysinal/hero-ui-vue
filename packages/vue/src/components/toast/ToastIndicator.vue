<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
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
const path = computed(() => {
  if (isLoading.value) return null
  if (variant.value === 'success') return 'M20 6 9 17l-5-5'
  if (variant.value === 'warning') return 'M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z'
  if (variant.value === 'danger') return 'M18 6 6 18M6 6l12 12'
  return 'M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
})
</script>

<template>
  <span :class="indicatorClass" aria-hidden="true" data-slot="toast-indicator">
    <slot>
      <svg
        v-if="isLoading"
        class="animate-spin"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <svg v-else fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
        <path :d="path ?? undefined" />
      </svg>
    </slot>
  </span>
</template>
