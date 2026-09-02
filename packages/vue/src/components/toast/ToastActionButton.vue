<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TOAST_ITEM_KEY } from './context'

interface ToastActionButtonProps {
  class?: string
}

const props = defineProps<ToastActionButtonProps>()
const item = inject(TOAST_ITEM_KEY, null)

const actionClass = computed(() => composeTwClasses(props.class, item?.slots.value.action?.()))
const action = computed(() => item?.toast.value.action)

const handleClick = () => {
  action.value?.onPress?.()
  item?.close()
}
</script>

<template>
  <button
    v-if="$slots.default || action"
    :class="actionClass"
    data-slot="toast-action-button"
    type="button"
    @click="handleClick"
  >
    <slot>{{ action?.label }}</slot>
  </button>
</template>
