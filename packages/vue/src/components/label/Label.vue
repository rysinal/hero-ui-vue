<script setup lang="ts">
import { computed } from 'vue'
import { labelVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface LabelProps {
  for?: string
  class?: string
  isRequired?: boolean
}

const props = defineProps<LabelProps>()

const labelClass = computed(() => {
  const styles = labelVariants({
    isRequired: props.isRequired,
  })

  return composeTwClasses(props.class, styles)
})
</script>

<template>
  <label :class="labelClass" :for="props.for" data-slot="label">
    <slot />
  </label>
</template>
