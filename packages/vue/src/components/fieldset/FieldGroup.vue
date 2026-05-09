<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { FIELDSET_CONTEXT_KEY } from './context'

interface FieldGroupProps {
  class?: string
}

const props = defineProps<FieldGroupProps>()
const context = inject(FIELDSET_CONTEXT_KEY, null)

const fieldGroupClass = computed(() => composeTwClasses(props.class, context?.slots.fieldGroup()))
</script>

<template>
  <div :class="fieldGroupClass" data-slot="fieldset-field-group">
    <slot />
  </div>
</template>
