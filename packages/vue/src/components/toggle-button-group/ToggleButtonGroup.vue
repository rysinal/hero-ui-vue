<script setup lang="ts">
/* global HTMLElement, KeyboardEvent */
import { computed, provide, ref } from 'vue'
import { toggleButtonGroupVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { SEPARATOR_CONTEXT_KEY, type SeparatorOrientation } from '../separator/context'
import {
  TOGGLE_BUTTON_GROUP_CONTEXT_KEY,
  type ToggleButtonGroupKey,
  type ToggleButtonGroupSelectionMode,
} from './context'

interface ToggleButtonGroupProps {
  class?: string
  defaultSelectedKeys?: ToggleButtonGroupKey[]
  disabled?: boolean
  disallowEmptySelection?: boolean
  fullWidth?: boolean
  isDetached?: boolean
  isDisabled?: boolean
  modelValue?: ToggleButtonGroupKey[]
  orientation?: 'horizontal' | 'vertical'
  selectedKeys?: ToggleButtonGroupKey[]
  selectionMode?: ToggleButtonGroupSelectionMode
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<ToggleButtonGroupProps>(), {
  defaultSelectedKeys: () => [],
  disabled: undefined,
  disallowEmptySelection: false,
  fullWidth: false,
  isDetached: false,
  isDisabled: undefined,
  modelValue: undefined,
  orientation: 'horizontal',
  selectedKeys: undefined,
  selectionMode: undefined,
  size: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [keys: ToggleButtonGroupKey[]]
  'update:selectedKeys': [keys: ToggleButtonGroupKey[]]
  selectionChange: [keys: ToggleButtonGroupKey[]]
}>()

const internalSelectedKeys = ref<ToggleButtonGroupKey[]>([...props.defaultSelectedKeys])
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const selectedKeys = computed(
  () => props.selectedKeys ?? props.modelValue ?? internalSelectedKeys.value,
)
const isControlled = computed(() => props.selectedKeys !== undefined || props.modelValue !== undefined)

const slots = computed(() =>
  toggleButtonGroupVariants({
    fullWidth: props.fullWidth,
    isDetached: props.isDetached,
    orientation: props.orientation,
  }),
)

const isSelected = (key: ToggleButtonGroupKey) => selectedKeys.value.includes(key)

const nextKeysFor = (key: ToggleButtonGroupKey): ToggleButtonGroupKey[] => {
  const current = selectedKeys.value

  if (props.selectionMode === 'single') {
    if (current.includes(key)) return props.disallowEmptySelection ? current : []
    return [key]
  }

  if (!current.includes(key)) return [...current, key]
  if (props.disallowEmptySelection && current.length === 1) return current
  return current.filter((item) => item !== key)
}

const toggleKey = (key: ToggleButtonGroupKey) => {
  if (finalIsDisabled.value) return

  const next = nextKeysFor(key)
  if (next === selectedKeys.value) return

  if (!isControlled.value) internalSelectedKeys.value = next

  emit('update:modelValue', next)
  emit('update:selectedKeys', next)
  emit('selectionChange', next)
}

provide(TOGGLE_BUTTON_GROUP_CONTEXT_KEY, {
  isDisabled: finalIsDisabled,
  isSelected,
  selectionMode: computed(() => props.selectionMode),
  size: computed(() => props.size),
  slots,
  toggleKey,
})

// A separator inside the group runs across the group's own axis.
provide(SEPARATOR_CONTEXT_KEY, {
  orientation: computed<SeparatorOrientation>(() =>
    props.orientation === 'horizontal' ? 'vertical' : 'horizontal',
  ),
})

const groupRef = ref<HTMLElement | null>(null)
const groupClass = computed(() => composeTwClasses(props.class, slots.value.base()))

/** Roving focus: arrow keys move between buttons, matching React Aria. */
const handleKeydown = (event: KeyboardEvent) => {
  const forwardKey = props.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
  const backwardKey = props.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'

  const isForward = event.key === forwardKey
  const isBackward = event.key === backwardKey
  const isHome = event.key === 'Home'
  const isEnd = event.key === 'End'

  if (!isForward && !isBackward && !isHome && !isEnd) return

  const buttons = Array.from(
    groupRef.value?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [],
  )
  if (buttons.length === 0) return

  const currentIndex = buttons.indexOf(event.target as HTMLElement)
  if (currentIndex === -1) return

  event.preventDefault()

  const lastIndex = buttons.length - 1
  const nextIndex = isHome
    ? 0
    : isEnd
      ? lastIndex
      : isForward
        ? (currentIndex + 1) % buttons.length
        : (currentIndex - 1 + buttons.length) % buttons.length

  buttons[nextIndex]?.focus()
}

defineExpose({
  selectedKeys,
  toggleKey,
})
</script>

<template>
  <div
    ref="groupRef"
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-orientation="props.orientation"
    :class="groupClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-orientation="props.orientation"
    data-slot="toggle-button-group"
    role="group"
    @keydown="handleKeydown"
  >
    <slot :selected-keys="selectedKeys" :toggle-key="toggleKey" />
  </div>
</template>
