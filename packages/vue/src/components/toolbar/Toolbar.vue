<script setup lang="ts">
/* global HTMLElement, KeyboardEvent */
import { computed, provide, ref } from 'vue'
import { toolbarVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses } from '../../utils'
import { SEPARATOR_CONTEXT_KEY, type SeparatorOrientation } from '../separator/context'

interface ToolbarProps {
  class?: string
  isAttached?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<ToolbarProps>(), {
  isAttached: false,
  orientation: 'horizontal',
})

const toolbarRef = ref<HTMLElement | null>(null)

const toolbarClass = computed(() =>
  composeTwClasses(
    props.class,
    toolbarVariants({
      isAttached: props.isAttached,
      orientation: props.orientation,
    }),
  ),
)

// A separator inside a toolbar runs across the toolbar's own axis.
provide(SEPARATOR_CONTEXT_KEY, {
  orientation: computed<SeparatorOrientation>(() =>
    props.orientation === 'horizontal' ? 'vertical' : 'horizontal',
  ),
})

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const getControls = (): HTMLElement[] => {
  const root = toolbarRef.value
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

/** Roving focus: arrow keys move between controls, matching React Aria. */
const handleKeydown = (event: KeyboardEvent) => {
  const forwardKey = props.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
  const backwardKey = props.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'

  const isForward = event.key === forwardKey
  const isBackward = event.key === backwardKey
  const isHome = event.key === 'Home'
  const isEnd = event.key === 'End'

  if (!isForward && !isBackward && !isHome && !isEnd) return

  const controls = getControls()
  if (controls.length === 0) return

  const currentIndex = controls.indexOf(event.target as HTMLElement)
  if (currentIndex === -1) return

  event.preventDefault()

  const lastIndex = controls.length - 1
  const nextIndex = isHome
    ? 0
    : isEnd
      ? lastIndex
      : isForward
        ? (currentIndex + 1) % controls.length
        : (currentIndex - 1 + controls.length) % controls.length

  controls[nextIndex]?.focus()
}
</script>

<template>
  <div
    ref="toolbarRef"
    :aria-orientation="props.orientation"
    :class="toolbarClass"
    :data-orientation="props.orientation"
    data-slot="toolbar"
    role="toolbar"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>
