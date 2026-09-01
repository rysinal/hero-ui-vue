<script setup lang="ts">
import { computed, inject, onBeforeMount } from 'vue'
import { composeTwClasses } from '../../utils'
import { CHECKBOX_CONTEXT_KEY } from './context'

interface CheckboxControlProps {
  class?: string
}

const props = defineProps<CheckboxControlProps>()
const context = inject(CHECKBOX_CONTEXT_KEY, null)

// Tell the root to drop its default control markup.
onBeforeMount(() => context?.registerControl())

const controlClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.control()),
)
</script>

<template>
  <span :class="controlClass" data-slot="checkbox-control">
    <slot />
  </span>
</template>
