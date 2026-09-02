<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { DATE_INPUT_GROUP_KEY } from './context'

interface DateInputGroupInputContainerProps {
  class?: string
}

const props = defineProps<DateInputGroupInputContainerProps>()
const context = inject(DATE_INPUT_GROUP_KEY, null)

const containerClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.inputContainer()),
)
</script>

<template>
  <div :class="containerClass" data-slot="date-input-group-input-container">
    <slot />
  </div>
</template>
