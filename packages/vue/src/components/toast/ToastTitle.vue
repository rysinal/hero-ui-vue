<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TOAST_ITEM_KEY } from './context'

interface ToastTitleProps {
  class?: string
}

const props = defineProps<ToastTitleProps>()
const item = inject(TOAST_ITEM_KEY, null)
const titleClass = computed(() => composeTwClasses(props.class, item?.slots.value.title?.()))
</script>

<template>
  <div :class="titleClass" data-slot="toast-title">
    <slot>{{ item?.toast.value.title }}</slot>
  </div>
</template>
