<script setup lang="ts">
/* global HTMLElement, ResizeObserver */
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { composeTwClasses } from '../../utils'
import { TABS_CONTEXT_KEY } from './context'

interface TabIndicatorProps {
  class?: string
}

const props = defineProps<TabIndicatorProps>()
const context = inject(TABS_CONTEXT_KEY, null)

const indicatorRef = ref<HTMLElement | null>(null)
const box = ref<{ height: number; left: number; top: number; width: number } | null>(null)

/**
 * React Aria's SelectionIndicator measures the selected tab and moves itself
 * over it. tabs.css transitions translate/width/height, so the indicator has to
 * be positioned rather than merely marked as active.
 */
const measure = () => {
  const indicator = indicatorRef.value
  const listContainer = indicator?.parentElement
  if (!indicator || !listContainer) return

  const selected = listContainer.querySelector<HTMLElement>('[data-slot="tab"][data-selected="true"]')
  if (!selected) {
    box.value = null
    return
  }

  const containerBox = listContainer.getBoundingClientRect()
  const selectedBox = selected.getBoundingClientRect()

  box.value = {
    height: selectedBox.height,
    left: selectedBox.left - containerBox.left,
    top: selectedBox.top - containerBox.top,
    width: selectedBox.width,
  }
}

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  measure()

  const listContainer = indicatorRef.value?.parentElement
  if (listContainer && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(listContainer)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = undefined
})

// Re-measure once Vue has patched data-selected onto the new tab.
watch(
  () => context?.selectedValue.value,
  async () => {
    await nextTick()
    measure()
  },
)

const indicatorClass = computed(() =>
  composeTwClasses(props.class, context?.slots.tabIndicator?.()),
)

const indicatorStyle = computed(() => {
  if (!box.value) return { opacity: '0' }
  return {
    height: `${box.value.height}px`,
    translate: `${box.value.left}px ${box.value.top}px`,
    width: `${box.value.width}px`,
  }
})
</script>

<template>
  <span
    ref="indicatorRef"
    :class="indicatorClass"
    :style="indicatorStyle"
    aria-hidden="true"
    data-slot="tabs-indicator"
  />
</template>
