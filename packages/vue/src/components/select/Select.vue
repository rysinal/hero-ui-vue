<script setup lang="ts">
/* global HTMLElement */
import { computed, getCurrentInstance, nextTick, provide, ref, shallowRef, useAttrs, watch } from 'vue'
import { PopoverRoot } from 'radix-vue'
import { selectVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY, type SelectItemRecord, type SelectKey } from './context'
import type { SelectSelectionMode } from './context'

defineOptions({
  inheritAttrs: false,
})

type SelectValue = SelectKey | SelectKey[] | null

interface SelectProps {
  as?: string
  class?: string
  defaultOpen?: boolean
  defaultValue?: SelectValue
  disabled?: boolean
  disabledKeys?: SelectKey[]
  fullWidth?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isOpen?: boolean
  isRequired?: boolean
  modelValue?: SelectValue
  name?: string
  placeholder?: string
  required?: boolean
  selectionMode?: SelectSelectionMode
  value?: SelectValue
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<SelectProps>(), {
  as: 'div',
  defaultOpen: false,
  defaultValue: undefined,
  disabled: undefined,
  disabledKeys: () => [],
  fullWidth: false,
  isDisabled: undefined,
  isInvalid: undefined,
  isOpen: undefined,
  isRequired: undefined,
  modelValue: undefined,
  placeholder: 'Select one',
  required: undefined,
  selectionMode: 'single',
  value: undefined,
  variant: 'primary',
})

const emit = defineEmits<{
  change: [value: SelectValue]
  'open-change': [isOpen: boolean]
  'selection-change': [keys: SelectKey[]]
  'update:isOpen': [isOpen: boolean]
  'update:modelValue': [value: SelectValue]
  'update:value': [value: SelectValue]
}>()

const instance = getCurrentInstance()
const attrs = useAttrs()
const hasProp = (name: string) => {
  const rawProps = instance?.vnode.props ?? {}
  const kebabName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

  return name in rawProps || kebabName in rawProps
}

const normalizeValue = (value: SelectValue | undefined, mode = props.selectionMode): SelectKey[] => {
  if (value == null) return []
  const values = Array.isArray(value) ? value : [value]

  return mode === 'multiple' ? values : values.slice(0, 1)
}

const toEmitValue = (keys: SelectKey[]): SelectValue =>
  props.selectionMode === 'multiple' ? [...keys] : (keys[0] ?? null)

const internalOpen = ref(props.defaultOpen)
const internalSelectedKeys = ref<SelectKey[]>(normalizeValue(props.defaultValue))
const pendingSelectedKeys = ref<SelectKey[] | null>(null)
const itemMap = shallowRef(new Map<SelectKey, SelectItemRecord>())
const triggerElement = shallowRef<HTMLElement | null>(null)

const slots = computed(() => selectVariants({ fullWidth: props.fullWidth, variant: props.variant }))
const isDisabled = computed(() => props.disabled ?? props.isDisabled)
const isRequired = computed(() => props.required ?? props.isRequired)
const isInvalid = computed(() => props.isInvalid)
const disabledKeySet = computed(() => new Set(props.disabledKeys))
const isOpen = computed(() =>
  hasProp('isOpen') ? Boolean(props.isOpen && !isDisabled.value) : internalOpen.value,
)
const selectedKeys = computed(() => {
  if (pendingSelectedKeys.value) return pendingSelectedKeys.value

  return hasProp('modelValue')
    ? normalizeValue(props.modelValue)
    : hasProp('value')
      ? normalizeValue(props.value)
      : internalSelectedKeys.value
})
const selectedKeySet = computed(() => new Set(selectedKeys.value))
const selectedItems = computed(() =>
  selectedKeys.value.map((key) => itemMap.value.get(key) ?? { key, textValue: String(key) }),
)
const hasSelection = computed(() => selectedKeys.value.length > 0)
const placeholder = computed(() => props.placeholder)
const selectClass = computed(() => composeTwClasses(props.class, slots.value.base()))
const hiddenInputValues = computed(() => selectedKeys.value.map((key) => String(key)))

