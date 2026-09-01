<script setup lang="ts">
/* global HTMLElement, MouseEvent */
import { computed, provide, ref, watch } from 'vue'
import { alertDialogVariants } from '@rysinal/heroui-vue-styles'
import { ALERT_DIALOG_CONTEXT_KEY, type AlertDialogPlacement } from './context'

interface AlertDialogProps {
  defaultOpen?: boolean
  isOpen?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<AlertDialogProps>(), {
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
const placement = ref<AlertDialogPlacement>('auto')
const isOpen = computed(() => props.modelValue ?? props.isOpen ?? internalOpen.value)
const slots = computed(() => alertDialogVariants())

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

const headingIds = ref<string[]>([])

const rootRef = ref<HTMLElement | null>(null)

const INTERACTIVE_TRIGGER_SELECTOR = 'button, [role="button"], a[href], input, select, textarea'

/**
 * React's AlertDialog root is a DialogTrigger, which wires up only its first
 * child as the trigger. Mirror that: open only when the click comes from an
 * interactive control inside the first child.
 */
const handleRootClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget || isOpen.value) return

  const target = event.target as HTMLElement | null
  const root = rootRef.value
  if (!target || !root) return

  // AlertDialogTrigger owns its own handling.
  if (target.closest('[data-slot="alert-dialog-trigger"]')) return

  const firstChild = root.firstElementChild
  if (!firstChild || !firstChild.contains(target)) return

  const control = target.closest(INTERACTIVE_TRIGGER_SELECTOR)
  if (!control || !firstChild.contains(control)) return

  setOpen(true)
}

provide(ALERT_DIALOG_CONTEXT_KEY, {
  close: () => setOpen(false),
  headingId: computed(() => headingIds.value[0]),
  registerHeadingId: (id) => {
    if (!headingIds.value.includes(id)) headingIds.value = [...headingIds.value, id]
  },
  unregisterHeadingId: (id) => {
    headingIds.value = headingIds.value.filter((item) => item !== id)
  },
  isOpen,
  open: () => setOpen(true),
  placement: computed(() => placement.value),
  setPlacement: (value) => {
    placement.value = value
  },
  slots,
})
</script>

<template>
  <div ref="rootRef" data-slot="alert-dialog-root" @click="handleRootClick">
    <slot :close="() => setOpen(false)" :is-open="isOpen" :open="() => setOpen(true)" />
  </div>
</template>
