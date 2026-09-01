<script setup lang="ts">
/* global HTMLElement */
import { computed, inject } from 'vue'
import { DropdownMenuContent, DropdownMenuPortal } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { DROPDOWN_CONTEXT_KEY } from './context'

defineOptions({ inheritAttrs: false })

interface DropdownPopoverProps {
  class?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  offset?: number
  portalContainer?: HTMLElement | string | null
}

const props = withDefaults(defineProps<DropdownPopoverProps>(), {
  align: 'start',
  offset: 4,
  placement: 'bottom',
  portalContainer: null,
})

const context = inject(DROPDOWN_CONTEXT_KEY, null)
const popoverClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.popover()),
)
const portalTarget = computed(() => props.portalContainer ?? 'body')
const popoverStyle = computed(() => ({
  '--trigger-anchor-point': 'var(--radix-dropdown-menu-content-transform-origin)',
  '--trigger-width': 'var(--radix-dropdown-menu-trigger-width)',
}))
</script>

<template>
  <DropdownMenuPortal :to="portalTarget">
    <DropdownMenuContent
      v-bind="$attrs"
      :align="props.align"
      :class="popoverClass"
      :data-placement="props.placement"
      :side="props.placement"
      :side-offset="props.offset"
      :style="popoverStyle"
      data-slot="dropdown-popover"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
