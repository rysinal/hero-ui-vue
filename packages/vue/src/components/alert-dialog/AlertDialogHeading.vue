<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { ALERT_DIALOG_CONTEXT_KEY } from './context'

interface AlertDialogHeadingProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<AlertDialogHeadingProps>(), {
  as: 'h2',
})

const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const headingClass = computed(() => composeTwClasses(props.class, context?.slots.value.heading()))
</script>

<template>
  <component :is="as" :class="headingClass" data-slot="alert-dialog-heading">
    <slot />
  </component>
</template>
