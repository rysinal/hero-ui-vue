/* global HTMLElement */
import {
  computed,
  getCurrentInstance,
  nextTick,
  ref,
  shallowRef,
  useSlots,
  watch,
  type ComputedRef,
  type VNode,
} from 'vue'
import type { selectVariants } from '@rysinal/heroui-vue-styles'
import type { SelectContext, SelectItemRecord, SelectKey, SelectSelectionMode } from './context'

export type SelectValue = SelectKey | SelectKey[] | null

/** The subset of props every Select-shaped root accepts. */
export interface SelectStateProps {
  defaultOpen?: boolean
  defaultValue?: SelectValue
  disabledKeys?: SelectKey[]
  isOpen?: boolean
  modelValue?: SelectValue
  selectionMode?: SelectSelectionMode
  value?: SelectValue
}

export interface SelectStateOptions {
  isDisabled: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean | undefined>
  isRequired: ComputedRef<boolean | undefined>
  placeholder: ComputedRef<string>
  /**
   * Slot recipe shared with the parts. Autocomplete passes its own recipe, whose
   * extra slots the parts read through their own context instead.
   */
  slots: ComputedRef<ReturnType<typeof selectVariants>>
  onOpenChange: (isOpen: boolean) => void
  onSelectionChange: (keys: SelectKey[], value: SelectValue) => void
  /** Contributed by filtering roots (ComboBox, Autocomplete); items opt out of rendering. */
  matchesFilter?: (textValue: string) => boolean
}

export interface SelectStateReturn {
  context: SelectContext
  /** Values mirrored into hidden inputs so native form submission works. */
  hiddenInputValues: ComputedRef<string[]>
  isOpen: ComputedRef<boolean>
  selectedItems: ComputedRef<SelectItemRecord[]>
  selectedKeys: ComputedRef<SelectKey[]>
  setOpen: (nextOpen: boolean) => void
}

/**
 * The popover only mounts its items once it opens, so nothing has registered a
 * textValue before then and SelectValue would fall back to the raw key. Walk the
 * slot vnodes up front to recover the key -> label pairs declared in the markup.
 *
 * Child components keep their children as unevaluated slot functions, so those
 * have to be invoked to reach the items nested inside ListBox/SelectPopover.
 */
const collectSlotLabels = (nodes: unknown, into: Map<SelectKey, string>, depth = 0) => {
  if (depth > 12) return

  if (Array.isArray(nodes)) {
    nodes.forEach((node) => collectSlotLabels(node, into, depth))
    return
  }

  const vnode = nodes as VNode | null
  if (!vnode || typeof vnode !== 'object') return

  const vnodeProps = (vnode.props ?? {}) as Record<string, unknown>
  const rawKey = vnodeProps.value ?? vnodeProps.id
  const textValue = vnodeProps['text-value'] ?? vnodeProps.textValue

  if ((typeof rawKey === 'string' || typeof rawKey === 'number') && typeof textValue === 'string') {
    into.set(rawKey, textValue)
  }

  const children = vnode.children
  if (Array.isArray(children)) {
    collectSlotLabels(children, into, depth + 1)
    return
  }

  if (children && typeof children === 'object') {
    Object.entries(children as Record<string, unknown>).forEach(([slotName, child]) => {
      if (slotName === '_') return

      if (typeof child === 'function') {
        try {
          collectSlotLabels((child as (scope: object) => unknown)({}), into, depth + 1)
        } catch {
          // Slots that read scope props can throw when rendered eagerly; the
          // registry populated on open still covers those.
        }
        return
      }

      collectSlotLabels(child, into, depth + 1)
    })
  }
}

/**
 * Selection, open state and item registry shared by every Select-shaped root
 * (Select and Autocomplete). Returns the value to `provide` under
 * `SELECT_CONTEXT_KEY` so ListBox and the parts keep working unchanged.
 */
