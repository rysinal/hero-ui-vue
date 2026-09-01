<script setup lang="ts">
import { computed, inject, onBeforeUnmount, watch } from 'vue'
import { PopoverArrow } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { POPOVER_CONTENT_CONTEXT_KEY } from './context'

interface PopoverArrowProps {
  class?: string
  height?: number
  width?: number
}

const props = withDefaults(defineProps<PopoverArrowProps>(), {
  height: 12,
  width: 12,
})

const contentContext = inject(POPOVER_CONTENT_CONTEXT_KEY, null)
const arrowClass = computed(() => composeTwClasses(props.class, undefined))

watch(
  () => ({ height: props.height, width: props.width }),
  size => contentContext?.setArrowSize(size),
  { immediate: true },
)

onBeforeUnmount(() => {
  contentContext?.setArrowSize(null)
})
</script>

<template>
  <PopoverArrow
    :height="height"
    :width="width"
    as-child
  >
    <span :class="arrowClass" data-slot="popover-overlay-arrow-group">
      <slot>
        <svg
          :height="height"
          :style="{ rotate: '0deg' }"
          :width="width"
          data-slot="popover-overlay-arrow"
          fill="none"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0C5.48483 8 6.5 8 12 0Z" />
        </svg>
      </slot>
    </span>
  </PopoverArrow>
</template>
