<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_DIALOG_CONTEXT_KEY } from './context'

interface AlertDialogFooterProps {
  class?: string
}

const props = defineProps<AlertDialogFooterProps>()
const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const footerClass = computed(() => composeTwClasses(props.class, context?.slots.value.footer()))
</script>

<template>
  <div :class="footerClass" data-slot="alert-dialog-footer">
    <slot :close="context?.close" />
  </div>
</template>
