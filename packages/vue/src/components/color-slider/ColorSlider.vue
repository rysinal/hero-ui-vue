<script setup lang="ts">
/* global HTMLElement, KeyboardEvent, PointerEvent, document */
import { computed, onBeforeUnmount, provide, ref, shallowRef } from 'vue'
import { colorSliderVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, toColor, type Color, type ColorChannel } from '../../utils'
import { COLOR_SLIDER_CONTEXT_KEY } from './context'

interface ColorSliderProps {
  class?: string
  /** Current colour. Supports `v-model`. */
  modelValue?: string | Color
  defaultValue?: string | Color
  channel?: ColorChannel
  orientation?: 'horizontal' | 'vertical'
  isDisabled?: boolean
}

const props = withDefaults(defineProps<ColorSliderProps>(), {
  channel: 'hue',
  defaultValue: 'hsl(0, 100%, 50%)',
  isDisabled: false,
  modelValue: undefined,
  orientation: 'horizontal',
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

const slots = computed(() => colorSliderVariants({ orientation: props.orientation }))
const sliderClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const percent = computed(() => {
  const range = value.value.getChannelRange(props.channel)
  const current = value.value.getChannelValue(props.channel)
  return (current - range.minValue) / (range.maxValue - range.minValue)
})

/** Samples the channel across its range so the track shows what it controls. */
const trackBackground = computed(() => {
  const range = value.value.getChannelRange(props.channel)
  const steps = props.channel === 'hue' ? 12 : 8
  const stops: string[] = []

  for (let index = 0; index <= steps; index += 1) {
    const ratio = index / steps
    const channelValue = range.minValue + ratio * (range.maxValue - range.minValue)
    stops.push(value.value.withChannelValue(props.channel, channelValue).toString('rgb'))
  }

  const direction = props.orientation === 'vertical' ? 'to top' : 'to right'
  return `linear-gradient(${direction}, ${stops.join(', ')})`
})

const trackRef = ref<HTMLElement | null>(null)

// color-slider.css switches the thumb to a grabbing cursor while dragging.
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
  const element = trackRef.value
  if (!element || props.isDisabled) return

  const rect = element.getBoundingClientRect()
  const ratio =
    props.orientation === 'vertical'
      ? 1 - Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
      : Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))

  const range = value.value.getChannelRange(props.channel)
  commit(
    value.value.withChannelValue(props.channel, range.minValue + ratio * (range.maxValue - range.minValue)),
  )
}

const registerTrack = (element: HTMLElement | null) => {
  trackRef.value = element
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

  const range = value.value.getChannelRange(props.channel)
  const forward = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowRight'
  const backward = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowLeft'

  const nudge = (direction: number) => {
    event.preventDefault()
    commit(
      value.value.withChannelValue(
        props.channel,
        value.value.getChannelValue(props.channel) + direction * range.step,
      ),
    )
  }

  if (event.key === forward) nudge(1)
  else if (event.key === backward) nudge(-1)
}

provide(COLOR_SLIDER_CONTEXT_KEY, {
  channel: computed(() => props.channel),
  isDisabled: computed(() => props.isDisabled),
  isDragging: computed(() => isDragging.value),
  onKeydown: handleKeydown,
  onTrackPointerDown: handlePointerDown,
  orientation: computed(() => props.orientation),
  percent,
  registerTrack,
  slots,
  trackBackground,
  value,
})
</script>

<template>
  <div
    :class="sliderClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :data-orientation="props.orientation"
    data-slot="color-slider"
  >
    <slot :value="value" />
  </div>
</template>
