<script setup lang="ts">
import { computed } from 'vue'
import { skeletonVariants } from '@rysinal/heroui-vue-styles'
import { useCSSVariable } from '../../composables'
import { composeTwClasses } from '../../utils'

type SkeletonAnimationType = 'shimmer' | 'pulse' | 'none'

interface SkeletonProps {
  as?: string
  class?: string
  animationType?: SkeletonAnimationType
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  as: 'div',
  animationType: undefined,
})

// The prop wins; otherwise follow the theme-level --skeleton-animation.
const resolvedAnimationType = useCSSVariable(
  '--skeleton-animation',
  () => props.animationType,
)

const skeletonClass = computed(() =>
  composeTwClasses(
    props.class,
    skeletonVariants({
      animationType: resolvedAnimationType.value as SkeletonAnimationType | undefined,
    }).base(),
  ),
)
</script>

<template>
  <component :is="props.as" :class="skeletonClass" data-slot="skeleton">
    <slot />
  </component>
</template>
