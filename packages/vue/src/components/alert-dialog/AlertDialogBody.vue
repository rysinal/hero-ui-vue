<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_DIALOG_CONTEXT_KEY } from './context'

interface AlertDialogBodyProps {
  class?: string
}

const props = defineProps<AlertDialogBodyProps>()
const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const bodyClass = computed(() => composeTwClasses(props.class, context?.slots.value.body()))
</script>

<template>
  <div :class="bodyClass" data-slot="alert-dialog-body">
    <slot />
  </div>
</template>
