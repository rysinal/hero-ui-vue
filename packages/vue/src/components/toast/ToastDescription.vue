<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TOAST_ITEM_KEY } from './context'

interface ToastDescriptionProps {
  class?: string
}

const props = defineProps<ToastDescriptionProps>()
const item = inject(TOAST_ITEM_KEY, null)
const descriptionClass = computed(() =>
  composeTwClasses(props.class, item?.slots.value.description?.()),
)
const description = computed(() => item?.toast.value.description)
</script>

<template>
  <div v-if="$slots.default || description" :class="descriptionClass" data-slot="toast-description">
    <slot>{{ description }}</slot>
  </div>
</template>
