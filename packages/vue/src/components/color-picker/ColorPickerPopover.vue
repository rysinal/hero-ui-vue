<script setup lang="ts">
/* global HTMLElement */
import { computed, inject } from 'vue'
import { PopoverContent, PopoverPortal } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { COLOR_PICKER_CONTEXT_KEY } from './context'

defineOptions({ inheritAttrs: false })

interface ColorPickerPopoverProps {
  class?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
  portalContainer?: HTMLElement | string | null
}

const props = withDefaults(defineProps<ColorPickerPopoverProps>(), {
  offset: 8,
  placement: 'bottom',
  portalContainer: null,
})

const context = inject(COLOR_PICKER_CONTEXT_KEY, null)

const popoverClass = computed(() => composeTwClasses(props.class, context?.slots.value.popover()))
const portalTarget = computed(() => props.portalContainer ?? 'body')
const popoverStyle = computed(() => ({
  '--trigger-anchor-point': 'var(--radix-popover-content-transform-origin)',
}))
</script>

<template>
  <PopoverPortal :to="portalTarget">
    <PopoverContent
      v-bind="$attrs"
      :class="popoverClass"
      :side="props.placement"
      :side-offset="props.offset"
      :style="popoverStyle"
      align="start"
      data-slot="color-picker-popover"
    >
      <slot :value="context?.value.value" />
    </PopoverContent>
  </PopoverPortal>
</template>
