<script setup lang="ts">
import { computed, inject } from 'vue'
import { separatorVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses } from '../../utils'
import { SEPARATOR_CONTEXT_KEY, type SeparatorOrientation } from './context'

interface SeparatorProps {
  class?: string
  orientation?: SeparatorOrientation
  variant?: 'default' | 'secondary' | 'tertiary'
}

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: undefined,
})

const context = inject(SEPARATOR_CONTEXT_KEY, null)

// An explicit prop always wins; otherwise follow an ancestor such as Toolbar,
// which imposes the axis crossing its own.
const finalOrientation = computed<SeparatorOrientation>(
  () => props.orientation ?? context?.orientation.value ?? 'horizontal',
)

const separatorClass = computed(() => {
  const styles = separatorVariants({
    orientation: finalOrientation.value,
    variant: props.variant,
  })

  return composeTwClasses(props.class, styles)
})
</script>

<template>
  <div
    :aria-orientation="finalOrientation"
    :class="separatorClass"
    :data-orientation="finalOrientation"
    data-slot="separator"
    role="separator"
  >
    <slot />
  </div>
</template>
