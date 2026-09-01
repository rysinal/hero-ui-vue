<script setup lang="ts">
/* global HTMLElement */
import { computed, inject } from 'vue'
import { TooltipContent as RadixTooltipContent, TooltipPortal } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { TOOLTIP_CONTEXT_KEY, type TooltipPlacement } from './context'

defineOptions({ inheritAttrs: false })

interface TooltipContentProps {
  class?: string
  placement?: TooltipPlacement
  align?: 'start' | 'center' | 'end'
  /** Distance from the trigger. Defaults to 7 with an arrow, 3 without. */
  offset?: number
  /** Reserves room for a TooltipArrow. */
  showArrow?: boolean
  portalContainer?: HTMLElement | string | null
}

const props = withDefaults(defineProps<TooltipContentProps>(), {
  align: 'center',
  offset: undefined,
  placement: 'top',
  portalContainer: null,
  showArrow: false,
})

const context = inject(TOOLTIP_CONTEXT_KEY, null)

const contentClass = computed(() => composeTwClasses(props.class, context?.slots.value.base()))
const portalTarget = computed(() => props.portalContainer ?? 'body')
// React picks 7 when an arrow is shown so the arrow has room, otherwise 3.
const sideOffset = computed(() => props.offset ?? (props.showArrow ? 7 : 3))
const contentStyle = computed(() => ({
  '--trigger-anchor-point': 'var(--radix-tooltip-content-transform-origin)',
}))
</script>

<template>
  <TooltipPortal :to="portalTarget">
    <RadixTooltipContent
      v-bind="$attrs"
      :align="props.align"
      :class="contentClass"
      :data-entering="dataAttr(true)"
      :data-placement="props.placement"
      :side="props.placement"
      :side-offset="sideOffset"
      :style="contentStyle"
      data-slot="tooltip"
    >
      <slot />
    </RadixTooltipContent>
  </TooltipPortal>
</template>
