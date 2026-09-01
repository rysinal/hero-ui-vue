<script setup lang="ts">
/* global HTMLElement */
import { computed, inject, onMounted, provide, ref, watch } from 'vue'
import { DropdownMenuItem, DropdownMenuSubTrigger } from 'radix-vue'
import { menuItemVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import {
  DROPDOWN_CONTEXT_KEY,
  DROPDOWN_ITEM_CONTEXT_KEY,
  DROPDOWN_SUBMENU_KEY,
  type DropdownKey,
} from './context'

interface DropdownItemProps {
  class?: string
  /** Identifies the item for selection. */
  value?: DropdownKey
  variant?: 'default' | 'danger'
  isDisabled?: boolean
  textValue?: string
}

const props = withDefaults(defineProps<DropdownItemProps>(), {
  isDisabled: false,
  value: undefined,
  variant: 'default',
})

const emit = defineEmits<{
  action: [value: DropdownKey | undefined]
}>()

const dropdown = inject(DROPDOWN_CONTEXT_KEY, null)
// A SubmenuTrigger marks its child item, which must render as the sub trigger
// rather than a plain item so radix wires up the nested menu.
const hasSubmenu = inject(DROPDOWN_SUBMENU_KEY, false)

const slots = computed(() => menuItemVariants({ variant: props.variant }))
const isSelected = computed(
  () => props.value !== undefined && (dropdown?.selectedKeys.value.includes(props.value) ?? false),
)

provide(DROPDOWN_ITEM_CONTEXT_KEY, {
  hasSubmenu: computed(() => hasSubmenu),
  isSelected,
  slots,
})

const itemClass = computed(() => composeTwClasses(props.class, slots.value.item()))
const selectionMode = computed(() => dropdown?.selectionMode.value ?? 'none')

// radix writes data-disabled="" onto its own root, but menu-item.css matches
// [data-disabled="true"]. Overwrite the value once the element exists.
const itemRef = ref<HTMLElement | { $el?: HTMLElement } | null>(null)

const syncDisabledAttr = () => {
  const target = itemRef.value
  const element = target instanceof HTMLElement ? target : (target?.$el ?? null)
  if (!element) return

  if (props.isDisabled) element.setAttribute('data-disabled', 'true')
  else element.removeAttribute('data-disabled')
}

onMounted(syncDisabledAttr)
watch(() => props.isDisabled, syncDisabledAttr)

const handleSelect = (event: Event) => {
  if (props.value !== undefined && selectionMode.value !== 'none') {
    // Keep a selectable menu open while the user picks values.
    event.preventDefault()
    dropdown?.toggleKey(props.value)
  }
  emit('action', props.value)
  dropdown?.reportAction(props.value)
}
</script>

<template>
  <component
    :is="hasSubmenu ? DropdownMenuSubTrigger : DropdownMenuItem"
    :class="itemClass"
    :data-has-submenu="dataAttr(hasSubmenu)"
    :data-selected="dataAttr(isSelected)"
    :data-selection-mode="selectionMode"
    :disabled="props.isDisabled"
    :text-value="props.textValue"
    data-slot="menu-item"
    ref="itemRef"
    @select="handleSelect"
  >
    <slot :has-submenu="hasSubmenu" :is-selected="isSelected" />
  </component>
</template>