const focusTrigger = () => {
  nextTick(() => {
    triggerElement.value?.focus()
  })
}

const setOpen = (nextOpen: boolean) => {
  const finalOpen = isDisabled.value ? false : nextOpen

  if (!hasProp('isOpen')) {
    internalOpen.value = finalOpen
  }

  emit('update:isOpen', finalOpen)
  emit('open-change', finalOpen)
}

const close = () => {
  setOpen(false)
}

const setSelectedKeys = (keys: SelectKey[]) => {
  if (isDisabled.value) return

  const nextKeys = normalizeValue(keys, props.selectionMode).filter(
    (key) => !disabledKeySet.value.has(key),
  )
  const nextValue = toEmitValue(nextKeys)

  pendingSelectedKeys.value = nextKeys

  if (!hasProp('modelValue') && !hasProp('value')) {
    internalSelectedKeys.value = nextKeys
  }

  emit('update:modelValue', nextValue)
  emit('update:value', nextValue)
  emit('selection-change', nextKeys)
  emit('change', nextValue)

  if (props.selectionMode === 'single') {
    close()
    focusTrigger()
  }
}

const registerItem = (item: SelectItemRecord) => {
  const nextMap = new Map(itemMap.value)
  nextMap.set(item.key, item)
  itemMap.value = nextMap
}

const unregisterItem = (key: SelectKey) => {
  const nextMap = new Map(itemMap.value)
  nextMap.delete(key)
  itemMap.value = nextMap
}

const setTriggerElement = (element: HTMLElement | null) => {
  triggerElement.value = element
}

watch(
  () => props.defaultOpen,
  (defaultOpen) => {
    if (!hasProp('isOpen')) internalOpen.value = defaultOpen
  },
)

watch(
  () => props.defaultValue,
  (defaultValue) => {
    if (!hasProp('modelValue') && !hasProp('value')) {
      internalSelectedKeys.value = normalizeValue(defaultValue)
    }
  },
)

watch(
  () => [props.modelValue, props.value, props.selectionMode] as const,
  () => {
    pendingSelectedKeys.value = null
  },
)

provide(SELECT_CONTEXT_KEY, {
  close,
  disabledKeySet,
  hasSelection,
  isDisabled,
  isInvalid,
  isOpen,
  isRequired,
  placeholder,
  registerItem,
  selectedItems,
  selectedKeys,
  selectedKeySet,
  selectionMode: computed(() => props.selectionMode),
  setOpen,
  setSelectedKeys,
  setTriggerElement,
  slots,
  triggerElement,
  unregisterItem,
})
</script>

<template>
  <PopoverRoot :open="isOpen" @update:open="setOpen">
    <component
      :is="as"
      v-bind="attrs"
      :aria-disabled="dataAttr(isDisabled)"
      :aria-invalid="dataAttr(isInvalid)"
      :class="selectClass"
      :data-disabled="dataAttr(isDisabled)"
      :data-invalid="dataAttr(isInvalid)"
      :data-open="dataAttr(isOpen)"
      :data-required="dataAttr(isRequired)"
      data-slot="select"
    >
      <slot
        :is-disabled="isDisabled"
        :is-invalid="isInvalid"
        :is-open="isOpen"
        :is-required="isRequired"
        :selected-items="selectedItems"
        :selected-keys="selectedKeys"
      />
      <template v-if="name || isRequired">
        <input
          v-if="selectionMode === 'single'"
          :disabled="isDisabled"
          :name="name"
          :required="isRequired"
          :value="hiddenInputValues[0] ?? ''"
          class="select__validation-proxy"
          tabindex="-1"
        />
        <template v-else>
          <input
            v-if="hiddenInputValues.length === 0"
            :disabled="isDisabled"
            :name="name"
            :required="isRequired"
            class="select__validation-proxy"
            tabindex="-1"
            value=""
          />
          <input
            v-for="hiddenValue in hiddenInputValues"
            v-else
            :key="hiddenValue"
            :disabled="isDisabled"
            :name="name"
            :value="hiddenValue"
            class="select__validation-proxy"
            tabindex="-1"
          />
        </template>
      </template>
    </component>
  </PopoverRoot>
</template>
