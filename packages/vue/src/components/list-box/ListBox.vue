<script setup lang="ts">
import { computed, getCurrentInstance, inject, provide, ref, watch } from 'vue'
import { listboxVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { SELECT_CONTEXT_KEY, type SelectKey } from '../select/context'
import { LIST_BOX_CONTEXT_KEY } from './context'
import type { ListBoxKey, ListBoxSelectionMode } from './context'

interface ListBoxProps {
  ariaLabel?: string
  class?: string
  defaultSelectedKeys?: ListBoxKey[]
  disabled?: boolean
  disabledKeys?: ListBoxKey[]
  isDisabled?: boolean
  modelValue?: ListBoxKey[]
  selectedKeys?: ListBoxKey[]
  selectionMode?: ListBoxSelectionMode
  variant?: 'default' | 'danger'
}

const props = withDefaults(defineProps<ListBoxProps>(), {
  defaultSelectedKeys: () => [],
  disabled: undefined,
  disabledKeys: () => [],
  isDisabled: undefined,
  modelValue: undefined,
  selectedKeys: undefined,
  selectionMode: undefined,
  variant: 'default',
})

const emit = defineEmits<{
  action: [key: ListBoxKey]
  'selection-change': [keys: ListBoxKey[]]
  'update:modelValue': [keys: ListBoxKey[]]
  'update:selectedKeys': [keys: ListBoxKey[]]
}>()

const instance = getCurrentInstance()
const hasProp = (name: string) => {
  const rawProps = instance?.vnode.props ?? {}
  const kebabName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

  return name in rawProps || kebabName in rawProps
}

const internalSelectedKeys = ref<ListBoxKey[]>([...props.defaultSelectedKeys])
const selectContext = inject(SELECT_CONTEXT_KEY, null)
const selectedKeys = computed(() =>
  hasProp('selectedKeys')
    ? (props.selectedKeys ?? [])
    : hasProp('modelValue')
      ? (props.modelValue ?? [])
      : selectContext
        ? selectContext.selectedKeys.value
      : internalSelectedKeys.value,
)
const selectedKeySet = computed(() => new Set(selectedKeys.value))
const disabledKeySet = computed(() => {
  const keys = new Set<ListBoxKey>(props.disabledKeys)
  selectContext?.disabledKeySet.value.forEach((key) => keys.add(key))

  return keys
})
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled ?? selectContext?.isDisabled.value)
const selectionMode = computed(() => props.selectionMode ?? selectContext?.selectionMode.value ?? 'single')
const variant = computed(() => props.variant)
const listBoxClass = computed(() =>
  composeTwClasses(props.class, listboxVariants({ variant: props.variant })),
)

const setSelectedKeys = (nextKeys: ListBoxKey[]) => {
  if (!hasProp('selectedKeys') && !hasProp('modelValue') && selectContext) {
    selectContext.setSelectedKeys(nextKeys as SelectKey[])
  } else {
    internalSelectedKeys.value = nextKeys
  }

  emit('update:modelValue', nextKeys)
  emit('update:selectedKeys', nextKeys)
  emit('selection-change', nextKeys)
}

const toggleKey = (key: ListBoxKey) => {
  if (finalIsDisabled.value || disabledKeySet.value.has(key) || selectionMode.value === 'none') return

  if (selectionMode.value === 'single') {
    setSelectedKeys(selectedKeySet.value.has(key) ? [] : [key])
    return
  }

  const nextSet = new Set(selectedKeys.value)
  if (nextSet.has(key)) {
    nextSet.delete(key)
  } else {
    nextSet.add(key)
  }

  setSelectedKeys([...nextSet])
}

const actionKey = (key: ListBoxKey) => {
  if (finalIsDisabled.value || disabledKeySet.value.has(key)) return
  emit('action', key)
}

watch(
  () => props.defaultSelectedKeys,
  (defaultSelectedKeys) => {
    if (!hasProp('selectedKeys') && !hasProp('modelValue')) {
      internalSelectedKeys.value = [...defaultSelectedKeys]
    }
  },
)

provide(LIST_BOX_CONTEXT_KEY, {
  actionKey,
  disabledKeySet,
  isDisabled: finalIsDisabled,
  selectedKeySet,
  selectionMode,
  toggleKey,
  variant,
})
</script>

<template>
  <div
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-label="props.ariaLabel"
    :aria-multiselectable="selectionMode === 'multiple' ? 'true' : undefined"
    :class="listBoxClass"
    :data-disabled="dataAttr(finalIsDisabled)"
    data-slot="list-box"
    role="listbox"
  >
    <slot :selected-keys="selectedKeys" />
  </div>
</template>
