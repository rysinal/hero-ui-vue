<script setup lang="ts">
/* global HTMLElement */
import { computed, inject } from 'vue'
import { PopoverContent, PopoverPortal } from 'radix-vue'
import { composeTwClasses } from '../../utils'
import { COMBO_BOX_CONTEXT_KEY } from './context'

defineOptions({ inheritAttrs: false })

interface ComboBoxPopoverProps {
  class?: string
  placement?: 'top' | 'bottom'
  offset?: number
  portalContainer?: HTMLElement | string | null
}

const props = withDefaults(defineProps<ComboBoxPopoverProps>(), {
  offset: 8,
  placement: 'bottom',
  portalContainer: null,
})

const context = inject(COMBO_BOX_CONTEXT_KEY, null)

const popoverClass = computed(() => composeTwClasses(props.class, context?.slots.value.popover()))
const portalTarget = computed(() => props.portalContainer ?? 'body')
const popoverStyle = computed(() => ({
  '--trigger-anchor-point': 'var(--radix-popover-content-transform-origin)',
  '--trigger-width': 'var(--radix-popover-trigger-width)',
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
      data-slot="combo-box-popover"
      @open-auto-focus.prevent
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
