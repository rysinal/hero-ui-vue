<script setup lang="ts">
/* global HTMLElement, KeyboardEvent, PointerEvent, document */
import { computed, onBeforeUnmount, provide, ref, shallowRef } from 'vue'
import { colorAreaVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, toColor, type Color, type ColorChannel } from '../../utils'
import { COLOR_AREA_CONTEXT_KEY } from './context'

interface ColorAreaProps {
  class?: string
  /** Current colour. Supports `v-model`. */
  modelValue?: string | Color
  defaultValue?: string | Color
  xChannel?: ColorChannel
  yChannel?: ColorChannel
  isDisabled?: boolean
  showDots?: boolean
}

const props = withDefaults(defineProps<ColorAreaProps>(), {
  defaultValue: 'rgb(255, 0, 0)',
  isDisabled: false,
  modelValue: undefined,
  showDots: false,
  xChannel: 'saturation',
  yChannel: 'brightness',
})

const emit = defineEmits<{
  'update:modelValue': [value: Color]
  change: [value: Color]
}>()

// Color is immutable; a deep ref would proxy it and lose the identity the
// colour model uses to remember exact channels.
const internalValue = shallowRef<Color>(toColor(props.defaultValue))
const value = computed(() =>
  props.modelValue === undefined ? internalValue.value : toColor(props.modelValue),
)

const slots = computed(() => colorAreaVariants({ showDots: props.showDots }))
const areaClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const fraction = (channel: ColorChannel) => {
  const range = value.value.getChannelRange(channel)
  const current = value.value.getChannelValue(channel)
  return (current - range.minValue) / (range.maxValue - range.minValue)
}

// The y axis runs bottom-up, so invert it for CSS positioning.
const position = computed(() => ({
  x: fraction(props.xChannel),
  y: 1 - fraction(props.yChannel),
}))

/**
 * React Aria hands the gradient down as a style; build the equivalent here —
 * the x channel across, the y channel up, over the current hue.
 */
const background = computed(() => {
  const hue = value.value.getChannelValue('hue')
  return [
    'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
    `linear-gradient(to right, rgba(255,255,255,1), hsl(${hue}, 100%, 50%))`,
  ].join(', ')
})

const areaStyle = computed(() => ({ '--color-area-background': background.value }))

const areaRef = ref<HTMLElement | null>(null)

// color-area.css grows the thumb while it is being dragged.
const isDragging = ref(false)

// A pointer drag listens on the document, so a component torn down mid-drag
// would otherwise leave both listeners attached.
let teardown: (() => void) | undefined
onBeforeUnmount(() => teardown?.())

const commit = (next: Color) => {
  if (props.modelValue === undefined) internalValue.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

const setFromPoint = (clientX: number, clientY: number) => {
  const element = areaRef.value
  if (!element || props.isDisabled) return

  const rect = element.getBoundingClientRect()
  const xFraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
  const yFraction = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))

  const xRange = value.value.getChannelRange(props.xChannel)
  const yRange = value.value.getChannelRange(props.yChannel)

  const next = value.value
    .withChannelValue(props.xChannel, xRange.minValue + xFraction * (xRange.maxValue - xRange.minValue))
    // Screen y grows downward while the channel grows upward.
    .withChannelValue(props.yChannel, yRange.minValue + (1 - yFraction) * (yRange.maxValue - yRange.minValue))

  commit(next)
}

const handlePointerDown = (event: PointerEvent) => {
  if (props.isDisabled) return
  event.preventDefault()
  setFromPoint(event.clientX, event.clientY)
  isDragging.value = true

  const onMove = (moveEvent: PointerEvent) => setFromPoint(moveEvent.clientX, moveEvent.clientY)
  const onUp = () => {
    isDragging.value = false
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onUp)
    teardown = undefined
  }
  teardown = onUp
  document.addEventListener('pointermove', onMove)
  document.addEventListener('pointerup', onUp)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.isDisabled) return

  const stepFor = (channel: ColorChannel) => value.value.getChannelRange(channel).step
  const nudge = (channel: ColorChannel, direction: number) => {
    event.preventDefault()
    commit(
      value.value.withChannelValue(
        channel,
        value.value.getChannelValue(channel) + direction * stepFor(channel),
      ),
    )
  }

  if (event.key === 'ArrowRight') nudge(props.xChannel, 1)
  else if (event.key === 'ArrowLeft') nudge(props.xChannel, -1)
  else if (event.key === 'ArrowUp') nudge(props.yChannel, 1)
  else if (event.key === 'ArrowDown') nudge(props.yChannel, -1)
}

provide(COLOR_AREA_CONTEXT_KEY, {
  isDisabled: computed(() => props.isDisabled),
  isDragging: computed(() => isDragging.value),
  position,
  slots,
  value,
  xChannel: computed(() => props.xChannel),
  yChannel: computed(() => props.yChannel),
})
</script>

<template>
  <div
    ref="areaRef"
    :aria-disabled="dataAttr(props.isDisabled)"
    :class="areaClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :style="areaStyle"
    data-slot="color-area"
    role="group"
    @keydown="handleKeydown"
    @pointerdown="handlePointerDown"
  >
    <slot :value="value" />
  </div>
</template>
