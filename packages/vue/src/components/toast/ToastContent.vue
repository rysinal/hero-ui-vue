<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TOAST_ITEM_KEY } from './context'

interface ToastContentProps {
  class?: string
}

const props = defineProps<ToastContentProps>()
const item = inject(TOAST_ITEM_KEY, null)
const contentClass = computed(() =>
  composeTwClasses(props.class, item?.slots.value.content?.()),
)
</script>

<template>
  <div :class="contentClass" data-slot="toast-content">
    <slot />
  </div>
</template>
