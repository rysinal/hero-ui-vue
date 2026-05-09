<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_DIALOG_CONTEXT_KEY } from './context'

interface AlertDialogDialogProps {
  class?: string
}

const props = defineProps<AlertDialogDialogProps>()
const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const dialogClass = computed(() => composeTwClasses(props.class, context?.slots.value.dialog()))
</script>

<template>
  <section
    :class="dialogClass"
    :data-placement="context?.placement.value"
    aria-modal="true"
    data-slot="alert-dialog-dialog"
    role="alertdialog"
    tabindex="-1"
  >
    <slot :close="context?.close" />
  </section>
</template>
