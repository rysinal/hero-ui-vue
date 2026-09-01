<script setup lang="ts">
import { computed, getCurrentInstance, inject, provide, ref, useSlots, watch } from 'vue'
import { CheckboxIndicator as RadixCheckboxIndicator, CheckboxRoot } from 'radix-vue'
import { checkboxVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr, useInteractionStates } from '../../utils'
import CheckboxControl from './CheckboxControl.vue'
import { CHECKBOX_CONTEXT_KEY } from './context'
import { CHECKBOX_GROUP_CONTEXT_KEY } from '../checkbox-group/context'

type CheckedState = boolean | 'indeterminate'

interface CheckboxProps {
  class?: string
  controlClass?: string
  contentClass?: string
  indicatorClass?: string
  variant?: 'primary' | 'secondary'
  modelValue?: boolean
  checked?: CheckedState
  defaultChecked?: CheckedState
  isSelected?: boolean
  defaultSelected?: boolean
  isIndeterminate?: boolean
  disabled?: boolean
  isDisabled?: boolean
  readonly?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  required?: boolean
  isRequired?: boolean
  name?: string
  value?: string
  id?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: undefined,
  defaultSelected: undefined,
  defaultChecked: false,
  disabled: undefined,
  isIndeterminate: undefined,
  isDisabled: undefined,
  isInvalid: undefined,
  isReadOnly: undefined,
  isSelected: undefined,
  isRequired: undefined,
  modelValue: undefined,
  readonly: undefined,
  required: undefined,
  variant: 'primary',
})

const emit = defineEmits<{
  'update:checked': [checked: CheckedState]
  'update:modelValue': [checked: boolean]
  change: [checked: boolean]
}>()

const checkboxGroupContext = inject(CHECKBOX_GROUP_CONTEXT_KEY, null)
const instance = getCurrentInstance()
const hasProp = (name: string) => {
  const rawProps = instance?.vnode.props ?? {}
  const kebabName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

  return name in rawProps || kebabName in rawProps
}

const internalChecked = ref<CheckedState>(
  hasProp('defaultChecked')
    ? (props.defaultChecked ?? false)
    : hasProp('defaultSelected')
      ? (props.defaultSelected ?? false)
      : false,
)
const isGroupControlled = computed(
  () =>
    !!checkboxGroupContext &&
    props.value !== undefined &&
    !hasProp('checked') &&
    !hasProp('isSelected') &&
    !hasProp('modelValue'),
)
const checkedState = computed<CheckedState>(() =>
  isGroupControlled.value
    ? checkboxGroupContext?.selectedValues.value.includes(props.value ?? '') === true
    : hasProp('checked')
    ? (props.checked ?? false)
    : hasProp('isSelected')
      ? (props.isSelected ?? false)
      : hasProp('modelValue')
        ? (props.modelValue ?? false)
        : internalChecked.value,
)
const finalIsDisabled = computed(
  () => props.disabled ?? props.isDisabled ?? checkboxGroupContext?.isDisabled?.value,
)
const finalIsReadOnly = computed(() => props.readonly ?? props.isReadOnly)
const finalIsInvalid = computed(() => props.isInvalid ?? checkboxGroupContext?.isInvalid?.value)
const finalIsRequired = computed(() => props.required ?? props.isRequired)
const finalName = computed(() => props.name ?? checkboxGroupContext?.name?.value)
const finalVariant = computed(() =>
  hasProp('variant') ? props.variant : (checkboxGroupContext?.variant?.value ?? props.variant),
)
const isSelected = computed(() => checkedState.value === true)
const isIndeterminate = computed(
  () => props.isIndeterminate === true || checkedState.value === 'indeterminate',
)
const rootChecked = computed(() => (isIndeterminate.value ? 'indeterminate' : isSelected.value))
const { interactionAttrs, interactionHandlers } = useInteractionStates(
  () => finalIsDisabled.value || finalIsReadOnly.value,
)

watch(
  () => [props.defaultChecked, props.defaultSelected],
  ([defaultChecked, defaultSelected]) => {
    if (!hasProp('checked') && !hasProp('isSelected') && !hasProp('modelValue')) {
      internalChecked.value = hasProp('defaultChecked')
        ? (defaultChecked ?? false)
        : hasProp('defaultSelected')
          ? (defaultSelected ?? false)
          : false
    }
  },
)

const styles = computed(() => checkboxVariants({ variant: finalVariant.value }))

const baseClass = computed(() => composeTwClasses(props.class, styles.value.base()))
const contentClass = computed(() => composeTwClasses(props.contentClass, styles.value.content()))
const controlClass = computed(() => composeTwClasses(props.controlClass, styles.value.control()))
const indicatorClass = computed(() =>
  composeTwClasses(props.indicatorClass, styles.value.indicator()),
)

