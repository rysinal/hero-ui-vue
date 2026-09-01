<script setup lang="ts">
import { computed } from 'vue'
import { colorSwatchVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, toColor, type Color } from '../../utils'

interface ColorSwatchProps {
  class?: string
  /** The colour to show, as a CSS string or a Color. */
  color: string | Color
  shape?: 'circle' | 'square'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<ColorSwatchProps>(), {
  shape: 'circle',
  size: 'md',
})

const resolved = computed(() => toColor(props.color))
const swatchClass = computed(() =>
  composeTwClasses(props.class, colorSwatchVariants({ shape: props.shape, size: props.size })),
)

// color-swatch.css paints from this variable.
const swatchStyle = computed(() => ({
  '--color-swatch-current': resolved.value.toString('css'),
}))
</script>

<template>
  <div
    :aria-label="resolved.toString('css')"
    :class="swatchClass"
    :style="swatchStyle"
    data-slot="color-swatch"
    role="img"
  >
    <slot />
  </div>
</template>
