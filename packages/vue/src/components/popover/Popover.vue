<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { PopoverRoot } from 'radix-vue'
import { popoverVariants } from '@rysinal/heroui-vue-styles'
import { POPOVER_CONTEXT_KEY } from './context'

interface PopoverProps {
  defaultOpen?: boolean
  isOpen?: boolean
  modal?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<PopoverProps>(), {
  defaultOpen: false,
  isOpen: undefined,
  modal: false,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'update:modelValue': [value: boolean]
  openChange: [value: boolean]
}>()

const internalOpen = ref(props.defaultOpen)
const isOpen = computed(() => props.modelValue ?? props.isOpen ?? internalOpen.value)
const slots = computed(() => popoverVariants())

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

provide(POPOVER_CONTEXT_KEY, {
  close: () => setOpen(false),
  isOpen,
  open: () => setOpen(true),
  setOpen,
  slots,
})
</script>

<template>
  <PopoverRoot
    :modal="modal"
    :open="isOpen"
    data-slot="popover-root"
    @update:open="setOpen"
  >
    <slot :close="() => setOpen(false)" :is-open="isOpen" :open="() => setOpen(true)" />
  </PopoverRoot>
</template>
