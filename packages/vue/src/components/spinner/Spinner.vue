<script setup lang="ts">
import { computed } from 'vue'
import { spinnerVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface SpinnerProps {
  label?: string
  class?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'current' | 'accent' | 'success' | 'warning' | 'danger'
}

const props = defineProps<SpinnerProps>()

const spinnerClass = computed(() => {
  const styles = spinnerVariants({
    size: props.size,
    color: props.color,
  })

  return composeTwClasses(props.class, styles)
})
</script>

<template>
  <div :aria-label="props.label" :class="spinnerClass" data-slot="spinner" role="status">
    <div class="spinner-circle" />
    <div class="spinner-circle" />
    <span v-if="props.label" class="sr-only">{{ props.label }}</span>
  </div>
</template>
