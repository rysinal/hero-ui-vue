<script setup lang="ts">
/* global HTMLElement */
import { computed, nextTick, provide, ref, watch } from 'vue'
import { toastVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { DEFAULT_GAP, DEFAULT_MAX_VISIBLE_TOAST, DEFAULT_SCALE_FACTOR, DEFAULT_TOAST_WIDTH } from './constants'
import { TOAST_PROVIDER_KEY, type ToastPlacement } from './context'
import { globalToastQueue, type QueuedToast, type ToastQueue } from './queue'
import ToastItem from './Toast.vue'

interface ToastProviderProps {
  class?: string
  placement?: ToastPlacement
  /** Supply a custom queue instead of the shared global one. */
  queue?: ToastQueue
  /** How many toasts stay expanded before the rest stack behind them. */
  maxVisibleToasts?: number
  /** Gap between stacked toasts, in pixels. */
  gap?: number
  /** How much each toast further back shrinks, as a fraction. */
  scaleFactor?: number
  /** Toast width. A number is treated as pixels. */
  width?: number | string
}

const props = withDefaults(defineProps<ToastProviderProps>(), {
  gap: DEFAULT_GAP,
  maxVisibleToasts: DEFAULT_MAX_VISIBLE_TOAST,
  placement: 'bottom',
  queue: undefined,
  scaleFactor: DEFAULT_SCALE_FACTOR,
  width: DEFAULT_TOAST_WIDTH,
})

const queue = computed(() => props.queue ?? globalToastQueue)
const slots = computed(() => toastVariants({ placement: props.placement }))

provide(TOAST_PROVIDER_KEY, {
  placement: computed(() => props.placement),
  queue: queue.value,
  slots,
})

const regionClass = computed(() => composeTwClasses(props.class, slots.value.region()))

/**
 * toast.css sizes the region with `sm:min-w-(--toast-width)`, so without this
 * variable the fixed region has no width and every toast — positioned absolutely
 * inside it — shrink-wraps to its longest word.
 *
 * React also sets --gap, --scale-factor and --placement here, but nothing in
 * either stylesheet reads them; this port applies gap and scale directly in
 * toastStyle, so only the variable the CSS actually consumes is set.
 */
const regionStyle = computed(() => ({
  '--toast-width': typeof props.width === 'number' ? `${props.width}px` : props.width,
}))

// Newest first, so the most recent toast is the one in front.
const stack = computed(() => [...queue.value.toasts].reverse())

const isFromTop = computed(() => props.placement.startsWith('top'))
const regionRef = ref<HTMLElement | null>(null)
const frontHeight = ref(0)

/**
 * Toasts behind the front one collapse to its height, so the stack reads as a
 * single card. Measure the front toast whenever the stack changes.
 */
const measureFrontHeight = () => {
  const front = regionRef.value?.querySelector<HTMLElement>('[data-frontmost="true"]')
  if (front) frontHeight.value = front.offsetHeight
}

watch(
  () => queue.value.toasts.length,
  async () => {
    await nextTick()
    measureFrontHeight()
  },
  { immediate: true },
)

/**
 * Toasts are absolutely positioned on top of each other; each one further back
 * is pushed down by the gap and scaled slightly, which is the stacked look.
 */
const toastStyle = (index: number) => {
  const offset = index * props.gap
  const scale = 1 - index * props.scaleFactor
  const translate = isFromTop.value ? offset : -offset

  return {
    '--front-height': `${frontHeight.value}px`,
    transform: `translateY(${translate}px) scale(${scale})`,
    zIndex: String(stack.value.length - index),
  }
}

const handlePointerEnter = () => queue.value.pauseAll()
const handlePointerLeave = () => queue.value.resumeAll()
</script>

<template>
  <div
    ref="regionRef"
    :class="regionClass"
    :data-placement="props.placement"
    :style="regionStyle"
    aria-label="Notifications"
    data-slot="toast-region"
    role="region"
    tabindex="-1"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
  >
    <ToastItem
      v-for="(item, index) in stack"
      :key="item.key"
      :data-frontmost="dataAttr(index === 0)"
      :data-hidden="dataAttr(index >= props.maxVisibleToasts)"
      :data-index="index"
      :style="toastStyle(index)"
      :toast="item as QueuedToast"
    >
      <slot :toast="item" />
    </ToastItem>
  </div>
</template>
