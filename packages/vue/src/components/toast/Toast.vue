<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { composeTwClasses } from '../../utils'
import { TOAST_ITEM_KEY, TOAST_PROVIDER_KEY } from './context'
import type { QueuedToast } from './queue'

interface ToastProps {
  class?: string
  toast: QueuedToast
}

const props = defineProps<ToastProps>()
const provider = inject(TOAST_PROVIDER_KEY, null)

const slots = computed(
  () => provider?.slots.value ?? ({} as NonNullable<typeof provider>['slots']['value']),
)
const toastClass = computed(() => composeTwClasses(props.class, slots.value.toast?.()))

const close = () => provider?.queue.close(props.toast.key)

provide(TOAST_ITEM_KEY, {
  close,
  slots,
  toast: computed(() => props.toast),
})
</script>

<template>
  <div
    :class="toastClass"
    :data-variant="props.toast.variant"
    data-slot="toast"
    role="alertdialog"
  >
    <slot :close="close" :toast="props.toast" />
  </div>
</template>
