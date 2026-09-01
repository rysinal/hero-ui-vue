<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TOAST_ITEM_KEY } from './context'

interface ToastCloseButtonProps {
  class?: string
}

const props = defineProps<ToastCloseButtonProps>()
const item = inject(TOAST_ITEM_KEY, null)

const closeClass = computed(() => composeTwClasses(props.class, item?.slots.value.close?.()))
</script>

<template>
  <button
    :class="closeClass"
    aria-label="Close notification"
    data-slot="toast-close-button"
    type="button"
    @click="item?.close()"
  >
    <slot>
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
      </svg>
    </slot>
  </button>
</template>