const slotContent = useSlots()

/**
 * True when the caller composed <Checkbox.Control> themselves, in which case
 * the root must not also emit its default control markup.
 */
const hasComposedControl = computed(() => {
  const nodes = slotContent.default?.({}) ?? []
  const containsControl = (list: unknown): boolean => {
    if (Array.isArray(list)) return list.some(containsControl)
    const vnode = list as { type?: unknown; children?: unknown } | null
    if (!vnode || typeof vnode !== 'object') return false
    if (vnode.type === CheckboxControl) return true
    return containsControl(vnode.children)
  }
  try {
    return containsControl(nodes)
  } catch {
    return false
  }
})

provide(CHECKBOX_CONTEXT_KEY, {
  hasComposedControl,
  registerControl: () => {},
  slots: styles,
  state: computed(() => ({
    isDisabled: finalIsDisabled.value === true,
    isIndeterminate: isIndeterminate.value,
    isInvalid: finalIsInvalid.value === true,
    isReadOnly: finalIsReadOnly.value === true,
    isSelected: isSelected.value,
  })),
})

const handleCheckedChange = (checked: CheckedState) => {
  if (finalIsReadOnly.value) return

  internalChecked.value = checked
  if (isGroupControlled.value && props.value !== undefined) {
    checkboxGroupContext?.toggleValue(props.value, checked === true)
  }
  emit('update:checked', checked)
  emit('update:modelValue', checked === true)
  emit('change', checked === true)
}
</script>

<template>
  <CheckboxRoot
    :id="props.id"
    :class="baseClass"
    :checked="rootChecked"
    :aria-disabled="dataAttr(finalIsDisabled)"
    :aria-invalid="dataAttr(finalIsInvalid)"
    :aria-readonly="dataAttr(finalIsReadOnly)"
    :data-disabled="dataAttr(finalIsDisabled)"
    :data-indeterminate="dataAttr(isIndeterminate)"
    :data-invalid="dataAttr(finalIsInvalid)"
    :data-readonly="dataAttr(finalIsReadOnly)"
    :data-selected="dataAttr(isSelected)"
    :disabled="finalIsDisabled"
    :required="finalIsRequired"
    :name="finalName"
    :value="props.value"
    data-slot="checkbox"
    v-bind="interactionAttrs"
    v-on="interactionHandlers"
    @update:checked="handleCheckedChange"
  >
    <div v-if="!hasComposedControl" :class="controlClass" data-slot="checkbox-control">
      <RadixCheckboxIndicator :class="indicatorClass" data-slot="checkbox-indicator" force-mount>
        <svg
          v-if="!$slots.indicator && isIndeterminate"
          aria-hidden="true"
          data-slot="checkbox-default-indicator--indeterminate"
          fill="none"
          role="presentation"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="3"
          viewBox="0 0 24 24"
        >
          <line x1="21" x2="3" y1="12" y2="12" />
        </svg>
        <svg
          v-else-if="!$slots.indicator"
          aria-hidden="true"
          data-slot="checkbox-default-indicator--checkmark"
          fill="none"
          role="presentation"
          stroke="currentColor"
          :stroke-dashoffset="isSelected ? 44 : 66"
          stroke-dasharray="22"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 17 18"
        >
          <polyline points="1 9 7 14 15 4" />
        </svg>
        <slot
          name="indicator"
          :checked="isSelected"
          :is-selected="isSelected"
          :is-indeterminate="isIndeterminate"
          :is-disabled="finalIsDisabled"
          :is-invalid="finalIsInvalid"
          :is-read-only="finalIsReadOnly"
        />
      </RadixCheckboxIndicator>
    </div>

    <!-- Composed: render the caller's parts as-is. Otherwise wrap the default
         slot in the content element for the common `<Checkbox>Label</Checkbox>`. -->
    <slot
      v-if="hasComposedControl"
      :checked="isSelected"
      :is-selected="isSelected"
      :is-indeterminate="isIndeterminate"
      :is-disabled="finalIsDisabled"
      :is-invalid="finalIsInvalid"
      :is-read-only="finalIsReadOnly"
    />
    <div v-else-if="$slots.default" :class="contentClass" data-slot="checkbox-content">
      <slot
        :checked="isSelected"
        :is-selected="isSelected"
        :is-indeterminate="isIndeterminate"
        :is-disabled="finalIsDisabled"
        :is-invalid="finalIsInvalid"
        :is-read-only="finalIsReadOnly"
      />
    </div>
  </CheckboxRoot>
</template>
