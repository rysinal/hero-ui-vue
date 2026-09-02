<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, useAttrs } from 'vue'
import { PopoverContent, PopoverPortal } from 'radix-vue'
import { composeTwClasses, dataAttr } from '../../utils'
import type { PopoverAlign, PopoverPlacement } from '../popover/context'
import { DATE_PICKER_CONTEXT_KEY } from './context'

defineOptions({
  inheritAttrs: false,
})

export interface DatePickerPopoverProps {
  align?: PopoverAlign
  alignOffset?: number
  avoidCollisions?: boolean
  class?: string
  collisionPadding?: number
  offset?: number
  placement?: PopoverPlacement
  portalContainer?: HTMLElement | string | null
  sideOffset?: number
}

const props = withDefaults(defineProps<DatePickerPopoverProps>(), {
  align: 'center',
  alignOffset: 0,
  avoidCollisions: true,
  collisionPadding: 0,
  offset: undefined,
  placement: 'bottom',
  portalContainer: null,
  sideOffset: undefined,
})

const picker = inject(DATE_PICKER_CONTEXT_KEY, null)
const attrs = useAttrs()

const popoverClass = computed(() => composeTwClasses(props.class, picker?.slots.value.popover()))
const portalTarget = computed(() => props.portalContainer ?? 'body')
const finalSideOffset = computed(() => props.sideOffset ?? props.offset ?? 8)
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
      :data-entering="dataAttr(picker?.isOpen.value)"
      :data-placement="placement"
      :side="placement"
      :side-offset="finalSideOffset"
      data-slot="date-picker-popover"
    >
      <slot :close="() => picker?.setOpen(false)" />
    </PopoverContent>
  </PopoverPortal>
</template>
