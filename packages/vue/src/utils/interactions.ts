import { computed, ref, type ComputedRef } from 'vue'
import { dataAttr } from './assertion'

type DisabledSource = boolean | undefined | (() => boolean | undefined) | ComputedRef<boolean | undefined>

const isEditableKeyPress = (event: KeyboardEvent) =>
  event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar'

export function useInteractionStates(disabled?: DisabledSource) {
  const isHovered = ref(false)
  const isPressed = ref(false)
  const isFocused = ref(false)
  const isFocusVisible = ref(false)

  const isDisabled = computed(() => {
    if (typeof disabled === 'function') return Boolean(disabled())
    if (disabled && typeof disabled === 'object' && 'value' in disabled) {
      return Boolean(disabled.value)
    }
    return Boolean(disabled)
  })

  const resetPress = () => {
    isPressed.value = false
  }

  const onPointerEnter = () => {
    if (!isDisabled.value) isHovered.value = true
  }

  const onPointerLeave = () => {
    isHovered.value = false
    resetPress()
  }

  const onPointerDown = () => {
    if (!isDisabled.value) isPressed.value = true
  }

  const onPointerUp = resetPress
  const onPointerCancel = resetPress

  const onFocus = (event: FocusEvent) => {
    if (isDisabled.value) return

    isFocused.value = true
    const target = event.target
    isFocusVisible.value = target instanceof Element && target.matches(':focus-visible')
  }

  const onBlur = () => {
    isFocused.value = false
    isFocusVisible.value = false
    resetPress()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (!isDisabled.value && isEditableKeyPress(event)) {
      isPressed.value = true
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    if (isEditableKeyPress(event)) resetPress()
  }

  const interactionAttrs = computed(() => ({
    'data-focus-visible': dataAttr(isFocusVisible.value),
    'data-focused': dataAttr(isFocused.value),
    'data-hovered': dataAttr(isHovered.value),
    'data-pressed': dataAttr(isPressed.value),
  }))

  const interactionHandlers = {
    blur: onBlur,
    focus: onFocus,
    keydown: onKeyDown,
    keyup: onKeyUp,
    pointercancel: onPointerCancel,
    pointerdown: onPointerDown,
    pointerenter: onPointerEnter,
    pointerleave: onPointerLeave,
    pointerup: onPointerUp,
  }

  return {
    interactionAttrs,
    interactionHandlers,
    isFocusVisible,
    isFocused,
    isHovered,
    isPressed,
  }
}
