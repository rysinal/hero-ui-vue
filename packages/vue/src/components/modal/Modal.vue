<script setup lang="ts">
/* global MouseEvent */
import { computed, provide, ref, watch } from 'vue'
import { modalVariants } from '@rysinal/heroui-vue-styles'
import { MODAL_CONTEXT_KEY, type ModalPlacement } from './context'

interface ModalProps {
  defaultOpen?: boolean
  isOpen?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  defaultOpen: false,
  isOpen: undefined,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'update:modelValue': [value: boolean]
  openChange: [value: boolean]
}>()

const internalOpen = ref(props.defaultOpen)
const placement = ref<ModalPlacement>('auto')
const isOpen = computed(() => props.modelValue ?? props.isOpen ?? internalOpen.value)
const isEntering = computed(() => isOpen.value)
const isExiting = computed(() => false)
const slots = computed(() => modalVariants())

watch(
  () => props.defaultOpen,
  (value) => {
    if (props.modelValue === undefined && props.isOpen === undefined) internalOpen.value = value
  },
)

const setOpen = (value: boolean) => {
  internalOpen.value = value
  emit('update:modelValue', value)
  emit('update:isOpen', value)
  emit('openChange', value)
}

const rootRef = ref<HTMLElement | null>(null)

const INTERACTIVE_TRIGGER_SELECTOR = 'button, [role="button"], a[href], input, select, textarea'

/**
 * React's Modal root is a DialogTrigger, which wires up only its first child as
 * the trigger, and only when that child is an interactive control. Mirror that:
 * a click opens the modal only when it originates from an interactive element
 * inside the first child, and never from an explicit disabled ModalTrigger.
 */
const handleRootClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget || isOpen.value) return

  const target = event.target as HTMLElement | null
  const root = rootRef.value
  if (!target || !root) return

  // ModalTrigger owns its disabled handling and calls open() itself.
  if (target.closest('[data-slot="modal-trigger"]')) return

  const firstChild = root.firstElementChild
  if (!firstChild || !firstChild.contains(target)) return

  const control = target.closest(INTERACTIVE_TRIGGER_SELECTOR)
  if (!control || !firstChild.contains(control)) return

  triggerElement.value = control as HTMLElement
  setOpen(true)
}

const headingIds = ref<string[]>([])
const triggerElement = ref<HTMLElement | null>(null)

provide(MODAL_CONTEXT_KEY, {
  close: () => setOpen(false),
  headingId: computed(() => headingIds.value[0]),
  isEntering,
  isExiting,
  isOpen,
  open: () => setOpen(true),
  placement: computed(() => placement.value),
  registerHeadingId: (id) => {
    if (!headingIds.value.includes(id)) headingIds.value = [...headingIds.value, id]
  },
  setOpen,
  setPlacement: (value) => {
    placement.value = value
  },
  setTriggerElement: (element) => {
    triggerElement.value = element
  },
  triggerElement: computed(() => triggerElement.value),
  slots,
  unregisterHeadingId: (id) => {
    headingIds.value = headingIds.value.filter((item) => item !== id)
  },
})
</script>

<template>
  <div ref="rootRef" data-slot="modal-root" @click="handleRootClick">
    <slot :close="() => setOpen(false)" :is-open="isOpen" :open="() => setOpen(true)" />
  </div>
</template>
