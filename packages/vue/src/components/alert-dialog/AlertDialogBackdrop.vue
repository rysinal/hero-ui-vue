<script setup lang="ts">
/* global Animation, HTMLElement, KeyboardEvent, MouseEvent, document, requestAnimationFrame */
import { computed, inject, nextTick, onBeforeUnmount, provide, ref, watch } from 'vue'
import { alertDialogVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { ALERT_DIALOG_CONTEXT_KEY, type AlertDialogBackdropVariant } from './context'

interface AlertDialogBackdropProps {
  class?: string
  isDismissable?: boolean
  isKeyboardDismissDisabled?: boolean
  variant?: AlertDialogBackdropVariant
}

const props = withDefaults(defineProps<AlertDialogBackdropProps>(), {
  isDismissable: false,
  isKeyboardDismissDisabled: true,
  variant: 'opaque',
})

const context = inject(ALERT_DIALOG_CONTEXT_KEY, null)
const slots = computed(() => alertDialogVariants({ variant: props.variant }))
const backdropClass = computed(() => composeTwClasses(props.class, slots.value.backdrop()))

const overlayRef = ref<HTMLElement | null>(null)
const isRendered = ref(false)
const isEntering = ref(false)
const isExiting = ref(false)
let animationRunId = 0

/** Element focused before the dialog opened, so focus can go back on close. */
let triggerElement: HTMLElement | null = null

const onKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || props.isKeyboardDismissDisabled) return
  context?.close()
}

const waitForFrame = () =>
  new Promise<void>((resolve) => {
    if (typeof requestAnimationFrame !== 'function') {
      resolve()
      return
    }
    requestAnimationFrame(() => resolve())
  })

const getRunningAnimations = (element: HTMLElement): Animation[] => {
  if (typeof element.getAnimations !== 'function') return []
  return element.getAnimations().filter((animation) => animation.playState === 'running')
}

const waitForActiveAnimations = async (runId: number) => {
  await nextTick()
  if (runId !== animationRunId) return false

  const overlay = overlayRef.value
  if (!overlay) return true

  if (typeof overlay.getAnimations === 'function') {
    await waitForFrame()
    await waitForFrame()
  }
  if (runId !== animationRunId) return false

  const container = overlay.querySelector<HTMLElement>('[data-slot="alert-dialog-container"]')
  const animations = [
    ...getRunningAnimations(overlay),
    ...(container ? getRunningAnimations(container) : []),
  ]
  if (animations.length === 0) return true

  await Promise.allSettled(animations.map((animation) => animation.finished))

  return runId === animationRunId
}

const restoreTriggerFocus = () => {
  const target = triggerElement
  triggerElement = null

  if (!target) return
  nextTick(() => {
    if (target.isConnected) target.focus({ preventScroll: true })
  })
}

const focusDialog = async () => {
  await nextTick()
  overlayRef.value
    ?.querySelector<HTMLElement>('[data-slot="alert-dialog-dialog"]')
    ?.focus({ preventScroll: true })
}

watch(
  () => context?.isOpen.value,
  (open) => {
    if (typeof document === 'undefined') return

    animationRunId += 1
    const runId = animationRunId
    document.removeEventListener('keydown', onKeydown)

    if (open) {
      const previouslyFocused = document.activeElement
      if (previouslyFocused instanceof HTMLElement && previouslyFocused !== document.body) {
        triggerElement = previouslyFocused
      }

      isRendered.value = true
      isEntering.value = true
      isExiting.value = false
      document.addEventListener('keydown', onKeydown)

      void focusDialog()
      void waitForActiveAnimations(runId).then((settled) => {
        if (settled) isEntering.value = false
      })
      return
    }

    if (isRendered.value) {
      isEntering.value = false
      isExiting.value = true

      void waitForActiveAnimations(runId).then((settled) => {
        if (!settled) return
        isRendered.value = false
        isExiting.value = false
      })
      restoreTriggerFocus()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.removeEventListener('keydown', onKeydown)
  animationRunId += 1
})

const handleBackdropClick = (event: MouseEvent) => {
  if (!props.isDismissable || event.target !== event.currentTarget) return
  context?.close()
}

if (context) {
  provide(ALERT_DIALOG_CONTEXT_KEY, {
    ...context,
    isEntering: computed(() => isEntering.value),
    isExiting: computed(() => isExiting.value),
  })
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isRendered"
      ref="overlayRef"
      :class="backdropClass"
      :data-entering="dataAttr(isEntering)"
      :data-exiting="dataAttr(isExiting)"
      data-slot="alert-dialog-backdrop"
      @click="handleBackdropClick"
    >
      <slot />
    </div>
  </Teleport>
</template>
