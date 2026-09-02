<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, useAttrs } from 'vue'
import { PopoverContent, PopoverPortal } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY } from '../select/context'
import { AUTOCOMPLETE_CONTEXT_KEY } from './context'

defineOptions({
  inheritAttrs: false,
})

type AutocompletePlacement = 'top' | 'bottom' | 'left' | 'right'
type AutocompleteAlign = 'start' | 'center' | 'end'

interface AutocompletePopoverProps {
  align?: AutocompleteAlign
  alignOffset?: number
  avoidCollisions?: boolean
  class?: string
  collisionPadding?: number
  forceMount?: boolean
  offset?: number
  placement?: AutocompletePlacement
  portalContainer?: HTMLElement | string | null
  sideOffset?: number
}

const props = withDefaults(defineProps<AutocompletePopoverProps>(), {
  align: 'start',
  alignOffset: 0,
  avoidCollisions: true,
  collisionPadding: 0,
  forceMount: undefined,
  offset: undefined,
  placement: 'bottom',
  portalContainer: null,
  sideOffset: undefined,
})

const selectContext = inject(SELECT_CONTEXT_KEY, null)
const autocompleteContext = inject(AUTOCOMPLETE_CONTEXT_KEY, null)
const attrs = useAttrs()
const portalTarget = computed(() => props.portalContainer ?? 'body')
const finalSideOffset = computed(() => props.sideOffset ?? props.offset ?? 8)
const popoverClass = computed(() =>
  composeTwClasses(props.class, autocompleteContext?.slots.value.popover()),
)
/**
 * React measures the trigger with a ResizeObserver and writes `--trigger-width`.
 * Radix already publishes the anchor width as a CSS variable, so we alias it and
 * skip the observer entirely.
 */
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
      :data-entering="dataAttr(selectContext?.isOpen.value)"
      :data-placement="placement"
      :force-mount="forceMount"
      :side="placement"
      :side-offset="finalSideOffset"
      :style="popoverStyle"
      data-slot="autocomplete-popover"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
