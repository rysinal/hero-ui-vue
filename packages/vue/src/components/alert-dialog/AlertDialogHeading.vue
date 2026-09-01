<script setup lang="ts">
import { computed, inject, onBeforeUnmount, useId } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_DIALOG_CONTEXT_KEY } from './context'

interface AlertDialogHeadingProps {
  as?: string
  class?: string
  id?: string
}

const props = withDefaults(defineProps<AlertDialogHeadingProps>(), {
  as: 'h2',
})

const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const headingClass = computed(() => composeTwClasses(props.class, context?.slots.value.heading()))

// Register the id so the dialog can point aria-labelledby at this heading.
const generatedId = `heroui-alert-dialog-heading-${useId()}`
const headingId = computed(() => props.id ?? generatedId)

context?.registerHeadingId(headingId.value)

onBeforeUnmount(() => {
  context?.unregisterHeadingId(headingId.value)
})
</script>

<template>
  <component
    :is="as"
    :id="headingId"
    :class="headingClass"
    data-slot="alert-dialog-heading"
  >
    <slot />
  </component>
</template>
