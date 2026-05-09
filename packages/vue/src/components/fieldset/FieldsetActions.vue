<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { FIELDSET_CONTEXT_KEY } from './context'

interface FieldsetActionsProps {
  class?: string
}

const props = defineProps<FieldsetActionsProps>()
const context = inject(FIELDSET_CONTEXT_KEY, null)

const actionsClass = computed(() => composeTwClasses(props.class, context?.slots.actions()))
</script>

<template>
  <div :class="actionsClass" data-slot="fieldset-actions">
    <slot />
  </div>
</template>
