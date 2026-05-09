<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CloseButton } from '../close-button'
import { ALERT_DIALOG_CONTEXT_KEY } from './context'

interface AlertDialogCloseTriggerProps {
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<AlertDialogCloseTriggerProps>(), {
  ariaLabel: 'Close',
})

const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const closeClass = computed(() => composeTwClasses(props.class, context?.slots.value.closeTrigger()))
</script>

<template>
  <CloseButton
    :aria-label="ariaLabel"
    :class="closeClass"
    data-slot="alert-dialog-close-trigger"
    @click="context?.close"
  />
</template>
