<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, provide, shallowRef, useAttrs } from 'vue'
import { PopoverContent, PopoverPortal } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import {
  POPOVER_CONTENT_CONTEXT_KEY,
  POPOVER_CONTEXT_KEY,
  type PopoverAlign,
  type PopoverPlacement,
} from './context'

defineOptions({
  inheritAttrs: false,
})

export interface PopoverContentProps {
  align?: PopoverAlign
  alignOffset?: number
  arrowPadding?: number
  avoidCollisions?: boolean
  class?: string
  collisionPadding?: number
  forceMount?: boolean
  offset?: number
  placement?: PopoverPlacement
  portalContainer?: HTMLElement | string | null
  shouldFlip?: boolean
  sideOffset?: number
  unstablePortalContainer?: HTMLElement | null
}

const props = withDefaults(defineProps<PopoverContentProps>(), {
  align: 'center',
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: undefined,
  collisionPadding: 0,
  forceMount: undefined,
  offset: undefined,
  placement: 'bottom',
  portalContainer: null,
  shouldFlip: true,
  sideOffset: undefined,
  unstablePortalContainer: null,
})

const context = inject(POPOVER_CONTEXT_KEY, null)
const attrs = useAttrs()
const arrowHeight = shallowRef(0)
const arrowWidth = shallowRef(0)
const contentClass = computed(() => composeTwClasses(props.class, context?.slots.value.base()))
const portalTarget = computed(() => props.unstablePortalContainer ?? props.portalContainer ?? 'body')
const requestedSideOffset = computed(() => props.sideOffset ?? props.offset ?? 8)
const arrowMainAxisSize = computed(() =>
  props.placement === 'left' || props.placement === 'right' ? arrowWidth.value : arrowHeight.value,
)
const finalSideOffset = computed(() => requestedSideOffset.value - arrowMainAxisSize.value)
const finalAvoidCollisions = computed(() => props.avoidCollisions ?? props.shouldFlip)

provide(POPOVER_CONTENT_CONTEXT_KEY, {
  arrowHeight,
  arrowWidth,
  setArrowSize(size) {
    arrowHeight.value = size?.height ?? 0
    arrowWidth.value = size?.width ?? 0
  },
})
</script>

<template>
  <PopoverPortal :to="portalTarget">
    <PopoverContent
      v-bind="attrs"
      :align="align"
      :align-offset="alignOffset"
      :arrow-padding="arrowPadding"
      :avoid-collisions="finalAvoidCollisions"
      :class="contentClass"
      :collision-padding="collisionPadding"
      :data-entering="dataAttr(context?.isOpen.value)"
      :data-placement="placement"
      :force-mount="forceMount"
      :side="placement"
      :side-offset="finalSideOffset"
      data-slot="popover-content"
    >
      <slot :close="context?.close" />
    </PopoverContent>
  </PopoverPortal>
</template>
