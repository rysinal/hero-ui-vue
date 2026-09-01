<script setup lang="ts">
import { computed, getCurrentInstance, provide, ref, useSlots, watch } from 'vue'
import { SwitchRoot, SwitchThumb as RadixSwitchThumb } from 'radix-vue'
import { switchVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import SwitchControl from './SwitchControl.vue'
import { SWITCH_CONTEXT_KEY } from './context'

interface SwitchProps {
  class?: string
  size?: 'sm' | 'md' | 'lg'
  modelValue?: boolean
  checked?: boolean
  isSelected?: boolean
  defaultChecked?: boolean
  defaultSelected?: boolean
  disabled?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  required?: boolean
  isRequired?: boolean
  name?: string
  value?: string
  id?: string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  checked: undefined,
  defaultSelected: undefined,
  defaultChecked: false,
  disabled: undefined,
  isSelected: undefined,
  isDisabled: undefined,
  isInvalid: undefined,
  isRequired: undefined,
  required: undefined,
  size: 'md',
})

const emit = defineEmits<{
  'update:checked': [checked: boolean]
  'update:modelValue': [checked: boolean]
  change: [checked: boolean]
}>()

const instance = getCurrentInstance()
const hasProp = (name: string) => {
  const rawProps = instance?.vnode.props ?? {}
  const kebabName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

  return name in rawProps || kebabName in rawProps
}

const internalChecked = ref(
  hasProp('defaultChecked')
    ? props.defaultChecked
    : hasProp('defaultSelected')
      ? props.defaultSelected
      : false,
)
const isSelected = computed(
  () =>
    hasProp('checked')
      ? (props.checked ?? false)
      : hasProp('isSelected')
        ? (props.isSelected ?? false)
        : hasProp('modelValue')
          ? (props.modelValue ?? false)
          : internalChecked.value,
)
const finalIsDisabled = computed(() => props.disabled ?? props.isDisabled)
const { interactionAttrs, interactionHandlers } = useInteractionStates(() => finalIsDisabled.value)

watch(
  () => [props.defaultChecked, props.defaultSelected],
  ([defaultChecked, defaultSelected]) => {
    if (!hasProp('checked') && !hasProp('isSelected') && !hasProp('modelValue')) {
      internalChecked.value = hasProp('defaultChecked')
        ? defaultChecked
        : hasProp('defaultSelected')
          ? defaultSelected
          : false
    }
  },
)

const styles = computed(() => switchVariants({ size: props.size }))
const baseClass = computed(() => composeTwClasses(props.class, styles.value.base()))
const controlClass = computed(() => styles.value.control())
const thumbClass = computed(() => styles.value.thumb())
const contentClass = computed(() => styles.value.content())
const iconClass = computed(() => styles.value.icon())

const slotContent = useSlots()

/** True when the caller composed <Switch.Control> themselves. */
const hasComposedControl = computed(() => {
  const containsControl = (list: unknown): boolean => {
    if (Array.isArray(list)) return list.some(containsControl)
    const vnode = list as { type?: unknown; children?: unknown } | null
    if (!vnode || typeof vnode !== 'object') return false
    if (vnode.type === SwitchControl) return true
    return containsControl(vnode.children)
  }
  try {
    return containsControl(slotContent.default?.({}) ?? [])
  } catch {
    return false
  }
})

provide(SWITCH_CONTEXT_KEY, {
  slots: styles,
  state: computed(() => ({
    isDisabled: finalIsDisabled.value === true,
    isSelected: isSelected.value === true,
  })),
})

const handleCheckedChange = (checked: boolean) => {
  internalChecked.value = checked
  emit('update:checked', checked)
  emit('update:modelValue', checked)
  emit('change', checked)
}

const rootChecked = computed({
  get: () => isSelected.value,
  set: handleCheckedChange,
})
</script>

<template>
  <SwitchRoot
    :class="baseClass"
    v-model:checked="rootChecked"
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-invalid="dataAttr(isInvalid)"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-invalid="dataAttr(isInvalid)"
    :data-required="dataAttr(required ?? isRequired)"
    :data-selected="dataAttr(isSelected)"
    :disabled="finalIsDisabled"
    :required="required ?? isRequired"
    :name="name"
    :value="value"
    :id="id"
    data-slot="switch"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
  >
    <span v-if="!hasComposedControl" :class="controlClass" data-slot="switch-control">
      <RadixSwitchThumb :class="thumbClass" data-slot="switch-thumb">
        <span v-if="$slots.icon" :class="iconClass" data-slot="switch-icon">
          <slot name="icon" :checked="isSelected" :is-selected="isSelected" />
        </span>
      </RadixSwitchThumb>
    </span>
    <!-- Composed: render the caller's parts as-is. Otherwise wrap the default
         slot in the content element for the common `<Switch>Label</Switch>`. -->
    <slot v-if="hasComposedControl" :checked="isSelected" :is-selected="isSelected" />
    <div v-else-if="$slots.default" :class="contentClass" data-slot="switch-content">
      <slot :checked="isSelected" :is-selected="isSelected" />
    </div>
  </SwitchRoot>
</template>
