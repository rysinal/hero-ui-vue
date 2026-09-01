<script setup lang="ts">
import { computed, provide, ref, shallowRef, watch } from 'vue'
import { colorFieldVariants } from '@rysinal/heroui-vue-styles'
import {
  composeTwClasses,
  dataAttr,
  parseColor,
  toColor,
  type Color,
  type ColorChannel,
} from '../../utils'
import { COLOR_FIELD_CONTEXT_KEY } from './context'

interface ColorFieldProps {
  class?: string
  /** Current colour, or null when the text does not parse. Supports `v-model`. */
  modelValue?: string | Color | null
  defaultValue?: string | Color | null
  /** Edits a single channel rather than the whole colour. */
  channel?: ColorChannel
  placeholder?: string
  name?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<ColorFieldProps>(), {
  channel: undefined,
  defaultValue: null,
  fullWidth: false,
  isDisabled: undefined,
  isInvalid: undefined,
  isRequired: undefined,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: Color | null]
  change: [value: Color | null]
}>()

const normalize = (value: string | Color | null | undefined): Color | null => {
  if (value === null || value === undefined) return null
  try {
    return toColor(value)
  } catch {
    return null
  }
}

const internalValue = shallowRef<Color | null>(normalize(props.defaultValue))
const value = computed(() =>
  props.modelValue === undefined ? internalValue.value : normalize(props.modelValue),
)

const formatValue = (color: Color | null) => {
  if (!color) return ''
  return props.channel ? String(color.getChannelValue(props.channel)) : color.toString('hex')
}

const text = ref(formatValue(value.value))
const hasParseError = ref(false)

// Follow the value when it changes from outside, without fighting typing.
watch(value, (next) => {
  const formatted = formatValue(next)
  if (formatted !== text.value) text.value = formatted
})

const slots = computed(() => colorFieldVariants({ fullWidth: props.fullWidth }))
const fieldClass = computed(() => composeTwClasses(props.class, slots.value))

const commit = (next: Color | null) => {
  if (props.modelValue === undefined) internalValue.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

const setText = (nextText: string) => {
  text.value = nextText

  if (nextText.trim() === '') {
    hasParseError.value = false
    commit(null)
    return
  }

  // Channel mode edits a number; otherwise the text is a whole colour.
  if (props.channel) {
    const numeric = Number.parseFloat(nextText)
    if (Number.isNaN(numeric) || !value.value) {
      hasParseError.value = true
      return
    }
    hasParseError.value = false
    commit(value.value.withChannelValue(props.channel, numeric))
    return
  }

  try {
    const parsed = parseColor(nextText)
    hasParseError.value = false
    commit(parsed)
  } catch {
    hasParseError.value = true
  }
}

provide(COLOR_FIELD_CONTEXT_KEY, {
  channel: computed(() => props.channel),
  isDisabled: computed(() => props.isDisabled),
  isInvalid: computed(() => props.isInvalid ?? hasParseError.value),
  isRequired: computed(() => props.isRequired),
  placeholder: computed(() => props.placeholder),
  setText,
  text: computed(() => text.value),
  value,
})
</script>

<template>
  <div
    :class="fieldClass"
    :data-disabled="dataAttr(props.isDisabled)"
    :data-invalid="dataAttr(props.isInvalid ?? hasParseError)"
    data-slot="color-field"
  >
    <slot :value="value" />
    <input v-if="props.name" :name="props.name" :value="text" type="hidden" />
  </div>
</template>
