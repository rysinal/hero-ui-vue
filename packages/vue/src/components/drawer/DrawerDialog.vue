<script setup lang="ts">
/* global Element, HTMLElement, MouseEvent, PointerEvent */
import { computed, inject, ref } from 'vue'
import { composeTwClasses } from '../../utils'
import { DRAWER_CONTEXT_KEY } from './context'

interface DrawerDialogProps {
  class?: string
}

const DRAG_THRESHOLD = 8
const DISMISS_FRACTION = 0.3
const VELOCITY_THRESHOLD = 0.5

const props = defineProps<DrawerDialogProps>()
const context = inject(DRAWER_CONTEXT_KEY, null)
const dialogRef = ref<HTMLElement>()
const dialogClass = computed(() => composeTwClasses(props.class, context?.slots.value.dialog()))

let isDragging = false
let isActive = false
let startPos = 0
let currentOffset = 0
let velocity = 0
let lastTime = 0
let lastPos = 0

const isVertical = computed(() => {
  return context?.placement.value === 'top' || context?.placement.value === 'bottom'
})

const getPos = (event: PointerEvent) => (isVertical.value ? event.clientY : event.clientX)

const clamp = (delta: number) => {
  switch (context?.placement.value) {
    case 'bottom':
    case 'right':
      return Math.max(0, delta)
    case 'top':
    case 'left':
      return Math.min(0, delta)
    default:
      return delta
  }
}

const handlePointerDown = (event: PointerEvent) => {
  if (!context?.isDismissable.value) return
  if (event.button !== 0) return

  const target = event.target instanceof Element ? event.target : null
  if (
    target?.closest(
      "input, textarea, button, [role='button'], select, a, [data-slot='drawer-body']",
    )
  ) {
    return
  }

  isDragging = true
  isActive = false
  startPos = getPos(event)
  lastPos = startPos
  lastTime = Date.now()
  currentOffset = 0
  velocity = 0
}

const handlePointerMove = (event: PointerEvent) => {
  const el = dialogRef.value
  if (!isDragging || !el) return

  const pos = getPos(event)
  const rawDelta = pos - startPos
  const delta = clamp(rawDelta)

  if (!isActive) {
    if (Math.abs(rawDelta) < DRAG_THRESHOLD) return
    isActive = true
    el.style.transition = 'none'
    el.setPointerCapture(event.pointerId)
  }

  currentOffset = delta

  const now = Date.now()
  const dt = now - lastTime
  if (dt > 0) {
    velocity = (pos - lastPos) / dt
    lastTime = now
    lastPos = pos
  }

  const axis = isVertical.value ? 'Y' : 'X'
  el.style.transform = `translate${axis}(${delta}px)`
}

const handlePointerUp = (event: PointerEvent) => {
  if (!isDragging) return
  isDragging = false

  const el = dialogRef.value
  if (!el || !isActive) {
    isActive = false
    return
  }
  isActive = false

  try {
    el.releasePointerCapture(event.pointerId)
  } catch {
    // Pointer capture may already be released.
  }

  const dimension = isVertical.value ? el.offsetHeight : el.offsetWidth
  const absOffset = Math.abs(currentOffset)
  const absVelocity = Math.abs(velocity)
  const shouldDismiss =
    absOffset > dimension * DISMISS_FRACTION || absVelocity > VELOCITY_THRESHOLD

  if (shouldDismiss) {
    context?.close()
  } else {
    el.style.transition = 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)'
    el.style.transform = ''
    el.addEventListener(
      'transitionend',
      () => {
        el.style.transition = ''
      },
      { once: true },
    )
  }

  currentOffset = 0
  velocity = 0
}

const handleClick = (event: MouseEvent) => {
  const target = event.target instanceof Element ? event.target : null
  if (!target?.closest('[slot="close"], [data-drawer-close="true"]')) return
  context?.close()
}
</script>

<template>
  <section
    ref="dialogRef"
    :class="dialogClass"
    :data-placement="context?.placement.value"
    :style="context?.isDismissable.value ? { touchAction: 'none' } : undefined"
    aria-modal="true"
    data-slot="drawer-dialog"
    role="dialog"
    tabindex="-1"
    @click.capture="handleClick"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
  >
    <slot :close="context?.close" />
  </section>
</template>
