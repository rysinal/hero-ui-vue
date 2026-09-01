import { computed, ref, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'

export interface UseOverlayStateProps {
  /** Whether the overlay is currently open (controlled). */
  isOpen?: MaybeRefOrGetter<boolean | undefined>
  /** Whether the overlay is open by default (uncontrolled). @default false */
  defaultOpen?: boolean
  /** Called whenever the open state should change, controlled or not. */
  onOpenChange?: (isOpen: boolean) => void
}

export interface UseOverlayStateReturn {
  /** Whether the overlay is currently open. */
  readonly isOpen: ComputedRef<boolean>
  /** Sets the overlay's open state. */
  setOpen: (isOpen: boolean) => void
  /** Opens the overlay. */
  open: () => void
  /** Closes the overlay. */
  close: () => void
  /** Toggles the overlay's open state. */
  toggle: () => void
}

/**
 * Manages overlay trigger state (Modal, AlertDialog, Popover, ...).
 *
 * Accepts a plain value, ref, or getter for `isOpen` so callers can drive it
 * from any reactive source. When `isOpen` is provided the overlay is
 * controlled: this composable reports changes through `onOpenChange` but never
 * mutates its own state.
 *
 * @example
 * ```ts
 * const overlay = useOverlayState()
 * // <Button @click="overlay.open">Open</Button>
 * // <Modal :is-open="overlay.isOpen.value" @open-change="overlay.setOpen">
 * ```
 */
export const useOverlayState = (props: UseOverlayStateProps = {}): UseOverlayStateReturn => {
  const { defaultOpen = false, isOpen: controlledIsOpen, onOpenChange } = props

  const uncontrolledIsOpen = ref(defaultOpen)

  const isControlled = computed(() => toValue(controlledIsOpen) !== undefined)
  const isOpen = computed(() =>
    isControlled.value ? Boolean(toValue(controlledIsOpen)) : uncontrolledIsOpen.value,
  )

  const setOpen = (nextIsOpen: boolean) => {
    // Always report, so a controlled parent can commit the change.
    onOpenChange?.(nextIsOpen)

    if (!isControlled.value) uncontrolledIsOpen.value = nextIsOpen
  }

  return {
    close: () => setOpen(false),
    isOpen,
    open: () => setOpen(true),
    setOpen,
    toggle: () => setOpen(!isOpen.value),
  }
}
