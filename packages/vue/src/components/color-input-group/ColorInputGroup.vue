<script setup lang="ts">
import { computed, provide } from 'vue'
import { colorInputGroupVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses } from '../../utils'
import { COLOR_INPUT_GROUP_KEY } from './context'

interface ColorInputGroupProps {
  class?: string
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<ColorInputGroupProps>(), {
  fullWidth: false,
  variant: 'primary',
})

const slots = computed(() =>
  colorInputGroupVariants({ fullWidth: props.fullWidth, variant: props.variant }),
)

provide(COLOR_INPUT_GROUP_KEY, { slots })

const groupClass = computed(() => composeTwClasses(props.class, slots.value.base()))
</script>

<template>
  <div :class="groupClass" data-slot="color-input-group">
    <slot />
  </div>
</template>
