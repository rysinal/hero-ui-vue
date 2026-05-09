<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { TOGGLE_BUTTON_GROUP_CONTEXT_KEY } from './context'

interface ToggleButtonGroupSeparatorProps {
  class?: string
}

const props = defineProps<ToggleButtonGroupSeparatorProps>()
const context = inject(TOGGLE_BUTTON_GROUP_CONTEXT_KEY, null)

const separatorClass = computed(() => composeTwClasses(props.class, context?.slots.separator()))
</script>

<template>
  <span
    aria-hidden="true"
    :class="separatorClass"
    data-slot="toggle-button-group-separator"
  />
</template>
