<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { CHECKBOX_CONTEXT_KEY } from './context'

interface CheckboxContentProps {
  class?: string
}

const props = defineProps<CheckboxContentProps>()
const context = inject(CHECKBOX_CONTEXT_KEY, null)

const contentClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.content()),
)
</script>

<template>
  <div :class="contentClass" data-slot="checkbox-content">
    <slot v-bind="context?.state.value ?? {}" />
  </div>
</template>
