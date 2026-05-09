<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_DIALOG_CONTEXT_KEY } from './context'

interface AlertDialogHeaderProps {
  class?: string
}

const props = defineProps<AlertDialogHeaderProps>()
const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const headerClass = computed(() => composeTwClasses(props.class, context?.slots.value.header()))
</script>

<template>
  <div :class="headerClass" data-slot="alert-dialog-header">
    <slot />
  </div>
</template>
