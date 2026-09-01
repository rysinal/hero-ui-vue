<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import { TooltipProvider, TooltipRoot } from 'radix-vue'
import { tooltipVariants } from '@rysinal/heroui-vue-styles'
import TooltipTrigger from './TooltipTrigger.vue'
import { TOOLTIP_CONTEXT_KEY } from './context'

interface TooltipProps {
  /** Controlled open state. Supports `v-model:is-open`. */
  isOpen?: boolean
  defaultOpen?: boolean
  /** Delay before the tooltip opens, in milliseconds. */
  delay?: number
  /** Delay before it closes once the pointer leaves. */
  closeDelay?: number
  isDisabled?: boolean
}

const props = withDefaults(defineProps<TooltipProps>(), {
  closeDelay: 0,
  defaultOpen: false,
  delay: 700,
  isDisabled: false,
  isOpen: undefined,
})

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  openChange: [value: boolean]
}>()

const slots = computed(() => tooltipVariants())

provide(TOOLTIP_CONTEXT_KEY, { slots })

const slotContent = useSlots()

/**
 * React lets a bare control sit directly inside Tooltip; only the content is
 * required to be a named part. Detect an explicit Trigger so we know whether
 * to wrap the first child ourselves.
 */
const hasComposedTrigger = computed(() => {
  const containsTrigger = (list: unknown): boolean => {
    if (Array.isArray(list)) return list.some(containsTrigger)
    const vnode = list as { type?: unknown; children?: unknown } | null
    if (!vnode || typeof vnode !== 'object') return false
    if (vnode.type === TooltipTrigger) return true
    return containsTrigger(vnode.children)
  }
  try {
    return containsTrigger(slotContent.default?.({}) ?? [])
  } catch {
    return false
  }
})

const handleOpenChange = (value: boolean) => {
  emit('update:isOpen', value)
  emit('openChange', value)
}
</script>

<template>
  <TooltipProvider :delay-duration="props.delay" :skip-delay-duration="props.closeDelay">
    <TooltipRoot
      :default-open="props.defaultOpen"
      :disabled="props.isDisabled"
      :open="props.isOpen"
      data-slot="tooltip-root"
      @update:open="handleOpenChange"
    >
      <!-- Composed: the caller supplied Tooltip.Trigger. Otherwise wrap the
           children so a bare control still acts as the trigger. -->
      <slot v-if="hasComposedTrigger" />
      <TooltipTrigger v-else>
        <slot />
      </TooltipTrigger>
    </TooltipRoot>
  </TooltipProvider>
</template>
