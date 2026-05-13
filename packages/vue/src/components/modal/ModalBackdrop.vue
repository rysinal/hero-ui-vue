<script setup lang="ts">
/* global document, HTMLElement, KeyboardEvent, MouseEvent */
import { computed, inject, onBeforeUnmount, provide, ref, watch } from 'vue'
import { modalVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { MODAL_CONTEXT_KEY, type ModalBackdropVariant, type ModalPlacement } from './context'

interface ModalBackdropProps {
  class?: string
  defaultOpen?: boolean
  isDismissable?: boolean
  isKeyboardDismissDisabled?: boolean
  isOpen?: boolean
  modelValue?: boolean
  portalContainer?: HTMLElement | string | null
  unstablePortalContainer?: HTMLElement | null
  variant?: ModalBackdropVariant
}

const props = withDefaults(defineProps<ModalBackdropProps>(), {
  defaultOpen: false,
  isDismissable: true,
  isKeyboardDismissDisabled: false,
  isOpen: undefined,
  modelValue: undefined,
  portalContainer: null,
  unstablePortalContainer: null,
  variant: 'opaque',
})

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'update:modelValue': [value: boolean]
  openChange: [value: boolean]
}>()

const rootContext = inject(MODAL_CONTEXT_KEY, null)
const internalOpen = ref(props.defaultOpen)
const isControlled = computed(() => props.modelValue !== undefined || props.isOpen !== undefined)
const isOpen = computed(() =>
  props.modelValue ?? props.isOpen ?? rootContext?.isOpen.value ?? internalOpen.value,
)
const slots = computed(() => modalVariants({ variant: props.variant }))
const backdropClass = computed(() => composeTwClasses(props.class, slots.value.backdrop()))
const portalTarget = computed(() => props.unstablePortalContainer ?? props.portalContainer ?? 'body')

watch(
  () => props.defaultOpen,
  (value) => {
    if (!isControlled.value && !rootContext) internalOpen.value = value
  },
)

const setOpen = (value: boolean) => {
  internalOpen.value = value
  emit('update:modelValue', value)
  emit('update:isOpen', value)
  emit('openChange', value)
  if (!isControlled.value) rootContext?.setOpen(value)
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || props.isKeyboardDismissDisabled) return
  setOpen(false)
}

watch(
  isOpen,
  (open) => {
    if (typeof document === 'undefined') return
    document.removeEventListener('keydown', onKeydown)
    if (open) document.addEventListener('keydown', onKeydown)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.removeEventListener('keydown', onKeydown)
})

const handleBackdropClick = (event: MouseEvent) => {
  if (!props.isDismissable || event.target !== event.currentTarget) return
  setOpen(false)
}

provide(MODAL_CONTEXT_KEY, {
  close: () => setOpen(false),
  isOpen,
  open: () => setOpen(true),
  placement: computed<ModalPlacement>(() => rootContext?.placement.value ?? 'auto'),
  setOpen,
  setPlacement: (placement) => {
    rootContext?.setPlacement(placement)
  },
  slots,
})
</script>

<template>
  <Teleport :to="portalTarget">
    <div
      v-if="isOpen"
      :class="backdropClass"
      :data-entering="dataAttr(true)"
      data-slot="modal-backdrop"
      @click="handleBackdropClick"
    >
      <slot :close="() => setOpen(false)" :is-open="isOpen" :open="() => setOpen(true)" />
    </div>
  </Teleport>
</template>