export function useSelectState(
  props: SelectStateProps,
  options: SelectStateOptions,
): SelectStateReturn {
  const instance = getCurrentInstance()
  const slotContent = useSlots()

  const hasProp = (name: string) => {
    const rawProps = instance?.vnode.props ?? {}
    const kebabName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

    return name in rawProps || kebabName in rawProps
  }

  const selectionMode = computed<SelectSelectionMode>(() => props.selectionMode ?? 'single')

  const normalizeValue = (
    value: SelectValue | undefined,
    mode = selectionMode.value,
  ): SelectKey[] => {
    if (value == null) return []
    const values = Array.isArray(value) ? value : [value]

    return mode === 'multiple' ? values : values.slice(0, 1)
  }

  const toEmitValue = (keys: SelectKey[]): SelectValue =>
    selectionMode.value === 'multiple' ? [...keys] : (keys[0] ?? null)

  const internalOpen = ref(props.defaultOpen ?? false)
  const internalSelectedKeys = ref<SelectKey[]>(normalizeValue(props.defaultValue))
  const pendingSelectedKeys = ref<SelectKey[] | null>(null)
  const itemMap = shallowRef(new Map<SelectKey, SelectItemRecord>())
  const triggerElement = shallowRef<HTMLElement | null>(null)

  const disabledKeySet = computed(() => new Set(props.disabledKeys ?? []))
  const isOpen = computed(() =>
    hasProp('isOpen') ? Boolean(props.isOpen && !options.isDisabled.value) : internalOpen.value,
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

  const slotLabels = computed(() => {
    const labels = new Map<SelectKey, string>()
    try {
      collectSlotLabels(slotContent.default?.({}) ?? [], labels)
    } catch {
      // Same rationale as above: never let label discovery break rendering.
    }
    return labels
  })

  const selectedItems = computed(() =>
    selectedKeys.value.map(
      (key) =>
        itemMap.value.get(key) ?? {
          key,
          textValue: slotLabels.value.get(key) ?? String(key),
        },
    ),
  )
  const hasSelection = computed(() => selectedKeys.value.length > 0)
  const hiddenInputValues = computed(() => selectedKeys.value.map((key) => String(key)))

  const focusTrigger = () => {
    nextTick(() => {
      triggerElement.value?.focus()
    })
  }

  const setOpen = (nextOpen: boolean) => {
    const finalOpen = options.isDisabled.value ? false : nextOpen

    if (!hasProp('isOpen')) {
      internalOpen.value = finalOpen
    }

    options.onOpenChange(finalOpen)
  }

  const close = () => {
    setOpen(false)
  }

  const setSelectedKeys = (keys: SelectKey[]) => {
    if (options.isDisabled.value) return

    const nextKeys = normalizeValue(keys, selectionMode.value).filter(
      (key) => !disabledKeySet.value.has(key),
    )

    pendingSelectedKeys.value = nextKeys

    if (!hasProp('modelValue') && !hasProp('value')) {
      internalSelectedKeys.value = nextKeys
    }

    options.onSelectionChange(nextKeys, toEmitValue(nextKeys))

    if (selectionMode.value === 'single') {
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
      if (!hasProp('isOpen')) internalOpen.value = defaultOpen ?? false
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
    () => [props.modelValue, props.value, selectionMode.value] as const,
    () => {
      pendingSelectedKeys.value = null
    },
  )

  const context: SelectContext = {
    close,
    disabledKeySet,
    hasSelection,
    isDisabled: options.isDisabled,
    isInvalid: options.isInvalid,
    isOpen,
    isRequired: options.isRequired,
    matchesFilter: options.matchesFilter,
    placeholder: options.placeholder,
    registerItem,
    selectedItems,
    selectedKeys,
    selectedKeySet,
    selectionMode,
    setOpen,
    setSelectedKeys,
    setTriggerElement,
    slots: options.slots,
    triggerElement,
    unregisterItem,
  }

  return { context, hiddenInputValues, isOpen, selectedItems, selectedKeys, setOpen }
}
