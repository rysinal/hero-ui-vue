<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, useAttrs } from 'vue'
import { PopoverContent, PopoverPortal } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY } from './context'

defineOptions({
  inheritAttrs: false,
})

type SelectPlacement = 'top' | 'bottom' | 'left' | 'right'
type SelectAlign = 'start' | 'center' | 'end'

interface SelectPopoverProps {
  align?: SelectAlign
  alignOffset?: number
  avoidCollisions?: boolean
  class?: string
  collisionPadding?: number
  forceMount?: boolean
  offset?: number
  placement?: SelectPlacement
  portalContainer?: HTMLElement | string | null
  sideOffset?: number
}

const props = withDefaults(defineProps<SelectPopoverProps>(), {
  align: 'center',
  alignOffset: 0,
  avoidCollisions: true,
  collisionPadding: 0,
  forceMount: undefined,
  offset: undefined,
  placement: 'bottom',
  portalContainer: null,
  sideOffset: undefined,
})

const context = inject(SELECT_CONTEXT_KEY, null)
const attrs = useAttrs()
const portalTarget = computed(() => props.portalContainer ?? 'body')
const finalSideOffset = computed(() => props.sideOffset ?? props.offset ?? 8)
const popoverClass = computed(() => composeTwClasses(props.class, context?.slots.value.popover()))
const popoverStyle = computed(() => ({
  '--trigger-anchor-point': 'var(--radix-popover-content-transform-origin)',
  '--trigger-width': 'var(--radix-popover-trigger-width)',
}))
</script>

<template>
  <PopoverPortal :to="portalTarget">
    <PopoverContent
      v-bind="attrs"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :class="popoverClass"
      :collision-padding="collisionPadding"
      :data-entering="dataAttr(context?.isOpen.value)"
      :data-placement="placement"
      :force-mount="forceMount"
      :side="placement"
      :side-offset="finalSideOffset"
      :style="popoverStyle"
      data-slot="select-popover"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
