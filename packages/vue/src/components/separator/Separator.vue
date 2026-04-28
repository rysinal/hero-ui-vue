<script setup lang="ts">
import { computed } from 'vue'
import { separatorVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface SeparatorProps {
  class?: string
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
})

const separatorClass = computed(() => {
  const styles = separatorVariants({
    orientation: props.orientation,
  })

  return composeTwClasses(props.class, styles)
})
</script>

<template>
  <div
    :aria-orientation="props.orientation"
    :class="separatorClass"
    data-slot="separator"
    role="separator"
  >
    <slot />
  </div>
</template>
