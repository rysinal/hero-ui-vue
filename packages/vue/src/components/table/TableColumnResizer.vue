<script setup lang="ts">
/* global HTMLElement, PointerEvent, document */
import { computed, inject, onBeforeUnmount, ref } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { TABLE_CONTEXT_KEY } from './context'

interface TableColumnResizerProps {
  class?: string
  minWidth?: number
}

const props = withDefaults(defineProps<TableColumnResizerProps>(), {
  minWidth: 60,
})

const context = inject(TABLE_CONTEXT_KEY, null)
const resizerClass = computed(() =>
  composeTwClasses(props.class, context?.slots.value.columnResizer()),
)

const resizerRef = ref<HTMLElement | null>(null)
// table.css turns the resizer into an accent bar while it is being dragged.
const isResizing = ref(false)

let teardown: (() => void) | undefined
onBeforeUnmount(() => teardown?.())

/** Drags the parent column's width, clamped to minWidth. */
const handlePointerDown = (event: PointerEvent) => {
  const column = resizerRef.value?.closest<HTMLElement>('[data-slot="table-column"]')
  if (!column) return

  event.preventDefault()
  const startX = event.clientX
  const startWidth = column.offsetWidth
  isResizing.value = true

  const onMove = (moveEvent: PointerEvent) => {
    const width = Math.max(props.minWidth, startWidth + (moveEvent.clientX - startX))
    column.style.width = `${width}px`
  }

  const onUp = () => {
    isResizing.value = false
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onUp)
    teardown = undefined
  }

  teardown = onUp
  document.addEventListener('pointermove', onMove)
  document.addEventListener('pointerup', onUp)
}
</script>

<template>
  <span
    ref="resizerRef"
    :class="resizerClass"
    :data-resizing="dataAttr(isResizing)"
    aria-hidden="true"
    data-slot="table-column-resizer"
    @pointerdown="handlePointerDown"
  />
</template>
